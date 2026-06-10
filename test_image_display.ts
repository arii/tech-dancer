import { test, expect } from '@playwright/test';

test('merch image display test', async ({ page }) => {
  await page.goto('http://localhost:3000/merch');
  const items = await page.locator('[data-testid="product-card"]').all();
  for (const item of items) {
    const images = await item.locator('img').all();
    for (const image of images) {
        const boundingBox = await image.boundingBox();
        if (boundingBox) {
            console.log(await image.getAttribute('alt'), boundingBox);
        }
    }
  }
});
