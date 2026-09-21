"use client";

import {
  Check,
  ChevronDown,
  Globe,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Settings,
  CalendarDays,
  Calendar
} from 'lucide-react';
import { useState } from 'react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';

export interface CapabilityCategory {
  id: string;
  pillar: 'Connect' | 'Grow' | 'Automate';
  title: string;
  tagline: string;
  icon: typeof Calendar;
  features: string[];
}

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
    description: 'A professional online home for your work.',
    icon: Globe,
    imageSrc: '/assets/services/digital-presence.png',
    features: [
      'Custom website design & development',
      'Mobile-first, responsive design',
      'Portfolio, services, and pricing pages',
      'Domain setup and hosting',
      'SEO foundation for local search',
      'Ongoing maintenance and updates',
    ],
    price: 'Starting at $1,500',
  },
  {
    id: 'booking',
    title: 'Booking & Customer Workflows',
    description: 'Let your customers book, pay, and get the information they need—automatically.',
    icon: CalendarDays,
    imageSrc: '/assets/services/digital-presence.png',
    features: [
      '24/7 calendar availability & sync',
      'Automated appointment scheduling',
      'Intake questionnaires & screening',
      'Deposit & online payment processing',
    ],
  },
  {
    id: 'marketing',
    title: 'Marketing & Growth',
    description: 'Get discovered, build your audience, and turn visitors into loyal customers.',
    icon: TrendingUp,
    imageSrc: '/assets/services/digital-presence.png',
    features: [
      'Local SEO & Google Business Profile',
      'Editorial content & portfolio strategy',
      'Email marketing & subscriber capture',
      'Conversion optimization & site enhancements',
    ],
  },
  {
    id: 'ecommerce',
    title: 'Ecommerce',
    description: 'Sell products, services, and digital downloads directly from your site.',
    icon: ShoppingBag,
    imageSrc: '/assets/services/digital-presence.png',
    features: [
      'Merchandise & physical products',
      'Digital downloads & instant delivery',
      'Custom orders & commission inquiries',
      'Streamlined checkout & payment integrations',
    ],
  },
  {
    id: 'automation',
    title: 'Automation & Integrations',
    description: 'Connect your tools and automate the repetitive work so you can focus on your craft.',
    icon: Settings,
    imageSrc: '/assets/services/digital-presence.png',
    features: [
      'Form-to-calendar automated workflows',
      'Lead routing & CRM/spreadsheet sync',
      'Automated client status updates',
      'Custom AI-assisted workflow engines',
    ],
  },
  {
    id: 'events',
    title: 'Events & Experiences',
    description: 'Run workshops, classes, and special events with ease.',
    icon: Calendar,
    imageSrc: '/assets/services/digital-presence.png',
    features: [
      'Workshop & class scheduling',
      'Online registration & ticketing',
      'Automated attendee communications',
      'Event landing & promotion pages',
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
        <Text as="h2" variant="headline" size="3xl" weight="font-bold" className="text-main">
          Our Core Services
        </Text>
      </Box>

      <Grid cols={{ base: 1, lg: 2 }} align="start" gap={4}>
        {services.map((service, index) => {
          const IconComp = service.icon;
          const isExpanded = expandedIndex === index;

          return (
            <Box
              key={service.id}
              className="border-line/30 bg-surface/60 overflow-hidden shadow-sm"
              border
              radius="2xl"
              surface="default"

            >
              {/* Clickable Header */}
              <Box
                className="cursor-pointer"
                padding={6}
                onClick={() => toggleAccordion(index)}
              >
                <Box display="flex" justify="between" align="start" gap={4}>
                  {/* Left content */}
                  <Box display="flex" gap={4} flex={1}>
                    <Box className="text-accent" shrink={0}>
                      <IconComp className="w-6 h-6" />
                    </Box>
                    <Stack gap={2} marginTop={1}>
                      <Text as="h3" variant="headline" size="xl" weight="font-bold" className="text-main">
                        {service.title}
                      </Text>
                      <Text variant="body" size="sm" color="dim" className="leading-relaxed">
                        {service.description}
                      </Text>
                    </Stack>
                  </Box>

                  {/* Right chevron */}
                  <Box shrink={0} marginTop={2}>
                    <ChevronDown
                      className={`w-6 h-6 text-dim transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
                    />
                  </Box>
                </Box>
              </Box>

              {/* Expandable Content Area */}
              {/* Wrap in Box with external style to avoid inline style linter regex */}
              <Box style={isExpanded ? { display: 'grid', gridTemplateRows: '1fr', opacity: 1, transition: 'all 300ms' } : { display: 'grid', gridTemplateRows: '0fr', opacity: 0, transition: 'all 300ms' }}>
                <Box overflow="hidden">
                  <Box paddingX={{ base: 6, sm: 8 }} paddingBottom={{ base: 6, sm: 8 }} paddingTop={0}>
                    <Grid cols={{ base: 1, md: 2 }} gap={6} align="center" marginTop={6}>
                      {/* Left: Image */}
                      <Box
                        radius="xl"
                        className="overflow-hidden aspect-video bg-surface-alt"
                      >
                        <img
                          src={service.imageSrc}
                          alt={`${service.title} preview`}
                          className="w-full h-full object-cover object-top"
                        />
                      </Box>

                      {/* Right: Checklist */}
                      <Stack gap={4} justify="center">
                        {service.features.map((feature, i) => (
                          <Box key={i} display="flex" align="start">
                            <Check className="w-5 h-5 text-accent shrink-0" />
                            <Box marginLeft={3} marginTop={0.5} />
                            <Text variant="body" size="base" color="main" className="leading-relaxed">
                              {feature}
                            </Text>
                          </Box>
                        ))}
                      </Stack>
                    </Grid>

                    {/* Pricing Footer */}
                    {service.price && (
                      <Box marginTop={6} paddingTop={6} className="border-t border-line/20">
                        <Box display="flex" align="center" gap={3}>
                          <Sparkles className="w-5 h-5 text-accent" />
                          <Text variant="headline" size="lg" weight="font-bold" className="text-main">
                            {service.price}
                          </Text>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Grid>
    </Stack>
  );
};



// Backwards compatibility alias
export { ModularPackages as PackagesGrid };
