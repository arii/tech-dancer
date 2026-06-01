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
  { id: 'role-pride', label: 'Role Pride' },
  { id: 'norcal', label: 'NorCal' },
  { id: 'pride', label: 'Pride' },
] as const;

const gearImage = (fileName: string) => `/assets/gear/${fileName}`;

export const MERCH_PRODUCTS: MerchProduct[] = [
  {
    id: 'love-neon-follow',
    title: 'Ask Me to Follow Neon Tee',
    description: 'A bright social-dance tee for followers who want the message visible from across the room.',
    price: '24.50',
    imageUrl: gearImage('love-neon-tshirt-ask-me-to-follow-back.webp'),
    images: [
      { src: gearImage('love-neon-tshirt-ask-me-to-follow-front.webp'), side: 'front', alt: 'Front view of Ask Me to Follow Neon Tee' },
      { src: gearImage('love-neon-tshirt-ask-me-to-follow-back.webp'), side: 'back', alt: 'Back view of Ask Me to Follow Neon Tee' },
    ],
    imageDisplayMode: 'back-prominent',
    printfulUrl: 'https://boomtick.printful.me/product/love-neon-tshirt-ask-me-to-follow',
    collections: ['role-pride', 'pride'],
    roles: ['follow'],
    tags: ['West Coast Swing', 'Follower', 'Neon'],
  },
  {
    id: 'norcal-bestcal-pride-bear',
    title: 'NorCal BestCal Pride Tee',
    description: 'Classic California bear design with a Pride twist to show your NorCal roots.',
    price: '15.50',
    imageUrl: gearImage('norcal-best-cal-pride-california-bear-apparel-front.webp'),
    images: [
      { src: gearImage('norcal-best-cal-pride-california-bear-apparel-front.webp'), side: 'front', alt: 'Front view of NorCal BestCal Pride Tee' },
      { src: gearImage('norcal-best-cal-pride-california-bear-apparel-back.webp'), side: 'back', alt: 'Back view of NorCal BestCal Pride Tee' },
    ],
    imageDisplayMode: 'front-prominent',
    printfulUrl: 'https://boomtick.printful.me/product/norcal-best-cal-pride-california-bear-apparel',
    collections: ['norcal', 'pride'],
    tags: ['NorCal', 'Pride', 'California Bear'],
  },
  {
    id: 'love-neon-lead',
    title: 'Ask Me to Lead Neon Tee',
    description: 'A high-visibility tee for leaders who want to be seen from across the room.',
    price: '24.00',
    imageUrl: gearImage('love-neon-tshirt-ask-me-to-lead-back.webp'),
    images: [
      { src: gearImage('love-neon-tshirt-ask-me-to-lead-front.webp'), side: 'front', alt: 'Front view of Ask Me to Lead Neon Tee' },
      { src: gearImage('love-neon-tshirt-ask-me-to-lead-back.webp'), side: 'back', alt: 'Back view of Ask Me to Lead Neon Tee' },
    ],
    imageDisplayMode: 'back-prominent',
    printfulUrl: 'https://boomtick.printful.me/product/love-neon-tshirt-ask-me-to-lead',
    collections: ['role-pride', 'pride'],
    roles: ['lead'],
    tags: ['West Coast Swing', 'Leader', 'Neon'],
  },
  {
    id: 'lead-follow-switch-love-neon',
    title: 'Lead / Follow / Switch Neon Tee',
    description: 'A versatile role tee for dancers who lead, follow, switch, or just love the floor.',
    price: '24.00',
    imageUrl: gearImage('lead-follow-or-switch-love-shirt-in-neon-back.webp'),
    images: [
      { src: gearImage('lead-follow-or-switch-love-shirt-in-neon-front.webp'), side: 'front', alt: 'Front view of Lead / Follow / Switch Neon Tee' },
      { src: gearImage('lead-follow-or-switch-love-shirt-in-neon-back.webp'), side: 'back', alt: 'Back view of Lead / Follow / Switch Neon Tee' },
    ],
    imageDisplayMode: 'back-prominent',
    printfulUrl: 'https://boomtick.printful.me/product/lead-follow-or-switch-love-shirt-in-neon',
    collections: ['role-pride', 'pride'],
    roles: ['lead', 'follow', 'switch'],
    tags: ['Gender Neutral', 'Neon', 'Pride'],
  },
  {
    id: 'love-role-checklist',
    title: 'LOVE Role Checklist Tee',
    description: 'A simple role-fluid tee for classes, comps, and late-night social dancing.',
    price: '18.64',
    imageUrl: gearImage('unisex-t-shirt-back.webp'),
    images: [
      { src: gearImage('unisex-t-shirt-front.webp'), side: 'front', alt: 'Front view of LOVE Role Checklist Tee' },
      { src: gearImage('unisex-t-shirt-back.webp'), side: 'back', alt: 'Back view of LOVE Role Checklist Tee' },
    ],
    imageDisplayMode: 'back-prominent',
    printfulUrl: 'https://boomtick.printful.me/product/unisex-t-shirt',
    collections: ['role-pride'],
    roles: ['lead', 'follow', 'switch'],
    tags: ['West Coast Swing', 'Gender Neutral', 'Classic'],
  },
  {
    id: 'war-eagle-oversized',
    title: 'War Eagle Oversized Tee',
    description: 'A relaxed NorCal tee with the War Eagle design for casual social dance style.',
    price: '22.00',
    imageUrl: gearImage('war-eagle-oversized-high-neck-t-shirt-front.webp'),
    images: [
      { src: gearImage('war-eagle-oversized-high-neck-t-shirt-front.webp'), side: 'front', alt: 'Front view of War Eagle Oversized Tee' },
      { src: gearImage('war-eagle-oversized-high-neck-t-shirt-back.webp'), side: 'back', alt: 'Back view of War Eagle Oversized Tee' },
    ],
    imageDisplayMode: 'both-equal',
    printfulUrl: 'https://boomtick.printful.me/product/war-eagle-oversized-high-neck-t-shirt',
    collections: ['norcal'],
    tags: ['NorCal', 'Oversized', 'Streetwear'],
  },
  {
    id: 'mens-bear-tank-norcal',
    title: 'NorCal BestCal Bear Tank',
    description: 'Lightweight and breathable tank top featuring the iconic NorCal BestCal bear.',
    price: '18.50',
    imageUrl: gearImage('norcal-bear-tank-front.webp'),
    images: [
      { src: gearImage('norcal-bear-tank-front.webp'), side: 'front', alt: 'Front view of NorCal BestCal Bear Tank' },
      { src: gearImage('norcal-bear-tank-back.webp'), side: 'back', alt: 'Back view of NorCal BestCal Bear Tank' },
    ],
    imageDisplayMode: 'front-prominent',
    printfulUrl: 'https://boomtick.printful.me/product/mens-bear-tank-nor-cal-best-cal',
    collections: ['norcal'],
    tags: ['NorCal', 'Tank Top', 'Workshop Wear'],
  },
  {
    id: 'norcal-bestcal-cropped-top',
    title: 'NorCal BestCal Cropped Tee',
    description: 'Stylish and functional cropped tee designed for maximum range of motion.',
    price: '20.50',
    imageUrl: gearImage('norcal-crop-top-front.webp'),
    images: [
      { src: gearImage('norcal-crop-top-front.webp'), side: 'front', alt: 'Front view of NorCal BestCal Cropped Tee' },
      { src: gearImage('norcal-crop-top-back.webp'), side: 'back', alt: 'Back view of NorCal BestCal Cropped Tee' },
    ],
    imageDisplayMode: 'front-prominent',
    printfulUrl: 'https://boomtick.printful.me/product/norcal-best-cal-cropped-top',
    collections: ['norcal'],
    tags: ['NorCal', 'Cropped Tee', 'Competition Wear'],
  },
  {
    id: 'norcal-bestcal-golden-gate-hoodie',
    title: 'Golden Gate Crop Hoodie',
    description: 'Cozy yet lightweight crop hoodie featuring the Golden Gate Bridge.',
    price: '34.00',
    imageUrl: gearImage('norcal-gate-crop-hoodie.webp'),
    images: [
      { src: gearImage('norcal-gate-crop-hoodie.webp'), side: 'front', alt: 'Front view of Golden Gate Crop Hoodie' },
    ],
    imageDisplayMode: 'front-only',
    printfulUrl: 'https://boomtick.printful.me/product/norcal-bestcal-golden-gate-crop-hoodie',
    collections: ['norcal'],
    tags: ['NorCal', 'Hoodie', 'Travel'],
  },
  {
    id: 'norcal-bestcal-golden-gate-pride',
    title: 'Golden Gate Rainbow Pride Tee',
    description: 'Celebrate Pride with the iconic Golden Gate Bridge in rainbow colors.',
    price: '23.00',
    imageUrl: gearImage('norcal-bestcal-golden-gate-rainbow-pride-shirt-front.webp'),
    images: [
      { src: gearImage('norcal-bestcal-golden-gate-rainbow-pride-shirt-front.webp'), side: 'front', alt: 'Front view of Golden Gate Rainbow Pride Tee' },
      { src: gearImage('norcal-bestcal-golden-gate-rainbow-pride-shirt-back.webp'), side: 'back', alt: 'Back view of Golden Gate Rainbow Pride Tee' },
    ],
    imageDisplayMode: 'front-prominent',
    printfulUrl: 'https://boomtick.printful.me/product/norcal-bestcal-golden-gate-rainbow-pride-shirt',
    collections: ['norcal', 'pride'],
    tags: ['NorCal', 'Pride', 'Golden Gate'],
  },
  {
    id: 'norcal-bestcal-classic',
    title: 'NorCal BestCal Classic Tee',
    description: 'Clean, classic design that marks you as part of the Northern California dance community.',
    price: '12.00',
    imageUrl: gearImage('norcal-bestcal-front.webp'),
    images: [
      { src: gearImage('norcal-bestcal-front.webp'), side: 'front', alt: 'Front view of NorCal BestCal Classic Tee' },
      { src: gearImage('norcal-bestcal-back.webp'), side: 'back', alt: 'Back view of NorCal BestCal Classic Tee' },
    ],
    imageDisplayMode: 'front-prominent',
    printfulUrl: 'https://boomtick.printful.me/product/norcal-bestcal',
    collections: ['norcal'],
    tags: ['NorCal', 'Classic', 'Essential'],
  },
];
