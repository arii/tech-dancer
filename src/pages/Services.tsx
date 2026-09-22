// impeccable-ignore-file
import { SEO } from '@/components/SEO';
import { ServicesHero } from '@/components/services/ServicesHero';
import { CoreServicesGrid } from '@/components/services/CoreServicesGrid';
import { FeatureTabs } from '@/components/services/FeatureTabs';
import { CtaBanner } from '@/components/services/CtaBanner';

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://boomtick.blog/services/#webpage",
  "url": "https://boomtick.blog/services",
  "name": "Web Design & Digital Systems for San Francisco Creatives | BoomTick",
  "description": "Digital business systems and web design for San Francisco creatives, artists, and independent studios. Fast websites, booking systems, ecommerce, and workflow automation.",
  "provider": {
    "@type": "Organization",
    "@id": "https://boomtick.blog/#organization"
  },
  "mainEntity": {
    "@type": "ProfessionalService",
    "name": "BoomTick",
    "url": "https://boomtick.blog/services",
    "logo": "https://boomtick.blog/favicon.ico",
    "description": "Digital business systems and web design for San Francisco creatives, artists, and independent studios. Fast websites, booking systems, ecommerce, and workflow automation.",
    "priceRange": "$$",
    "email": "ari@boomtick.blog",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "San Francisco",
      "addressRegion": "CA",
      "addressCountry": "US"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "San Francisco"
      },
      {
        "@type": "AdministrativeArea",
        "name": "San Francisco Bay Area"
      },
      {
        "@type": "Country",
        "name": "United States"
      }
    ],
    "offers": {
      "@type": "Offer",
      "name": "Build your digital foundation",
      "price": "1500",
      "priceCurrency": "USD",
      "description": "Fast, mobile-responsive website build, local Google search optimization, professional domain, secure hosting, customer booking workflows, and ongoing technical support.",
      "url": "https://boomtick.blog/services"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Creative Business Digital Systems & Capabilities",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Build your digital foundation",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Digital Foundation",
                "description": "Fast, polished website build, booking workflows, local search presence, and ongoing support."
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Booking & Customer Workflows",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Booking & Customer Workflows",
                "description": "24/7 calendar availability, appointment scheduling, intake screening questionnaires, and online deposits."
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Ecommerce & Digital Products",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Ecommerce & Digital Products",
                "description": "Physical merchandise, digital downloads, commissions, and checkout integrations."
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Marketing & Discovery",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Marketing & Discovery",
                "description": "Local SEO, Google Business Profile support, content strategy, email marketing, and conversion optimization."
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Events & Experiences",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Events & Experiences",
                "description": "Workshop and class scheduling, online registration, ticketing, and event landing pages."
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Business Automation",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Business Automation",
                "description": "Form-to-calendar sync, CRM lead routing, automated status updates, and custom AI workflows."
              }
            }
          ]
        }
      ]
    }
  }
};

export const ServicesPage = () => {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 pt-24 pb-16 px-6 lg:px-12">
      <SEO
        title="Web Design & Digital Systems for San Francisco Creatives"
        description="Digital business systems and web design for San Francisco creatives, artists, and independent studios. Fast websites, booking systems, ecommerce, and workflow automation."
        schema={serviceSchema}
      />
      <div className="max-w-7xl mx-auto space-y-24">
        <ServicesHero />

        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Our Core Services</h2>
            <p className="text-slate-400">Click each section to learn more about what's included.</p>
          </div>
          <CoreServicesGrid />
        </section>

        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Feature Details</h2>
            <p className="text-slate-400">Take a closer look at what each core service includes.</p>
          </div>
          <FeatureTabs />
        </section>

        <CtaBanner />
      </div>
    </main>
  );
};

export default ServicesPage;
