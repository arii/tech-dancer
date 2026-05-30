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
    // We have one in hero (ReferralBanner expanded) and one in footer (ReferralBanner compact)
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

    // Check that we only see relevant products (should be 5 based on data: love-neon-follow, love-neon-lead, lead-follow-switch-love-neon, love-role-checklist, norcal-bestcal-golden-gate-pride)
    // Wait, let's check src/data/merch.ts
    // 1. love-neon-follow: collections: ['role-pride', 'pride']
    // 2. norcal-bestcal-pride-bear: collections: ['norcal', 'pride']
    // 3. love-neon-lead: collections: ['role-pride', 'pride']
    // 4. lead-follow-switch-love-neon: collections: ['role-pride', 'pride']
    // 5. love-role-checklist: collections: ['role-pride']
    // 6. war-eagle-oversized: collections: ['norcal']
    // 7. mens-bear-tank-norcal: collections: ['norcal']
    // 8. norcal-bestcal-cropped-top: collections: ['norcal']
    // 9. norcal-bestcal-golden-gate-hoodie: collections: ['norcal']
    // 10. norcal-bestcal-golden-gate-pride: collections: ['norcal', 'pride']
    // 11. norcal-bestcal-classic: collections: ['norcal']

    // Role Pride count: 1, 3, 4, 5. (Wait, let's re-verify)
    // - love-neon-follow (1)
    // - love-neon-lead (3)
    // - lead-follow-switch-love-neon (4)
    // - love-role-checklist (5)
    // Total = 4.

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
