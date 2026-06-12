// impeccable-ignore-file
import { ReactNode } from 'react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { LucideIcon } from 'lucide-react';

interface AnalyticsChartCardProps {
  title: string;
  icon: LucideIcon;
  hasData: boolean;
  emptyStateMessage: string;
  children: ReactNode;
}

export function AnalyticsChartCard({ title, icon: Icon, hasData, emptyStateMessage, children }: AnalyticsChartCardProps) {
  return (
    <Box border surface="default" padding="card" height="[400px]">
      <Stack gap={4} height="full">
        <Box display="flex" align="center" gap={3}>
          <Icon className="w-4 h-4 text-accent" />
          <Text variant="mono" size="micro" weight="font-bold" uppercase>{title}</Text>
        </Box>
        <Box flex={1} minHeight={0}>
          {hasData ? (
            children
          ) : (
            <Box display="flex" align="center" justify="center" height="full">
              <Text variant="mono" size="xs" color="dim">{emptyStateMessage}</Text>
            </Box>
          )}
        </Box>
      </Stack>
    </Box>
  );
}
