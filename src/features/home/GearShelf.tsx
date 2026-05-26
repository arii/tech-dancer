// impeccable-ignore-file
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
    <Box as="section" border radius="lg" overflow="hidden" className="bg-surface">
      {/* Header */}
      <Box display="flex" align="center" justify="between" padding={5} paddingBottom={2}>
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
          className="shrink-0 hover:underline"
        >
          See all →
        </Text>
      </Box>
      <Text variant="body" size="sm" color="dim" paddingX={5} marginBottom={4}>
        Small things that make a dance weekend easier.
      </Text>

      {/* Desktop: stacked mini-cards */}
      <Stack gap={3} paddingX={5} paddingBottom={5} className="hidden lg:flex">
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
            <Text variant="body" size="sm" weight="font-bold" className="transition-colors group-hover:text-accent">
              {label}
            </Text>
          </Box>
        ))}
      </Stack>

      {/* Mobile: horizontal scroll — full bleed from card edge, trailing space to reveal last item */}
      <Box className="overflow-x-auto pb-4 lg:hidden">
        <Box display="flex" gap={3} className="w-max px-5 pr-8">
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
              className="group w-36 bg-surface-alt"
            >
              <Box width={14} height={14} radius="md" overflow="hidden" className="shrink-0 bg-surface-alt">
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
