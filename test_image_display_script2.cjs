const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.goto('http://localhost:3000/merch');

  // wait for grid layout to render
  await page.waitForTimeout(2000);

  await page.screenshot({ path: 'verification-merch-all-1-fixed.png' });
  await page.evaluate(() => window.scrollTo(0, 1000));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'verification-merch-all-2-fixed.png' });

  await browser.close();
})();
