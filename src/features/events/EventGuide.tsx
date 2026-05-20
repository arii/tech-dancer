import { useMemo } from 'react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';

import { EventHero } from './components/EventHero';
import { EventSidebar } from '@/components/ui/EventSidebar';
import { ThemeSpotlight } from './components/ThemeSpotlight';
import { CuratedGear } from './components/CuratedGear';
import { ReminderSignups } from './components/ReminderSignups';
import { EventTravel } from './components/EventTravel';
import { RelatedEvents } from './components/RelatedEvents';
import { useEventDetail } from './useEventDetail';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { SECTION_SPACING, EVENT_TABS } from './constants';
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

  const tabIds = useMemo(() => EVENT_TABS.map(tab => tab.id), []);
  const activeTab = useScrollSpy(tabIds) || 'theme';

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
        title={`${event.title} | Event Resource Guide`}
        description={event.excerpt || event.description}
        jsonLd={getEventSchema(event)}
      />

      <EventHero
        id="hero"
        title={event.title}
        location={event.city}
        date={event.schedule}
        url={event.url}
        eyebrow={event.category}
        image={event.heroImage}
        whyAttending={event.whyAttending}
        activeTab={activeTab}
      />

      <Box maxWidth="screen-xl" marginX="auto" paddingX={{ base: 6, md: 12, lg: 24 }} paddingY={SECTION_SPACING}>
        <Grid cols={{ base: 1, lg: 3 }} gap={{ base: 8, lg: 16 }}>
          <Box className="lg:col-span-2">
            <Stack gap={SECTION_SPACING}>
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

              <ReminderSignups id="reminders" event={event} />

              <EventTravel id="travel" notes={event.description} />

              {event.content?.trim() && (
                <Box id="notes" scrollPaddingTop={80}>
                  <Stack gap={8}>
                    <Stack gap={2}>
                      <Text variant="mono" size="xs" color="accent" weight="font-bold" uppercase tracking="widest">
                        Field Notes
                      </Text>
                      <Text variant="headline" size="3xl" weight="font-black">
                        Expert Intelligence
                      </Text>
                    </Stack>
                    <MarkdownRenderer content={event.content} />
                  </Stack>
                </Box>
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
