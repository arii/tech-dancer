import { describe, it, expect } from 'vitest';
import { generateMerchSchema, generateGearCatalogSchema } from '../../utils/schema';
import type { ProductCatalogItem } from '@/data/products/catalog';
import type { Resource } from '@/lib/types/content';

describe('Schema generation', () => {
  describe('generateMerchSchema', () => {
    it('should only include stable fields by default for non-printful merch', () => {
      const mockProducts: ProductCatalogItem[] = [
        {
          id: 'test-id',
          source: 'owned-merch',
          title: 'Test Product',
          description: 'Test Description',
          imageUrl: '/test-image.jpg',
          href: '/test-product',
          collections: ['test'],
          tags: ['test'],
          disclosure: 'none'
        }
      ];

      const schema = generateMerchSchema(mockProducts);
      const product = schema.itemListElement[0].item;

      expect(product.name).toBe('Test Product');
      expect(product.sku).toBe('test-id');
      expect(product.aggregateRating).toBeUndefined();
      expect(product.review).toBeUndefined();
      expect(product.offers.shippingDetails).toBeUndefined();
      expect(product.offers.hasMerchantReturnPolicy).toBeUndefined();
      expect(product.offers.availability).toBeUndefined();
    });

    it('should include price and policies for printful merch', () => {
      const mockProducts: ProductCatalogItem[] = [
        {
          id: 'printful-id',
          source: 'owned-merch',
          title: 'Printful Product',
          description: 'Printful Description',
          imageUrl: '/printful-image.jpg',
          href: '/printful-product',
          price: '$25.00',
          collections: ['test'],
          tags: ['test'],
          disclosure: 'owned-printful'
        }
      ];

      const schema = generateMerchSchema(mockProducts);
      const product = schema.itemListElement[0].item;

      expect(product.offers.price).toBe('25.00');
      expect(product.offers.priceCurrency).toBe('USD');
      expect(product.offers.shippingDetails).toBeDefined();
      expect(product.offers.hasMerchantReturnPolicy).toBeDefined();
      expect(product.offers.availability).toBe('https://schema.org/InStock');
    });
  });

  describe('generateGearCatalogSchema', () => {
    it('should not include ratings or policies if not provided', () => {
      const mockResources: Resource[] = [
        {
          type: 'resource',
          slug: 'test-gear',
          title: 'Test Gear',
          date: '2023-01-01',
          author: 'Ariel Anders, PhD',
          category: 'Gear',
          excerpt: 'Test Excerpt',
          content: 'Test Content'
        }
      ];

      const schema = generateGearCatalogSchema(mockResources);
      const product = schema.itemListElement[0].item;

      expect(product.aggregateRating).toBeUndefined();
      expect(product.review).toBeUndefined();
      expect(product.offers.shippingDetails).toBeUndefined();
    });

    it('should include ratings and reviews when verified source data exists', () => {
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
          verdict: 'Excellent gear'
        }
      ];

      const schema = generateGearCatalogSchema(mockResources);
      const product = schema.itemListElement[0].item;

      expect(product.aggregateRating).toBeDefined();
      expect(product.aggregateRating?.ratingValue).toBe(4.5);
      expect(product.review).toBeDefined();
      expect(product.review?.[0].reviewRating.ratingValue).toBe(4.5);
      expect(product.review?.[0].author.name).toBe('Test Author');
    });

    it('should NOT include review if verdict is present but rating is missing', () => {
      const mockResources: Resource[] = [
        {
          type: 'resource',
          slug: 'test-gear',
          title: 'Test Gear',
          date: '2023-01-01',
          author: 'Ariel Anders, PhD',
          category: 'Gear',
          excerpt: 'Test Excerpt',
          content: 'Test Content',
          verdict: 'Excellent gear'
        }
      ];

      const schema = generateGearCatalogSchema(mockResources);
      const product = schema.itemListElement[0].item;

      expect(product.review).toBeUndefined();
    });

    it('should include policies for owned merch in gear catalog', () => {
      const mockResources: Resource[] = [
        {
          type: 'resource',
          slug: 'merch-gear',
          title: 'Merch Gear',
          date: '2023-01-01',
          author: 'Ariel Anders, PhD',
          category: 'Gear',
          excerpt: 'Test Excerpt',
          content: 'Test Content',
          shopUrl: 'https://printful.com/test',
          provider: 'printful'
        }
      ];

      const schema = generateGearCatalogSchema(mockResources);
      const product = schema.itemListElement[0].item;

      expect(product.offers.shippingDetails).toBeDefined();
      expect(product.offers.hasMerchantReturnPolicy).toBeDefined();
      expect(product.offers.availability).toBe('https://schema.org/InStock');
    });
  });
});
