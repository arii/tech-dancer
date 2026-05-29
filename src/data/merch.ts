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
      { src: gearImage('love-neon-tshirt-ask-me-to-follow-front.webp'), side: 'front', alt: 'Front view of Ask Me to Follow neon tee' },
      { src: gearImage('love-neon-tshirt-ask-me-to-follow-back.webp'), side: 'back', alt: 'Back view of Ask Me to Follow neon tee with follow message' },
    ],
    imageDisplayMode: 'back-prominent',
    printfulUrl: 'https://boomtick.printful.me/product/love-neon-tshirt-ask-me-to-follow',
    collections: ['role-pride', 'pride'],
    roles: ['follow'],
    tags: ['West Coast Swing', 'Follower', 'Neon', 'Pride'],
  },
  {
    id: 'norcal-bestcal-pride-bear',
    title: 'NorCal BestCal Pride Bear Tee',
    description: 'Classic California bear design with a Pride twist. Show your NorCal roots and support for the LGBTQ+ dance community.',
    price: '15.50',
    imageUrl: gearImage('norcal-best-cal-pride-california-bear-apparel-front.webp'),
    images: [
      { src: gearImage('norcal-best-cal-pride-california-bear-apparel-front.webp'), side: 'front', alt: 'Front view of NorCal BestCal Pride Bear tee' },
      { src: gearImage('norcal-best-cal-pride-california-bear-apparel-back.webp'), side: 'back', alt: 'Back view of NorCal BestCal Pride Bear tee' },
    ],
    imageDisplayMode: 'front-prominent',
    printfulUrl: 'https://boomtick.printful.me/product/norcal-best-cal-pride-california-bear-apparel',
    collections: ['norcal', 'pride'],
    tags: ['NorCal', 'Pride', 'California Bear', 'Social Dance'],
  },
  {
    id: 'love-neon-lead',
    title: 'Ask Me to Lead Neon Tee',
    description: 'High-visibility neon tee for leaders. Comfortable, breathable, and ready for long nights of social dancing.',
    price: '24.00',
    imageUrl: gearImage('love-neon-tshirt-ask-me-to-lead-back.webp'),
    images: [
      { src: gearImage('love-neon-tshirt-ask-me-to-lead-front.webp'), side: 'front', alt: 'Front view of Ask Me to Lead neon tee' },
      { src: gearImage('love-neon-tshirt-ask-me-to-lead-back.webp'), side: 'back', alt: 'Back view of Ask Me to Lead neon tee with lead message' },
    ],
    imageDisplayMode: 'back-prominent',
    printfulUrl: 'https://boomtick.printful.me/product/love-neon-tshirt-ask-me-to-lead',
    collections: ['role-pride', 'pride'],
    roles: ['lead'],
    tags: ['West Coast Swing', 'Leader', 'Neon', 'Pride'],
  },
  {
    id: 'lead-follow-switch-love-neon',
    title: 'Lead / Follow / Switch Neon Tee',
    description: 'For dancers who lead, follow, switch, and refuse to make the dance floor boring.',
    price: '24.00',
    imageUrl: gearImage('lead-follow-or-switch-love-shirt-in-neon-back.webp'),
    images: [
      { src: gearImage('lead-follow-or-switch-love-shirt-in-neon-front.webp'), side: 'front', alt: 'Front view of Lead / Follow / Switch neon tee' },
      { src: gearImage('lead-follow-or-switch-love-shirt-in-neon-back.webp'), side: 'back', alt: 'Back view of Lead / Follow / Switch neon tee with role checklist' },
    ],
    imageDisplayMode: 'back-prominent',
    printfulUrl: 'https://boomtick.printful.me/product/lead-follow-or-switch-love-shirt-in-neon',
    collections: ['role-pride', 'pride'],
    roles: ['lead', 'follow', 'switch'],
    tags: ['Gender Neutral', 'Switch Dancer', 'Neon', 'Pride'],
  },
  {
    id: 'norcal-bestcal-golden-gate-pride',
    title: 'Golden Gate Rainbow Pride Tee',
    description: 'Celebrate Pride with the iconic Golden Gate Bridge in rainbow colors. A must-have for the summer dance circuit.',
    price: '23.00',
    imageUrl: gearImage('norcal-bestcal-golden-gate-rainbow-pride-shirt-front.webp'),
    images: [
      { src: gearImage('norcal-bestcal-golden-gate-rainbow-pride-shirt-front.webp'), side: 'front', alt: 'Front view of Golden Gate Rainbow Pride tee' },
      { src: gearImage('norcal-bestcal-golden-gate-rainbow-pride-shirt-back.webp'), side: 'back', alt: 'Back view of Golden Gate Rainbow Pride tee' },
    ],
    imageDisplayMode: 'front-prominent',
    printfulUrl: 'https://boomtick.printful.me/product/norcal-bestcal-golden-gate-rainbow-pride-shirt',
    collections: ['norcal', 'pride'],
    tags: ['NorCal', 'Pride', 'Golden Gate', 'West Coast Swing'],
  },
  {
    id: 'war-eagle-oversized',
    title: 'War Eagle Oversized Tee',
    description: 'Premium oversized high-neck tee. A staple for NorCal dancers who value both style and comfort.',
    price: '22.00',
    imageUrl: gearImage('war-eagle-oversized-high-neck-t-shirt-front.webp'),
    images: [
      { src: gearImage('war-eagle-oversized-high-neck-t-shirt-front.webp'), side: 'front', alt: 'Front view of War Eagle oversized tee' },
      { src: gearImage('war-eagle-oversized-high-neck-t-shirt-back.webp'), side: 'back', alt: 'Back view of War Eagle oversized tee' },
    ],
    imageDisplayMode: 'both-equal',
    printfulUrl: 'https://boomtick.printful.me/product/war-eagle-oversized-high-neck-t-shirt',
    collections: ['norcal'],
    tags: ['NorCal', 'Oversized', 'Dance Apparel', 'Streetwear'],
  },
  {
    id: 'mens-bear-tank-norcal',
    title: "NorCal BestCal Bear Tank",
    description: 'Lightweight and breathable tank top. Perfect for high-energy workshops and summer social sets.',
    price: '18.50',
    imageUrl: gearImage('norcal-bear-tank-front.webp'),
    images: [
      { src: gearImage('norcal-bear-tank-front.webp'), side: 'front', alt: "Front view of NorCal BestCal Bear tank" },
      { src: gearImage('norcal-bear-tank-back.webp'), side: 'back', alt: "Back view of NorCal BestCal Bear tank" },
    ],
    imageDisplayMode: 'front-prominent',
    printfulUrl: 'https://boomtick.printful.me/product/mens-bear-tank-nor-cal-best-cal',
    collections: ['norcal'],
    tags: ['NorCal', 'Tank Top', 'Workshop Wear', 'Summer'],
  },
  {
    id: 'norcal-bestcal-cropped-top',
    title: 'NorCal BestCal Cropped Top',
    description: 'Stylish and functional. Designed for maximum range of motion and breathability during intense rounds.',
    price: '20.50',
    imageUrl: gearImage('norcal-crop-top-front.webp'),
    images: [
      { src: gearImage('norcal-crop-top-front.webp'), side: 'front', alt: 'Front view of NorCal BestCal cropped top' },
      { src: gearImage('norcal-crop-top-back.webp'), side: 'back', alt: 'Back view of NorCal BestCal cropped top' },
    ],
    imageDisplayMode: 'front-prominent',
    printfulUrl: 'https://boomtick.printful.me/product/norcal-best-cal-cropped-top',
    collections: ['norcal'],
    tags: ['NorCal', 'Cropped Top', 'Competition Wear', 'Breathable'],
  },
  {
    id: 'norcal-bestcal-golden-gate-hoodie',
    title: 'Golden Gate Crop Hoodie',
    description: 'Cozy yet lightweight crop hoodie. Ideal for layering between rounds or staying warm during travel.',
    price: '34.00',
    imageUrl: gearImage('norcal-gate-crop-hoodie.webp'),
    images: [
      { src: gearImage('norcal-gate-crop-hoodie.webp'), side: 'front', alt: 'Front view of Golden Gate crop hoodie' },
    ],
    imageDisplayMode: 'single',
    printfulUrl: 'https://boomtick.printful.me/product/norcal-bestcal-golden-gate-crop-hoodie',
    collections: ['norcal'],
    tags: ['NorCal', 'Hoodie', 'Travel', 'Layering'],
  },
  {
    id: 'love-lead-follow-switch-unisex',
    title: 'LOVE Role Checklist Tee',
    description: 'A simple role-fluid tee for classes, comps, late-night socials, and Pride weekends.',
    price: '18.64',
    imageUrl: gearImage('unisex-t-shirt-back.webp'),
    images: [
      { src: gearImage('unisex-t-shirt-front.webp'), side: 'front', alt: 'Front view of LOVE Role Checklist tee' },
      { src: gearImage('unisex-t-shirt-back.webp'), side: 'back', alt: 'Back view of LOVE Role Checklist tee with role checklist' },
    ],
    imageDisplayMode: 'back-prominent',
    printfulUrl: 'https://boomtick.printful.me/product/unisex-t-shirt',
    collections: ['role-pride'],
    roles: ['lead', 'follow', 'switch'],
    tags: ['Gender Neutral', 'Unisex', 'Social Dance', 'Classic'],
  },
  {
    id: 'norcal-bestcal-classic',
    title: 'NorCal BestCal Classic Tee',
    description: 'The signature NorCal BestCal apparel. Clean, classic design that marks you as part of the community.',
    price: '12.00',
    imageUrl: gearImage('norcal-bestcal-front.webp'),
    images: [
      { src: gearImage('norcal-bestcal-front.webp'), side: 'front', alt: 'Front view of NorCal BestCal classic tee' },
      { src: gearImage('norcal-bestcal-back.webp'), side: 'back', alt: 'Back view of NorCal BestCal classic tee' },
    ],
    imageDisplayMode: 'front-prominent',
    printfulUrl: 'https://boomtick.printful.me/product/norcal-bestcal',
    collections: ['norcal'],
    tags: ['NorCal', 'Classic', 'Team Apparel', 'Essential'],
  },
];
