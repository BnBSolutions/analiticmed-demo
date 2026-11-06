import { cleanup, render } from "@testing-library/react";
import { afterEach } from "vitest";
import { matchRoutes, MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { routes } from "@/routes";
import { AppLink } from "@/lib/router";

afterEach(cleanup);

describe("App routing", () => {
  it.each([
    ["/", undefined],
    ["/check-up", "check-up"],
    ["/contacte", "contacte"],
    ["/medici?spec=cardiologie&lang=ru", "medici"],
    ["/servicii/rmn", "servicii/:slug"],
    ["/unknown", "*"],
  ])("matches %s", (path, expectedPath) => {
    const matches = matchRoutes(routes, path);
    expect(matches).not.toBeNull();
    expect(matches?.at(-1)?.route.path).toBe(expectedPath);
  });

  it("matches a dynamic service slug", () => {
    const matches = matchRoutes(routes, "/servicii/rmn");
    expect(matches?.at(-1)?.params["slug"]).toBe("rmn");
  });

  it("preserves the selected language in React Router links", () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={["/servicii?lang=ru"]}>
        <AppLink to="/servicii/rmn#programare">Book</AppLink>
        <AppLink to="/medici?spec=cardiologie">Doctors</AppLink>
        <AppLink to="/servicii" preserveLanguage={false}>
          Romanian
        </AppLink>
      </MemoryRouter>,
    );

    expect(getByRole("link", { name: "Book" }).getAttribute("href")).toBe(
      "/servicii/rmn?lang=ru#programare",
    );
    expect(getByRole("link", { name: "Doctors" }).getAttribute("href")).toBe(
      "/medici?spec=cardiologie&lang=ru",
    );
    expect(getByRole("link", { name: "Romanian" }).getAttribute("href")).toBe("/servicii");
  });
});
