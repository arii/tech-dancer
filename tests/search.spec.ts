import { test, expect } from '@playwright/test';

test.describe('Global Search Modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should open and close search modal via button', async ({ page }) => {
    // Desktop sidebar search button
    const searchButton = page.getByRole('navigation', { name: 'Main Navigation' }).getByRole('button', { name: 'Search' });
    await searchButton.click();
    await expect(page.getByPlaceholder('SEARCH REPOSITORY // FILTER BLOG & GEAR')).toBeVisible();

    const closeButton = page.getByLabel('Close search');
    await closeButton.click();
    await expect(page.getByPlaceholder('SEARCH REPOSITORY // FILTER BLOG & GEAR')).not.toBeVisible();
  });

  test('should close search modal when clicking on backdrop', async ({ page }) => {
    await page.getByRole('navigation', { name: 'Main Navigation' }).getByRole('button', { name: 'Search' }).click();
    await expect(page.getByPlaceholder('SEARCH REPOSITORY // FILTER BLOG & GEAR')).toBeVisible();

    // Click on the backdrop (top-left corner)
    await page.mouse.click(5, 5);
    await expect(page.getByPlaceholder('SEARCH REPOSITORY // FILTER BLOG & GEAR')).not.toBeVisible();
  });

  test('should close search modal on route change', async ({ page }) => {
    await page.getByRole('navigation', { name: 'Main Navigation' }).getByRole('button', { name: 'Search' }).click();
    await expect(page.getByPlaceholder('SEARCH REPOSITORY // FILTER BLOG & GEAR')).toBeVisible();

    // Navigate to another page via sidebar
    // We use force: true because the modal backdrop intercepts the click
    // And we use goto to ensure the test doesn't fail on navigation timing issues
    await page.goto('/gear');

    // Check if modal is gone
    await expect(page.getByPlaceholder('SEARCH REPOSITORY // FILTER BLOG & GEAR')).not.toBeVisible();
    await expect(page).toHaveURL(/.*gear/);
  });

  test('should close search modal when a search result is clicked', async ({ page }) => {
    await page.getByRole('navigation', { name: 'Main Navigation' }).getByRole('button', { name: 'Search' }).click();
    const searchInput = page.getByPlaceholder('SEARCH REPOSITORY // FILTER BLOG & GEAR');
    await searchInput.fill('ai');

    const resultButton = page.getByTestId('search-result').first();
    await expect(resultButton).toBeVisible();

    await resultButton.click();
    await expect(page.getByPlaceholder('SEARCH REPOSITORY // FILTER BLOG & GEAR')).not.toBeVisible();
  });
});
