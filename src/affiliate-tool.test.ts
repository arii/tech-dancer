import { describe, it, expect } from 'vitest';
import { normalizeAmazonUrl, extractAsin, slugify } from '../scripts/affiliate/utils';

describe('Affiliate Tool Utilities', () => {
  describe('normalizeAmazonUrl', () => {
    it('should normalize a standard Amazon DP URL and add the tracking tag', () => {
      const url = 'https://www.amazon.com/dp/B0D3V61JC8?ref=some_ref';
      const normalized = normalizeAmazonUrl(url, 'test-tag');
      expect(normalized).toBe('https://www.amazon.com/dp/B0D3V61JC8?tag=test-tag');
    });

    it('should handle Amazon gp/product URLs', () => {
      const url = 'https://www.amazon.com/gp/product/B0D3V61JC8/ref=some_ref';
      const normalized = normalizeAmazonUrl(url, 'test-tag');
      expect(normalized).toBe('https://www.amazon.com/dp/B0D3V61JC8?tag=test-tag');
    });

    it('should return the original URL if it is not an Amazon link', () => {
      const url = 'https://example.com/item';
      const normalized = normalizeAmazonUrl(url, 'test-tag');
      expect(normalized).toBe(url);
    });

    it('should handle URLs that already have a tag', () => {
        const url = 'https://www.amazon.com/dp/B0D3V61JC8?tag=old-tag';
        const normalized = normalizeAmazonUrl(url, 'new-tag');
        expect(normalized).toBe('https://www.amazon.com/dp/B0D3V61JC8?tag=new-tag');
    });
  });

  describe('extractAsin', () => {
    it('should extract ASIN from various Amazon URL formats', () => {
      expect(extractAsin('https://www.amazon.com/dp/B0D3V61JC8')).toBe('B0D3V61JC8');
      expect(extractAsin('https://www.amazon.com/gp/product/B0D3V61JC8')).toBe('B0D3V61JC8');
      expect(extractAsin('https://example.com')).toBe(null);
    });
  });

  describe('slugify', () => {
    it('should convert text to a URL-friendly slug', () => {
      expect(slugify('Loop Quiet 2 Ear Plugs')).toBe('loop-quiet-2-ear-plugs');
      expect(slugify('Product with !@# Special Characters')).toBe('product-with-special-characters');
    });
  });
});
