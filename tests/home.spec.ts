import { test, expect } from '@playwright/test';

test.describe('Homepage layout and components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('#main-content')).toBeVisible();
  });

  test('should render the hero section', async ({ page }) => {
    const hero = page.locator('.hero-section');
    await expect(hero).toBeVisible();
    await expect(hero.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('should render the featured guide panel', async ({ page }) => {
    const panel = page.locator('text=The WCS Travel Pack').first();
    await expect(panel).toBeVisible();
  });

  test('should render the topic grid', async ({ page }) => {
    const topicGrid = page.locator('text=Start Here').first();
    await expect(topicGrid).toBeVisible();
  });

  test('should render the featured event guide', async ({ page }) => {
    const eventGuide = page.locator('text=Featured Event Guide').first();
    await expect(eventGuide).toBeVisible();
  });

  test('should render the gear shelf', async ({ page }) => {
    const gearShelf = page.locator('text=Gear for the Weekend').first();
    await expect(gearShelf).toBeVisible();
  });

  test('should render the latest posts', async ({ page }) => {
    const latestPosts = page.locator('text=Latest from BoomTick').first();
    await expect(latestPosts).toBeVisible();
  });

  test('should render the dev lab callout', async ({ page }) => {
    const devLab = page.locator('text=DevAI Lab').first();
    await expect(devLab).toBeVisible();
  });
});
