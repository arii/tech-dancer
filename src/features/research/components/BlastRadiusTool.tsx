import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { GitBranch, Layers, Activity } from 'lucide-react';
import { ArchitecturalAssetsList } from './ArchitecturalAssetsList';
import { DEVAI_ASSETS } from '@/config/devai-assets';
import { TOOL_ID_SCOPE_BLAST_RADIUS } from '@/config/devai-tool-ids';
import { ResearchToolShell } from '@/components/research/ResearchToolShell';
import { ToolFeatureCard } from './ToolFeatureCard';

export function BlastRadiusTool() {
  const assets = DEVAI_ASSETS.filter(a => a.toolId === TOOL_ID_SCOPE_BLAST_RADIUS);

  return (
    <ResearchToolShell
      title="Semantic Blast-Radius Analysis"
      description={
        <Text variant="body" color="dim">
          Automatically maps and isolates code-change scopes. By analyzing the dependency tree of modified files, this agent identifies downstream side-effects, allowing us to prevent cascading breaks before running expensive integration suites.
        </Text>
      }
      output={
        <>
          <Grid cols={{ base: 1, md: 2 }} gap={8}>
            <ToolFeatureCard
              icon={GitBranch}
              title="Scope Isolation"
              description="Calculates the exact semantic scope of modifications, identifying which components, hooks, or utilities are directly or indirectly affected by a change."
            />
            <ToolFeatureCard
              icon={Layers}
              title="AST Parsing"
              description="Leverages Abstract Syntax Tree (AST) analysis to understand deep code relationships that simple grep-based searches miss."
            />
          </Grid>

          <Stack gap={4}>
            <Box display="flex" align="center" gap={3} padding={6} border radius="md" surface="surface" className="bg-accent/5">
              <Activity className="text-accent w-6 h-6" />
              <Stack gap={1}>
                <Text variant="display" size="md" weight="font-bold">SDLC Bottleneck Telemetry</Text>
                <Text variant="body" size="sm" color="dim">
                  Profiles execution metrics of build scripts and automated workflows, translating runtime logs into actionable SDLC performance trends.
                </Text>
              </Stack>
            </Box>
          </Stack>

          <ArchitecturalAssetsList assets={assets} />
        </>
      }
    />
  );
}
