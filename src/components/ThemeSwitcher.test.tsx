import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeSwitcher } from "./ThemeSwitcher";

describe("ThemeSwitcher", () => {
  afterEach(() => {
    document.cookie = "theme=; path=/; max-age=0";
    document.documentElement.removeAttribute("data-theme");
  });

  it("offers Propeller and Rosé in a Theme group, with Propeller chosen by default", () => {
    render(<ThemeSwitcher />);
    const group = screen.getByRole("group", { name: "Theme" });
    expect(within(group).getAllByRole("radio").map((radio) => radio.getAttribute("value"))).toEqual([
      "propeller",
      "rose",
    ]);
    expect(within(group).getByRole("radio", { name: "Propeller" })).toBeChecked();
  });

  it("applies and saves Rosé when it is chosen", async () => {
    render(<ThemeSwitcher />);
    await userEvent.click(screen.getByRole("radio", { name: "Rosé" }));

    expect(screen.getByRole("radio", { name: "Rosé" })).toBeChecked();
    expect(document.documentElement).toHaveAttribute("data-theme", "rose");
    expect(document.cookie).toContain("theme=rose");
  });

  it("starts on the saved theme", () => {
    document.cookie = "theme=rose; path=/";
    render(<ThemeSwitcher />);
    expect(screen.getByRole("radio", { name: "Rosé" })).toBeChecked();
    expect(document.documentElement).toHaveAttribute("data-theme", "rose");
  });
});
