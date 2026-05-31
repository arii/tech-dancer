import type { MerchImageDisplayMode, MerchProductImage } from '@/data/products/catalog';

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

export const COLLECTIONS = [
  { id: 'all', label: 'All' },
  { id: 'lead-follow-switch', label: 'Lead/Follow/Switch' },
  { id: 'norcal-bestcal', label: 'NorCal BestCal' },
  { id: 'rainbow-pride', label: 'Rainbow Pride' },
] as const;

const gearImage = (fileName: string) => `/assets/gear/${fileName}`;

export const MERCH_PRODUCTS: MerchProduct[] = [
  {
    id: 'love-neon-follow',
    title: 'LOVE Neon T-Shirt - Ask Me to Follow',
    description: 'A vibrant neon t-shirt featuring a stylized LOVE design on the front and a Follow checklist on the back. Perfect for follows who want to stand out on the social dance floor.',
    price: '24.50',
    imageUrl: '/assets/merch/previews/shirt_back_follow_preview.png',
    images: [
      { src: '/assets/merch/previews/shirt_front_preview.png', side: 'front', alt: 'Front view of LOVE Neon Ask Me to Follow t-shirt' },
      { src: '/assets/merch/previews/shirt_back_follow_preview.png', side: 'back', alt: 'Back view of LOVE Neon Ask Me to Follow t-shirt with follow role checked' },
    ],
    imageDisplayMode: 'both-equal',
    printfulUrl: 'https://boomtick.printful.me/product/love-neon-tshirt-ask-me-to-follow',
    collections: ['lead-follow-switch', 'rainbow-pride'],
    roles: ['follow'],
    tags: ['West Coast Swing', 'Follower', 'Neon', 'Pride'],
  },
  {
    id: 'love-neon-lead',
    title: 'LOVE Neon T-Shirt - Ask Me to Lead',
    description: 'Show off your lead pride with this high-visibility neon tee. Features the LOVE design on the front and a Lead checklist on the back.',
    price: '24.00',
    imageUrl: '/assets/merch/previews/shirt_back_lead_preview.png',
    images: [
      { src: '/assets/merch/previews/shirt_front_preview.png', side: 'front', alt: 'Front view of LOVE Neon Ask Me to Lead t-shirt' },
      { src: '/assets/merch/previews/shirt_back_lead_preview.png', side: 'back', alt: 'Back view of LOVE Neon Ask Me to Lead t-shirt with lead role checked' },
    ],
    imageDisplayMode: 'both-equal',
    printfulUrl: 'https://boomtick.printful.me/product/love-neon-tshirt-ask-me-to-lead',
    collections: ['lead-follow-switch', 'rainbow-pride'],
    roles: ['lead'],
    tags: ['West Coast Swing', 'Leader', 'Neon', 'Pride'],
  },
  {
    id: 'lead-follow-switch-love-neon',
    title: 'Lead Follow or Switch LOVE Shirt in Neon',
    description: 'The ultimate versatile dance shirt. Neon LOVE design that celebrates the freedom to lead, follow, or switch roles effortlessly with a full role checklist on the back.',
    price: '24.00',
    imageUrl: '/assets/merch/previews/shirt_back_all_preview.png',
    images: [
      { src: '/assets/merch/previews/shirt_front_preview.png', side: 'front', alt: 'Front view of Lead Follow or Switch LOVE Shirt in Neon' },
      { src: '/assets/merch/previews/shirt_back_all_preview.png', side: 'back', alt: 'Back view of Lead Follow or Switch LOVE Shirt in Neon with role checklist' },
    ],
    imageDisplayMode: 'both-equal',
    printfulUrl: 'https://boomtick.printful.me/product/lead-follow-or-switch-love-shirt-in-neon',
    collections: ['lead-follow-switch', 'rainbow-pride'],
    roles: ['lead', 'follow', 'switch'],
    tags: ['Gender Neutral', 'Switch Dancer', 'Neon', 'Pride'],
  },
  {
    id: 'war-eagle-oversized',
    title: 'War Eagle Oversized High Neck T-Shirt',
    description: 'Premium oversized high-neck tee featuring the War Eagle design. A staple for NorCal dancers who value both style and comfort.',
    price: '22.00',
    imageUrl: gearImage('war-eagle-oversized-high-neck-t-shirt-front.webp'),
    images: [
      { src: gearImage('war-eagle-oversized-high-neck-t-shirt-front.webp'), side: 'front', alt: 'Front view of War Eagle oversized high neck t-shirt' },
      { src: gearImage('war-eagle-oversized-high-neck-t-shirt-back.webp'), side: 'back', alt: 'Back view of War Eagle oversized high neck t-shirt' },
    ],
    imageDisplayMode: 'both-equal',
    printfulUrl: 'https://boomtick.printful.me/product/war-eagle-oversized-high-neck-t-shirt',
    collections: ['norcal-bestcal'],
    tags: ['NorCal', 'Oversized', 'Dance Apparel', 'Streetwear'],
  },
  {
    id: 'mens-bear-tank-norcal',
    title: "Men's Bear Tank NorCal BestCal",
    description: 'Lightweight and breathable tank top featuring the iconic NorCal BestCal bear. Perfect for high-energy workshops and summer social sets.',
    price: '18.50',
    imageUrl: gearImage('norcal-bear-tank-front.webp'),
    images: [
      { src: gearImage('norcal-bear-tank-front.webp'), side: 'front', alt: "Front view of Men's Bear Tank NorCal BestCal" },
      { src: gearImage('norcal-bear-tank-back.webp'), side: 'back', alt: "Back view of Men's Bear Tank NorCal BestCal" },
    ],
    imageDisplayMode: 'front-prominent',
    printfulUrl: 'https://boomtick.printful.me/product/mens-bear-tank-nor-cal-best-cal',
    collections: ['norcal-bestcal'],
    tags: ['NorCal', 'Tank Top', 'Workshop Wear', 'Summer'],
  },
  {
    id: 'norcal-bestcal-cropped-top',
    title: 'NorCal BestCal Cropped Top',
    description: 'Stylish and functional cropped top for the NorCal dancer. Designed for maximum range of motion and breathability during intense rounds.',
    price: '20.50',
    imageUrl: gearImage('norcal-crop-top-front.webp'),
    images: [
      { src: gearImage('norcal-crop-top-front.webp'), side: 'front', alt: 'Front view of NorCal BestCal Cropped Top' },
      { src: gearImage('norcal-crop-top-back.webp'), side: 'back', alt: 'Back view of NorCal BestCal Cropped Top' },
    ],
    imageDisplayMode: 'front-prominent',
    printfulUrl: 'https://boomtick.printful.me/product/norcal-best-cal-cropped-top',
    collections: ['norcal-bestcal'],
    tags: ['NorCal', 'Cropped Top', 'Competition Wear', 'Breathable'],
  },
  {
    id: 'norcal-bestcal-golden-gate-hoodie',
    title: 'NorCal BestCal Golden Gate Crop Hoodie',
    description: 'Cozy yet lightweight crop hoodie featuring the Golden Gate Bridge. Ideal for layering between rounds or staying warm during travel.',
    price: '34.00',
    imageUrl: gearImage('norcal-gate-crop-hoodie.webp'),
    images: [
      { src: gearImage('norcal-gate-crop-hoodie.webp'), side: 'front', alt: 'Front view of NorCal BestCal Golden Gate crop hoodie' },
    ],
    imageDisplayMode: 'single',
    printfulUrl: 'https://boomtick.printful.me/product/norcal-bestcal-golden-gate-crop-hoodie',
    collections: ['norcal-bestcal'],
    tags: ['NorCal', 'Hoodie', 'Travel', 'Layering'],
  },
  {
    id: 'norcal-bestcal-golden-gate-pride',
    title: 'NorCal BestCal Golden Gate Rainbow Pride Shirt',
    description: 'Celebrate Pride with the iconic Golden Gate Bridge in rainbow colors. A must-have for the summer dance circuit and Pride month events.',
    price: '23.00',
    imageUrl: gearImage('norcal-bestcal-golden-gate-rainbow-pride-shirt-front.webp'),
    images: [
      { src: gearImage('norcal-bestcal-golden-gate-rainbow-pride-shirt-front.webp'), side: 'front', alt: 'Front view of NorCal BestCal Golden Gate Rainbow Pride Shirt' },
      { src: gearImage('norcal-bestcal-golden-gate-rainbow-pride-shirt-back.webp'), side: 'back', alt: 'Back view of NorCal BestCal Golden Gate Rainbow Pride Shirt' },
    ],
    imageDisplayMode: 'front-prominent',
    printfulUrl: 'https://boomtick.printful.me/product/norcal-bestcal-golden-gate-rainbow-pride-shirt',
    collections: ['norcal-bestcal', 'rainbow-pride'],
    tags: ['NorCal', 'Pride', 'Golden Gate', 'West Coast Swing'],
  },
  {
    id: 'norcal-bestcal-pride-bear',
    title: 'NorCal BestCal Pride California Bear Apparel',
    description: 'Classic California bear design with a Pride twist. Show your NorCal roots and your support for the LGBTQ+ dance community.',
    price: '15.50',
    imageUrl: gearImage('norcal-best-cal-pride-california-bear-apparel-front.webp'),
    images: [
      { src: gearImage('norcal-best-cal-pride-california-bear-apparel-front.webp'), side: 'front', alt: 'Front view of NorCal BestCal Pride California Bear apparel' },
      { src: gearImage('norcal-best-cal-pride-california-bear-apparel-back.webp'), side: 'back', alt: 'Back view of NorCal BestCal Pride California Bear apparel' },
    ],
    imageDisplayMode: 'front-prominent',
    printfulUrl: 'https://boomtick.printful.me/product/norcal-best-cal-pride-california-bear-apparel',
    collections: ['norcal-bestcal', 'rainbow-pride'],
    tags: ['NorCal', 'Pride', 'California Bear', 'Social Dance'],
  },
  {
    id: 'love-lead-follow-switch-unisex',
    title: 'LOVE Lead Follow or Switch Unisex Shirt',
    description: 'High-quality unisex t-shirt featuring the Lead/Follow/Switch message. A classic choice for social dancers of all roles and styles.',
    price: '18.64',
    imageUrl: gearImage('unisex-t-shirt-back.webp'),
    images: [
      { src: gearImage('unisex-t-shirt-front.webp'), side: 'front', alt: 'Front view of LOVE Lead Follow or Switch Unisex Shirt' },
      { src: gearImage('unisex-t-shirt-back.webp'), side: 'back', alt: 'Back view of LOVE Lead Follow or Switch Unisex Shirt with role checklist' },
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
    description: 'The signature NorCal BestCal apparel. Clean, classic design that marks you as part of the Northern California dance community.',
    price: '12.00',
    imageUrl: gearImage('norcal-bestcal-front.webp'),
    images: [
      { src: gearImage('norcal-bestcal-front.webp'), side: 'front', alt: 'Front view of NorCal BestCal Classic Tee' },
      { src: gearImage('norcal-bestcal-back.webp'), side: 'back', alt: 'Back view of NorCal BestCal Classic Tee' },
    ],
    imageDisplayMode: 'front-prominent',
    printfulUrl: 'https://boomtick.printful.me/product/norcal-bestcal',
    collections: ['norcal-bestcal'],
    tags: ['NorCal', 'Classic', 'Team Apparel', 'Essential'],
  },
];
