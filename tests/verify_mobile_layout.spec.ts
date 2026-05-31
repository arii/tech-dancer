import { test, expect } from '@playwright/test';

test('verify mobile layout for ecommerce section', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 }); // iPhone 12/13/14 size
  await page.goto('http://localhost:3003/research');

  // Take screenshot of the ecommerce section on the main research page
  const section = page.locator('text=Ecommerce Automation Experiments').locator('xpath=..');
  await section.screenshot({ path: 'mobile_ecommerce_section.png' });

  // Go to the detail page
  await page.click('text=View Workflow Items');
  await page.waitForURL('**/research/ecommerce-automation');
  await page.screenshot({ path: 'mobile_ecommerce_detail.png', fullPage: true });
});
