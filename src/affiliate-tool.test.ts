import { describe, it, expect, afterEach } from 'vitest';
import { normalizeAmazonUrl, extractAsin, slugify, getAffiliateTag } from '../scripts/affiliate/utils';

describe('Affiliate Tool Utilities', () => {
  describe('Environment Tag Application', () => {
    const originalEnv = process.env.AMAZON_AFFILIATE_TAG;

    afterEach(() => {
        process.env.AMAZON_AFFILIATE_TAG = originalEnv;
    });

    it('should use DEFAULT_AFFILIATE_TAG if environment variable is not set', () => {
        delete process.env.AMAZON_AFFILIATE_TAG;
        expect(getAffiliateTag()).toBe('onasafari04-20');
    });

    it('should use AMAZON_AFFILIATE_TAG from environment if set', () => {
      process.env.AMAZON_AFFILIATE_TAG = 'custom-tag';
      expect(getAffiliateTag()).toBe('custom-tag');
    });
  });

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

    it('should handle mobile Amazon URL formats', () => {
      const url = 'https://www.amazon.com/gp/aw/d/B0D3V61JC8';
      const normalized = normalizeAmazonUrl(url, 'test-tag');
      expect(normalized).toBe('https://www.amazon.com/dp/B0D3V61JC8?tag=test-tag');
    });

    it('should strip noise from non-product Amazon pages but keep the tag', () => {
      const url = 'https://www.amazon.com/s?k=dance+shoes&ref=some_noise';
      const normalized = normalizeAmazonUrl(url, 'test-tag');
      expect(normalized).toBe('https://www.amazon.com/s?tag=test-tag');
    });
  });

  describe('extractAsin', () => {
    it('should extract ASIN from various Amazon URL formats', () => {
      expect(extractAsin('https://www.amazon.com/dp/B0D3V61JC8')).toBe('B0D3V61JC8');
      expect(extractAsin('https://www.amazon.com/gp/product/B0D3V61JC8')).toBe('B0D3V61JC8');
      expect(extractAsin('https://www.amazon.com/gp/aw/d/B0D3V61JC8')).toBe('B0D3V61JC8');
      expect(extractAsin('https://www.amazon.com/dp/b0d3v61jc8')).toBe('B0D3V61JC8');
      expect(extractAsin('https://example.com')).toBe(null);
    });
  });

  describe('slugify', () => {
    it('should convert text to a URL-friendly slug', () => {
      expect(slugify('Loop Quiet 2 Ear Plugs')).toBe('loop-quiet-2-ear-plugs');
      expect(slugify('Product with !@# Special Characters')).toBe('product-with-special-characters');
    });
  });

  describe('Failure Modes and Guardrails', () => {
    it('should return original URL for non-Amazon links (normalization)', () => {
      const url = 'https://example.com/some-product';
      expect(normalizeAmazonUrl(url)).toBe(url);
    });

    it('should return null for URLs without ASIN', () => {
      expect(extractAsin('https://www.amazon.com/s?k=dance')).toBe(null);
      expect(extractAsin('https://www.amazon.com/dp/INVALID')).toBe(null);
    });
  });
});
