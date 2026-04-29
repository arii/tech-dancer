import { test } from '@playwright/test';
import percySnapshot from '@percy/playwright';

const routes = [
  { name: 'home', path: './' },
  { name: 'blog', path: './blog' },
  { name: 'gear', path: './gear' },
  { name: 'research', path: './research' },
  { name: 'about', path: './about' },
  { name: 'contact', path: './contact' }
];

test.describe('Visual Regression Tests with Percy', () => {
  for (const route of routes) {
    test(`percy snapshot for ${route.name}`, async ({ page }) => {
      await page.goto(route.path);
      await page.waitForLoadState('networkidle');

      // Ensure the main content is loaded
      await page.locator('#root').waitFor();

      // Percy automatically handles different widths if configured in Percy project settings
      // We take snapshots on all PRs to catch UI changes early.
      await percySnapshot(page, `Visual comparison for ${route.name}`);
    });
  }
});
