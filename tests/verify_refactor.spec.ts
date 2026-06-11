import { test, expect } from '@playwright/test';

test('Verify EditorialHeader and Typography changes', async ({ page }) => {
  // Set viewport to a standard desktop size
  await page.setViewportSize({ width: 1280, height: 720 });

  // 1. Check Homepage for general typography and layout
  console.log('Navigating to homepage...');
  await page.goto('http://localhost:4173/');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'home_v3.png', fullPage: true });

  // 2. Check a blog post for EditorialHeader
  console.log('Navigating to a blog post...');
  // Find a blog post link. Usually they are in the 'BLOG POSTS' or 'GEAR REVIEWS' sections.
  const blogLink = page.locator('a[href^="/blog/"]').first();
  if (await blogLink.isVisible()) {
    await blogLink.click();
    await page.waitForLoadState('networkidle');

    // Capture the header area
    const header = page.locator('header').first(); // EditorialHeader is usually at the top
    await page.screenshot({ path: 'editorial_header_v3.png' });

    // Check for title (h1)
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();

    // Check for author section
    const author = page.locator('text=/BY .+/i');
    await expect(author).toBeVisible();
  } else {
    console.log('No blog link found on homepage, trying direct navigation...');
    await page.goto('http://localhost:4173/blog/halloween-costumes-you-can-dance-in'); // Example slug from previous screenshots
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'editorial_header_v3.png' });
  }
});
