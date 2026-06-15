import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();

  const posts = [
    '2026-06-01-power-charging',
    '2026-06-01-practice-review-tech',
    '2026-06-01-wcs-essentials',
    '2026-06-01-shoe-care-modification'
  ];

  const viewports = [
    { name: 'desktop', width: 1280, height: 720 },
    { name: 'mobile', width: 375, height: 667 } // iPhone 8
  ];

  for (const post of posts) {
    for (const vp of viewports) {
      const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
      const page = await context.newPage();
      await page.goto(`http://localhost:3000/blog/${post}`);
      await page.waitForTimeout(2000);
      // Wait for images to load
      await page.waitForLoadState('networkidle');
      await page.screenshot({ path: `tests/dev-tools/screenshots/${post}-${vp.name}.png`, fullPage: true });
      await context.close();
    }
  }

  await browser.close();
  console.log('Screenshots saved to tests/dev-tools/screenshots/');
})();
