// impeccable-ignore-file
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { Globe, CalendarDays, ShoppingBag, TrendingUp, Settings, Calendar } from 'lucide-react';

export const FeatureTabs = () => {
  return (
    <Box width="full">
      <Tabs defaultValue="digital-presence">
        <Box
          overflowX="auto"
          paddingBottom={2}
          className="no-scrollbar"
        >
          <TabsList className="min-w-max">
            <TabsTrigger value="digital-presence">Website & Digital Presence</TabsTrigger>
            <TabsTrigger value="booking">Booking & Customer Workflows</TabsTrigger>
            <TabsTrigger value="ecommerce">Ecommerce</TabsTrigger>
            <TabsTrigger value="marketing">Marketing & Growth</TabsTrigger>
            <TabsTrigger value="automation">Automation & Integrations</TabsTrigger>
            <TabsTrigger value="events">Events & Experiences</TabsTrigger>
          </TabsList>
        </Box>

        <Box marginTop={6}>
          <TabsContent value="digital-presence" className="m-0">
            <Stack gap={4} surface="alt" padding={6} radius="lg" border="x">
              <Stack direction="row" gap={3} align="center">
                <Globe className="w-5 h-5 text-accent" />
                <Text size="lg" weight="semibold">Website & Digital Presence</Text>
              </Stack>
              <Text color="dim">
                A professional online home for your work. Includes custom website design & development, mobile-first responsive design, portfolio/services/pricing pages, domain setup and hosting, SEO foundation for local search, and ongoing maintenance and updates.
              </Text>
            </Stack>
          </TabsContent>

          <TabsContent value="booking" className="m-0">
            <Stack gap={4} surface="alt" padding={6} radius="lg" border="x">
              <Stack direction="row" gap={3} align="center">
                <CalendarDays className="w-5 h-5 text-accent" />
                <Text size="lg" weight="semibold">Booking & Customer Workflows</Text>
              </Stack>
              <Text color="dim">
                Let your customers book, pay, and get the information they need—automatically. Includes 24/7 calendar availability & sync, automated appointment scheduling, intake questionnaires & screening, and deposit & online payment processing.
              </Text>
            </Stack>
          </TabsContent>

          <TabsContent value="ecommerce" className="m-0">
            <Stack gap={4} surface="alt" padding={6} radius="lg" border="x">
              <Stack direction="row" gap={3} align="center">
                <ShoppingBag className="w-5 h-5 text-accent" />
                <Text size="lg" weight="semibold">Ecommerce</Text>
              </Stack>
              <Text color="dim">
                Sell products, services, and digital downloads directly from your site. Includes merchandise & physical products, digital downloads & instant delivery, custom orders & commission inquiries, and streamlined checkout & payment integrations.
              </Text>
            </Stack>
          </TabsContent>

          <TabsContent value="marketing" className="m-0">
            <Stack gap={4} surface="alt" padding={6} radius="lg" border="x">
              <Stack direction="row" gap={3} align="center">
                <TrendingUp className="w-5 h-5 text-accent" />
                <Text size="lg" weight="semibold">Marketing & Growth</Text>
              </Stack>
              <Text color="dim">
                Get discovered, build your audience, and turn visitors into loyal customers. Includes local SEO & Google Business Profile support, editorial content & portfolio strategy, email marketing & subscriber capture, and conversion optimization & site enhancements.
              </Text>
            </Stack>
          </TabsContent>

          <TabsContent value="automation" className="m-0">
            <Stack gap={4} surface="alt" padding={6} radius="lg" border="x">
              <Stack direction="row" gap={3} align="center">
                <Settings className="w-5 h-5 text-accent" />
                <Text size="lg" weight="semibold">Automation & Integrations</Text>
              </Stack>
              <Text color="dim">
                Connect your tools and automate the repetitive work so you can focus on your craft. Includes form-to-calendar automated workflows, lead routing & CRM/spreadsheet sync, automated client status updates, and custom AI-assisted workflow engines.
              </Text>
            </Stack>
          </TabsContent>

          <TabsContent value="events" className="m-0">
            <Stack gap={4} surface="alt" padding={6} radius="lg" border="x">
              <Stack direction="row" gap={3} align="center">
                <Calendar className="w-5 h-5 text-accent" />
                <Text size="lg" weight="semibold">Events & Experiences</Text>
              </Stack>
              <Text color="dim">
                Run workshops, classes, and special events with ease. Includes workshop & class scheduling, online registration & ticketing, automated attendee communications, and event landing & promotion pages.
              </Text>
            </Stack>
          </TabsContent>
        </Box>
      </Tabs>
    </Box>
  );
};
