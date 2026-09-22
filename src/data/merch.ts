import type { MerchImageDisplayMode, MerchProductImage } from '@/data/products/catalog';

export interface MerchProduct {
  id: string;
  gearSlug: string;
  title: string;
  description: string;
  price: string;
  shippingPrice?: string;
  color: string;
  size: string;
  material?: string;
  pattern?: string;
  imageUrl: string;
  customLabel?: string;
  gtin?: string;
  images?: MerchProductImage[];
  imageDisplayMode?: MerchImageDisplayMode;
  printfulUrl: string;
  collections: string[];
  roles?: ('lead' | 'follow' | 'switch')[];
  tags: string[];
}

export const COLLECTIONS = [
  { id: 'all', label: 'All' },
  { id: 'slot-era', label: 'Slot Era' },
  { id: 'lead-follow-switch', label: 'Lead/Follow/Switch' },
  { id: 'norcal-bestcal', label: 'NorCal BestCal' },
  { id: 'rainbow-pride', label: 'Rainbow Pride' },
] as const;

const gearImage = (fileName: string) => `/assets/gear/${fileName}`;

const SEO_SUFFIX = ' - West Coast Swing, Partner & Social Dance Apparel';

export const MERCH_PRODUCTS: MerchProduct[] = [
  {
    id: 'love-neon-follow',
    gearSlug: '2024-06-01-love-neon-follow-shirt',
    title: 'Ask Me to Follow - LOVE Neon Performance Tee' + SEO_SUFFIX,
    description: 'Both roles. No rules. Designed for West Coast Swing (WCS) and social dance events, the floor is yours from every angle.',
    price: '24.50',
    color: 'Black/Neon',
    size: 'XS/S/M/L/XL/2XL/3XL',
    material: '100% combed and ring-spun cotton',
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
    gearSlug: '2024-06-01-love-neon-lead-shirt',
    title: 'Ask Me to Lead - LOVE Neon Performance Tee' + SEO_SUFFIX,
    description: 'Any body leads. Any role is a choice. Designed for West Coast Swing (WCS) and social dance events, wear it, own it, drive the floor.',
    price: '24.00',
    color: 'Black/Neon',
    size: 'XS/S/M/L/XL/2XL/3XL',
    material: '100% combed and ring-spun cotton',
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
    gearSlug: '2024-06-01-love-neon-switch-shirt',
    title: 'Lead . Follow . Switch - Partner Dance Role Tee' + SEO_SUFFIX,
    description: 'Check all three. Designed for West Coast Swing (WCS) and social dance events, the dancer who does it all - this is your shirt.',
    price: '24.00',
    color: 'Black/Neon',
    size: 'XS/S/M/L/XL/2XL/3XL',
    material: '100% combed and ring-spun cotton',
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
    gearSlug: '2024-06-01-war-eagle-shirt',
    title: 'Rainbow War Eagle - Pride Back Print Organic Oversized Tee' + SEO_SUFFIX,
    description: 'Turn around and make a statement with this premium organic oversized tee. Featuring a soaring rainbow war eagle back print, this piece combines sustainable streetwear style with a bold message of pride and freedom. Perfect for the social dance floor or making an impression wherever you go.',
    price: '22.00',
    color: 'Natural/Rainbow',
    size: 'XS/S/M/L/XL/2XL',
    material: '100% organic ring-spun cotton',
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
    gearSlug: '2024-06-01-norcal-pride-gate-shirt',
    title: 'NorCal Best Cal - Golden Gate Rainbow Pride T-Shirt' + SEO_SUFFIX,
    description: 'Bold Bay Area energy captured in a single design. Featuring the iconic Golden Gate Bridge set against a vibrant rainbow sky, this tee is definitive proof that NorCal is Best Cal. High-quality print on a soft, comfortable fabric that\'s ready for festival season or everyday wear. A staple for West Coast Swing enthusiasts and inclusive partner dance communities.',
    price: '23.00',
    color: 'Black/Rainbow',
    size: 'XS/S/M/L/XL/2XL/3XL',
    material: '100% ring-spun cotton',
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
    gearSlug: '2024-06-01-norcal-pride-bear-shirt',
    title: 'NorCal BestCal Pride Bear Shirt' + SEO_SUFFIX,
    description: 'The iconic California bear gets a rainbow pride makeover for NorCal dancers. Show your local spirit and LGBTQ+ support on West Coast Swing and partner dance floors.',
    price: '15.50',
    color: 'Black/Rainbow',
    size: 'XS/S/M/L/XL/2XL/3XL',
    material: '100% combed and ring-spun cotton',
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
    gearSlug: '2024-06-01-love-unisex-shirt',
    title: 'LOVE Lead Follow or Switch Unisex Shirt' + SEO_SUFFIX,
    description: 'A classic role-neutral shirt for social dancers who love the Lead/Follow/Switch message. A staple for West Coast Swing enthusiasts and inclusive partner dance communities.',
    price: '18.64',
    color: 'Black',
    size: 'XS/S/M/L/XL/2XL/3XL',
    material: '100% combed and ring-spun cotton',
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
    gearSlug: '2024-06-01-norcal-bear-tank',
    title: 'NorCal BestCal Rainbow Bear Dance Tank Top' + SEO_SUFFIX,
    description: 'The Bay on your chest. A NorCal pride classic for warm-weather weekends, festivals, and every day that calls for something bold. A staple for West Coast Swing enthusiasts and inclusive partner dance communities.',
    price: '18.50',
    color: 'Black',
    size: 'XS/S/M/L/XL/2XL',
    material: '100% airlume combed and ring-spun cotton',
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
    gearSlug: '2024-06-01-norcal-crop-top',
    title: 'NorCal Best Cal - Golden Gate Crop Top' + SEO_SUFFIX,
    description: 'NorCal pride, cropped and colorful. Festival-ready, dance-floor-ready, Bay Area-ready. A staple for West Coast Swing enthusiasts and inclusive partner dance communities.',
    price: '20.50',
    color: 'Black',
    size: 'XS/S/M/L/XL',
    material: '65% polyester, 35% viscose',
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
    gearSlug: '2024-06-01-norcal-gate-crop-hoodie',
    title: 'NorCal Best Cal - Golden Gate Crop Hoodie' + SEO_SUFFIX,
    description: 'Fog-season approved. A NorCal pride crop hoodie for Bay Area evenings, festival nights, and every golden California moment. A staple for West Coast Swing enthusiasts and inclusive partner dance communities.',
    price: '34.00',
    color: 'Black/Military Green/Storm',
    size: 'S/M/L/XL/2XL',
    material: '52% combed ring-spun cotton, 48% poly fleece',
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
    gearSlug: '2024-06-01-norcal-bestcal-tshirt',
    title: 'NorCal Best Cal - Golden Gate Classic Unisex Tee' + SEO_SUFFIX,
    description: 'The NorCal classic, in soft black heather. XS to 5XL - because NorCal pride belongs to every body. A staple for West Coast Swing enthusiasts and inclusive partner dance communities.',
    price: '12.00',
    color: 'Black Heather/Black',
    size: 'XS/S/M/L/XL/2XL/3XL/4XL/5XL',
    material: '100% combed and ring-spun cotton',
    imageUrl: gearImage('norcal-bestcal-front.webp'),
    images: [
      { src: gearImage('norcal-bestcal-front.webp'), side: 'front', alt: 'Front view of NorCal BestCal Classic Tee' },
    ],
    imageDisplayMode: 'front-only',
    printfulUrl: 'https://boomtick.printful.me/product/norcal-bestcal',
    collections: ['norcal-bestcal'],
    tags: ['NorCal', 'Classic', 'Essential'],
  },
  {
    id: 'slot-era-tank-top',
    gearSlug: 'slot-era-tank-top',
    title: "Slot Era WCS Women's Racerback Tank Top - West Coast Swing, Partner & Social Dance Apparel",
    description: "Fitted racerback tank top featuring the vibrant retro Slot Era design and BoomTick branding. A funny gift for West Coast Swing (WCS) dancers for birthdays, holidays, and summer events.",
    price: '16.50',
    color: 'Black/Rainbow',
    size: 'XS/S/M/L/XL/2XL',
    material: '60% combed ring-spun cotton, 40% polyester',
    imageUrl: '/assets/slot_era_racerback.webp',
    images: [
      { src: '/assets/slot_era_racerback.webp', side: 'front', alt: "Front view of Slot Era WCS Women's Racerback Tank Top" },
    ],
    imageDisplayMode: 'front-only',
    printfulUrl: 'https://boomtick.printful.me/product/boomtick-slot-era-west-coast-swing-dancer-womens-fitted-racerback-tank-top',
    collections: ['slot-era'],
    tags: ['Apparel', 'Merch', 'Retro'],
  },
  {
    id: 'slot-era-tote-bag',
    gearSlug: 'slot-era-tote-bag',
    title: 'Slot Era WCS Tote Bag - Canvas West Coast Swing Dance Bag, Black 15x15',
    description: 'Show off your West Coast Swing pride with this durable 15" x 15" black canvas tote bag, featuring the signature Slot Era dancer graphic and BoomTick branding. Made from 100% spun polyester canvas, it\'s sturdy enough for dance shoes, water bottles, and convention gear — perfect for West Coast Swing (WCS) dancers heading to socials, workshops, or weekend dance events. Makes a funny gift for West Coast Swing (WCS) dancers for birthdays or holidays.',
    price: '27.00',
    shippingPrice: '4.59',
    color: 'Black',
    size: '15" x 15"',
    material: '100% spun polyester canvas',
    imageUrl: '/assets/slot_era_tote.webp',
    images: [
      { src: '/assets/slot_era_tote.webp', side: 'front', alt: 'Front view of Slot Era WCS Tote Bag' },
      { src: '/assets/home/wcs-travel-pack.webp', side: 'front', alt: 'Dancer with gear bag heading to event' },
    ],
    imageDisplayMode: 'front-only',
    printfulUrl: 'https://boomtick.printful.me/product/boomtick-slot-era-west-coast-swing-dancer-tote-bag',
    collections: ['slot-era'],
    tags: ['Accessories', 'Merch', 'Tote'],
    customLabel: 'wcs-dance',
  },
  {
    id: 'slot-era-mug',
    gearSlug: 'slot-era-mug',
    title: 'Slot Era Black Ceramic Mug',
    description: '11oz black ceramic coffee mug featuring the colorful Slot Era BoomTick branding. A funny gift for West Coast Swing (WCS) dancers for birthdays and holidays to power your dance event mornings and late-night competition reviews.',
    price: '16.50',
    shippingPrice: '4.99',
    color: 'Black',
    size: '11 oz',
    material: 'Ceramic (dishwasher & microwave safe)',
    imageUrl: '/assets/slot_era_mug.webp',
    images: [
      { src: '/assets/slot_era_mug.webp', side: 'front', alt: 'Front view of Slot Era Black Ceramic Mug' },
    ],
    imageDisplayMode: 'front-only',
    printfulUrl: 'https://boomtick.printful.me/product/boomtick-slot-era-west-coast-swing-dancer-mug',
    collections: ['slot-era'],
    tags: ['Accessories', 'Merch', 'Mug'],
    customLabel: 'boomtick-merch',
  },
];
