import { describe, it, expect } from 'vitest';
import { affiliateManager } from '../affiliateManager';

describe('affiliateManager', () => {
  describe('resolveResourceHref', () => {
    it('resolves to external URL if id is provided', () => {
      // Loop experience has gearSlug in database but we now prefer external URL
      expect(affiliateManager.resolveResourceHref({ id: 'loop-experience' }))
        .toContain('amazon.com');
    });

    it('resolves external URL if no gearSlug is found', () => {
      // compression-cubes has no gearSlug
      expect(affiliateManager.resolveResourceHref({ id: 'compression-cubes' }))
        .toContain('amazon.com');
    });

    it('returns # if no id is provided (gearSlug ignored)', () => {
      expect(affiliateManager.resolveResourceHref({ gearSlug: 'test-slug' }))
        .toBe('#');
      expect(affiliateManager.resolveResourceHref({}))
        .toBe('#');
    });
  });

  describe('resolveUrl', () => {
    it('applies default tracking to non-Printful links', () => {
      const url = affiliateManager.resolveUrl('compression-cubes');
      expect(url).toContain('utm_source=boomtick-blog');
      expect(url).toContain('utm_medium=portfolio');
    });

    it('does NOT apply tracking to Printful links', () => {
      const url = affiliateManager.resolveUrl('love-neon-follow-shirt');
      expect(url).toContain('printful.me');
      expect(url).not.toContain('utm_source');
    });
  });
});
