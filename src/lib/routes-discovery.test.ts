import fs from 'node:fs';
import { describe, it, expect } from 'vitest';
import { JSDOM } from 'jsdom';
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
    expect(sitemap).toContain('/research/deployment-impact-analyzer');
    expect(noindex).not.toContain('/research/deployment-impact-analyzer');
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
    // 2026-04-19-practical-tools-essentials.md has updated: "2026-11-21" and date: "2026-04-19"
    const target = detailed.find(r => r.path === '/blog/2026-04-19-practical-tools-essentials');
    expect(target).toBeDefined();
    expect(target?.lastmod).toContain('2026-11-21');
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


describe('consolidated travel-tech guides', () => {
  const destination = '/blog/2026-04-19-practical-tools-essentials';
  const retiredSlugs = ['2026-06-01-power-charging', '2026-06-01-practice-review-tech'];

  it('keeps the combined guide, not the retired posts, in discovery', () => {
    const { content, sitemap } = getAllRoutes();
    expect(content).toContain(destination);
    expect(sitemap).toContain(destination);
    for (const slug of retiredSlugs) {
      expect(content).not.toContain(`/blog/${slug}`);
      expect(sitemap).not.toContain(`/blog/${slug}`);
      expect(fs.existsSync(`content/posts/${slug}.md`)).toBe(false);
    }
  });

  it.each(retiredSlugs)('preserves %s on the server and static hosts', slug => {
    const config = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
    expect(config.redirects).toContainEqual({ source: `/blog/${slug}`, destination, permanent: true });
    const doc = new JSDOM(fs.readFileSync(`public/blog/${slug}/index.html`, 'utf8')).window.document;
    const canonical = `https://boomtick.blog${destination}`;
    expect(doc.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(canonical);
    expect(doc.querySelector('meta[http-equiv="refresh"]')?.getAttribute('content')).toBe(`0; url=${canonical}`);
    expect(doc.querySelector('main a')?.getAttribute('href')).toBe(canonical);
    expect(doc.querySelector('script')).toBeNull();
  });

  it('keeps useful recording and power advice without the generic cable affiliate card', () => {
    const guide = fs.readFileSync('content/posts/2026-04-19-practical-tools-essentials.md', 'utf8');
    expect(guide).toContain('### Travel Tech & Practice');
    expect(guide).toContain('#### Power and Cables');
    expect(guide).toContain('#### Music and Recording');
    expect(guide).toContain('Phone and compact tripod');
    expect(guide).not.toContain('id="charging-cables"');
  });
});
