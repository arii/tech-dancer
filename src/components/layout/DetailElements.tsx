import { Box, Stack, Text } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';
import { Shield } from 'lucide-react';

export function SpecsTable({ specs }: { specs?: Record<string, string> }) {
  if (!specs || Object.keys(specs).length === 0) return null;

  return (
    <Stack gap={4}>
      <Text
        variant="mono"
        size="xs"
        weight="font-bold"
        color="main"
        border="b"
        paddingBottom={2}
      >
        Technical Specs
      </Text>
      <Stack as="dl" gap={2.5}>
        {Object.entries(specs).map(([key, value]) => (
          <Stack
            as="div"
            key={key}
            direction={{ base: 'col', sm: 'row' }}
            justify="between"
            paddingY={1.5}
            gap={{ base: 1, sm: 4 }}
            className="border-b border-line/10"
          >
            <Text as="dt" variant="mono" size="xs" color="dim" uppercase tracking="wider">
              {key}
            </Text>
            <Text as="dd" variant="mono" size="xs" weight="font-bold" color="main" className="sm:text-right">
              {value}
            </Text>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}


export function VerdictCallout({ verdict }: { verdict: string }) {
  return (
    <Box border padding={{ base: 5, md: 8 }} surface="accent" marginBottom={{ base: 8, md: 12 }} radius="lg" className="border-accent/30">
       <Stack gap={3}>
          <Stack direction="row" align="center" gap={3}>
             <Icon icon={Shield} size="lg" color="accent" />
             <Text variant="display" size="2xl" weight="font-black" color="accent">The Verdict</Text>
          </Stack>
          <Text variant="body" size="lg" italic leading="relaxed" weight="font-medium" color="main">
            {verdict}
          </Text>
       </Stack>
    </Box>
  );
}
