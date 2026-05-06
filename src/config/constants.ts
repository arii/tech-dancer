export const BASE_URL = (import.meta.env.VITE_APP_URL || 'https://boomtick.blog').replace(/\/$/, '');
export const SITE_NAME = 'BoomTick.blog';
export const GA_MEASUREMENT_ID = 'G-W9W73FV2K1';
export const GOOGLE_SITE_VERIFICATION = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION || 'FGbpuhF_c3YUFon1LzrzqmW1jvVPFygugss24n0wn5k';
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
