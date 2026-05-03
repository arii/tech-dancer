import { test, expect } from '@playwright/test';

test.describe('Global Search Modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./');
    await page.waitForLoadState('networkidle');
  });

  test('should open and close search modal via button', async ({ page }) => {
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

    await page.getByTestId('search-backdrop').click({ position: { x: 5, y: 5 }, force: true });
    await expect(page.getByPlaceholder('SEARCH REPOSITORY // FILTER BLOG & GEAR')).not.toBeVisible();
  });

  test('should close search modal on route change', async ({ page }) => {
    await page.getByRole('navigation', { name: 'Main Navigation' }).getByRole('button', { name: 'Search' }).click();
    await expect(page.getByPlaceholder('SEARCH REPOSITORY // FILTER BLOG & GEAR')).toBeVisible();

    await page.goto('./gear');
    await page.waitForLoadState('networkidle');

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
    await page.waitForLoadState('networkidle');

    const searchButton = page.locator('button').filter({ has: page.locator('svg.lucide-search') }).first();
    await searchButton.click();

    const searchInput = page.getByPlaceholder(/SEARCH REPOSITORY/i);
    await expect(searchInput).toBeVisible();
    await searchInput.fill('swing');
    await expect(page).toHaveURL(/q=swing/);

    await page.reload();
    await page.waitForLoadState('networkidle');

    // The modal should open automatically because 'modal=true' is in the URL
    // No need to click the search button again.
    const searchInputReload = page.getByPlaceholder(/SEARCH REPOSITORY/i);
    await expect(searchInputReload).toBeVisible({ timeout: 10000 });
    await expect(searchInputReload).toHaveValue('swing');

    const resultsText = page.getByText(/RESULTS FOUND/i);
    await expect(resultsText).toBeVisible({ timeout: 10000 });
    await expect(resultsText).not.toHaveText('0 RESULTS FOUND', { timeout: 10000 });
  });

  test('Blog category filter should persist after reload', async ({ page }) => {
    await page.goto('./blog');
    await page.waitForLoadState('networkidle');

    const categoryButton = page.getByRole('button', { name: 'Tech Portfolio', exact: true }).or(page.getByRole('button', { name: 'Tech Portfolio' }).first());
    if (await categoryButton.isVisible()) {
      await categoryButton.click();
      await expect(page).toHaveURL(/category=Tech[+%20]Portfolio/);

      await page.reload();
      await page.waitForLoadState('networkidle');

      const categoryButtonReload = page.getByRole('button', { name: 'Tech Portfolio', exact: true }).or(page.getByRole('button', { name: 'Tech Portfolio' }).first());
      await expect(categoryButtonReload).toHaveClass(/bg-text-main/);
    }
  });

  test('Blog search term should persist after reload', async ({ page }) => {
    await page.goto('./blog');
    await page.waitForLoadState('networkidle');

    const searchInput = page.getByPlaceholder(/Search posts/i);
    if (await searchInput.isVisible()) {
      await searchInput.fill('west');
      await expect(page).toHaveURL(/search=west/i);

      await page.reload();
      await page.waitForLoadState('networkidle');

      const searchInputReload = page.getByPlaceholder(/Search posts/i);
      await expect(searchInputReload).toHaveValue('west');
    }
  });

  test('Gear search term should persist after reload', async ({ page }) => {
    await page.goto('./gear');
    await page.waitForLoadState('networkidle');

    const searchInput = page.getByPlaceholder(/Search gear/i);
    await expect(searchInput).toBeVisible();
    await searchInput.fill('shoes');
    await expect(page).toHaveURL(/search=shoes/i);

    await page.reload();
    await page.waitForLoadState('networkidle');

    const searchInputReload = page.getByPlaceholder(/Search gear/i);
    await expect(searchInputReload).toHaveValue('shoes');
  });
});
