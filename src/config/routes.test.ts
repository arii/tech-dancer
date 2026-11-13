import { describe, it, expect } from 'vitest';
import { routes, MOBILE_NAV_ROUTES, TOP_NAV_ROUTES } from './routes';

/**
 * WCS Navigator tooling is retired from the site (spec OD-2, D2).
 * Its routes must be gone from the route table — the paths themselves
 * are handled by permanent redirects in vercel.json.
 */
const RETIRED_PATHS = [
  '/research',
  '/research/wcs-navigator',
  '/wcs-navigator',
  '/research/:id',
];

describe('route table', () => {
  it('no longer contains retired research/navigator routes', () => {
    const paths = routes.map(r => r.path);
    for (const retired of RETIRED_PATHS) {
      expect(paths, `retired route ${retired} must be removed`).not.toContain(retired);
    }
    expect(paths.some(p => String(p).startsWith('/research'))).toBe(false);
  });

  it('exposes no retired paths in nav-derived route lists', () => {
    for (const retired of RETIRED_PATHS) {
      expect(MOBILE_NAV_ROUTES.map(r => r.path)).not.toContain(retired);
      expect(TOP_NAV_ROUTES.map(r => r.path)).not.toContain(retired);
    }
  });

  it('still exposes the dance-first nav surfaces', () => {
    const paths = routes.map(r => r.path);
    expect(paths).toContain('/');
    expect(paths).toContain('/blog');
    expect(paths).toContain('/blog/:slug');
    expect(paths).toContain('/gear');
  });
});
