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
  roles: item.roles,
  tags: item.tags,
  disclosure: 'owned-printful',
  isBundle: item.isBundle,
  bundleNote: item.bundleNote,
}));
