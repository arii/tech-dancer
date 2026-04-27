import { test, expect } from '@playwright/test';

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

      // Ensure the main content is loaded instead of using a manual timeout
      await expect(page.locator('#root')).toBeVisible();

      // Scroll to trigger lazy loading of images
      await page.evaluate(async () => {
         const main = document.querySelector('main');
         if (main) {
            let lastScrollHeight = 0;
            while (main.scrollHeight > lastScrollHeight) {
              lastScrollHeight = main.scrollHeight;
              main.scrollTo(0, main.scrollHeight);
              await new Promise(r => setTimeout(r, 500));
            }
            main.scrollTo(0, 0);
            await new Promise(r => setTimeout(r, 500)); // wait for scroll to top
         }
      });
      // Increased tolerance to 5% to handle minor rendering differences across environments
      // Playwright automatically disables animations for toHaveScreenshot
      await expect(page).toHaveScreenshot(`${route.name}.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.05,
        animations: 'disabled'
      });
    });
  }
});
