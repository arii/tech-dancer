import { test, expect } from '@playwright/test';

test('verify related events section', async ({ page }) => {
  // Go to the event page
  await page.goto('/events/swingtacular-the-galactic-open', { waitUntil: 'networkidle' });

  // Wait for the main content with a longer timeout
  await expect(page.locator('main')).toBeVisible({ timeout: 15000 });

  // Scroll to the related events section
  const relatedSection = page.locator('#related');
  await relatedSection.scrollIntoViewIfNeeded();

  // Verify visibility
  await expect(relatedSection).toBeVisible({ timeout: 10000 });

  // Verify title
  await expect(relatedSection.locator('h2')).toContainText('Related Events');

  // Verify that at least one event card is present (based on the markdown data)
  const eventCards = relatedSection.locator('button');
  await expect(eventCards.first()).toBeVisible();

  // Check count - there are 3 related events in the markdown
  const count = await eventCards.count();
  console.log(`Found ${count} related event cards`);
  expect(count).toBeGreaterThan(0);

  // Take a screenshot
  await page.screenshot({ path: 'related-events-verification.png' });
});
