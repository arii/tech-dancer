import { MERCH_PRODUCTS } from '@/data/merch';
import type { ProductCatalogItem } from '@/data/products/catalog';

export const MERCH_CATALOG_PRODUCTS: ProductCatalogItem[] = MERCH_PRODUCTS.map((item) => ({
  id: item.id,
  source: 'owned-merch',
  title: item.title,
  description: item.description,
  imageUrl: item.imageUrl,
  images: item.images,
  imageDisplayMode: item.imageDisplayMode,
  href: item.printfulUrl,
  price: item.price,
  collections: item.collections,
  collectionId: item.collectionId,
  collectionLabel: item.collectionLabel,
  isBundle: item.isBundle,
  bundleNote: item.bundleNote,
  roles: item.roles,
  tags: item.tags,
  disclosure: 'owned-printful',
}));
