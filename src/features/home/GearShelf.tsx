
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

      {/* Horizontal thumbnail strip list (Desktop & Mobile) */}
      <Box
        width="full"
        maxWidth="full"
        overflowX="auto"
        overscroll="x-contain"
        paddingBottom={2}
        className="scrollbar-hide"
      >
        <Box display="flex" gap={6} width="fit" paddingRight={4}>
          {PICKS.map(({ label, image, imageText, href }) => (
            <Box
              key={label}
              as={NavLink}
              to={href}
              display="flex"
              align="center"
              gap={3}
              className="group min-w-0"
            >
              <Box
                radius="sm"
                overflow="hidden"
                display="flex"
                align="center"
                justify="center"
                className="h-12 w-12 shrink-0 bg-surface transition-all group-hover:opacity-80"
              >
                {image ? (
                  <img
                    src={`${ASSET_PREFIX}${image}`}
                    alt=""
                    aria-hidden="true"
                    className="block h-full w-full object-cover"
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
                size="sm"
                weight="font-bold"
                hoverColor="accent"
                className="whitespace-nowrap"
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
