import { test, expect } from '@playwright/test';

test.describe('Merch Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./merch');
  });

  test('should load the merch page with correct title and header cta', async ({ page }) => {
    await expect(page).toHaveTitle(/West Coast Swing Dance Merch/);
    await expect(page.getByRole('heading', { name: /West Coast Swing Dance Merch/i })).toBeVisible();

    // Check PageHeader CTA buttons
    await expect(page.getByRole('link', { name: /Shop Printful Store/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Claim \$5 Discount/i })).toBeVisible();
  });

  test('should display referral banners with correct links', async ({ page }) => {
    const referralLinks = page.locator('a[href*="printful.com/give-5-get-5"]');
    // One in PageHeader CTA, one in ReferralBanner at the bottom
    await expect(referralLinks).toHaveCount(2);

    for (const link of await referralLinks.all()) {
      await expect(link).toHaveAttribute('rel', 'sponsored noopener noreferrer');
      await expect(link).toHaveAttribute('target', '_blank');
    }
  });

  test('should display product cards', async ({ page }) => {
    const productCards = page.getByTestId('product-card');
    // Note: The count is 19 because there are 11 unique products.
    // Some products appear in multiple collections when the "All" filter is active,
    // summing to a total of 19 card components rendered across the page.
    await expect(productCards).toHaveCount(19);
  });

  test('should filter products by collection', async ({ page }) => {
    // Click on 'Lead/Follow/Switch' filter
    await page.getByRole('button', { name: 'Lead/Follow/Switch' }).click();

    // Check that we only see relevant products (should be 4 based on data)
    const filteredCards = page.getByTestId('product-card');
    await expect(filteredCards).toHaveCount(4);

    // Reset filter
    await page.getByRole('button', { name: 'All' }).click();
    await expect(filteredCards).toHaveCount(19);
  });

  test('should have correct attributes on Printful external links', async ({ page }) => {
    const printfulLinks = page.locator('a[href*="boomtick.printful.me"]');
    // At least one should be visible (header CTA)
    await expect(printfulLinks.first()).toBeVisible();

    for (const link of await printfulLinks.all()) {
      await expect(link).toHaveAttribute('rel', 'sponsored noopener noreferrer');
      await expect(link).toHaveAttribute('target', '_blank');
    }
  });

  test('should display correct CTA text and accessibility labels on product cards', async ({ page }) => {
    const productCards = page.getByTestId('product-card');

    // Test "SEE OPTIONS" for a product known to have multiple images/configurations
    // "Rainbow War Eagle" has both-equal display mode. It appears twice in "All" view.
    const warEagleCard = productCards.filter({ hasText: /Rainbow War Eagle/i }).first();
    await expect(warEagleCard).toBeVisible();
    await expect(warEagleCard.locator('a', { hasText: /SEE OPTIONS/i })).toBeVisible();
    await expect(warEagleCard.locator('a', { hasText: /SEE OPTIONS/i })).toHaveAttribute('aria-label', /View Rainbow War Eagle - Pride Back Print Organic Oversized Tee on Printful/i);

    // Test "VIEW ON PRINTFUL" for a simple product
    // "NorCal Best Cal - Golden Gate Classic Unisex Tee" has front-only and 1 image
    const classicTeeCard = productCards.filter({ hasText: /Golden Gate Classic Unisex Tee/i }).first();
    await expect(classicTeeCard).toBeVisible();
    await expect(classicTeeCard.locator('a', { hasText: /VIEW ON PRINTFUL/i })).toBeVisible();
    await expect(classicTeeCard.locator('a', { hasText: /VIEW ON PRINTFUL/i })).toHaveAttribute('aria-label', /View NorCal Best Cal - Golden Gate Classic Unisex Tee on Printful/i);
  });
});
