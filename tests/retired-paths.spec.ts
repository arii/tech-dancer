import { test, expect } from '@playwright/test';

/**
 * WCS Navigator tooling is retired (spec OD-2, D2). Retired paths must
 * return permanent redirects — never the SPA's 404/NotFound page.
 *
 * vercel.json redirects only apply on Vercel, so this suite runs against
 * scripts/redirect-test-server.mjs (second Playwright webServer), which
 * serves dist/ while applying the same vercel.json rules.
 */

const REDIRECT_SERVER = process.env.REDIRECT_SERVER_URL || 'http://localhost:4174';

// [retired path, expected Location, expected final origin]
const RETIRED_PATHS: Array<[string, string]> = [
  ['/research', 'https://arii.github.io/'],
  ['/wcs-navigator', 'https://arii.github.io/'],
  ['/research/wcs-navigator', 'https://arii.github.io/'],
  ['/research/ai-devops-pipeline', '/'],
  ['/research/wcs-navigator-architecture', '/'],
  ['/research/wcs-scraper-initial-sync', '/'],
  ['/research/2026-07-10-latest-version-check-skill', '/'],
  ['/research/confidently-incorrect-v4', '/'],
  ['/research/deployment-impact-analyzer', '/'],
];

test.describe('retired paths redirect permanently', () => {
  for (const [path, destination] of RETIRED_PATHS) {
    test(`3xx permanent redirect for ${path}`, async ({ request }) => {
      const res = await request.get(`${REDIRECT_SERVER}${path}`, { maxRedirects: 0 });
      expect(res.status(), `${path} must redirect, not 404`).toBeGreaterThanOrEqual(300);
      expect(res.status()).toBeLessThan(400);
      expect(res.status()).toBe(308); // permanent, method-preserving
      expect(res.headers()['location']).toBe(destination);
    });
  }

  test('following the /research redirect resolves to live content, not a 404 page', async ({ request }) => {
    const res = await request.get(`${REDIRECT_SERVER}/research`, { maxRedirects: 5 });
    expect(res.status()).toBeLessThan(400);
    expect(res.url()).toContain('arii.github.io');
  });

  test('live routes on the redirect server still resolve (sanity)', async ({ request }) => {
    const res = await request.get(`${REDIRECT_SERVER}/`);
    expect(res.status()).toBe(200);
  });
});
