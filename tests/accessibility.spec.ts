import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('accessibility', () => {
  test('should not have any automatically detectable accessibility issues on homepage', async ({ page }) => {
    await page.goto('./');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('search modal should not have accessibility issues', async ({ page }) => {
    await page.goto('./');
    await page.waitForLoadState('networkidle');

    // Open search modal
    await page.keyboard.press('Control+k');
    await expect(page.getByTestId('search-backdrop')).toBeVisible();

    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('[data-testid="search-backdrop"]')
      .analyze();

    // Log violations for debugging
    if (accessibilityScanResults.violations.length > 0) {
      console.log('Axe violations found:', JSON.stringify(accessibilityScanResults.violations, null, 2));
    }

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('search modal should trap focus', async ({ page }) => {
    await page.goto('./');
    await page.waitForLoadState('networkidle');

    // Open search modal
    await page.keyboard.press('Control+k');
    const searchInput = page.getByRole('searchbox', { name: /search repository/i });
    await expect(searchInput).toBeFocused();

    // Tab through all elements
    // 1. Search Input (already focused)
    // 2. Close button
    // 3. Search results (if any) - but currently none because query is empty

    // Let's type something to get results
    await searchInput.fill('dance');
    await page.waitForTimeout(500); // Wait for debounce

    const closeButton = page.getByRole('button', { name: /close search/i });
    const firstResult = page.getByRole('option').first();

    // Tab from input to close button
    await page.keyboard.press('Tab');
    await expect(closeButton).toBeFocused();

    // Tab from close button to first result
    await page.keyboard.press('Tab');
    await expect(firstResult).toBeFocused();

    // Tab to last result and then it should wrap around
    const results = page.getByRole('option');
    const resultsCount = await results.count();
    for (let i = 1; i < resultsCount; i++) {
        await page.keyboard.press('Tab');
    }

    // Now at last result, next Tab should go back to input
    await page.keyboard.press('Tab');
    await expect(searchInput).toBeFocused();

    // Shift+Tab from input should go to last result
    await page.keyboard.press('Shift+Tab');
    await expect(results.last()).toBeFocused();
  });
});
