import { Box, Stack, Text } from '@/layouts/Primitives';
import { ReactNode } from 'react';

export interface StatItem {
  label: string;
  value: ReactNode;
}

interface StatsCardProps {
  title?: string;
  stats: StatItem[];
}

export function StatsCard({ title = "Stats", stats }: StatsCardProps) {
  return (
    <Box paddingX={4} paddingY={6}>
      <Stack gap={4}>
        <Text variant="mono" size="micro" color="dim" uppercase weight="font-bold" tracking="widest">{title}</Text>
        <Stack gap={4}>
          {stats.map((stat, index) => (
            <Box key={index} display="flex" justify="between" align="center" borderBottom={index < stats.length - 1 ? "b" : undefined} paddingBottom={index < stats.length - 1 ? 2 : undefined} className={index < stats.length - 1 ? "border-line/20" : ""}>
              <Text variant="body" size="xs" color="dim">{stat.label}</Text>
              {typeof stat.value === 'string' || typeof stat.value === 'number' ? (
                <Text variant="mono" size="xs" color="brand" weight="font-bold">{stat.value}</Text>
              ) : (
                stat.value
              )}
            </Box>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
