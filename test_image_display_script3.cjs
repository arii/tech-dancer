const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 2500 } });
  await page.goto('http://localhost:3000/merch');

  // wait for grid layout to render
  await page.waitForTimeout(2000);

  await page.screenshot({ path: 'verification-merch-all-3-fixed.png' });
  await browser.close();
})();
