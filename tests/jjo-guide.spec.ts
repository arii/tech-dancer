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

  test('should render curated gear sections', async ({ page }) => {
    const gearSection = page.getByTestId('gear');
    await expect(gearSection).toBeVisible();

    // Using stable data-testids to avoid heading level conflicts
    await expect(page.getByTestId('gear-section-outfits')).toBeVisible();
    await expect(page.getByTestId('gear-section-accessories')).toBeVisible();
    await expect(page.getByTestId('gear-section-shoes-&-essentials')).toBeVisible();
    await expect(page.getByTestId('gear-section-travel-extras')).toBeVisible();
  });

  test('should render the action timeline with multiple rows', async ({ page }) => {
    // The reminders section is conditionally rendered on mobile/desktop
    // Let's ensure we are checking the mobile viewport for 'reminders'
    await page.setViewportSize({ width: 375, height: 667 });

    const remindersSection = page.getByTestId('reminders');
    await expect(remindersSection).toBeVisible();
    // Using stable data-testid instead of .group class
    const rows = remindersSection.getByTestId('timeline-row');
    await expect(rows).toHaveCount(4); // Standard WSDC timeline
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

    // For EventNavigation, it's an overflowX auto box. We use the first one matching these classes to avoid strict mode violations
    const eventNav = page.locator('.no-scrollbar.scroll-smooth').first();
    await expect(eventNav).toBeVisible();
  });
});
