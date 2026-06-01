

import { Box, Stack, Text } from '@/layouts/Primitives';
import { ReactNode } from 'react';
import { ArticleCard } from './ArticleCard';

interface SidebarCardProps {
  title: string;
  children: ReactNode;
}

export function SidebarCard({ title, children }: SidebarCardProps) {
  return (
    <ArticleCard padding={{ base: 5, lg: 6 }}>
      <Stack gap={4}>
        <Text
          variant="mono"
          size="xs"
          weight="font-bold"
          color="accent"
          uppercase
          tracking="widest"
          paddingBottom={3}
          border="b"
          className="border-line/50"
        >
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
        <SidebarCard title="ARTICLE SNAPSHOT">
          <Stack gap={3}>
            {snapshot.map((item, i) => (
              <Stack key={i} direction="row" justify="between" align="center">
                <Text variant="mono" size="micro" color="dim" uppercase>{item.label}</Text>
                <Text size="xs" weight="font-bold" color="dim" textAlign="right">{item.value}</Text>
              </Stack>
            ))}
          </Stack>
        </SidebarCard>
      )}

      {toc && toc.length > 0 && (
        <SidebarCard title="IN THIS POST">
          <Stack gap={2}>
            {toc.map((item, i) => (
              <Box
                key={i}
                as="a"
                href={`#${item.id}`}
                paddingY={1}
                className="text-sm text-text-dim hover:text-accent transition-colors"
              >
                <Text size="sm">{item.label}</Text>
              </Box>
            ))}
          </Stack>
        </SidebarCard>
      )}

      {relatedTopics && relatedTopics.length > 0 && (
        <SidebarCard title="RELATED TOPICS">
          <Stack direction="row" gap={2} wrap>
            {relatedTopics.map((topic, i) => (
              <Box
                key={i}
                paddingX={2}
                paddingY={1}
                radius="sm"
                surface="surface"
                border
                className="border-line"
              >
                <Text variant="mono" size="micro" weight="font-bold" color="dim" uppercase tracking="utility">{topic}</Text>
              </Box>
            ))}
          </Stack>
        </SidebarCard>
      )}

      {custom}
    </Stack>
  );
}
