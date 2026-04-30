import { test, expect } from '@playwright/test';
import percySnapshot from '@percy/playwright';
import { TEST_ROUTES } from '../config/routes';

test.describe('Visual Regression Tests with Percy', () => {
  for (const route of TEST_ROUTES) {
    test(`visual snapshot for ${route.name}`, async ({ page }) => {
      await page.goto(route.path);
      await page.waitForLoadState('networkidle');

      // Ensure the main content is loaded
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

      await percySnapshot(page, `Snapshot for ${route.name}`);
    });
  }
});
