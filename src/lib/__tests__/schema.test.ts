import { describe, it, expect } from 'vitest';
import { generateMerchSchema, generateGearCatalogSchema } from '@/utils/schema';
import { MERCH_CATALOG_PRODUCTS } from '@/data/products/merch';
import type { Resource } from '@/lib/types/content';

describe('Schema Generation', () => {
  it('should generate valid merch schema with essential fields', () => {
    const merchSchema = generateMerchSchema(MERCH_CATALOG_PRODUCTS);
    const firstMerch = merchSchema.itemListElement[0].item;

    expect(firstMerch.offers.price).toBeDefined();
    expect(firstMerch.offers.priceCurrency).toBe('USD');
    expect(firstMerch.offers.availability).toBe('https://schema.org/InStock');
    expect(firstMerch.offers.shippingDetails).toBeDefined();
    expect(firstMerch.offers.hasMerchantReturnPolicy).toBeDefined();
  });

  it('should generate valid gear schema with basic fields', () => {
    const testGear: Resource = {
      type: 'resource',
      slug: 'test-gear',
      title: 'Test Gear',
      date: '2024-01-01',
      author: 'Ariel Anders, PhD',
      category: 'Gear',
      excerpt: 'A test gear item',
      content: 'Content'
    };
    const gearSchema = generateGearCatalogSchema([testGear]);
    const firstGear = gearSchema.itemListElement[0].item;

    expect(firstGear.name).toBe('Test Gear');
    expect(firstGear.offers.url).toContain('test-gear');
  });
});
