import { test, expect } from '@playwright/test';

const tools = [
  { name: 'UX Auditor', path: '/ux-auditor' },
  { name: 'Blog Drafter', path: '/research/blog-drafter' },
  { name: 'WCS Scraper', path: '/research/wcs-parquet-pipeline' },
  { name: 'Event Reminders', path: '/research/wsdc-event-reminders' },
];

test.describe('Research Tools Mobile UX', () => {
  test.use({ viewport: { width: 390, height: 844 } }); // iPhone 12

  for (const tool of tools) {
    test(`should render ${tool.name} on mobile without horizontal overflow`, async ({ page }) => {
      await page.goto(tool.path);

      // Wait for lazy components
      await page.waitForTimeout(2000);

      // Check for horizontal overflow
      const overflowX = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      expect(overflowX).toBe(false);

      // Take a screenshot for visual verification
      await page.screenshot({ path: `tests/screenshots/mobile-${tool.path.replace(/\//g, '-')}.png`, fullPage: true });
    });
  }
});
