import { describe, it, expect } from 'vitest';
import { generateMerchSchema, generateGearCatalogSchema, getImageUrl } from '../../utils/schema';
import type { ProductCatalogItem } from '@/data/products/catalog';
import type { Resource } from '@/lib/types/content';
import { BASE_URL, ASSET_PREFIX } from '@/config/constants';

describe('Schema generation', () => {
  describe('generateMerchSchema', () => {
    it('should generate complete Product schema with valid price and policy details, strictly omitting reviews', () => {
      const mockProducts: ProductCatalogItem[] = [
        {
          id: 'test-id',
          source: 'owned-merch',
          title: 'Test Product',
          description: 'Test Description',
          imageUrl: '/test-image.jpg',
          href: '/test-product',
          price: '$25.00',
          collections: ['test'],
          tags: ['test'],
          disclosure: 'owned-printful'
        }
      ];

      const schema = generateMerchSchema(mockProducts);
      const product = schema.itemListElement[0].item;

      expect(product.name).toBe('Test Product');
      expect(product.sku).toBe('test-id');
      expect(product.mpn).toBe('test-id');
      expect(product.brand.name).toBe('BoomTick');

      expect(product.offers.price).toBe('25.00');
      expect(product.offers.priceCurrency).toBe('USD');
      expect(product.offers.availability).toBe('https://schema.org/InStock');
      expect(product.offers.itemCondition).toBe('https://schema.org/NewCondition');
      expect(product.offers.shippingDetails).toBeDefined();
      expect(product.offers.hasMerchantReturnPolicy).toBeDefined();

      const json = JSON.stringify(product);
      expect(json).not.toContain('aggregateRating');
      expect(json).not.toContain('review');

      expect(product.offers.url).toBe('/test-product');
    });
  });

  describe('generateGearCatalogSchema', () => {
    it('should generate Product schema for first-party merch gear with complete offer metadata and omit fake reviews', () => {
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
      expect(product.brand?.name).toBe('BoomTick');
      expect(product.sku).toBe('test-gear');
      expect(product.mpn).toBe('test-gear');

      expect(product.offers?.price).toBe('25.00');
      expect(product.offers?.priceCurrency).toBe('USD');
      expect(product.offers?.availability).toBe('https://schema.org/InStock');
      expect(product.offers?.shippingDetails).toBeDefined();
      expect(product.offers?.hasMerchantReturnPolicy).toBeDefined();

      expect(json).not.toContain('aggregateRating');
      expect(json).not.toContain('review');

      expect(product.offers?.url).toBe('https://example.com/test');
    });

    it('should omit offers and brand for affiliate products without shopUrl', () => {
      const mockResources: Resource[] = [
        {
          type: 'resource',
          slug: 'affiliate-gear',
          title: 'Affiliate Gear',
          date: '2023-01-01',
          author: 'Test Author',
          category: 'Gear',
          excerpt: 'Test Excerpt',
          content: 'Test Content',
          affiliateProvider: 'amazon',
        }
      ];

      const schema = generateGearCatalogSchema(mockResources);
      const product = schema.itemListElement[0].item;

      expect(product.name).toBe('Affiliate Gear');
      expect(product.offers).toBeUndefined();
      expect(product.brand).toBeUndefined();
    });
  });

  describe('getImageUrl', () => {
    it('should handle various URL formats without duplication', () => {
      const baseUrl = BASE_URL;
      const assetPrefix = ASSET_PREFIX;

      // Relative path
      expect(getImageUrl('/assets/foo.webp')).toBe(`${baseUrl}${assetPrefix}/assets/foo.webp`);

      // Path without leading slash
      expect(getImageUrl('assets/foo.webp')).toBe(`${baseUrl}${assetPrefix}/assets/foo.webp`);

      // External URL
      expect(getImageUrl('https://example.com/foo.webp')).toBe('https://example.com/foo.webp');

      // Already contains base URL
      expect(getImageUrl(`${baseUrl}/assets/foo.webp`)).toBe(`${baseUrl}${assetPrefix}/assets/foo.webp`);

      // Already contains asset prefix (if prefix is not '/')
      if (assetPrefix !== '' && assetPrefix !== '/') {
         expect(getImageUrl(`${assetPrefix}/assets/foo.webp`)).toBe(`${baseUrl}${assetPrefix}/assets/foo.webp`);
      }
    });

    it('should fallback to defaultUrl if url is missing', () => {
      expect(getImageUrl(undefined, '/default.jpg')).toBe(`${BASE_URL}${ASSET_PREFIX}/default.jpg`);
    });
  });
});
