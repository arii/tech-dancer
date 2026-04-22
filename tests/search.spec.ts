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

    // Click on the backdrop using the data-testid
    // We use force: true because sometimes the backdrop implementation might intercept clicks in a way Playwright objects to,
    // although for a modal backdrop click this is usually the desired behavior.
    await page.getByTestId('search-backdrop').click({ force: true });
    await expect(page.getByPlaceholder('SEARCH REPOSITORY // FILTER BLOG & GEAR')).not.toBeVisible();
  });

  test('should close search modal on route change', async ({ page }) => {
    await page.getByRole('navigation', { name: 'Main Navigation' }).getByRole('button', { name: 'Search' }).click();
    await expect(page.getByPlaceholder('SEARCH REPOSITORY // FILTER BLOG & GEAR')).toBeVisible();

    // Navigate to another page via sidebar
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
