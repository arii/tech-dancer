
import { NavLink } from 'react-router-dom';
import { Terminal } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';

export function DevLabCallout() {
  return (
    <Box border radius="lg" padding={5} width="full" maxWidth="full" minWidth={0}>
      {/* Header row */}
      <Stack direction="row" align="center" gap={3}>
        <Box shrink={0} radius="md" padding={2} className="bg-accent/10">
          <Box as={Terminal} width={4} height={4} className="text-accent" />
        </Box>
        <Text variant="mono" size="xs" color="accent" weight="font-bold" uppercase className="tracking-widest">
          DevAI Portfolio
        </Text>
      </Stack>


      {/* Description */}
      <Text variant="body" size="xs" color="dim" leading="relaxed">
        Welcome to my DevAI Portfolio. This platform is a live production testbed where every feature and data pipeline is audited and optimized by an autonomous suite of developer agents operating across local environments and CI/CD pipelines.
      </Text>

      {/* CTA */}
      <Text
        as={NavLink}
        to="/research"
        display="block"
        marginTop={3}
        variant="mono"
        size="xs"
        color="accent"
        weight="font-bold"
        paddingX={2}
        paddingY={4}
        marginLeft={-2}
        className="hover:underline"
      >
        View Portfolio →
      </Text>
    </Box>
  );
}
