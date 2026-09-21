// impeccable-ignore-file
// src/components/services/FeatureTabs.tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Globe, Calendar, ShoppingBag, Ticket, TrendingUp, Settings, Check, Lightbulb } from 'lucide-react';
import { Stack, Box, Grid } from '@/layouts/Primitives';

const TABS_DATA = [
  { id: 'website', title: 'Website & Digital Presence', shortTitle: 'Website & Digital Presence', icon: <Globe className="w-4 h-4 " /> },
  { id: 'booking', title: 'Booking & Customer Workflows', shortTitle: 'Booking & Workflows', icon: <Calendar className="w-4 h-4 " /> },
  { id: 'ecommerce', title: 'Ecommerce', shortTitle: 'Ecommerce', icon: <ShoppingBag className="w-4 h-4 " /> },
  { id: 'events', title: 'Events & Experiences', shortTitle: 'Events', icon: <Ticket className="w-4 h-4 " /> },
  { id: 'marketing', title: 'Marketing & Growth', shortTitle: 'Marketing', icon: <TrendingUp className="w-4 h-4 " /> },
  { id: 'automation', title: 'Automation & Integrations', shortTitle: 'Automation', icon: <Settings className="w-4 h-4 " /> },
];

export const FeatureTabs = () => {
  return (
    <Tabs defaultValue="website" className="w-full">
      <Box width="full" paddingBottom={2} border="b" className="overflow-x-auto whitespace-nowrap scrollbar-none border-line">
        <TabsList className="bg-transparent h-auto w-max min-w-full border-none">
          <Stack direction="row" align="center" justify="start">
          {TABS_DATA.map((tab) => (
            <Box as={TabsTrigger}
              key={tab.id}
              value={tab.id}
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-accent data-[state=active]:text-accent rounded-none text-sm text-text-dim hover:text-text-main transition-colors" paddingX={4} paddingY={3}
            >
              <Stack align="center">
                {tab.icon}
                {tab.shortTitle}
              </Stack>
            </Box>
          ))}
        </Stack>
        </TabsList>
      </Box>

      {TABS_DATA.map((tab) => (
        <Box as={TabsContent} key={tab.id} value={tab.id} paddingTop={8}>
          <Grid cols={{ base: 1, md: 12 }} gap={{ base: 8, lg: 12 }}>
            <Stack gap={4} className="md:col-span-4">
              <Box as="h3" className="text-xl font-bold">{tab.title}</Box>
              <Box as="p" className="text-text-dim text-sm leading-relaxed">
                {tab.id === 'website' && "A fast, beautiful website built specifically for independent practitioners. We handle the technical details so your business is easy to find on Google and ready to grow."}
                {tab.id === 'booking' && "Streamline your scheduling process with automated booking workflows that save you time and provide a professional experience for your clients."}
                {tab.id === 'ecommerce' && "Expand your revenue streams by selling physical products, digital goods, or merchandise directly to your audience."}
                {tab.id === 'events' && "Easily manage workshops, retreats, and group classes with integrated ticketing and attendee management."}
                {tab.id === 'marketing' && "Increase your visibility and attract new clients with targeted marketing strategies tailored for creative businesses."}
                {tab.id === 'automation' && "Eliminate manual tasks by connecting your favorite tools and automating repetitive workflows."}
              </Box>
            </Stack>

            <Stack gap={3} className="md:col-span-4">
              {tab.id === 'website' && (
                <>
                  <Stack align="start" gap={3}><Check className="w-5 h-5 text-accent shrink-0" /><Box as="span" className="text-sm text-text-main">Custom website design & development</Box></Stack>
                  <Stack align="start" gap={3}><Check className="w-5 h-5 text-accent shrink-0" /><Box as="span" className="text-sm text-text-main">Mobile-first, responsive design</Box></Stack>
                  <Stack align="start" gap={3}><Check className="w-5 h-5 text-accent shrink-0" /><Box as="span" className="text-sm text-text-main">Portfolio, services, and pricing pages</Box></Stack>
                  <Stack align="start" gap={3}><Check className="w-5 h-5 text-accent shrink-0" /><Box as="span" className="text-sm text-text-main">Domain setup and hosting</Box></Stack>
                  <Stack align="start" gap={3}><Check className="w-5 h-5 text-accent shrink-0" /><Box as="span" className="text-sm text-text-main">SEO foundation for local search</Box></Stack>
                  <Stack align="start" gap={3}><Check className="w-5 h-5 text-accent shrink-0" /><Box as="span" className="text-sm text-text-main">Ongoing maintenance and updates</Box></Stack>
                </>
              )}
              {tab.id !== 'website' && (
                <Box className="text-sm text-text-dim italic">Features list available upon request.</Box>
              )}
            </Stack>

            <Box className="md:col-span-4">
              <Box padding={6} radius="xl" border className="bg-surface/50 border-line">
                <Stack align="center" gap={2} marginBottom={3}>
                  <Lightbulb className="w-5 h-5 text-accent" />
                  <Box as="h4" className="font-semibold text-sm">Real-world example</Box>
                </Stack>
                <Box as="p" className="text-sm text-text-dim leading-relaxed">
                  {tab.id === 'website' && "A stylist can showcase their services, let customers book appointments, and appear in local search results — all from one integrated website."}
                  {tab.id !== 'website' && "Example coming soon."}
                </Box>
              </Box>
            </Box>
          </Grid>
        </Box>
      ))}
    </Tabs>
  );
};
