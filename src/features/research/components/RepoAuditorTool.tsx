import { useState } from 'react';
import {
  Box,
  Stack,
  Text,
  Grid,
} from '@/layouts/Primitives';
import {
  Github,
  ExternalLink,
  Cpu,
  ShieldCheck,
  Activity,
  Terminal,
  Settings,
  FileSearch,
  CheckCircle2,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { ArchitecturalAssetsList } from './ArchitecturalAssetsList';
import { TOOL_ID_REPO_AUDITOR } from '@/config/devai-tool-ids';
import { useResearchToolAssets } from '@/lib/hooks/useResearchToolAssets';
import { ActionButton } from '@/components/ui/ActionButton';

export function RepoAuditorTool() {
  const assets = useResearchToolAssets([TOOL_ID_REPO_AUDITOR]);
  const [activeTab, setActiveTab] = useState<'pr-review' | 'workflow' | 'jules'>('pr-review');

  const handleTabChange = (tabId: 'pr-review' | 'workflow' | 'jules') => {
    setActiveTab(tabId);
  };

  return (
    <Stack gap={10}>
      {/* Header Section */}
      <Box paddingBottom={8} borderBottom>
        <Stack gap={6}>
          <Grid cols={{ base: 1, md: 2 }} gap={8} align="center">
            <Stack gap={4}>
              <Box display="flex" align="center" gap={3}>
                <Text variant="mono" size="xs" weight="font-bold" color="accent" uppercase tracking="widest">Core Workflow</Text>
                <Box paddingX={2} paddingY={0.5} className="bg-accent/10 rounded-full">
                  <Text variant="mono" size="micro" color="accent" weight="font-bold">PRODUCTION GRADE</Text>
                </Box>
              </Box>
              <Text variant="display" size="4xl" weight="font-black">RepoAuditor AI</Text>
              <Text variant="body" size="lg" color="dim" maxWidth="3xl">
                The orchestration engine for autonomous repository maintenance.
                RepoAuditor bridges the gap between static analysis and human-in-the-loop review by
                leveraging Gemini for deep semantic auditing and Jules for automated remediation.
              </Text>
            </Stack>
            <Box display="flex" justify={{ base: 'start', md: 'end' }}>
              <ActionButton
                as="a"
                href="https://repo-auditor-ai.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                surface="accent"
                paddingX={8}
                paddingY={4}
                gap={3}
              >
                <Text variant="display" size="base" weight="font-bold">LAUNCH LIVE APP</Text>
                <ExternalLink size={18} />
              </ActionButton>
            </Box>
          </Grid>
        </Stack>
      </Box>

      {/* Interactive Simulator / Mock Dashboard */}
      <Stack gap={6}>
        <Box display="flex" align="center" gap={2}>
          <Terminal size={18} className="text-accent" />
          <Text variant="mono" size="xs" weight="font-bold" uppercase tracking="widest">Interactive Simulator</Text>
        </Box>

        <Box border radius="xl" surface="muted" className="overflow-hidden">
          {/* Tab Navigation */}
          <Box borderBottom surface="default" display="flex">
            {[
              { id: 'pr-review', label: 'PR Audit', icon: FileSearch },
              { id: 'workflow', label: 'Workflow Health', icon: Activity },
              { id: 'jules', label: 'Jules Session', icon: Cpu },
            ].map((tab) => (
              <Box
                key={tab.id}
                as="button"
                onClick={() => handleTabChange(tab.id as 'pr-review' | 'workflow' | 'jules')}
                paddingX={6}
                paddingY={4}
                display="flex"
                align="center"
                gap={2}
                className={`transition-all border-r border-line last:border-r-0 ${
                  activeTab === tab.id
                    ? 'bg-surface text-accent'
                    : 'text-text-dim hover:bg-surface/50'
                }`}
              >
                <tab.icon size={16} />
                <Text variant="mono" size="xs" weight="font-bold" color="inherit">{tab.label}</Text>
              </Box>
            ))}
          </Box>

          {/* Tab Content */}
          <Box padding={6} minHeight={100}>
            {activeTab === 'pr-review' && <MockPRReview />}
            {activeTab === 'workflow' && <MockWorkflowHealth />}
            {activeTab === 'jules' && <MockJulesSession />}
          </Box>
        </Box>
      </Stack>

      {/* Architecture Overview */}
      <Grid cols={{ base: 1, md: 2 }} gap={12}>
        <Stack gap={6}>
          <Box display="flex" align="center" gap={2}>
            <Settings size={18} className="text-accent" />
            <Text variant="mono" size="xs" weight="font-bold" uppercase tracking="widest">System Architecture</Text>
          </Box>
          <Stack gap={4}>
            <Text variant="display" size="2xl" weight="font-bold">Multi-Agent Pipeline</Text>
            <Text variant="body" color="dim">
              The RepoAuditor pipeline is designed for high-fidelity auditing by decomposing the review process into specialized stages.
            </Text>

            <Stack gap={4} marginTop={4}>
              <Box border radius="md" padding={4} surface="surface">
                <Stack gap={2}>
                  <Box display="flex" align="center" gap={2}>
                    <Box padding={1} className="bg-accent/20 rounded">
                      <Text variant="mono" size="micro" color="accent" weight="font-bold">01</Text>
                    </Box>
                    <Text variant="mono" size="xs" weight="font-bold">Context Ingestion</Text>
                  </Box>
                  <Text variant="body" size="xs" color="dim">
                    Uses <code>get_ai_context.py</code> to extract relevant code chunks, dependency graphs, and historical PR data.
                  </Text>
                </Stack>
              </Box>

              <Box border radius="md" padding={4} surface="surface">
                <Stack gap={2}>
                  <Box display="flex" align="center" gap={2}>
                    <Box padding={1} className="bg-accent/20 rounded">
                      <Text variant="mono" size="micro" color="accent" weight="font-bold">02</Text>
                    </Box>
                    <Text variant="mono" size="xs" weight="font-bold">Gemini Analysis</Text>
                  </Box>
                  <Text variant="body" size="xs" color="dim">
                    Executes deep semantic audits using the Gemini 1.5 Pro model to identify architectural violations and logic flaws.
                  </Text>
                </Stack>
              </Box>

              <Box border radius="md" padding={4} surface="surface">
                <Stack gap={2}>
                  <Box display="flex" align="center" gap={2}>
                    <Box padding={1} className="bg-accent/20 rounded">
                      <Text variant="mono" size="micro" color="accent" weight="font-bold">03</Text>
                    </Box>
                    <Text variant="mono" size="xs" weight="font-bold">Jules Remediation</Text>
                  </Box>
                  <Text variant="body" size="xs" color="dim">
                    Coordinates with Jules (autonomous agent) to automatically draft fixes for identified issues.
                  </Text>
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </Stack>

        <Stack gap={8}>
           <ArchitecturalAssetsList assets={assets} />
        </Stack>
      </Grid>

      {/* Configuration Guide */}
      <Box border radius="xl" padding={8} surface="muted" className="border-dashed">
        <Stack gap={6}>
          <Box display="flex" align="center" gap={2}>
            <ShieldCheck size={18} className="text-accent" />
            <Text variant="mono" size="xs" weight="font-bold" uppercase tracking="widest">Integration Guide</Text>
          </Box>
          <Grid cols={{ base: 1, md: 3 }} gap={8}>
            <Stack gap={3}>
              <Text variant="mono" size="xs" weight="font-bold">1. Repository Setup</Text>
              <Text variant="body" size="xs" color="dim">
                Install <code>repo-auditor-ai</code> via GitHub Apps or integrate <code>td-cli</code> into your CI/CD workflows.
              </Text>
            </Stack>
            <Stack gap={3}>
              <Text variant="mono" size="xs" weight="font-bold">2. Secret Configuration</Text>
              <Text variant="body" size="xs" color="dim">
                Provision <code>GEMINI_API_KEY</code> and <code>GH_TOKEN</code> in your environment or repository secrets.
              </Text>
            </Stack>
            <Stack gap={3}>
              <Text variant="mono" size="xs" weight="font-bold">3. Audit Policy</Text>
              <Text variant="body" size="xs" color="dim">
                Define your audit rules in <code>auditor.json</code> to customize the AI's focus areas (Security, Performance, Style).
              </Text>
            </Stack>
          </Grid>
        </Stack>
      </Box>
    </Stack>
  );
}

function MockPRReview() {
  return (
    <Stack gap={6}>
      <Box display="flex" justify="between" align="center">
        <Stack gap={1}>
          <Text variant="display" size="lg" weight="font-bold">PR #{"368"}: feat: implement RAG-grounded review</Text>
          <Text variant="mono" size="micro" color="dim">ari:feature/rag-review → main</Text>
        </Stack>
        <Box paddingX={3} paddingY={1} surface="accent" className="bg-accent/10 rounded">
          <Text variant="mono" size="micro" color="accent" weight="font-bold">AUDIT PENDING</Text>
        </Box>
      </Box>

      <Stack gap={4}>
        {[
          {
            type: 'SECURITY',
            severity: 'CRITICAL',
            msg: 'Potential shell injection in execFile arguments.',
            loc: 'src/lib/shell.ts:42',
            icon: AlertCircle,
            color: 'text-warning'
          },
          {
            type: 'PERFORMANCE',
            severity: 'HIGH',
            msg: 'Inefficient double-filtering on large dataset.',
            loc: 'src/hooks/useWCSData.ts:112',
            icon: Clock,
            color: 'text-accent'
          },
          {
            type: 'STYLE',
            severity: 'LOW',
            msg: 'Inconsistent naming convention in exported types.',
            loc: 'src/types/audit.ts:14',
            icon: CheckCircle2,
            color: 'text-success'
          },
        ].map((finding, i) => (
          <Box key={i} border radius="md" padding={4} surface="surface">
            <Grid cols="12" gap={4} align="start">
              <Box className="col-span-1">
                <finding.icon size={20} className={finding.color} />
              </Box>
              <Stack gap={1} className="col-span-11">
                <Box display="flex" justify="between">
                  <Box display="flex" align="center" gap={2}>
                    <Text variant="mono" size="micro" weight="font-bold">{finding.type}</Text>
                    <Text variant="mono" size="micro" color="dim">// {finding.severity}</Text>
                  </Box>
                  <Text variant="mono" size="micro" color="dim">{finding.loc}</Text>
                </Box>
                <Text variant="body" size="sm">{finding.msg}</Text>
              </Stack>
            </Grid>
          </Box>
        ))}
      </Stack>

      <Box display="flex" justify="end" gap={3}>
        <Box paddingX={4} paddingY={2} border radius="md" className="cursor-not-allowed opacity-50">
          <Text variant="mono" size="xs" weight="font-bold">DISMISS ALL</Text>
        </Box>
        <Box paddingX={4} paddingY={2} surface="accent" radius="md" className="cursor-pointer hover:opacity-high">
          <Text variant="mono" size="xs" weight="font-bold">CREATE JULES SESSION</Text>
        </Box>
      </Box>
    </Stack>
  );
}

function MockWorkflowHealth() {
  return (
    <Stack gap={8}>
      <Grid cols={{ base: 1, md: 3 }} gap={4}>
        {[
          { label: 'Success Rate', value: '98.2%', delta: '+1.4%', trend: 'up' },
          { label: 'Avg Audit Time', value: '42s', delta: '-12s', trend: 'down' },
          { label: 'Agent Handoffs', value: '143', delta: '+22', trend: 'up' },
        ].map((stat, i) => (
          <Box key={i} border radius="md" padding={4} surface="surface">
            <Stack gap={2}>
              <Text variant="mono" size="micro" color="dim" uppercase>{stat.label}</Text>
              <Box display="flex" align="baseline" gap={2}>
                <Text variant="display" size="2xl" weight="font-bold">{stat.value}</Text>
                <Text variant="mono" size="micro" color={stat.trend === 'up' ? 'success' : 'accent'}>
                  {stat.delta}
                </Text>
              </Box>
            </Stack>
          </Box>
        ))}
      </Grid>

      <Box border radius="md" surface="surface">
        <Box paddingX={4} paddingY={3} borderBottom display="flex" justify="between" align="center">
          <Text variant="mono" size="xs" weight="font-bold">RECENT WORKFLOW RUNS</Text>
          <Box display="flex" align="center" gap={2}>
            <Box className="w-2 h-2 rounded-full bg-success" />
            <Text variant="mono" size="micro" color="dim">LIVE</Text>
          </Box>
        </Box>
        <Stack gap={0}>
          {[
            { id: 'wf-9812', name: `PR Audit #${"368"}`, status: 'Success', time: '2m ago' },
            { id: 'wf-9811', name: 'Scope Check: master', status: 'Success', time: '14m ago' },
            { id: 'wf-9810', name: 'Jules Repair: CI Failure', status: 'Running', time: '1m ago' },
            { id: 'wf-9809', name: 'Nightly Mass Audit', status: 'Success', time: '4h ago' },
          ].map((run, i) => (
            <Box
              key={i}
              paddingX={4}
              paddingY={3}
              borderBottom={i !== 3 ? 'b' : 'none'}
              display="flex"
              align="center"
              justify="between"
              className="hover:bg-accent/5 transition-colors"
            >
              <Stack gap={0}>
                <Text variant="body" size="xs" weight="font-bold">{run.name}</Text>
                <Text variant="mono" size="micro" color="dim">{run.id}</Text>
              </Stack>
              <Box display="flex" align="center" gap={4}>
                <Text variant="mono" size="micro" color="dim">{run.time}</Text>
                <Box paddingX={2} paddingY={0.5} border radius="sm">
                  <Text variant="mono" size="micro" weight="font-bold" color={run.status === 'Running' ? 'accent' : 'dim'}>
                    {run.status.toUpperCase()}
                  </Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}

function MockJulesSession() {
  return (
    <Stack gap={4}>
      <Box border radius="md" surface="black" padding={4} className="font-mono text-xs leading-relaxed">
        <Stack gap={2}>
          <Box display="flex" gap={2}>
            <Text color="dim">[09:42:12]</Text>
            <Text color="accent">jules:</Text>
            <Text color="body">Received handoff for PR #{"368"} finding: SECURITY/execFile.</Text>
          </Box>
          <Box display="flex" gap={2}>
            <Text color="dim">[09:42:15]</Text>
            <Text color="accent">jules:</Text>
            <Text color="body">Analyzing <code>src/lib/shell.ts</code>...</Text>
          </Box>
          <Box display="flex" gap={2}>
            <Text color="dim">[09:42:20]</Text>
            <Text color="accent">jules:</Text>
            <Text color="body">Identified unquoted variable expansion in <code>runCommand</code>.</Text>
          </Box>
          <Box display="flex" gap={2} surface="accent" opacityVariant="low" marginX={-4} paddingX={4} paddingY={2}>
            <Text color="dim">[09:42:31]</Text>
            <Text color="accent">jules:</Text>
            <Text color="success">DRAFTING FIX: Wrapping command arguments in array to prevent injection.</Text>
          </Box>
          <Box display="flex" gap={2}>
            <Text color="dim">[09:42:45]</Text>
            <Text color="accent">jules:</Text>
            <Text color="body">Executing local test suite: <code>pnpm test shell.test.ts</code></Text>
          </Box>
          <Box display="flex" gap={2}>
            <Text color="dim">[09:43:02]</Text>
            <Text color="accent">jules:</Text>
            <Text color="success">TESTS PASSED. Submitting suggested commit to PR.</Text>
          </Box>
          <Box display="flex" gap={2} marginTop={2} className="animate-pulse">
            <Text color="dim">[09:43:05]</Text>
            <Text color="accent">jules:</Text>
            <Text color="body">Waiting for user approval...</Text>
            <Box as="span" width={1} height={4} surface="accent" marginLeft={1} />
          </Box>
        </Stack>
      </Box>

      <Box border radius="md" padding={4} surface="surface">
        <Stack gap={4}>
          <Box display="flex" align="center" gap={2}>
             <Github size={16} />
             <Text variant="mono" size="xs" weight="font-bold">SUGGESTED COMMIT</Text>
          </Box>
          <Box border radius="sm" padding={3} surface="muted">
            <Text variant="mono" size="micro" color="dim" marginBottom={2}>--- a/src/lib/shell.ts</Text>
            <Text variant="mono" size="micro" color="dim">+++ b/src/lib/shell.ts</Text>
            <Box display="flex" gap={2} marginTop={2}>
              <Text color="accent">-</Text>
              <Text variant="mono" size="xs" className="line-through opacity-50">{"exec(`td-cli ${cmd} ${args}`)"}</Text>
            </Box>
            <Box display="flex" gap={2}>
              <Text color="success">+</Text>
              <Text variant="mono" size="xs">{"execFile('td-cli', [cmd, ...args])"}</Text>
            </Box>
          </Box>
          <Box display="flex" gap={3}>
             <Box flex={1} paddingY={2} surface="accent" radius="md" display="flex" align="center" justify="center" className="cursor-pointer hover:opacity-high">
                <Text variant="mono" size="xs" weight="font-bold">APPROVE & APPLY</Text>
             </Box>
             <Box flex={1} paddingY={2} border radius="md" display="flex" align="center" justify="center" className="cursor-pointer hover:bg-surface-alt">
                <Text variant="mono" size="xs" weight="font-bold">REJECT</Text>
             </Box>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
}
