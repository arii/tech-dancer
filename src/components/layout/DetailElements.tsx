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
      <dl className="grid grid-cols-1 gap-2.5 font-mono text-xs">
        {Object.entries(specs).map(([key, value]) => (
          <div key={key} className="flex flex-col sm:flex-row sm:justify-between py-1.5 border-b border-line/10 gap-1 sm:gap-4">
            <dt className="text-text-dim text-xs uppercase tracking-wider">{key}</dt>
            <dd className="font-bold text-text-main text-right">{value}</dd>
          </div>
        ))}
      </dl>
    </Stack>
  );
}


export function VerdictCallout({ verdict }: { verdict: string }) {
  return (
    <Box border padding={8} surface="accent" marginBottom={12} radius="lg" className="border-accent/30">
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
