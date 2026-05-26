import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { CategoryPlaceholder } from '@/components/ui/CategoryPlaceholder';
import { ASSET_PREFIX } from '@/config/constants';

const PICKS = [
  { label: 'Earplugs', image: '/assets/gear/loop-earplugs.jpg', href: '/gear/2023-10-01-loop-earplugs' },
  { label: 'Steamer', image: '/assets/gear/travel-steamer.jpg', href: '/gear/2023-11-01-travel-steamer' },
  { label: 'Portable Speaker', image: '/assets/gear/ue-wonderboom.jpg', href: '/gear/2024-01-01-portable-speaker' },
];

export function GearShelf() {
  return (
    <Box as="section" border radius="lg" padding={6} className="bg-surface flex h-full flex-col">
      {/* Header */}
      <Box display="flex" align="center" justify="between" marginBottom={4}>
        <Text as="h2" variant="headline" size="xl" weight="font-black">
          Gear for the Weekend
        </Text>
        <Text
          as={NavLink}
          to="/gear"
          variant="mono"
          size="xs"
          color="accent"
          weight="font-bold"
          className="hover:underline"
        >
          See all →
        </Text>
      </Box>
      <Text variant="body" size="sm" color="dim" marginBottom={5}>
        Small things that make a dance weekend easier.
      </Text>

      {/* Desktop: stacked mini-cards — always visible at lg */}
      <Stack gap={3} className="hidden lg:flex">
        {PICKS.map(({ label, image, href }) => (
          <Box
            key={label}
            as={NavLink}
            to={href}
            display="flex"
            align="center"
            gap={4}
            padding={3}
            border
            radius="md"
            className="group bg-surface-alt transition-all hover:border-accent/40"
          >
            <Box width={12} height={12} radius="md" overflow="hidden" className="shrink-0 bg-surface-alt">
              {image ? (
                <img src={`${ASSET_PREFIX}${image}`} alt={label} className="h-full w-full object-cover" />
              ) : (
                <CategoryPlaceholder category="gear" size="sm" />
              )}
            </Box>
            <Text
              variant="body"
              size="sm"
              weight="font-bold"
              className="transition-colors group-hover:text-accent"
            >
              {label}
            </Text>
          </Box>
        ))}
      </Stack>

      {/* Mobile: horizontal scrolling row */}
      <Box display={{ base: 'block', lg: 'none' }} overflowX="auto" className="-mx-2 px-2">
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
              className="group min-w-24 bg-surface"
            >
              <Box width={12} height={12} radius="md" overflow="hidden" className="shrink-0 bg-surface-alt">
                {image ? (
                  <img src={`${ASSET_PREFIX}${image}`} alt={label} className="h-full w-full object-cover" />
                ) : (
                  <CategoryPlaceholder category="gear" size="sm" />
                )}
              </Box>
              <Text variant="body" size="sm" weight="font-bold" className="text-center">
                {label}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
