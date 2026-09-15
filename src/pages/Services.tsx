import { SEO } from '@/components/SEO';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { PackagesGrid, ScopeBoundaries } from '@/features/services/Packages';
import { IntakeForm } from '@/features/services/IntakeForm';

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://boomtick.blog/services/#webpage",
  "url": "https://boomtick.blog/services",
  "name": "Services & Packages | BoomTick",
  "description": "Digital business studio providing custom web design, appointment booking integrations, and workflow automation for independent creative professionals.",
  "provider": {
    "@type": "Organization",
    "@id": "https://boomtick.blog/#organization"
  },
  "mainEntity": {
    "@type": "ProfessionalService",
    "name": "BoomTick",
    "url": "https://boomtick.blog/services",
    "logo": "https://boomtick.blog/images/logo.png",
    "image": "https://boomtick.blog/images/boomtick-services.png",
    "description": "Digital business studio providing custom web design, appointment booking integrations, and workflow automation for independent creative professionals.",
    "priceRange": "$$",
    "email": "Ari@boomtick.blog",
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
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "17:00"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Digital Studio Packages",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Presence Package",
            "description": "Custom mobile-first website build, DNS configuration, and ongoing maintenance care plan."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Booked Package",
            "description": "Custom website build, client booking system integration, custom intake routing, and local SEO configuration."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Studio Growth Package",
            "description": "Comprehensive digital studio setup, e-commerce integration, inquiry routing, and ongoing monthly optimization retainers."
          }
        }
      ]
    }
  }
};

export default function Services() {
  return (
    <Box as="main" width="full" maxWidth="container" marginX="auto" minWidth={0} overflow="x-clip" paddingX={{ base: 4, sm: 6, lg: 8 }} paddingY={12}>
      <SEO
        title="Services & Packages"
        description="Digital business studio providing custom web design, appointment booking integrations, and workflow automation for independent creative professionals."
        schema={serviceSchema}
      />
      {/* Hero Section */}
      <Stack gap={8} width="full" maxWidth="full" minWidth={0} align="center" className="text-center" marginBottom={16}>
        <Text as="h1" variant="display" size="4xl" weight="font-black" uppercase tracking="tight">
          Digital Business Operations for Independent Creatives
        </Text>
        <Text as="p" variant="body" size="lg" color="dim" maxWidth="3xl">
          Fast edge-hosted websites, hands-off booking systems, and automated workflows designed to let you focus on your clients, not your tech stack.
        </Text>
      </Stack>

      {/* Packages Section */}
      <Box marginBottom={16}>
        <PackagesGrid />
      </Box>

      {/* Scope Boundaries */}
      <Box marginBottom={16}>
        <ScopeBoundaries />
      </Box>

      {/* Intake Inquiry Form */}
      <Box marginBottom={16}>
        <IntakeForm />
      </Box>
    </Box>
  );
}
