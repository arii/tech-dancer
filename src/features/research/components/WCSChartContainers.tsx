
import { BarChart2, TrendingUp } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line
} from 'recharts';
import { Box, Stack, Text } from '@/layouts/Primitives';

interface ScoreData {
  score: number;
  count: number;
}

interface TrendData {
  date: string;
  avg: number;
}

export const ScoreDistributionChart = ({ data }: { data: ScoreData[] }) => (
  <Box border surface="default" padding="card">
    <Stack gap={4}>
      <Box display="flex" align="center" gap={3}>
        <BarChart2 className="w-4 h-4 text-accent" />
        <Text variant="mono" size="micro" weight="font-bold" uppercase>Score Distribution</Text>
      </Box>
      <Box height={48}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(var(--color-line), 0.1)" />
            <XAxis
              dataKey="score"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'rgba(var(--color-text-dim), 0.7)' }}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(var(--color-surface), 1)',
                border: '1px solid rgba(var(--color-line), 1)',
                fontSize: '10px',
                fontFamily: 'var(--font-mono)'
              }}
            />
            <Bar dataKey="count" fill="var(--color-accent)" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Stack>
  </Box>
);

export const AvgScoreTrendChart = ({ data }: { data: TrendData[] }) => (
  <Box border surface="default" padding="card">
    <Stack gap={4}>
      <Box display="flex" align="center" gap={3}>
        <TrendingUp className="w-4 h-4 text-accent" />
        <Text variant="mono" size="micro" weight="font-bold" uppercase>Avg Score Trend</Text>
      </Box>
      <Box height={48}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(var(--color-line), 0.1)" />
            <XAxis
              dataKey="date"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'rgba(var(--color-text-dim), 0.7)' }}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(var(--color-surface), 1)',
                border: '1px solid rgba(var(--color-line), 1)',
                fontSize: '10px',
                fontFamily: 'var(--font-mono)'
              }}
            />
            <Line
              type="monotone"
              dataKey="avg"
              stroke="var(--color-accent)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Stack>
  </Box>
);
