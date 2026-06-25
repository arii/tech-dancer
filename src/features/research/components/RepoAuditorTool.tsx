import { useState } from 'react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { ExternalLink, Cpu, Activity, Search, ShieldCheck, ShieldAlert } from 'lucide-react';
import { ArchitecturalAssetsList } from './ArchitecturalAssetsList';
import { TOOL_ID_REPO_AUDITOR } from '@/config/devai-tool-ids';
import { useResearchToolAssets } from '@/lib/hooks/useResearchToolAssets';
import { ActionButton } from '@/components/ui/ActionButton';

const TOOL_IDS = [TOOL_ID_REPO_AUDITOR];

const TABS = [
  { id: 'pr', label: 'Audit', Icon: Search },
  { id: 'wf', label: 'Health', Icon: Activity },
  { id: 'js', label: 'Agent', Icon: Cpu }
];

const FINDINGS = [
  { id: 'sec', type: 'SECURITY', message: 'Shell risk.', Icon: ShieldAlert, colorClass: 'text-warning' },
  { id: 'style', type: 'STYLE', message: 'Naming.', Icon: ShieldCheck, colorClass: 'text-success' }
];

const METRICS = ['98% Success', '42s Time', '143 Agent'];
const PIPELINE_STEPS = ['01 Context', '02 Audit', '03 Fix'];

export function RepoAuditorTool() {
  const assets = useResearchToolAssets(TOOL_IDS);
  const [activeTab, setActiveTab] = useState('pr');

  return (
    <Stack gap={8}>
      <Box paddingBottom={6} borderBottom>
        <Grid cols={{ base: 1, md: 2 }} gap={6} align="center">
          <Stack gap={2}>
            <Text variant="display" size="4xl" weight="font-black">RepoAuditor AI</Text>
            <Text variant="body" color="dim">AI-driven repo maintenance.</Text>
          </Stack>
          <Box display="flex" justify={{ base: 'start', md: 'end' }}>
            <ActionButton as="a" href="https://repo-auditor-ai.vercel.app/" target="_blank" variant="primary" paddingX={4} paddingY={2} gap={2}>
              <Text variant="mono" size="xs" weight="font-bold" className="text-surface">LIVE APP</Text>
              <ExternalLink size={14} className="text-surface" />
            </ActionButton>
          </Box>
        </Grid>
      </Box>

      <Box border radius="md" surface="muted" className="overflow-hidden">
        <Box borderBottom surface="default" display="flex" role="tablist">
          {TABS.map((tab) => (
            <Box
              key={tab.id}
              as="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              paddingX={{ base: 5, md: 6 }}
              paddingY={{ base: 5, md: 4 }}
              display="flex"
              align="center"
              gap={2}
              className={`transition-all motion-reduce:transition-none border-r border-line last:border-r-0 ${
                activeTab === tab.id ? 'bg-surface text-accent' : 'text-text-dim hover:text-text'
              }`}
            >
              <tab.Icon size={14} />
              <Text variant="mono" size="xs" weight="font-bold" color="inherit">{tab.label}</Text>
            </Box>
          ))}
        </Box>
        <Box padding={4} minHeight={100}>
          {activeTab === 'pr' && (
            <Stack gap={3}>
              {FINDINGS.map((f) => (
                <Box key={f.id} border radius="md" padding={3} surface="surface" display="flex" gap={3}>
                  <f.Icon size={16} className={f.colorClass} />
                  <Text variant="body" size="sm"><strong>{f.type}:</strong> {f.message}</Text>
                </Box>
              ))}
            </Stack>
          )}
          {activeTab === 'wf' && (
            <Grid cols={{ base: 1, sm: 3 }} gap={4}>
              {METRICS.map((v) => (
                <Box key={v} border radius="md" padding={3} surface="surface">
                  <Text variant="mono" size="xs" weight="font-bold">{v}</Text>
                </Box>
              ))}
            </Grid>
          )}
          {activeTab === 'js' && (
            <Box border radius="md" surface="black" padding={3} className="font-mono text-xs">
              <Text color="accent">jules: <Text as="span" color="body">Analyzing...</Text></Text>
              <Text color="success" marginTop={1}>jules: <Text as="span" color="body">FIXING.</Text></Text>
            </Box>
          )}
        </Box>
      </Box>

      <Grid cols={{ base: 1, md: 2 }} gap={8}>
        <Stack gap={4}>
          <Text variant="display" size="xl" weight="font-bold">Pipeline</Text>
          <Stack gap={2}>
            {PIPELINE_STEPS.map((s) => (
              <Box key={s} border radius="md" padding={2} surface="surface">
                <Text variant="mono" size="xs">{s}</Text>
              </Box>
            ))}
          </Stack>
        </Stack>
        <ArchitecturalAssetsList assets={assets} />
      </Grid>
    </Stack>
  );
}
