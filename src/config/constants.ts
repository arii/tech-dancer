import { SITE_METADATA } from "./content";

export const BASE_URL = (import.meta.env.VITE_APP_URL || 'https://boomtick.blog').replace(/\/$/, '');
export const SITE_NAME = 'BoomTick.blog';
export const GA_MEASUREMENT_ID = 'G-W9W73FV2K1';
export const GOOGLE_SITE_VERIFICATION = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION || 'FGbpuhF_c3YUFon1LzrzqmW1jvVPFygugss24n0wn5k';
const DEFAULT_DESCRIPTION = `The West Coast Swing Lifestyle Blog by ${SITE_METADATA.persona}. Exploring the intersection of dance, physics, and engineering.`;

export const STATIC_SCHEMAS = {
  HOME: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_NAME,
    "url": BASE_URL,
    "description": DEFAULT_DESCRIPTION,
    "publisher": {
      "@type": "Person",
      "name": SITE_METADATA.author
    }
  },
  ABOUT: (bioName: string, bioRole: string) => ({
    "@context": "https://schema.org",
    "@type": ["AboutPage", "ProfilePage"],
    "mainEntity": {
      "@type": "Person",
      "name": bioName,
      "description": "West Coast Swing enthusiast, traveler, and data science consultant.",
      "image": `${BASE_URL}/assets/comp_analysis_hero.webp`,
      "jobTitle": bioRole,
      "url": `${BASE_URL}/about`,
      "sameAs": [
        "https://github.com/arii",
        "https://www.linkedin.com/in/arielanders/"
      ]
    }
  })
} as const;
