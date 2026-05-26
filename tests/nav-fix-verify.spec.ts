import { test, expect } from '@playwright/test';

test('navigation bar is visible and works', async ({ page }) => {
  await page.goto('/');

  // 1. Verify navigation is present in DOM
  const nav = page.locator('nav[aria-label="Main Navigation"]');
  await expect(nav).toBeAttached();

  // 2. Check z-index (computed style)
  const zIndex = await nav.evaluate((el) => window.getComputedStyle(el).zIndex);
  expect(zIndex).toBe('130');

  const position = await nav.evaluate((el) => window.getComputedStyle(el).position);
  expect(position).toBe('fixed');

  await expect(nav).toBeVisible();

  // 3. Logo links to home
  const logoLink = nav.locator('a[href="/"]').first();
  await expect(logoLink).toBeVisible();

  // 4. Desktop nav links (at 1440px)
  await page.setViewportSize({ width: 1440, height: 900 });

  // 5. Mobile menu button (at 390px)
  await page.setViewportSize({ width: 390, height: 844 });
  const menuButton = page.locator('button[aria-label="Open menu"]');
  await expect(menuButton).toBeVisible();
});
