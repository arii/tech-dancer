// tests/unit/schemaGenerator.test.ts
import { describe, it, expect } from 'vitest';
import { buildProductJsonLd, generateBreadcrumbSchema, ProductItem } from '@/lib/schemaGenerator';

describe('buildProductJsonLd', () => {
  it('generates valid Product schema with accurately formatted price offer and brand/policy metadata', () => {
    const mockItem: ProductItem = {
      id: 'norcal-bestcal-tee',
      name: 'NorCal BestCal Golden Gate Unisex Tee',
      description: 'Classic West Coast Swing dance apparel tee.',
      imageUrl: 'https://boomtick.blog/assets/norcal-tee.webp',
      url: 'https://boomtick.blog/merch#norcal-bestcal-tee',
      price: 28.0,
      currency: 'USD',
      inStock: true,
    };

    const schema = buildProductJsonLd(mockItem);

    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('Product');
    expect(schema.name).toBe('NorCal BestCal Golden Gate Unisex Tee');
    expect(schema.brand).toEqual({ '@type': 'Brand', name: 'BoomTick' });
    expect(schema.sku).toBe('norcal-bestcal-tee');
    expect(schema.mpn).toBe('norcal-bestcal-tee');

    expect(schema.offers).toBeDefined();
    expect(schema.offers?.price).toBe('28.00');
    expect(schema.offers?.priceCurrency).toBe('USD');
    expect(schema.offers?.availability).toBe('https://schema.org/InStock');
    expect(schema.offers?.itemCondition).toBe('https://schema.org/NewCondition');
    expect(schema.offers?.shippingDetails).toBeDefined();
    expect(schema.offers?.hasMerchantReturnPolicy).toBeDefined();

    expect(schema.aggregateRating).toBeUndefined();
  });

  it('omits aggregateRating entirely when rating/review metrics are omitted', () => {
    const mockItem: ProductItem = {
      id: 'slot-era-crop',
      name: 'Slot Era Crop Top',
      description: 'WCS apparel crop top.',
      imageUrl: 'https://boomtick.blog/assets/slot-era.webp',
      url: 'https://boomtick.blog/merch#slot-era-crop',
      price: 32.5,
    };

    const schema = buildProductJsonLd(mockItem);

    expect(schema.offers?.price).toBe('32.50');
    expect(schema.aggregateRating).toBeUndefined();
    expect(JSON.stringify(schema)).not.toContain('aggregateRating');
  });

  it('omits offers when price is not provided', () => {
    const mockItem: ProductItem = {
      id: 'event-guide',
      name: 'WCS Event Guide',
      description: 'Free travel guide for WCS events.',
      imageUrl: 'https://boomtick.blog/assets/guide.webp',
      url: 'https://boomtick.blog/posts/event-guide',
    };

    const schema = buildProductJsonLd(mockItem);

    expect(schema.offers).toBeUndefined();
    expect(schema.brand).toEqual({ '@type': 'Brand', name: 'BoomTick' });
    expect(schema.sku).toBe('event-guide');
    expect(schema.mpn).toBe('event-guide');
  });
});

describe('generateBreadcrumbSchema from schemaGenerator', () => {
  it('generates schema.org compliant BreadcrumbList structure when exported via schemaGenerator', () => {
    const schema = generateBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
      { name: 'WCS Essentials', path: '/blog/wcs-essentials' },
    ]);

    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('BreadcrumbList');
    expect(schema.itemListElement).toHaveLength(3);
    expect(schema.itemListElement[0].position).toBe(1);
    expect(schema.itemListElement[1].position).toBe(2);
    expect(schema.itemListElement[2].position).toBe(3);
  });
});
