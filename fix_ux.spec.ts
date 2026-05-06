import { test, expect } from '@playwright/test';

test('check for dashboard elements', async ({ page }) => {
  await page.goto('./');

  // Wait for the page to load
  await page.waitForSelector('h1');

  // Check for any text containing "Money", "Users", or "Clients"
  const content = await page.textContent('body');
  console.log('Page content contains "Money":', content?.includes('Money'));
  console.log('Page content contains "Users":', content?.includes('Users'));
  console.log('Page content contains "Clients":', content?.includes('Clients'));
  console.log('Page content contains "Sales":', content?.includes('Sales'));

  // Log all text content to see what's actually there
  const allText = await page.evaluate(() => document.body.innerText);
  console.log('All text on home page:');
  console.log(allText);
});
