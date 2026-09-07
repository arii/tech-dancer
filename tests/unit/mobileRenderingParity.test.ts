import { describe, it, expect } from 'vitest';
import { STATIC_SCHEMAS, BASE_URL } from '@/config/constants';
import { getPosts, getResources } from '@/lib/content';

describe('Mobile-First Indexing & Rendering Parity', () => {
  it('ensures STATIC_SCHEMAS.HOME contains WebSite and Organization with proper topical authority and founder affiliation', () => {
    const homeSchemas = STATIC_SCHEMAS.HOME;
    expect(Array.isArray(homeSchemas)).toBe(true);

    const websiteSchema = homeSchemas.find((s: Record<string, unknown>) => s['@type'] === 'WebSite');
    expect(websiteSchema).toBeDefined();
    expect(websiteSchema?.url).toBe(BASE_URL);
    expect(websiteSchema?.potentialAction).toBeDefined();

    const orgSchema = homeSchemas.find((s: Record<string, unknown>) => s['@type'] === 'Organization') as {
      name?: string;
      description?: string;
      knowsAbout?: string[];
      keywords?: string;
      address?: Record<string, string>;
      founder?: {
        name?: string;
        jobTitle?: string;
        url?: string;
        knowsAbout?: string[];
        sameAs?: string[];
      };
    } | undefined;
    expect(orgSchema).toBeDefined();
    expect(orgSchema?.name).toBe('BoomTick (BoomTick.blog)');
    expect(orgSchema?.description).toBe('West Coast Swing dance resources, event guides, competition timing mechanics, and custom dancer apparel.');
    expect(orgSchema?.knowsAbout).toEqual([
      'West Coast Swing',
      'Social Dancing',
      'Dance Mechanics and Timing',
      'WCS Event Travel and Logistics'
    ]);
    expect(orgSchema?.keywords).toBe('West Coast Swing, WCS dance guides, social dancing, dance footwear, WCS competitions');
    expect(orgSchema?.address).toEqual({
      '@type': 'PostalAddress',
      addressLocality: 'San Francisco',
      addressRegion: 'CA',
      addressCountry: 'US'
    });

    const founder = orgSchema?.founder;
    expect(founder).toBeDefined();
    expect(founder?.name).toBe('Ariel Anders');
    expect(founder?.jobTitle).toBe('Roboticist & AI Engineer');
    expect(founder?.url).toBe(`${BASE_URL}/about`);
    expect(founder?.knowsAbout).toEqual([
      'West Coast Swing',
      'Robotics',
      'Artificial Intelligence'
    ]);
    expect(founder?.sameAs).toEqual([
      'https://arii.github.io/',
      'https://github.com/arii',
      'https://www.linkedin.com/in/ariel-anders/',
      'https://www.instagram.com/onasafari/'
    ]);
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
