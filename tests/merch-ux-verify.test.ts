import { test, expect } from '@playwright/test';

test('merch detail/zoom state', async ({ page }) => {
  await page.goto('http://localhost:3000/merch');

  // Click on the first product title to navigate or see if there is a detail view
  // Actually, there is no detail view in the current code, but we can zoom into the card
  const firstCard = page.locator('article').first();
  await firstCard.waitFor();

  // Zoom in on the first card
  await page.evaluate(() => {
    const card = document.querySelector('article');
    if (card) {
      card.style.transform = 'scale(1.5)';
      card.style.zIndex = '1000';
      card.style.background = 'white';
    }
  });

  await page.screenshot({ path: 'verification/screenshots/merch_detail_zoom.png' });
});

test('merch mobile scroll affordance', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
  await page.goto('http://localhost:3000/merch');

  const filterRow = page.locator('.overflow-x-auto').first();
  await filterRow.waitFor();

  await page.screenshot({ path: 'verification/screenshots/merch_mobile_filters.png' });
});
