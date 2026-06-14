import { test, expect } from '@playwright/test';

test.describe('Affiliate Disclosure Spacing', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should have proper spacing on toolbox page', async ({ page }) => {
    await page.goto('/gear');

    const disclosure = page.locator('text=As an Amazon Associate').first();
    await expect(disclosure).toBeVisible();

    const gap = await page.evaluate(() => {
      const disclosureBox = [...document.querySelectorAll('div.inline-block')].find(el => el.textContent?.includes('As an Amazon Associate'));
      if (!disclosureBox) return -1;

      const nextElement = disclosureBox.nextElementSibling;
      if (!nextElement) return -2;

      const rect1 = disclosureBox.getBoundingClientRect();
      const rect2 = nextElement.getBoundingClientRect();

      return rect2.top - rect1.bottom;
    });

    expect(gap).toBe(24);
  });
});
