// impeccable-ignore-file
import { NavLink } from 'react-router-dom';
import { Terminal } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';

export function DevLabCallout() {
  return (
    <Box border radius="lg" padding={5} className="flex flex-col gap-4">
      {/* Header row */}
      <Stack direction="row" align="center" gap={3}>
        <Box className="shrink-0 rounded-md bg-accent/10 p-2">
          <Terminal className="h-4 w-4 text-accent" />
        </Box>
        <Text variant="mono" size="xs" color="accent" weight="font-bold" uppercase className="tracking-widest">
          DevAI Lab
        </Text>
      </Stack>

      {/* Body */}
      <Text variant="body" size="sm" color="dim" leading="relaxed">
        Behind-the-scenes notes on BoomTick data tools, content systems, and experiments
        for dance media.
      </Text>

      {/* CTA */}
      <Text
        as={NavLink}
        to="/research"
        variant="mono"
        size="xs"
        color="accent"
        weight="font-bold"
        className="hover:underline"
      >
        Explore the DevAI Lab →
      </Text>
    </Box>
  );
}
