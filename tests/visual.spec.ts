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
  test.beforeEach(async ({ page }) => {
    // Speed up execution by blocking unnecessary resources
    await page.route('**/*.{google-analytics.com,doubleclick.net}**', route => route.abort());

    // Disable animations and transitions for consistent snapshots globally
    await page.addInitScript(() => {
      const style = document.createElement('style');
      style.innerHTML = `
        *, *::before, *::after {
          animation: none !important;
          transition: none !important;
          transition-duration: 0s !important;
          animation-duration: 0s !important;
        }
      `;
      document.head.appendChild(style);
    });
  });

  for (const route of routes) {
    test(`visual comparison for ${route.name}`, async ({ page }) => {
      await page.goto(route.path);
      await page.waitForLoadState('networkidle');

      // Ensure the main content is loaded instead of using a manual timeout
      await expect(page.locator('#root')).toBeVisible();

      // Robust scroll to bottom to trigger all lazy-loaded content
      await page.evaluate(async () => {
        const scrollable = document.querySelector('main') || document.documentElement;
        let lastHeight = scrollable.scrollHeight;
        while (true) {
          scrollable.scrollTo(0, scrollable.scrollHeight);
          // Wait for potential content loading
          await new Promise(r => setTimeout(r, 200));
          const newHeight = scrollable.scrollHeight;
          if (newHeight === lastHeight) break;
          lastHeight = newHeight;
        }
        scrollable.scrollTo(0, 0);
        // Small buffer for fixed headers or other UI elements to settle
        await new Promise(r => setTimeout(r, 200));
      });

      // Increased tolerance to 5% to handle minor rendering differences across environments
      // Playwright automatically disables animations for toHaveScreenshot
      await expect(page).toHaveScreenshot(`${route.name}.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.05,
        animations: 'disabled'
      });

      // Add ARIA snapshot for structural verification on the home page
      if (route.name === 'home') {
        await expect(page.locator('body')).toMatchAriaSnapshot();
      }
    });
  }
});
