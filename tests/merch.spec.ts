import { test, expect } from '@playwright/test';

test.describe('Merch Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./merch');
  });

  test('should load the merch page with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Shop WCS Dance Merch \| BoomTick/);
    await expect(page.getByRole('heading', { name: /Dance Merch/i })).toBeVisible();
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
    await expect(productCards).toHaveCount(11);
  });

  test('should filter products by collection', async ({ page }) => {
    // Click on 'Role Pride' filter
    await page.getByRole('button', { name: 'Role Pride' }).click();

    // Check that we only see relevant products (should be 4 based on data)
    const filteredCards = page.getByTestId('product-card');
    await expect(filteredCards).toHaveCount(4);

    // Reset filter
    await page.getByRole('button', { name: 'All' }).click();
    await expect(filteredCards).toHaveCount(11);
  });

  test('should have correct attributes on Printful external links', async ({ page }) => {
    const printfulLinks = page.locator('a[href*="boomtick.printful.me"]');
    await expect(printfulLinks.first()).toBeVisible();

    for (const link of await printfulLinks.all()) {
      await expect(link).toHaveAttribute('rel', 'sponsored noopener noreferrer');
      await expect(link).toHaveAttribute('target', '_blank');
    }
  });
});
