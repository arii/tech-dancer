import { test, expect } from '@playwright/test';

test('verify homepage and guide visual consistency', async ({ page }) => {
  // Mobile Viewport
  await page.setViewportSize({ width: 375, height: 812 });

  // 1. Homepage Mobile
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  // Scroll to Featured Event Guide
  const eventGuide = page.getByText(/Featured Event Guide/i);
  await eventGuide.scrollIntoViewIfNeeded();
  await expect(eventGuide).toBeVisible();

  await page.screenshot({ path: '/home/jules/verification/screenshots/homepage_mobile_v2.png', fullPage: true });

  // 2. WCS Travel Pack Guide Mobile
  await page.goto('/blog/2026-04-19-wcs-travel-pack');
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('heading', { name: /The WCS Travel Pack/i })).toBeVisible();
  await page.screenshot({ path: '/home/jules/verification/screenshots/detail_page_mobile_v2.png', fullPage: true });

  // Desktop Viewport
  await page.setViewportSize({ width: 1280, height: 800 });

  // 3. Homepage Desktop
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: '/home/jules/verification/screenshots/homepage_desktop_v2.png', fullPage: true });

  // 4. WCS Travel Pack Guide Desktop
  await page.goto('/blog/2026-04-19-wcs-travel-pack');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: '/home/jules/verification/screenshots/detail_page_desktop_v2.png', fullPage: true });
});
