import { test, expect, devices } from '@playwright/test';

test.use({ ...devices['Pixel 7'] });

test.describe('Global Search Modal - Mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should open search modal via mobile menu', async ({ page }) => {
    // Open mobile menu
    await page.getByTestId('mobile-menu-trigger').click();

    // Check if the menu is actually visible
    await expect(page.getByTestId('mobile-menu')).toBeVisible();

    // Use testid to find "Search" button in mobile menu
    const searchButton = page.getByTestId('search-trigger-mobile');
    await searchButton.click({ force: true });

    // Modal should be visible
    await expect(page.getByPlaceholder('SEARCH REPOSITORY // FILTER BLOG & GEAR')).toBeVisible();
  });
});
