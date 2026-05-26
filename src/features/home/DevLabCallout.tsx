import { NavLink } from 'react-router-dom';
import { Terminal } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';

export function DevLabCallout() {
  return (
    <Box
      border
      radius="lg"
      padding={8}
      display="flex"
      direction="col"
      justify="between"
      height="full"
      surface="alt"
    >
      <Stack gap={6}>
        <Box padding={4} radius="lg" className="w-fit bg-accent/10">
          <Terminal className="h-6 w-6 text-accent" />
        </Box>
        <Stack gap={3}>
          <Text variant="body" size="base" color="dim" leading="relaxed">
            Behind-the-scenes notes on BoomTick data tools, content systems, and
            experiments for dance media.
          </Text>
        </Stack>
      </Stack>
      <Box marginTop={8}>
        <Text
          as={NavLink}
          to="/research"
          variant="mono"
          size="xs"
          color="accent"
          weight="font-bold"
          className="hover:underline"
        >
          Explore the Dev Lab →
        </Text>
      </Box>
    </Box>
  );
}
