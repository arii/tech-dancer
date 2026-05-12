import { test, expect, Page } from '@playwright/test';
import { setupErrorMonitoring } from './fixtures/error-monitoring';

async function validateUrlNavigation(page: Page, href: string) {
  if (href.includes('#')) {
    const [baseUrl, fragment] = href.split('#');
    if (page.url() !== baseUrl && page.url() !== baseUrl + '/') {
      await page.goto(baseUrl);
      await expect(page.locator('main')).toBeVisible();
    }
    const locator = page.locator(`#${fragment}`);
    await expect(locator).toBeVisible({ timeout: 5000 });
  } else {
    const response = await page.goto(href);
    await expect(page.locator('main')).toBeVisible();
    if (response !== null) {
      expect(response.status(), `Bad status at ${href}`).toBeLessThan(400);
    }
  }
}

test.describe('Navigation Smoke Tests', () => {
  let errorMonitor: ReturnType<typeof setupErrorMonitoring>;

  test.beforeEach(async ({ page }) => {
    errorMonitor = setupErrorMonitoring(page);
  });

  test('homepage loads without console errors', async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('main')).toBeVisible();
    expect(errorMonitor.consoleErrors).toHaveLength(0);
    expect(errorMonitor.pageErrors).toHaveLength(0);
  });

  test('all nav links are reachable and error-free', async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('main')).toBeVisible();

    const links = await page.$$eval('nav a[href]', (anchors) =>
      anchors
        .map((a) => (a as HTMLAnchorElement).href)
        .filter((href) => href.startsWith(window.location.origin))
    );

    for (const href of links) {
      errorMonitor.clearErrors();
      await validateUrlNavigation(page, href);
      expect(errorMonitor.consoleErrors, `Errors at ${href}: ${errorMonitor.consoleErrors.join(', ')}`).toHaveLength(0);
      expect(errorMonitor.pageErrors, `Errors at ${href}: ${errorMonitor.pageErrors.join(', ')}`).toHaveLength(0);
    }
  });

  test('all post/content pages load without errors', async ({ page }) => {
    const contentIndexes = ['./blog', './gear', './research'];

    for (const index of contentIndexes) {
      await page.goto(index);
      await expect(page.locator('main')).toBeVisible();
      const exists = await page.$('main');
      if (!exists) continue;

      const contentLinks = await page.$$eval('a[href]', (anchors) =>
        anchors
          .map((a) => (a as HTMLAnchorElement).href)
          .filter((href) => href.startsWith(window.location.origin))
          .filter((href, i, arr) => arr.indexOf(href) === i) // dedupe
      );

      for (const href of contentLinks) {
        errorMonitor.clearErrors();
        await validateUrlNavigation(page, href);
        expect(errorMonitor.consoleErrors, `Errors at ${href}: ${errorMonitor.consoleErrors.join(', ')}`).toHaveLength(0);
        expect(errorMonitor.pageErrors, `Errors at ${href}: ${errorMonitor.pageErrors.join(', ')}`).toHaveLength(0);
      }
    }
  });
});
