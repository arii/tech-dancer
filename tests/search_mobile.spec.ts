import { test, expect, devices } from '@playwright/test';

test.use({ ...devices['Pixel 7'] });

test.describe('Global Search Modal - Mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.skip('should open search modal via mobile menu', async ({ page }) => {
    // Open mobile menu
    await page.getByRole('navigation', { name: 'Mobile Navigation' }).getByRole('button', { name: 'Open menu' }).click();

    // Check if the menu is actually visible
    await expect(page.getByRole('dialog', { name: 'Navigation menu' })).toBeVisible();

    // Use text selector to find "Search" button
    const searchButton = page.locator('nav[aria-label="Mobile Navigation"]').locator('..').locator('div[role="dialog"]').locator('button').filter({ hasText: 'Search' });
    await searchButton.click({ force: true });

    // Modal should be visible
    await expect(page.getByPlaceholder('SEARCH REPOSITORY // FILTER BLOG & GEAR')).toBeVisible();
  });
});
