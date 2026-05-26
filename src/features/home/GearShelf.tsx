import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { CategoryPlaceholder } from '@/components/ui/CategoryPlaceholder';
import { ASSET_PREFIX } from '@/config/constants';

const PICKS = [
  {
    label: 'Earplugs',
    image: '/assets/gear/loop-earplugs.jpg',
    href: '/gear/2023-10-01-loop-earplugs',
  },
  {
    label: 'Steamer',
    image: '/assets/gear/travel-steamer.jpg',
    href: '/gear/2023-11-01-travel-steamer',
  },
  {
    label: 'Portable Speaker',
    image: '/assets/gear/ue-wonderboom.jpg',
    href: '/gear/2024-01-01-portable-speaker',
  },
];

export function GearShelf() {
  return (
    <Box as="section">
      <Text
        as="h2"
        variant="headline"
        size="2xl"
        weight="font-black"
        marginBottom={2}
      >
        Gear for the Weekend
      </Text>
      <Text variant="body" size="sm" color="dim" marginBottom={6}>
        Small things that make a dance weekend easier.
      </Text>

      {/* Desktop horizontal shelf */}
      <Box display={{ base: 'none', lg: 'block' }}>
        <Box display="flex" gap={3}>
          {PICKS.map(({ label, image, href }) => (
            <Box
              key={label}
              as={NavLink}
              to={href}
              flex={1}
              display="flex"
              direction="col"
              align="center"
              gap={3}
              padding={4}
              border
              radius="md"
              className="group bg-surface transition-all hover:border-accent/40"
            >
              <Box
                width="full"
                aspect="square"
                radius="sm"
                overflow="hidden"
                className="shrink-0 bg-surface-alt"
              >
                {image ? (
                  <img
                    src={`${ASSET_PREFIX}${image}`}
                    alt={label}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <CategoryPlaceholder category="gear" size="sm" />
                )}
              </Box>
              <Text
                variant="body"
                size="xs"
                weight="font-bold"
                className="text-center transition-colors group-hover:text-accent"
              >
                {label}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Mobile horizontal scroll */}
      <Box
        display={{ base: 'block', lg: 'none' }}
        overflowX="auto"
        marginX={-4}
        paddingX={4}
        paddingBottom={2}
        className="scrollbar-hide"
      >
        <Box display="flex" gap={3} className="min-w-max">
          {PICKS.map(({ label, image, href }) => (
            <Box
              key={`mobile-${label}`}
              as={NavLink}
              to={href}
              display="flex"
              direction="col"
              align="center"
              gap={2}
              padding={3}
              border
              radius="md"
              className="group w-32 bg-surface"
            >
              <Box
                width="full"
                aspect="square"
                radius="sm"
                overflow="hidden"
                className="shrink-0 bg-surface-alt"
              >
                {image ? (
                  <img
                    src={`${ASSET_PREFIX}${image}`}
                    alt={label}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <CategoryPlaceholder category="gear" size="sm" />
                )}
              </Box>
              <Text variant="body" size="xs" weight="font-bold" className="text-center truncate w-full">
                {label}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>

      <Box marginTop={4}>
        <Text
          as={NavLink}
          to="/gear"
          variant="mono"
          size="xs"
          color="accent"
          weight="font-bold"
          className="hover:underline"
        >
          See all picks →
        </Text>
      </Box>
    </Box>
  );
}
