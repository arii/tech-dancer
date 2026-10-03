import { useState } from 'react';
import { ArrowUpRight, Sparkles, HeartPulse, CheckCircle2 } from 'lucide-react';
import { ASSET_PREFIX } from '@/config/constants';
import { Box, Stack, Text, Button, Grid } from '@/layouts/Primitives';

export interface PortfolioClient {
  id: string;
  name: string;
  category: string;
  industry: 'Creative Studio' | 'Clinical Practice';
  icon: typeof Sparkles;
  headline: string;
  description: string;
  flowSteps: string[];
  features: string[];
  siteUrl: string;
  imgSrc: string;
  altText: string;
}

export const portfolioClients: PortfolioClient[] = [
  {
    id: 'marcella-therapy',
    name: 'Marcella Therapy',
    category: 'Mental Health & Psychotherapy',
    industry: 'Clinical Practice',
    icon: HeartPulse,
    headline: 'High-trust clinical web platform & Cal.com booking sync',
    description: 'We engineered a calm, accessible digital presence for a San Francisco therapy practice with custom Cal.com booking integration, screening intake forms, and local SEO.',
    flowSteps: [
      'Discover Practice',
      'Explore Specialties',
      'Select Consultation Slot',
      'Submit Screening Intake',
      'Automated Calendar Confirmation'
    ],
    features: [
      'Integrated Cal.com 20-min consultation scheduler',
      'Confidential online intake questionnaire',
      'Warm editorial typography & responsive layout',
      'Local schema structured data for Google Search'
    ],
    siteUrl: 'https://marcella-therapy.pages.dev/',
    imgSrc: `${ASSET_PREFIX}/images/creators/marcella-therapy.jpg`,
    altText: 'Marcella Therapy Practice Website & Online Consultation Booking'
  },
  {
    id: 'hair-by-april',
    name: 'Hair by April',
    category: 'Beauty & Solo Creative Studio',
    industry: 'Creative Studio',
    icon: Sparkles,
    headline: 'Mobile-first storefront & direct appointment booking',
    description: 'A mobile-first website for an independent San Francisco hair stylist that brings together services, pricing, appointment booking, and customer intake.',
    flowSteps: [
      'Find Business',
      'Explore Services',
      'Choose Available Time',
      'Submit Information',
      'Instant Confirmation'
    ],
    features: [
      'Mobile-optimized service catalog & pricing',
      'Zero-friction appointment scheduling',
      'Eliminated manual back-and-forth messaging',
      'Direct contact & automated intake workflows'
    ],
    siteUrl: 'https://hairbyapril.pages.dev/',
    imgSrc: `${ASSET_PREFIX}/images/creators/hair-by-april.jpg`,
    altText: 'Hair by April Live Website & Booking System'
  }
];

