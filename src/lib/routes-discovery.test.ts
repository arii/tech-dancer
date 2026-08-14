import { describe, it, expect } from 'vitest';
import { getAllRoutes } from './routes-discovery';

describe('getAllRoutes', () => {
  it('should return unique routes', () => {
    const { all } = getAllRoutes();
    const unique = new Set(all);
    expect(all.length).toBe(unique.size);
  });

  it('should exclude /preview from the sitemap but include in stubs', () => {
    const { sitemap, stubs } = getAllRoutes();
    expect(sitemap).not.toContain('/preview');
    expect(stubs).toContain('/preview');
  });

  it('should exclude catch-all route from both sitemap and stubs', () => {
    const { sitemap, stubs } = getAllRoutes();
    expect(sitemap).not.toContain('*');
    expect(stubs).not.toContain('*');
  });

  it('should use canonical path for UX Auditor', () => {
    const { sitemap } = getAllRoutes();
    expect(sitemap).toContain('/ux-auditor');
    expect(sitemap).not.toContain('/research/ux-auditor');
  });

  it('should handle tool routes correctly', () => {
    const { tools } = getAllRoutes();
    expect(tools).toContain('/research/wcs-scraper');
    expect(tools).toContain('/ux-auditor');
  });

  it('should return detailed route information with lastmod', () => {
    const { detailed } = getAllRoutes();
    expect(detailed.length).toBeGreaterThan(0);
    expect(detailed[0]).toHaveProperty('path');
    expect(detailed[0]).toHaveProperty('lastmod');
    expect(new Date(detailed[0].lastmod).getTime()).not.toBeNaN();
  });

  it('should exclude /events routes', () => {
    const { all, sitemap, content } = getAllRoutes();

    // Check that no route starts with /events
    const forbidden = (path: string) => path.startsWith('/events');

    expect(all.some(forbidden)).toBe(false);
    expect(sitemap.some(forbidden)).toBe(false);
    expect(content.some(forbidden)).toBe(false);
  });
});
