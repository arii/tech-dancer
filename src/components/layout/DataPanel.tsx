// DataPanel – generic panel with title, optional actions, and content
// Uses design‑system primitives (Box, Stack, Text) and respects MUI styling.

import React, { ReactNode } from 'react';
import { Box, Stack, Text } from '@/layouts/Primitives';

export interface DataPanelProps {
  /** Panel title */
  title: string;
  /** Optional action row (e.g., buttons, filters) */
  actions?: ReactNode;
  /** Main panel content */
  children: ReactNode;
}

/**
 * Reusable panel component for tables, lists, and other data displays.
 * It renders a header with the title and an optional actions region,
 * followed by the supplied children.
 */
const DataPanel: React.FC<DataPanelProps> = ({ title, actions, children }) => (
  <Box border surface="default" padding="card">
    <Stack gap={4}>
      <Box display="flex" align="center" justify="between" gap={4}>
        <Text variant="mono" size="xs" weight="font-bold" uppercase>
          {title}
        </Text>
        {actions && <Box>{actions}</Box>}
      </Box>
      {children}
    </Stack>
  </Box>
);

export default DataPanel;
