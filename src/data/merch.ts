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
    title: 'LOVE Neon Tee — Ask Me to Follow',
    description: 'A bright role-pride tee for followers who want the message visible on the West Coast Swing social floor. Built for partner dance weekends, rainbow pride sets, and NorCal dance friends.',
    price: '24.50',
    imageUrl: gearImage('love-neon-tshirt-ask-me-to-follow-back.webp'),
    images: [
      { src: gearImage('love-neon-tshirt-ask-me-to-follow-front.webp'), side: 'front', alt: 'Front view of LOVE Neon Ask Me to Follow t-shirt' },
      { src: gearImage('love-neon-tshirt-ask-me-to-follow-back.webp'), side: 'back', alt: 'Back view of LOVE Neon Ask Me to Follow t-shirt with follow message' },
    ],
    imageDisplayMode: 'back-prominent',
    printfulUrl: 'https://boomtick.printful.me/product/love-neon-tshirt-ask-me-to-follow',
    collections: ['lead-follow-switch', 'rainbow-pride'],
    roles: ['follow'],
    tags: ['West Coast Swing', 'Follower', 'Neon', 'Pride'],
  },
  {
    id: 'love-neon-lead',
    title: 'LOVE Neon Tee — Ask Me to Lead',
    description: 'A high-visibility lead-pride tee for West Coast Swing dancers who want the ask-me-to-lead message readable at socials, workshops, and dance weekend mixers.',
    price: '24.00',
    imageUrl: gearImage('love-neon-tshirt-ask-me-to-lead-back.webp'),
    images: [
      { src: gearImage('love-neon-tshirt-ask-me-to-lead-front.webp'), side: 'front', alt: 'Front view of LOVE Neon Ask Me to Lead t-shirt' },
      { src: gearImage('love-neon-tshirt-ask-me-to-lead-back.webp'), side: 'back', alt: 'Back view of LOVE Neon Ask Me to Lead t-shirt with lead message' },
    ],
    imageDisplayMode: 'back-prominent',
    printfulUrl: 'https://boomtick.printful.me/product/love-neon-tshirt-ask-me-to-lead',
    collections: ['lead-follow-switch', 'rainbow-pride'],
    roles: ['lead'],
    tags: ['West Coast Swing', 'Leader', 'Neon', 'Pride'],
  },
  {
    id: 'war-eagle-oversized',
    title: 'War Eagle Oversized High-Neck Tee',
    description: 'An oversized partner dance tee with front-and-back War Eagle artwork for NorCal dancers who want a relaxed social dance shirt with streetwear energy.',
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
    id: 'lead-follow-switch-love-neon',
    title: 'Lead / Follow / Switch LOVE Tee',
    description: 'A gender-neutral dance role tee for West Coast Swing dancers who lead, follow, switch, or do all three. The back checklist keeps the social-floor message clear.',
    price: '24.00',
    imageUrl: gearImage('lead-follow-or-switch-love-shirt-in-neon-back.webp'),
    images: [
      { src: gearImage('lead-follow-or-switch-love-shirt-in-neon-front.webp'), side: 'front', alt: 'Front view of Lead / Follow / Switch LOVE Tee' },
      { src: gearImage('lead-follow-or-switch-love-shirt-in-neon-back.webp'), side: 'back', alt: 'Back view of Lead / Follow / Switch LOVE Tee with role checklist' },
    ],
    imageDisplayMode: 'back-prominent',
    printfulUrl: 'https://boomtick.printful.me/product/lead-follow-or-switch-love-shirt-in-neon',
    collections: ['lead-follow-switch', 'rainbow-pride'],
    roles: ['lead', 'follow', 'switch'],
    tags: ['Gender Neutral', 'Switch Dancer', 'Neon', 'Pride'],
  },
  {
    id: 'mens-bear-tank-norcal',
    title: "NorCal BestCal Bear Tank",
    description: 'A lightweight NorCal bear tank for warm partner dance workshops, summer socials, and California dance weekends where breathable apparel matters.',
    price: '18.50',
    imageUrl: gearImage('norcal-bear-tank-front.webp'),
    images: [
      { src: gearImage('norcal-bear-tank-front.webp'), side: 'front', alt: "Front view of NorCal BestCal Bear Tank" },
      { src: gearImage('norcal-bear-tank-back.webp'), side: 'back', alt: "Back view of NorCal BestCal Bear Tank" },
    ],
    imageDisplayMode: 'front-prominent',
    printfulUrl: 'https://boomtick.printful.me/product/mens-bear-tank-nor-cal-best-cal',
    collections: ['norcal-bestcal'],
    tags: ['NorCal', 'Tank Top', 'Workshop Wear', 'Summer'],
  },
  {
    id: 'norcal-bestcal-cropped-top',
    title: 'NorCal BestCal Cropped Dance Top',
    description: 'A cropped NorCal BestCal dance top for West Coast Swing practice, social dance nights, and breathable dance weekend outfits.',
    price: '20.50',
    imageUrl: gearImage('norcal-crop-top-front.webp'),
    images: [
      { src: gearImage('norcal-crop-top-front.webp'), side: 'front', alt: 'Front view of NorCal BestCal Cropped Dance Top' },
      { src: gearImage('norcal-crop-top-back.webp'), side: 'back', alt: 'Back view of NorCal BestCal Cropped Dance Top' },
    ],
    imageDisplayMode: 'front-prominent',
    printfulUrl: 'https://boomtick.printful.me/product/norcal-best-cal-cropped-top',
    collections: ['norcal-bestcal'],
    tags: ['NorCal', 'Cropped Top', 'Competition Wear', 'Breathable'],
  },
  {
    id: 'norcal-bestcal-golden-gate-hoodie',
    title: 'NorCal BestCal Golden Gate Pride Hoodie',
    description: 'A lightweight Golden Gate crop hoodie for NorCal pride, cool venue floors, and layering between West Coast Swing rounds or travel days.',
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
    title: 'NorCal BestCal Golden Gate Pride Tee',
    description: 'A rainbow pride dance shirt with Golden Gate artwork for NorCal dancers, Pride events, partner dance weekends, and inclusive social floors.',
    price: '23.00',
    imageUrl: gearImage('norcal-bestcal-golden-gate-rainbow-pride-shirt-front.webp'),
    images: [
      { src: gearImage('norcal-bestcal-golden-gate-rainbow-pride-shirt-front.webp'), side: 'front', alt: 'Front view of NorCal BestCal Golden Gate Pride Tee' },
      { src: gearImage('norcal-bestcal-golden-gate-rainbow-pride-shirt-back.webp'), side: 'back', alt: 'Back view of NorCal BestCal Golden Gate Pride Tee' },
    ],
    imageDisplayMode: 'front-prominent',
    printfulUrl: 'https://boomtick.printful.me/product/norcal-bestcal-golden-gate-rainbow-pride-shirt',
    collections: ['norcal-bestcal', 'rainbow-pride'],
    tags: ['NorCal', 'Pride', 'Golden Gate', 'West Coast Swing'],
  },
  {
    id: 'norcal-bestcal-pride-bear',
    title: 'NorCal BestCal Pride Bear Shirt',
    description: 'A California bear pride shirt for NorCal West Coast Swing dancers who want rainbow pride apparel that still feels rooted in the local dance scene.',
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
    title: 'Lead / Follow / Switch Unisex Tee',
    description: 'A gender-neutral Lead / Follow / Switch tee for partner dancers who move between roles and want the social dance message visible from the back.',
    price: '18.64',
    imageUrl: gearImage('unisex-t-shirt-back.webp'),
    images: [
      { src: gearImage('unisex-t-shirt-front.webp'), side: 'front', alt: 'Front view of Lead / Follow / Switch Unisex Tee' },
      { src: gearImage('unisex-t-shirt-back.webp'), side: 'back', alt: 'Back view of Lead / Follow / Switch Unisex Tee with role checklist' },
    ],
    imageDisplayMode: 'back-prominent',
    printfulUrl: 'https://boomtick.printful.me/product/unisex-t-shirt',
    collections: ['lead-follow-switch'],
    roles: ['lead', 'follow', 'switch'],
    tags: ['Gender Neutral', 'Unisex', 'Social Dance', 'Classic'],
  },
  {
    id: 'norcal-bestcal-classic',
    title: 'NorCal BestCal Classic Dance Tee',
    description: 'A classic NorCal BestCal dance tee for West Coast Swing socials, California dance weekends, and everyday partner dance apparel.',
    price: '12.00',
    imageUrl: gearImage('norcal-bestcal-front.webp'),
    images: [
      { src: gearImage('norcal-bestcal-front.webp'), side: 'front', alt: 'Front view of NorCal BestCal Classic Dance Tee' },
      { src: gearImage('norcal-bestcal-back.webp'), side: 'back', alt: 'Back view of NorCal BestCal Classic Dance Tee' },
    ],
    imageDisplayMode: 'front-prominent',
    printfulUrl: 'https://boomtick.printful.me/product/norcal-bestcal',
    collections: ['norcal-bestcal'],
    tags: ['NorCal', 'Classic', 'Team Apparel', 'Essential'],
  },
];
