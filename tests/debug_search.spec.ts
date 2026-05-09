import { test, expect } from '@playwright/test';

test('debug search content with long wait and logs', async ({ page }) => {
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

  await page.goto('./');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  const searchButton = page.getByRole('navigation', { name: 'Main Navigation' }).getByRole('button', { name: 'Search' });
  await searchButton.click();

  const searchInput = page.getByPlaceholder('SEARCH REPOSITORY // FILTER BLOG & GEAR');
  await searchInput.fill('Competition');

  await page.waitForTimeout(3000);

  const results = page.getByTestId('search-result');
  const count = await results.count();
  console.log('Results count for "Competition":', count);

  if (count === 0) {
     const bodyText = await page.evaluate(() => document.body.innerText);
     console.log('Body text excerpt:', bodyText.substring(0, 500));
  }

  await page.screenshot({ path: 'search_debug_final.png' });
});
