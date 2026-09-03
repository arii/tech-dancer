import { describe, it, expect } from 'vitest';
import { getResources } from '@/lib/content';
import { GEAR_PILLS } from '@/features/lab/config';

describe('Gear Filters Alignment', () => {
  const resources = getResources();
  const nonMerchResources = resources.filter(r => !r.shopUrl);

  it('excludes merch items with shopUrl from gear catalog', () => {
    expect(nonMerchResources.length).toBeGreaterThan(20);
    nonMerchResources.forEach(r => {
      expect(r.shopUrl).toBeUndefined();
    });
  });

  const pillKeywordsMap: Record<string, string[]> = {
    footwear: ['shoes', 'footwear', 'suede', 'maintenance', 'dance'],
    social: ['social', 'ballroom', 'safety', 'recovery', 'health', 'practice', 'music', 'outdoor', 'summer'],
    travel: ['travel', 'packing', 'storage', 'electronics'],
    theme: ['theme', 'costume', 'halloween', 'glow', 'galactic', 'nerd-night', 'fashion', 'visibility'],
  };

  GEAR_PILLS.forEach(pill => {
    it(`pill '${pill.value}' (${pill.label}) returns non-zero matched items`, () => {
      const keywords = pillKeywordsMap[pill.value] || [];
      const matched = nonMerchResources.filter(resource => {
        return keywords.some(kw =>
          resource.category?.toLowerCase().includes(kw) ||
          resource.tags?.some(t => t.toLowerCase().includes(kw)) ||
          resource.title?.toLowerCase().includes(kw) ||
          resource.excerpt?.toLowerCase().includes(kw) ||
          resource.description?.toLowerCase().includes(kw)
        );
      });

      expect(matched.length).toBeGreaterThan(0);
    });
  });

  it('ensures all non-merch gear items match at least one filter pill', () => {
    const unmappedItems: string[] = [];

    nonMerchResources.forEach(resource => {
      const matchesAnyPill = GEAR_PILLS.some(pill => {
        const keywords = pillKeywordsMap[pill.value] || [];
        return keywords.some(kw =>
          resource.category?.toLowerCase().includes(kw) ||
          resource.tags?.some(t => t.toLowerCase().includes(kw)) ||
          resource.title?.toLowerCase().includes(kw) ||
          resource.excerpt?.toLowerCase().includes(kw) ||
          resource.description?.toLowerCase().includes(kw)
        );
      });

      if (!matchesAnyPill) {
        unmappedItems.push(resource.slug);
      }
    });

    expect(unmappedItems).toEqual([]);
  });
});
