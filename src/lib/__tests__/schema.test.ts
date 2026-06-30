import { describe, it, expect } from 'vitest';
import { generateMerchSchema, generateGearCatalogSchema, getImageUrl } from '../../utils/schema';
import type { ProductCatalogItem } from '@/data/products/catalog';
import type { Resource } from '@/lib/types/content';
import { BASE_URL, ASSET_PREFIX } from '@/config/constants';

describe('Schema generation', () => {
  describe('generateMerchSchema', () => {
    it('should only include stable fields and no risky fields', () => {
      const mockProducts: ProductCatalogItem[] = [
        {
          id: 'test-id',
          source: 'owned-merch',
          title: 'Test Product',
          description: 'Test Description',
          imageUrl: '/test-image.jpg',
          href: '/test-product',
          price: '5.00',
          collections: ['test'],
          tags: ['test'],
          disclosure: 'owned-printful'
        }
      ];

      const schema = generateMerchSchema(mockProducts);
      const product = schema.itemListElement[0].item;

      expect(product.name).toBe('Test Product');
      expect(product.sku).toBe('test-id');

      // Risky fields should be undefined (and should not even be in the type)
      const json = JSON.stringify(product);
      expect(json).not.toContain('price');
      expect(json).not.toContain('availability');
      expect(json).not.toContain('shippingDetails');
      expect(json).not.toContain('hasMerchantReturnPolicy');
      expect(json).not.toContain('aggregateRating');
      expect(json).not.toContain('review');

      expect(product.offers.url).toBe('/test-product');
    });
  });

  describe('generateGearCatalogSchema', () => {
    it('should not include ratings, reviews, or risky offer claims for gear', () => {
      const mockResources: Resource[] = [
        {
          type: 'resource',
          slug: 'test-gear',
          title: 'Test Gear',
          date: '2023-01-01',
          author: 'Test Author',
          category: 'Gear',
          excerpt: 'Test Excerpt',
          content: 'Test Content',
          rating: 4.5,
          verdict: 'Excellent gear',
          shopUrl: 'https://example.com/test',
          provider: 'printful'
        }
      ];

      const schema = generateGearCatalogSchema(mockResources);
      const product = schema.itemListElement[0].item;
      const json = JSON.stringify(product);

      expect(product.name).toBe('Test Gear');
      expect(json).not.toContain('aggregateRating');
      expect(json).not.toContain('review');
      expect(json).not.toContain('price');
      expect(json).not.toContain('availability');
      expect(json).not.toContain('shippingDetails');
      expect(json).not.toContain('hasMerchantReturnPolicy');

      expect(product.offers.url).toBe('https://example.com/test');
    });
  });

  describe('getImageUrl', () => {
    it('should handle various URL formats without duplication', () => {
      const baseUrl = BASE_URL;
      const assetPrefix = ASSET_PREFIX;

      // Relative path
      expect(getImageUrl('/images/foo.webp')).toBe(`${baseUrl}${assetPrefix}/images/foo.webp`);

      // Path without leading slash
      expect(getImageUrl('images/foo.webp')).toBe(`${baseUrl}${assetPrefix}/images/foo.webp`);

      // External URL
      expect(getImageUrl('https://example.com/foo.webp')).toBe('https://example.com/foo.webp');

      // Already contains base URL
      expect(getImageUrl(`${baseUrl}/images/foo.webp`)).toBe(`${baseUrl}${assetPrefix}/images/foo.webp`);

      // Already contains asset prefix (if prefix is not '/')
      if (assetPrefix !== '' && assetPrefix !== '/') {
         expect(getImageUrl(`${assetPrefix}/images/foo.webp`)).toBe(`${baseUrl}${assetPrefix}/images/foo.webp`);
      }
    });

    it('should fallback to defaultUrl if url is missing', () => {
      expect(getImageUrl(undefined, '/default.jpg')).toBe(`${BASE_URL}${ASSET_PREFIX}/default.jpg`);
    });
  });
});
