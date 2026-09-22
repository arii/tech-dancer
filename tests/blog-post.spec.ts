import { test } from './fixtures/visual';
import { assertVisualMatch } from './utils/visual-helpers';

test('visual comparison for event-travel-packing', async ({ page }) => {
  await page.goto('./blog/2026-06-01-event-travel-packing');

  await assertVisualMatch(page, 'event-travel-packing.png', {
    mainSelector: 'main'
  });
});
