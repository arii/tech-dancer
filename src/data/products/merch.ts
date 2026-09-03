import { MERCH_PRODUCTS } from '@/data/merch';
import type { ProductCatalogItem } from '@/data/products/catalog';

export const MERCH_CATALOG_PRODUCTS: ProductCatalogItem[] = MERCH_PRODUCTS.map((item) => ({
  id: item.id,
  gearSlug: item.gearSlug,
  source: 'owned-merch',
  title: item.title,
  description: item.description,
  imageUrl: item.imageUrl,
  images: item.images,
  imageDisplayMode: item.imageDisplayMode,
  href: item.printfulUrl,
  price: item.price,
  color: item.color,
  size: item.size,
  material: item.material,
  collections: item.collections,
  roles: item.roles,
  tags: item.tags,
  disclosure: 'owned-printful',
}));
