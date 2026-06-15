// impeccable-ignore-file
import { NavLink } from 'react-router-dom';
import { Terminal } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';

export function DevLabCallout() {
  return (
    <Box border radius="lg" padding={5} className="w-full max-w-full min-w-0">
      {/* Header row */}
      <Stack direction="row" align="center" gap={3}>
        <Box className="shrink-0 rounded-md bg-accent/10 p-2">
          <Terminal className="h-4 w-4 text-accent" />
        </Box>
        <Text variant="mono" size="xs" color="accent" weight="font-bold" uppercase className="tracking-widest">
          DevAI Portfolio
        </Text>
      </Stack>


      {/* Description */}
      <Text variant="body" size="xs" color="dim" leading="relaxed">
        A live testbed for agentic dev workflows — multi-agent pipelines, CI auditing, and evals running on this site.
      </Text>

      {/* CTA */}
      <Text
        as={NavLink}
        to="/research"
        display="block"
        marginTop={4}
        paddingY={{ base: 4, sm: 0 }}
        paddingX={{ base: 4, sm: 0 }}
        variant="mono"
        size="xs"
        color="accent"
        weight="font-bold"
        className="hover:underline"
      >
        View Portfolio →
      </Text>
    </Box>
  );
}
