import { test, expect } from '@playwright/test';
import { openSearch } from './fixtures/search-helpers';

test.describe('Global Search Modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('main')).toBeVisible();
  });

  test('should open and close search modal via button', async ({ page, isMobile }) => {
    await openSearch(page, isMobile);

    const closeButton = page.getByLabel('Close search');
    await closeButton.click();
    await expect(page.getByPlaceholder(/SEARCH REPOSITORY/i)).not.toBeVisible();
  });

  test('should close search modal when pressing Escape', async ({ page, isMobile }) => {
    await openSearch(page, isMobile);

    await page.keyboard.press('Escape');
    await expect(page.getByPlaceholder(/SEARCH REPOSITORY/i)).not.toBeVisible();
  });

  test('should close search modal on route change', async ({ page, isMobile }) => {
    await openSearch(page, isMobile);

    await page.goto('./gear');

    await expect(page.getByPlaceholder(/SEARCH REPOSITORY/i)).not.toBeVisible();
    await expect(page).toHaveURL(/.*gear/);
  });

  test('should close search modal when a search result is clicked', async ({ page, isMobile }) => {
    await openSearch(page, isMobile);
    const searchInput = page.getByPlaceholder(/SEARCH REPOSITORY/i);
    await searchInput.fill('ai');

    const resultButton = page.getByTestId('search-result').first();
    await expect(resultButton).toBeVisible();

    await resultButton.click();
    await expect(page.getByPlaceholder(/SEARCH REPOSITORY/i)).not.toBeVisible();
  });
});

test.describe('Search and Filter URL Persistence', () => {

  test('Global Search parameter should persist after reload', async ({ page, isMobile }) => {
    await page.goto('./');
    await expect(page.locator('main')).toBeVisible();

    await openSearch(page, isMobile);

    const searchInput = page.getByPlaceholder(/SEARCH REPOSITORY/i);
    await searchInput.fill('swing');
    await expect(page).toHaveURL(/q=swing/);

    await page.reload();

    // The modal should open automatically because 'modal=true' is in the URL
    const searchInputReload = page.getByPlaceholder(/SEARCH REPOSITORY/i);
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

  test('Gear search term should persist after reload', async ({ page }) => {
    await page.goto('./gear');

    const searchInput = page.getByPlaceholder(/Search gear/i);
    await expect(searchInput).toBeVisible();
    await searchInput.fill('shoes');
    await expect(page).toHaveURL(/search=shoes/i);

    await page.reload();

    const searchInputReload = page.getByPlaceholder(/Search gear/i);
    await expect(searchInputReload).toHaveValue('shoes');
  });
});
