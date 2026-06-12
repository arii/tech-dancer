import { test, expect } from './fixtures/visual';
import { visualSnapshotConfig } from './visual-config';

test.describe('Visual Regression Tests', () => {
  for (const route of visualSnapshotConfig.routes) {
    test(`visual comparison for ${route.name}`, async ({ page }, testInfo) => {
      // Set viewport based on project name if not already set by Playwright
      const viewport = testInfo.project.name.includes('mobile')
        ? visualSnapshotConfig.viewports.find(v => v.name.includes('mobile'))
        : visualSnapshotConfig.viewports.find(v => v.name.includes('desktop'));

      if (viewport) {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
      }

      const viewportName = viewport?.name || testInfo.project.name;

      await page.goto(route.path);

      // Wait for the main content to be visible as a base stability measure
      await expect(page.locator('main')).toBeVisible({ timeout: 30000 });

      // Wait for fonts to be loaded to prevent text-rendering flakiness
      await page.evaluate(() => document.fonts.ready);

      // Helper to parse regex from string
      const parseRegex = (str: string) => {
        if (str.startsWith('/') && (str.endsWith('/') || str.endsWith('/i'))) {
          const flags = str.endsWith('/i') ? 'i' : '';
          const pattern = flags ? str.slice(1, -2) : str.slice(1, -1);
          return new RegExp(pattern, flags);
        }
        return null;
      };

      // Route-specific stability waits from config
      if (route.waitFor) {
        if (route.waitFor.startsWith('text=')) {
          const textValue = route.waitFor.replace('text=', '');
          const regex = parseRegex(textValue);
          if (regex) {
            await expect(page.getByText(regex).first()).toBeVisible({ timeout: 30000 });
          } else {
            await expect(page.getByText(textValue).first()).toBeVisible({ timeout: 30000 });
          }
        } else if (route.waitFor.startsWith('label=')) {
          const labelValue = route.waitFor.replace('label=', '');
          const regex = parseRegex(labelValue);
          if (regex) {
            await expect(page.getByLabel(regex).first()).toBeVisible({ timeout: 30000 });
          } else {
            await expect(page.getByLabel(labelValue).first()).toBeVisible({ timeout: 30000 });
          }
        }
      }

      // Robust scroll-to-settle: triggers lazy loading without hardcoded sleep loops
      await page.evaluate(async () => {
        const scrollable = document.querySelector('main') || document.documentElement;

        const waitForScrollHeightToSettle = async () => {
          let lastHeight = -1;
          let unchangedCount = 0;

          while (unchangedCount < 2) {
            scrollable.scrollTo(0, scrollable.scrollHeight);
            const currentHeight = scrollable.scrollHeight;

            if (currentHeight === lastHeight) {
              unchangedCount++;
            } else {
              unchangedCount = 0;
              lastHeight = currentHeight;
            }

            await new Promise(r => setTimeout(r, 50));
          }
        };

        await waitForScrollHeightToSettle();
        scrollable.scrollTo(0, 0);
        // Ensure paint settlement
        await new Promise(requestAnimationFrame);
      });

      // Ported check for horizontal overflow (especially relevant for mobile)
      const overflowX = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(overflowX, `Route ${route.path} has horizontal overflow`).toBe(false);

      // Take snapshots for each defined scope
      for (const scope of route.snapshots) {
        // Use single hyphens to match baseline snapshots generated previously
        const snapshotName = `${route.name}-${viewportName}-${scope}.png`;

        const target = scope === 'page' ? page : page.locator(scope);

        // Combine common masks with route-specific masks
        const allMaskSelectors = [
          ...visualSnapshotConfig.commonMasks,
          ...(route.mask || [])
        ];

        const masks = allMaskSelectors.map(m => {
           if (m.startsWith('text=')) {
             const textValue = m.replace('text=', '');
             const regex = parseRegex(textValue);
             if (regex) {
               return page.getByText(regex);
             }
             return page.getByText(textValue);
           }
           return page.locator(m);
        });

        await expect(target).toHaveScreenshot(snapshotName, {
          fullPage: scope === 'page',
          animations: 'disabled',
          mask: masks
        });
      }
    });
  }
});
