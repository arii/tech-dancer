import { test, expect } from './fixtures/visual';
import { getVisualTestMasks } from './utils/playwright-helpers';

const tools = [
  { name: 'UX Auditor', path: 'ux-auditor' },
  { name: 'Blog Drafter', path: 'research/blog-drafter' },
  { name: 'WCS Scraper', path: 'research/wcs-scraper' },
];

test.describe('Research Tools Mobile UX', () => {
  for (const tool of tools) {
    test(`should render ${tool.name} on mobile without horizontal overflow`, async ({ page, waitForFonts }) => {
      // Increase timeout for slow CI environments
      test.setTimeout(90000);

      // Use relative paths to respect baseURL with BASE_PATH in CI
      await page.goto(tool.path);

      // Wait for domcontentloaded instead of networkidle to avoid timing out on slow external assets
      await page.waitForLoadState('domcontentloaded');

      // Wait for fonts to be loaded to prevent text-rendering flakiness
      await waitForFonts();

      // Wait for lazy components based on tool path using robust locators with generous timeouts
      if (tool.path.includes('ux-auditor')) {
        await page.getByLabel(/URL to audit/i).first().waitFor({ state: 'visible', timeout: 45000 });
      } else if (tool.path.includes('blog-drafter')) {
        await page.getByText(/CONTENT PIPELINE/i).first().waitFor({ state: 'visible', timeout: 45000 });
      } else if (tool.path.includes('wcs-scraper')) {
        // Wait for Scraper shell label or error state if data fails to sync
        await page.locator('text=/Scoring Tool|Data Synchronisation Failed/i').first().waitFor({ state: 'visible', timeout: 45000 });
      }

      // Final short sleep to let layout settle
      await page.waitForTimeout(1000);

      // Check for horizontal overflow
      const overflowX = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      expect(overflowX).toBe(false);

      // Take a standardized screenshot
      await expect(page).toHaveScreenshot(`${tool.path.replace(/\//g, '-')}.png`, {
        fullPage: true,
        animations: 'disabled',
        mask: getVisualTestMasks(page)
      });
    });
  }
});
