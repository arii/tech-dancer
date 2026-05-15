import { useMemo } from 'react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';

import { EventHero } from './components/EventHero';
import { EventDetails } from './components/EventDetails';
import { EventSidebar } from '@/components/ui/EventSidebar';
import { ThemeSpotlight } from './components/ThemeSpotlight';
import { CuratedGear } from './components/CuratedGear';
import { RelatedEvents } from './components/RelatedEvents';
import { ReminderSignups } from './components/ReminderSignups';
import { useEventDetail } from './useEventDetail';
import { SECTION_SPACING, EVENT_TABS } from './constants';
import { getEventSchema } from './schema';
import { useScrollSpy } from '@/hooks/useScrollSpy';

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

  const sectionIds = useMemo(() => ['overview', ...EVENT_TABS.map(t => t.id)], []);
  const { activeTab, scrollToSection } = useScrollSpy({ sectionIds });

  const structuredData = useMemo(() => event ? getEventSchema(event) : null, [event]);

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
        schema={structuredData || undefined}
      />

      <EventHero
        title={event.title}
        location={event.city}
        date={event.schedule}
        eyebrow={event.category}
        image={event.heroImage}
        whyAttending={event.whyAttending}
        activeTab={activeTab}
        onTabChange={scrollToSection}
      />

      <Box maxWidth="screen-xl" marginX="auto" paddingX={{ base: 6, md: 12, lg: 24 }} paddingY={SECTION_SPACING}>
        <Grid cols={{ base: 1, lg: 3 }} gap={{ base: 8, lg: 16 }}>
          <Box className="lg:col-span-2">
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

              {(event.earlyBirdDate || event.hotelCutoffDate) && (
                <ReminderSignups
                  id="reminders"
                  event={event}
                />
              )}

              {event.content?.trim() && (
                <Box id="notes" as="section">
                   <Stack gap={8}>
                    <Text variant="headline" size="3xl" weight="font-black">Event Notes</Text>
                    <Box className="prose prose-invert max-w-none">
                      <MarkdownRenderer content={event.content} />
                    </Box>
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
