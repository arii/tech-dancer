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
      // Increase timeout for slow CI environments
      test.setTimeout(90000);

      // Use relative paths to respect baseURL with BASE_PATH in CI
      await page.goto(tool.path);

      // Wait for the page to be stable
      await page.waitForLoadState('networkidle');

      // Wait for lazy components based on tool path using robust locators
      if (tool.path.includes('ux-auditor')) {
        await page.getByLabel(/URL to audit/i).first().waitFor({ state: 'visible', timeout: 30000 });
      } else if (tool.path.includes('blog-drafter')) {
        await page.getByText(/CONTENT PIPELINE/i).first().waitFor({ state: 'visible', timeout: 30000 });
      } else if (tool.path.includes('wcs-scraper')) {
        // Wait for Scraper shell or error
        await page.locator('text=/WCS Scoring Analysis|Data Synchronisation Failed/i').first().waitFor({ state: 'visible', timeout: 30000 });
      } else if (tool.path.includes('wsdc-event-reminders')) {
        await page.locator('text=/Action Timeline|Ready to Calculate/i').first().waitFor({ state: 'visible', timeout: 30000 });
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
