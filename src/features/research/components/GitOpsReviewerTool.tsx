import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { Cpu, ShieldAlert } from 'lucide-react';
import { ArchitecturalAssetsList } from './ArchitecturalAssetsList';
import { DEVAI_ASSETS } from '@/config/devai-assets';
import { TOOL_ID_GITOPS_PR_REVIEWER } from '@/config/devai-tool-ids';

export function GitOpsReviewerTool() {
  const assets = DEVAI_ASSETS.filter(a => a.toolId === TOOL_ID_GITOPS_PR_REVIEWER);

  return (
    <Box border radius="md" padding={8} surface="default">
      <Stack gap={8}>
        <Stack gap={4}>
          <Text variant="headline" size="xl" weight="font-black">Automating the Outer Loop</Text>
          <Text variant="body" color="dim">
            To maintain architectural consistency and prevent regression at scale, I built and integrated deterministic GitOps agents directly into the code review lifecycle.
          </Text>
        </Stack>

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
              Built on a flexible orchestration layer supporting multiple high-performance LLM providers, including Gemini and OpenAI-compatible models.
            </Text>
          </Stack>
        </Grid>

        <Stack gap={6}>
          <Text variant="headline" size="xl" weight="font-black" as="h2">What we built</Text>
          <Text variant="body" color="dim">
            We developed <strong>Boomtick (`boomtick-pkg`)</strong>, a decoupled, framework-agnostic foundational template repository and orchestrator designed to separate human-led strategy from agentic execution. It serves as our advanced AI review framework and local developer CLI.
          </Text>
          <Grid cols={{ base: 1, md: 2 }} gap={6}>
            <Stack gap={3} padding={5} border radius="md" surface="surface">
              <Text variant="display" size="md" weight="font-bold">Model Context Protocol (MCP)</Text>
              <Text variant="body" size="sm" color="dim">
                Our `mcp/` server grants autonomous agents structured access to pull requests, files, and CI logs, and orchestrates seamless integration with macro-agents such as Jules.
              </Text>
            </Stack>
            <Stack gap={3} padding={5} border radius="md" surface="surface">
              <Text variant="display" size="md" weight="font-bold">Local Developer Tooling (td-cli)</Text>
              <Text variant="body" size="sm" color="dim">
                Our `cli/` module provides developers with command-line utilities to perform local PR audits, run static analysis checks, and fetch target repository states.
              </Text>
            </Stack>
          </Grid>
        </Stack>

        <Stack gap={6}>
          <Text variant="headline" size="xl" weight="font-black" as="h2">How we built it</Text>
          <Text variant="body" color="dim">
            By leveraging strict CI/CD automation pipelines, we combined multi-modal LLM orchestration (GitHub Models and Gemini) with advanced RAG systems to create an robust, automated triage review system.
          </Text>
          <Grid cols={{ base: 1, md: 3 }} gap={6}>
            <Stack gap={3} padding={5} border radius="md" surface="surface">
              <Text variant="display" size="md" weight="font-bold">Multi-Modal AI Orchestration</Text>
              <Text variant="body" size="sm" color="dim">
                Integrates Google Gemini for visual interface diffs and OpenAI-compatible GitHub Models for structural code analysis, routed seamlessly through `@langchain/core` fallback strategies.
              </Text>
            </Stack>
            <Stack gap={3} padding={5} border radius="md" surface="surface">
              <Text variant="display" size="md" weight="font-bold">RAG & Vector Retrieval</Text>
              <Text variant="body" size="sm" color="dim">
                Leverages a contextual retrieval pipeline utilizing local vector stores to perform automated duplicate code triage and identify architectural overlap before code merges.
              </Text>
            </Stack>
            <Stack gap={3} padding={5} border radius="md" surface="surface">
              <Text variant="display" size="md" weight="font-bold">CI/CD Guardrails</Text>
              <Text variant="body" size="sm" color="dim">
                Orchestrates automated feedback reviews directly onto the GitHub conversation. It runs visual regression smoke tests via Playwright, blocking or warning based on structured JSON results.
              </Text>
            </Stack>
          </Grid>
        </Stack>

        <ArchitecturalAssetsList assets={assets} />
      </Stack>
    </Box>
  );
}
