import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:4173/tech-dancer/';

test.describe('Merch Image Check', () => {
  test('check image counts on merch page', async ({ page }) => {
    await page.goto(`${BASE_URL}merch`);
    await expect(page.locator('[data-testid="product-card"]').first()).toBeVisible();

    const cards = page.locator('[data-testid="product-card"]');
    const count = await cards.count();
    console.log(`Found ${count} cards`);

    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      const title = await card.locator('a').first().textContent();
      const images = card.locator('img');
      const imgCount = await images.count();
      console.log(`Card "${title?.trim()}": ${imgCount} images`);
    }
  });
});
