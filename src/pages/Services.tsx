import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { BookingModal } from '@/features/services/BookingModal';
import { ClientSpotlight } from '@/features/services/ClientSpotlight';
import { IntakeForm } from '@/features/services/IntakeForm';
import { PackagesGrid } from '@/features/services/Packages';
import { Box, Stack, Text, Button } from '@/layouts/Primitives';
import { CONSULTING_SERVICE_SCHEMA, FOUNDER_PERSON_SCHEMA } from '@/config/constants';

const serviceSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://boomtick.blog/services/#webpage",
      "url": "https://boomtick.blog/services",
      "name": "Web Design, Intake Automation & Digital Systems | Ariel Anders Consulting",
      "description": "High-performance websites, automated booking & intake workflows, local SEO, custom AI applications, and cloud architecture for service businesses, private practices, and independent creators.",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://boomtick.blog"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": "https://boomtick.blog/services"
          }
        ]
      },
      "mainEntity": {
        "@id": "https://boomtick.blog/#consulting"
      },
      "workExample": [
        {
          "@type": "WebSite",
          "name": "Marcella Therapy",
          "url": "https://marcella-therapy.pages.dev/",
          "description": "Private psychotherapy practice platform with Cal.com integration and screening intake."
        },
        {
          "@type": "WebSite",
          "name": "Hair by April",
          "url": "https://hairbyapril.pages.dev/",
          "description": "Mobile-first booking and service showcase for an independent salon creative."
        }
      ]
    },
    CONSULTING_SERVICE_SCHEMA,
    FOUNDER_PERSON_SCHEMA
  ]
};

const Services = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <Box width="full" maxWidth="container" marginX="auto" minWidth={0} overflow="x-clip" paddingX={{ base: 4, sm: 6, lg: 8 }} paddingY={12}>
      <SEO
        title="Web Design & Digital Systems for San Francisco Creatives"
        description="High-performance websites, automated booking & intake workflows, local SEO, custom AI applications, and cloud architecture for service businesses, private practices, and independent creators."
        schema={serviceSchema}
      />

      {/* 1. Header Section */}
      <Stack gap={5} width="full" maxWidth="4xl" align="center" marginX="auto" marginBottom={16} className="text-center">
        <Text as="h1" variant="display" size="3xl" weight="font-black" tracking="wordmark">
          Ariel Anders Consulting: Digital business systems for independent creatives
        </Text>

        <Text as="p" variant="body" size="lg" color="main" leading="relaxed" className="font-medium max-w-3xl">
          I build and manage the digital side of your business—from custom web design and automated client intake to local SEO, custom AI tools, and cloud infrastructure.
        </Text>

        <Stack direction={{ base: 'col', sm: 'row' }} gap={3} justify="center" align="center" paddingTop={2}>
          <Button
            as="a"
            href="#consultation"
            variant="primary"
            size="lg"
            className="shadow-md font-semibold"
          >
            Request Consultation →
          </Button>
          <Button
            type="button"
            onClick={() => setIsBookingModalOpen(true)}
            variant="outline"
            size="lg"
            className="shadow-md font-semibold"
          >
            <Stack direction="row" align="center" justify="center" gap={2}>
              <Calendar size={18} />
              <span>Book Discovery Call</span>
            </Stack>
          </Button>
        </Stack>
      </Stack>

      <Stack gap={16} width="full">
        {/* 2. Platform Foundation & Connected Capabilities */}
        <Box>
          <PackagesGrid />
        </Box>

        {/* 3. Real Client Proof: Dual Portfolio Showcase (Marcella Therapy & Hair by April) */}
        <Box>
          <ClientSpotlight />
        </Box>

        {/* 4. Dedicated Next Steps Consultation & Ongoing Management Intake */}
        <Box id="consultation" paddingTop={4}>
          <IntakeForm onOpenBookingModal={() => setIsBookingModalOpen(true)} />
        </Box>
      </Stack>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </Box>
  );
};

export default Services;
