import { test, expect } from './fixtures/visual';
import { getVisualTestMasks } from './utils/playwright-helpers';

test('Capture affiliate card on mobile', async ({ page, waitForFonts }) => {
  // Go directly to the known post
  await page.goto('./blog/2026-06-01-shoe-care-modification');

  // Wait for the page to load
  await page.waitForLoadState('domcontentloaded');
  await waitForFonts();

  // Use the data-testid for a more resilient test
  const affiliateCard = page.locator('[data-testid="affiliate-card"]').first();

  // Wait for it to be visible
  await expect(affiliateCard).toBeVisible({ timeout: 15000 });

  // Scroll it into view
  await affiliateCard.scrollIntoViewIfNeeded();

  // Ensure image is loaded to prevent half-rendered card snapshots
  const img = affiliateCard.locator('img');
  if (await img.count() > 0) {
    await img.first().evaluate((element: HTMLImageElement) => {
      if (element.complete) return Promise.resolve();
      return new Promise((resolve, reject) => {
        element.onload = resolve;
        element.onerror = reject;
      });
    });
  }

  // Brief settle time after scroll and image load
  await page.waitForTimeout(500);

  // Take a screenshot
  await expect(affiliateCard).toHaveScreenshot('affiliate-card.png', {
    animations: 'disabled',
    mask: getVisualTestMasks(page)
  });
});
