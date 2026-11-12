import { afterEach, describe, expect, it } from "vitest";
import { defaultTheme, readThemeCookie, themeScript, themes } from "./theme";

describe("themes", () => {
  it("lists Propeller first as the default, then Rosé", () => {
    expect(themes.map((theme) => theme.label)).toEqual(["Propeller", "Rosé"]);
    expect(defaultTheme).toBe(themes[0].id);
  });
});

describe("readThemeCookie", () => {
  it("returns the saved theme", () => {
    expect(readThemeCookie("a=1; theme=rose; b=2")).toBe("rose");
  });

  it("falls back to the default when the cookie is missing or unknown", () => {
    expect(readThemeCookie("")).toBe(defaultTheme);
    expect(readThemeCookie("theme=neon")).toBe(defaultTheme);
  });
});

describe("themeScript", () => {
  afterEach(() => {
    document.cookie = "theme=; path=/; max-age=0";
    document.documentElement.removeAttribute("data-theme");
  });

  it("sets data-theme on <html> from the cookie", () => {
    document.cookie = "theme=rose; path=/";
    new Function(themeScript)();
    expect(document.documentElement).toHaveAttribute("data-theme", "rose");
  });

  it("leaves <html> alone when the cookie holds an unknown theme", () => {
    document.cookie = "theme=neon; path=/";
    new Function(themeScript)();
    expect(document.documentElement).not.toHaveAttribute("data-theme");
  });
});
