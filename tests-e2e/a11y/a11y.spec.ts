import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { TEST_ROUTES } from '../config/routes';

test.describe('Accessibility audits', () => {
  for (const route of TEST_ROUTES) {
    test(`should not have any detectable accessibility violations on ${route.name}`, async ({ page }) => {
      await page.goto(route.path);

      // Wait for content to be stable
      await page.waitForLoadState('networkidle');
      await expect(page.locator('#root')).toBeVisible();

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .disableRules(['color-contrast']) // Documented technical debt: Color contrast issues exist in legacy design tokens
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});
