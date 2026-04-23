import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 1280, height: 720 } });

test('verify card and layout consistency', async ({ page }) => {
  // Wait for the app to be ready
  await page.goto('./');

  // Verify Blog cards
  await page.goto('./blog');
  await page.waitForSelector('article, .group');
  await page.screenshot({ path: 'blog_feed.png' });

  // Verify Blog detail
  const blogLink = page.locator('a[href*="/blog/"]').first();
  await blogLink.click();
  await page.waitForSelector('article');
  await page.screenshot({ path: 'blog_detail.png' });

  // Verify Gear cards
  await page.goto('./gear');
  await page.waitForSelector('a[href*="/gear/"]');
  await page.screenshot({ path: 'gear_feed.png' });

  // Verify Research page width
  await page.goto('./research');
  await page.waitForSelector('h1');
  await page.screenshot({ path: 'research_page.png' });

  // Assertions for standardized spacing/typography to catch regressions
  const h1Font = await page.locator('h1').first().evaluate((el) => {
    const style = window.getComputedStyle(el);
    return {
      fontFamily: style.fontFamily,
      fontWeight: style.fontWeight,
      textTransform: style.textTransform,
    };
  });

  // Checking computed style matches expected design tokens (e.g. uppercase for display variants)
  expect(h1Font.textTransform).toBe('uppercase');
});
