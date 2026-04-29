import { test, expect, Page } from '@playwright/test';

async function openSearch(page: Page, isMobile: boolean) {
  if (isMobile) {
    await page.getByLabel('Open menu').click();
    await page.getByTestId('mobile-search-button').click();
  } else {
    await page.getByTestId('desktop-search-button').click();
  }
}

test.describe('Global Search Modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./');
  });

  test('should open and close search modal via button', async ({ page, isMobile }) => {
    await openSearch(page, isMobile);
    const searchInput = page.getByPlaceholder('SEARCH REPOSITORY // FILTER BLOG & GEAR');
    await expect(searchInput).toBeVisible();

    const closeButton = page.getByLabel('Close search');
    await closeButton.click({ force: true });

    await expect(searchInput).not.toBeVisible({ timeout: 10000 });
  });

  test('should close search modal when clicking on backdrop', async ({ page, isMobile }) => {
    await openSearch(page, isMobile);
    const searchInput = page.getByPlaceholder('SEARCH REPOSITORY // FILTER BLOG & GEAR');
    await expect(searchInput).toBeVisible();

    await page.getByTestId('search-backdrop').click({ force: true });
    await expect(searchInput).not.toBeVisible({ timeout: 10000 });
  });

  test('should close search modal on route change', async ({ page, isMobile }) => {
    await openSearch(page, isMobile);
    const searchInput = page.getByPlaceholder('SEARCH REPOSITORY // FILTER BLOG & GEAR');
    await expect(searchInput).toBeVisible();

    await page.goto('./gear');
    await expect(searchInput).not.toBeVisible({ timeout: 10000 });
    await expect(page).toHaveURL(/.*gear/);
  });

  test('should close search modal when a search result is clicked', async ({ page, isMobile }) => {
    await openSearch(page, isMobile);
    const searchInput = page.getByPlaceholder('SEARCH REPOSITORY // FILTER BLOG & GEAR');
    await searchInput.fill('ai');

    const resultButton = page.getByTestId('search-result').first();
    await expect(resultButton).toBeVisible();

    await resultButton.click();
    await expect(searchInput).not.toBeVisible({ timeout: 10000 });
  });
});

test.describe('Search and Filter URL Persistence', () => {

  test('Global Search parameter should persist after reload', async ({ page, isMobile }) => {
    await page.goto('./');

    await openSearch(page, isMobile);

    const searchInput = page.getByPlaceholder(/SEARCH REPOSITORY/i);
    await expect(searchInput).toBeVisible();

    await searchInput.fill('swing');
    await expect(page).toHaveURL(/search=true/);
    await expect(page).toHaveURL(/q=swing/);

    await page.reload();

    await openSearch(page, isMobile);

    await expect(page.getByPlaceholder(/SEARCH REPOSITORY/i)).toHaveValue('swing');
  });

  test('Blog category filter should persist after reload', async ({ page }) => {
    await page.goto('./blog');

    const categoryButton = page.getByRole('button', { name: 'Tech Portfolio', exact: true }).or(page.getByRole('button', { name: 'Tech Portfolio' }).first());
    if (await categoryButton.isVisible()) {
      await categoryButton.click();
      await expect(page).toHaveURL(/category=Tech[+%20]Portfolio/);

      await page.reload();
      await expect(categoryButton).toHaveClass(/bg-text-main/);
    }
  });

  test('Blog search term should persist after reload', async ({ page }) => {
    await page.goto('./blog');

    const searchInput = page.getByPlaceholder(/Search posts/i);
    if (await searchInput.isVisible()) {
      await searchInput.fill('west');
      await expect(page).toHaveURL(/search=west/i);

      await page.reload();
      await expect(page.getByPlaceholder(/Search posts/i)).toHaveValue('west');
    }
  });

  test('Gear search term should persist after reload', async ({ page }) => {
    await page.goto('./gear');

    const searchInput = page.getByPlaceholder(/Search gear/i);
    await searchInput.fill('shoes');
    await expect(page).toHaveURL(/search=shoes/i);

    await page.reload();
    await expect(page.getByPlaceholder(/Search gear/i)).toHaveValue('shoes');
  });
});
