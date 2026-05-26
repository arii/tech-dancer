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

  test('should render the theme spotlight with rainbow colors', async ({ page }) => {
    const themeSection = page.getByTestId('theme');
    await expect(themeSection).toBeVisible();
    await expect(themeSection.getByText('Rainbow', { exact: true })).toBeVisible();

    // Check if color swatches are present
    const swatches = themeSection.locator('div[title^="#"]');
    await expect(swatches).toHaveCount(6);
  });

  test('should render curated gear sections (with deduplication and capping)', async ({ page }) => {
    const gearSection = page.getByTestId('gear');
    await expect(gearSection).toBeVisible();

    // Deduplication logic: Accessories are all in theme, so they won't appear in gear section
    await expect(gearSection.getByRole('heading', { name: 'Outfits' })).toBeVisible();
    await expect(gearSection.getByRole('heading', { name: 'Shoes & Essentials' })).toBeVisible();

    // Note: 'Travel Extras' may be capped if total products exceed 15
    // For JJO: 6 theme outfits + 3 theme accessories + 3 gear outfits + 3 shoes = 15 items reached.
    await expect(gearSection.getByRole('heading', { name: 'Travel Extras' })).not.toBeVisible();
  });

  test('should render the action timeline in sidebar (desktop)', async ({ page }) => {
    // On desktop, reminders are in the sidebar under "IMPORTANT DATES" (uppercase in UI)
    const sidebar = page.locator('aside');
    // JJO has no dates, so important dates section should not be visible
    await expect(sidebar.getByText('IMPORTANT DATES')).not.toBeVisible();
  });

  test('should render the action timeline inline (mobile)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    // JJO has no dates, so reminders section should be hidden entirely
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

  test('responsive check - mobile viewport navigation', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Header should still be visible
    const hero = page.getByTestId('hero');
    await expect(hero.getByRole('heading', { name: 'Jack & Jill O\'Rama' })).toBeVisible();

    // For EventNavigation, it's an overflowX auto box.
    const eventNav = page.locator('.no-scrollbar.scroll-smooth');
    await expect(eventNav).toBeVisible();
  });
});
