import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';

import { EventHero } from './components/EventHero';
import { EventNavigation } from './components/EventNavigation';
import { EventDetails } from './components/EventDetails';
import { EventSidebar } from '@/components/ui/EventSidebar';
import { ThemeSpotlight } from './components/ThemeSpotlight';
import { CuratedGear } from './components/CuratedGear';
import { RelatedEvents } from './components/RelatedEvents';
import { useEventDetail } from './useEventDetail';
import { SECTION_SPACING } from './constants';

export default function EventGuide() {
  const {
    event,
    isLoading,
    isError,
    error,
    themeOutfits,
    themeAccessories,
    gearSections,
    relatedEvents,
    navigate,
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
            {isError ? "Error Loading Event" : "Event Not Found"}
          </Text>
          {isError && error && (
            <Text variant="body" color="dim" size="sm">
              {error instanceof Error ? error.message : "An unexpected error occurred."}
            </Text>
          )}
          <Box as="button" onClick={() => navigate('/events')} className="hover:text-accent transition-colors">
            <Text variant="mono" size="xs">Back to Events</Text>
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
        <Grid cols={{ base: 1, lg: 3 }} gap={{ base: 8, lg: 16 }} className="lg:grid-cols-3" /* impeccable-ignore */>
          <Box className="lg:col-span-2 md:col-span-2">
            <Stack gap={SECTION_SPACING}>
              <EventDetails event={event} />

              {event.theme && (
                <ThemeSpotlight
                  id="theme"
                  title={event.theme.name}
                  description={event.theme.description || ''}
                  outfits={themeOutfits}
                  accessories={themeAccessories}
                />
              )}

              {gearSections.length > 0 && (
                <CuratedGear
                  id="gear"
                  title={`Gear for ${event.title}`}
                  sections={gearSections}
                />
              )}

              {relatedEvents.length > 0 && (
                <RelatedEvents
                  id="related"
                  events={relatedEvents}
                />
              )}
            </Stack>
          </Box>
          <EventSidebar event={event} />
        </Grid>
      </Box>
    </Box>
  );
}
