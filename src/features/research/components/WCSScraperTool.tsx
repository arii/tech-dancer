import {
  Search,
  Download,
  FileJson,
  FileText,
  Loader2
} from 'lucide-react';
import {
  Box,
  Stack,
  Text,
  Grid,
  Button
} from '@/layouts/Primitives';
import { useExport } from '../hooks/useExport';
import { useWCSData, WCSRecord } from '../hooks/useWCSData';
import { ScoreDistributionChart, AvgScoreTrendChart } from './WCSChartContainers';

function WCSDataTable({ data }: { data: WCSRecord[] }) {
  return (
    <div className="border border-line bg-surface">
      <div className="p-4 border-b border-line flex justify-between items-center">
        <Text variant="mono" size="xs" weight="font-bold" uppercase>Live Dataset</Text>
        <Text variant="mono" size="micro" color="dim">{data.length} RECORDS FOUND</Text>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-line">
              <th className="p-4 text-xs font-mono text-dim uppercase font-normal">Date</th>
              <th className="p-4 text-xs font-mono text-dim uppercase font-normal">Competitor</th>
              <th className="p-4 text-xs font-mono text-dim uppercase font-normal">Event</th>
              <th className="p-4 text-xs font-mono text-dim uppercase font-normal">Score</th>
              <th className="p-4 text-xs font-mono text-dim uppercase font-normal">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 20).map((record, i) => (
              <tr key={`${record.Dancer_ID}-${record.result_id}-${i}`} className="border-b border-line/50 transition-colors">
                <td className="p-4 font-mono text-xs text-dim">{record.event_date}</td>
                <td className="p-4">
                  <div className="flex flex-col">
                    <Text variant="body" size="xs" weight="font-bold">{record.competitor_name}</Text>
                    <Text variant="mono" size="micro" color="dim">#{record.Dancer_ID}</Text>
                  </div>
                </td>
                <td className="p-4 text-xs text-dim">{record.event_title}</td>
                <td className="p-4 font-mono text-xs">{record.Registry_Points_Sum.toFixed(1)}</td>
                <td className="p-4">
                  <div className={`px-2 py-0.5 inline-block text-xs font-black uppercase tracking-widest ${record.Promoted ? 'bg-accent text-accent-navy' : 'bg-muted text-dim opacity-50'}`}>
                    {record.Promoted ? 'Promoted' : 'Held'}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.length > 20 && (
        <div className="p-4 text-center border-t border-line">
          <Text variant="mono" size="micro" color="dim">AND {data.length - 20} MORE RECORDS...</Text>
        </div>
      )}
    </div>
  );
}

function WCSExportConsole({ data }: { data: WCSRecord[] }) {
  const { exportCSV, exportPDF } = useExport();

  return (
    <div className="border border-line bg-surface p-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <Download className="w-5 h-5 text-accent" />
          <Text variant="mono" size="xs" weight="font-bold" uppercase>Export Console</Text>
        </div>
        <div className="flex flex-col gap-3">
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => exportCSV(data)}
          >
            <div className="flex items-center gap-3 w-full text-left">
              <FileJson className="w-4 h-4 shrink-0" />
              <div className="flex flex-col">
                <Text variant="mono" size="micro" weight="font-bold">EXPORT_CSV</Text>
                <Text variant="body" size="micro" color="dim">Raw machine-readable data</Text>
              </div>
            </div>
          </Button>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => exportPDF(data)}
          >
            <div className="flex items-center gap-3 w-full text-left">
              <FileText className="w-4 h-4 shrink-0" />
              <div className="flex flex-col">
                <Text variant="mono" size="micro" weight="font-bold">EXPORT_PDF_REPORT</Text>
                <Text variant="body" size="micro" color="dim">Formatted analytical brief</Text>
              </div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}

function WCSScraperStats() {
  return (
    <div className="border border-line bg-muted p-6">
      <div className="flex flex-col gap-4">
        <Text variant="mono" size="micro" color="dim" uppercase weight="font-bold">Scraper Intelligence</Text>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <Text variant="body" size="xs" color="dim">Success Rate</Text>
            <Text variant="mono" size="xs" color="brand" weight="font-bold">99.8%</Text>
          </div>
          <div className="flex justify-between items-center">
            <Text variant="body" size="xs" color="dim">Avg Latency</Text>
            <Text variant="mono" size="xs" color="brand" weight="font-bold">1.2s</Text>
          </div>
          <div className="flex justify-between items-center">
            <Text variant="body" size="xs" color="dim">Ethical Backoff</Text>
            <Text variant="mono" size="xs" color="brand" weight="font-bold">ACTIVE</Text>
          </div>
        </div>
      </div>
    </div>
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
      <div className="p-12 flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
          <Text variant="mono" size="xs">INGESTING DATASET...</Text>
        </div>
      </div>
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
