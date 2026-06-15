import { test } from '@playwright/test';

test.describe('Affiliate Disclosure Spacing', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should have proper spacing on toolbox page', async () => {
    // Gear page is decommissioned, skipping this test.
    test.skip();
  });
});
