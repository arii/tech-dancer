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
    await expect(productCards.first()).toBeVisible();
    expect(await productCards.count()).toBeGreaterThanOrEqual(14);

    // Assert existence of the new Slot Era products specifically
    await expect(page.getByRole('link', { name: /Slot Era WCS Women's Racerback Tank Top/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /Slot Era WCS Tote Bag/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /Slot Era Black Ceramic Mug/i }).first()).toBeVisible();
  });

  test('should filter products by collection', async ({ page }) => {
    // Click on 'Lead/Follow/Switch' filter
    await page.getByRole('button', { name: 'Lead/Follow/Switch' }).click();

    // Check that we only see relevant products (should be 4 based on data)
    const filteredCards = page.getByTestId('product-card');
    await expect(filteredCards).toHaveCount(4);

    // Reset filter
    await page.getByRole('button', { name: 'All' }).click();
    expect(await filteredCards.count()).toBeGreaterThanOrEqual(14);
  });

  test('should have correct attributes on Printful external links', async ({ page }) => {
    const printfulLinks = page.locator('a[href*="boomtick.printful.me"]');
    await expect(printfulLinks.first()).toBeVisible();

    for (const link of await printfulLinks.all()) {
      await expect(link).toHaveAttribute('rel', 'sponsored noopener noreferrer');
      await expect(link).toHaveAttribute('target', '_blank');
    }
  });

  test('should render Order on Printful Store button on gear landing pages', async ({ page }) => {
    await page.goto('/gear/2024-06-01-norcal-gate-crop-hoodie');
    await expect(page.getByRole('heading', { name: /Golden Gate Crop Hoodie/i })).toBeVisible();
    const buyButton = page.getByRole('link', { name: /Order on Printful Store/i });
    await expect(buyButton).toBeVisible();
    await expect(buyButton).toHaveAttribute('href', 'https://boomtick.printful.me/product/norcal-bestcal-golden-gate-crop-hoodie');
    await expect(buyButton).toHaveAttribute('target', '_blank');
  });
});
