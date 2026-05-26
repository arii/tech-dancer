// impeccable-ignore-file
import { NavLink } from 'react-router-dom';
import { Terminal } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';

export function DevLabCallout() {
  return (
    <Box
      border
      radius="lg"
      className="flex h-full flex-col justify-between bg-surface-alt p-5 lg:p-6"
    >
      <Stack gap={4}>
        <Box padding={2} radius="md" className="w-fit bg-accent/10">
          <Terminal className="h-5 w-5 text-accent" />
        </Box>
        <Stack gap={2}>
          <Text variant="headline" size="base" weight="font-black" color="main">
            Dev Lab
          </Text>
          <Text variant="body" size="sm" color="dim" leading="relaxed">
            Behind-the-scenes notes on building BoomTick: data tools, content systems, and
            experiments for dance media.
          </Text>
        </Stack>
      </Stack>
      <Box marginTop={5}>
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
