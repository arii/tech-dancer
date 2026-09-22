// impeccable-ignore-file
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { Globe, CalendarDays, ShoppingBag, Calendar, TrendingUp, Settings, Check, Sparkles } from 'lucide-react';

const SERVICES = [
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
    imageSrc: '/assets/services/booking.gif',
    features: [
      '24/7 calendar availability & sync',
      'Automated appointment scheduling',
      'Intake questionnaires & screening',
      'Deposit & online payment processing',
    ],
  },
  {
    id: 'ecommerce',
    title: 'Ecommerce',
    description: 'Sell products, services, and digital downloads directly from your site.',
    icon: ShoppingBag,
    imageSrc: '/assets/services/ecommerce.png',
    features: [
      'Merchandise & physical products',
      'Digital downloads & instant delivery',
      'Custom orders & commission inquiries',
      'Streamlined checkout & payment integrations',
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
  },
  {
    id: 'marketing',
    title: 'Marketing & Growth',
    description: 'Get discovered, build your audience, and turn visitors into loyal customers.',
    icon: TrendingUp,
    imageSrc: '/assets/services/mobile.png',
    features: [
      'Local SEO & Google Business Profile',
      'Editorial content & portfolio strategy',
      'Email marketing & subscriber capture',
      'Conversion optimization & site enhancements',
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
  }
];

export const CoreServicesGrid = () => {
  return (
    // items-start is critical here so collapsed accordions don't stretch to match expanded ones
    <Grid cols={{ base: 1, lg: 2 }} gap={6} align="start" asChild>
      <Accordion
        type="single"
        collapsible
        defaultValue="digital-presence"
      >
        {SERVICES.map((service) => {
          const Icon = service.icon;

          return (
            <Box key={service.id} asChild paddingX={6} paddingY={2} radius="xl" className="border border-line/30 bg-surface/60 overflow-hidden shadow-sm">
              <AccordionItem
                value={service.id}
              >
                <AccordionTrigger className="hover:no-underline">
                  <Stack direction="row" align="start" gap={3}>
                <Box className="text-accent" shrink={0}>
                  <Icon className="w-6 h-6" />
                </Box>
                <Stack gap={1} className="text-left mt-1">
                  <Text as="h3" variant="headline" size="xl" weight="font-bold" className="text-main">
                    {service.title}
                  </Text>
                  <Text variant="body" size="sm" color="dim" className="leading-relaxed font-normal">
                    {service.description}
                  </Text>
                </Stack>
              </Stack>
            </AccordionTrigger>
            <AccordionContent>
              <Box paddingTop={2} paddingBottom={6} paddingX={{ base: 2, sm: 4 }}>
                <Grid cols={{ base: 1, md: 2 }} gap={6} align="center" marginTop={2}>
                  {/* Left: Image */}
                  <Box radius="xl" className="overflow-hidden aspect-video bg-surface-alt">
                    <img
                      src={service.imageSrc}
                      alt={`${service.title} preview`}
                      loading="lazy"
                      className="w-full h-full object-cover object-top"
                    />
                  </Box>

                {/* Right: Checklist */}
                <Stack gap={4} justify="center">
                  {service.features.map((feature, i) => (
                    <Box key={i} display="flex" align="start" gap={2}>
                      <Check className="w-5 h-5 text-accent shrink-0" />
                      <Text variant="body" size="base" color="main" className="leading-relaxed">
                        {feature}
                      </Text>
                    </Box>
                  ))}
                </Stack>
              </Grid>

                {/* Pricing Footer */}
                {service.price && (
                  <Box marginTop={6} paddingTop={4} className="border-t border-line/20">
                    <Box display="flex" align="center" gap={3}>
                      <Sparkles className="w-5 h-5 text-accent" />
                      <Text variant="headline" size="lg" weight="font-bold" className="text-main">
                        {service.price}
                      </Text>
                    </Box>
                  </Box>
                )}
              </Box>
            </AccordionContent>
          </AccordionItem>
          </Box>
        );
      })}
      </Accordion>
    </Grid>
  );
};
