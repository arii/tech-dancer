import { ArrowUpRight } from 'lucide-react';
import { ASSET_PREFIX } from '@/config/constants';
import { Box, Stack, Text, Button, Grid } from '@/layouts/Primitives';

export const ClientSpotlight = () => {
  const imgSrc = `${ASSET_PREFIX}/images/creators/hair-by-april.jpg`;

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
      <Grid cols={{ base: 1, md: 2 }} gap={{ base: 8, lg: 12 }} align="center">
        {/* Left Column: Vertically Centered Story & Actions */}
        <Stack gap={5} justify="center">
          <Stack gap={3}>
            <Text as="h2" variant="headline" size="2xl" weight="font-bold" className="text-main tracking-[0.01em]">
              See it in action: Hair by April
            </Text>
            <Text variant="body" size="sm" color="main" className="leading-[1.65]">
              We built a mobile-first website for Hair by April that brings together services, pricing, appointment booking, and customer intake.
            </Text>

            {/* Step-by-step customer flow */}
            <Box
              border
              radius="lg"
              padding={4}
              surface="default"
              className="border-line/20 bg-surface/80 my-2"
            >
              <Text variant="body" size="xs" weight="font-semibold" className="text-[11px] font-sans uppercase mb-2 block tracking-wider text-dim">
                How customers interact:
              </Text>
              <Text variant="body" size="xs" color="main" className="font-medium leading-[1.6]">
                Find the business <span className="text-accent mx-1">→</span> Explore services <span className="text-accent mx-1">→</span> Choose an available time <span className="text-accent mx-1">→</span> Submit their information <span className="text-accent mx-1">→</span> Receive confirmation
              </Text>
            </Box>

            <Text variant="body" size="xs" color="dim" className="leading-[1.6]">
              No back-and-forth messages. No manually checking availability.
            </Text>
          </Stack>

          {/* Action link */}
          <Box display="flex" align="center" gap={3} className="pt-1">
            <Button
              as="a"
              href="https://hairbyapril.pages.dev/"
              target="_blank"
              rel="noopener"
              variant="outline"
              size="md"
              className="shadow-sm font-medium"
            >
              Visit the live client site <ArrowUpRight size={14} className="ml-1.5" />
            </Button>
          </Box>
        </Stack>

        {/* Right Column: High-Res Scaled Image Canvas */}
        <Box display="flex" align="center" justify="center" width="full">
          <Box
            border
            radius="xl"
            overflow="hidden"
            surface="sunken"
            className="border-line/30 shadow-md relative bg-surface-alt w-full"
          >
            <Box className="relative w-full aspect-[16/10] overflow-hidden">
              <img
                src={imgSrc}
                alt="Hair by April Live Website & Booking"
                className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-300"
                loading="lazy"
              />
            </Box>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};
