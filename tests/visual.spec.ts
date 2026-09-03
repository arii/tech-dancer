import { test, expect } from './fixtures/visual';
import { assertVisualMatch } from './utils/visual-helpers';

const routes = [
  { name: 'home', path: './' },
  { name: 'blog', path: './blog' },
  { name: 'gear', path: './gear' },
  { name: 'research', path: './research', waitSelector: 'h1:has-text("Experiments")' },
  { name: 'about', path: './about' },
  { name: 'ux-auditor', path: './ux-auditor', mainSelector: '[data-testid="ux-auditor-container"]' },
  { name: 'preview', path: './preview', waitText: 'Component Preview' },
  { name: 'merch', path: './merch', mainSelector: '[data-testid="merch-feed"]' },
  { name: 'halloween-costumes-mobile', path: './blog/2026-04-18-halloween-costumes', viewport: { width: 390, height: 844 } }
];

test.describe('Visual Regression Tests', () => {
  for (const route of routes) {
    test(`visual comparison for ${route.name}`, async ({ page }) => {
      if (route.viewport) {
        await page.setViewportSize(route.viewport);
      }
      await page.goto(route.path);

      if (route.waitSelector) {
         await expect(page.locator(route.waitSelector)).toBeVisible({ timeout: 30000 });
      }

      if (route.waitText) {
         await expect(page.getByText(route.waitText)).toBeVisible();
      }

      await assertVisualMatch(page, `${route.name}.png`, {
        mainSelector: route.mainSelector || 'main'
      });
    });
  }
});
