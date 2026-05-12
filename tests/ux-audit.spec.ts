import { test } from '@playwright/test';

const BASE_URL = 'http://localhost:3001';

const routes = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'blog', path: '/blog' },
  { name: 'gear', path: '/gear' },
  { name: 'research', path: '/research' },
];

test.describe('Desktop Visual Audit (1440x900)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
  });

  for (const route of routes) {
    test(`Visit ${route.name}`, async ({ page }) => {
      await page.goto(`${BASE_URL}${route.path}`, { waitUntil: 'networkidle' });
      await page.screenshot({ path: `/tmp/desktop-${route.name}.png` });
    });
  }

  test('Test search modal', async ({ page }) => {
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    // Look for search trigger
    const searchBtn = page.locator('button[aria-label*="search" i], button:has-text("Search"), [role="search"]').first();
    if (await searchBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
      await searchBtn.click();
      await page.screenshot({ path: '/tmp/desktop-search-modal.png' });
    }
  });
});

test.describe('Mobile Visual Audit (390x844)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
  });

  for (const route of routes) {
    test(`Visit ${route.name}`, async ({ page }) => {
      await page.goto(`${BASE_URL}${route.path}`, { waitUntil: 'networkidle' });
      await page.screenshot({ path: `/tmp/mobile-${route.name}.png` });
    });
  }

  test('Test search modal on mobile', async ({ page }) => {
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    const searchBtn = page.locator('button[aria-label*="search" i], button:has-text("Search"), [role="search"]').first();
    if (await searchBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
      await searchBtn.click();
      await page.screenshot({ path: '/tmp/mobile-search-modal.png' });
    }
  });
});
