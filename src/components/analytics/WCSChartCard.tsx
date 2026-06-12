// WCSChartCard – shared container for WCS analytics charts
// Implements the design‑system primitives (Box, Stack, Text) and MUI styling.
// Props: title, optional description, chart children, optional empty‑state.

import React, { ReactNode } from 'react';
import { Box, Stack, Text } from '@/layouts/Primitives';

export interface WCSChartCardProps {
  /** Title displayed at the top of the card */
  title: string;
  /** Optional icon to display next to the title */
  icon?: ReactNode;
  /** Optional sub‑title or explanatory text */
  description?: string;
  /** The chart component (or any visual) */
  children: ReactNode;
  /** Content shown when there is no data – e.g. a placeholder message */
  emptyState?: ReactNode;
}

/**
 * Shared analytics card used by ScoreDistributionChart and AvgScoreTrendChart.
 * It renders a consistent header, optional description, a flexible chart area,
 * and an optional empty‑state slot.
 */
const WCSChartCard: React.FC<WCSChartCardProps> = ({
  title,
  icon,
  description,
  children,
  emptyState,
}) => (
  // impeccable-ignore
  <Box border surface="default" padding="card" height="[400px]">
    <Stack gap={4} height="full">
      <Box display="flex" align="center" gap={3}>
        {icon}
        <Text variant="mono" size="micro" weight="font-bold" uppercase>
          {title}
        </Text>
      </Box>
      {description && (
        <Box>
          <Text variant="mono" size="xs" color="dim">
            {description}
          </Text>
        </Box>
      )}
      <Box flex={1} minHeight={0}>
        {children}
      </Box>
      {emptyState && <Box>{emptyState}</Box>}
    </Stack>
  </Box>
);

export default WCSChartCard;
