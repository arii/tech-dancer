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

export interface MerchCollection {
  id: string;
  label: string;
  printfulUrl?: string;
}

export const COLLECTIONS: readonly MerchCollection[] = [
  { id: 'all', label: 'All' },
  { id: 'lead-follow-switch', label: 'Lead/Follow/Switch', printfulUrl: 'https://boomtick.printful.me/collection/lead-follow-switch' },
  { id: 'norcal-bestcal', label: 'NorCal BestCal', printfulUrl: 'https://boomtick.printful.me/collection/norcal-bestcal' },
  { id: 'rainbow-pride', label: 'Rainbow Pride' },
];

const gearImage = (fileName: string) => `/assets/gear/${fileName}`;

export const MERCH_PRODUCTS: MerchProduct[] = [
  {
    id: 'love-neon-follow',
    title: 'Ask Me to Follow - LOVE Neon Performance Tee',
    description: 'Both roles. No rules. The floor is yours from every angle.',
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
    tags: ['Follower', 'Neon', 'Pride'],
  },
  {
    id: 'love-neon-lead',
    title: 'Ask Me to Lead - LOVE Neon Performance Tee',
    description: 'Any body leads. Any role is a choice. Wear it, own it, drive the floor.',
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
    tags: ['Leader', 'Neon', 'Pride'],
  },
  {
    id: 'lead-follow-switch-love-neon',
    title: 'Lead . Follow . Switch - Partner Dance Role Tee',
    description: 'Check all three. The dancer who does it all - this is your shirt.',
    price: '24.00',
    imageUrl: gearImage('lead-follow-or-switch-love-shirt-in-neon-back.webp'),
    images: [
      { src: gearImage('lead-follow-or-switch-love-shirt-in-neon-front.webp'), side: 'front', alt: 'Front view of Lead Follow or Switch LOVE Shirt in Neon' },
      { src: gearImage('lead-follow-or-switch-love-shirt-in-neon-back.webp'), side: 'back', alt: 'Back view of Lead Follow or Switch LOVE Shirt in Neon with role checklist' },
    ],
    imageDisplayMode: 'back-prominent',
    printfulUrl: 'https://boomtick.printful.me/product/lead-follow-or-switch-love-shirt-in-neon',
    collections: ['lead-follow-switch', 'rainbow-pride'],
    roles: ['lead', 'follow', 'switch'],
    tags: ['Role Pride', 'Versatile', 'Neon'],
  },
  {
    id: 'war-eagle-oversized',
    title: 'Rainbow War Eagle - Pride Back Print Organic Oversized Tee',
    description: 'Turn around and make a statement. A soaring rainbow war eagle, organic oversized cut, and the kind of back print that starts conversations.',
    price: '22.00',
    imageUrl: gearImage('war-eagle-oversized-high-neck-t-shirt-front.webp'),
    images: [
      { src: gearImage('war-eagle-oversized-high-neck-t-shirt-front.webp'), side: 'front', alt: 'Front view of War Eagle oversized high neck t-shirt' },
      { src: gearImage('war-eagle-oversized-high-neck-t-shirt-back.webp'), side: 'back', alt: 'Back view of War Eagle oversized high neck t-shirt' },
    ],
    imageDisplayMode: 'both-equal',
    printfulUrl: 'https://boomtick.printful.me/product/war-eagle-oversized-high-neck-t-shirt',
    collections: ['norcal-bestcal'],
    tags: ['NorCal', 'Oversized', 'Streetwear'],
  },
  {
    id: 'norcal-bestcal-golden-gate-pride',
    title: 'NorCal Best Cal - Golden Gate Rainbow Pride T-Shirt',
    description: 'Bold Bay Area energy. The Golden Gate, a rainbow sky, and proof that NorCal is Best Cal.',
    price: '23.00',
    imageUrl: gearImage('norcal-bestcal-golden-gate-rainbow-pride-shirt-front.webp'),
    images: [
      { src: gearImage('norcal-bestcal-golden-gate-rainbow-pride-shirt-front.webp'), side: 'front', alt: 'Front view of NorCal BestCal Golden Gate Rainbow Pride Shirt' },
      { src: gearImage('norcal-bestcal-golden-gate-rainbow-pride-shirt-back.webp'), side: 'back', alt: 'Back view of NorCal BestCal Golden Gate Rainbow Pride Shirt' },
    ],
    imageDisplayMode: 'front-prominent',
    printfulUrl: 'https://boomtick.printful.me/product/norcal-bestcal-golden-gate-rainbow-pride-shirt',
    collections: ['norcal-bestcal', 'rainbow-pride'],
    tags: ['NorCal', 'Pride', 'Golden Gate'],
  },
  {
    id: 'norcal-bestcal-pride-bear',
    title: 'NorCal BestCal Pride Bear Shirt',
    description: 'The iconic California bear gets a rainbow pride makeover for NorCal dancers. Show your local spirit and LGTBQ+ support on the partner dance floor.',
    price: '15.50',
    imageUrl: gearImage('norcal-best-cal-pride-california-bear-apparel-front.webp'),
    images: [
      { src: gearImage('norcal-best-cal-pride-california-bear-apparel-front.webp'), side: 'front', alt: 'Front view of NorCal BestCal Pride California Bear apparel' },
      { src: gearImage('norcal-best-cal-pride-california-bear-apparel-back.webp'), side: 'back', alt: 'Back view of NorCal BestCal Pride California Bear apparel' },
    ],
    imageDisplayMode: 'front-prominent',
    printfulUrl: 'https://boomtick.printful.me/product/norcal-best-cal-pride-california-bear-apparel',
    collections: ['norcal-bestcal', 'rainbow-pride'],
    tags: ['NorCal', 'Pride', 'California Bear'],
  },
  {
    id: 'love-lead-follow-switch-unisex',
    title: 'LOVE Lead Follow or Switch Unisex Shirt',
    description: 'A classic role-neutral shirt for social dancers who love the Lead/Follow/Switch message. A staple for West Coast Swing enthusiasts and inclusive partner dance communities.',
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
    tags: ['Gender Neutral', 'Unisex', 'Classic'],
  },
  {
    id: 'mens-bear-tank-norcal',
    title: 'NorCal Best Cal - Golden Gate Classic Tank Top',
    description: 'The Bay on your chest. A NorCal pride classic for warm-weather weekends, festivals, and every day that calls for something bold.',
    price: '18.50',
    imageUrl: gearImage('norcal-bear-tank-front.webp'),
    images: [
      { src: gearImage('norcal-bear-tank-front.webp'), side: 'front', alt: "Front view of Men's Bear Tank NorCal BestCal" },
    ],
    imageDisplayMode: 'front-only',
    printfulUrl: 'https://boomtick.printful.me/product/mens-bear-tank-nor-cal-best-cal',
    collections: ['norcal-bestcal'],
    tags: ['NorCal', 'Tank Top', 'Workshop Wear', 'Summer'],
  },
  {
    id: 'norcal-bestcal-cropped-top',
    title: 'NorCal Best Cal - Golden Gate Crop Top',
    description: 'NorCal pride, cropped and colorful. Festival-ready, dance-floor-ready, Bay Area-ready.',
    price: '20.50',
    imageUrl: gearImage('norcal-crop-top-front.webp'),
    images: [
      { src: gearImage('norcal-crop-top-front.webp'), side: 'front', alt: 'Front view of NorCal BestCal Cropped Top' },
    ],
    imageDisplayMode: 'front-only',
    printfulUrl: 'https://boomtick.printful.me/product/norcal-best-cal-cropped-top',
    collections: ['norcal-bestcal'],
    tags: ['NorCal', 'Cropped Top', 'Competition Wear', 'Breathable'],
  },
  {
    id: 'norcal-bestcal-golden-gate-hoodie',
    title: 'NorCal Best Cal - Golden Gate Crop Hoodie',
    description: 'Fog-season approved. A NorCal pride crop hoodie for Bay Area evenings, festival nights, and every golden California moment.',
    price: '34.00',
    imageUrl: gearImage('norcal-gate-crop-hoodie.webp'),
    images: [
      { src: gearImage('norcal-gate-crop-hoodie.webp'), side: 'front', alt: 'Front view of NorCal BestCal Golden Gate crop hoodie' },
    ],
    imageDisplayMode: 'front-only',
    printfulUrl: 'https://boomtick.printful.me/product/norcal-bestcal-golden-gate-crop-hoodie',
    collections: ['norcal-bestcal'],
    tags: ['NorCal', 'Hoodie', 'Travel', 'Layering'],
  },
  {
    id: 'norcal-bestcal-classic',
    title: 'NorCal Best Cal - Golden Gate Classic Unisex Tee',
    description: 'The NorCal classic, in soft black heather. XS to 5XL - because NorCal pride belongs to every body.',
    price: '12.00',
    imageUrl: gearImage('norcal-bestcal-front.webp'),
    images: [
      { src: gearImage('norcal-bestcal-front.webp'), side: 'front', alt: 'Front view of NorCal BestCal Classic Tee' },
    ],
    imageDisplayMode: 'front-only',
    printfulUrl: 'https://boomtick.printful.me/product/norcal-bestcal',
    collections: ['norcal-bestcal'],
    tags: ['NorCal', 'Classic', 'Essential'],
  },
];
