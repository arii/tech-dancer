import { test, expect, devices } from '@playwright/test';

test.use({ ...devices['Pixel 5'] });

test('verify outdoor dancing post layout', async ({ page }) => {
  await page.goto('/blog/2026-06-01-outdoor-dancing');

  // Wait for content to load
  await page.waitForSelector('.article-content-wrapper');

  // Take a screenshot of the whole page to inspect the layout
  await page.screenshot({ path: 'mobile-debug.png', fullPage: true });

  // Check headings
  const valuablesHeading = page.locator('h2:has-text("Keep Your Valuables Safe")');
  await expect(valuablesHeading).toBeVisible();

  const sunHeading = page.locator('h2:has-text("Sun Protection is Non-Negotiable")');
  await expect(sunHeading).toBeVisible();

  // Check affiliate cards in body
  const cards = page.locator('[data-testid="affiliate-card"]');
  const count = await cards.count();
  console.log(`Found ${count} affiliate cards total (including sidebar)`);

  // On mobile, sidebar is order-1, so it comes first.
  // Frontmatter affiliateIds are [running-belt, sunscreen, visor] -> 3 cards in sidebar
  // Body has 3 notices -> 3 cards in body
  // Total 6 cards.

  for (let i = 0; i < count; i++) {
    const text = await cards.nth(i).textContent();
    console.log(`Card ${i}: ${text}`);
  }
});
