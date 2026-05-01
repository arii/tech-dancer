import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test('verify preview page enhancements v3', async ({ page }) => {
  const filePath = path.resolve('public/previews/index.html');
  const fileUrl = `file://${filePath}`;

  await page.goto(fileUrl);

  await expect(page.locator('#search')).toBeVisible();
  await expect(page.locator('#status-filter')).toBeVisible();
  await expect(page.locator('#stat-prs')).toBeVisible();
  await expect(page.locator('#stat-active')).toBeVisible();
  await expect(page.locator('#stat-stale')).toBeVisible();
  await expect(page.locator('#stat-releases')).toBeVisible();

  const screenshotPath = path.resolve('verification/previews_refactored_v3.png');
  if (!fs.existsSync('verification')) {
    fs.mkdirSync('verification');
  }
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`Screenshot saved to ${screenshotPath}`);
});
