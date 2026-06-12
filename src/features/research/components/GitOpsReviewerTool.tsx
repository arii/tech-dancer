import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { Cpu, ShieldAlert } from 'lucide-react';
import { ArchitecturalAssetsList } from './ArchitecturalAssetsList';
import { DEVAI_ASSETS } from '@/config/devai-assets';
import { TOOL_ID_GITOPS_PR_REVIEWER } from '@/config/devai-tool-ids';
import { ResearchToolShell } from '@/components/research/ResearchToolShell';
import { ToolFeatureCard } from './ToolFeatureCard';

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
            <ToolFeatureCard
              icon={ShieldAlert}
              title="Safety Scorecards"
              description="Runs autonomous static analysis on incoming pull requests. Generates structural code safety scorecards, ensuring new features adhere to the repository's strict design-token and styling rules."
            />
            <ToolFeatureCard
              icon={Cpu}
              title="Model Agnostic"
              description="Built on a flexible orchestration layer supporting both high-performance cloud LLMs (Gemini) and local privacy-first models (Ollama/Llama)."
            />
          </Grid>
          <ArchitecturalAssetsList assets={assets} />
        </>
      }
    />
  );
}
