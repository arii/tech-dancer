import { test, expect, devices } from '@playwright/test';

test.use({ ...devices['Pixel 7'] });

test.describe('Global Search Modal - Mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should open search modal via mobile menu', async ({ page }) => {
    await page.getByLabel('Open menu').click();

    const searchButton = page.getByRole('button', { name: 'Search' });
    await expect(searchButton).toBeInViewport({ timeout: 5000 });
    await searchButton.click();

    await expect(page.getByPlaceholder('SEARCH REPOSITORY // FILTER BLOG & GEAR')).toBeVisible();
  });
});
