import { test, expect } from './fixtures/visual';

const routesToTest = ["/","/blog","/gear","/events","/research","/research/wcs-scraper","/research/wsdc-event-reminders","/ux-auditor","/about","/contact","/blog/2026-04-18-competition-metrics","/blog/2026-04-18-financial-literacy-dancers","/blog/2026-04-18-github-actions","/blog/2026-04-18-halloween-costumes","/blog/2026-04-18-make-shoe-dance","/blog/2026-04-18-why-finals-are-hard","/blog/2026-04-19-gear-essentials","/blog/2026-05-06-boomtick-and-b-the-rhythmic-architecture-of-west-coast-swing","/gear/2023-10-01-loop-earplugs","/gear/2023-11-01-travel-steamer","/gear/2024-01-01-portable-speaker","/gear/2026-04-12-suede-shoe-diy","/research/wcs-scraper-initial-sync"];

test.describe('Site-wide Audit', () => {
  for (const route of routesToTest) {
    test(`Audit [${route}]`, async ({ page, pageErrors, isMobile }) => {
      // 1. Navigate to the route
      const response = await page.goto(route);

      // 2. Fail on bad status codes
      if (response !== null) {
        expect(response.status(), `Bad status at ${route}`).toBeLessThan(400);
      }

      // 3. Verify main content is visible and not blank
      const main = page.locator('main');
      await expect(main).toBeVisible({ timeout: 10000 });

      const mainText = await main.innerText();
      expect(mainText.trim().length, `Main content at ${route} is blank`).toBeGreaterThan(0);

      // 4. Verify H1 exists (or equivalent heading for detail pages)
      // Check for h1, or elements that look like headlines based on their content or common classes
      const heading = page.locator('h1, [data-testid="detail-metadata"] + *, .prose h1, [variant="display"], .text-text-main').first();
      await expect(heading).toBeVisible({ timeout: 5000 });

      // 5. Check for horizontal overflow
      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(overflow, `Horizontal overflow detected at ${route}`).toBe(false);

      // 6. Verify no console or page errors
      const filteredErrors = [...pageErrors.consoleErrors, ...pageErrors.pageErrors];
      expect(filteredErrors, `Errors at ${route}: ${filteredErrors.join(', ')}`).toHaveLength(0);

      // 7. Mobile-specific checks
      if (isMobile) {
        // Core section pages should have bottom nav
        const isCorePage = ['/', '/blog', '/gear', '/events', '/research'].includes(route);
        if (isCorePage) {
          const bottomNav = page.getByRole('navigation', { name: /Mobile Bottom Navigation/i });
          await expect(bottomNav).toBeVisible();

          // Verify mobile menu overlay can be opened
          const menuButton = page.getByRole('button', { name: /Open menu/i });
          // The header is also a nav
          const mobileHeader = page.getByRole('navigation', { name: /Mobile Navigation/i });
          await expect(mobileHeader).toBeVisible();

          if (await menuButton.isVisible()) {
            await menuButton.click();
            const dialog = page.getByRole('dialog', { name: /Navigation menu/i });
            await expect(dialog).toBeVisible();

            // Verify it has links
            const linkCount = await dialog.locator('a').count();
            expect(linkCount, `No links found in mobile menu for ${route}`).toBeGreaterThan(0);

            // Close it to clean up
            const closeButton = page.getByRole('button', { name: /Close menu/i });
            await expect(closeButton).toBeVisible();
            await closeButton.click();
            await expect(dialog).not.toBeVisible();
          }
        }
      }
    });
  }
});
