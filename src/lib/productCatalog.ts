import { MERCH_CATALOG_PRODUCTS } from '@/data/products/merch';
import type { ProductCatalogItem } from '@/data/products/catalog';
import { COLLECTIONS } from '@/data/merch';

export function getCollectionUrl(collectionId: string): string {
  const collection = COLLECTIONS.find((c) => c.id === collectionId);
  if (collection?.printfulUrl) {
    return collection.printfulUrl;
  }
  return `/merch?style=${collectionId}`;
}

export function getAllMerchProducts(): ProductCatalogItem[] {
  return MERCH_CATALOG_PRODUCTS;
}

export function getFeaturedMerch(limit = 3): ProductCatalogItem[] {
  return MERCH_CATALOG_PRODUCTS.slice(0, limit);
}

export function getMerchByCollection(collectionId: string): ProductCatalogItem[] {
  if (collectionId === 'all') {
    return MERCH_CATALOG_PRODUCTS;
  }

  return MERCH_CATALOG_PRODUCTS.filter((item) => item.collections.includes(collectionId));
}
