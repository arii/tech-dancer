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
            <Text as="h2" variant="headline" size="2xl" weight="font-bold" tracking="wordmark" className="text-main">
              See it in action: Hair by April
            </Text>
            <Text variant="body" size="sm" color="main" leading="relaxed">
              We built a mobile-first website for Hair by April that brings together services, pricing, appointment booking, and customer intake.
            </Text>

            {/* Step-by-step customer flow */}
            <Box
              border
              radius="lg"
              padding={4}
              surface="default"
              marginY={2}
              className="border-line/20 bg-surface/80"
            >
              <Text variant="body" size="tiny" weight="font-semibold" tracking="wider" marginBottom={2} className="font-sans uppercase block text-dim">
                How customers interact:
              </Text>
              <Text variant="body" size="xs" color="main" leading="relaxed" className="font-medium">
                Find the business <Box as="span" marginX={1} className="text-accent">→</Box> Explore services <Box as="span" marginX={1} className="text-accent">→</Box> Choose an available time <Box as="span" marginX={1} className="text-accent">→</Box> Submit their information <Box as="span" marginX={1} className="text-accent">→</Box> Receive confirmation
              </Text>
            </Box>

            <Text variant="body" size="xs" color="dim" leading="relaxed">
              No back-and-forth messages. No manually checking availability.
            </Text>
          </Stack>

          {/* Action link */}
          <Box display="flex" align="center" gap={3} paddingTop={1}>
            <Button
              as="a"
              href="https://hairbyapril.pages.dev/"
              target="_blank"
              rel="noopener"
              variant="outline"
              size="md"
              className="shadow-sm font-medium"
            >
              Visit the live client site <Box as="span" marginLeft={1.5}><ArrowUpRight size={14} /></Box>
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
            <Box overflow="hidden" position="relative" width="full" aspect="16/10">
              <img
                src={imgSrc}
                alt="Hair by April Live Website & Booking"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </Box>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};
