import { test, expect } from '@playwright/test';

test.describe('Global Search Modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('main')).toBeVisible();
  });

  test('should open and close search modal via button', async ({ page }) => {
    const searchButton = page.getByRole('navigation', { name: 'Main Navigation' }).getByRole('button', { name: 'Search' });
    await searchButton.click();
    await expect(page.getByPlaceholder('Search BoomTick guides, gear, and posts')).toBeVisible();

    const closeButton = page.getByLabel('Close search');
    await closeButton.click();
    await expect(page.getByPlaceholder('Search BoomTick guides, gear, and posts')).not.toBeVisible();
  });

  test('should auto-focus the search input when opened', async ({ page }) => {
    const searchButton = page.getByRole('navigation', { name: 'Main Navigation' }).getByRole('button', { name: 'Search' });
    await searchButton.click();

    const searchInput = page.getByPlaceholder('Search BoomTick guides, gear, and posts');
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toBeFocused();
  });

  test('should close search modal when pressing Escape', async ({ page }) => {
    await page.getByRole('navigation', { name: 'Main Navigation' }).getByRole('button', { name: 'Search' }).click();
    await expect(page.getByPlaceholder('Search BoomTick guides, gear, and posts')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByPlaceholder('Search BoomTick guides, gear, and posts')).not.toBeVisible();
  });

// Test removed due to gear page decommissioning

  test('should close search modal when a search result is clicked', async ({ page }) => {
    await page.getByRole('navigation', { name: 'Main Navigation' }).getByRole('button', { name: 'Search' }).click();
    const searchInput = page.getByPlaceholder('Search BoomTick guides, gear, and posts');
    await searchInput.fill('ai');

    const resultButton = page.getByTestId('search-result').first();
    await expect(resultButton).toBeVisible();

    await resultButton.click();
    await expect(page.getByPlaceholder('Search BoomTick guides, gear, and posts')).not.toBeVisible();
  });
});

test.describe('Search and Filter URL Persistence', () => {

  test('Global Search parameter should persist after reload', async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('main')).toBeVisible();

    const searchButton = page.locator('button').filter({ has: page.locator('svg.lucide-search') }).first();
    await searchButton.click();

    const searchInput = page.getByPlaceholder(/Search BoomTick/i);
    await expect(searchInput).toBeVisible();
    await searchInput.fill('swing');
    await expect(page).toHaveURL(/q=swing/);

    await page.reload();

    // The modal should open automatically because 'modal=true' is in the URL
    // No need to click the search button again.
    const searchInputReload = page.getByPlaceholder(/Search BoomTick/i);
    await expect(searchInputReload).toBeVisible({ timeout: 10000 });
    await expect(searchInputReload).toHaveValue('swing');

    const resultsCount = page.getByTestId('search-dialog').getByTestId('search-results-count');
    await expect(resultsCount).toBeVisible({ timeout: 10000 });
    await expect(resultsCount).not.toHaveText('0 RESULTS FOUND', { timeout: 10000 });
  });

  test('Blog category filter should persist after reload', async ({ page }) => {
    await page.goto('./blog');

    const categoryButton = page.getByRole('button', { name: 'Tech Portfolio', exact: true }).or(page.getByRole('button', { name: 'Tech Portfolio' }).first());
    if (await categoryButton.isVisible()) {
      await categoryButton.click();
      await expect(page).toHaveURL(/category=Tech[+%20]Portfolio/);

      await page.reload();

      const categoryButtonReload = page.getByRole('button', { name: 'Tech Portfolio', exact: true }).or(page.getByRole('button', { name: 'Tech Portfolio' }).first());
      await expect(categoryButtonReload).toHaveClass(/bg-text-main/);
    }
  });

  test('Blog search term should persist after reload', async ({ page }) => {
    await page.goto('./blog');

    const searchInput = page.getByPlaceholder(/Search posts/i);
    if (await searchInput.isVisible()) {
      await searchInput.fill('west');
      await expect(page).toHaveURL(/search=west/i);

      await page.reload();

      const searchInputReload = page.getByPlaceholder(/Search posts/i);
      await expect(searchInputReload).toHaveValue('west');
    }
  });

  test('Gear search term should persist after reload', async () => {
    // Gear page is decommissioned, skipping this test.
    test.skip();
  });
});
