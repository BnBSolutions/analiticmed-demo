import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { BookingForm } from "@/components/site/BookingForm";

vi.mock("@/lib/i18n", () => ({
  useT: () => ({ lang: "ro", t: (value: { ro: string }) => value.ro }),
}));

afterEach(cleanup);

describe("Optional booking doctor", () => {
  it("allows a valid booking both without and with a chosen doctor", () => {
    const { container, getByLabelText } = render(<BookingForm />);
    fireEvent.change(getByLabelText("Nume și prenume"), { target: { value: "Pacient Test" } });
    fireEvent.change(getByLabelText("Telefon"), { target: { value: "062000020" } });
    fireEvent.change(getByLabelText("Specialitate / serviciu"), { target: { value: "cardiologie" } });
    fireEvent.change(getByLabelText("Data dorită"), { target: { value: "2026-11-20" } });
    const form = container.querySelector("form");
    if (!form) throw new Error("Missing booking form");
    expect(new FormData(form).get("doctor")).toBe("");
    expect(form.checkValidity()).toBe(true);
    fireEvent.change(getByLabelText("Medic (opțional)"), { target: { value: "d1" } });
    expect(new FormData(form).get("doctor")).toBe("d1");
    expect(form.checkValidity()).toBe(true);
  });
  it("offers named doctors only for the selected service and clears an earlier choice", () => {
    const { getByLabelText } = render(<BookingForm />);
    const service = getByLabelText("Specialitate / serviciu");
    const doctor = getByLabelText("Medic (opțional)") as HTMLSelectElement;
    expect(doctor.disabled).toBe(true);
    fireEvent.change(service, { target: { value: "cardiologie" } });
    expect(Array.from(doctor.options).map((o) => o.value)).toEqual(["", "d1"]);
    expect(doctor.options[1]?.text).toContain("Ion Vasilescu");
    fireEvent.change(doctor, { target: { value: "d1" } });
    fireEvent.change(service, { target: { value: "neurologie" } });
    expect(doctor.value).toBe("");
    expect(Array.from(doctor.options).map((o) => o.value)).toEqual(["", "d4"]);
  });
  it("uses the preset diagnostic service to offer its assigned doctor", () => {
    const { getByLabelText } = render(<BookingForm defaultService="rmn" />);
    const doctor = getByLabelText("Medic (opțional)") as HTMLSelectElement;
    expect(Array.from(doctor.options).map((o) => o.value)).toEqual(["", "d2"]);
  });
});