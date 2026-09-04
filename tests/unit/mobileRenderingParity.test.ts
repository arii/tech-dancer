import { describe, it, expect } from 'vitest';
import { STATIC_SCHEMAS, BASE_URL } from '@/config/constants';
import { getPosts, getResources } from '@/lib/content';

describe('Mobile-First Indexing & Rendering Parity', () => {
  it('ensures STATIC_SCHEMAS.HOME contains WebSite and Organization with proper founder affiliation', () => {
    const homeSchemas = STATIC_SCHEMAS.HOME;
    expect(Array.isArray(homeSchemas)).toBe(true);

    const websiteSchema = homeSchemas.find((s: Record<string, unknown>) => s['@type'] === 'WebSite');
    expect(websiteSchema).toBeDefined();
    expect(websiteSchema?.url).toBe(BASE_URL);
    expect(websiteSchema?.potentialAction).toBeDefined();

    const orgSchema = homeSchemas.find((s: Record<string, unknown>) => s['@type'] === 'Organization');
    expect(orgSchema).toBeDefined();
    const founder = orgSchema?.founder as { name?: string } | undefined;
    expect(founder).toBeDefined();
    expect(founder?.name).toBe('Ariel Anders');
  });

  it('ensures STATIC_SCHEMAS.ABOUT emits ProfilePage and BreadcrumbList', () => {
    const aboutSchemas = STATIC_SCHEMAS.ABOUT('Ariel Anders, PhD', 'Roboticist & WCS Dancer');
    expect(Array.isArray(aboutSchemas)).toBe(true);

    const profilePage = aboutSchemas.find((s: Record<string, unknown>) => s['@type'] === 'ProfilePage');
    expect(profilePage).toBeDefined();
    expect(profilePage?.mainEntity).toBeDefined();

    const breadcrumbs = aboutSchemas.find((s: Record<string, unknown>) => s['@type'] === 'BreadcrumbList');
    expect(breadcrumbs).toBeDefined();
    expect((breadcrumbs as { itemListElement: unknown[] }).itemListElement.length).toBe(2);
  });

  it('verifies all blog posts have non-empty excerpts, titles, and dates for mobile crawl parity', () => {
    const posts = getPosts();
    expect(posts.length).toBeGreaterThan(0);

    for (const post of posts) {
      expect(post.title).toBeTruthy();
      expect(post.excerpt).toBeTruthy();
      expect(post.date).toBeTruthy();
      expect(post.content).toBeTruthy();
    }
  });

  it('verifies all gear resources have non-empty titles and excerpts', () => {
    const resources = getResources();
    expect(resources.length).toBeGreaterThan(0);

    for (const resource of resources) {
      expect(resource.title).toBeTruthy();
      expect(resource.excerpt).toBeTruthy();
    }
  });
});
