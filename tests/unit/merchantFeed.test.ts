import { describe, it, expect } from 'vitest';
import { generateGoogleMerchantXml } from '../../scripts/generate-merchant-feed';
import { MERCH_PRODUCTS } from '../../src/data/merch';

describe('Google Merchant Center XML Feed Generator', () => {
  it('generates valid RSS 2.0 XML with Google namespace', () => {
    const xml = generateGoogleMerchantXml();
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">');
    expect(xml).toContain('<channel>');
    expect(xml).toContain('</channel>');
    expect(xml).toContain('</rss>');
  });

  it('includes all merch products in the feed with verified domain links, colors, and sizes', () => {
    const xml = generateGoogleMerchantXml();
    for (const product of MERCH_PRODUCTS) {
      expect(xml).toContain(`<g:id>${product.id}</g:id>`);
      expect(xml).toContain(`<g:price>${product.price} USD</g:price>`);
      expect(xml).toContain(`<link>https://boomtick.blog/gear/${product.gearSlug}</link>`);
      expect(xml).toContain(`<g:color>${product.color}</g:color>`);
      const escapedSize = product.size.replace(/"/g, '&quot;');
      expect(xml).toContain(`<g:size>${escapedSize}</g:size>`);
    }
  });

  it('assigns correct Google product categories for mugs and apparel', () => {
    const xml = generateGoogleMerchantXml();
    // Mug
    expect(xml).toContain('<g:google_product_category>6413</g:google_product_category>');
    // Shirts
    expect(xml).toContain('<g:google_product_category>1604</g:google_product_category>');
  });
});
