import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';

import { EventHero } from './components/EventHero';
import { AffiliateDisclosure } from '@/components/ui/AffiliateDisclosure';
import { EventSidebar } from '@/components/ui/EventSidebar';
import { ThemeSpotlight } from './components/ThemeSpotlight';
import { CuratedGear } from './components/CuratedGear';
import { EventReminders } from './components/EventReminders';
import { EventTravel } from './components/EventTravel';
import { EventNotes } from './components/EventNotes';
import { RelatedEvents } from './components/RelatedEvents';
import { useEventDetail } from './useEventDetail';
import { SECTION_SPACING } from './constants';
import { getEventSchema } from './schema';

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
        <Text variant="mono" size="xs">Loading Guide...</Text>
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
        title={`${event.title} | Event Resource Guide`}
        description={event.excerpt}
        jsonLd={getEventSchema(event)}
      />

      <EventHero
        id="hero"
        title={event.title}
        location={event.city}
        date={event.schedule}
        eyebrow={event.category}
        image={event.heroImage}
        whyAttending={event.whyAttending}
      />

      <Box maxWidth="screen-xl" marginX="auto" paddingX={{ base: 4, md: 12, lg: 24 }} paddingY={{ base: 8, md: 16 }}>
        <Grid cols={{ base: 1, lg: 3 }} gap={{ base: 12, lg: 16 }}>
          <Box className="lg:col-span-2">
            <Stack gap={SECTION_SPACING}>
              <AffiliateDisclosure type="event" />

              {event.theme && (
                <ThemeSpotlight
                  id="theme"
                  title={event.theme.name}
                  label={event.theme.label}
                  description={event.theme.description || ''}
                  colors={event.theme.colors}
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

              <EventReminders id="reminders" event={event} />

              <EventTravel id="travel" notes={event.description} />

              <EventNotes id="notes" content={event.content} />

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
