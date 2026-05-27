import { useMemo } from 'react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { EventSidebar } from '@/components/ui/EventSidebar';
import { EventHero } from './components/EventHero';
import { ThemeSpotlight } from './components/ThemeSpotlight';
import { CuratedGear } from './components/CuratedGear';
import { EventReminders } from './components/EventReminders';
import { EventTravel } from './components/EventTravel';
import { EventNotes } from './components/EventNotes';
import { RelatedEvents } from './components/RelatedEvents';
import { MAIN_GAP } from './constants';
import { getEventSchema } from './schema';
import { useEventDetail, resolveAffiliateLinks } from './useEventDetail';
import { createProductDeduplicator } from './lib/deduplication';

const TOTAL_VISIBLE_PRODUCTS = 15;
const FEATURED_MAX_ITEMS = 3;
const THEME_MAX_ITEMS = 6;
const TRAVEL_MAX_ITEMS = 3;
const PACKING_MAX = 3;

const joinDescriptions = (...parts: Array<string | undefined>) => parts.filter(Boolean).join(' ');

export default function EventGuide() {
  const {
    event,
    isLoading,
    isError,
    error,
    themeOutfits,
    themeAccessories,
    relatedEvents,
    navigate,
  } = useEventDetail();

  const editorialProducts = useMemo(() => {
    const deduplicator = createProductDeduplicator();

    const resolveAndAllocate = (ids: string[], limit: number, currentRemainingSlots: number) => {
      const items = resolveAffiliateLinks(ids);
      const uniqueItems = deduplicator.filter(items);
      const allowed = Math.max(Math.min(limit, currentRemainingSlots), 0);
      const visibleItems = uniqueItems.slice(0, allowed);
      const hasOverflow = uniqueItems.length > visibleItems.length;

      return {
        visibleItems,
        hasOverflow,
        allocatedCount: visibleItems.length
      };
    };

    let slotsRemaining = TOTAL_VISIBLE_PRODUCTS;

    const featured = resolveAndAllocate(
      [
        ...(event?.gear?.outfitIds ?? []),
        ...(event?.gear?.shoeIds ?? []),
        ...(event?.gear?.essentialIds ?? []),
      ],
      FEATURED_MAX_ITEMS,
      slotsRemaining
    );
    slotsRemaining -= featured.allocatedCount;

    const theme = resolveAndAllocate(
      [...(event?.theme?.outfitIds ?? []), ...(event?.theme?.accessoryIds ?? [])],
      THEME_MAX_ITEMS,
      slotsRemaining
    );
    slotsRemaining -= theme.allocatedCount;

    const packing = resolveAndAllocate(
      [
        ...(event?.gear?.accessoryIds ?? []),
        ...(event?.gear?.essentialIds ?? []),
        ...(event?.gear?.shoeIds ?? []),
        ...(event?.gear?.outfitIds ?? []),
      ],
      PACKING_MAX,
      slotsRemaining
    );
    slotsRemaining -= packing.allocatedCount;

    const travel = resolveAndAllocate(
      event?.gear?.travelIds ?? [],
      TRAVEL_MAX_ITEMS,
      slotsRemaining
    );
    // slotsRemaining -= travel.allocatedCount; // Intentional for final allocation

    const hasAnyOverflow = featured.hasOverflow || theme.hasOverflow || packing.hasOverflow || travel.hasOverflow;

    return {
      themeProducts: theme.visibleItems,
      featuredProducts: featured.visibleItems,
      packingProducts: packing.visibleItems,
      travelProducts: travel.visibleItems,
      hasOverflow: hasAnyOverflow,
    };
  }, [event, themeAccessories, themeOutfits]);

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
            {isError ? 'Error Loading Event' : 'Event Not Found'}
          </Text>
          {isError && error && (
            <Text variant="body" color="dim" size="sm">
              {error instanceof Error ? error.message : 'An unexpected error occurred.'}
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

      <Box maxWidth="screen-xl" marginX="auto" paddingX={{ base: 4, sm: 6, lg: 8 }} paddingTop={10}>
        <Stack direction={{ base: 'col', lg: 'row' }} gap={12} align="start">
          <Box flex={1} minWidth="0" className={MAIN_GAP}>
            {event.theme && (
              <ThemeSpotlight
                id="theme"
                title={`${event.theme.name} Event Picks`}
                label={event.theme.label}
                description={event.theme.description}
                colors={event.theme.colors}
                products={editorialProducts.themeProducts}
              />
            )}

            <CuratedGear
              id="gear"
              featuredPicks={editorialProducts.featuredProducts}
              featuredDescription={joinDescriptions(
                event.gear?.outfitDescription,
                editorialProducts.themeProducts.length > 0 ? undefined : event.theme?.description,
                event.gear?.shoeDescription,
                event.gear?.essentialDescription,
              )}
              packingPicks={editorialProducts.packingProducts}
              packingDescription={joinDescriptions(
                event.gear?.accessoryDescription,
                editorialProducts.themeProducts.length > 0 ? undefined : event.gear?.outfitDescription,
              )}
              travelPicks={editorialProducts.travelProducts}
              travelDescription={event.gear?.travelDescription}
              showFullGearListCta={editorialProducts.hasOverflow}
            />

            <Box display={{ base: 'block', lg: 'none' }}>
              <EventReminders id="reminders" event={event} />
            </Box>

            <EventTravel id="travel" notes={event.description} />
            <EventNotes id="notes" content={event.content} />

            {relatedEvents.length > 0 && (
              <RelatedEvents id="related" events={relatedEvents} />
            )}
          </Box>

          <Box as="aside" display={{ base: 'none', lg: 'block' }} width={80} shrink={false} className="space-y-4 sticky top-24">
            <EventSidebar event={event} />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
