import { test, expect } from '@playwright/test';

test('verify research scraper page', async ({ page }) => {
  await page.goto('http://localhost:3000/#/research/wcs-scraper');
  await page.waitForSelector('text=REGISTRY LEDGER: PRELIMS');
  await page.screenshot({ path: 'verification/screenshots/research_scraper.png', fullPage: true });
});
