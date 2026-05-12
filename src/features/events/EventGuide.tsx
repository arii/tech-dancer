import { useNavigate } from 'react-router-dom';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';

import { EventHero } from './components/EventHero';

import { EventNavigation } from './components/EventNavigation';
import { EventDetails } from './components/EventDetails';
import { EventSidebar } from './components/EventSidebar';
import { SECTION_SPACING } from './constants';
import { useEventDetail } from './useEventDetail';

export default function EventGuide() {
  const navigate = useNavigate();
  const { event, isLoading, themeOutfits, themeAccessories, gearSections, relatedEvents } = useEventDetail();

  if (isLoading) {
    return (
      <Box padding="panel" textAlign="center">
        <Text variant="mono" size="xs">Loading Intelligence...</Text>
      </Box>
    );
  }

  if (!event) {
    return (
      <Box padding="panel" textAlign="center">
        <Stack gap={8} align="center">
          <Text variant="display" size="2xl">Event Not Found</Text>
          <Box as="button" onClick={() => navigate('/research')} className="hover:text-accent transition-colors">
            <Text variant="mono" size="xs">Back to Research</Text>
          </Box>
        </Stack>
      </Box>
    );
  }

  return (
    <Box>
      <SEO
        title={`${event.title} | Event Guide`}
        description={event.excerpt}
      />

      <EventHero
        title={event.title}
        location={event.city}
        date={event.schedule}
        eyebrow={event.category}
        image={event.heroImage}
        whyAttending={event.whyAttending}
      />

      <EventNavigation />

      <Box maxWidth="screen-xl" marginX="auto" paddingX={{ base: 6, md: 12, lg: 24 }} paddingY={SECTION_SPACING}>
        <Grid cols={{ base: 1, lg: 3 }} gap={16}>
          <Box className="lg:col-span-2">
            <EventDetails
              event={event}
              themeOutfits={themeOutfits}
              themeAccessories={themeAccessories}
              gearSections={gearSections}
            />
          </Box>
          <EventSidebar event={event} relatedEvents={relatedEvents} />
        </Grid>
      </Box>
    </Box>
  );
}
