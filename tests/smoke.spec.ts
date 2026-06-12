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
    test(`core index page ${route.name} loads without errors`, async ({ page, pageErrors }) => {
      await page.goto(route.path, { waitUntil: 'domcontentloaded' });
      await expect(page.locator('#main-content')).toBeVisible({ timeout: 10000 });
      const filteredErrors = [...pageErrors.consoleErrors, ...pageErrors.pageErrors].filter(e => !isIgnored(e));
      expect(filteredErrors, `Errors at ${route.path}: ${filteredErrors.join(', ')}`).toHaveLength(0);
    });
  }

  const sampleRoutes = [
    { name: 'blog-post', path: './blog/2026-04-19-gear-essentials' },
    { name: 'gear-item', path: './gear/2023-10-01-loop-earplugs' },
    { name: 'event-page', path: './events/boogie-by-the-bay' },
  ];

  for (const sample of sampleRoutes) {
    test(`representative content page ${sample.name} loads without errors`, async ({ page, pageErrors }) => {
      await page.goto(sample.path, { waitUntil: 'domcontentloaded' });
      await expect(page.locator('#main-content')).toBeVisible({ timeout: 10000 });
      const filteredErrors = [...pageErrors.consoleErrors, ...pageErrors.pageErrors].filter(e => !isIgnored(e));
      expect(filteredErrors, `Errors at ${sample.path}: ${filteredErrors.join(', ')}`).toHaveLength(0);
    });
  }
});
