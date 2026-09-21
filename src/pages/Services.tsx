import { CheckCircle2, Sparkles } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { CaseStudySpotlight } from '@/features/services/CaseStudySpotlight';
import { IntakeForm } from '@/features/services/IntakeForm';
import { PackagesGrid, ScopeBoundaries } from '@/features/services/Packages';
import { Box, Stack, Text } from '@/layouts/Primitives';

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://boomtick.blog/services/#webpage",
  "url": "https://boomtick.blog/services",
  "name": "Services & Packages | BoomTick",
  "description": "Digital business studio providing custom web engineering, Google Business Profile optimization, Google Shopping merchandise feeds, 24/7 appointment scheduling, and automated client workflows.",
  "provider": {
    "@type": "Organization",
    "@id": "https://boomtick.blog/#organization"
  },
  "mainEntity": {
    "@type": "ProfessionalService",
    "name": "BoomTick",
    "url": "https://boomtick.blog/services",
    "logo": "https://boomtick.blog/favicon.ico",
    "description": "Digital business studio providing custom web engineering, Google Business Profile optimization, Google Shopping merchandise feeds, 24/7 appointment scheduling, and automated client workflows.",
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
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Digital Studio Packages",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Presence Package",
            "description": "Custom mobile-first website build, Google Business Profile optimization, rich schema markup, and mailing list integration."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Booked Package",
            "description": "Custom website build, 24/7 online calendar booking integration, custom intake routing, and local SEO configuration."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Studio Growth Package",
            "description": "Comprehensive digital studio setup, automated Google Shopping & Merchant Center product feeds, e-commerce integration, and monthly optimization retainers."
          }
        }
      ]
    }
  }
};

const Services = () => {
  return (
    <Box width="full" maxWidth="container" marginX="auto" minWidth={0} overflow="x-clip" paddingX={{ base: 4, sm: 6, lg: 8 }} paddingY={12}>
      <SEO
        title="Services & Packages"
        description="Digital business studio providing custom web engineering, Google Business Profile optimization, Google Shopping merchandise feeds, 24/7 appointment scheduling, and automated client workflows."
        schema={serviceSchema}
      />

      {/* 1. Hero Section */}
      <Stack gap={6} width="full" maxWidth="full" minWidth={0} align="center" className="text-center" marginBottom={16}>
        <Box
          paddingX={3.5}
          paddingY={1}
          radius="full"
          border
          className="border-accent/40 bg-accent/10 text-accent font-mono text-xs font-bold flex items-center gap-2 shadow-sm"
        >
          <Sparkles size={13} className="text-accent" />
          <span>DIGITAL BUSINESS STUDIO & AUTOMATION</span>
        </Box>

        <Text as="h1" variant="display" size="4xl" weight="font-black" uppercase tracking="tight" className="max-w-4xl">
          Digital Operations & Online Booking for Independent Creatives
        </Text>

        <Text as="p" variant="body" size="lg" color="dim" maxWidth="3xl">
          Lightning-fast web engineering, 24/7 hands-off calendar scheduling, Google Business search optimization, and automated Google Shopping merchandise feeds.
        </Text>

        {/* Core capability pills */}
        <Box display="flex" wrap justify="center" gap={2.5} className="pt-2">
          <Box paddingX={3} paddingY={1} radius="full" border className="border-line/40 bg-surface/80 text-dim text-xs font-mono flex items-center gap-1.5 shadow-sm">
            <CheckCircle2 size={12} className="text-accent" />
            <span>Google Business Profile</span>
          </Box>
          <Box paddingX={3} paddingY={1} radius="full" border className="border-line/40 bg-surface/80 text-dim text-xs font-mono flex items-center gap-1.5 shadow-sm">
            <CheckCircle2 size={12} className="text-accent-sky" />
            <span>Google Shopping Feeds</span>
          </Box>
          <Box paddingX={3} paddingY={1} radius="full" border className="border-line/40 bg-surface/80 text-dim text-xs font-mono flex items-center gap-1.5 shadow-sm">
            <CheckCircle2 size={12} className="text-success" />
            <span>24/7 Calendar Sync</span>
          </Box>
          <Box paddingX={3} paddingY={1} radius="full" border className="border-line/40 bg-surface/80 text-dim text-xs font-mono flex items-center gap-1.5 shadow-sm">
            <CheckCircle2 size={12} className="text-accent-purple" />
            <span>Mailing List & Inquiries</span>
          </Box>
        </Box>
      </Stack>

      {/* 2. Case Study Spotlight (Lead with Proof First: Hair by April Live GIF + Production Workflow) */}
      <Box marginBottom={16}>
        <CaseStudySpotlight />
      </Box>

      {/* 3. Scope Boundaries (Trust & Boundary Block) */}
      <Box marginBottom={16}>
        <ScopeBoundaries />
      </Box>

      {/* 4. Packages & Pricing (Single Source of Truth for What's Included) */}
      <Box marginBottom={16}>
        <PackagesGrid />
      </Box>

      {/* 5. Intake Inquiry Form */}
      <Box marginBottom={16}>
        <IntakeForm />
      </Box>
    </Box>
  );
};

export default Services;
