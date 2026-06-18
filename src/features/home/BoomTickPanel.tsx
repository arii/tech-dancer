import { NavLink } from 'react-router-dom';
import { Box, Stack, Text, Button } from '@/layouts/Primitives';

export function BoomTickPanel() {
  return (
    <Box
      radius="lg"
      padding={6}
      surface="default"
      border
      className="bg-white/5 backdrop-blur-sm h-full relative overflow-hidden"
    >
      {/* Rainbow top accent bar */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        height={1}
        className="bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500"
      />

      <Stack gap={4} height="full">
        <Text variant="headline" size="sm" color="accent" weight="font-bold" uppercase tracking="widest">
          Dance · Pride · Community
        </Text>

        <Text variant="body" size="base" color="main" leading="relaxed">
          Bay Area apparel for WCS, Lindy, and partner dance culture. High-quality gear designed for the social floor, celebrating inclusivity and Northern California roots.
        </Text>

        <Box
          radius="md"
          border
          padding={3}
          className="bg-surface/30 mt-2"
        >
          <Stack direction="row" gap={3} align="center">
            <Box radius="sm" overflow="hidden" width={16} height={16} shrink={0}>
              <img
                src="/assets/gear/norcal-bestcal-front.webp"
                alt="NorCal Best Cal Tee"
                className="w-full h-full object-cover"
              />
            </Box>
            <Stack gap={0.5}>
              <Text variant="body" size="sm" weight="font-bold">NorCal Best Cal</Text>
              <Text variant="body" size="xs" color="dim">Golden Gate Rainbow Edition</Text>
            </Stack>
          </Stack>
        </Box>

        <Box marginTop="auto" paddingTop={4}>
          <Button as={NavLink} to="/merch" variant="primary" fullWidth>
            Shop the Collection
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
