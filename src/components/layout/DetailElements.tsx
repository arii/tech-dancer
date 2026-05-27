
import { Box, Stack, Text } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';
import { Shield } from 'lucide-react';

export function SpecsTable({ specs }: { specs?: Record<string, string> }) {
  if (!specs || Object.keys(specs).length === 0) return null;

  return (
    <Stack gap={4}>
      <Text
        variant="mono"
        size="tiny"
        weight="font-bold"
        color="dim"
        uppercase
        tracking="widest"
        border="b"
        paddingBottom={2}
      >
        Technical Specs
      </Text>
      <Stack gap={3}>
        {Object.entries(specs).map(([key, value]) => (
          <Stack key={key} gap={1}>
            <Text variant="mono" size="tiny" color="dim" uppercase className="opacity-50">{key}</Text>
            <Text variant="mono" size="xs" weight="font-bold">{value}</Text>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}


export function VerdictCallout({ verdict }: { verdict: string }) {
  return (
    <Box border padding={8} surface="accent" marginBottom={12} radius="lg" className="border-accent/30">
       <Stack gap={3}>
          <Stack direction="row" align="center" gap={3}>
             <Icon icon={Shield} size="lg" color="accent" />
             <Text variant="display" size="2xl" weight="font-black" color="accent" uppercase>THE VERDICT</Text>
          </Stack>
          <Text variant="body" size="lg" italic leading="relaxed" weight="font-medium" color="main">
            "{verdict}"
          </Text>
       </Stack>
    </Box>
  );
}
