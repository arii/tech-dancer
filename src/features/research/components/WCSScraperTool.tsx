import React, { useCallback } from 'react';
import {
  Search,
  Download,
  FileJson,
  FileText
} from 'lucide-react';
import {
  Box,
  Stack,
  Text,
  Grid,
  Button
} from '@/layouts/Primitives';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Skeleton } from '@/components/ui/Skeleton';
import { useExport } from '../hooks/useExport';
import { useWCSData, WCSRecord } from '../hooks/useWCSData';
import { ScoreDistributionChart, AvgScoreTrendChart } from './WCSChartContainers';

function WCSDataTable({ data }: { data: WCSRecord[] }) {
  return (
    <Box border surface="default">
      <Box padding="compact" borderBottom display="flex" justify="between" align="center">
        <Text variant="mono" size="xs" weight="font-bold" uppercase>Live Dataset</Text>
        <Text variant="mono" size="micro" color="dim">{data.length} RECORDS FOUND</Text>
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
            {data.slice(0, 20).map((record, i) => (
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
      {data.length > 20 && (
        <Box padding="compact" textAlign="center" borderTop>
          <Text variant="mono" size="micro" color="dim">AND {data.length - 20} MORE RECORDS...</Text>
        </Box>
      )}
    </Box>
  );
}

function WCSExportConsole({ data }: { data: WCSRecord[] }) {
  const { exportCSV, exportPDF } = useExport();

  const handleExportPDF = useCallback(() => {
    exportPDF({
      title: 'WCS Prelim Scoring Analysis',
      filename: 'wcs_prelims',
      headers: [['Date', 'Competitor', 'Event', 'Score', 'Promoted']],
      data: data.map(r => [
        r.event_date,
        r.competitor_name,
        r.event_title,
        r.Registry_Points_Sum.toFixed(1),
        r.Promoted ? 'YES' : 'NO'
      ])
    });
  }, [data, exportPDF]);

  return (
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
            onClick={() => exportCSV(data)}
          >
            <Box display="flex" align="center" gap={3} width="full" className="text-left">
              <Box as={FileJson} width={4} height={4} shrink={0} />
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
              <Box as={FileText} width={4} height={4} shrink={0} />
              <Stack gap={0}>
                <Text variant="mono" size="micro" weight="font-bold">EXPORT_PDF_REPORT</Text>
                <Text variant="body" size="micro" color="dim">Formatted analytical brief</Text>
              </Stack>
            </Box>
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

function WCSScraperStats() {
  return (
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
            <StatusBadge label="ACTIVE" />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}

export function WCSScraperTool() {
  const {
    filteredData,
    isLoading,
    searchTerm,
    setSearchTerm,
    filterPromoted,
    setFilterPromoted,
    scoreDistribution,
    trendData
  } = useWCSData();

  if (isLoading) {
    return (
      <Stack gap={8}>
        <Box border surface="muted" padding="card">
          <Skeleton height={10} width="full" />
        </Box>
        <Grid cols={{ base: 1, lg: 3 }} gap={8}>
          <Stack gap={8} className="lg:col-span-2">
            <Grid cols={{ base: 1, md: 2 }} gap={8}>
              <Skeleton height={64} width="full" />
              <Skeleton height={64} width="full" />
            </Grid>
            <Skeleton height={96} width="full" />
          </Stack>
          <Stack gap={8}>
            <Skeleton height={48} width="full" />
            <Skeleton height={32} width="full" />
          </Stack>
        </Grid>
      </Stack>
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
            <ScoreDistributionChart data={scoreDistribution} />
            <AvgScoreTrendChart data={trendData} />
          </Grid>
          <WCSDataTable data={filteredData} />
        </Stack>

        <Stack gap={8}>
          <WCSExportConsole data={filteredData} />
          <WCSScraperStats />
        </Stack>
      </Grid>
    </Stack>
  );
}
