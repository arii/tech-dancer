import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('accessibility', () => {
  test('homepage should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('./');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('search modal should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('./');
    await page.waitForLoadState('networkidle');

    // Open search modal
    await page.keyboard.press('Control+k');
    await expect(page.getByPlaceholder('SEARCH REPOSITORY // FILTER BLOG & GEAR')).toBeVisible();

    const results = await new AxeBuilder({ page })
      .disableRules(['region'])
      .analyze();

    if (results.violations.length > 0) {
        console.log('Search Modal Violations:', JSON.stringify(results.violations, null, 2));
    }

    expect(results.violations).toEqual([]);
  });

  test('search modal should trap focus', async ({ page }) => {
    await page.goto('./');
    await page.waitForLoadState('networkidle');

    // Open search modal
    await page.keyboard.press('Control+k');
    const input = page.getByPlaceholder('SEARCH REPOSITORY // FILTER BLOG & GEAR');
    await expect(input).toBeVisible();
    await expect(input).toBeFocused();

    const closeButton = page.getByLabel('Close search');

    // Tab forward from input to close button
    await page.keyboard.press('Tab');
    await expect(closeButton).toBeFocused();

    // Tab forward from close button should wrap back to input (since there are no results yet)
    await page.keyboard.press('Tab');

    // Sometimes Playwright is too fast for the browser to update focus
    await expect(input).toBeFocused();

    // Shift+Tab should wrap to close button
    await page.keyboard.press('Shift+Tab');
    await expect(closeButton).toBeFocused();
  });
});
