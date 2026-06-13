import { test, expect } from '@playwright/test';

test.describe('ProductCard Mobile Badge Reduction', () => {
  test.describe('Mobile Viewport', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test.beforeEach(async ({ page }) => {
      await page.goto('./merch');
    });

    test('should show summarized roles and limited tags on mobile', async ({ page }) => {
      // Find a product card that has roles
      const roleSummary = page.getByTestId('product-role-summary').first();
      await expect(roleSummary).toBeVisible();

      // Desktop pill list should be hidden (md:flex)
      // We can check if it's hidden. Note: locator might need to be specific to the first card
      const firstCard = page.getByTestId('product-card').first();
      const desktopRoleStack = firstCard.locator('div.flex-row.hidden.md\\:flex');
      await expect(desktopRoleStack).toBeHidden();

      // Check tags
      const primaryTags = firstCard.getByTestId('product-tag-primary');
      const secondaryTag = firstCard.getByTestId('product-tag-secondary');

      await expect(primaryTags).toHaveCount(2); // Based on the first product in catalog
      await expect(secondaryTag).toBeHidden();
    });
  });

  test.describe('Desktop Viewport', () => {
    test.use({ viewport: { width: 1280, height: 800 } });

    test.beforeEach(async ({ page }) => {
      await page.goto('./merch');
    });

    test('should show individual pills and more tags on desktop', async ({ page }) => {
      const firstCard = page.getByTestId('product-card').first();

      // Role summary should be hidden on desktop (md:none)
      const roleSummary = firstCard.getByTestId('product-role-summary');
      await expect(roleSummary).toBeHidden();

      // Desktop pill list should be visible (md:flex)
      const desktopRoleStack = firstCard.locator('div.flex-row.md\\:flex');
      await expect(desktopRoleStack.first()).toBeVisible();

      // Check tags - should show the third tag if it exists
      const secondaryTag = firstCard.getByTestId('product-tag-secondary');
      await expect(secondaryTag.first()).toBeVisible();
    });
  });
});
