import { test, expect } from '@playwright/test';

test('inspect about page layout', async ({ page }) => {
  await page.goto('./about');

  // Wait for the page to load
  await page.waitForSelector('h1');

  // Take a screenshot to see what's actually happening
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.screenshot({ path: 'about_inspection_desktop.png', fullPage: true });

  await page.setViewportSize({ width: 375, height: 667 });
  await page.screenshot({ path: 'about_inspection_mobile.png', fullPage: true });

  // Get outerHTML of the biography section to inspect structure
  const biography = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    return h1?.closest('section')?.outerHTML || 'Not found';
  });
  console.log('Biography structure:');
  console.log(biography);
});
