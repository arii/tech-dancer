export const BASE_URL = (import.meta.env.VITE_APP_URL || 'https://boomtick.blog').replace(/\/$/, '');
export const ASSET_PREFIX = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
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
  HOME: [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": SITE_NAME,
      "url": BASE_URL,
      "description": DEFAULT_DESCRIPTION,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${BASE_URL}/blog?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": SITE_NAME,
      "url": BASE_URL,
      "logo": {
        "@type": "ImageObject",
        "name": `${SITE_NAME} Logo`,
        "url": `${BASE_URL}/favicon.ico`
      },
      "founder": {
        "@type": "Person",
        "name": "Ariel Anders",
        "jobTitle": "Roboticist & AI Engineer",
        "url": `${BASE_URL}/about`,
        "sameAs": [
          SOCIAL_LINKS.PORTFOLIO,
          SOCIAL_LINKS.GITHUB,
          SOCIAL_LINKS.LINKEDIN
        ]
      },
      "sameAs": [
        SOCIAL_LINKS.PORTFOLIO,
        SOCIAL_LINKS.GITHUB,
        SOCIAL_LINKS.LINKEDIN,
        SOCIAL_LINKS.INSTAGRAM
      ]
    }
  ],
  ABOUT: (bioName: string, bioRole: string) => [
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "name": `About ${bioName} | Roboticist & WCS Dancer`,
      "description": bioRole,
      "mainEntity": {
        "@type": "Person",
        "name": bioName,
        "description": bioRole,
        "image": {
          "@type": "ImageObject",
          "name": `${bioName} Profile Photo`,
          "url": `${BASE_URL}${ASSET_PREFIX}/assets/comp_analysis_hero.webp`,
          "caption": "Ariel Anders, PhD - Roboticist & WCS Dancer",
          "creditText": "Ariel Anders",
          "creator": {
            "@type": "Person",
            "name": "Ariel Anders"
          },
          "copyrightHolder": {
            "@type": "Person",
            "name": "Ariel Anders"
          },
          "copyrightNotice": `© ${new Date().getFullYear()} Ariel Anders. All rights reserved.`,
          "license": `${BASE_URL}/about#terms`,
          "acquireLicensePage": `${BASE_URL}/about`
        },
        "jobTitle": "Roboticist & AI Engineer",
        "url": `${BASE_URL}/about`,
        "alumniOf": "Massachusetts Institute of Technology (MIT)",
        "knowsAbout": [
          "Artificial Intelligence",
          "Robotics Software Engineering",
          "Autonomous Systems",
          "Agentic Workflows",
          "Motion Planning",
          "West Coast Swing"
        ],
        "sameAs": [
          SOCIAL_LINKS.PORTFOLIO,
          SOCIAL_LINKS.GITHUB,
          SOCIAL_LINKS.LINKEDIN,
          SOCIAL_LINKS.INSTAGRAM
        ]
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": `${BASE_URL}`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "About",
          "item": `${BASE_URL}/about`
        }
      ]
    }
  ]
} as const;
