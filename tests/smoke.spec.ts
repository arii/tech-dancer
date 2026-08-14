import { test, expect } from './fixtures/visual';
import type { Page } from '@playwright/test';
import { IGNORED_ERROR_PATTERNS } from './test-constants';

function isIgnored(msg: string) {
  return IGNORED_ERROR_PATTERNS.some(pattern =>
    pattern instanceof RegExp ? pattern.test(msg) : msg.includes(pattern)
  );
}

async function validateUrlNavigation(page: Page, href: string) {
  console.log(`  Navigating to: ${href}`);
  if (href.includes('#')) {
    const [baseUrl, fragment] = href.split('#');
    if (page.url() !== baseUrl && page.url() !== baseUrl + '/') {
      await page.goto(baseUrl, { waitUntil: 'networkidle', timeout: 60000 });
      const mainLocator = page.locator('#main-content');
    const count = await mainLocator.count();
    if (count > 0) {
      await expect(mainLocator.first()).toBeVisible();
    }
    }
    if (fragment) {
      const locator = page.locator(`#${fragment}`);
      await expect(locator).toBeVisible({ timeout: 5000 });
    }
  } else {
    const response = await page.goto(href, { waitUntil: 'networkidle', timeout: 60000 });
    const mainLocator = page.locator('#main-content');
    const count = await mainLocator.count();
    if (count > 0) {
      await expect(mainLocator.first()).toBeVisible({ timeout: 5000 });
    }
    if (response !== null) {
      expect(response.status(), `Bad status at ${href}`).toBeLessThan(400);
    }
  }
}

test.describe('Navigation Smoke Tests', () => {
  test.describe.configure({ timeout: 120000 }); // 2 minute timeout for these tests
  test('homepage loads without console errors', async ({ page, pageErrors }) => {
    await page.goto('./', { waitUntil: 'networkidle', timeout: 60000 });
    const mainLocator = page.locator('#main-content');
    const count = await mainLocator.count();
    if (count > 0) {
      await expect(mainLocator.first()).toBeVisible();
    }
    const filteredErrors = [...pageErrors.consoleErrors, ...pageErrors.pageErrors].filter(e => !isIgnored(e));
    expect(filteredErrors).toHaveLength(0);
  });

  test('all nav links are reachable and error-free', async ({ page, pageErrors }) => {
    await page.goto('./', { waitUntil: 'networkidle', timeout: 60000 });
    const mainLocator = page.locator('#main-content');
    const count = await mainLocator.count();
    if (count > 0) {
      await expect(mainLocator.first()).toBeVisible();
    }

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

  test('specific complex markdown post loads without errors', async ({ page, pageErrors }) => {
    // This post contains various markdown features including code blocks which use SyntaxHighlighter and Stack
    await validateUrlNavigation(page, './research/ai-devops-pipeline');

    // Give it a moment to render the markdown
    await page.waitForTimeout(500);

    const filteredErrors = [...pageErrors.consoleErrors, ...pageErrors.pageErrors].filter(e => !isIgnored(e));
    expect(filteredErrors, `Errors at ./research/ai-devops-pipeline: ${filteredErrors.join(', ')}`).toHaveLength(0);
  });

  test('all post/content pages load without errors', async ({ page, pageErrors }) => {
    const contentIndexes = ['./blog', './gear', './research'];

    for (const index of contentIndexes) {
      await page.goto(index, { waitUntil: 'networkidle', timeout: 60000 });
      const mainLocator = page.locator('#main-content');
    const count = await mainLocator.count();
    if (count > 0) {
      await expect(mainLocator.first()).toBeVisible();
    }
      const exists = await page.$('#main-content');
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
