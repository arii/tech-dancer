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

      {/* Metadata Fields */}
      <Stack gap={2} className="border-y border-line/30 py-3.5 my-1">
        <Box display="flex" justify="between" align="center" gap={2}>
          <Text variant="mono" size="xs" color="dim" uppercase className="tracking-wide">
            Status
          </Text>
          <Text variant="mono" size="xs" color="accent" weight="font-bold">
            ORCHESTRATION ACTIVE
          </Text>
        </Box>
        <Box display="flex" justify="between" align="center" gap={2}>
          <Text variant="mono" size="xs" color="dim" uppercase className="tracking-wide">
            Quality Gates
          </Text>
          <Text variant="mono" size="xs" className="text-emerald-500 font-bold">
            ENABLED
          </Text>
        </Box>
        <Box display="flex" justify="between" align="center" gap={2}>
          <Text variant="mono" size="xs" color="dim" uppercase className="tracking-wide">
            Frameworks
          </Text>
          <Text variant="mono" size="xs" color="white" weight="font-bold">
            CUSTOM DEVAI SDK
          </Text>
        </Box>
      </Stack>

      {/* Description */}
      <Text variant="body" size="xs" color="dim" leading="relaxed">
        Welcome to my active research sandbox. This platform is a live production testbed where every feature and data pipeline is audited and optimized by an autonomous suite of developer agents operating across local environments and CI/CD pipelines.
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
