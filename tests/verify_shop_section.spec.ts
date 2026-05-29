import { test, expect } from '@playwright/test';

test('verify shop the checklist section', async ({ page }) => {
  await page.goto('http://localhost:5173/blog/2026-04-19-wcs-travel-pack');

  // Wait for the shoppable section to be visible
  const shopHeader = page.getByText('Shop the checklist');
  await expect(shopHeader).toBeVisible();

  // Scroll to it
  await shopHeader.scrollIntoViewIfNeeded();

  // Wait a bit for images etc
  await page.waitForTimeout(1000);

  await page.screenshot({ path: '/home/jules/verification/screenshots/shop_section.png', fullPage: false });
});
