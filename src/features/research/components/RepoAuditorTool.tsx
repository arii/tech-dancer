import { useState } from 'react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { ExternalLink, Cpu, Activity, Search, ShieldCheck, ShieldAlert } from 'lucide-react';
import { ArchitecturalAssetsList } from './ArchitecturalAssetsList';
import { TOOL_ID_REPO_AUDITOR } from '@/config/devai-tool-ids';
import { useResearchToolAssets } from '@/lib/hooks/useResearchToolAssets';
import { ActionButton } from '@/components/ui/ActionButton';

export function RepoAuditorTool() {
  const assets = useResearchToolAssets([TOOL_ID_REPO_AUDITOR]);
  const [t, setT] = useState('pr');

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
              <Text variant="mono" size="xs" weight="font-bold">LIVE APP</Text>
              <ExternalLink size={14} />
            </ActionButton>
          </Box>
        </Grid>
      </Box>

      <Box border radius="lg" surface="muted" className="overflow-hidden">
        <Box borderBottom surface="default" display="flex">
          {[
            { id: 'pr', l: 'Audit', i: Search },
            { id: 'wf', l: 'Health', i: Activity },
            { id: 'js', l: 'Agent', i: Cpu }
          ].map((tab) => (
            <Box key={tab.id} as="button" onClick={() => setT(tab.id)} paddingX={4} paddingY={3} display="flex" align="center" gap={2}
              className={`transition-all border-r border-line last:border-r-0 ${t === tab.id ? 'bg-surface text-accent' : 'text-text-dim'}`}>
              <tab.i size={14} /><Text variant="mono" size="xs" weight="font-bold" color="inherit">{tab.l}</Text>
            </Box>
          ))}
        </Box>
        <Box padding={4} minHeight={100}>
          {t === 'pr' && <Stack gap={3}>
            {[
              { t: 'SECURITY', m: 'Shell risk.', i: ShieldAlert, c: 'text-warning' },
              { t: 'STYLE', m: 'Naming.', i: ShieldCheck, c: 'text-success' }
            ].map((f, i) => (
              <Box key={i} border radius="md" padding={3} surface="surface" display="flex" gap={3}>
                <f.i size={16} className={f.c} />
                <Text variant="body" size="sm"><strong>{f.t}:</strong> {f.m}</Text>
              </Box>
            ))}
          </Stack>}
          {t === 'wf' && <Grid cols={3} gap={4}>
            {['98% Success', '42s Time', '143 Agent'].map((v) => (
              <Box key={v} border radius="md" padding={3} surface="surface">
                <Text variant="mono" size="xs" weight="font-bold">{v}</Text>
              </Box>
            ))}
          </Grid>}
          {t === 'js' && <Box border radius="md" surface="black" padding={3} className="font-mono text-xs">
            <Text color="accent">jules: <Text as="span" color="body">Analyzing...</Text></Text>
            <Text color="success" marginTop={1}>jules: <Text as="span" color="body">FIXING.</Text></Text>
          </Box>}
        </Box>
      </Box>

      <Grid cols={{ base: 1, md: 2 }} gap={8}>
        <Stack gap={4}>
          <Text variant="display" size="xl" weight="font-bold">Pipeline</Text>
          <Stack gap={2}>
            {['01 Context', '02 Audit', '03 Fix'].map((s) => (
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
