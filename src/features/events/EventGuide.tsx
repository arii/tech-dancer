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
import { MAIN_GAP, SIDEBAR_WIDTH } from './constants';
import { getEventSchema } from './schema';
import { useEventDetail, resolveAffiliateLinks } from './useEventDetail';
import { createProductDeduplicator } from './lib/deduplication';
import { affiliateManager } from '@/lib/affiliateManager';
import type { AffiliateLink } from '@/types';

const FEATURED_MAX_ITEMS = 3;
const THEME_MAX_ITEMS = 6;
const PACKING_MAX_ITEMS = 3;
const TRAVEL_MAX_ITEMS = 3;

const joinDescriptions = (...parts: Array<string | undefined>) => parts.filter(Boolean).join(' ');

function isValidProductLink(product: AffiliateLink) {
  const href = affiliateManager.resolveResourceHref({ id: product.id, gearSlug: product.gearSlug });
  const hasImage = !product.image || product.image.startsWith('/');
  const validHref = href.startsWith('/gear/') || /^https?:\/\//.test(href);

  return Boolean(product.id && product.name && validHref && hasImage);
}

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

    const allocate = <T extends { id: string }>(items: T[], limit: number) => {
      const validItems = items.filter((item) => isValidProductLink(item as AffiliateLink));
      const uniqueItems = deduplicator.filter(validItems);
      return uniqueItems.slice(0, limit);
    };

    const themeProducts = allocate([...themeOutfits, ...themeAccessories], THEME_MAX_ITEMS);
    const featuredProducts = allocate(
      resolveAffiliateLinks([
        ...(event?.gear?.outfitIds ?? []),
        ...(event?.gear?.shoeIds ?? []),
        ...(event?.gear?.essentialIds ?? []),
      ]),
      FEATURED_MAX_ITEMS,
    );
    const packingProducts = allocate(
      resolveAffiliateLinks([
        ...(event?.gear?.accessoryIds ?? []),
        ...(event?.gear?.essentialIds ?? []),
        ...(event?.gear?.shoeIds ?? []),
        ...(event?.gear?.outfitIds ?? []),
      ]),
      PACKING_MAX_ITEMS,
    );
    const travelProducts = allocate(resolveAffiliateLinks(event?.gear?.travelIds ?? []), TRAVEL_MAX_ITEMS);

    return {
      themeProducts,
      featuredProducts,
      packingProducts,
      travelProducts,
      hasOverflow: false,
    };
  }, [event, themeAccessories, themeOutfits]);

  if (isLoading) return <Box padding="panel" textAlign="center"><Text variant="mono" size="xs">Loading Guide...</Text></Box>;
  if (isError || !event) return <Box padding="panel" textAlign="center"><Stack gap={8} align="center"><Text variant="display" size="2xl">{isError ? 'Error Loading Event' : 'Event Not Found'}</Text>{isError && error && <Text variant="body" color="dim" size="sm">{error instanceof Error ? error.message : 'An unexpected error occurred.'}</Text>}<Box as="button" onClick={() => navigate('/events')} className="hover:text-accent transition-colors"><Text variant="mono" size="xs">Back to Events</Text></Box></Stack></Box>;

  return (
    <Box>
      <SEO title={`${event.title} | Event Resource Guide`} description={event.excerpt} jsonLd={getEventSchema(event)} />
      <EventHero id="hero" title={event.title} location={event.city} date={event.schedule} eyebrow={event.category} image={event.heroImage} whyAttending={event.whyAttending} />

      <Box maxWidth="screen-lg" marginX="auto" paddingX={{ base: 4, sm: 6, lg: 8 }} paddingTop={10}>
        <Stack direction={{ base: 'col', lg: 'row' }} gap={8} align="start">
          <Box flex={1} minWidth="0" className={MAIN_GAP}>
            {event.theme && (
              <ThemeSpotlight id="theme" title={event.theme.name} label={event.theme.label} description={event.theme.description} colors={event.theme.colors} products={editorialProducts.themeProducts} />
            )}

            <CuratedGear
              id="gear"
              featuredPicks={editorialProducts.featuredProducts}
              featuredDescription={joinDescriptions(event.gear?.outfitDescription, event.gear?.shoeDescription, event.gear?.essentialDescription)}
              packingPicks={editorialProducts.packingProducts}
              packingDescription={event.gear?.accessoryDescription}
              travelPicks={editorialProducts.travelProducts}
              travelDescription={event.gear?.travelDescription}
              showFullGearListCta={editorialProducts.hasOverflow}
            />

            <EventReminders id="reminders" event={event} />
            <EventTravel id="travel" notes={event.description} />
            <EventNotes id="notes" content={event.content} />
            {relatedEvents.length > 0 && <RelatedEvents id="related" events={relatedEvents} />}
          </Box>

          <Box as="aside" width={{ base: 'full', lg: SIDEBAR_WIDTH }} shrink={false} className="space-y-4 lg:sticky lg:top-24 hidden lg:block">
            <EventSidebar event={event} />
          </Box>

          <Box className="lg:hidden" width="full">
            <EventSidebar event={event} inline />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
