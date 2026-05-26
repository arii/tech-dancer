import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:4173/');
  await page.waitForSelector('main', { timeout: 30000 });
  await page.screenshot({ path: 'verify-home.png', fullPage: true });
  await browser.close();
})();
