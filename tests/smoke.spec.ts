import { test, expect } from './fixtures/visual';
import { IGNORED_ERROR_PATTERNS } from './test-constants';

function isIgnored(msg: string) {
  return IGNORED_ERROR_PATTERNS.some(pattern =>
    pattern instanceof RegExp ? pattern.test(msg) : msg.includes(pattern)
  );
}

test.describe('Navigation Smoke Tests', () => {
  test('homepage loads without console errors', async ({ page, pageErrors }) => {
    await page.goto('./', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#main-content')).toBeVisible();
    const filteredErrors = [...pageErrors.consoleErrors, ...pageErrors.pageErrors].filter(e => !isIgnored(e));
    expect(filteredErrors).toHaveLength(0);
  });

  test('core index pages load without errors', async ({ page, pageErrors }) => {
    const coreRoutes = [
      { name: 'blog', path: './blog' },
      { name: 'gear', path: './gear' },
      { name: 'research', path: './research' },
      { name: 'events', path: './events' },
      { name: 'merch', path: './merch' },
      { name: 'about', path: './about' },
      { name: 'contact', path: './contact' },
    ];

    for (const route of coreRoutes) {
      pageErrors.clearErrors();
      await page.goto(route.path, { waitUntil: 'domcontentloaded' });
      await expect(page.locator('#main-content')).toBeVisible({ timeout: 10000 });
      const filteredErrors = [...pageErrors.consoleErrors, ...pageErrors.pageErrors].filter(e => !isIgnored(e));
      expect(filteredErrors, `Errors at ${route.path}: ${filteredErrors.join(', ')}`).toHaveLength(0);
    }
  });

  test('representative content pages load without errors', async ({ page, pageErrors }) => {
    // Test one of each major content type to ensure templates are working
    const sampleRoutes = [
      './blog/2026-04-19-gear-essentials',
      './gear/2023-10-01-loop-earplugs',
      './events/boogie-by-the-bay',
    ];

    for (const path of sampleRoutes) {
      pageErrors.clearErrors();
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      await expect(page.locator('#main-content')).toBeVisible({ timeout: 10000 });
      const filteredErrors = [...pageErrors.consoleErrors, ...pageErrors.pageErrors].filter(e => !isIgnored(e));
      expect(filteredErrors, `Errors at ${path}: ${filteredErrors.join(', ')}`).toHaveLength(0);
    }
  });
});
