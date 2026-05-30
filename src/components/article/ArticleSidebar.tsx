

import { Box, Stack, Text } from '@/layouts/Primitives';
import { ReactNode } from 'react';
import { ArticleCard } from './ArticleCard';

interface SidebarCardProps {
  title: string;
  children: ReactNode;
}

export function SidebarCard({ title, children }: SidebarCardProps) {
  return (
    <ArticleCard className="p-5 lg:p-6">
      <Stack gap={4}>
        <Text variant="mono" size="xs" weight="font-bold" color="accent" className="uppercase tracking-widest border-b border-line/50 pb-3">
          {title}
        </Text>
        <Box>
          {children}
        </Box>
      </Stack>
    </ArticleCard>
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
                <Text variant="mono" size="micro" className="text-text-dim uppercase">{item.label}</Text>
                <Text size="xs" weight="font-bold" className="text-text-dim">{item.value}</Text>
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
                className="text-sm text-text-dim hover:text-accent transition-colors py-1"
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
                className="px-2 py-1 rounded bg-surface border border-line text-text-dim text-tiny font-bold uppercase tracking-wider"
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
