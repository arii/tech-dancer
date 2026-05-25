import { describe, expect, it } from 'vitest';
import { getAllMerchProducts, getFeaturedMerch, getMerchByCollection } from '@/lib/productCatalog';

describe('productCatalog', () => {
  it('returns featured merch capped to requested limit', () => {
    const featured = getFeaturedMerch(3);
    expect(featured).toHaveLength(3);
  });

  it('returns all merch for all collection filter', () => {
    expect(getMerchByCollection('all')).toEqual(getAllMerchProducts());
  });
});
