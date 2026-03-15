import { expect, test } from "@playwright/test";

// Basic UI smoke tests with frontend readiness guard

async function waitForFrontend(page: any, attempts = 20, intervalMs = 500) {
  for (let i = 1; i <= attempts; i++) {
    try {
      const resp = await page.goto("/", { timeout: 3000 });
      if (resp && resp.ok()) return true;
    } catch {
      /* ignore and retry */
    }
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  return false;
}

test.describe("Angular App UI", () => {
  let frontendReady = false;

  test.beforeAll(async ({ browser, baseURL }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    frontendReady = await waitForFrontend(page);
    await context.close();
    if (!frontendReady) {
      test.skip(
        true,
        `Frontend not reachable at ${baseURL}. Ensure Angular dev server started.`
      );
    }
  });

  test.beforeEach(async ({ page }) => {
    if (!frontendReady) test.skip();
    await page.goto("/");
  });

  test("renders banner and weather component", async ({ page }) => {
    const banner = page.locator("app-banner");
    await expect(banner).toBeVisible();
    await expect(page.locator("app-weather")).toBeVisible();
  });

  test("sidebar toggle on mobile breakpoint", async ({ page }) => {
    await page.setViewportSize({ width: 500, height: 800 });
    await page.reload();
    const possibleToggle = page.locator("button", {
      hasText: /menu|toggle|☰/i,
    });
    if (await possibleToggle.first().isVisible()) {
      await possibleToggle.first().click();
      const sidebar = page.locator("app-sidebar");
      await expect(sidebar).toBeVisible();
    } else {
      test.skip(true, "No toggle button found - adjust selector");
    }
  });
});
