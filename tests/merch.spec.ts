import { test, expect } from '@playwright/test';

test.describe('Merch Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./merch');
  });

  test('should load the merch page with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/West Coast Swing Dance Merch/);
    await expect(page.getByRole('heading', { name: /West Coast Swing Dance Merch/i })).toBeVisible();
  });

  test('should display referral banners with correct links', async ({ page }) => {
    const referralLinks = page.locator('a[href*="printful.com/give-5-get-5"]');
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
    await expect(printfulLinks.first()).toBeVisible();

    for (const link of await printfulLinks.all()) {
      await expect(link).toHaveAttribute('rel', 'sponsored noopener noreferrer');
      await expect(link).toHaveAttribute('target', '_blank');
    }
  });

  test('should display the promo strip with correct link', async ({ page }) => {
    const promoStrip = page.locator('a[href*="collection/lead-follow-switch"]');
    await expect(promoStrip).toBeVisible();
    await expect(promoStrip).toHaveAttribute('rel', 'sponsored noopener noreferrer');
    await expect(promoStrip).toHaveAttribute('target', '_blank');
    await expect(promoStrip.getByText('The Multi-Role Collection')).toBeVisible();
    await expect(promoStrip.getByText('Shop Collection')).toBeVisible();
  });
});
