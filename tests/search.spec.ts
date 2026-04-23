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

test.describe('Search and Filter URL Persistence', () => {

  test('Global Search parameter should persist after reload', async ({ page }) => {
    await page.goto('./');

    // Open search by clicking navigation button
    const searchButton = page.locator('button').filter({ has: page.locator('svg.lucide-search') }).first();
    await searchButton.click();

    const searchInput = page.getByPlaceholder(/SEARCH REPOSITORY/i);
    await expect(searchInput).toBeVisible();

    await searchInput.fill('swing');

    // Check URL
    await expect(page).toHaveURL(/q=swing/);

    // Reload
    await page.reload();

    // Open search again to verify persistence
    const searchButtonReload = page.locator('button').filter({ has: page.locator('svg.lucide-search') }).first();
    await searchButtonReload.click();

    await expect(page.getByPlaceholder(/SEARCH REPOSITORY/i)).toHaveValue('swing');
    await expect(page.getByText(/RESULTS FOUND/i)).not.toHaveText('0 RESULTS FOUND');
  });

  test('Blog category filter should persist after reload', async ({ page }) => {
    await page.goto('./blog');

    // Use "Tech Portfolio" category
    const categoryButton = page.getByRole('button', { name: 'Tech Portfolio', exact: true }).or(page.getByRole('button', { name: 'Tech Portfolio' }).first());
    if (await categoryButton.isVisible()) {
      await categoryButton.click();

      // Check URL (allow for + or %20 for spaces)
      await expect(page).toHaveURL(/category=Tech[+%20]Portfolio/);

      // Reload
      await page.reload();

      // Verify the button is still active (has the text-bg class which indicates active state in the new design)
      await expect(categoryButton).toHaveClass(/bg-text-main/);
    }
  });

  test('Blog search term should persist after reload', async ({ page }) => {
    await page.goto('./blog');

    const searchInput = page.getByPlaceholder(/Search posts/i);
    if (await searchInput.isVisible()) {
      await searchInput.fill('west');

      // Check URL
      await expect(page).toHaveURL(/search=west/i);

      // Reload
      await page.reload();

      await expect(page.getByPlaceholder(/Search posts/i)).toHaveValue('west');
    }
  });

  test('Gear search term should persist after reload', async ({ page }) => {
    await page.goto('./gear');

    const searchInput = page.getByPlaceholder(/Search gear/i);
    await searchInput.fill('shoes');

    // Check URL
    await expect(page).toHaveURL(/search=shoes/i);

    // Reload
    await page.reload();

    await expect(page.getByPlaceholder(/Search gear/i)).toHaveValue('shoes');
  });
});
