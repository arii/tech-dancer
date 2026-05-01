import { useMemo, ElementType } from 'react';
import {
  TrendingUp,
  DollarSign,
  Users,
  BarChart3,
  ArrowUpRight,
  PieChart
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  AreaChart
} from 'recharts';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';

// Mock data for demonstration
const ROI_DATA = [
  { month: 'Jan', cpe: 0.45, epc: 0.85, engagement: 1200, revenue: 1020, cost: 540 },
  { month: 'Feb', cpe: 0.42, epc: 0.88, engagement: 1500, revenue: 1320, cost: 630 },
  { month: 'Mar', cpe: 0.48, epc: 0.92, engagement: 1800, revenue: 1656, cost: 864 },
  { month: 'Apr', cpe: 0.40, epc: 0.95, engagement: 2200, revenue: 2090, cost: 880 },
  { month: 'May', cpe: 0.38, epc: 1.05, engagement: 2600, revenue: 2730, cost: 988 },
  { month: 'Jun', cpe: 0.35, epc: 1.10, engagement: 3100, revenue: 3410, cost: 1085 },
];

function MetricCard({
  label,
  value,
  icon: Icon,
  trend
}: {
  label: string;
  value: string;
  icon: ElementType;
  trend?: string;
}) {
  return (
    <Box border surface="default" padding="card">
      <Stack gap={4}>
        <Box display="flex" justify="between" align="start">
          <Box width={10} height={10} surface="muted" border display="flex" align="center" justify="center">
            <Icon size={20} className="text-accent" />
          </Box>
          {trend && (
            <Box display="flex" align="center" gap={1}>
              <ArrowUpRight size={12} className="text-accent" />
              <Text variant="mono" size="micro" weight="font-bold" color="accent">{trend}</Text>
            </Box>
          )}
        </Box>
        <Stack gap={1}>
          <Text variant="mono" size="micro" color="brand" uppercase weight="font-bold">{label}</Text>
          <Text variant="display" size="2xl" color="brand">{value}</Text>
        </Stack>
      </Stack>
    </Box>
  );
}

export function ROIDashboard() {
  const totals = useMemo(() => {
    const totalRevenue = ROI_DATA.reduce((acc, curr) => acc + curr.revenue, 0);
    const totalCost = ROI_DATA.reduce((acc, curr) => acc + curr.cost, 0);
    const totalEngagement = ROI_DATA.reduce((acc, curr) => acc + curr.engagement, 0);
    const avgCPE = totalCost / totalEngagement;
    const avgEPC = totalRevenue / totalEngagement;
    const roi = ((totalRevenue - totalCost) / totalCost) * 100;

    return {
      avgCPE: `$${avgCPE.toFixed(2)}`,
      avgEPC: `$${avgEPC.toFixed(2)}`,
      totalEngagement: totalEngagement.toLocaleString(),
      roi: `${roi.toFixed(1)}%`,
    };
  }, []);

  return (
    <Stack gap={8}>
      <Grid cols={{ base: 1, sm: 2, lg: 4 }} gap={4}>
        <MetricCard
          label="Avg. CPE"
          value={totals.avgCPE}
          icon={Users}
          trend="-12%"
        />
        <MetricCard
          label="Avg. EPC"
          value={totals.avgEPC}
          icon={DollarSign}
          trend="+24%"
        />
        <MetricCard
          label="Portfolio ROI"
          value={totals.roi}
          icon={TrendingUp}
          trend="+15.2%"
        />
        <MetricCard
          label="Total Engagement"
          value={totals.totalEngagement}
          icon={BarChart3}
        />
      </Grid>

      <Grid cols={{ base: 1, lg: 2 }} gap={8}>
        {/* CPE vs EPC Chart */}
        <Box border surface="default" padding="card">
          <Stack gap={6}>
            <Box display="flex" align="center" gap={3}>
              <PieChart size={20} className="text-accent" />
              <Text variant="mono" size="xs" weight="font-bold" uppercase color="brand">Efficiency: CPE vs EPC</Text>
            </Box>
            <Box height={80} width="full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={ROI_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.1)" />
                  <XAxis
                    dataKey="month"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: 'var(--raw-color-text-dim)' }}
                  />
                  <YAxis
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: 'var(--raw-color-text-dim)' }}
                    tickFormatter={(val) => `$${val}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--raw-color-surface)',
                      border: '1px solid var(--raw-color-line)',
                      fontSize: '10px',
                      fontFamily: 'var(--raw-font-mono)'
                    }}
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: '20px', fontSize: '10px', fontFamily: 'var(--raw-font-mono)' }}
                  />
                  <Bar
                    name="Cost Per Engagement"
                    dataKey="cpe"
                    fill="var(--raw-color-accent-navy)"
                    opacity={0.2}
                    radius={[2, 2, 0, 0]}
                    isAnimationActive={false}
                  />
                  <Line
                    name="Earnings Per Click"
                    type="monotone"
                    dataKey="epc"
                    stroke="var(--raw-color-accent)"
                    strokeWidth={3}
                    dot={{ r: 4, fill: 'var(--raw-color-accent)' }}
                    isAnimationActive={false}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </Box>
            <Box padding="compact" surface="muted" border className="border-dashed">
              <Text variant="body" size="xs" color="dim">
                Insight: Earnings Per Click has consistently outpaced Cost Per Engagement, resulting in an expanding profit margin and demonstrating high portfolio efficiency.
              </Text>
            </Box>
          </Stack>
        </Box>

        {/* Engagement Growth Chart */}
        <Box border surface="default" padding="card">
          <Stack gap={6}>
            <Box display="flex" align="center" gap={3}>
              <TrendingUp size={20} className="text-accent" />
              <Text variant="mono" size="xs" weight="font-bold" uppercase color="brand">Engagement Growth</Text>
            </Box>
            <Box height={80} width="full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ROI_DATA}>
                  <defs>
                    <linearGradient id="colorEngage" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--raw-color-accent)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--raw-color-accent)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.1)" />
                  <XAxis
                    dataKey="month"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: 'var(--raw-color-text-dim)' }}
                  />
                  <YAxis
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: 'var(--raw-color-text-dim)' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--raw-color-surface)',
                      border: '1px solid var(--raw-color-line)',
                      fontSize: '10px',
                      fontFamily: 'var(--raw-font-mono)'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="engagement"
                    stroke="var(--raw-color-accent)"
                    fillOpacity={1}
                    fill="url(#colorEngage)"
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
            <Box padding="compact" surface="muted" border className="border-dashed">
              <Text variant="body" size="xs" color="dim">
                The portfolio has seen a 158% increase in engagement over the last 6 months, driven by strategic content releases and UX optimizations.
              </Text>
            </Box>
          </Stack>
        </Box>
      </Grid>
    </Stack>
  );
}
