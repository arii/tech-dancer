export type ProductSource = 'affiliate' | 'owned-merch';

export type ProductUseCase =
  | 'event-theme'
  | 'travel'
  | 'workshop'
  | 'social-dance'
  | 'competition'
  | 'warmup'
  | 'pride'
  | 'norcal'
  | 'role-shirt';

export interface ProductCatalogItem {
  id: string;
  source: ProductSource;
  title: string;
  description: string;
  imageUrl: string;
  href: string;
  price?: string;
  collections: string[];
  tags: string[];
  roles?: ('lead' | 'follow' | 'switch')[];
  eventTags?: string[];
  useCases?: ProductUseCase[];
  disclosure: 'affiliate' | 'owned-printful' | 'none';
}
