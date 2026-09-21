"use client";

import { useState } from 'react';
import {
  Check,
  ChevronDown,
  Globe,
  ShoppingBag,
  Calendar,
  Sparkles,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';

export interface CoreService {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  imageSrc: string;
  features: string[];
  price?: string;
}

const services: CoreService[] = [
  {
    id: 'digital-presence',
    title: 'Website & Digital Presence',
    description: 'A fast, polished website designed around your work, your customers, and the way your business operates.',
    icon: Globe,
    imageSrc: '/assets/home/wcs-travel-pack.webp',
    features: [
      'Mobile-responsive design',
      'Built to help customers find you through local search',
      'Your own professional domain and secure hosting',
      'Booking, contact, and customer workflows built in',
      'Ongoing updates, maintenance, and technical support',
    ],
    price: 'Starting at $1,500',
  },
  {
    id: 'ecommerce',
    title: 'Ecommerce & Digital Products',
    description: 'Sell products, digital downloads, and commissions directly from your site.',
    icon: ShoppingBag,
    imageSrc: '/assets/home/wcs-travel-pack.webp',
    features: [
      'Merchandise & physical products',
      'Digital downloads & instant delivery',
      'Custom orders & commission inquiries',
      'Streamlined checkout & payment integrations',
    ],
    price: 'Pricing varies based on catalog size',
  },
  {
    id: 'marketing',
    title: 'Marketing & Discovery',
    description: 'Help local clients discover your work and convert into loyal customers.',
    icon: TrendingUp,
    imageSrc: '/assets/home/wcs-travel-pack.webp',
    features: [
      'Local SEO & Google Business Profile',
      'Editorial content & portfolio strategy',
      'Email marketing & subscriber capture',
      'Conversion optimization & site enhancements',
    ],
  },
  {
    id: 'events',
    title: 'Events & Experiences',
    description: 'Run workshops, classes, and creative pop-ups with zero booking friction.',
    icon: Sparkles,
    imageSrc: '/assets/home/wcs-travel-pack.webp',
    features: [
      'Workshop & class scheduling',
      'Online registration & ticketing',
      'Automated attendee communications',
      'Event landing & promotion pages',
    ],
  },
  {
    id: 'automation',
    title: 'Business Automation',
    description: 'Connect your everyday tools and eliminate hours of repetitive admin work.',
    icon: Cpu,
    imageSrc: '/assets/home/wcs-travel-pack.webp',
    features: [
      'Form-to-calendar automated workflows',
      'Lead routing & CRM/spreadsheet sync',
      'Automated client status updates',
      'Custom AI-assisted workflow engines',
    ],
  }
];

export const ModularPackages = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <Stack gap={8} width="full">
      <Box>
        <Text as="h2" variant="headline" size="3xl" weight="font-bold" className="text-main tracking-[0.01em] mb-2">
          Our Core Services
        </Text>
      </Box>

      <Stack gap={4}>
        {services.map((service, index) => {
          const IconComp = service.icon;
          const isExpanded = expandedIndex === index;

          return (
            <Box
              key={service.id}
              border
              radius="2xl"
              surface="default"
              className="border-line/30 bg-surface/60 overflow-hidden shadow-sm"
            >
              {/* Clickable Header */}
              <Box
                className="cursor-pointer p-6 sm:p-8 hover:bg-surface-hover/30 transition-colors"
                onClick={() => toggleAccordion(index)}
              >
                <Box display="flex" justify="between" align="start" gap={4}>
                  {/* Left content */}
                  <Box display="flex" gap={4} className="flex-1">
                    <Box
                      padding={3}
                      radius="xl"
                      className="bg-accent/10 text-accent shrink-0"
                    >
                      <IconComp className="w-6 h-6" />
                    </Box>
                    <Stack gap={2} className="mt-1">
                      <Text as="h3" variant="headline" size="xl" weight="font-bold" className="text-main">
                        {service.title}
                      </Text>
                      <Text variant="body" size="sm" color="dim" className="leading-[1.6]">
                        {service.description}
                      </Text>
                    </Stack>
                  </Box>

                  {/* Right chevron */}
                  <Box className="shrink-0 mt-2">
                    <ChevronDown
                      className={`w-6 h-6 text-dim transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
                    />
                  </Box>
                </Box>
              </Box>

              {/* Expandable Content Area */}
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
              >
                <div className="overflow-hidden">
                  <Box className="p-6 sm:p-8 pt-0">
                    <Grid cols={{ base: 1, md: 2 }} gap={8} className="mt-6">
                      {/* Left: Image */}
                      <Box
                        radius="xl"
                        className="overflow-hidden aspect-video bg-surface-hover/50"
                      >
                        <img
                          src={service.imageSrc}
                          alt={`${service.title} preview`}
                          className="w-full h-full object-cover"
                        />
                      </Box>

                      {/* Right: Checklist */}
                      <Stack gap={4} justify="center">
                        {service.features.map((feature, i) => (
                          <Box key={i} display="flex" align="start">
                            <Check className="w-5 h-5 text-accent mr-3 mt-0.5 shrink-0" />
                            <Text variant="body" size="base" color="main" className="leading-[1.5]">
                              {feature}
                            </Text>
                          </Box>
                        ))}
                      </Stack>
                    </Grid>

                    {/* Pricing Footer */}
                    {service.price && (
                      <Box className="mt-8 pt-6 border-t border-line/20">
                        <Box display="flex" align="center" gap={3}>
                          <Sparkles className="w-5 h-5 text-accent" />
                          <Text variant="headline" size="lg" weight="font-bold" className="text-main">
                            {service.price}
                          </Text>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </div>
              </div>
            </Box>
          );
        })}
      </Stack>
    </Stack>
  );
};

export { ModularPackages as PackagesGrid };
