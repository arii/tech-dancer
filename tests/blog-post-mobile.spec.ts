import { test, expect, devices } from '@playwright/test';
import { assertVisualMatch } from './utils/visual-helpers';

test.use({ ...devices['Pixel 5'] });

test('visual comparison for event-travel-packing mobile', async ({ page }) => {
  await page.goto('./blog/2026-06-01-event-travel-packing');

  await assertVisualMatch(page, 'event-travel-packing-mobile.png', {
    mainSelector: 'main'
  });
});
