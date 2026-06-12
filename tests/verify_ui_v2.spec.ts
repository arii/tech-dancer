
import { test, expect } from '@playwright/test';

test('verify sidebar', async ({ page }) => {
  await page.goto('http://localhost:4173/lab/loop-experience-earplugs');
  // Wait for the affiliate links section
  await page.waitForSelector('text=Where to Buy');
  const sidebar = page.locator('section:has-text("Where to Buy")');
  await sidebar.scrollIntoViewIfNeeded();
  await page.screenshot({ path: '/home/jules/verification/sidebar_verification_scrolled.png' });
});

test('verify profile', async ({ page }) => {
  await page.goto('http://localhost:4173/about');
  await page.waitForSelector('text=Experience');
  await page.screenshot({ path: '/home/jules/verification/profile_verification_full.png', fullPage: true });
});
