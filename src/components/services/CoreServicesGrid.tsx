// impeccable-ignore-file
// src/components/services/CoreServicesGrid.tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Globe, Calendar, ShoppingBag, Ticket, TrendingUp, Settings } from 'lucide-react';
import { Stack, Box, Grid } from '@/layouts/Primitives';

const SERVICES = [
  { id: 'website', title: 'Website & Digital Presence', icon: <Globe className="w-5 h-5 text-accent" /> },
  { id: 'booking', title: 'Booking & Customer Workflows', icon: <Calendar className="w-5 h-5 text-accent" /> },
  { id: 'ecommerce', title: 'Ecommerce', icon: <ShoppingBag className="w-5 h-5 text-accent" /> },
  { id: 'events', title: 'Events & Experiences', icon: <Ticket className="w-5 h-5 text-accent" /> },
  { id: 'marketing', title: 'Marketing & Growth', icon: <TrendingUp className="w-5 h-5 text-accent" /> },
  { id: 'automation', title: 'Automation & Integrations', icon: <Settings className="w-5 h-5 text-accent" /> },
];

export const CoreServicesGrid = () => {
  return (
    // items-start is critical here so collapsed accordions don't stretch to match expanded ones
    <Grid as={Accordion} cols={{ base: 1, lg: 2 }} gap={6} align="start"
      type="single"
      collapsible
      defaultValue="website"
    >
      {SERVICES.map((service) => (
        <Box as={AccordionItem}
          key={service.id}
          value={service.id}
          className="bg-surface/50 overflow-hidden data-[state=open]:border-line" radius="xl" paddingX={6} paddingY={2} border
        >
          <AccordionTrigger className="hover:no-underline text-lg font-semibold">
            <Stack align="center" gap={3}>
              {service.icon}
              {service.title}
            </Stack>
          </AccordionTrigger>
          <Box as={AccordionContent} paddingTop={4} paddingBottom={6} className="text-text-main">
            {service.id === 'website' && (
              <Stack gap={4}>
                <Box as="p">A professional online home for your work.</Box>
                <Stack direction={{ base: "col", sm: "row" }} gap={6}>
                  <Box width="full" shrink={0} className="sm:w-1/2">
                    <img src="/assets/services/digital-presence.png" alt="Website preview" className="w-full rounded-md" />
                  </Box>
                  <Stack as="ul" gap={2} width="full" className="text-sm sm:w-1/2">
                    <Stack as="li" align="center" gap={2}>✓ Custom website design & development</Stack>
                    <Stack as="li" align="center" gap={2}>✓ Mobile-first, responsive design</Stack>
                    <Stack as="li" align="center" gap={2}>✓ Portfolio, services, and pricing pages</Stack>
                    <Stack as="li" align="center" gap={2}>✓ Domain setup and hosting</Stack>
                    <Stack as="li" align="center" gap={2}>✓ SEO foundation for local search</Stack>
                    <Stack as="li" align="center" gap={2}>✓ Ongoing maintenance and updates</Stack>
                    <Stack as="li" align="center" gap={2} marginTop={4} paddingTop={4} border="t" className="border-line text-accent font-semibold"><span className="text-xl">✨</span> Starting at $1,500</Stack>
                  </Stack>
                </Stack>
              </Stack>
            )}
            {service.id === 'booking' && (
              <Stack gap={4}>
                <Box as="p">Let your customers book, pay, and get the information they need—automatically.</Box>
                <Stack as="ul" gap={2} className="text-sm">
                  <Stack as="li" align="center" gap={2}>✓ 24/7 calendar availability & sync</Stack>
                  <Stack as="li" align="center" gap={2}>✓ Automated appointment scheduling</Stack>
                  <Stack as="li" align="center" gap={2}>✓ Intake questionnaires & screening</Stack>
                  <Stack as="li" align="center" gap={2}>✓ Deposit & online payment processing</Stack>
                </Stack>
              </Stack>
            )}
            {service.id === 'ecommerce' && (
              <Stack gap={4}>
                <Box as="p">Sell products, services, and digital downloads directly from your site.</Box>
                <Stack as="ul" gap={2} className="text-sm">
                  <Stack as="li" align="center" gap={2}>✓ Merchandise & physical products</Stack>
                  <Stack as="li" align="center" gap={2}>✓ Digital downloads & instant delivery</Stack>
                  <Stack as="li" align="center" gap={2}>✓ Custom orders & commission inquiries</Stack>
                  <Stack as="li" align="center" gap={2}>✓ Streamlined checkout & payment integrations</Stack>
                </Stack>
              </Stack>
            )}
            {service.id === 'events' && (
              <Stack gap={4}>
                <Box as="p">Run workshops, classes, and special events with ease.</Box>
                <Stack as="ul" gap={2} className="text-sm">
                  <Stack as="li" align="center" gap={2}>✓ Workshop & class scheduling</Stack>
                  <Stack as="li" align="center" gap={2}>✓ Online registration & ticketing</Stack>
                  <Stack as="li" align="center" gap={2}>✓ Automated attendee communications</Stack>
                  <Stack as="li" align="center" gap={2}>✓ Event landing & promotion pages</Stack>
                </Stack>
              </Stack>
            )}
            {service.id === 'marketing' && (
              <Stack gap={4}>
                <Box as="p">Get discovered, build your audience, and turn visitors into loyal customers.</Box>
                <Stack as="ul" gap={2} className="text-sm">
                  <Stack as="li" align="center" gap={2}>✓ Local SEO & Google Business Profile</Stack>
                  <Stack as="li" align="center" gap={2}>✓ Editorial content & portfolio strategy</Stack>
                  <Stack as="li" align="center" gap={2}>✓ Email marketing & subscriber capture</Stack>
                  <Stack as="li" align="center" gap={2}>✓ Conversion optimization & site enhancements</Stack>
                </Stack>
              </Stack>
            )}
            {service.id === 'automation' && (
              <Stack gap={4}>
                <Box as="p">Connect your tools and automate the repetitive work so you can focus on your craft.</Box>
                <Stack as="ul" gap={2} className="text-sm">
                  <Stack as="li" align="center" gap={2}>✓ Form-to-calendar automated workflows</Stack>
                  <Stack as="li" align="center" gap={2}>✓ Lead routing & CRM/spreadsheet sync</Stack>
                  <Stack as="li" align="center" gap={2}>✓ Automated client status updates</Stack>
                  <Stack as="li" align="center" gap={2}>✓ Custom AI-assisted workflow engines</Stack>
                </Stack>
              </Stack>
            )}
          </Box>
        </Box>
      ))}
    </Grid>
  );
};
