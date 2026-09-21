import { ArrowUpRight, Lock } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { ASSET_PREFIX } from '@/config/constants';
import { Box, Stack, Text, Button, Grid } from '@/layouts/Primitives';

export const CaseStudySpotlight = () => {
  const gifSrc = `${ASSET_PREFIX}/images/services/hair-by-april-booking.gif`;

  return (
    <Box
      id="case-study"
      border
      radius="2xl"
      surface="default"
      overflow="hidden"
      padding={{ base: 6, sm: 8, md: 10 }}
      className="border-line/40 bg-surface/60 shadow-lg relative"
    >
      <Stack gap={8}>
        {/* Section Header */}
        <Stack gap={2}>
          <Text as="h2" variant="headline" size="3xl" weight="font-bold">
            Case Study: Hair by April
          </Text>
          <Text variant="body" size="lg" color="dim" maxWidth="3xl">
            How a San Francisco curly hair specialist moved from manual Instagram DMs to automated client scheduling.
          </Text>
        </Stack>

        {/* Main Content Grid: Story & Contrast on left, Live Recording Preview on right */}
        <Grid cols={{ base: 1, lg: 12 }} gap={8} align="center">
          {/* Left Column: Problem & True Solution Built */}
          <Box className="lg:col-span-5">
            <Stack gap={6}>
              {/* Before & After comparison card */}
              <Grid cols={{ base: 1, sm: 2 }} gap={4}>
                <Stack surface="sunken" radius="xl" border padding={4} gap={2} className="border-line/40 bg-surface-alt/40">
                  <Text variant="mono" size="xs" weight="font-bold" color="error" uppercase>
                    The Friction Before
                  </Text>
                  <Text variant="body" size="xs" color="dim">
                    Coordinating open time slots over direct messages and texting consultation details manually.
                  </Text>
                </Stack>
                <Stack surface="sunken" radius="xl" border padding={4} gap={2} className="border-line/40 bg-surface-alt/40">
                  <Text variant="mono" size="xs" weight="font-bold" color="main" uppercase>
                    The Solution Built
                  </Text>
                  <Text variant="body" size="xs" color="main">
                    A mobile-first website where clients book directly onto the calendar with instant confirmations.
                  </Text>
                </Stack>
              </Grid>

              {/* Action link */}
              <Box display="flex" align="center" gap={4} className="pt-2">
                <Button
                  as="a"
                  href="https://hairbyapril.pages.dev"
                  target="_blank"
                  rel="noopener"
                  variant="primary"
                  size="lg"
                  className="shadow-md"
                >
                  Visit Live Client Site <ArrowUpRight size={15} className="ml-1" />
                </Button>
              </Box>
            </Stack>
          </Box>

          {/* Right Column: Live Interactive GIF in Polished Browser Frame */}
          <Box className="lg:col-span-7">
            <Box
              border
              radius="2xl"
              overflow="hidden"
              surface="sunken"
              className="border-line/40 shadow-xl relative group bg-surface"
            >
              {/* Browser Chrome Bar */}
              <Box
                paddingX={4}
                paddingY={2.5}
                border="b"
                surface="default"
                display="flex"
                align="center"
                justify="between"
                className="border-line/30 bg-surface/90"
              >
                <Box display="flex" align="center" gap={1.5}>
                  <Box width={2.5} height={2.5} radius="full" className="bg-error/60" />
                  <Box width={2.5} height={2.5} radius="full" className="bg-brand-amber/60" />
                  <Box width={2.5} height={2.5} radius="full" className="bg-success/60" />
                </Box>
                <Box
                  paddingX={3}
                  paddingY={1}
                  radius="md"
                  surface="sunken"
                  display="flex"
                  align="center"
                  gap={1.5}
                  className="text-[11px] font-mono text-dim border border-line/20 max-w-[220px] truncate"
                >
                  <Lock size={10} className="text-dim shrink-0" />
                  <span className="truncate">hairbyapril.pages.dev</span>
                </Box>
                <Box width={4} />
              </Box>

              {/* GIF Preview Canvas */}
              <Box className="relative w-full aspect-[16/10] bg-surface-alt">
                <img
                  src={gifSrc}
                  alt="Hair by April Live Booking Flow"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Single-Sentence Client Booking Flow */}
        <Box border radius="xl" padding={5} surface="sunken" className="border-line/30 bg-surface-alt/30">
          <Text variant="body" size="sm" color="main" className="leading-relaxed">
            <span className="font-semibold text-main">How the booking process works:</span> When a client books, they choose an open slot on your calendar, submit their consultation notes, receive an instant calendar invite, and get automated email reminders—with zero back-and-forth messaging.
          </Text>
        </Box>

        {/* Studio Credibility Footnote */}
        <Box border radius="lg" padding={4} surface="sunken" className="border-line/30 bg-surface-alt/20 text-center">
          <Text variant="body" size="xs" color="dim">
            We run our own studio's web presence, merchandise catalog, and automated Google Shopping feeds on the exact same infrastructure. Learn more on our{' '}
            <NavLink to="/about" className="text-accent hover:underline font-medium">
              About & Operations page →
            </NavLink>
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};
