export type MerchCollection = 'lead-follow-switch' | 'norcal-bestcal' | 'rainbow-pride';

export interface MerchProduct {
  slug: string;
  title: string;
  description: string;
  priceFrom: string;
  tags: string[];
  collection: MerchCollection;
  image: string;
  alt: string;
  storeUrl: string;
  roles?: Array<'lead' | 'follow' | 'switch'>;
}

export const PRINTFUL_REFERRAL_URL = 'https://www.printful.com/give-5-get-5/GZB6C4';

export const merchProducts: MerchProduct[] = [
  {
    slug: 'lead-follow-switch-unisex-tee',
    title: 'Lead Follow Switch Unisex Tee',
    description: 'Soft everyday tee built for social dancing nights and weekend workshops.',
    priceFrom: '24.99',
    tags: ['West Coast Swing', 'social dance apparel'],
    collection: 'lead-follow-switch',
    image: '/assets/merch/lead-follow-switch-tee.webp',
    alt: 'Lead Follow Switch shirt with role typography for social dance nights',
    storeUrl: 'https://boomtick.printful.me/product/lead-follow-switch-unisex-tee',
    roles: ['lead', 'follow', 'switch'],
  },
];
