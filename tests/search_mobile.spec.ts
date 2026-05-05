import { test, expect, devices } from '@playwright/test';

test.use({ ...devices['Pixel 7'] });

test.describe('Global Search Modal - Mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should open search modal via mobile menu', async ({ page }) => {
    // Open mobile menu
    await page.getByTestId('button-toggle-nav').click();

    // Check if the menu is actually visible
    const searchButton = page.getByText('Search', { exact: true }).first();
    await expect(searchButton).toBeVisible();

    await searchButton.click({ force: true });

    // Modal should be visible
    await expect(page.getByPlaceholder('SEARCH REPOSITORY // FILTER BLOG & GEAR')).toBeVisible();
  });
});
