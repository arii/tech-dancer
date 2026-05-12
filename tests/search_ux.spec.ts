import { test, expect } from '@playwright/test';

test.describe('Global Search Modal UX Refinement', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('main')).toBeVisible();
  });

  test('should show "READY TO SEARCH" when modal is opened with no query', async ({ page }) => {
    const searchButton = page.getByRole('navigation', { name: 'Main Navigation' }).getByRole('button', { name: 'Search' });
    await searchButton.click();
    await expect(page.getByText('READY TO SEARCH')).toBeVisible();
  });

  test('should show "NO RESULTS FOUND" when query has no matches', async ({ page }) => {
    const searchButton = page.getByRole('navigation', { name: 'Main Navigation' }).getByRole('button', { name: 'Search' });
    await searchButton.click();

    const searchInput = page.getByPlaceholder('SEARCH REPOSITORY // FILTER BLOG & GEAR');
    await searchInput.fill('nonexistent-query-xyz-123');

    await expect(page.getByText('NO RESULTS FOUND')).toBeVisible();
  });

  test('should show "SEARCHING..." state when simulated loading is active', async ({ page }) => {
    // Enable simulated loading via window property
    await page.addInitScript(() => {
      (window as Window & { __SIMULATE_LOADING?: boolean }).__SIMULATE_LOADING = true;
    });

    // Reload to ensure the init script takes effect for any immediate queries
    await page.reload();
    await expect(page.locator('main')).toBeVisible();

    const searchButton = page.getByRole('navigation', { name: 'Main Navigation' }).getByRole('button', { name: 'Search' });
    await searchButton.click();

    // The "SEARCHING..." text should be visible because of the 1s delay
    await expect(page.getByText('SEARCHING...')).toBeVisible();

    // After delay, it should transition to READY TO SEARCH (since query is empty)
    await expect(page.getByText('READY TO SEARCH')).toBeVisible({ timeout: 5000 });
  });
});
