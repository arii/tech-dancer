import { test, expect } from '@playwright/test';

const tools = [
  { name: 'UX Auditor', path: '/ux-auditor' },
  { name: 'Blog Drafter', path: '/research/blog-drafter' },
  { name: 'WCS Scraper', path: '/research/wcs-scraper' },
  { name: 'Event Reminders', path: '/research/wsdc-event-reminders' },
];

test.describe('Research Tools Mobile UX', () => {
  test.use({ viewport: { width: 390, height: 844 } }); // iPhone 12

  for (const tool of tools) {
    test(`should render ${tool.name} on mobile without horizontal overflow`, async ({ page }) => {
      await page.goto(tool.path);

      // Wait for lazy components based on tool path
      if (tool.path === '/ux-auditor') {
        await page.waitForSelector('input[aria-label="URL to audit"]', { state: 'visible' });
      } else if (tool.path === '/research/blog-drafter') {
        await page.waitForSelector('text=METADATA', { state: 'visible' });
      } else if (tool.path === '/research/wcs-scraper') {
        await page.waitForSelector('text=SCORING RESULTS', { state: 'visible' });
      } else if (tool.path === '/research/wsdc-event-reminders') {
        await page.waitForSelector('text=ACTION TIMELINE', { state: 'visible' });
      } else {
        await page.waitForLoadState('networkidle');
      }

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
