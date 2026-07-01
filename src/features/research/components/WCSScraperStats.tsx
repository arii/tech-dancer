import { Box, Stack, Text } from '@/layouts/Primitives';
import { StatusBadge } from '@/components/ui/StatusBadge';

interface WCSScraperStatsProps {
  latency: number | null;
  totalEvents: number | null;
}

export function WCSScraperStats({ latency, totalEvents }: WCSScraperStatsProps) {
  return (
    <Box paddingX={4} paddingY={6}>
      <Stack gap={4}>
        <Text variant="mono" size="micro" color="dim" uppercase weight="font-bold" tracking="widest">Stats</Text>
        <Stack gap={4}>
          <Box display="flex" justify="between" align="center" borderBottom="b" paddingBottom={2} className="border-line/20">
            <Text variant="body" size="xs" color="dim">Status</Text>
            <Text variant="mono" size="xs" color="brand" weight="font-bold">OPERATIONAL</Text>
          </Box>
          <Box display="flex" justify="between" align="center" borderBottom="b" paddingBottom={2} className="border-line/20">
            <Text variant="body" size="xs" color="dim">Latency</Text>
            <Text variant="mono" size="xs" color="brand" weight="font-bold">
              {latency ? `${(latency / 1000).toFixed(2)}s` : '---'}
            </Text>
          </Box>
          <Box display="flex" justify="between" align="center" borderBottom="b" paddingBottom={2} className="border-line/20">
            <Text variant="body" size="xs" color="dim">Events Processed</Text>
            <Text variant="mono" size="xs" color="brand" weight="font-bold">{totalEvents || '---'}</Text>
          </Box>
          <Box display="flex" justify="between" align="center">
            <Text variant="body" size="xs" color="dim">Safe Access</Text>
            <StatusBadge label="ACTIVE" />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}
