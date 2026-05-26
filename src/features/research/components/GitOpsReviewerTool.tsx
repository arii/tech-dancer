import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { Cpu, Terminal, ShieldAlert, FileCode } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';

export function GitOpsReviewerTool() {
  return (
    <Stack gap={12}>
      <PageHeader
        label="DEVAI SYSTEM // GITOPS"
        title="GitOps Code Review Agent"
        description="Autonomous static analysis and structural code safety auditing."
        paddingBottom={0}
        border="none"
      />

      <Box border radius="lg" padding={8} surface="default">
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
                Built on a flexible orchestration layer supporting both high-performance cloud LLMs (Gemini) and local privacy-first models (Ollama/Llama).
              </Text>
            </Stack>
          </Grid>

          <Stack gap={4}>
            <Text variant="mono" size="micro" color="dim" uppercase tracking="widest">Core Architectural Assets</Text>
            <Stack gap={2}>
              <Box display="flex" align="center" gap={3} padding={3} border radius="md" surface="surface">
                <FileCode size={16} className="text-accent" />
                <Text variant="mono" size="xs">dev-tools/mergellama.py</Text>
                <Text variant="mono" size="micro" color="dim" marginLeft="auto">PR Auditor</Text>
              </Box>
              <Box display="flex" align="center" gap={3} padding={3} border radius="md" surface="surface">
                <FileCode size={16} className="text-accent" />
                <Text variant="mono" size="xs">dev-tools/ollama_reviewer.py</Text>
                <Text variant="mono" size="micro" color="dim" marginLeft="auto">Local LLM Reviewer</Text>
              </Box>
              <Box display="flex" align="center" gap={3} padding={3} border radius="md" surface="surface">
                <Terminal size={16} className="text-accent" />
                <Text variant="mono" size="xs">dev-tools/td_cli.py</Text>
                <Text variant="mono" size="micro" color="dim" marginLeft="auto">CLI Manager</Text>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
