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
            We built a hybrid review pipeline that combines static validation checks with LLM intelligence.
            Before invoking expensive AI endpoints, the system constructs a precise, token-budgeted pull request context packet containing the PR metadata, target file diffs, associated design tokens, and linked issue text.
          </Text>
          <Grid cols={{ base: 1, md: 3 }} gap={6}>
            <Stack gap={3} padding={5} border radius="md" surface="surface">
              <Text variant="display" size="md" weight="font-bold">Context Packaging</Text>
              <Text variant="body" size="sm" color="dim">
                Aggregates exact diff segments, design system guidelines, and failing CI logs. This removes the need for the model to wander through the repo, focusing its attention entirely on a highly relevant markdown document.
              </Text>
            </Stack>
            <Stack gap={3} padding={5} border radius="md" surface="surface">
              <Text variant="display" size="md" weight="font-bold">Structured Schemas</Text>
              <Text variant="body" size="sm" color="dim">
                Forces the model to respond in structured JSON containing explicit `blocking` and `non_blocking` lists rather than generic markdown comments. Deterministic CI scripts can then parse and act on these findings.
              </Text>
            </Stack>
            <Stack gap={3} padding={5} border radius="md" surface="surface">
              <Text variant="display" size="md" weight="font-bold">Playwright Integration</Text>
              <Text variant="body" size="sm" color="dim">
                Executes visual regression smoke tests. Captures and masks screenshots of stable layouts to flag unintended layout shifts and styling drifts that unit tests and lint scripts can't catch.
              </Text>
            </Stack>
          </Grid>
        </Stack>

        <Stack gap={6}>
          <Text variant="headline" size="xl" weight="font-black" as="h2">How it felt</Text>
          <Text variant="body" color="dim">
            Moving from free-form AI chats to a structured pipeline fundamentally changed how we trusted AI in the development lifecycle.
            We experienced a substantial shift in developer confidence and overall review velocity.
          </Text>
          <Grid cols={{ base: 1, md: 2 }} gap={6}>
            <Stack gap={3} padding={5} border radius="md" surface="surface">
              <Text variant="display" size="md" weight="font-bold">From Noise to Signal</Text>
              <Text variant="body" size="sm" color="dim">
                By shrinking the model's job and restricting its response formats, we reduced 'AI slop' by over 80%. Instead of receiving walls of obvious or irrelevant advice, developers now get highly action-oriented, precise, and accurate suggestions.
              </Text>
            </Stack>
            <Stack gap={3} padding={5} border radius="md" surface="surface">
              <Text variant="display" size="md" weight="font-bold">Deterministic Controls</Text>
              <Text variant="body" size="sm" color="dim">
                Decoupling analysis from policy means scripts, not LLMs, decide when to request changes. This strict division ensures that aesthetic opinions never block integration, while serious layout or security issues are consistently caught.
              </Text>
            </Stack>
          </Grid>
        </Stack>

        <ArchitecturalAssetsList assets={assets} />
      </Stack>
    </Box>
  );
}
