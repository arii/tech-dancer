// impeccable-ignore-file
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
  Line,
  Brush
} from 'recharts';
import { Box, Stack, Text } from '@/layouts/Primitives';
import WCSChartCard from '@/components/analytics/WCSChartCard';

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

export const ScoreDistributionChart = ({ data }: { data: ScoreData[] }) => (
  <WCSChartCard
    title="Score Distribution"
    icon={<BarChart2 className="w-4 h-4 text-accent" />}
    emptyState={
      <Box display="flex" align="center" justify="center" height="full">
        <Text variant="mono" size="xs" color="dim">NO_DISTRIBUTION_DATA</Text>
      </Box>
    }
  >
    <Box flex={1} minHeight={0} height="full">
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="score" fontSize={10} tickLine={false} axisLine={false} tick={{ fill: 'rgba(255,255,255,0.5)' }} />
            <YAxis fontSize={10} tickLine={false} axisLine={false} tick={{ fill: 'rgba(255,255,255,0.5)' }} />
            <Tooltip contentStyle={customTooltipStyle} />
            <Bar dataKey="count" fill="var(--raw-color-accent-brand)" radius={[2, 2, 0, 0]} />
            <Brush dataKey="score" height={20} stroke="var(--raw-color-accent-brand)" fill="var(--raw-color-surface-muted)" travellerWidth={10} />
          </BarChart>
        </ResponsiveContainer>
      ) : null}
    </Box>
  </WCSChartCard>
);

export const AvgScoreTrendChart = ({ data }: { data: TrendData[] }) => (
  <WCSChartCard
    title="Avg Score Trend"
    icon={<TrendingUp className="w-4 h-4 text-accent" />}
    emptyState={
      <Box display="flex" align="center" justify="center" height="full">
        <Text variant="mono" size="xs" color="dim">NO_TREND_DATA</Text>
      </Box>
    }
  >
    <Box flex={1} minHeight={0} height="full">
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="date" fontSize={10} tickLine={false} axisLine={false} tick={{ fill: 'rgba(255,255,255,0.5)' }} />
            <YAxis fontSize={10} tickLine={false} axisLine={false} tick={{ fill: 'rgba(255,255,255,0.5)' }} />
            <Tooltip contentStyle={customTooltipStyle} />
            <Line type="monotone" dataKey="avg" stroke="var(--raw-color-accent-brand)" strokeWidth={2} dot={{ r: 4, fill: 'var(--raw-color-accent-brand)' }} activeDot={{ r: 6 }} />
            <Brush dataKey="date" height={20} stroke="var(--raw-color-accent-brand)" fill="var(--raw-color-surface-muted)" travellerWidth={10} />
          </LineChart>
        </ResponsiveContainer>
      ) : null}
    </Box>
  </WCSChartCard>
);
