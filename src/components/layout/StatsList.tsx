import React, { ReactNode } from 'react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { StatusBadge } from '@/components/ui/StatusBadge';

export interface StatItem {
  label: string;
  value: ReactNode;
  isStatusBadge?: boolean;
}

export interface StatsListProps {
  stats: StatItem[];
}

export function StatsList({ stats }: StatsListProps) {
  if (!stats || stats.length === 0) return null;

  return (
    <Stack gap={4}>
      {stats.map((stat, index) => (
        <Box
          key={stat.label}
          display="flex"
          justify="between"
          align="center"
          borderBottom={index < stats.length - 1 ? "b" : undefined}
          paddingBottom={index < stats.length - 1 ? 2 : undefined}
          className={index < stats.length - 1 ? "border-line/20" : ""}
        >
          <Text variant="body" size="xs" color="dim">{stat.label}</Text>
          {stat.isStatusBadge ? (
            <StatusBadge label={stat.value as string} />
          ) : (
            <Text variant="mono" size="xs" color="brand" weight="font-bold">{stat.value}</Text>
          )}
        </Box>
      ))}
    </Stack>
  );
}
