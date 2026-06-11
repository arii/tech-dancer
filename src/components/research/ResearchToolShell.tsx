// ResearchToolShell – shared chrome for research tools
// Uses design‑system primitives (Box, Stack, Text, Grid) and MUI styling.
// Slots: title, optional description, optional controls, optional summaryCards,
// output (main content), optional docLink.

import React, { ReactNode } from 'react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';

export interface ResearchToolShellProps {
  /** Main heading of the tool */
  title: string;
  /** Optional explanatory copy displayed under the title */
  description?: ReactNode;
  /** Optional control region (e.g., input fields, filters) */
  controls?: ReactNode;
  /** Optional summary cards region (e.g., stats, key metrics) */
  summaryCards?: ReactNode;
  /** Main output/content area */
  output: ReactNode;
  /** Optional documentation link (URL) */
  docLink?: string;
}

/**
 * Shared layout for all research‑tool pages. It provides a consistent header,
 * optional description, a two‑column layout for controls/summary, and a full‑width
 * output region. The component follows the project's design‑system using the
 * Box/Stack primitives which internally map to MUI components.
 */
const ResearchToolShell: React.FC<ResearchToolShellProps> = ({
  title,
  description,
  controls,
  summaryCards,
  output,
  docLink,
}) => (
  <Box border radius="lg" padding={8} surface="default">
    <Stack gap={8}>
      {/* Header */}
      <Stack gap={4}>
        <Text variant="headline" size="xl" weight="font-black">
          {title}
        </Text>
        {description && (
          <Text variant="body" color="dim">
            {description}
          </Text>
        )}
      </Stack>

      {/* Controls / Summary area – two‑column on md+ */}
      {(controls || summaryCards) && (
        <Grid cols={{ base: 1, md: 2 }} gap={8}>
          {controls && <Box>{controls}</Box>}
          {summaryCards && <Box>{summaryCards}</Box>}
        </Grid>
      )}

      {/* Main output */}
      <Box>{output}</Box>

      {/* Documentation link */}
      {docLink && (
        <Text variant="body" size="sm" color="dim">
          <a href={docLink} target="_blank" rel="noopener noreferrer">
            Documentation ↗
          </a>
        </Text>
      )}
    </Stack>
  </Box>
);

export default ResearchToolShell;
