import { test, expect, devices } from '@playwright/test';

test.use({ ...devices['Pixel 7'] });

test.describe('Global Search Modal - Mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./');
  });

  test('should open search modal via mobile menu', async ({ page }) => {
    // Open mobile menu
    await page.getByRole('button', { name: 'Open menu' }).click();

    // Check if the menu is actually visible
    await expect(page.getByRole('dialog', { name: 'Navigation menu' })).toBeVisible();

    // Use text selector to find "Search" button
    const searchButton = page.getByRole('button', { name: 'Search' });
    await searchButton.click();

    // Modal should be visible
    await expect(page.getByPlaceholder('Search BoomTick insights, tools, and posts')).toBeVisible();
  });
});
