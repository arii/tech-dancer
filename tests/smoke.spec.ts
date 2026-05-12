import { test, expect } from './fixtures/visual';
import type { Page } from '@playwright/test';
import { IGNORED_ERROR_PATTERNS } from './test-constants';

function isIgnored(msg: string) {
  return IGNORED_ERROR_PATTERNS.some(pattern =>
    pattern instanceof RegExp ? pattern.test(msg) : msg.includes(pattern)
  );
}

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
  test('homepage loads without console errors', async ({ page, pageErrors }) => {
    await page.goto('./');
    await expect(page.locator('main')).toBeVisible();
    const filteredErrors = [...pageErrors.consoleErrors, ...pageErrors.pageErrors].filter(e => !isIgnored(e));
    expect(filteredErrors).toHaveLength(0);
  });

  test('all nav links are reachable and error-free', async ({ page, pageErrors }) => {
    await page.goto('./');
    await expect(page.locator('main')).toBeVisible();

    const links = await page.$$eval('nav a[href]', (anchors) =>
      anchors
        .map((a) => (a as HTMLAnchorElement).href)
        .filter((href) => href.startsWith(window.location.origin))
    );

    for (const href of links) {
      pageErrors.clearErrors();
      await validateUrlNavigation(page, href);
      const filteredErrors = [...pageErrors.consoleErrors, ...pageErrors.pageErrors].filter(e => !isIgnored(e));
      expect(filteredErrors, `Errors at ${href}: ${filteredErrors.join(', ')}`).toHaveLength(0);
    }
  });

  test('all post/content pages load without errors', async ({ page, pageErrors }) => {
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
        pageErrors.clearErrors();
        await validateUrlNavigation(page, href);
        const filteredErrors = [...pageErrors.consoleErrors, ...pageErrors.pageErrors].filter(e => !isIgnored(e));
        expect(filteredErrors, `Errors at ${href}: ${filteredErrors.join(', ')}`).toHaveLength(0);
      }
    }
  });
});
