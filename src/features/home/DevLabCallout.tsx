// impeccable-ignore-file
import { NavLink } from 'react-router-dom';
import { Terminal } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';

export function DevLabCallout() {
  return (
    <Box
      border
      radius="lg"
      className="flex h-full flex-col justify-between p-5"
    >
      <Stack gap={3}>
        <Box className="w-fit rounded-md bg-accent/10 p-2">
          <Terminal className="h-4 w-4 text-accent" />
        </Box>
        <Stack gap={1.5}>
          <Text variant="mono" size="xs" color="accent" weight="font-bold" uppercase className="tracking-widest">
            DevAI Lab
          </Text>
          <Text variant="body" size="sm" color="dim" leading="relaxed" className="line-clamp-3">
            Behind-the-scenes notes on BoomTick data tools, content systems, and experiments
            for dance media.
          </Text>
        </Stack>
      </Stack>
      <Box className="mt-4">
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
