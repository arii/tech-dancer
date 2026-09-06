import { describe, it, expect } from 'vitest';
import {
  getImageUrl,
  generateMerchSchema,
  generateGearCatalogSchema,
  generateBreadcrumbSchema,
  generateImageObjectSchema,
  generateCollectionPageSchema,
  formatIsoDate,
  extractHowToFromMarkdown,
  extractFaqFromMarkdown,
  generateMemeGallerySchema,
  generateProfileGallerySchema,
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
                category: 'Apparel & Accessories > Clothing',
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
                category: 'Apparel & Accessories > Clothing',
              brand: DEFAULT_BRAND,
              sku: 'hat-1',
              mpn: 'hat-1',
              offers: {
                '@type': 'Offer',
                price: '15.00',
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
                itemCondition: 'https://schema.org/NewCondition',
                  url: 'https://boomtick.printful.me/product/hat-1',
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
            category: 'Apparel & Accessories > Clothing',
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
        { name: 'Blog', path: '/blog' },
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
            name: 'Blog',
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

    it('generates schema.org compliant BreadcrumbList for blog post routes (/blog/:slug)', () => {
      const blogBreadcrumbs = [
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: 'Event Travel & Packing', path: '/blog/2026-06-01-event-travel-packing' }
      ];

      const schema = generateBreadcrumbSchema(blogBreadcrumbs);

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('BreadcrumbList');
      expect(schema.itemListElement).toHaveLength(3);

      schema.itemListElement.forEach((item, idx) => {
        expect(item['@type']).toBe('ListItem');
        expect(item.position).toBe(idx + 1);
        expect(typeof item.name).toBe('string');
        expect(item.name.length).toBeGreaterThan(0);
        expect(item.item).toMatch(/^https?:\/\//);
      });

      expect(schema.itemListElement[1]).toEqual({
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${BASE_URL}/blog`
      });
      expect(schema.itemListElement[2]).toEqual({
        '@type': 'ListItem',
        position: 3,
        name: 'Event Travel & Packing',
        item: `${BASE_URL}/blog/2026-06-01-event-travel-packing`
      });
    });

    it('generates schema.org compliant BreadcrumbList for gear item routes (/gear/:slug)', () => {
      const gearBreadcrumbs = [
        { name: 'Home', path: '/' },
        { name: 'Gear & Tools', path: '/gear' },
        { name: 'Adhesive Suede Sheets for DIY Dance Shoes', path: '/gear/2026-04-12-suede-shoe-diy' }
      ];

      const schema = generateBreadcrumbSchema(gearBreadcrumbs);

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('BreadcrumbList');
      expect(schema.itemListElement).toHaveLength(3);

      schema.itemListElement.forEach((item, idx) => {
        expect(item['@type']).toBe('ListItem');
        expect(item.position).toBe(idx + 1);
        expect(typeof item.name).toBe('string');
        expect(item.name.length).toBeGreaterThan(0);
        expect(item.item).toMatch(/^https?:\/\//);
      });

      expect(schema.itemListElement[1]).toEqual({
        '@type': 'ListItem',
        position: 2,
        name: 'Gear & Tools',
        item: `${BASE_URL}/gear`
      });
      expect(schema.itemListElement[2]).toEqual({
        '@type': 'ListItem',
        position: 3,
        name: 'Adhesive Suede Sheets for DIY Dance Shoes',
        item: `${BASE_URL}/gear/2026-04-12-suede-shoe-diy`
      });
    });

    it('generates schema.org compliant BreadcrumbList for research/tool routes (/research/:toolId)', () => {
      const researchBreadcrumbs = [
        { name: 'Home', path: '/' },
        { name: 'Research', path: '/research' },
        { name: 'Deployment Impact Analyzer', path: '/research/deployment-impact-analyzer' }
      ];

      const schema = generateBreadcrumbSchema(researchBreadcrumbs);

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('BreadcrumbList');
      expect(schema.itemListElement).toHaveLength(3);

      schema.itemListElement.forEach((item, idx) => {
        expect(item['@type']).toBe('ListItem');
        expect(item.position).toBe(idx + 1);
        expect(typeof item.name).toBe('string');
        expect(item.name.length).toBeGreaterThan(0);
        expect(item.item).toMatch(/^https?:\/\//);
      });

      expect(schema.itemListElement[1]).toEqual({
        '@type': 'ListItem',
        position: 2,
        name: 'Research',
        item: `${BASE_URL}/research`
      });
      expect(schema.itemListElement[2]).toEqual({
        '@type': 'ListItem',
        position: 3,
        name: 'Deployment Impact Analyzer',
        item: `${BASE_URL}/research/deployment-impact-analyzer`
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

  describe('extractHowToFromMarkdown & generateHowToSchema', () => {
    it('extracts step-by-step tutorial steps and tools from markdown', () => {
      const mockPost = {
        title: 'Make Any Shoe a Dance Shoe',
        excerpt: 'DIY modification guide',
        image: '/images/gear/diy/hero.webp',
        slug: 'make-shoe-dance',
        content: `
## Required Gear
| Item | Purpose |
| :--- | :--- |
| **Adhesive suede sheets** | Creates dance sole |
| **Isopropyl alcohol** | Surface prep |

## Step-by-Step Tutorial

### 1. Clean the Sole
Remove dirt and oils from the rubber sole.
![Clean sole](/images/gear/diy/step1-clean.svg)

### 2. Trace the Shoe
Place the shoe sole-down on backing paper.
`
      };

      const howTo = extractHowToFromMarkdown(mockPost);
      expect(howTo).not.toBeNull();
      expect(howTo?.['@type']).toBe('HowTo');
      expect(howTo?.name).toBe('Make Any Shoe a Dance Shoe');
      expect(howTo?.step).toHaveLength(2);
      expect(howTo?.step[0].name).toBe('Step 1: Clean the Sole');
      expect(howTo?.step[0].image).toBe(`${BASE_URL}${ASSET_PREFIX}/images/gear/diy/step1-clean.svg`);
    });

    it('returns null when no step headers exist in markdown', () => {
      const mockPost = {
        title: 'General Article',
        excerpt: 'No steps here',
        slug: 'general-article',
        content: 'Just general text without any step headings.'
      };

      expect(extractHowToFromMarkdown(mockPost)).toBeNull();
    });
  });

  describe('extractFaqFromMarkdown & generateFAQPageSchema', () => {
    it('extracts FAQ section questions and answers from markdown', () => {
      const content = `
# Guide Title
Some text here.

## FAQs

**How durable are adhesive suede sheets?**
Suede sheets typically last for several months of regular dancing.

**How do I remove them?**
If you need to replace the sheets, peel them off slowly.
`;

      const faqPage = extractFaqFromMarkdown(content);
      expect(faqPage).not.toBeNull();
      expect(faqPage?.['@type']).toBe('FAQPage');
      expect(faqPage?.mainEntity).toHaveLength(2);
      expect(faqPage?.mainEntity[0].name).toBe('How durable are adhesive suede sheets?');
      expect(faqPage?.mainEntity[0].acceptedAnswer.text).toBe('Suede sheets typically last for several months of regular dancing.');
    });

    it('returns null when no FAQs section is present', () => {
      expect(extractFaqFromMarkdown('# Title\nNo FAQ here')).toBeNull();
    });
  });

  describe('generateMemeGallerySchema & generateProfileGallerySchema', () => {
    it('generates ImageGallery JSON-LD for memes with Google Image License attributes', () => {
      const mockMemes = [
        {
          id: 'meme-1',
          title: 'The Slotted Dance Debate',
          imageSrc: '/assets/memes/9c2lc9.jpg',
          altText: 'WCS slot debate meme'
        }
      ];

      const gallery = generateMemeGallerySchema(mockMemes);
      expect(gallery['@type']).toBe('ImageGallery');
      expect(gallery.itemListElement).toHaveLength(1);

      const item = gallery.itemListElement[0].item;
      expect(item.name).toBe('The Slotted Dance Debate');
      expect(item.creditText).toBe('Ariel Anders');
      expect(item.license).toBe(`${BASE_URL}/about#terms`);
      expect(item.acquireLicensePage).toBe(`${BASE_URL}/about`);
    });

    it('generates ImageObject array for profile story sections', () => {
      const mockSections = [
        {
          id: 'dance-background',
          gallery: [
            {
              src: '/assets/first_comp.jpg',
              alt: 'First competition photo',
              caption: 'First WCS Competition'
            }
          ]
        }
      ];

      const images = generateProfileGallerySchema(mockSections);
      expect(images).toHaveLength(1);
      expect(images[0]['@type']).toBe('ImageObject');
      expect(images[0].caption).toBe('First WCS Competition');
      expect(images[0].creditText).toBe('Ariel Anders');
    });
  });
});
