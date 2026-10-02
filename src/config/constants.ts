export const BASE_URL = (import.meta.env.VITE_APP_URL || 'https://boomtick.blog').replace(/\/$/, '');
export const ASSET_PREFIX = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
export const SITE_NAME = 'BoomTick.blog';

export const SOCIAL_LINKS = {
  INSTAGRAM: 'https://www.instagram.com/onasafari/',
  LINKEDIN: 'https://www.linkedin.com/in/ariel-anders/',
  GITHUB: 'https://github.com/arii',
  PORTFOLIO: 'https://arii.github.io'
} as const;
export const GOOGLE_SITE_VERIFICATION = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION || 'FGbpuhF_c3YUFon1LzrzqmW1jvVPFygugss24n0wn5k';
export const CALENDAR_BOOKING_URL = import.meta.env.VITE_CALENDAR_BOOKING_URL || 'https://cal.com/ariel-anders/20min';

export const PRINTFUL_REFERRAL = {
  URL: 'https://www.printful.com/give-5-get-5/GZB6C4',
  DISCOUNT_AMOUNT: '$5',
  HERO_HEADING: 'Get $5 Off Your First Order',
  HERO_SUBHEADING: 'New to Printful? Use our referral link to save $5 on your first purchase.',
  FOOTER_HEADING: 'First-Time Buyer Discount',
  FOOTER_DESCRIPTION: 'Supporting BoomTick helps us keep the servers running and the content flowing. Save $5 on your first Printful order and support the blog at the same time.'
} as const;

export const CONSULTING_SERVICE_SCHEMA = {
  "@type": "ProfessionalService",
  "@id": `${BASE_URL}/#consulting`,
  "name": "Ariel Anders Consulting",
  "url": `${BASE_URL}/services`,
  "telephone": "+1-661-205-2489",
  "priceRange": "$$$",
  "image": `${BASE_URL}/assets/ariel-anders-consulting-banner.jpg`,
  "areaServed": [
    {
      "@type": "City",
      "name": "San Francisco"
    },
    {
      "@type": "AdministrativeArea",
      "name": "California"
    }
  ],
  "founder": {
    "@id": `${BASE_URL}/#founder`
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Digital Consulting Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Digital Foundation Setup",
          "description": "Custom mobile-responsive website, local SEO optimization, domain configuration, and integrated booking workflows."
        },
        "price": "1500",
        "priceCurrency": "USD"
      }
    ]
  }
} as const;

export const BOOMTICK_WEBSITE_SCHEMA = {
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  "url": `${BASE_URL}/`,
  "name": "BoomTick",
  "publisher": {
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    "name": "BoomTick",
    "logo": `${BASE_URL}/assets/boomtick-logo.png`,
    "image": `${BASE_URL}/assets/boomtick-og-banner.jpg`
  }
} as const;

export const FOUNDER_PERSON_SCHEMA = {
  "@type": "Person",
  "@id": `${BASE_URL}/#founder`,
  "name": "Ariel Anders",
  "jobTitle": "Roboticist, AI Engineer & Consultant",
  "url": `${BASE_URL}/about`,
  "sameAs": [
    "https://arii.github.io/",
    "https://github.com/arii",
    "https://www.linkedin.com/in/ariel-anders/"
  ]
} as const;

export const STATIC_SCHEMAS = {
  HOME: {
    "@context": "https://schema.org",
    "@graph": [
      BOOMTICK_WEBSITE_SCHEMA,
      CONSULTING_SERVICE_SCHEMA,
      FOUNDER_PERSON_SCHEMA
    ]
  },
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
          "url": `${BASE_URL}${ASSET_PREFIX}/assets/home/wcs-travel-pack.webp`,
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
        "alumniOf": [
          {
            "@type": "CollegeOrUniversity",
            "name": "Massachusetts Institute of Technology"
          }
        ],
        "knowsAbout": [
          "West Coast Swing",
          "Dance Footwear",
          "Artificial Intelligence",
          "Robotics Engineering",
          "Computer Vision"
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