export const ClientSpotlight = () => {
  const [activeId, setActiveId] = useState<string>('marcella-therapy');
  const activeClient = portfolioClients.find((c) => c.id === activeId) || portfolioClients[0];
  const ActiveIcon = activeClient.icon;

  return (
    <Box
      id="client-spotlight"
      border
      radius="2xl"
      surface="default"
      overflow="hidden"
      padding={{ base: 6, sm: 8, md: 10 }}
      className="border-line/40 bg-surface/40 shadow-sm relative"
    >
      <Stack gap={8} width="full">
        {/* Section Header with Tabs */}
        <Box display="flex" justify="between" align={{ base: 'start', md: 'end' }} wrap gap={4} paddingBottom={6} className="border-b border-line/20">
          <Stack gap={2} className="max-w-2xl">
            <Text variant="mono" size="xs" weight="font-bold" tracking="widest" className="text-accent uppercase">
              Portfolio & Case Studies
            </Text>
            <Text as="h2" variant="headline" size="2xl" weight="font-bold" tracking="wordmark" className="text-main">
              See it in action: Real client platforms
            </Text>
            <Text variant="body" size="sm" color="dim" leading="relaxed">
              From clinical healthcare practices to independent creative studios, explore how tailored digital systems eliminate admin overhead and streamline client bookings.
            </Text>
          </Stack>

          {/* Client Switcher Tabs */}
          <Box display="flex" gap={2} wrap padding={1.5} radius="xl" className="bg-surface/80 border border-line/30 shadow-inner">
            {portfolioClients.map((client) => {
              const isSelected = client.id === activeId;
              const Icon = client.icon;
              return (
                <Box
                  as="button"
                  key={client.id}
                  type="button"
                  onClick={() => setActiveId(client.id)}
                  display="flex"
                  align="center"
                  gap={2}
                  paddingX={4}
                  paddingY={2}
                  radius="lg"
                  className={`text-xs sm:text-sm font-bold transition-all ${
                    isSelected
                      ? 'bg-accent text-slate-950 shadow-sm'
                      : 'text-dim hover:text-main hover:bg-surface-alt/50'
                  }`}
                  aria-pressed={isSelected}
                  aria-label={`View ${client.name} case study`}
                >
                  <Icon size={16} />
                  <span>{client.name}</span>
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Active Client Showcase Grid */}
        <Grid cols={{ base: 1, lg: 12 }} gap={{ base: 8, lg: 10 }} align="center">
          {/* Left Column: Story, Flow & Highlights (7 cols on lg) */}
          <Box className="lg:col-span-7">
            <Stack gap={5}>
              <Stack gap={2}>
                <Box display="flex" align="center" gap={2}>
                  <Box
                    paddingX={2.5}
                    paddingY={0.5}
                    radius="full"
                    display="inline-flex"
                    align="center"
                    gap={1.5}
                    className="bg-accent/10 text-accent text-xs font-semibold uppercase tracking-wider"
                  >
                    <ActiveIcon size={13} />
                    <span>{activeClient.category}</span>
                  </Box>
                </Box>

                <Text as="h3" variant="headline" size="xl" weight="font-bold" tracking="wordmark" className="text-main">
                  {activeClient.headline}
                </Text>

                <Text variant="body" size="sm" color="main" leading="relaxed">
                  {activeClient.description}
                </Text>
              </Stack>

              {/* Step-by-step customer flow */}
              <Box
                border
                radius="lg"
                padding={4}
                surface="default"
                className="border-line/20 bg-surface/80 shadow-xs"
              >
                <Text variant="body" size="tiny" weight="font-semibold" tracking="wider" marginBottom={2.5} className="font-sans uppercase block text-dim">
                  How customers interact:
                </Text>
                <Box display="flex" wrap align="center" gap={1.5} className="text-xs font-medium text-main">
                  {activeClient.flowSteps.map((step, idx) => (
                    <Box key={step} display="flex" align="center" gap={1.5}>
                      <Box as="span" paddingX={2} paddingY={1} radius="sm" className="bg-surface-alt/80 border border-line/20 text-main font-medium">
                        {step}
                      </Box>
                      {idx < activeClient.flowSteps.length - 1 && (
                        <Box as="span" className="text-accent font-bold">→</Box>
                      )}
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Feature Highlights */}
              <Grid cols={{ base: 1, sm: 2 }} gap={2.5} paddingTop={1}>
                {activeClient.features.map((feat) => (
                  <Box key={feat} display="flex" align="start" gap={2} className="text-xs text-dim">
                    <Box as="span" marginTop={0.5} shrink={0} display="inline-flex">
                      <CheckCircle2 size={15} className="text-accent" />
                    </Box>
                    <Text as="span">{feat}</Text>
                  </Box>
                ))}
              </Grid>

              {/* Action Link to Live Client Site */}
              <Box display="flex" align="center" gap={3} paddingTop={2}>
                <Button
                  as="a"
                  href={activeClient.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="md"
                  className="shadow-sm font-semibold"
                >
                  <span>Visit live {activeClient.name} site</span>
                  <Box as="span" marginLeft={1.5}><ArrowUpRight size={15} /></Box>
                </Button>
              </Box>
            </Stack>
          </Box>

          {/* Right Column: High-Res Interactive Visual Canvas (5 cols on lg) */}
          <Box className="lg:col-span-5" display="flex" align="center" justify="center" width="full">
            <Box
              border
              radius="xl"
              overflow="hidden"
              surface="sunken"
              className="border-line/40 shadow-lg relative bg-surface-alt w-full group"
            >
              <Box overflow="hidden" position="relative" width="full" aspect="16/10">
                <img
                  src={activeClient.imgSrc}
                  alt={activeClient.altText}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                <Box className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <Box
                  position="absolute"
                  display="flex"
                  align="center"
                  justify="between"
                  paddingX={2}
                  paddingY={1}
                  radius="md"
                  className="bottom-3 left-3 right-3 pointer-events-none text-white text-xs font-medium bg-black/60 backdrop-blur-md"
                >
                  <span>{activeClient.name}</span>
                  <span className="opacity-80">Live Production</span>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Stack>
    </Box>
  );
};
