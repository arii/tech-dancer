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
      test.setTimeout(60000);

      // Use relative paths (no leading slash) to respect baseURL with BASE_PATH in CI
      await page.goto(tool.path);

      // Wait for the page to be somewhat stable
      await page.waitForLoadState('domcontentloaded');

      // Wait for lazy components based on tool path using more robust selectors
      if (tool.path.includes('ux-auditor')) {
        await page.getByLabel(/URL to audit/i).first().waitFor({ state: 'visible', timeout: 30000 });
      } else if (tool.path.includes('blog-drafter')) {
        await page.getByText(/CONTENT PIPELINE/i).first().waitFor({ state: 'visible', timeout: 30000 });
      } else if (tool.path.includes('wcs-scraper')) {
        // Wait for the shell to load (Scoring Tool label) which is independent of data load
        await page.getByText(/Scoring Tool/i).first().waitFor({ state: 'visible', timeout: 30000 });
      } else if (tool.path.includes('wsdc-event-reminders')) {
        // Wait for either the timeline or the initial "Ready to Calculate" state
        await page.locator('text=/Action Timeline|Ready to Calculate/i').first().waitFor({ state: 'visible', timeout: 30000 });
      } else {
        await page.waitForLoadState('networkidle', { timeout: 30000 });
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
