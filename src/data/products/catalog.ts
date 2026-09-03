export type ProductSource = 'affiliate' | 'owned-merch';

export type MerchImageDisplayMode =
  | 'front-only'
  | 'back-only'
  | 'both-equal'
  | 'front-prominent'
  | 'back-prominent';

export type MerchImageSide = 'front' | 'back';

export interface MerchProductImage {
  src: string;
  side: MerchImageSide;
  alt: string;
}

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
  gearSlug?: string;
  source: ProductSource;
  title: string;
  description: string;
  imageUrl: string;
  images?: MerchProductImage[];
  imageDisplayMode?: MerchImageDisplayMode;
  href: string;
  price?: string;
  color?: string;
  size?: string;
  material?: string;
  collections: string[];
  tags: string[];
  roles?: ('lead' | 'follow' | 'switch')[];
  eventTags?: string[];
  useCases?: ProductUseCase[];
  disclosure: 'affiliate' | 'owned-printful' | 'none';
}
