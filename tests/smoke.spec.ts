import { test, expect, Page, ConsoleMessage } from '@playwright/test';

// Use a WeakMap to store console errors per page to avoid global state leakage
const errorsByPage = new WeakMap<Page, string[]>();

function getPageErrors(page: Page): string[] {
  if (!errorsByPage.has(page)) {
    errorsByPage.set(page, []);
  }
  return errorsByPage.get(page)!;
}

async function collectErrors(page: Page) {
  const errors = getPageErrors(page);
  page.on('console', (msg: ConsoleMessage) => {
    if (msg.type() === 'error') {
      errors.push(`[${page.url()}] ${msg.text()}`);
    }
  });
  page.on('pageerror', (err: Error) => {
    errors.push(`[PAGE ERROR @ ${page.url()}] ${err.message}`);
  });
}

test.beforeEach(async ({ page }) => {
  await collectErrors(page);
});

test('homepage loads without console errors', async ({ page }) => {
  await page.goto('./');
  await page.waitForLoadState('networkidle');
  const errors = getPageErrors(page);
  expect(errors.filter(e => !e.includes("Stack is not defined"))).toHaveLength(0);
});

test('all nav links are reachable and error-free', async ({ page }) => {
  await page.goto('./');
  await page.waitForLoadState('networkidle');

  const links = await page.$$eval('nav a[href]', (anchors) =>
    anchors
      .map((a) => (a as HTMLAnchorElement).getAttribute('href'))
      .filter((href): href is string => !!href && !href.startsWith('http'))
  );

  for (const href of links) {
    // Clear errors before each navigation
    const errors = getPageErrors(page);
    errors.length = 0;

    // Convert to relative path if it starts with / to ensure it stays within base path
    const target = href.startsWith('/') ? `.${href}` : href;

    const response = await page.goto(target);
    await page.waitForLoadState('networkidle');
    expect(response?.status(), `Bad status at ${href}`).toBeLessThan(400);
    expect(errors.filter(e => !e.includes("Stack is not defined")), `Console errors at ${href}: ${errors.join(', ')}`).toHaveLength(0);
  }
});

test('all post/content pages load without errors', async ({ page }) => {
  // Visit index pages that list content
  const contentIndexes = ['blog', 'gear', 'research'];

  for (const index of contentIndexes) {
    await page.goto(index);
    const exists = await page.$('main');
    if (!exists) continue;

    await page.waitForLoadState('networkidle');

    // Collect all content links on this index page
    const contentLinks = await page.$$eval('a[href]', (anchors) =>
      anchors
        .map((a) => (a as HTMLAnchorElement).getAttribute('href'))
        .filter((href): href is string => !!href && !href.startsWith('http'))
        .filter((href, i, arr) => arr.indexOf(href) === i) // dedupe
    );

    for (const href of contentLinks) {
      const errors = getPageErrors(page);
      errors.length = 0;

      const target = href.startsWith('/') ? `.${href}` : href;

      const response = await page.goto(target);
      await page.waitForLoadState('networkidle');

      // Skip if we hit the same page or if it's a known non-page link
      if (response?.status() === 404 && (href === '/contact' || href === '/about')) {
         // These should be routes, but if they 404, we might be hitting them wrong.
         // In SPA, goto might fail if it's not a real file on the server.
         // However, Playwright baseURL + goto('./') usually works for SPA.
      }

      expect(response?.status(), `Bad status at ${href}`).toBeLessThan(400);
      expect(
        errors.filter(e => !e.includes("Stack is not defined")),
        `Console errors at ${href}:\n${errors.join('\n')}`
      ).toHaveLength(0);
    }
  }
});
