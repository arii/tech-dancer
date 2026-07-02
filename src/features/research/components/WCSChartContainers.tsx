// impeccable-ignore-file
import { ReactNode } from 'react';
import { BarChart2, TrendingUp, LucideIcon } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  Brush
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

const customTooltipStyle = {
  backgroundColor: 'var(--raw-color-surface)',
  border: '1px solid rgba(255,255,255,0.1)',
  fontSize: '11px',
  fontFamily: 'var(--font-mono)',
  padding: '8px'
};

const commonXAxisProps = {
  fontSize: 10,
  tickLine: false,
  axisLine: false,
  tick: { fill: 'rgba(255,255,255,0.5)' }
};

const commonYAxisProps = {
  fontSize: 10,
  tickLine: false,
  axisLine: false,
  tick: { fill: 'rgba(255,255,255,0.5)' }
};

const commonBrushProps = {
  height: 20,
  stroke: "var(--raw-color-accent-brand)",
  fill: "var(--raw-color-surface-muted)",
  travellerWidth: 10
};

const commonGridProps = {
  strokeDasharray: "3 3",
  vertical: false,
  stroke: "rgba(255,255,255,0.05)"
};

interface ChartContainerProps {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
  hasData: boolean;
  emptyLabel: string;
}

const ChartContainer = ({ title, icon: Icon, children, hasData, emptyLabel }: ChartContainerProps) => (
  <Box border surface="default" padding="card" height="[400px]">
    <Stack gap={4} height="full">
      <Box display="flex" align="center" gap={3}>
        <Icon className="w-4 h-4 text-accent" />
        <Text variant="mono" size="micro" weight="font-bold" uppercase>{title}</Text>
      </Box>
      <Box flex={1} minHeight={0}>
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            {children}
          </ResponsiveContainer>
        ) : (
          <Box display="flex" align="center" justify="center" height="full">
            <Text variant="mono" size="xs" color="dim">{emptyLabel}</Text>
          </Box>
        )}
      </Box>
    </Stack>
  </Box>
);

export const ScoreDistributionChart = ({ data }: { data: ScoreData[] }) => (
  <ChartContainer
    title="Score Distribution"
    icon={BarChart2}
    hasData={data.length > 0}
    emptyLabel="NO_DISTRIBUTION_DATA"
  >
    <BarChart data={data} margin={{ bottom: 20 }}>
      <CartesianGrid {...commonGridProps} />
      <XAxis dataKey="score" {...commonXAxisProps} />
      <YAxis {...commonYAxisProps} />
      <Tooltip contentStyle={customTooltipStyle} />
      <Bar dataKey="count" fill="var(--raw-color-accent-brand)" radius={[2, 2, 0, 0]} />
      <Brush dataKey="score" {...commonBrushProps} />
    </BarChart>
  </ChartContainer>
);

export const AvgScoreTrendChart = ({ data }: { data: TrendData[] }) => (
  <ChartContainer
    title="Avg Score Trend"
    icon={TrendingUp}
    hasData={data.length > 0}
    emptyLabel="NO_TREND_DATA"
  >
    <LineChart data={data} margin={{ bottom: 20 }}>
      <CartesianGrid {...commonGridProps} />
      <XAxis dataKey="date" {...commonXAxisProps} />
      <YAxis {...commonYAxisProps} />
      <Tooltip contentStyle={customTooltipStyle} />
      <Line
        type="monotone"
        dataKey="avg"
        stroke="var(--raw-color-accent-brand)"
        strokeWidth={2}
        dot={{ r: 4, fill: 'var(--raw-color-accent-brand)' }}
        activeDot={{ r: 6 }}
      />
      <Brush dataKey="date" {...commonBrushProps} />
    </LineChart>
  </ChartContainer>
);
