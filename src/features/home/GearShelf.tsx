// impeccable-ignore-file
import { NavLink } from 'react-router-dom';
import { Box, Text } from '@/layouts/Primitives';
import { CategoryPlaceholder } from '@/components/ui/CategoryPlaceholder';
import { ASSET_PREFIX } from '@/config/constants';

const PICKS = [
  { label: 'Earplugs', image: '/assets/gear/loop-earplugs.jpg', href: '/gear/2023-10-01-loop-earplugs' },
  { label: 'Steamer', image: '/assets/gear/travel-steamer.jpg', href: '/gear/2023-11-01-travel-steamer' },
  { label: 'Fan', image: '', href: '/gear' },
  { label: 'Organizer', image: '', href: '/gear' },
  { label: 'Dance Bag', image: '', href: '/gear' },
];

export function GearShelf() {
  return (
    <Box as="section">
      <Text as="h2" variant="headline" size="2xl" weight="font-black" marginBottom={2}>
        Gear for the Weekend
      </Text>
      <Text variant="body" size="sm" color="dim" marginBottom={6}>
        Small things that make a dance weekend easier.
      </Text>

      <Box overflowX={{ base: 'auto', lg: 'visible' }} className="-mx-4 px-4 lg:mx-0 lg:px-0">
        <Box display={{ base: 'flex', lg: 'grid' }} gap={3} className="min-w-max lg:min-w-0 lg:grid-cols-1">
          {PICKS.map(({ label, image, href }) => (
            <Box
              key={label}
              as={NavLink}
              to={href}
              display="flex"
              direction={{ base: 'col', lg: 'row' }}
              align="center"
              gap={3}
              padding={3}
              border
              radius="md"
              className="group min-w-28 bg-surface transition-all hover:border-accent/40"
            >
              <Box width={12} height={12} radius="md" overflow="hidden" className="shrink-0 bg-surface-alt">
                {image ? (
                  <img src={`${ASSET_PREFIX}${image}`} alt={label} className="h-full w-full object-cover" />
                ) : (
                  <CategoryPlaceholder category="gear" size="sm" />
                )}
              </Box>
              <Text variant="body" size="sm" weight="font-bold" className="text-center transition-colors group-hover:text-accent lg:text-left">
                {label}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>

      <Box marginTop={4}>
        <Text as={NavLink} to="/gear" variant="mono" size="xs" color="accent" weight="font-bold" className="hover:underline">
          See all picks →
        </Text>
      </Box>
    </Box>
  );
}
