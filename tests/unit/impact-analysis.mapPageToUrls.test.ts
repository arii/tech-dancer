import { describe, it, expect, vi } from 'vitest';
import { mapPageToUrls } from '../../boomtick-pkg/scripts/impact-review-utils';

// Mock IMPACT_CONFIG
vi.mock('../../boomtick-pkg/scripts/impact-analysis.config', () => ({
  IMPACT_CONFIG: {
    PAGE_ROUTE_OVERRIDES: {
      'Home': '/',
      'UXAuditor': '/ux-auditor',
      'BlogPost': '/blog/:slug',
      'ResearchDetail': '/research/:id',
      'Index': '/'
    }
  }
}));

describe('mapPageToUrls', () => {
  const sitemapUrls = [
    '/',
    '/blog',
    '/blog/post-1',
    '/blog/post-2',
    '/research',
    '/research/tool-1',
    '/ux-auditor',
    '/events',
    '/about'
  ];

  it('handles basic PascalCase to kebab-case conversion', () => {
    // Note: HomePage is not in overrides, so it gets default converted to /home-page
    expect(mapPageToUrls('src/pages/HomePage.tsx', ['/home-page', '/other'])).toEqual(['/home-page']);

    // Testing with the provided sitemap URLs where it matches exactly
    expect(mapPageToUrls('src/pages/Events.tsx', sitemapUrls)).toEqual(['/events']);
    expect(mapPageToUrls('src/pages/About.tsx', sitemapUrls)).toEqual(['/about']);
  });

  it('handles IMPACT_CONFIG.PAGE_ROUTE_OVERRIDES', () => {
    // UXAuditor is overridden to /ux-auditor
    expect(mapPageToUrls('src/pages/UXAuditor.tsx', sitemapUrls)).toEqual(['/ux-auditor']);
  });

  it('handles root path (/) correctly', () => {
    // Home is overridden to /
    expect(mapPageToUrls('src/pages/Home.tsx', sitemapUrls)).toEqual(['/']);

    // Test when root path is not in sitemap
    expect(mapPageToUrls('src/pages/Home.tsx', ['/blog'])).toEqual([]);
  });

  it('handles dynamic routes and maps to multiple URLs', () => {
    // BlogPost is overridden to /blog/:slug
    // It should match all URLs starting with /blog/ but not exactly /blog
    expect(mapPageToUrls('src/pages/BlogPost.tsx', sitemapUrls)).toEqual([
      '/blog/post-1',
      '/blog/post-2'
    ]);

    // ResearchDetail is overridden to /research/:id
    expect(mapPageToUrls('src/pages/ResearchDetail.tsx', sitemapUrls)).toEqual([
      '/research/tool-1'
    ]);
  });

  it('handles exact matches in sitemapUrls', () => {
    expect(mapPageToUrls('src/pages/Blog.tsx', sitemapUrls)).toEqual(['/blog']);
  });

  it('returns empty array and warns when fallback routePattern not found in sitemapUrls and not dynamic', () => {
    // A component that isn't in overrides and its kebab-case route isn't in sitemap
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(mapPageToUrls('src/pages/ContactUs.tsx', sitemapUrls)).toEqual([]);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("was not found in the authoritative sitemap"));
    consoleSpy.mockRestore();
  });
});