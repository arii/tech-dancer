import { useParams } from 'react-router-dom';
import { Database, Activity, Search } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { useResearch } from '../useResearch';
import type { LabTool } from '../types';

export function ToolHeader({ tool }: { tool: LabTool }) {
  return (
    <Stack gap={4}>
      <Text variant="mono" color="brand" size="xs" weight="font-bold" uppercase tracking="widest">
        LABORATORY_ACCESS // {tool.category.toUpperCase()}
      </Text>
      <Text variant="headline" size="fluid-7">{tool.name}</Text>
      <Box border surface="accent" padding="compact" opacity={10} className="bg-accent/5">
        <Text variant="body" size="lg" color="body">{tool.layman}</Text>
      </Box>
    </Stack>
  );
}

export function ToolStatus({ tool }: { tool: LabTool }) {
  return (
    <Grid cols={{ base: 1, md: 2 }} gap={12}>
      <Stack gap={4}>
        <Text variant="mono" size="micro" color="dim" uppercase tracking="widest">System Status</Text>
        <Box border padding="compact" display="flex" align="center" gap={3}>
          <Activity className="w-4 h-4 text-accent-brand" />
          <Text variant="mono" size="xs" color="brand" weight="font-bold">{tool.status.toUpperCase()}</Text>
        </Box>
      </Stack>
      <Stack gap={4}>
        <Text variant="mono" size="micro" color="dim" uppercase tracking="widest">Database Source</Text>
        <Box border padding="compact" display="flex" align="center" gap={3}>
          <Database className="w-4 h-4 text-accent-brand text-dim" />
          <Text variant="mono" size="xs">WSDC REGISTRY // AUTHENTICATED</Text>
        </Box>
      </Stack>
    </Grid>
  );
}

export function ToolWipMessage({ tool }: { tool: LabTool }) {
  if (tool.status !== 'Coming Soon') return null;

  return (
    <Box border surface="accent" padding="card" className="bg-accent-brand/5 border-dashed">
      <Stack gap={4} align="center" textAlign="center">
        <Search className="w-8 h-8 text-accent-brand opacity-50" />
        <Stack gap={2}>
          <Text variant="display" size="xl">Work in Progress</Text>
          <Text variant="body" size="sm" color="dim" maxWidth="md">
            This specialized module is currently being integrated into the Tech-Dancer platform. We are finalizing the analysis models and UI components.
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
}

export function ToolView() {
  const { id } = useParams();
  const { getTool } = useResearch();
  const tool = id ? getTool(id) : null;

  if (!tool) return null;

  return (
    <Stack gap={12}>
      <ToolHeader tool={tool} />
      <ToolStatus tool={tool} />
      <ToolWipMessage tool={tool} />
    </Stack>
  );
}
