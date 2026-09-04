import { describe, it, expect } from 'vitest';
import {
  getImageUrl,
  generateMerchSchema,
  generateGearCatalogSchema,
  generateBreadcrumbSchema,
  generateImageObjectSchema,
  AMAZON_AFFILIATE_DISCLOSURE,
  DEFAULT_BRAND,
  DEFAULT_PRINTFUL_SHIPPING_DETAILS,
  DEFAULT_PRINTFUL_RETURN_POLICY,
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
    it('generates a valid SchemaItemList from merch products with enriched offer data', () => {
      const mockProducts: ProductCatalogItem[] = [
        {
          id: 'shirt-1',
          title: 'Awesome T-Shirt',
          description: 'A very cool shirt for WCS',
          imageUrl: '/assets/shirt.jpg',
          href: '/merch/shirt-1',
          category: 'Apparel',
          price: '25.00',
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
          price: '15.00',
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
              brand: DEFAULT_BRAND,
              sku: 'shirt-1',
              mpn: 'shirt-1',
              offers: {
                '@type': 'Offer',
                price: '25.00',
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
                itemCondition: 'https://schema.org/NewCondition',
                url: '/merch/shirt-1',
                shippingDetails: DEFAULT_PRINTFUL_SHIPPING_DETAILS,
                hasMerchantReturnPolicy: DEFAULT_PRINTFUL_RETURN_POLICY,
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
              brand: DEFAULT_BRAND,
              sku: 'hat-1',
              mpn: 'hat-1',
              offers: {
                '@type': 'Offer',
                price: '15.00',
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
                itemCondition: 'https://schema.org/NewCondition',
                url: '/merch/hat-1',
                shippingDetails: DEFAULT_PRINTFUL_SHIPPING_DETAILS,
                hasMerchantReturnPolicy: DEFAULT_PRINTFUL_RETURN_POLICY,
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
    it('generates a SchemaItemList for non-Amazon gear resources with complete offer metadata', () => {
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
          brand: DEFAULT_BRAND,
          sku: 'dance-shoes-1',
          mpn: 'dance-shoes-1',
          offers: {
            '@type': 'Offer',
            price: '25.00',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            itemCondition: 'https://schema.org/NewCondition',
            url: 'https://fuegodance.com/shoes',
            shippingDetails: DEFAULT_PRINTFUL_SHIPPING_DETAILS,
            hasMerchantReturnPolicy: DEFAULT_PRINTFUL_RETURN_POLICY,
          },
        },
      });
    });

    it('omits offers, price, and brand for Amazon affiliate products while adding disclosure', () => {
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
      expect(product.mpn).toBe('AMZ-JBL-5');
      expect(product.image).toBe(
        `${BASE_URL}${ASSET_PREFIX}/assets/comp_analysis_hero.webp`
      );
      expect(product.offers).toBeUndefined();
      expect(product.brand).toBeUndefined();
      expect((product as unknown as Record<string, unknown>).price).toBeUndefined();
      expect((product as unknown as Record<string, unknown>).aggregateRating).toBeUndefined();
      expect((product as unknown as Record<string, unknown>).review).toBeUndefined();
    });
  });

  describe('generateBreadcrumbSchema', () => {
    it('generates a valid SchemaBreadcrumbList with 1-based indexing and full canonical paths', () => {
      const items = [
        { name: 'Home', path: '/' },
        { name: 'Journal', path: '/blog' },
        { name: 'Packing Guide', path: '/blog/packing-guide' }
      ];

      const schema = generateBreadcrumbSchema(items);

      expect(schema).toEqual({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${BASE_URL}/`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Journal',
            item: `${BASE_URL}/blog`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Packing Guide',
            item: `${BASE_URL}/blog/packing-guide`
          }
        ]
      });
    });
  });

  describe('generateImageObjectSchema', () => {
    it('generates a valid SchemaImageObject with credit and licensing metadata', () => {
      const imageSchema = generateImageObjectSchema({
        url: '/assets/shoes.webp',
        caption: 'Dance shoes',
        description: 'Suede dance shoes for social dance floor',
        author: 'Ariel Anders, PhD'
      });

      expect(imageSchema).toEqual({
        '@type': 'ImageObject',
        url: `${BASE_URL}${ASSET_PREFIX}/assets/shoes.webp`,
        contentUrl: `${BASE_URL}${ASSET_PREFIX}/assets/shoes.webp`,
        caption: 'Dance shoes',
        description: 'Suede dance shoes for social dance floor',
        creditText: 'Ariel Anders, PhD',
        creator: {
          '@type': 'Person',
          name: 'Ariel Anders, PhD'
        },
        copyrightHolder: {
          '@type': 'Person',
          name: 'Ariel Anders, PhD'
        }
      });
    });
  });
});
