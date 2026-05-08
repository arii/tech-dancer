import { test, expect } from './fixtures/visual';

const routes = [
  { name: 'home', path: './' },
  { name: 'blog', path: './blog' },
  { name: 'gear', path: './gear' },
  { name: 'research', path: './research' },
  { name: 'about', path: './about' },
  { name: 'contact', path: './contact' }
];

test.describe('Visual Regression Tests', () => {
  for (const route of routes) {
    test(`visual comparison for ${route.name}`, async ({ page }) => {
      await page.goto(route.path);
      await page.waitForLoadState('networkidle');
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator('main')).toBeVisible({ timeout: 10000 });
      await page.evaluate(async () => {
        const scrollable = document.querySelector('main') || document.documentElement;
        let lastHeight = scrollable.scrollHeight;
        while (true) {
          scrollable.scrollTo(0, scrollable.scrollHeight);
          await new Promise(r => setTimeout(r, 200));
          const newHeight = scrollable.scrollHeight;
          if (newHeight === lastHeight) break;
          lastHeight = newHeight;
        }
        scrollable.scrollTo(0, 0);
        await new Promise(r => setTimeout(r, 200));
      });
      await expect(page).toHaveScreenshot(`${route.name}.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.02,
        animations: 'disabled'
      });
    });
  }
});
