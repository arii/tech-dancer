import { describe, it, expect } from 'vitest';
import {
  getImageUrl,
  generateMerchSchema,
  generateGearCatalogSchema,
  AMAZON_AFFILIATE_DISCLOSURE,
} from '@/utils/schema';
import { BASE_URL, ASSET_PREFIX } from '@/config/constants';
import type { ProductCatalogItem } from '@/data/products/catalog';
import type { Resource } from '@/lib/types/content';

describe('schema utils', () => {
  describe('getImageUrl', () => {
    it('returns empty string when no url or defaultUrl is provided', () => {
      expect(getImageUrl()).toBe('');
      expect(getImageUrl('', '')).toBe('');
    });

    it('returns the input URL unchanged if it starts with http', () => {
      expect(getImageUrl('https://example.com/image.jpg')).toBe('https://example.com/image.jpg');
      expect(getImageUrl('http://example.com/image.png')).toBe('http://example.com/image.png');
    });

    it('uses fallback defaultUrl when url is omitted or empty', () => {
      expect(getImageUrl(undefined, '/assets/default.jpg')).toBe(
        `${BASE_URL}${ASSET_PREFIX}/assets/default.jpg`
      );
      expect(getImageUrl('', 'https://example.com/default.jpg')).toBe(
        'https://example.com/default.jpg'
      );
    });

    it('formats relative path with BASE_URL and ASSET_PREFIX', () => {
      expect(getImageUrl('assets/photo.webp')).toBe(
        `${BASE_URL}${ASSET_PREFIX}/assets/photo.webp`
      );
      expect(getImageUrl('///assets/photo.webp')).toBe(
        `${BASE_URL}${ASSET_PREFIX}/assets/photo.webp`
      );
    });
  });

  describe('generateMerchSchema', () => {
    it('generates a valid SchemaItemList from merch products', () => {
      const mockProducts: ProductCatalogItem[] = [
        {
          id: 'shirt-1',
          title: 'Awesome T-Shirt',
          description: 'A very cool shirt for WCS',
          imageUrl: '/assets/shirt.jpg',
          href: '/merch/shirt-1',
          category: 'Apparel',
          price: 25,
          currency: 'USD',
          inStock: true,
        },
        {
          id: 'hat-1',
          title: 'WCS Cap',
          description: 'Stylish cap for events',
          imageUrl: 'https://cdn.example.com/hat.jpg',
          href: '/merch/hat-1',
          category: 'Accessories',
          price: 15,
          currency: 'USD',
          inStock: true,
        },
      ];

      const schema = generateMerchSchema(mockProducts);

      expect(schema).toEqual({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@type': 'Product',
              name: 'Awesome T-Shirt',
              description: 'A very cool shirt for WCS',
              image: `${BASE_URL}${ASSET_PREFIX}/assets/shirt.jpg`,
              brand: {
                '@type': 'Brand',
                name: 'BoomTick',
              },
              sku: 'shirt-1',
              offers: {
                '@type': 'Offer',
                url: '/merch/shirt-1',
              },
            },
          },
          {
            '@type': 'ListItem',
            position: 2,
            item: {
              '@type': 'Product',
              name: 'WCS Cap',
              description: 'Stylish cap for events',
              image: 'https://cdn.example.com/hat.jpg',
              brand: {
                '@type': 'Brand',
                name: 'BoomTick',
              },
              sku: 'hat-1',
              offers: {
                '@type': 'Offer',
                url: '/merch/hat-1',
              },
            },
          },
        ],
      });
    });

    it('returns empty itemListElement when products array is empty', () => {
      const schema = generateMerchSchema([]);
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('ItemList');
      expect(schema.itemListElement).toEqual([]);
    });
  });

  describe('generateGearCatalogSchema', () => {
    it('generates a SchemaItemList for non-Amazon gear resources', () => {
      const mockResources: Resource[] = [
        {
          slug: 'dance-shoes-1',
          title: 'Fuego Dance Sneakers',
          excerpt: 'Great dance shoes for all floor types.',
          content: 'Full review text...',
          category: 'footwear',
          image: '/assets/shoes.webp',
          shopUrl: 'https://fuegodance.com/shoes',
        },
      ];

      const schema = generateGearCatalogSchema(mockResources);

      expect(schema.itemListElement[0]).toEqual({
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'Product',
          name: 'Fuego Dance Sneakers',
          description: 'Great dance shoes for all floor types.',
          image: `${BASE_URL}${ASSET_PREFIX}/assets/shoes.webp`,
          brand: {
            '@type': 'Brand',
            name: 'BoomTick',
          },
          sku: 'dance-shoes-1',
          offers: {
            '@type': 'Offer',
            url: 'https://fuegodance.com/shoes',
          },
        },
      });
    });

    it('appends AMAZON_AFFILIATE_DISCLOSURE for Amazon affiliate products', () => {
      const mockResources: Resource[] = [
        {
          slug: 'portable-speaker',
          title: 'JBL Charge 5',
          excerpt: 'Powerful portable speaker for dance practice.',
          content: 'Full review content...',
          category: 'audio',
          affiliateProvider: 'amazon',
          internalSku: 'AMZ-JBL-5',
        },
      ];

      const schema = generateGearCatalogSchema(mockResources);

      const product = schema.itemListElement[0].item;
      expect(product.description).toBe(
        `Powerful portable speaker for dance practice. ${AMAZON_AFFILIATE_DISCLOSURE}`
      );
      expect(product.sku).toBe('AMZ-JBL-5');
      expect(product.image).toBe(
        `${BASE_URL}${ASSET_PREFIX}/assets/comp_analysis_hero.webp`
      );
      expect(product.offers.url).toBe(`${BASE_URL}/gear/portable-speaker`);
    });
  });
});
