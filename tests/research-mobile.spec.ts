import { test, expect } from '@playwright/test';

const tools = [
  { name: 'UX Auditor', path: 'ux-auditor' },
  { name: 'Blog Drafter', path: 'research/blog-drafter' },
  { name: 'WCS Scraper', path: 'research/wcs-scraper' },
  { name: 'Event Reminders', path: 'research/wsdc-event-reminders' },
];

test.describe('Research Tools Mobile UX', () => {
  test.use({ viewport: { width: 390, height: 844 } }); // iPhone 12

  for (const tool of tools) {
    test(`should render ${tool.name} on mobile without horizontal overflow`, async ({ page }) => {
      // Use relative paths (no leading slash) to respect baseURL with BASE_PATH in CI
      await page.goto(tool.path);

      // Wait for lazy components based on tool path
      if (tool.path.includes('ux-auditor')) {
        await page.waitForSelector('input[aria-label="URL to audit"]', { state: 'visible' });
      } else if (tool.path.includes('blog-drafter')) {
        await page.waitForSelector('text=CONTENT PIPELINE', { state: 'visible' });
      } else if (tool.path.includes('wcs-scraper')) {
        await page.waitForSelector('text=WCS Scoring Analysis', { state: 'visible' });
      } else if (tool.path.includes('wsdc-event-reminders')) {
        await page.waitForSelector('text=Action Timeline', { state: 'visible' });
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
