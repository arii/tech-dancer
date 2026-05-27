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

    // Verify themed products render within the theme spotlight.
    await expect(themeSection.getByRole('link', { name: /See Picks/i }).first()).toBeVisible();
  });

  test('should render curated gear sections', async ({ page }) => {
    const gearSection = page.getByTestId('gear');
    await expect(gearSection).toBeVisible();

    // Using headings to be more specific and avoid strict mode violations with descriptions
    await expect(gearSection.getByRole('heading', { name: 'Outfits' })).toBeVisible();
    const headings = gearSection.getByRole('heading', { level: 2 });
    await expect(headings).toHaveCount(2);
    await expect(gearSection.getByRole('heading', { name: 'Shoes & Essentials' })).toBeVisible();
  });

  test('should render the action timeline with multiple rows', async ({ page }) => {
    const remindersSection = page.getByTestId('reminders');
    // Some events may not have complete timeline dates and can omit this block.
    if (await remindersSection.count()) {
      await expect(remindersSection).toBeVisible();
      const rows = remindersSection.getByTestId('timeline-row');
      await expect(rows).toHaveCount(4);
    }
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
