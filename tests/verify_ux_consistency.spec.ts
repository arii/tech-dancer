import { test, expect } from './fixtures/visual';

test('verify homepage and guide visual consistency', async ({ page }) => {
  // 1. Homepage Mobile
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('./');
  const homeUrl = page.url();
  await page.waitForLoadState('networkidle');

  // On mobile, the FeaturedGuidePanel is hidden (display: none for base)
  // Just wait for the hero section to be stable
  await expect(page.getByRole('heading', { name: /Train smarter/i })).toBeVisible();

  await page.screenshot({ path: 'tests/visual.spec.ts-snapshots//homepage_mobile_v2.png', fullPage: true });

  // 2. WCS Travel Pack Guide Mobile
  const guideUrl = new URL('blog/2026-04-19-practical-tools-essentials', homeUrl).toString();
  await page.goto(guideUrl);
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(/.*2026-04-19-practical-tools-essentials/);
  await expect(page.getByRole('heading', { name: /The WCS Travel Pack/i })).toBeVisible();
  await page.screenshot({ path: 'tests/visual.spec.ts-snapshots//detail_page_mobile_v2.png', fullPage: true });

  // 3. Homepage Desktop
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(homeUrl);
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'tests/visual.spec.ts-snapshots//homepage_desktop_v2.png', fullPage: true });

  // 4. WCS Travel Pack Guide Desktop
  await page.goto(guideUrl);
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(/.*2026-04-19-practical-tools-essentials/);
  await expect(page.getByRole('heading', { name: /The WCS Travel Pack/i })).toBeVisible();
  await page.screenshot({ path: 'tests/visual.spec.ts-snapshots//detail_page_desktop_v2.png', fullPage: true });
});
