import { test, expect } from '@playwright/test';

test.describe('Global Search Modal UX Refinement', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('main')).toBeVisible();
  });

  test('should show "READY TO SEARCH" when modal is opened with no query', async ({ page }) => {
    const searchButton = page.getByRole('navigation', { name: 'Main Navigation' }).getByRole('button', { name: 'Search' });
    await searchButton.click();

    // We expect "READY TO SEARCH" (uppercase because of variant="mono" which has uppercase: true in some contexts or just the text itself)
    // Actually I wrote "Ready to search" in code, but Text component with variant="mono" might uppercase it if configured.
    // Let's check GlobalSearch.tsx again.
    // <Text variant="mono" size="xs" color="dim" tracking="widest" uppercase weight="font-bold">
    // So it will be uppercased.

    await expect(page.getByText('READY TO SEARCH')).toBeVisible();
  });

  test('should show "NO RESULTS FOUND" when query has no matches', async ({ page }) => {
    const searchButton = page.getByRole('navigation', { name: 'Main Navigation' }).getByRole('button', { name: 'Search' });
    await searchButton.click();

    const searchInput = page.getByPlaceholder('SEARCH REPOSITORY // FILTER BLOG & GEAR');
    await searchInput.fill('nonexistent-query-xyz-123');

    await expect(page.getByText('NO RESULTS FOUND')).toBeVisible();
  });

  // Loading state "SEARCHING..." is hard to catch reliably in a fast local environment
  // without mocking the network/queries to stay in loading state.
});
