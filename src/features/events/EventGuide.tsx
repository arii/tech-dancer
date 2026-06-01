import { Sparkles } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';

import { EventHero } from './components/EventHero';
import { EventNavigation } from './components/EventNavigation';
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
        theme={event.theme?.name}
        venue={event.location}
        bestFor={event.category}
        deadline={event.registrationDeadline}
        packingCue={event.packingReminderDate}
      />

      <EventNavigation />

      <Box maxWidth="screen-xl" marginX="auto" paddingX={{ base: 6, md: 12, lg: 24 }} paddingY={SECTION_SPACING}>
        {event.whyAttending && (
          <Box
            data-testid="why-attending"
            maxWidth="3xl"
            marginBottom={16}
            padding={{ base: 6, md: 8 }}
            radius="2xl"
            className="bg-white/5 border border-white/10 backdrop-blur-sm relative overflow-hidden group"
          >

            <Box
              position="absolute"
              top={-20}
              right={-20}
              width={40}
              height={40}
              className="bg-accent/10 blur-3xl rounded-full"
            />

            <Stack gap={4}>
              <Box display="flex" align="center" gap={2} color="accent">
                <Sparkles size={16} />
                <Text variant="mono" size="xs" weight="font-bold" uppercase tracking="widest">
                  Why I&apos;m Attending
                </Text>
              </Box>
              <Text variant="body" size="lg" leading="relaxed" color="white" className="relative z-10 italic font-medium opacity-90">
                &ldquo;{event.whyAttending}&rdquo;
              </Text>
            </Stack>
          </Box>
        )}
        <Grid cols={{ base: 1, lg: 3 }} gap={{ base: 8, lg: 16 }}>
          <Box className="lg:col-span-2">
            <Stack gap={SECTION_SPACING}>
              <AffiliateDisclosure />

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
          <Box display={{ base: 'none', lg: 'block' }}>
            <EventSidebar event={event} />
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
