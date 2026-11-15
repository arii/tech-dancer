import { NavLink } from 'react-router-dom';
import { Shirt, Tag, ArrowRight } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';

export function GearCallout() {
  return (
    <Box border radius="md" padding={6} className="w-full max-w-full min-w-0">
      <Text as="h3" variant="h4" marginBottom={2}>
        WCS Collection
      </Text>

      <Text variant="body" color="body" size="sm" leading="relaxed" marginBottom={4}>
        I put together these gear guides around what I actually use on the social floor: DIY shoe modifications, packing checklists, and partner dance tees and accessories that hold up to a full weekend of social dancing.
      </Text>

      {/* Content links/sections */}
      <Stack gap={3}>
        <Box
          as={NavLink}
          to="/gear"
          radius="md"
          padding={3}
          display="flex"
          align="center"
          justify="between"
          className="group transition-colors hover:bg-surface-alt"
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
          radius="md"
          padding={3}
          display="flex"
          align="center"
          justify="between"
          className="group transition-colors hover:bg-surface-alt"
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
    </Box>
  );
}
