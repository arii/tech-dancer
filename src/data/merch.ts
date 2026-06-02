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
    description: 'A bright role-pride dance tee for followers who want the message visible on the social floor. Designed for West Coast Swing dancers, partner dance weekends, rainbow pride events, and NorCal dance friends.',
    title: 'LOVE Neon Tee - Ask Me to Follow',
    description: 'A bright role-pride tee for followers who want the message visible on the social floor.',
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
    title: 'LOVE Neon Tee — Ask Me to Lead',
    description: 'A high-visibility role-pride tee for leaders who want to be seen from across the room. Perfect for West Coast Swing social dancing, gender-neutral dance roles, and inclusive dance weekend outfits.',
    title: 'LOVE Neon Tee - Ask Me to Lead',
    description: 'A high-visibility tee for leaders who want to be seen from across the room.',
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
    title: 'Lead / Follow / Switch LOVE Tee',
    description: 'The ultimate versatile dance shirt featuring a neon checklist for role-fluid dancers. Celebrates the freedom of gender-neutral dance roles on the West Coast Swing social floor.',
    id: 'war-eagle-oversized',
    title: 'War Eagle Oversized High Neck Tee',
    description: 'A relaxed NorCal tee with the War Eagle design for dance weekends and casual wear.',
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
    id: 'lead-follow-switch-love-neon',
    title: 'Lead / Follow / Switch LOVE Tee',
    description: 'A versatile role tee for dancers who lead, follow, switch, or just love the floor.',
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
    tags: ['Gender Neutral', 'Neon', 'Pride'],
  },
  {
    id: 'norcal-bestcal-golden-gate-pride',
    title: 'NorCal BestCal Golden Gate Pride Tee',
    description: 'Celebrate Bay Area pride with the Golden Gate Bridge in rainbow colors. A vibrant NorCal pride apparel choice for your next West Coast Swing event or summer dance circuit.',
    id: 'mens-bear-tank-norcal',
    title: 'NorCal BestCal Bear Tank',
    description: 'Lightweight and breathable tank top featuring the iconic NorCal BestCal bear.',
    price: '18.50',
    imageUrl: gearImage('norcal-bear-tank-front.webp'),
    images: [
      { src: gearImage('norcal-bear-tank-front.webp'), side: 'front', alt: "Front view of Men's Bear Tank NorCal BestCal" },
      { src: gearImage('norcal-bear-tank-back.webp'), side: 'back', alt: "Back view of Men's Bear Tank NorCal BestCal" },
    ],
    imageDisplayMode: 'front-prominent',
    printfulUrl: 'https://boomtick.printful.me/product/mens-bear-tank-nor-cal-best-cal',
    collections: ['norcal-bestcal'],
    tags: ['NorCal', 'Tank Top', 'Workshop Wear'],
  },
  {
    id: 'norcal-bestcal-cropped-top',
    title: 'NorCal BestCal Cropped Tee',
    description: 'Stylish and functional cropped tee designed for maximum range of motion.',
    price: '20.50',
    imageUrl: gearImage('norcal-crop-top-front.webp'),
    images: [
      { src: gearImage('norcal-crop-top-front.webp'), side: 'front', alt: 'Front view of NorCal BestCal Cropped Top' },
      { src: gearImage('norcal-crop-top-back.webp'), side: 'back', alt: 'Back view of NorCal BestCal Cropped Top' },
    ],
    imageDisplayMode: 'front-prominent',
    printfulUrl: 'https://boomtick.printful.me/product/norcal-best-cal-cropped-top',
    collections: ['norcal-bestcal'],
    tags: ['NorCal', 'Cropped Tee', 'Competition Wear'],
  },
  {
    id: 'norcal-bestcal-golden-gate-hoodie',
    title: 'NorCal BestCal Golden Gate Crop Hoodie',
    description: 'Cozy yet lightweight crop hoodie featuring the Golden Gate Bridge.',
    price: '34.00',
    imageUrl: gearImage('norcal-gate-crop-hoodie.webp'),
    images: [
      { src: gearImage('norcal-gate-crop-hoodie.webp'), side: 'front', alt: 'Front view of NorCal BestCal Golden Gate crop hoodie' },
    ],
    imageDisplayMode: 'single',
    printfulUrl: 'https://boomtick.printful.me/product/norcal-bestcal-golden-gate-crop-hoodie',
    collections: ['norcal-bestcal'],
    tags: ['NorCal', 'Hoodie', 'Travel'],
  },
  {
    id: 'norcal-bestcal-golden-gate-pride',
    title: 'NorCal BestCal Golden Gate Rainbow Pride Tee',
    description: 'Celebrate Pride with the iconic Golden Gate Bridge in rainbow colors.',
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
    title: 'NorCal BestCal Pride California Tee',
    description: 'Classic California bear design with a Pride twist to show your NorCal roots.',
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
    title: 'LOVE Lead Follow or Switch Unisex Tee',
    description: 'A classic choice for social dancers of all roles and styles.',
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
    id: 'war-eagle-oversized',
    title: 'War Eagle Oversized High Neck Tee',
    description: 'Premium oversized street-style tee featuring the bold War Eagle design. A high-comfort staple for Northern California dancers who value both style and movement.',
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
    title: 'NorCal BestCal Bear Tank',
    description: 'Breathable and lightweight NorCal bear tank for high-energy dance workshops and summer socials. Essential California-inspired gear for the active social dancer.',
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
    title: 'NorCal BestCal Cropped Top',
    description: 'A stylish and functional crop for Northern California social dancers. Designed for breathability and maximum range of motion during intense social dance rounds.',
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
    title: 'NorCal BestCal Golden Gate Pride Hoodie',
    description: 'Cozy layering for dance weekend travel and late-night socials. Features the iconic bridge in rainbow colors for a vibrant NorCal pride statement.',
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
    title: 'NorCal BestCal Classic Tee',
    description: 'The signature Northern California dance shirt. A clean, classic design that marks you as part of the NorCal partner dance community.',
    description: 'Clean, classic design that marks you as part of the Northern California dance community.',
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
