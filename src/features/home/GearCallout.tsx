import { NavLink } from 'react-router-dom';
import { Shirt, Tag, ArrowRight } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';

export function GearCallout() {
  return (
    <Box border radius="md" padding={5} className="w-full max-w-full min-w-0">
      {/* Header row */}
      <Stack direction="row" align="center" gap={3}>
        <Box padding={2} radius="md" shrink={0} className="bg-accent/10">
          <Shirt className="h-4 w-4 text-accent" />
        </Box>
        <Text variant="mono" size="xs" color="accent" weight="font-bold" uppercase className="tracking-widest">
          Dancer Gear & Merch
        </Text>
      </Stack>

      {/* Description */}
      <Text variant="body" size="xs" color="dim" leading="relaxed" marginTop={3}>
        Get ready for your next West Coast Swing event! Browse our handpicked dancer gear recommendations, from DIY shoe modifications to packing essentials, or grab exclusive partner dance tees and accessories designed for the social floor.
      </Text>

      {/* Content links/sections */}
      <Stack gap={4} marginTop={4}>
        <Box
          as={NavLink}
          to="/gear"
          border
          radius="md"
          padding={3}
          display="flex"
          align="center"
          justify="between"
          className="group bg-surface/30 hover:border-accent/40 hover:bg-surface/50 transition-colors"
        >
          <Stack direction="row" align="center" gap={3}>
            <Box padding={1.5} radius="md" className="bg-accent-sky/10 text-accent-sky group-hover:bg-accent-sky/20 transition-colors">
              <Shirt className="h-4 w-4" />
            </Box>
            <Stack gap={0.5}>
              <Text variant="body" size="xs" weight="font-bold" className="group-hover:text-accent transition-colors">
                Dance Gear & Essentials
              </Text>
              <Text variant="body" size="micro" color="dim">
                Steamers, earplugs, shoe care, and packing lists
              </Text>
            </Stack>
          </Stack>
          <ArrowRight className="h-4 w-4 text-dim group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
        </Box>

        <Box
          as={NavLink}
          to="/merch"
          border
          radius="md"
          padding={3}
          display="flex"
          align="center"
          justify="between"
          className="group bg-surface/30 hover:border-accent/40 hover:bg-surface/50 transition-colors"
        >
          <Stack direction="row" align="center" gap={3}>
            <Box padding={1.5} radius="md" className="bg-accent-magenta/10 text-accent-magenta group-hover:bg-accent-magenta/20 transition-colors">
              <Tag className="h-4 w-4" />
            </Box>
            <Stack gap={0.5}>
              <Text variant="body" size="xs" weight="font-bold" className="group-hover:text-accent transition-colors">
                Exclusive Apparel & Merch
              </Text>
              <Text variant="body" size="micro" color="dim">
                Slot Era and Role Pride tees, hoodies, and accessories
              </Text>
            </Stack>
          </Stack>
          <ArrowRight className="h-4 w-4 text-dim group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
        </Box>
      </Stack>

      {/* Footer CTA */}
      <Text
        as={NavLink}
        to="/gear"
        display="block"
        marginTop={5}
        paddingY={{ base: 4, sm: 0 }}
        paddingX={{ base: 4, sm: 0 }}
        variant="mono"
        size="xs"
        color="accent"
        weight="font-bold"
        className="hover:underline"
      >
        Explore WCS Collection →
      </Text>
    </Box>
  );
}
