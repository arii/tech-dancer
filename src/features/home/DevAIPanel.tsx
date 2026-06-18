import { NavLink } from 'react-router-dom';
import { Terminal } from 'lucide-react';
import { Box, Stack, Text, Button } from '@/layouts/Primitives';

export function DevAIPanel() {
  return (
    <Box
      radius="lg"
      padding={6}
      surface="default"
      border
      className="bg-surface/50 backdrop-blur-sm h-full"
    >
      <Stack gap={4} height="full">
        <Stack direction="row" align="center" gap={3}>
          <Box padding={2} radius="md" shrink={0} className="bg-accent/10">
            <Terminal className="h-5 w-5 text-accent" />
          </Box>
          <Text variant="mono" size="sm" color="accent" weight="font-bold" uppercase tracking="widest">
            DevAI Portfolio
          </Text>
        </Stack>

        <Text variant="body" size="base" color="main" leading="relaxed">
          A live production testbed where every feature and pipeline is audited by an autonomous suite of developer agents. I build AI-assisted engineering infrastructure and agentic CI/CD workflows.
        </Text>

        <Stack gap={3} marginTop={2}>
          <Text
            as={NavLink}
            to="/research/repo-auditor-ai"
            variant="mono"
            size="xs"
            color="dim"
            className="hover:text-accent underline underline-offset-4"
          >
            → repo-auditor-ai
          </Text>
          <Text
            as={NavLink}
            to="/research/gitops-pr-reviewer"
            variant="mono"
            size="xs"
            color="dim"
            className="hover:text-accent underline underline-offset-4"
          >
            → CI failure root cause agent
          </Text>
        </Stack>

        <Box marginTop="auto" paddingTop={4}>
          <Button as={NavLink} to="/research" variant="outline" fullWidth>
            View Portfolio
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
