
export interface MerchProduct {
  id: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  images?: MerchProductImage[];
  imageDisplayMode?: MerchImageDisplayMode;
  printfulUrl: string;
  collections: string[];
  roles?: ('lead' | 'follow' | 'switch')[];
  tags: string[];
}

import type {
  MerchImageDisplayMode,
  MerchProductImage,
} from '@/data/products/catalog';

export const COLLECTIONS = [
  { id: 'all', label: 'All' },
  { id: 'lead-follow-switch', label: 'Lead/Follow/Switch' },
  { id: 'norcal-bestcal', label: 'NorCal BestCal' },
  { id: 'rainbow-pride', label: 'Rainbow Pride' },
] as const;

export const MERCH_PRODUCTS: MerchProduct[] = [
  {
    id: 'love-neon-follow',
    title: 'LOVE Neon T-Shirt - Ask Me to Follow',
    description:
      'A vibrant neon t-shirt featuring a stylized LOVE design, perfect for follows who want to stand out on the social dance floor.',
    price: '24.50',
    imageUrl:
      'https://cdn.printful.me/t/quick-stores/products/w168/18182963-679-6a0bf5f177de8__360',
    images: [
      {
        src: '/assets/gear/love-neon-tshirt-ask-me-to-follow-front.webp',
        side: 'front',
        alt: 'Front view of LOVE Neon Ask Me to Follow t-shirt',
      },
      {
        src: '/assets/gear/love-neon-tshirt-ask-me-to-follow-back.webp',
        side: 'back',
        alt: 'Back view of LOVE Neon Ask Me to Follow t-shirt',
      },
    ],
    imageDisplayMode: 'back-prominent',
    printfulUrl:
      'https://boomtick.printful.me/product/love-neon-tshirt-ask-me-to-follow',
    collections: ['lead-follow-switch', 'rainbow-pride'],
    roles: ['follow'],
    tags: ['West Coast Swing', 'Follower', 'Neon', 'Pride'],
  },
  {
    id: 'love-neon-lead',
    title: 'LOVE Neon T-Shirt - Ask Me to Lead',
    description:
      'Show off your lead pride with this high-visibility neon tee. Comfortable, breathable, and ready for long nights of social dancing.',
    price: '24.00',
    imageUrl:
      'https://cdn.printful.me/t/quick-stores/products/w168/18182963-679-6a0bf58bde26a__360',
    images: [
      {
        src: '/assets/gear/love-neon-tshirt-ask-me-to-lead-front.webp',
        side: 'front',
        alt: 'Front view of LOVE Neon Ask Me to Lead t-shirt',
      },
      {
        src: '/assets/gear/love-neon-tshirt-ask-me-to-lead-back.webp',
        side: 'back',
        alt: 'Back view of LOVE Neon Ask Me to Lead t-shirt',
      },
    ],
    imageDisplayMode: 'back-prominent',
    printfulUrl:
      'https://boomtick.printful.me/product/love-neon-tshirt-ask-me-to-lead',
    collections: ['lead-follow-switch', 'rainbow-pride'],
    roles: ['lead'],
    tags: ['West Coast Swing', 'Leader', 'Neon', 'Pride'],
  },
  {
    id: 'war-eagle-oversized',
    title: 'War Eagle Oversized High Neck T-Shirt',
    description:
      'Premium oversized high-neck tee featuring the War Eagle design. A staple for NorCal dancers who value both style and comfort.',
    price: '22.00',
    imageUrl:
      'https://cdn.printful.me/t/quick-stores/products/w168/18182963-823-6a0ba0a711254__360',
    images: [
      {
        src: '/assets/gear/war-eagle-oversized-high-neck-t-shirt-front.webp',
        side: 'front',
        alt: 'Front view of War Eagle Oversized T-Shirt',
      },
      {
        src: '/assets/gear/war-eagle-oversized-high-neck-t-shirt-back.webp',
        side: 'back',
        alt: 'Back view of War Eagle Oversized T-Shirt',
      },
    ],
    imageDisplayMode: 'back-prominent',
    printfulUrl:
      'https://boomtick.printful.me/product/war-eagle-oversized-high-neck-t-shirt',
    collections: ['norcal-bestcal'],
    tags: ['NorCal', 'Oversized', 'Dance Apparel', 'Streetwear'],
  },
  {
    id: 'lead-follow-switch-love-neon',
    title: 'Lead Follow or Switch LOVE Shirt in Neon',
    description:
      'The ultimate versatile dance shirt. Neon LOVE design that celebrates the freedom to lead, follow, or switch roles effortlessly.',
    price: '24.00',
    imageUrl:
      'https://cdn.printful.me/t/quick-stores/products/w168/87343-679-6a0b93c3dcf19__360',
    images: [
      {
        src: '/assets/gear/lead-follow-or-switch-love-shirt-in-neon-front.webp',
        side: 'front',
        alt: 'Front view of Lead Follow or Switch LOVE Neon Shirt',
      },
      {
        src: '/assets/gear/lead-follow-or-switch-love-shirt-in-neon-back.webp',
        side: 'back',
        alt: 'Back view of Lead Follow or Switch LOVE Neon Shirt',
      },
    ],
    imageDisplayMode: 'back-prominent',
    printfulUrl:
      'https://boomtick.printful.me/product/lead-follow-or-switch-love-shirt-in-neon',
    collections: ['lead-follow-switch', 'rainbow-pride'],
    roles: ['lead', 'follow', 'switch'],
    tags: ['Gender Neutral', 'Switch Dancer', 'Neon', 'Pride'],
  },
  {
    id: 'mens-bear-tank-norcal',
    title: "Men's Bear Tank NorCal BestCal",
    description:
      'Lightweight and breathable tank top featuring the iconic NorCal BestCal bear. Perfect for high-energy workshops and summer social sets.',
    price: '18.50',
    imageUrl:
      'https://cdn.printful.me/t/quick-stores/products/w168/18182963-537-6a0b755a9a348__360',
    images: [
      {
        src: '/assets/gear/norcal-bear-tank-front.webp',
        side: 'front',
        alt: "Front view of Men's Bear Tank NorCal BestCal",
      },
      {
        src: '/assets/gear/norcal-bear-tank-back.webp',
        side: 'back',
        alt: "Back view of Men's Bear Tank NorCal BestCal",
      },
    ],
    imageDisplayMode: 'front-prominent',
    printfulUrl:
      'https://boomtick.printful.me/product/mens-bear-tank-nor-cal-best-cal',
    collections: ['norcal-bestcal'],
    tags: ['NorCal', 'Tank Top', 'Workshop Wear', 'Summer'],
  },
  {
    id: 'norcal-bestcal-cropped-top',
    title: 'NorCal BestCal Cropped Top',
    description:
      'Stylish and functional cropped top for the NorCal dancer. Designed for maximum range of motion and breathability during intense rounds.',
    price: '20.50',
    imageUrl:
      'https://cdn.printful.me/t/quick-stores/products/w168/18182963-636-6a0b71ea8fae2__360',
    images: [
      {
        src: '/assets/gear/norcal-crop-top-front.webp',
        side: 'front',
        alt: 'Front view of NorCal BestCal Cropped Top',
      },
      {
        src: '/assets/gear/norcal-crop-top-back.webp',
        side: 'back',
        alt: 'Back view of NorCal BestCal Cropped Top',
      },
    ],
    imageDisplayMode: 'front-prominent',
    printfulUrl:
      'https://boomtick.printful.me/product/norcal-best-cal-cropped-top',
    collections: ['norcal-bestcal'],
    tags: ['NorCal', 'Cropped Top', 'Competition Wear', 'Breathable'],
  },
  {
    id: 'norcal-bestcal-golden-gate-hoodie',
    title: 'NorCal BestCal Golden Gate Crop Hoodie',
    description:
      'Cozy yet lightweight crop hoodie featuring the Golden Gate Bridge. Ideal for layering between rounds or staying warm during travel.',
    price: '34.00',
    imageUrl:
      'https://cdn.printful.me/t/quick-stores/products/w168/18182963-317-6a0b6eab9f0f4__360',
    images: [
      {
        src: '/assets/gear/norcal-gate-crop-hoodie.webp',
        side: 'front',
        alt: 'Front view of NorCal BestCal Golden Gate Crop Hoodie',
      },
    ],
    imageDisplayMode: 'single',
    printfulUrl:
      'https://boomtick.printful.me/product/norcal-bestcal-golden-gate-crop-hoodie',
    collections: ['norcal-bestcal'],
    tags: ['NorCal', 'Hoodie', 'Travel', 'Layering'],
  },
  {
    id: 'norcal-bestcal-golden-gate-pride',
    title: 'NorCal BestCal Golden Gate Rainbow Pride Shirt',
    description:
      'Celebrate Pride with the iconic Golden Gate Bridge in rainbow colors. A must-have for the summer dance circuit and Pride month events.',
    price: '23.00',
    imageUrl:
      'https://cdn.printful.me/t/quick-stores/products/w168/18182963-823-6a0b6ad05e8a7__360',
    images: [
      {
        src: '/assets/gear/norcal-bestcal-golden-gate-rainbow-pride-shirt-front.webp',
        side: 'front',
        alt: 'Front view of NorCal BestCal Golden Gate Rainbow Pride Shirt',
      },
      {
        src: '/assets/gear/norcal-bestcal-golden-gate-rainbow-pride-shirt-back.webp',
        side: 'back',
        alt: 'Back view of NorCal BestCal Golden Gate Rainbow Pride Shirt',
      },
    ],
    imageDisplayMode: 'front-prominent',
    printfulUrl:
      'https://boomtick.printful.me/product/norcal-bestcal-golden-gate-rainbow-pride-shirt',
    collections: ['norcal-bestcal', 'rainbow-pride'],
    tags: ['NorCal', 'Pride', 'Golden Gate', 'West Coast Swing'],
  },
  {
    id: 'norcal-bestcal-pride-bear',
    title: 'NorCal BestCal Pride California Bear Apparel',
    description:
      'Classic California bear design with a Pride twist. Show your NorCal roots and your support for the LGBTQ+ dance community.',
    price: '15.50',
    imageUrl:
      'https://cdn.printful.me/t/quick-stores/products/w168/18182963-71-6a0b6a31c4326__360',
    images: [
      {
        src: '/assets/gear/norcal-best-cal-pride-california-bear-apparel-front.webp',
        side: 'front',
        alt: 'Front view of NorCal BestCal Pride Bear Apparel',
      },
      {
        src: '/assets/gear/norcal-best-cal-pride-california-bear-apparel-back.webp',
        side: 'back',
        alt: 'Back view of NorCal BestCal Pride Bear Apparel',
      },
    ],
    imageDisplayMode: 'front-prominent',
    printfulUrl:
      'https://boomtick.printful.me/product/norcal-best-cal-pride-california-bear-apparel',
    collections: ['norcal-bestcal', 'rainbow-pride'],
    tags: ['NorCal', 'Pride', 'California Bear', 'Social Dance'],
  },
  {
    id: 'love-lead-follow-switch-unisex',
    title: 'LOVE Lead Follow or Switch Unisex Shirt',
    description:
      'High-quality unisex t-shirt featuring the Lead/Follow/Switch message. A classic choice for social dancers of all roles and styles.',
    price: '18.64',
    imageUrl:
      'https://cdn.printful.me/t/quick-stores/products/w168/87343-71-6a0b962244279__360',
    images: [
      {
        src: '/assets/gear/unisex-t-shirt-front.webp',
        side: 'front',
        alt: 'Front view of LOVE Lead Follow or Switch Unisex Shirt',
      },
      {
        src: '/assets/gear/unisex-t-shirt-back.webp',
        side: 'back',
        alt: 'Back view of LOVE Lead Follow or Switch Unisex Shirt',
      },
    ],
    imageDisplayMode: 'back-prominent',
    printfulUrl: 'https://boomtick.printful.me/product/unisex-t-shirt',
    collections: ['lead-follow-switch'],
    roles: ['lead', 'follow', 'switch'],
    tags: ['Gender Neutral', 'Unisex', 'Social Dance', 'Classic'],
  },
  {
    id: 'norcal-bestcal-classic',
    title: 'NorCal BestCal Classic Tee',
    description:
      'The signature NorCal BestCal apparel. Clean, classic design that marks you as part of the Northern California dance community.',
    price: '12.00',
    imageUrl:
      'https://cdn.printful.me/t/quick-stores/products/w168/18182963-71-6a07b116ea5ce__360',
    images: [
      {
        src: '/assets/gear/norcal-bestcal-front.webp',
        side: 'front',
        alt: 'Front view of NorCal BestCal Classic Tee',
      },
      {
        src: '/assets/gear/norcal-bestcal-back.webp',
        side: 'back',
        alt: 'Back view of NorCal BestCal Classic Tee',
      },
    ],
    imageDisplayMode: 'front-prominent',
    printfulUrl: 'https://boomtick.printful.me/product/norcal-bestcal',
    collections: ['norcal-bestcal'],
    tags: ['NorCal', 'Classic', 'Team Apparel', 'Essential'],
  },
];
