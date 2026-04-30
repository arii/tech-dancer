import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { TEST_ROUTES } from '../config/routes';

test.describe('Accessibility audits', () => {
  for (const route of TEST_ROUTES) {
    test(`should not have any detectable accessibility violations on ${route.name}`, async ({ page }) => {
      await page.goto(route.path);

      // Ensure the root element is visible before auditing
      await expect(page.locator('#root')).toBeVisible();

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .disableRules(['color-contrast']) // TODO: Resolve color contrast as per issue #402
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});
