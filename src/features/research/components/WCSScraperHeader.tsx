import { useCallback, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { ActionButton } from '@/components/ui/ActionButton';
import { useWCSData } from '../hooks/useWCSData';

export function WCSScraperHeader() {
  const { error, totalEvents } = useWCSData();

  if (error) {
    return (
      <Box border surface="muted" padding="card" className="border-accent/20">
        <Stack align="center" gap={4} paddingY={10}>
          <AlertCircle className="w-12 h-12 text-accent opacity-muted" />
          <Stack align="center" gap={1}>
            <Text variant="mono" size="sm" weight="font-bold" uppercase>Data Synchronisation Failed</Text>
            <Text variant="body" size="xs" color="dim" textAlign="center">{error}</Text>
          </Stack>
          <Box paddingTop={4}>
            <ActionButton variant="secondary" paddingX={6} paddingY={3} onClick={() => window.location.reload()}>
              Retry Connection
            </ActionButton>
          </Box>
        </Stack>
      </Box>
    );
  }

  return (
    <Box paddingBottom={8} borderBottom>
      <Stack gap={4}>
        <Box display="flex" align="center" gap={3}>
          <Text variant="mono" size="xs" weight="font-bold" color="accent" uppercase tracking="widest">Scoring Tool</Text>
          <Box
            as="div"
            display="inline-block"
            paddingX={2}
            paddingY={0.5}
            surface="accent"
            size="xs"
            weight="font-black"
            uppercase
            tracking="widest"
            className="text-accent-navy"
          >
            active
          </Box>
        </Box>
        <Stack gap={2}>
          <Text variant="display" size="4xl" weight="font-black">WCS Scoring Analysis</Text>
          <Text variant="body" size="lg" color="dim" maxWidth="3xl">
            A tool for extracting and analyzing public West Coast Swing competition results.
            Provides transparency on scoring patterns and promotion trends through data analysis.
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
}
