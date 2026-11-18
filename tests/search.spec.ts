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

  test('should close search modal on route change', async ({ page }) => {
    await page.getByRole('navigation', { name: 'Main Navigation' }).getByRole('button', { name: 'Search' }).click();
    await expect(page.getByPlaceholder('Search BoomTick guides, gear, and posts')).toBeVisible();

    await page.goto('./gear');

    await expect(page.getByPlaceholder('Search BoomTick guides, gear, and posts')).not.toBeVisible();
    await expect(page).toHaveURL(/.*gear/);
  });

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

  for (const dismiss of ['Escape', 'Close search', 'backdrop']) {
    test(`populated direct-link search stays dismissed via ${dismiss}`, async ({ page }) => {
      await page.goto('./blog?q=travel');
      const input = page.getByPlaceholder('Search BoomTick guides, gear, and posts');
      await expect(input).toBeFocused();
      if (dismiss === 'Escape') await page.keyboard.press('Escape');
      else if (dismiss === 'backdrop') await page.getByTestId('search-backdrop').click({ position: { x: 2, y: 2 } });
      else await page.getByLabel('Close search').click();
      await expect(input).not.toBeVisible();
      await expect(page).toHaveURL(/modal=false/);
      await page.reload();
      await expect(page.locator('main')).toBeVisible();
      await expect(input).not.toBeVisible();
      await page.keyboard.press('Control+k');
      await expect(input).toBeVisible();
      await expect(input).toHaveValue('travel');
    });
  }

  test('dismissal restores focus and cancels a pending query update', async ({ page }) => {
    await page.goto('./');
    const opener = page.getByRole('button', { name: 'Open search', exact: true });
    await opener.click();
    const input = page.getByPlaceholder('Search BoomTick guides, gear, and posts');
    await expect(input).toBeFocused();
    await input.fill('pending-query');
    await page.keyboard.press('Escape');
    await expect(opener).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(input).toBeFocused();
    await expect(input).toHaveValue('');
  });

  test('Tab to a result then Enter follows the keyboard hint', async ({ page }) => {
    await page.goto('./blog?q=travel+pack');
    const input = page.getByPlaceholder('Search BoomTick guides, gear, and posts');
    const firstResult = page.getByTestId('search-result').first();
    await expect(firstResult).toBeVisible();
    await expect(input).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByLabel('Close search')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(firstResult).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(input).not.toBeVisible();
    await expect(page).toHaveURL(/\/blog\/[^?]+$/);
  });

  for (const viewport of [{ width: 390, height: 844 }, { width: 360, height: 740 }, { width: 844, height: 390 }]) {
    test(`search fits and scrolls at ${viewport.width}x${viewport.height}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto('./blog?q=travel+pack');
      const results = page.getByTestId('search-result');
      await expect(results.first()).toBeVisible();
      const footer = page.getByTestId('search-results-count');
      const bounds = await footer.boundingBox();
      expect(bounds).not.toBeNull();
      expect(bounds!.y + bounds!.height).toBeLessThan(viewport.height);
      await results.last().scrollIntoViewIfNeeded();
      await expect(results.last()).toBeInViewport();
      await expect(page.getByLabel('Close search')).toBeInViewport();
      await page.keyboard.press('Escape');
      await expect(page.getByTestId('search-dialog')).not.toBeVisible();
    });
  }

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
