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

  it('should keep tool and gear item pages out of the sitemap and mark them noindex', () => {
    const { sitemap, noindex, stubs } = getAllRoutes();
    expect(sitemap).not.toContain('/ux-auditor');
    expect(sitemap).not.toContain('/research/ux-auditor');
    expect(sitemap).not.toContain('/versiontruth');
    expect(sitemap.some(path => path.startsWith('/gear/'))).toBe(false);
    expect(sitemap).toContain('/gear');
    expect(sitemap).toContain('/blog/2026-04-19-practical-tools-essentials');
    expect(noindex).toContain('/ux-auditor');
    expect(noindex.some(path => path.startsWith('/gear/'))).toBe(true);
    expect(noindex.some(path => path.startsWith('/blog/'))).toBe(false);
    expect(stubs).toContain('/ux-auditor');
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

  it('should prioritize updated date over date in frontmatter for content routes lastmod', () => {
    const { detailed } = getAllRoutes();
    // 2026-04-19-practical-tools-essentials.md has updated: "2026-06-24" and date: "2026-04-19"
    const target = detailed.find(r => r.path === '/blog/2026-04-19-practical-tools-essentials');
    expect(target).toBeDefined();
    expect(target?.lastmod).toContain('2026-06-24');
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
