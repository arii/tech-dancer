import { test, expect } from './fixtures/visual';

test('Capture affiliate card on mobile', async ({ page }) => {
  // Go directly to the known post
  await page.goto('./blog/2026-06-01-shoe-care-modification');

  // Wait for the page to load
  await page.waitForLoadState('domcontentloaded');
  await page.evaluate(() => document.fonts.ready);

  // Use the data-testid for a more resilient test
  const affiliateCard = page.locator('[data-testid="affiliate-card"]').first();

  // Wait for it to be visible
  await expect(affiliateCard).toBeVisible({ timeout: 15000 });

  // Scroll it into view
  await affiliateCard.scrollIntoViewIfNeeded();

  // Take a screenshot
  await expect(affiliateCard).toHaveScreenshot('affiliate-card-mobile.png', {
    animations: 'disabled',
  });
});
