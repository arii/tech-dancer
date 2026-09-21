import { Check, Calendar, ShoppingBag, Sparkles, TrendingUp, Cpu } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';

export interface CapabilityCategory {
  id: string;
  pillar: 'Connect' | 'Grow' | 'Automate';
  title: string;
  tagline: string;
  icon: typeof Calendar;
  features: string[];
}

const foundationFeatures = [
  'Mobile-responsive design',
  'Built to help customers find you through local search',
  'Your own professional domain and secure hosting',
  'Booking, contact, and customer workflows built in',
  'Ongoing updates, maintenance, and technical support',
];

const capabilityCategories: CapabilityCategory[] = [
  {
    id: 'booking-workflows',
    pillar: 'Connect',
    title: 'Booking & Customer Workflows',
    tagline: 'Appointments, inquiries, calendars, and automated customer communication.',
    icon: Calendar,
    features: [
      '24/7 calendar availability & sync',
      'Automated appointment scheduling',
      'Intake questionnaires & screening',
      'Deposit & online payment processing',
    ],
  },
  {
    id: 'ecommerce',
    pillar: 'Connect',
    title: 'Ecommerce & Digital Products',
    tagline: 'Sell products, digital downloads, and commissions directly from your site.',
    icon: ShoppingBag,
    features: [
      'Merchandise & physical products',
      'Digital downloads & instant delivery',
      'Custom orders & commission inquiries',
      'Streamlined checkout & payment integrations',
    ],
  },
  {
    id: 'marketing',
    pillar: 'Grow',
    title: 'Marketing & Discovery',
    tagline: 'Help local clients discover your work and convert into loyal customers.',
    icon: TrendingUp,
    features: [
      'Local SEO & Google Business Profile',
      'Editorial content & portfolio strategy',
      'Email marketing & subscriber capture',
      'Conversion optimization & site enhancements',
    ],
  },
  {
    id: 'events',
    pillar: 'Grow',
    title: 'Events & Experiences',
    tagline: 'Run workshops, classes, and creative pop-ups with zero booking friction.',
    icon: Sparkles,
    features: [
      'Workshop & class scheduling',
      'Online registration & ticketing',
      'Automated attendee communications',
      'Event landing & promotion pages',
    ],
  },
  {
    id: 'automation',
    pillar: 'Automate',
    title: 'Business Automation',
    tagline: 'Connect your everyday tools and eliminate hours of repetitive admin work.',
    icon: Cpu,
    features: [
      'Form-to-calendar automated workflows',
      'Lead routing & CRM/spreadsheet sync',
      'Automated client status updates',
      'Custom AI-assisted workflow engines',
    ],
  },
];

export const ModularPackages = () => {
  return (
    <Stack gap={16} width="full">
      {/* 1. Build your digital foundation */}
      <Box
        border
        radius="2xl"
        padding={{ base: 6, sm: 8, md: 10 }}
        surface="default"
        className="border-accent/40 bg-surface/60 shadow-lg shadow-accent/5"
      >
        <Stack gap={6}>
          {/* Header Row: Title on Left, Price at Top Right */}
          <Box display="flex" justify="between" align="start" wrap gap={4} className="border-b border-line/30 pb-6">
            <Stack gap={2}>
              <Text as="h2" variant="headline" size="2xl" weight="font-bold" className="text-main tracking-[0.01em]">
                Build your digital foundation
              </Text>
            </Stack>

            <Box className="text-left sm:text-right shrink-0">
              <Text variant="body" size="xs" weight="font-semibold" className="text-[11px] tracking-wider text-dim/80 uppercase font-sans mb-1 block">
                Starting Setup
              </Text>
              <Text variant="headline" size="3xl" weight="font-bold" className="text-main tracking-[0.01em]">
                $1,500
              </Text>
            </Box>
          </Box>

          {/* Description & Feature Grid spanning across the card */}
          <Stack gap={6} width="full">
            <Text variant="body" size="base" color="dim" className="leading-[1.65] max-w-4xl">
              A fast, polished website designed around your work, your customers, and the way your business operates. We handle the technical details so you can focus on your craft.
            </Text>

            {/* Feature Grid spanning wide */}
            <Grid cols={{ base: 1, sm: 2 }} gap={4}>
              {foundationFeatures.map((feat) => (
                <Box key={feat} display="flex" align="start">
                  <Check className="w-4 h-4 text-accent mr-3 mt-0.5 shrink-0" />
                  <Text variant="body" size="sm" color="main" className="leading-[1.5]">{feat}</Text>
                </Box>
              ))}
            </Grid>
          </Stack>
        </Stack>
      </Box>

      {/* 2. Connect, Grow & Automate (Structured Capabilities) */}
      <Stack gap={6}>
        <Box>
          <Text as="h2" variant="headline" size="2xl" weight="font-bold" className="text-main tracking-[0.01em]">
            Connect, grow & automate your business
          </Text>
        </Box>

        <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={6}>
          {capabilityCategories.map((cat) => {
            const IconComp = cat.icon;
            return (
              <Box
                key={cat.id}
                border
                radius="xl"
                padding={6}
                surface="default"
                className="border-line/30 bg-surface/40 flex flex-col justify-between hover:border-line/60 transition-colors h-full"
              >
                <Stack gap={4}>
                  <Box display="flex" justify="between" align="center">
                    <Box display="flex" align="center" gap={3}>
                      <Box
                        padding={2}
                        radius="lg"
                        className="bg-accent/10 text-accent"
                      >
                        <IconComp className="w-5 h-5" />
                      </Box>
                      <Text as="h3" variant="headline" size="base" weight="font-bold" className="text-main tracking-[0.01em]">
                        {cat.title}
                      </Text>
                    </Box>
                  </Box>

                  <Text variant="body" size="xs" color="dim" className="leading-[1.6] min-h-[36px]">
                    {cat.tagline}
                  </Text>

                  <Stack gap={2} className="pt-2 border-t border-line/20">
                    {cat.features.map((feature) => (
                      <Box key={feature} display="flex" align="start" className="text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent/60 mr-2.5 mt-1.5 shrink-0" />
                        <Text variant="body" size="xs" color="main" className="leading-[1.5]">
                          {feature}
                        </Text>
                      </Box>
                    ))}
                  </Stack>
                </Stack>
              </Box>
            );
          })}
        </Grid>
      </Stack>
    </Stack>
  );
};

// Backwards compatibility alias
export { ModularPackages as PackagesGrid };
