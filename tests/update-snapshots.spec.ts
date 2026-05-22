import { test, expect } from './fixtures/visual';

const routes = [
  { name: 'home', path: './' },
  { name: 'blog', path: './blog' },
  { name: 'gear', path: './gear' },
  { name: 'research', path: './research' },
  { name: 'about', path: './about' },
  { name: 'contact', path: './contact' },
  { name: 'ux-auditor', path: './ux-auditor' },
  { name: 'preview', path: './preview' },
  { name: 'event-guide', path: './events/boogie-by-the-bay' }
];

test.describe('Update Snapshots', () => {
  for (const route of routes) {
    test(`update snapshot for ${route.name}`, async ({ page }) => {
      await page.goto(route.path);
      await expect(page.locator('main')).toBeVisible({ timeout: 30000 });
      await page.evaluate(() => document.fonts.ready);

      if (route.name === 'research') {
        await expect(page.getByRole('heading', { name: 'The Research Lab' })).toBeVisible({ timeout: 30000 });
      }

      await page.evaluate(async () => {
        const scrollable = document.querySelector('main') || document.documentElement;
        scrollable.scrollTo(0, scrollable.scrollHeight);
        await new Promise(resolve => setTimeout(resolve, 500));
        scrollable.scrollTo(0, 0);
        await new Promise(resolve => setTimeout(resolve, 500));
      });

      await expect(page).toHaveScreenshot(`${route.name}.png`, {
        fullPage: true,
        allowSizeMismatch: true,
        animations: 'disabled',
      });
    });
  }
});
