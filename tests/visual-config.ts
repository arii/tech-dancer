/**
 * Configuration for visual regression snapshots.
 * This file defines the routes, viewports, and scopes to be captured.
 */

export interface ViewportConfig {
  name: string;
  width: number;
  height: number;
}

export interface SnapshotRoute {
  name: string;
  path: string;
  /**
   * Scopes to capture.
   * 'page' means full page.
   * Any other string refers to a CSS selector or data-testid.
   */
  snapshots: string[];
  /**
   * Optional stability measures for the route.
   */
  waitFor?: string;
  /**
   * Optional elements to mask.
   */
  mask?: string[];
}

export const visualSnapshotConfig = {
  outputDir: 'tests/visual.spec.ts-snapshots',
  viewports: [
    { name: 'desktop-1280', width: 1280, height: 800 },
    { name: 'mobile-390', width: 390, height: 844 }
  ] as ViewportConfig[],
  routes: [
    {
      name: 'home',
      path: './',
      snapshots: ['page'],
    },
    {
      name: 'blog',
      path: './blog',
      snapshots: ['page'],
    },
    {
      name: 'gear',
      path: './gear',
      snapshots: ['page'],
    },
    {
      name: 'research',
      path: './research',
      snapshots: ['page'],
      waitFor: 'text=I build AI-assisted engineering systems',
    },
    {
      name: 'about',
      path: './about',
      snapshots: ['page'],
    },
    {
      name: 'contact',
      path: './contact',
      snapshots: ['page'],
    },
    {
      name: 'ux-auditor',
      path: './ux-auditor',
      snapshots: ['page'],
      waitFor: 'label=/URL to audit/i',
    },
    {
      name: 'preview',
      path: './preview',
      snapshots: ['page'],
      waitFor: 'text=Component Preview',
    },
    {
      name: 'merch',
      path: './merch',
      snapshots: ['page'],
    },
    {
      name: 'event-guide',
      path: './events/boogie-by-the-bay',
      snapshots: ['page'],
    },
    {
      name: 'blog-post',
      path: './blog/2026-04-19-gear-essentials',
      snapshots: ['page'],
    },
    {
      name: 'research-blog-drafter',
      path: './research/blog-drafter',
      snapshots: ['page'],
      waitFor: 'text=/CONTENT PIPELINE/i',
    },
    {
      name: 'research-wcs-scraper',
      path: './research/wcs-scraper',
      snapshots: ['page'],
      waitFor: 'text=/Scoring Tool|Data Synchronisation Failed/i',
    },
    {
      name: 'research-wsdc-event-reminders',
      path: './research/wsdc-event-reminders',
      snapshots: ['page'],
      waitFor: 'text=/Action Timeline|Ready to Calculate/i',
    }
  ] as SnapshotRoute[],
  // Common masks across all snapshots
  commonMasks: [
    '[data-testid="content-date"]',
    '[data-testid="detail-metadata"]',
    '[data-testid="footer-copyright"]',
    '[data-testid="ux-analysis-snapshot"]',
    '[class*="animate-pulse"]',
    'text=/\\\\d{1,2}:\\\\d{2}:\\\\d{2}/',
    '[data-testid="search-input"]',
    '[data-testid="timeline-row"]',
  ]
};
