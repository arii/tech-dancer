import { test, expect } from '@playwright/test';

test.describe('ProductCard Mobile Badge Reduction', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test.beforeEach(async ({ page }) => {
    // We need to be on a page that renders ProductCard.
    // /merch is the primary route for this.
    await page.goto('./merch');
  });

  test('should show summarized roles on mobile', async ({ page }) => {
    // Find a product card that has roles
    const cards = page.getByTestId('product-card');
    const roleSummary = page.getByTestId('product-role-summary').first();

    await expect(roleSummary).toBeVisible();

    // Check if the desktop pill list is hidden
    // The desktop stack has display={{ base: 'none', md: 'flex' }}
    // In Playwright, we can check visibility.
    // Since it's 'none' at base, it should not be visible.
    const desktopRoleStack = page.locator('div.flex-row.hidden.md\\:flex').first();
    await expect(desktopRoleStack).toBeHidden();
  });

  test('should show only one tag on mobile', async ({ page }) => {
    const primaryTag = page.getByTestId('product-tag-primary').first();
    const secondaryTag = page.getByTestId('product-tag-secondary').first();

    await expect(primaryTag).toBeVisible();

    // Secondary tags should be hidden on mobile
    // display={index > 0 ? { base: 'none', md: 'block' } : 'block'}
    await expect(secondaryTag).toBeHidden();
  });
});
