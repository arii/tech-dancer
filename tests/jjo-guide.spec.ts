import { test, expect } from '@playwright/test';

test.describe('Jack & Jill O\'Rama Guide', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./events/jack-and-jill-orama');
  });

  test('should render the hero section with correct title and whyAttending blurb', async ({ page }) => {
    const hero = page.getByTestId('hero');
    await expect(hero.getByRole('heading', { name: 'Jack & Jill O\'Rama' })).toBeVisible();
    await expect(page.getByTestId('why-attending')).toContainText('I keep coming back to Jack & Jill O\'Rama');
  });

  test('should render the theme spotlight with rainbow colors and inspiration tiles', async ({ page }) => {
    const themeSection = page.getByTestId('theme');
    await expect(themeSection).toBeVisible();
    await expect(themeSection.getByText('Rainbow', { exact: true })).toBeVisible();

    // Check if color swatches are present
    const swatches = themeSection.locator('div[title^="#"]');
    await expect(swatches).toHaveCount(6);

    // Check for inspiration sections
    await expect(themeSection.getByText('Outfit Inspiration')).toBeVisible();
    await expect(themeSection.getByText('Accessory Ideas')).toBeVisible();
  });

  test('should render curated gear sections (excluding theme redundancy)', async ({ page }) => {
    const gearSection = page.getByTestId('gear');
    await expect(gearSection).toBeVisible();

    // Outfits and Accessories should now be moved to Theme Spotlight
    await expect(gearSection.getByRole('heading', { name: 'Outfits' })).not.toBeVisible();
    await expect(gearSection.getByRole('heading', { name: 'Accessories' })).not.toBeVisible();

    // These sections should remain
    await expect(gearSection.getByRole('heading', { name: 'Shoes & Essentials' })).toBeVisible();
    await expect(gearSection.getByRole('heading', { name: 'Travel Extras' })).toBeVisible();
  });

  test('should not render the action timeline when dates are absent', async ({ page }) => {
    const remindersSection = page.getByTestId('reminders');
    await expect(remindersSection).not.toBeVisible();
  });

  test('should render related events', async ({ page }) => {
    const relatedSection = page.getByTestId('related');
    await expect(relatedSection).toBeVisible();
    await expect(relatedSection.getByText('Wild Wild Westie')).toBeVisible();
    await expect(relatedSection.getByText('Swingtacular')).toBeVisible();
    await expect(relatedSection.getByText('Boogie by the Bay')).toBeVisible();
  });

  test('responsive check - mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Header should still be visible
    const hero = page.getByTestId('hero');
    await expect(hero.getByRole('heading', { name: 'Jack & Jill O\'Rama' })).toBeVisible();

    // For EventNavigation, it's an overflowX auto box.
    const eventNav = page.locator('.no-scrollbar.scroll-smooth');
    await expect(eventNav).toBeVisible();
  });
});
