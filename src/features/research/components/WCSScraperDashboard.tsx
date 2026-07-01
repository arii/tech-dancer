import { Zap, ShieldCheck } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';
import { useWCSData } from '../hooks/useWCSData';

export function WCSScraperDashboard() {
  const { totalEvents, isLoading, lastSync } = useWCSData();

  return (
    <Box padding={{ base: 4, md: 8 }} border radius="xl" surface="muted" className="relative overflow-hidden">
      <Grid cols={{ base: 1, lg: 2 }} gap={{ base: 8, lg: 12 }}>
        <Stack gap={6}>
          <Stack gap={2}>
            <Text variant="display" size="2xl" weight="font-black">Event Data</Text>
            <Text variant="body" size="lg" color="dim">
              We have retrieved data from {(totalEvents || 6308).toLocaleString()} events since 2023.
              We are currently adding more past results to the database.
            </Text>
          </Stack>
          <Grid cols={{ base: 1, md: 2 }} gap={6}>
            <Stack gap={2}>
              <Box display="flex" align="center" gap={2}>
                <Icon icon={Zap} size="sm" color="accent" />
                <Text weight="font-bold" size="xs" uppercase tracking="widest" color="accent">Safe Access</Text>
              </Box>
              <Text size="xs" color="dim">Asynchronous extraction with intentional delays to ensure zero impact on host server performance.</Text>
            </Stack>
            <Stack gap={2}>
              <Box display="flex" align="center" gap={2}>
                <Icon icon={ShieldCheck} size="sm" color="accent" />
                <Text weight="font-bold" size="xs" uppercase tracking="widest" color="accent">Public Data</Text>
              </Box>
              <Text size="xs" color="dim">Strictly indexing public scoring data for aggregate research and statistical analysis.</Text>
            </Stack>
          </Grid>
        </Stack>
        <Stack gap={6} justify="center">
          <Box padding={6} border radius="md" surface="surface">
            <Stack gap={4}>
              <Box display="flex" justify="between" align="center">
                <Text variant="mono" size="xs" weight="font-bold" color="dim">VERIFICATION</Text>
                <Text variant="mono" size="micro" color="success">ACTIVE</Text>
              </Box>
              <Text size="sm" color="body">
                We check multiple data points (Result IDs and Event URLs) to ensure the scores are accurate.
              </Text>
              <Box height={0.5} surface="muted" />
              <Box display="flex" justify="between" align="center">
                <Text variant="mono" size="xs" weight="font-bold" color="dim">LAST SYNC</Text>
                <Text variant="mono" size="micro" color="accent">{isLoading ? 'PENDING' : lastSync || 'RECENT'}</Text>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Grid>
    </Box>
  );
}
