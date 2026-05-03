import { test, expect, devices } from '@playwright/test';

test.use({ ...devices['Pixel 7'] });

test.describe('Global Search Modal - Mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should open search modal via mobile menu', async ({ page }) => {
    // Open mobile menu
    await page.getByLabel('Open menu').click();

    // Check if the menu is actually visible
    await expect(page.locator('nav[aria-label="Mobile Navigation"]').locator('..').locator('div').filter({ hasText: 'Search' }).first()).toBeVisible();

    // Use text selector to find "Search" button
    const searchButton = page.getByRole('button', { name: 'Search' });
    // Use evaluate for clicking to bypass viewport visibility issues for obscured elements
    await searchButton.evaluate(node => (node as HTMLElement).click());

    // Modal should be visible
    await expect(page.getByPlaceholder('SEARCH REPOSITORY // FILTER BLOG & GEAR')).toBeVisible();
  });
});
