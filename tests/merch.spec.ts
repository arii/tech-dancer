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
    await expect(productCards).not.toHaveCount(0);
  });

  test('should have sticky filter bar', async ({ page }) => {
    const filterBar = page.locator('.sticky.top-0');
    await expect(filterBar).toBeVisible();

    // Scroll down and ensure it's still in viewport
    await page.evaluate(() => window.scrollTo(0, 1000));
    const isVisible = await filterBar.isVisible();
    expect(isVisible).toBe(true);
  });

  test('should display collection sections with headers and links', async ({ page }) => {
    const sections = ['norcal-golden-gate', 'lead-follow-switch'];
    for (const id of sections) {
      const section = page.locator(`section#${id}`);
      await expect(section).toBeVisible();
      const header = section.locator('h2');
      await expect(header).toBeVisible();
      const link = section.locator('a', { hasText: 'View collection →' });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', `#${id}`);
    }
  });

  test('should filter products by collection', async ({ page }) => {
    // Click on 'Lead · Follow · Switch' filter
    await page.getByRole('button', { name: 'Lead · Follow · Switch' }).click();

    // In filtered view, sections are collapsed to a flat grid.
    // We should check for product cards that belong to this collection.
    const productCard = page.getByTestId('product-card').filter({ hasText: /Lead . Follow . Switch/i }).first();
    await expect(productCard).toBeVisible();

    // Check other collections' unique items are NOT visible (e.g., NorCal specific)
    const norcalItem = page.getByTestId('product-card').filter({ hasText: /NorCal Best Cal/i }).first();
    await expect(norcalItem).not.toBeVisible();

    // Check URL persistence
    await expect(page).toHaveURL(/collection=lead-follow-switch/);
  });

  test('should display bundle badge and note', async ({ page }) => {
    // Bundle product is in "other" collection
    await page.getByRole('button', { name: 'More designs' }).click();

    const bundleCard = page.getByTestId('product-card').filter({ hasText: 'Test Bundle Product' });
    await expect(bundleCard.getByTestId('bundle-badge')).toBeVisible();
    await expect(bundleCard.getByText('Save 10% as a set')).toBeVisible();
  });
});
