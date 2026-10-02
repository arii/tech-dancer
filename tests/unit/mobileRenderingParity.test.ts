import { describe, it, expect } from 'vitest';
import { STATIC_SCHEMAS, BASE_URL } from '@/config/constants';
import { getPosts, getResources } from '@/lib/content';

describe('Mobile-First Indexing & Rendering Parity', () => {
  it('ensures STATIC_SCHEMAS.HOME contains WebSite, ProfessionalService, and Person in @graph array', () => {
    const homeSchema = STATIC_SCHEMAS.HOME;
    expect(homeSchema['@context']).toBe('https://schema.org');
    expect(Array.isArray(homeSchema['@graph'])).toBe(true);

    const graph = homeSchema['@graph'];

    const websiteSchema = graph.find((s: Record<string, unknown>) => s['@type'] === 'WebSite') as Record<string, unknown> | undefined;
    expect(websiteSchema).toBeDefined();
    expect(websiteSchema?.['@id']).toBe(`${BASE_URL}/#website`);
    expect(websiteSchema?.url).toBe(`${BASE_URL}/`);
    expect(websiteSchema?.name).toBe('BoomTick');
    expect(websiteSchema?.publisher).toEqual({
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'BoomTick',
      logo: `${BASE_URL}/assets/boomtick-logo.png`,
      image: `${BASE_URL}/assets/boomtick-og-banner.jpg`
    });

    const consultingSchema = graph.find((s: Record<string, unknown>) => s['@type'] === 'ProfessionalService') as Record<string, unknown> | undefined;
    expect(consultingSchema).toBeDefined();
    expect(consultingSchema?.['@id']).toBe(`${BASE_URL}/#consulting`);
    expect(consultingSchema?.name).toBe('Ariel Anders Consulting');
    expect(consultingSchema?.url).toBe(`${BASE_URL}/services`);
    expect(consultingSchema?.telephone).toBe('+1-661-205-2489');
    expect(consultingSchema?.priceRange).toBe('$$$');
    expect(consultingSchema?.image).toBe(`${BASE_URL}/assets/ariel-anders-consulting-banner.jpg`);
    expect(consultingSchema?.areaServed).toEqual([
      {
        '@type': 'City',
        name: 'San Francisco'
      },
      {
        '@type': 'AdministrativeArea',
        name: 'California'
      }
    ]);
    expect(consultingSchema?.founder).toEqual({
      '@id': `${BASE_URL}/#founder`
    });
    expect(consultingSchema?.hasOfferCatalog).toBeDefined();

    const founderSchema = graph.find((s: Record<string, unknown>) => s['@type'] === 'Person') as Record<string, unknown> | undefined;
    expect(founderSchema).toBeDefined();
    expect(founderSchema?.['@id']).toBe(`${BASE_URL}/#founder`);
    expect(founderSchema?.name).toBe('Ariel Anders');
    expect(founderSchema?.jobTitle).toBe('Roboticist, AI Engineer & Consultant');
    expect(founderSchema?.url).toBe(`${BASE_URL}/about`);
    expect(founderSchema?.sameAs).toEqual([
      'https://arii.github.io/',
      'https://github.com/arii',
      'https://www.linkedin.com/in/ariel-anders/'
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
