import { useNavigate } from 'react-router-dom';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';

import { EventHero } from './components/EventHero';
import { EventNavigation } from './components/EventNavigation';
import { EventDetails } from './components/EventDetails';
import { EventSidebar } from './components/EventSidebar';
import { ThemeSpotlight } from './components/ThemeSpotlight';
import { CuratedGear } from './components/CuratedGear';
import { RelatedEvents } from './components/RelatedEvents';
import { useEventDetail } from './useEventDetail';
import { SECTION_SPACING } from './constants';

export default function EventGuide() {
  const navigate = useNavigate();
  const {
    event,
    themeOutfits,
    themeAccessories,
    gearSections,
    relatedEvents,
    isLoading,
    isError,
    error
  } = useEventDetail();

  if (isLoading) {
    return (
      <Box padding="panel" textAlign="center">
        <Text variant="mono" size="xs">Loading Intelligence...</Text>
      </Box>
    );
  }

  if (isError || !event) {
    return (
      <Box padding="panel" textAlign="center">
        <Stack gap={8} align="center">
          <Text variant="display" size="2xl">
            {isError ? 'Error Loading Event' : 'Event Not Found'}
          </Text>
          {isError && error && (
            <Text color="dim" size="sm">{(error as Error).message}</Text>
          )}
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
      />

      <EventNavigation />

      <Box maxWidth="screen-xl" marginX="auto" paddingX={{ base: 6, md: 12, lg: 24 }} paddingY={SECTION_SPACING}>
        <Grid cols={{ base: 1, lg: 3 }} gap={16}>
          <Box className="lg:col-span-2">
            <Stack gap={SECTION_SPACING}>
              <EventDetails event={event} />

              {event.theme && (
                <Box id="theme" as="section">
                  <ThemeSpotlight
                    title={event.theme.name || 'Event Theme'}
                    description={event.theme.description || ''}
                    image={event.theme.image}
                    themeOutfits={themeOutfits}
                    themeAccessories={themeAccessories}
                  />
                </Box>
              )}

              <Box id="gear" as="section">
                <CuratedGear sections={gearSections} />
              </Box>

              <RelatedEvents events={relatedEvents} />
            </Stack>
          </Box>
          <EventSidebar event={event} />
        </Grid>
      </Box>
    </Box>
  );
}
