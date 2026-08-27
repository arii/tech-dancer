import type { Page } from '@playwright/test';

export interface RouteInteractionScenario {
  id: string;
  name: string;
  action: (page: Page) => Promise<void>;
}

export const ROUTE_INTERACTIONS: Record<string, RouteInteractionScenario[]> = {
  '/research/wcs-navigator': [
    {
      id: 'custom-tab',
      name: 'Custom Ingestion Tab',
      action: async (page: Page) => {
        const customTabBtn = page.getByRole('button', { name: /Custom PDF \/ Schedule URL/i });
        if (await customTabBtn.isVisible({ timeout: 1500 }).catch(() => false)) {
          await customTabBtn.click({ force: true }).catch(() => {});
          await page.waitForTimeout(300);
        }
      }
    },
    {
      id: 'arch-expanded',
      name: 'Expanded Architecture Explainer',
      action: async (page: Page) => {
        const archToggleBtn = page.getByRole('button', { name: /Agent Architecture & Two-Pass Intelligence/i });
        if (await archToggleBtn.isVisible({ timeout: 1500 }).catch(() => false)) {
          await archToggleBtn.click({ force: true }).catch(() => {});
          await page.waitForTimeout(300);
        }
      }
    },
    {
      id: 'questionnaire-stage',
      name: 'Dynamic Questionnaire & Personas',
      action: async (page: Page) => {
        const scanBtn = page.getByRole('button', { name: /Scan & Discover Schedule/i });
        if (await scanBtn.isVisible({ timeout: 1500 }).catch(() => false)) {
          await scanBtn.click({ force: true }).catch(() => {});
          await page.waitForSelector('text=Discovered Event Parameters', { timeout: 6000 }).catch(() => {});
          await page.waitForTimeout(400);
        }
      }
    },
    {
      id: 'generated-results',
      name: 'Agent Mind Decision Trace & Calendar',
      action: async (page: Page) => {
        const scanBtn = page.getByRole('button', { name: /Scan & Discover Schedule/i });
        if (await scanBtn.isVisible({ timeout: 1500 }).catch(() => false)) {
          await scanBtn.click({ force: true }).catch(() => {});
          await page.waitForSelector('text=Discovered Event Parameters', { timeout: 6000 }).catch(() => {});
          const noviceChip = page.getByRole('button', { name: /Novice Competitor/i });
          if (await noviceChip.isVisible({ timeout: 1500 }).catch(() => false)) {
            await noviceChip.click({ force: true }).catch(() => {});
          }
          const generateBtn = page.getByRole('button', { name: /Generate Calendar/i });
          if (await generateBtn.isVisible({ timeout: 1500 }).catch(() => false)) {
            await generateBtn.click({ force: true }).catch(() => {});
            await page.waitForSelector('text=Flight & Buffer Timeline', { timeout: 6000 }).catch(() => {});
            await page.waitForTimeout(400);
          }
        }
      }
    }
  ]
};
