import { test, expect, devices } from '@playwright/test';

test.use({ ...devices['Pixel 7'] });

test.describe('Global Search Modal - Mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should open search modal via mobile menu', async ({ page }) => {
    // Open mobile menu
    await page.getByLabel('Open menu').click();

    // Use text selector to find "Search" button
    const searchButton = page.getByRole('button', { name: 'Search' });

    // Wait for the menu transition to finish so the button is in the viewport
    await expect(searchButton).toBeInViewport({ timeout: 5000 });

    await searchButton.click();

    // Modal should be visible
    await expect(page.getByPlaceholder('SEARCH REPOSITORY // FILTER BLOG & GEAR')).toBeVisible();
  });
});
