import { test, expect } from '@playwright/test';

test('Verify Outdoor Dancing post rendering and content', async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
      console.log('Browser Error:', msg.text());
    }
  });

  // Correct URL path according to routes.ts
  await page.goto('http://localhost:3000/blog/2026-06-01-outdoor-dancing');

  // Wait for content to load
  await page.waitForSelector('h1');

  const title = await page.textContent('h1');
  console.log('Title:', title);
  expect(title).toBe('Outdoor Dancing Gear');

  const bodyText = await page.textContent('body');

  console.log('Includes "Keep Your Valuables Safe":', bodyText?.includes('Keep Your Valuables Safe'));
  console.log('Includes "Sun Protection":', bodyText?.includes('Sun Protection'));
  console.log('Includes "Slim Running Belt":', bodyText?.includes('Slim Running Belt'));
  console.log('Includes "Wide-Brim Visor":', bodyText?.includes('Wide-Brim Visor'));

  expect(bodyText).toContain('Keep Your Valuables Safe');
  expect(bodyText).toContain('Sun Protection');
  expect(bodyText).toContain('Slim Running Belt');
  expect(bodyText).toContain('Wide-Brim Visor');

  if (consoleErrors.length > 0) {
    console.log('Detected Console Errors:', consoleErrors);
  }

  await page.screenshot({ path: '/home/jules/verification/screenshots/verified_content.png', fullPage: true });
});
