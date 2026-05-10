import { test as base, expect } from '@playwright/test';

export { expect };

export const test = base.extend({
  page: async ({ page }, use) => {
    // Mock system time for consistent date rendering (e.g., in Lab tools)
    await page.clock.setFixedTime(new Date('2024-01-01T12:00:00Z'));

    // Enable reduced motion to stop particle animations and other non-deterministic UI
    await page.emulateMedia({ reducedMotion: 'reduce' });

    // Ensure newsletter banner doesn't interfere with visual tests
    await page.addInitScript(() => {
      window.sessionStorage.setItem('td-newsletter-dismissed', 'true');
    });

    await use(page);
  },
});
