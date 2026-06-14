import { describe, it, expect } from 'vitest';
import { affiliateManager } from '../affiliateManager';

describe('affiliateManager', () => {
  describe('resolveResourceHref', () => {
    it('resolves external URL if id is provided', () => {
      expect(affiliateManager.resolveResourceHref({ id: 'compression-cubes' }))
        .toContain('amazon.com');
    });

    it('returns # if no id is provided', () => {
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
