
import { NavLink } from 'react-router-dom';
import { Box, Text, Grid } from '@/layouts/Primitives';
import { CategoryPlaceholder } from '@/components/ui/CategoryPlaceholder';
import { ASSET_PREFIX } from '@/config/constants';

const PICKS = [
  { label: 'Earplugs', image: '/images/gear/sketches/loop-earplugs.webp', href: '/gear/2023-10-01-loop-earplugs' },
  { label: 'Steamer', image: '/images/gear/sketches/travel-steamer.webp', href: '/gear/2023-11-01-travel-steamer' },
  { label: 'Portable Speaker', image: '/images/gear/sketches/ue-wonderboom.webp', href: '/gear/2024-01-01-portable-speaker' },
];

export function GearShelf() {
  return (
    <Box as="section" className="w-full max-w-full min-w-0">
      {/* Header — no card wrapper, just section heading */}
      <Box display="flex" align="center" justify="between" marginBottom={3}>
        <Text as="h2" variant="headline" size="2xl" weight="font-black">
          Gear for the Weekend
        </Text>
        <Text
          as={NavLink}
          to="/gear"
          variant="mono"
          size="xs"
          color="accent"
          weight="font-bold"
          paddingY={{ base: 4, sm: 0 }}
          paddingX={{ base: 4, sm: 0 }}
          className="shrink-0 hover:underline"
        >
          See all picks →
        </Text>
      </Box>
      <Text variant="body" size="sm" color="dim" marginBottom={5}>
        Small things that make a dance weekend easier.
      </Text>

      {/* Desktop: square image tile grid — visual shelf, not list cards */}
      <Grid
        display={{ base: "none", lg: "grid" }}
        cols={{ lg: 3 }}
        gap={{ lg: 4 }}
      >
        {PICKS.map(({ label, image, imageText, href }) => (
          <Box key={label} as={NavLink} to={href} className="group">
            <Box
              radius="lg"
              overflow="hidden"
              border
              display="flex"
              align="center"
              justify="center"
              className="aspect-square bg-surface-alt transition-all group-hover:border-accent/40"
            >
              {image ? (
                <img
                  src={`${ASSET_PREFIX}${image}`}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : imageText ? (
                <Text variant="body" size="sm" weight="font-bold">
                  [{imageText}]
                </Text>
              ) : (
                <CategoryPlaceholder category="gear" size="md" />
              )}
            </Box>
            <Text
              variant="body"
              size="sm"
              weight="font-bold"
              marginTop={2}
              hoverColor="accent"
            >
              {label}
            </Text>
          </Box>
        ))}
      </Grid>

      {/* Mobile: horizontal scroll of compact tiles */}
      <Box
        display={{ base: "block", lg: "none" }}
        width="full"
        maxWidth="full"
        overflowX="auto"
        overscroll="x-contain"
        paddingBottom={3}
        noScrollbar
      >
        <Box display="flex" gap={3} width="fit" paddingRight={4}>
          {PICKS.map(({ label, image, imageText, href }) => (
            <Box
              key={`mobile-${label}`}
              as={NavLink}
              to={href}
              className="group w-28 min-w-0"
            >
              <Box radius="lg" overflow="hidden" border display="flex" align="center" justify="center" className="aspect-square bg-surface-alt transition-all group-hover:border-accent/40">
                {image ? (
                  <img
                    src={`${ASSET_PREFIX}${image}`}
                    alt=""
                    aria-hidden="true"
                    className="block h-full w-full max-w-full object-cover"
                  />
                ) : imageText ? (
                  <Text variant="body" size="xs" weight="font-bold" className="text-center">
                    [{imageText}]
                  </Text>
                ) : (
                  <CategoryPlaceholder category="gear" size="sm" />
                )}
              </Box>
              <Text
                variant="body"
                size="xs"
                weight="font-bold"
                marginTop={1.5}
                textAlign="center"
              >
                {label}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
