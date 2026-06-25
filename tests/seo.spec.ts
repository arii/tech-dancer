import { test, expect } from '@playwright/test';

test('homepage has google-site-verification meta tag', async ({ page }) => {
  await page.goto('./');
  const metaTag = page.locator('meta[name="google-site-verification"]').first();
  await expect(metaTag).toHaveAttribute('content', 'FGbpuhF_c3YUFon1LzrzqmW1jvVPFygugss24n0wn5k');
});
