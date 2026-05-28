
import { Box, Stack, Text } from '@/layouts/Primitives';
import { ReactNode } from 'react';

interface SidebarCardProps {
  title: string;
  children: ReactNode;
}

function SidebarCard({ title, children }: SidebarCardProps) {
  return (
    <Box className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-5 lg:p-6 backdrop-blur-sm">
      <Stack gap={4}>
        <Text variant="mono" size="xs" weight="font-bold" className="text-cyan-400 uppercase tracking-widest border-b border-slate-800/50 pb-3">
          {title}
        </Text>
        <Box>
          {children}
        </Box>
      </Stack>
    </Box>
  );
}

interface ArticleSidebarProps {
  snapshot?: Array<{ label: string; value: string }>;
  toc?: Array<{ label: string; id: string }>;
  relatedTopics?: string[];
  custom?: ReactNode;
}

export function ArticleSidebar({
  snapshot,
  toc,
  relatedTopics,
  custom
}: ArticleSidebarProps) {
  return (
    <Stack gap={6}>
      {snapshot && snapshot.length > 0 && (
        <SidebarCard title="Article Snapshot">
          <Stack gap={3}>
            {snapshot.map((item, i) => (
              <Stack key={i} direction="row" justify="between" align="center">
                <Text variant="mono" size="micro" className="text-slate-500 uppercase">{item.label}</Text>
                <Text size="xs" weight="font-bold" className="text-slate-300">{item.value}</Text>
              </Stack>
            ))}
          </Stack>
        </SidebarCard>
      )}

      {toc && toc.length > 0 && (
        <SidebarCard title="In This Post">
          <Stack gap={2}>
            {toc.map((item, i) => (
              <Box
                key={i}
                as="a"
                href={`#${item.id}`}
                className="text-sm text-slate-400 hover:text-cyan-400 transition-colors py-1"
              >
                {item.label}
              </Box>
            ))}
          </Stack>
        </SidebarCard>
      )}

      {relatedTopics && relatedTopics.length > 0 && (
        <SidebarCard title="Related Topics">
          <Stack direction="row" gap={2} wrap>
            {relatedTopics.map((topic, i) => (
              <Box
                key={i}
                className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400 text-[10px] font-bold uppercase tracking-wider"
              >
                {topic}
              </Box>
            ))}
          </Stack>
        </SidebarCard>
      )}

      {custom}
    </Stack>
  );
}
