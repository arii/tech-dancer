import React, { useCallback, useEffect } from 'react';
import {
  Search,
  Download,
  FileJson,
  FileText,
  AlertCircle
} from 'lucide-react';
import {
  Box,
  Stack,
  Text,
  Grid
} from '@/layouts/Primitives';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Skeleton } from '@/components/ui/Skeleton';
import { Zap, ShieldCheck } from 'lucide-react';
import { Icon } from '@/components/ui/Icon';
import { useExport } from '../hooks/useExport';
import { useWCSData, WCSRecord } from '../hooks/useWCSData';
import { ScoreDistributionChart, AvgScoreTrendChart } from './WCSChartContainers';
import { FilterButton } from '@/components/ui/FilterButton';
import { ActionButton } from '@/components/ui/ActionButton';

function WCSDataTable({ data }: { data: WCSRecord[] }) {
  return (
    <Box border surface="default">
      <Box padding="compact" borderBottom display="flex" justify="between" align="center">
        <Text variant="mono" size="xs" weight="font-bold" uppercase>Scoring Results</Text>
        <Text variant="mono" size="micro" color="dim" data-testid="search-results-count">{data.length} RECORDS FOUND</Text>
      </Box>
      <Box className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-line">
              <Text as="th" padding={4} textAlign="left" size="xs" variant="mono" color="dim" uppercase weight="font-normal">Date</Text>
              <Text as="th" padding={4} textAlign="left" size="xs" variant="mono" color="dim" uppercase weight="font-normal">Competitor</Text>
              <Text as="th" padding={4} textAlign="left" size="xs" variant="mono" color="dim" uppercase weight="font-normal">Event</Text>
              <Text as="th" padding={4} textAlign="left" size="xs" variant="mono" color="dim" uppercase weight="font-normal" className="hidden md:table-cell">Location</Text>
              <Text as="th" padding={4} textAlign="left" size="xs" variant="mono" color="dim" uppercase weight="font-normal">Score</Text>
              <Text as="th" padding={4} textAlign="left" size="xs" variant="mono" color="dim" uppercase weight="font-normal" className="hidden sm:table-cell">Status</Text>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 20).map((record, i) => (
              <tr key={`${record.Dancer_ID}-${record.result_id}-${record.event_title}-${i}`} className="border-b border-line/50 transition-colors">
                <Text as="td" padding={4} variant="mono" size="xs" color="dim">{record.event_date}</Text>
                <Box as="td" padding={4}>
                  <Stack gap={0}>
                    <Text variant="body" size="xs" weight="font-bold">{record.competitor_name}</Text>
                    <Text variant="mono" size="micro" color="dim">#{record.Dancer_ID}</Text>
                  </Stack>
                </Box>
                <Box as="td" padding={4}>
                  <Text
                    as="a"
                    href={record.event_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="body"
                    size="xs"
                    color="dim"
                    className="transition-colors underline-offset-4 hover:underline hover:color-accent"
                  >
                    {record.event_title}
                  </Text>
                </Box>
                <Text as="td" padding={4} size="xs" color="dim" className="hidden md:table-cell">{record.location}</Text>
                <Text as="td" padding={4} variant="mono" size="xs">{record.Registry_Points_Sum.toFixed(1)}</Text>
                <Box as="td" padding={4} className="hidden sm:table-cell">
                  <Text
                    as="div"
                    display="inline-block"
                    paddingX={2}
                    paddingY={0.5}
                    surface={record.Promoted ? 'accent' : 'muted'}
                    size="xs"
                    weight="font-black"
                    uppercase
                    tracking="widest"
                    className={record.Promoted ? 'text-accent-navy' : 'text-text-dim opacity-muted'}
                  >
                    {record.Promoted ? 'Promoted' : 'Held'}
                  </Text>
                </Box>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={6}>
                  <Box paddingY={12} textAlign="center">
                    <Text variant="body" size="sm" color="dim">No results found for this search.</Text>
                  </Box>
                </td>
              </tr>
            )}
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

function WCSExportTools({ data }: { data: WCSRecord[] }) {
  const { exportCSV, exportPDF } = useExport();

  const handleExportPDF = useCallback(() => {
    window.gtag?.('event', 'data_export', { format: 'pdf', tool: 'wcs_scraper' });
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

  const handleExportCSV = useCallback(() => {
    window.gtag?.('event', 'data_export', { format: 'csv', tool: 'wcs_scraper' });
    exportCSV(data);
  }, [data, exportCSV]);

  return (
    <Box border surface="default" padding="card">
      <Stack gap={6}>
        <Box display="flex" align="center" gap={3}>
          <Download className="w-5 h-5 text-accent" />
          <Text variant="mono" size="xs" weight="font-bold" uppercase>Export Data</Text>
        </Box>
        <Stack gap={3}>
          <ActionButton
            variant="secondary"
            width="full"
            padding={3}
            onClick={handleExportCSV}
          >
            <Box display="flex" align="center" gap={3} width="full" textAlign="left">
              <FileJson className="w-4 h-4 shrink-0" />
              <Stack gap={0}>
                <Text variant="mono" size="micro" weight="font-bold">EXPORT_CSV</Text>
                <Text variant="body" size="micro" color="dim">Raw machine-readable data</Text>
              </Stack>
            </Box>
          </ActionButton>
          <ActionButton
            variant="secondary"
            width="full"
            padding={3}
            onClick={handleExportPDF}
          >
            <Box display="flex" align="center" gap={3} width="full" textAlign="left">
              <FileText className="w-4 h-4 shrink-0" />
              <Stack gap={0}>
                <Text variant="mono" size="micro" weight="font-bold">EXPORT_PDF_REPORT</Text>
                <Text variant="body" size="micro" color="dim">Formatted analytical brief</Text>
              </Stack>
            </Box>
          </ActionButton>
        </Stack>
      </Stack>
    </Box>
  );
}

function WCSScraperStats({ latency, totalEvents }: { latency: number | null, totalEvents: number | null }) {
  return (
    <Box paddingX={4} paddingY={6}>
      <Stack gap={4}>
        <Text variant="mono" size="micro" color="dim" uppercase weight="font-bold" tracking="widest">Stats</Text>
        <Stack gap={4}>
          <Box display="flex" justify="between" align="center" borderBottom="b" paddingBottom={2} className="border-line/20">
            <Text variant="body" size="xs" color="dim">Status</Text>
            <Text variant="mono" size="xs" color="brand" weight="font-bold">OPERATIONAL</Text>
          </Box>
          <Box display="flex" justify="between" align="center" borderBottom="b" paddingBottom={2} className="border-line/20">
            <Text variant="body" size="xs" color="dim">Latency</Text>
            <Text variant="mono" size="xs" color="brand" weight="font-bold">
              {latency ? `${(latency / 1000).toFixed(2)}s` : '---'}
            </Text>
          </Box>
          <Box display="flex" justify="between" align="center" borderBottom="b" paddingBottom={2} className="border-line/20">
            <Text variant="body" size="xs" color="dim">Events Processed</Text>
            <Text variant="mono" size="xs" color="brand" weight="font-bold">{totalEvents || '---'}</Text>
          </Box>
          <Box display="flex" justify="between" align="center">
            <Text variant="body" size="xs" color="dim">Safe Access</Text>
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
    latency,
    error,
    searchTerm,
    setSearchTerm,
    filterPromoted,
    setFilterPromoted,
    scoreDistribution,
    trendData,
    totalEvents,
    lastSync
  } = useWCSData();

  useEffect(() => {
    if (!searchTerm) return;
    const timer = setTimeout(() => {
      window.gtag?.('event', 'search', { search_term: searchTerm, tool: 'wcs_scraper' });
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleFilterChange = useCallback((filter: 'all' | 'promoted' | 'not-promoted') => {
    setFilterPromoted(filter);
    window.gtag?.('event', 'filter_change', { filter_type: 'promotion', value: filter, tool: 'wcs_scraper' });
  }, [setFilterPromoted]);

  if (error) {
    return (
      <Box border surface="muted" padding="card" className="border-accent/20">
        <Stack align="center" gap={4} paddingY={10}>
          <AlertCircle className="w-12 h-12 text-accent opacity-muted" />
          <Stack align="center" gap={1}>
            <Text variant="mono" size="sm" weight="font-bold" uppercase>Data Synchronisation Failed</Text>
            <Text variant="body" size="xs" color="dim" textAlign="center">{error}</Text>
          </Stack>
          <Box paddingTop={4}>
            <ActionButton variant="secondary" paddingX={6} paddingY={3} onClick={() => window.location.reload()}>
              Retry Connection
            </ActionButton>
          </Box>
        </Stack>
      </Box>
    );
  }

  return (
    <Stack gap={8}>
      <Box paddingBottom={8} borderBottom>
        <Stack gap={4}>
          <Box display="flex" align="center" gap={3}>
            <Text variant="mono" size="xs" weight="font-bold" color="accent" uppercase tracking="widest">Scoring Tool</Text>
            <StatusBadge label="active" />
          </Box>
          <Stack gap={2}>
            <Text variant="display" size="4xl" weight="font-black">WCS Scoring Analysis</Text>
            <Text variant="body" size="lg" color="dim" maxWidth="3xl">
              A tool for extracting and analyzing public West Coast Swing competition results.
              Provides transparency on scoring patterns and promotion trends through data analysis.
            </Text>
          </Stack>
        </Stack>
      </Box>

      {/* Extraction & Impact Dashboard */}
      <Box padding={{ base: 4, md: 8 }} border radius="xl" surface="muted" className="relative overflow-hidden">
        <Grid cols={{ base: 1, lg: 2 }} gap={{ base: 8, lg: 12 }}>
          <Stack gap={6}>
            <Stack gap={2}>
              <Text variant="display" size="2xl" weight="font-black">Event Data</Text>
              <Text variant="body" size="lg" color="dim">
                We have retrieved data from {(totalEvents || 6308).toLocaleString()} events since 2023.
                We are currently adding more past results to the database.
              </Text>
            </Stack>
            <Grid cols={{ base: 1, md: 2 }} gap={6}>
              <Stack gap={2}>
                <Box display="flex" align="center" gap={2}>
                  <Icon icon={Zap} size="sm" color="accent" />
                  <Text weight="font-bold" size="xs" uppercase tracking="widest" color="accent">Safe Access</Text>
                </Box>
                <Text size="xs" color="dim">Asynchronous extraction with intentional delays to ensure zero impact on host server performance.</Text>
              </Stack>
              <Stack gap={2}>
                <Box display="flex" align="center" gap={2}>
                  <Icon icon={ShieldCheck} size="sm" color="accent" />
                  <Text weight="font-bold" size="xs" uppercase tracking="widest" color="accent">Public Data</Text>
                </Box>
                <Text size="xs" color="dim">Strictly indexing public scoring data for aggregate research and statistical analysis.</Text>
              </Stack>
            </Grid>
          </Stack>
          <Stack gap={6} justify="center">
            <Box padding={6} border radius="md" surface="surface">
              <Stack gap={4}>
                <Box display="flex" justify="between" align="center">
                  <Text variant="mono" size="xs" weight="font-bold" color="dim">VERIFICATION</Text>
                  <Text variant="mono" size="micro" color="success">ACTIVE</Text>
                </Box>
                <Text size="sm" color="body">
                  We check multiple data points (Result IDs and Event URLs) to ensure the scores are accurate.
                </Text>
                <Box height={0.5} surface="muted" />
                <Box display="flex" justify="between" align="center">
                  <Text variant="mono" size="xs" weight="font-bold" color="dim">LAST SYNC</Text>
                  <Text variant="mono" size="micro" color="accent">{isLoading ? 'PENDING' : lastSync || 'RECENT'}</Text>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Grid>
      </Box>

      {isLoading ? (
        <Grid cols={{ base: 1, lg: 3 }} gap={8} align="start">
          <Stack gap={8} className="lg:col-span-2">
            <Grid cols={{ base: 1, md: 2 }} gap={{ base: 4, md: 8 }}>
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
      ) : (
        <>
          <Box border surface="muted" padding="card">
            <Stack gap={6}>
              <Box display="flex" align="center" gap={3}>
                <Search className="w-5 h-5 text-dim" />
                <Text variant="mono" size="xs" weight="font-bold" uppercase color="dim">
                  Search
                </Text>
              </Box>

              <Grid cols={{ base: 1, md: 2 }} gap={4}>
                <Box surface="default" border paddingX="compact" paddingY={3} display="flex" align="center" gap={2}>
                  <Search className="w-4 h-4 text-dim" />
                  <input
                    type="text"
                    placeholder="Search by name, ID, or event..."
                    className="bg-transparent border-none outline-none text-sm w-full font-mono"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Box>

                <Stack direction="row" gap={2} width="full">
                  {(['all', 'promoted', 'not-promoted'] as const).map((filter) => (
                    <Box key={filter} flex={1}>
                      <FilterButton
                        variant="compact"
                        label={filter.replace('-', ' ')}
                        onClick={() => handleFilterChange(filter)}
                        isActive={filterPromoted === filter}
                        className="w-full capitalize"
                      />
                    </Box>
                  ))}
                </Stack>
              </Grid>
            </Stack>
          </Box>

          <Grid cols={{ base: 1, lg: 3 }} gap={8}>
            <Stack gap={8} className="lg:col-span-2">
              <Grid cols={{ base: 1, md: 2 }} gap={{ base: 4, md: 8 }}>
                <ScoreDistributionChart data={scoreDistribution} />
                <AvgScoreTrendChart data={trendData} />
              </Grid>
              <WCSDataTable data={filteredData} />
            </Stack>

            <Stack gap={8}>
              <WCSExportTools data={filteredData} />
              <WCSScraperStats latency={latency} totalEvents={totalEvents} />
            </Stack>
          </Grid>
        </>
      )}
    </Stack>
  );
}
