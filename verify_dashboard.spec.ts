import { test, expect } from '@playwright/test';

test('verify dashboard and navigation hierarchy', async ({ page }) => {
  await page.goto('./');

  // Wait for the page to load
  await page.waitForSelector('h1');

  // Desktop check
  await page.setViewportSize({ width: 1280, height: 800 });

  // Check sidebar navigation item heights
  const navItems = await page.locator('nav[aria-label="Main Navigation"] li');
  const navCount = await navItems.count();
  for (let i = 0; i < navCount; i++) {
    const box = await navItems.nth(i).boundingBox();
    console.log(`Nav Item ${i} height: ${box?.height}px`);
  }

  // Tablet check
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.screenshot({ path: 'tablet_dashboard.png', fullPage: true });

  // Mobile check
  await page.setViewportSize({ width: 375, height: 667 });
  await page.screenshot({ path: 'mobile_dashboard.png', fullPage: true });
});
