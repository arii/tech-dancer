import { test, expect } from '@playwright/test';

test.describe('Merch Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./merch');
  });

  test('should load the merch page with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Shop WCS Dance Merch/);
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
    await expect(productCards).toHaveCount(11);

    // Check alt text for first product
    const firstProduct = productCards.first();
    const images = firstProduct.locator('img');
    await expect(images.first()).toHaveAttribute('alt', /Front view/i);
    await expect(images.last()).toHaveAttribute('alt', /Back view/i);
  });

  test('should display front/back labels', async ({ page }) => {
    // Select a card with both front and back images (e.g., the first one)
    const card = page.getByTestId('product-card').first();
    await expect(card.getByText('Front', { exact: true })).toBeVisible();
    await expect(card.getByText('Back', { exact: true })).toBeVisible();
  });

  test('should filter products by collection', async ({ page }) => {
    // Click on 'Role Pride' filter
    await page.getByRole('button', { name: 'Role Pride' }).click();

    // Check that we only see relevant products (should be 4 based on data: love-neon-follow, love-neon-lead, lead-follow-switch-love-neon, love-role-checklist)
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
