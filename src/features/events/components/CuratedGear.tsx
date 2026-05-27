import { Link } from 'react-router-dom';
import { Box, Text } from '@/layouts/Primitives';
import { MAIN_GAP } from '../constants';
import type { Product } from './EventProductCard';
import { EventProductGrid } from './EventProductGrid';
import { EventSection } from './EventSection';

interface CuratedGearProps {
  id?: string;
  featuredPicks: Product[];
  featuredDescription?: string;
  packingPicks: Product[];
  packingDescription?: string;
  travelPicks: Product[];
  travelDescription?: string;
  showFullGearListCta?: boolean;
}

export function CuratedGear({
  id,
  featuredPicks,
  featuredDescription,
  packingPicks,
  packingDescription,
  travelPicks,
  travelDescription,
  showFullGearListCta = false,
}: CuratedGearProps) {
  const canRenderPacking = packingPicks.length > 1;
  const canRenderTravel = travelPicks.length > 1;

  if (
    featuredPicks.length === 0 &&
    !canRenderPacking &&
    !canRenderTravel &&
    !showFullGearListCta
  ) {
    return null;
  }

  return (
    <Box id={id} as="section" data-testid="gear" className={MAIN_GAP}>
      {featuredPicks.length > 0 && (
        <>
          <EventSection
            eyebrow="Top recommendations"
            title="Featured Picks"
            description={featuredDescription || 'Start here for the most useful picks on the page.'}
          >
            <EventProductGrid
              products={featuredPicks}
              variant="featured"
              maxItems={3}
              showMoreCta={false}
            />
          </EventSection>
          {/* Affiliate disclosure moved directly after Featured Picks */}
          <Box paddingTop={2}>
            <Box maxWidth="screen-xl" paddingX={{ base: 3, md: 6 }}>
              <Text size="xs" color="dim" className="max-w-2xl leading-relaxed italic opacity-60">
                As an Amazon Associate, I earn a small commission from qualifying purchases made through the links below at no extra cost to you.
              </Text>
            </Box>
          </Box>
        </>
      )}

      {canRenderPacking && (
        <EventSection
          eyebrow="Packing plan"
          title="Packing & Gear"
          description={packingDescription || 'A tight edit of the extra gear worth packing.'}
        >
          <EventProductGrid
            products={packingPicks}
            maxItems={3}
            showMoreCta={false}
          />
        </EventSection>
      )}

      {canRenderTravel && (
        <EventSection
          eyebrow="Travel setup"
          title="Travel Extras"
          description={travelDescription || 'Practical items that make the weekend easier.'}
        >
          <EventProductGrid
            products={travelPicks}
            maxItems={3}
            showMoreCta={false}
          />
        </EventSection>
      )}

      {showFullGearListCta && (
        <Box paddingTop={4}>
          <Text
            as={Link}
            to="/gear"
            variant="mono"
            size="xs"
            weight="font-bold"
            color="accent"
            className="hover:underline opacity-80"
          >
            View full gear list
          </Text>
        </Box>
      )}
    </Box>
  );
}
