import { expect, test } from "@playwright/test";

test("the home page redirects to the dashboard", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL("/dashboard");
  await expect(page.getByRole("heading", { level: 1, name: "Dashboard" })).toBeVisible();
});

test("the chosen theme is applied and kept after a reload", async ({ page }) => {
  await page.goto("/dashboard");
  const html = page.locator("html");
  const logo = (theme: string) => page.getByRole("banner").locator(`svg[data-logo="${theme}"]`);
  await expect(html).toHaveAttribute("data-theme", "propeller");
  await expect(logo("propeller")).toBeVisible();
  await expect(logo("rose")).toBeHidden();

  await page.getByRole("group", { name: "Theme" }).getByText("Rosé").click();
  await expect(html).toHaveAttribute("data-theme", "rose");
  await expect(logo("rose")).toBeVisible();
  await expect(logo("propeller")).toBeHidden();

  await page.reload();
  await expect(html).toHaveAttribute("data-theme", "rose");
  await expect(page.getByRole("radio", { name: "Rosé" })).toBeChecked();
  await expect(logo("rose")).toBeVisible();
});

test("the main navigation is keyboard reachable and marks the current page", async ({ page }) => {
  await page.goto("/dashboard");
  const nav = page.getByRole("navigation", { name: "Main" });
  await expect(nav.getByRole("link", { name: "Dashboard" })).toHaveAttribute("aria-current", "page");

  await page.keyboard.press("Tab");
  await expect(nav.getByRole("link", { name: "Dashboard" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(nav.getByRole("link", { name: "Tickets" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL("/tickets");
  await expect(nav.getByRole("link", { name: "Tickets" })).toHaveAttribute("aria-current", "page");
});
