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
});