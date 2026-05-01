import {
  TrendingUp,
  DollarSign,
  MousePointerClick,
  ShoppingBag,
  Loader2,
  PieChart as PieChartIcon,
  Target
} from 'lucide-react';
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  PieChart,
  Pie,
  LineChart,
  Line
} from 'recharts';
import {
  Box,
  Stack,
  Text,
  Grid
} from '@/layouts/Primitives';
import { useAffiliateData } from '../hooks/useAffiliateData';

const COLORS = ['#1A2B3C', '#E63946', '#457B9D', '#A8DADC'];

export function AffiliateROITool() {
  const { isLoading, stats } = useAffiliateData();

  if (isLoading) {
    return (
      <Box padding={12} display="flex" justify="center" align="center">
        <Stack align="center" gap={4}>
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
          <Text variant="mono" size="xs">LOADING AFFILIATE INTELLIGENCE...</Text>
        </Stack>
      </Box>
    );
  }

  return (
    <Stack gap={8}>
      {/* Overview Cards */}
      <Grid cols={{ base: 1, sm: 2, lg: 4 }} gap={4}>
        <StatCard
          label="Total Profit"
          value={`$${(stats.totalCommission - stats.totalCost).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          icon={<DollarSign className="w-4 h-4" />}
          subValue={`ROI: ${(stats.totalROI * 100).toFixed(1)}%`}
        />
        <StatCard
          label="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          icon={<ShoppingBag className="w-4 h-4" />}
        />
        <StatCard
          label="Total Clicks"
          value={stats.totalClicks.toLocaleString()}
          icon={<MousePointerClick className="w-4 h-4" />}
        />
        <StatCard
          label="Conv. Rate"
          value={`${((stats.totalConversions / stats.totalClicks) * 100).toFixed(1)}%`}
          icon={<Target className="w-4 h-4" />}
        />
      </Grid>

      <Grid cols={{ base: 1, lg: 2 }} gap={8}>
        {/* ROI Trend */}
        <Box border surface="default" padding="card">
          <Stack gap={6}>
            <Box display="flex" align="center" gap={3}>
              <TrendingUp className="w-5 h-5 text-accent" />
              <Text variant="mono" size="xs" weight="font-bold" uppercase>Profit vs Cost Trend</Text>
            </Box>
            <Box height={64}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.trendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(var(--color-line), 0.1)" />
                  <XAxis
                    dataKey="date"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: 'rgba(var(--color-text-dim), 0.7)' }}
                  />
                  <YAxis
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: 'rgba(var(--color-text-dim), 0.7)' }}
                    tickFormatter={(value) => `$${value}`}
                  />
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
                    dataKey="commission"
                    stroke="var(--color-accent)"
                    strokeWidth={2}
                    name="Commission"
                  />
                  <Line
                    type="monotone"
                    dataKey="cost"
                    stroke="#E63946"
                    strokeWidth={2}
                    name="Cost"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Stack>
        </Box>

        {/* Network ROI Comparison */}
        <Box border surface="default" padding="card">
          <Stack gap={6}>
            <Box display="flex" align="center" gap={3}>
              <PieChartIcon className="w-5 h-5 text-accent" />
              <Text variant="mono" size="xs" weight="font-bold" uppercase>Network Commission Share</Text>
            </Box>
            <Box height={64} display="flex" align="center" justify="center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.byNetwork}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="commission"
                    label={({ name, roi }) => `${name} (ROI: ${(roi * 100).toFixed(0)}%)`}
                  >
                    {stats.byNetwork.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Stack>
        </Box>
      </Grid>

      {/* Top Performing Assets */}
      <Box border surface="default">
        <Box padding="compact" borderBottom display="flex" justify="between" align="center" surface="muted">
          <Text variant="mono" size="xs" weight="font-bold" uppercase>ROI Performance Ledger</Text>
          <Text variant="mono" size="micro" color="dim">{stats.performanceById.length} ASSETS TRACKED</Text>
        </Box>
        <Box className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-line">
                <Box as="th" padding={4} className="text-xs font-mono text-dim uppercase font-normal">Asset ID</Box>
                <Box as="th" padding={4} className="text-xs font-mono text-dim uppercase font-normal">Network</Box>
                <Box as="th" padding={4} className="text-xs font-mono text-dim uppercase font-normal text-right">Commission</Box>
                <Box as="th" padding={4} className="text-xs font-mono text-dim uppercase font-normal text-right">Cost</Box>
                <Box as="th" padding={4} className="text-xs font-mono text-dim uppercase font-normal text-right">ROI</Box>
              </tr>
            </thead>
            <tbody>
              {stats.performanceById.map((asset) => (
                <tr key={asset.id} className="border-b border-line/50 hover:bg-accent/5 transition-colors">
                  <Box as="td" padding={4} className="font-mono text-xs">{asset.id}</Box>
                  <Box as="td" padding={4}>
                    <Box
                      paddingX={2}
                      paddingY={0.5}
                      surface="muted"
                      className="inline-block font-black uppercase tracking-widest text-dim"
                    >
                      <Text variant="mono" size="micro">{asset.network}</Text>
                    </Box>
                  </Box>
                  <Box as="td" padding={4} className="font-mono text-xs text-right text-accent weight-bold">${asset.commission.toFixed(2)}</Box>
                  <Box as="td" padding={4} className="font-mono text-xs text-right text-dim">${asset.cost.toFixed(2)}</Box>
                  <Box as="td" padding={4} className="font-mono text-xs text-right">
                    <Text color={asset.roi > 0 ? 'brand' : 'dim'} weight="font-bold">
                      {(asset.roi * 100).toFixed(1)}%
                    </Text>
                  </Box>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Box>
    </Stack>
  );
}

function StatCard({ label, value, icon, subValue }: { label: string, value: string, icon: React.ReactNode, subValue?: string }) {
  return (
    <Box border surface="muted" padding="card">
      <Stack gap={2}>
        <Box display="flex" justify="between" align="center" color="dim">
          <Text variant="mono" size="micro" weight="font-bold" uppercase>{label}</Text>
          {icon}
        </Box>
        <Stack gap={1}>
          <Text variant="display" size="2xl" weight="font-black" className="text-accent-navy">{value}</Text>
          {subValue && (
            <Text variant="mono" size="micro" color="brand" weight="font-bold">{subValue}</Text>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
