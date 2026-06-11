import { test, expect } from '@playwright/test';

test.describe('GearCard Visual Audit', () => {
  test('should capture various GearCard states', async ({ page }) => {
    await page.goto('/gear');

    // Wait for the grid to be visible
    const grid = page.locator('.grid');
    await expect(grid).toBeVisible();

    // Identify specific cards that are known to be in categories shown on the page
    const cards = {
      localImage: 'Loop Experience Earplugs', // Dance Gear -> dance
      containImage: 'Large Rave Folding Fan', // Dance Gear -> dance
      remoteImage: 'Silicone Travel Bottles',  // Travel -> travel
      fashionItem: 'Reflective Crop Tops'      // Fashion -> fashion
    };

    for (const [name, title] of Object.entries(cards)) {
      const searchBox = page.locator('input[placeholder="Search gear..."]');
      if (await searchBox.count() > 0) {
        await searchBox.clear();
        await searchBox.fill(title);
        await page.waitForTimeout(500);
      }

      const card = page.locator('article').filter({ hasText: title }).first();

      if (await card.count() > 0) {
        await card.screenshot({ path: `gear-card-${name}.png` });
        console.log(`Captured ${name}`);
      } else {
        console.warn(`Card with title "${title}" not found for ${name}`);
      }
    }

    // Try to find ANY card without an image for the placeholder state
    await page.locator('input[placeholder="Search gear..."]').clear();
    await page.waitForTimeout(500);

    const placeholderCard = page.locator('article').filter({ has: page.locator('.text-accent svg') }).first();
    if (await placeholderCard.count() > 0) {
      await placeholderCard.screenshot({ path: 'gear-card-placeholder.png' });
      console.log('Captured placeholder');
    }
  });
});
