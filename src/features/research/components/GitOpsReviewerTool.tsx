import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { Cpu, ShieldAlert } from 'lucide-react';
import { ArchitecturalAssetsList } from './ArchitecturalAssetsList';
import { DEVAI_ASSETS } from '@/config/devai-assets';
import { TOOL_ID_GITOPS_PR_REVIEWER } from '@/config/devai-tool-ids';

export function GitOpsReviewerTool() {
  const assets = DEVAI_ASSETS.filter(a => a.toolId === TOOL_ID_GITOPS_PR_REVIEWER);

  return (
    <ResearchToolShell
      title="Automating the Outer Loop"
      description={
        <Text variant="body" color="dim">
          To maintain architectural consistency and prevent regression at scale, I built and integrated deterministic GitOps agents directly into the code review lifecycle.
        </Text>
      }
      output={
        <>
          <Grid cols={{ base: 1, md: 2 }} gap={8}>
            <Stack gap={4} padding={6} border radius="md" surface="surface">
              <Box display="flex" align="center" gap={3}>
                <ShieldAlert className="text-accent w-6 h-6" />
                <Text variant="display" size="lg" weight="font-bold">Safety Scorecards</Text>
              </Box>
              <Text variant="body" size="sm" color="dim">
                Runs autonomous static analysis on incoming pull requests. Generates structural code safety scorecards, ensuring new features adhere to the repository's strict design-token and styling rules.
              </Text>
            </Stack>
            <Stack gap={4} padding={6} border radius="md" surface="surface">
              <Box display="flex" align="center" gap={3}>
                <Cpu className="text-accent w-6 h-6" />
                <Text variant="display" size="lg" weight="font-bold">Model Agnostic</Text>
              </Box>
              <Text variant="body" size="sm" color="dim">
                Built on a flexible orchestration layer supporting both high-performance cloud LLMs (Gemini) and local privacy-first models (Ollama/Llama).
              </Text>
            </Stack>
          </Grid>
          <ArchitecturalAssetsList assets={assets} />
        </>
      }
    />
  );
}
