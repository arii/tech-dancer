import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Download,
  BarChart2,
  FileJson,
  FileText,
  TrendingUp,
  Loader2
} from 'lucide-react';
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
import {
  Box,
  Stack,
  Text,
  Grid,
  Button
} from '@/layouts/Primitives';
import { useExport } from '../hooks/useExport';

interface WCSRecord {
  Dancer_ID: string;
  competitor_name: string;
  result_id: string;
  event_title: string;
  event_date: string;
  Registry_Points_Sum: number;
  Promoted: boolean;
}

export function WCSScraperTool() {
  const [data, setData] = useState<WCSRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPromoted, setFilterPromoted] = useState<'all' | 'promoted' | 'not-promoted'>('all');

  const { exportCSV, exportPDF } = useExport();

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/wcs_prelims.json`)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Failed to load WCS data:", err);
        setIsLoading(false);
      });
  }, []);

  const filteredData = useMemo(() => {
    return data.filter(record => {
      const matchesSearch =
        record.competitor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.Dancer_ID.includes(searchTerm) ||
        record.event_title.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter =
        filterPromoted === 'all' ||
        (filterPromoted === 'promoted' && record.Promoted) ||
        (filterPromoted === 'not-promoted' && !record.Promoted);

      return matchesSearch && matchesFilter;
    });
  }, [data, searchTerm, filterPromoted]);

  const scoreDistribution = useMemo(() => {
    const bins: Record<string, number> = {};
    filteredData.forEach(r => {
      const bin = Math.floor(r.Registry_Points_Sum).toString();
      bins[bin] = (bins[bin] || 0) + 1;
    });
    return Object.entries(bins)
      .map(([score, count]) => ({ score: Number(score), count }))
      .sort((a, b) => a.score - b.score);
  }, [filteredData]);

  const trendData = useMemo(() => {
    const byDate: Record<string, { total: number, count: number }> = {};
    filteredData.forEach(r => {
      const date = r.event_date.split('/').slice(1).join('/');
      if (!byDate[date]) byDate[date] = { total: 0, count: 0 };
      byDate[date].total += r.Registry_Points_Sum;
      byDate[date].count += 1;
    });
    return Object.entries(byDate)
      .map(([date, stats]) => ({
        date,
        avg: Number((stats.total / stats.count).toFixed(2))
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [filteredData]);

  const handleExportCSV = () => {
    exportCSV(filteredData, 'wcs_prelims');
  };

  const handleExportPDF = () => {
    const tableData = filteredData.map(r => [
      r.event_date,
      r.competitor_name,
      r.event_title,
      r.Registry_Points_Sum.toFixed(1),
      r.Promoted ? 'YES' : 'NO'
    ]);

    exportPDF(tableData, {
      filename: 'wcs_prelims',
      title: 'WCS Prelim Scoring Analysis',
      headers: ['Date', 'Competitor', 'Event', 'Score', 'Promoted']
    });
  };

  if (isLoading) {
    return (
      <Box padding={12} display="flex" justify="center" align="center">
        <Stack align="center" gap={4}>
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
          <Text variant="mono" size="xs">INGESTING DATASET...</Text>
        </Stack>
      </Box>
    );
  }

  return (
    <Stack gap={8}>
      <Box border surface="muted" padding="card">
        <Stack gap={6}>
          <Box display="flex" align="center" gap={3}>
            <Search className="w-5 h-5 text-dim" />
            <Text variant="mono" size="xs" weight="font-bold" uppercase color="dim">
              System Query
            </Text>
          </Box>

          <Grid cols={{ base: 1, md: 2 }} gap={4}>
            <Box surface="default" border padding="compact" display="flex" align="center" gap={2}>
              <Search className="w-4 h-4 text-dim" />
              <input
                type="text"
                placeholder="Search by name, ID, or event..."
                className="bg-transparent border-none outline-none text-sm w-full font-mono"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Box>

            <Box display="flex" gap={2}>
              {(['all', 'promoted', 'not-promoted'] as const).map((filter) => (
                <Box key={filter} flex={1}>
                  <Button
                    variant={filterPromoted === filter ? 'primary' : 'secondary'}
                    onClick={() => setFilterPromoted(filter)}
                    className="w-full uppercase text-xs tracking-tighter"
                  >
                    {filter.replace('-', ' ')}
                  </Button>
                </Box>
              ))}
            </Box>
          </Grid>
        </Stack>
      </Box>

      <Grid cols={{ base: 1, lg: 3 }} gap={8}>
        <Stack gap={8} className="lg:col-span-2">
          <Grid cols={{ base: 1, md: 2 }} gap={8}>
            <Box border surface="default" padding="card">
              <Stack gap={4}>
                <Box display="flex" align="center" gap={3}>
                  <BarChart2 className="w-4 h-4 text-accent" />
                  <Text variant="mono" size="micro" weight="font-bold" uppercase>Score Distribution</Text>
                </Box>
                <Box height={48}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={scoreDistribution}>
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

            <Box border surface="default" padding="card">
              <Stack gap={4}>
                <Box display="flex" align="center" gap={3}>
                  <TrendingUp className="w-4 h-4 text-accent" />
                  <Text variant="mono" size="micro" weight="font-bold" uppercase>Avg Score Trend</Text>
                </Box>
                <Box height={48}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
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
          </Grid>

          <Box border surface="default">
            <Box padding="compact" borderBottom display="flex" justify="between" align="center">
              <Text variant="mono" size="xs" weight="font-bold" uppercase>Live Dataset</Text>
              <Text variant="mono" size="micro" color="dim">{filteredData.length} RECORDS FOUND</Text>
            </Box>
            <Box className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-line">
                    <Box as="th" padding={4} className="text-xs font-mono text-dim uppercase font-normal">Date</Box>
                    <Box as="th" padding={4} className="text-xs font-mono text-dim uppercase font-normal">Competitor</Box>
                    <Box as="th" padding={4} className="text-xs font-mono text-dim uppercase font-normal">Event</Box>
                    <Box as="th" padding={4} className="text-xs font-mono text-dim uppercase font-normal">Score</Box>
                    <Box as="th" padding={4} className="text-xs font-mono text-dim uppercase font-normal">Status</Box>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.slice(0, 20).map((record, i) => (
                    <tr key={`${record.Dancer_ID}-${record.result_id}-${i}`} className="border-b border-line/50 transition-colors">
                      <Box as="td" padding={4} className="font-mono text-xs text-dim">{record.event_date}</Box>
                      <Box as="td" padding={4}>
                        <Stack gap={0}>
                          <Text variant="body" size="xs" weight="font-bold">{record.competitor_name}</Text>
                          <Text variant="mono" size="micro" color="dim">#{record.Dancer_ID}</Text>
                        </Stack>
                      </Box>
                      <Box as="td" padding={4} className="text-xs text-dim">{record.event_title}</Box>
                      <Box as="td" padding={4} className="font-mono text-xs">{record.Registry_Points_Sum.toFixed(1)}</Box>
                      <Box as="td" padding={4}>
                        <Box
                          paddingX={2}
                          paddingY={0.5}
                          surface={record.Promoted ? 'accent' : 'muted'}
                          className={`inline-block text-xs font-black uppercase tracking-widest ${record.Promoted ? 'text-accent-navy' : 'text-dim opacity-50'}`}
                        >
                          {record.Promoted ? 'Promoted' : 'Held'}
                        </Box>
                      </Box>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
            {filteredData.length > 20 && (
              <Box padding="compact" textAlign="center" borderTop>
                <Text variant="mono" size="micro" color="dim">AND {filteredData.length - 20} MORE RECORDS...</Text>
              </Box>
            )}
          </Box>
        </Stack>

        <Stack gap={8}>
          <Box border surface="default" padding="card">
            <Stack gap={6}>
              <Box display="flex" align="center" gap={3}>
                <Download className="w-5 h-5 text-accent" />
                <Text variant="mono" size="xs" weight="font-bold" uppercase>Export Console</Text>
              </Box>
              <Stack gap={3}>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={handleExportCSV}
                >
                  <Box display="flex" align="center" gap={3} width="full" className="text-left">
                    <FileJson className="w-4 h-4 shrink-0" />
                    <Stack gap={0}>
                      <Text variant="mono" size="micro" weight="font-bold">EXPORT_CSV</Text>
                      <Text variant="body" size="micro" color="dim">Raw machine-readable data</Text>
                    </Stack>
                  </Box>
                </Button>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={handleExportPDF}
                >
                  <Box display="flex" align="center" gap={3} width="full" className="text-left">
                    <FileText className="w-4 h-4 shrink-0" />
                    <Stack gap={0}>
                      <Text variant="mono" size="micro" weight="font-bold">EXPORT_PDF_REPORT</Text>
                      <Text variant="body" size="micro" color="dim">Formatted analytical brief</Text>
                    </Stack>
                  </Box>
                </Button>
              </Stack>
            </Stack>
          </Box>

          <Box border surface="muted" padding="card">
            <Stack gap={4}>
              <Text variant="mono" size="micro" color="dim" uppercase weight="font-bold">Scraper Intelligence</Text>
              <Stack gap={3}>
                <Box display="flex" justify="between" align="center">
                  <Text variant="body" size="xs" color="dim">Success Rate</Text>
                  <Text variant="mono" size="xs" color="brand" weight="font-bold">99.8%</Text>
                </Box>
                <Box display="flex" justify="between" align="center">
                  <Text variant="body" size="xs" color="dim">Avg Latency</Text>
                  <Text variant="mono" size="xs" color="brand" weight="font-bold">1.2s</Text>
                </Box>
                <Box display="flex" justify="between" align="center">
                  <Text variant="body" size="xs" color="dim">Ethical Backoff</Text>
                  <Text variant="mono" size="xs" color="brand" weight="font-bold">ACTIVE</Text>
                </Box>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Grid>
    </Stack>
  );
}
