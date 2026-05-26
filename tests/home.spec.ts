import { test, expect } from '@playwright/test';

test.describe('Home Page Modular Sections', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('main')).toBeVisible();
  });

  test('should render the HeroSection', async ({ page }) => {
    await expect(page.locator('.hero-section')).toBeVisible();
    await expect(page.locator('h1').filter({ hasText: 'Built for dancers.' })).toBeVisible();
  });

  test('should render the FeaturedGuidePanel', async ({ page }) => {
    await expect(page.locator('text="FEATURED GUIDE"').first()).toBeVisible();
  });

  test('should render the TopicGrid', async ({ page }) => {
    await expect(page.locator('text="Start Exploring"').first()).toBeVisible();
  });

  test('should render the FeaturedEventGuide', async ({ page }) => {
    await expect(page.locator('text="Featured Event Guide"').first()).toBeVisible();
  });

  test('should render the GearShelf', async ({ page }) => {
    await expect(page.locator('text="Essential Gear"').first()).toBeVisible();
  });

  test('should render the LatestPosts', async ({ page }) => {
    await expect(page.locator('text="Latest from the Blog"').first()).toBeVisible();
  });

  test('should render the DevLabCallout', async ({ page }) => {
    await expect(page.locator('text="Behind the Platform"').first()).toBeVisible();
  });
});
