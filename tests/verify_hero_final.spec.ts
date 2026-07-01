import { test, expect } from '@playwright/test';

test('verify hero headline and card top alignment', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  // Wait for animations to settle
  await page.waitForTimeout(2000);

  const headline = page.locator('h1');
  const card = page.locator('a[href*="/blog/2026-04-19-practical-tools-essentials"]');

  const headlineBox = await headline.boundingBox();
  const cardBox = await card.boundingBox();

  console.log(`Headline Top: ${headlineBox?.y}`);
  console.log(`Card Top: ${cardBox?.y}`);

  if (headlineBox && cardBox) {
    const diff = Math.abs(headlineBox.y - cardBox.y);
    console.log(`Vertical difference: ${diff}px`);
    // Allowing some margin for visual alignment (descenders/ascenders)
    // but they should be much closer than 160px.
    expect(diff).toBeLessThan(40);
  } else {
    throw new Error('Could not find headline or card');
  }
});
