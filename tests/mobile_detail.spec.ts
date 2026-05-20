import { test, expect } from '@playwright/test';

test.describe('Mobile Detail Page Polish', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('Blog detail page has correct mobile ergonomics', async ({ page }) => {
    page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
    // Using a blog post that has tags
    await page.goto('/blog/2026-04-18-competition-metrics');

    // Check back label
    const backButton = page.locator('button, [role="button"]').filter({ hasText: /BACK TO BLOG/i });
    await expect(backButton).toBeVisible();

    // Check for share button
    const shareButton = page.locator('button, [role="button"]').filter({ hasText: /SHARE/i });
    await expect(shareButton).toBeVisible();

    // Check tags wrapping - if the post has tags, "Discovery Tags" should be visible
    await expect(page.locator('text=Discovery Tags')).toBeVisible();

    // Check for horizontal overflow on the whole page
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(overflow).toBe(false);

    // Take screenshot for verification
    await page.screenshot({ path: 'tests/screenshots/mobile-blog-detail.png', fullPage: true });
  });

  test('Gear detail page has correct mobile ergonomics', async ({ page }) => {
    // Using a known gear post
    await page.goto('/gear/2023-10-01-loop-earplugs');

    // Check back label
    const backButton = page.locator('button, [role="button"]').filter({ hasText: /BACK TO GEAR/i });
    await expect(backButton).toBeVisible();

    // Check for share button in gear page
    const shareButton = page.locator('button, [role="button"]').filter({ hasText: /SHARE/i });
    await expect(shareButton).toBeVisible();

    // Check for horizontal overflow
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(overflow).toBe(false);

    // Take screenshot for verification
    await page.screenshot({ path: 'tests/screenshots/mobile-gear-detail.png', fullPage: true });
  });
});
