import { SEO } from '@/components/SEO';
import { ClientSpotlight } from '@/features/services/ClientSpotlight';
import { IntakeForm } from '@/features/services/IntakeForm';
import { PackagesGrid } from '@/features/services/Packages';
import { Box, Stack, Text } from '@/layouts/Primitives';

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

const Services = () => {
  return (
    <Box width="full" maxWidth="container" marginX="auto" minWidth={0} overflow="x-clip" paddingX={{ base: 4, sm: 6, lg: 8 }} paddingY={12}>
      <SEO
        title="Web Design & Digital Systems for San Francisco Creatives"
        description="Digital business systems and web design for San Francisco creatives, artists, and independent studios. Fast websites, booking systems, ecommerce, and workflow automation."
        schema={serviceSchema}
      />

      {/* 1. Header Section */}
      <Stack gap={5} width="full" maxWidth="4xl" align="center" className="text-center" marginX="auto" marginBottom={16}>
        <Text as="h1" variant="display" size="3xl" weight="font-black" tracking="normal" >
          Digital business systems for independent creatives
        </Text>

        <Text as="p" variant="body" size="lg" color="main" className="font-medium max-w-3xl leading-relaxed">
          We build and manage the digital side of your business—from your website and online booking to marketing, ecommerce, and automation.
        </Text>

        <Text variant="body" size="sm" weight="font-bold" className="uppercase tracking-widest text-dim" marginTop={2}>
          ARTISTS • STYLISTS • MAKERS • INSTRUCTORS • PERFORMERS • CREATIVE STUDIOS
        </Text>
      </Stack>

      <Stack gap={16} width="full">
        {/* 2. Platform Foundation & Connected Capabilities */}
        <Box>
          <PackagesGrid />
        </Box>

        {/* 3. Real Client Proof: Hair by April */}
        <Box>
          <ClientSpotlight />
        </Box>

        {/* 4. Dedicated Next Steps Consultation & Ongoing Management Intake */}
        <Box id="consultation" paddingTop={4}>
          <IntakeForm />
        </Box>
      </Stack>
    </Box>
  );
};

export default Services;
