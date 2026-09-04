import { describe, it, expect } from 'vitest';
import {
  getImageUrl,
  generateMerchSchema,
  generateGearCatalogSchema,
  generateBreadcrumbSchema,
  generateImageObjectSchema,
  generateCollectionPageSchema,
  formatIsoDate,
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
          gearSlug: '2024-06-01-shirt-1',
          source: 'owned-merch',
          title: 'Awesome T-Shirt',
          description: 'A very cool shirt for WCS',
          imageUrl: '/assets/shirt.jpg',
          href: 'https://boomtick.printful.me/product/shirt-1',
          price: '25.00',
          collections: ['lead-follow-switch'],
          tags: ['Apparel'],
          disclosure: 'owned-printful',
        },
        {
          id: 'hat-1',
          source: 'owned-merch',
          title: 'WCS Cap',
          description: 'Stylish cap for events',
          imageUrl: 'https://cdn.example.com/hat.jpg',
          href: 'https://boomtick.printful.me/product/hat-1',
          price: '15.00',
          collections: ['accessories'],
          tags: ['Accessories'],
          disclosure: 'owned-printful',
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
                url: `${BASE_URL}/gear/2024-06-01-shirt-1`,
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
                url: `${BASE_URL}/gear/hat-1`,
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
    it('generates a SchemaItemList with Product schema for first-party merch gear resources', () => {
      const mockResources: Resource[] = [
        {
          slug: 'dance-shoes-1',
          title: 'Fuego Dance Sneakers',
          excerpt: 'Great dance shoes for all floor types.',
          content: 'Full review text...',
          category: 'footwear',
          image: '/assets/shoes.webp',
          shopUrl: 'https://fuegodance.com/shoes',
          provider: 'printful',
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
            url: `${BASE_URL}/gear/dance-shoes-1`,
            shippingDetails: DEFAULT_PRINTFUL_SHIPPING_DETAILS,
            hasMerchantReturnPolicy: DEFAULT_PRINTFUL_RETURN_POLICY,
          },
        },
      });
    });

    it('strips Product schema entirely for third-party affiliate items to avoid merchant listing penalties', () => {
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

      expect(schema.itemListElement[0]).toEqual({
        '@type': 'ListItem',
        position: 1,
        name: 'JBL Charge 5',
        url: `${BASE_URL}/gear/portable-speaker`,
      });

      const json = JSON.stringify(schema.itemListElement[0]);
      expect(json).not.toContain('"@type":"Product"');
      expect(json).not.toContain('offers');
      expect(json).not.toContain('price');
      expect(json).not.toContain('hasMerchantReturnPolicy');
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

  describe('formatIsoDate', () => {
    it('appends default UTC time if date is YYYY-MM-DD', () => {
      expect(formatIsoDate('2026-06-01')).toBe('2026-06-01T08:00:00Z');
      expect(formatIsoDate('2026-08-28')).toBe('2026-08-28T08:00:00Z');
    });

    it('retains existing ISO date with timezone', () => {
      expect(formatIsoDate('2026-06-01T12:00:00Z')).toBe('2026-06-01T12:00:00Z');
      expect(formatIsoDate('2026-06-01T12:00:00-07:00')).toBe('2026-06-01T12:00:00-07:00');
    });

    it('handles empty or undefined date gracefully', () => {
      expect(formatIsoDate(undefined)).toMatch(/^\d{4}-\d{2}-\d{2}T/);
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
        name: 'Dance shoes',
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
        },
        copyrightNotice: `© ${new Date().getFullYear()} Ariel Anders, PhD. All rights reserved.`,
        license: `${BASE_URL}/about#terms`,
        acquireLicensePage: `${BASE_URL}/about`
      });
    });
  });

  describe('generateCollectionPageSchema', () => {
    it('generates CollectionPage schema with breadcrumbs and publisher info', () => {
      const schemas = generateCollectionPageSchema({
        name: 'West Coast Swing Articles',
        description: 'Guide collection',
        url: '/blog',
        breadcrumbs: [
          { name: 'Home', path: '/' },
          { name: 'Journal', path: '/blog' }
        ]
      });

      expect(schemas).toHaveLength(2);
      expect(schemas[0]).toEqual({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'West Coast Swing Articles',
        description: 'Guide collection',
        url: `${BASE_URL}/blog`,
        publisher: {
          '@type': 'Organization',
          name: 'BoomTick.blog',
          url: BASE_URL,
          logo: {
            '@type': 'ImageObject',
            name: 'BoomTick.blog Logo',
            url: `${BASE_URL}/favicon.ico`
          }
        }
      });
      expect(schemas[1]).toMatchObject({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: expect.any(Array)
      });
    });
  });
});
