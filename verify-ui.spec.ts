import { test, expect } from '@playwright/test';

test('verify event card styling', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // Wait for the specific event card content
  await page.waitForSelector('text=Mission City Swing');

  // Take a screenshot of the whole page or just the card
  await page.screenshot({ path: '/home/jules/verification/event-card-revised.png', fullPage: true });

  // Basic check for primitives being used (indirectly by checking layout)
  const card = page.locator('text=Mission City Swing').locator('..').locator('..');
  const box = await card.boundingBox();
  expect(box).not.toBeNull();

  console.log('Screenshot saved to event-card-revised.png');
});
