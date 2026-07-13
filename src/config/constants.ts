import { getBasename } from '@/lib/basename';

export const BASE_URL = (import.meta.env.VITE_APP_URL || 'https://boomtick.blog').replace(/\/$/, '');
export const ASSET_PREFIX = getBasename().replace(/\/$/, '');
export const SITE_NAME = 'BoomTick.blog';

export const SOCIAL_LINKS = {
  INSTAGRAM: 'https://www.instagram.com/onasafari/',
  LINKEDIN: 'https://www.linkedin.com/in/ariel-anders/?skipRedirect=true',
  GITHUB: 'https://github.com/arii',
  PORTFOLIO: 'https://arii.github.io'
} as const;
export const GA_MEASUREMENT_ID = 'G-W9W73FV2K1';
export const GOOGLE_SITE_VERIFICATION = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION || 'FGbpuhF_c3YUFon1LzrzqmW1jvVPFygugss24n0wn5k';

export const PRINTFUL_REFERRAL = {
  URL: 'https://www.printful.com/give-5-get-5/GZB6C4',
  DISCOUNT_AMOUNT: '$5',
  HERO_HEADING: 'Get $5 Off Your First Order',
  HERO_SUBHEADING: 'New to Printful? Use our referral link to save $5 on your first purchase.',
  FOOTER_HEADING: 'First-Time Buyer Discount',
  FOOTER_DESCRIPTION: 'Supporting BoomTick helps us keep the servers running and the content flowing. Save $5 on your first Printful order and support the blog at the same time.'
} as const;

const DEFAULT_DESCRIPTION = "The West Coast Swing Lifestyle Blog by Tech Dancer. Training tips, travel guides, and gear reviews for competitive West Coast Swing dancers, plus technical deep dives into building the platform with DevAI.";

export const STATIC_SCHEMAS = {
  HOME: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_NAME,
    "url": BASE_URL,
    "description": DEFAULT_DESCRIPTION,
    "publisher": {
      "@type": "Person",
      "name": "Ariel Anders"
    }
  },
  ABOUT: (bioName: string, bioRole: string) => ({
    "@context": "https://schema.org",
    "@type": ["AboutPage", "ProfilePage"],
    "mainEntity": {
      "@type": "Person",
      "name": bioName,
      "description": bioRole,
      "image": `${BASE_URL}${ASSET_PREFIX}/assets/comp_analysis_hero.webp`,
      "jobTitle": bioRole,
      "url": `${BASE_URL}/about`,
      "sameAs": [
        SOCIAL_LINKS.GITHUB,
        SOCIAL_LINKS.LINKEDIN
      ]
    }
  })
} as const;
