// impeccable-ignore-file
import { NavLink } from 'react-router-dom';
import { Box, Text } from '@/layouts/Primitives';
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
          paddingX={2}
          paddingY={4}
          className="shrink-0 hover:underline -mr-2"
        >
          See all picks →
        </Text>
      </Box>
      <Text variant="body" size="sm" color="dim" marginBottom={5}>
        Small things that make a dance weekend easier.
      </Text>

      {/* Desktop: square image tile grid — visual shelf, not list cards */}
      <Box className="hidden lg:grid lg:grid-cols-3 lg:gap-4">
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
              className="mt-2 transition-colors group-hover:text-accent"
            >
              {label}
            </Text>
          </Box>
        ))}
      </Box>

      {/* Mobile: horizontal scroll of compact tiles */}
      <Box className="w-full max-w-full overflow-x-auto overscroll-x-contain pb-3 lg:hidden">
        <Box display="flex" gap={3} className="flex-nowrap pr-4">
          {PICKS.map(({ label, image, imageText, href }) => (
            <Box
              key={`mobile-${label}`}
              as={NavLink}
              to={href}
              paddingY={2}
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
              <Text variant="body" size="xs" weight="font-bold" className="mt-1.5 text-center">
                {label}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
