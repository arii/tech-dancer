import { test, expect } from './fixtures/visual';
import { getAllRoutes } from '../src/lib/routes-discovery';

const { all: allRoutes } = getAllRoutes();

// filter out routes that are not intended for public sitemap or are infrastructure
// and deduplicate
const routesToTest = Array.from(new Set(
  allRoutes
    .filter(route => !route.startsWith('/preview') && !route.startsWith('/404'))
    .map(route => route.startsWith('/') ? route.slice(1) : route)
));

test.describe('Site-wide Audit', () => {
  for (const route of routesToTest) {
    const displayRoute = route === '' ? '/' : `/${route}`;
    test(`Audit [${displayRoute}]`, async ({ page, pageErrors, isMobile }) => {
      // 1. Navigate to the route. Use './' for the root to stay relative to baseURL
      const target = route === '' ? './' : route;
      const response = await page.goto(target);

      // 2. Fail on bad status codes
      if (response !== null) {
        expect(response.status(), `Bad status at ${displayRoute}`).toBeLessThan(400);
      }

      // 3. Verify main content is visible and not blank
      const main = page.locator('main');
      await expect(main).toBeVisible({ timeout: 10000 });

      const mainText = await main.innerText();
      expect(mainText.trim().length, `Main content at ${displayRoute} is blank`).toBeGreaterThan(0);

      // 4. Verify H1 exists (or equivalent heading for detail pages)
      const heading = page.locator('main h1, main [data-testid="detail-metadata"] + *, main .prose h1, main [variant="display"]').first();
      await expect(heading).toBeVisible({ timeout: 5000 });

      // 5. Check for horizontal overflow
      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(overflow, `Horizontal overflow detected at ${displayRoute}`).toBe(false);

      // 6. Verify no console or page errors
      const filteredErrors = [...pageErrors.consoleErrors, ...pageErrors.pageErrors];
      expect(filteredErrors, `Errors at ${displayRoute}: ${filteredErrors.join(', ')}`).toHaveLength(0);

      // 7. Mobile-specific checks
      if (isMobile) {
        // Core section pages should have bottom nav
        const isCorePage = ['', 'blog', 'gear', 'events', 'research'].includes(route);
        if (isCorePage) {
          const bottomNav = page.getByRole('navigation', { name: /Mobile Bottom Navigation/i });
          await expect(bottomNav).toBeVisible();

          // Verify mobile menu overlay can be opened
          const menuButton = page.getByRole('button', { name: /Open menu/i });
          const mobileHeader = page.getByRole('navigation', { name: /Mobile Navigation/i });
          await expect(mobileHeader).toBeVisible();

          if (await menuButton.isVisible()) {
            await menuButton.click();
            const dialog = page.getByRole('dialog', { name: /Navigation menu/i });
            await expect(dialog).toBeVisible();

            // Verify it has links
            const linkCount = await dialog.locator('a').count();
            expect(linkCount, `No links found in mobile menu for ${displayRoute}`).toBeGreaterThan(0);

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
