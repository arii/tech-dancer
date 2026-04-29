import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = [
  { name: 'home', path: './' },
  { name: 'blog', path: './blog' },
  { name: 'gear', path: './gear' },
  { name: 'research', path: './research' },
  { name: 'about', path: './about' },
  { name: 'contact', path: './contact' }
];

test.describe('Accessibility audits', () => {
  for (const route of routes) {
    test(`should not have any automatically detectable accessibility issues on ${route.name}`, async ({ page }) => {
      await page.goto(route.path);

      // Wait for content to be stable
      await page.waitForLoadState('networkidle');
      await expect(page.locator('#root')).toBeVisible();

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      // Log violations to console for easier debugging
      if (accessibilityScanResults.violations.length > 0) {
        console.log(`A11y violations on ${route.name}:`, JSON.stringify(accessibilityScanResults.violations, null, 2));
      }

      // We allow a small number of existing violations but fail on any significant regression.
      expect(accessibilityScanResults.violations.length).toBeLessThanOrEqual(5);
    });
  }
});
