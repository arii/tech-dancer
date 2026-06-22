import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { GitBranch, Layers, Activity } from 'lucide-react';
import { ArchitecturalAssetsList } from './ArchitecturalAssetsList';
import { TOOL_ID_DEPLOYMENT_IMPACT_ANALYZER, TOOL_ID_SDLC_PROFILER } from '@/config/devai-tool-ids';
import { useResearchToolAssets } from '@/lib/hooks/useResearchToolAssets';

export function DeploymentImpactAnalyzerTool() {
  const assets = useResearchToolAssets([
    TOOL_ID_DEPLOYMENT_IMPACT_ANALYZER,
    TOOL_ID_SDLC_PROFILER
  ]);

  return (
    <Box border radius="lg" padding={8} surface="default">
      <Stack gap={10}>
        <Stack gap={4}>
          <Text variant="headline" size="xl" weight="font-black">Deployment Impact Analyzer</Text>
          <Text variant="body" color="dim" maxWidth="3xl">
            Automatically maps and isolates code-change scopes. By analyzing the dependency tree of modified files, this agent identifies downstream side-effects, allowing us to prevent cascading breaks before running expensive integration suites.
          </Text>
        </Stack>

        <Grid cols={{ base: 1, md: 3 }} gap={6}>
          <Stack gap={4} padding={6} border radius="md" surface="surface" height="full">
            <Box display="flex" align="center" gap={3}>
              <GitBranch className="text-accent w-5 h-5" />
              <Text variant="display" size="md" weight="font-bold">Scope Isolation</Text>
            </Box>
            <Text variant="body" size="sm" color="dim">
              Calculates the exact semantic scope of modifications, identifying which components, hooks, or utilities are directly or indirectly affected by a change.
            </Text>
          </Stack>

          <Stack gap={4} padding={6} border radius="md" surface="surface" height="full">
            <Box display="flex" align="center" gap={3}>
              <Layers className="text-accent w-5 h-5" />
              <Text variant="display" size="md" weight="font-bold">AST Parsing</Text>
            </Box>
            <Text variant="body" size="sm" color="dim">
              Leverages Abstract Syntax Tree (AST) analysis to understand deep code relationships that simple grep-based searches miss.
            </Text>
          </Stack>

          <Stack gap={4} padding={6} border radius="md" surface="surface" height="full">
            <Box display="flex" align="center" gap={3}>
              <Activity className="text-accent w-5 h-5" />
              <Text variant="display" size="md" weight="font-bold">SDLC Telemetry</Text>
            </Box>
            <Text variant="body" size="sm" color="dim">
              Profiles execution metrics of build scripts and automated workflows, translating runtime logs into actionable SDLC performance trends.
            </Text>
          </Stack>
        </Grid>

        <ArchitecturalAssetsList assets={assets} />
      </Stack>
    </Box>
  );
}
