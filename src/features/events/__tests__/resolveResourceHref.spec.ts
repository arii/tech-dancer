import { describe, it, expect } from 'vitest';
import affiliates from '@/data/affiliates.json';
import { getResources } from '@/lib/content';
import { resolveResourceHref } from '../resolveResourceHref';

describe('resolveResourceHref', () => {
  it('prefers canonical internal gear slug routes', () => {
    const resolved = resolveResourceHref({
      url: 'https://amazon.com/example',
      gearSlug: '2023-10-01-loop-earplugs',
    });

    expect(resolved).toEqual({
      href: '/gear/2023-10-01-loop-earplugs',
      isExternal: false,
      isAffiliate: false,
    });
  });

  it('treats printful merch links as external but not affiliate links', () => {
    const resolved = resolveResourceHref({
      url: 'https://boomtick.printful.me/product/example',
    });

    expect(resolved.isExternal).toBe(true);
    expect(resolved.isAffiliate).toBe(false);
  });

  it('requires all canonical gear slugs to map to existing gear resources', () => {
    const resourceSlugs = new Set(getResources().map((resource) => resource.slug));
    const missing = Object.values(affiliates)
      .flatMap((link) => (link.gearSlug && !resourceSlugs.has(link.gearSlug) ? [link.gearSlug] : []));

    expect(missing).toEqual([]);
  });
});
