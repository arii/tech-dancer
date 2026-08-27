import { useCallback, useEffect, useState } from 'react';
import {
  Search,
  Download,
  FileJson,
  FileText,
  AlertCircle,
  Zap,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Loader2,
  Database,
  CheckCircle2,
  Clock
} from 'lucide-react';
import {
  Box,
  Stack,
  Text,
  Grid
} from '@/layouts/Primitives';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Skeleton } from '@/components/ui/Skeleton';
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
    isSearching,
    latency,
    error,
    searchTerm,
    searchInput,
    setSearchInput,
    filterPromoted,
    setFilterPromoted,
    scoreDistribution,
    trendData,
    totalEvents,
    lastSync
  } = useWCSData();

  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);

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

  const eventsCountFormatted = (totalEvents || 6308).toLocaleString();

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

      {/* Prominent KPI Callout Cards */}
      <Grid cols={{ base: 1, lg: 3 }} gap={4}>
        {/* Primary Metric Card */}
        <Box border radius="xl" surface="muted" padding="card" className="lg:col-span-1">
          <Stack gap={3}>
            <Box display="flex" align="center" justify="between">
              <Text variant="mono" size="micro" weight="font-bold" uppercase color="accent" tracking="widest">Indexed Corpus</Text>
              <Database className="w-5 h-5 text-accent shrink-0" />
            </Box>
            <Stack gap={1}>
              <Text variant="display" size="4xl" weight="font-black" data-testid="kpi-total-events">
                {eventsCountFormatted}
              </Text>
              <Text variant="body" size="xs" color="dim">
                Total Dance Events Indexed (Since 2023)
              </Text>
            </Stack>
          </Stack>
        </Box>

        {/* Status Indicator Grid */}
        <Grid cols={{ base: 1, sm: 3 }} gap={4} className="lg:col-span-2">
          <Box border radius="xl" surface="default" padding={4}>
            <Stack gap={2}>
              <Box display="flex" align="center" gap={2}>
                <Zap className="w-4 h-4 text-accent shrink-0" />
                <Text variant="mono" size="micro" weight="font-bold" uppercase color="dim">Safe Access</Text>
              </Box>
              <Box display="flex" align="center" gap={2}>
                <StatusBadge label="OPERATIONAL" />
              </Box>
              <Text variant="body" size="micro" color="dim">Rate-limited extraction</Text>
            </Stack>
          </Box>

          <Box border radius="xl" surface="default" padding={4}>
            <Stack gap={2}>
              <Box display="flex" align="center" gap={2}>
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                <Text variant="mono" size="micro" weight="font-bold" uppercase color="dim">Verification</Text>
              </Box>
              <Text variant="mono" size="sm" weight="font-bold" color="accent">
                ACTIVE
              </Text>
              <Text variant="body" size="micro" color="dim">Dual Result-ID validation</Text>
            </Stack>
          </Box>

          <Box border radius="xl" surface="default" padding={4}>
            <Stack gap={2}>
              <Box display="flex" align="center" gap={2}>
                <Clock className="w-4 h-4 text-accent shrink-0" />
                <Text variant="mono" size="micro" weight="font-bold" uppercase color="dim">Last Sync</Text>
              </Box>
              <Text variant="mono" size="sm" weight="font-bold">
                {isLoading ? 'PENDING' : lastSync || 'RECENT'}
              </Text>
              <Text variant="body" size="micro" color="dim">Automated Parquet update</Text>
            </Stack>
          </Box>
        </Grid>
      </Grid>

      {/* Expandable Methodology & Architecture Drawer */}
      <Box border radius="xl" surface="default" className="overflow-hidden">
        <Box
          as="button"
          type="button"
          padding={4}
          width="full"
          display="flex"
          align="center"
          justify="between"
          onClick={() => setIsMethodologyOpen(!isMethodologyOpen)}
          className="text-left hover:bg-line/20 motion-safe:transition-colors"
          aria-expanded={isMethodologyOpen}
          aria-controls="methodology-drawer-content"
          data-testid="methodology-drawer-toggle"
        >
          <Box display="flex" align="center" gap={3}>
            <ShieldCheck className="w-5 h-5 text-accent shrink-0" />
            <Text variant="mono" size="xs" weight="font-bold" uppercase tracking="wider">
              View Data Integrity & Architecture Specs
            </Text>
          </Box>
          {isMethodologyOpen ? (
            <ChevronUp className="w-5 h-5 text-dim shrink-0" />
          ) : (
            <ChevronDown className="w-5 h-5 text-dim shrink-0" />
          )}
        </Box>

        {isMethodologyOpen && (
          <Box id="methodology-drawer-content" borderTop padding={6} surface="muted">
            <Grid cols={{ base: 1, md: 3 }} gap={6}>
              <Stack gap={2}>
                <Box display="flex" align="center" gap={2}>
                  <Icon icon={Zap} size="sm" color="accent" />
                  <Text weight="font-bold" size="xs" uppercase tracking="widest" color="accent">Safe Access</Text>
                </Box>
                <Text size="xs" color="dim">
                  Asynchronous extraction with intentional delays and zero-impact rate-limiting to protect origin host server performance.
                </Text>
              </Stack>
              <Stack gap={2}>
                <Box display="flex" align="center" gap={2}>
                  <Icon icon={ShieldCheck} size="sm" color="accent" />
                  <Text weight="font-bold" size="xs" uppercase tracking="widest" color="accent">Public Data Integrity</Text>
                </Box>
                <Text size="xs" color="dim">
                  Strictly indexing public scoring data for aggregate research and statistical trend modeling across division tiers.
                </Text>
              </Stack>
              <Stack gap={2}>
                <Box display="flex" align="center" gap={2}>
                  <Icon icon={CheckCircle2} size="sm" color="accent" />
                  <Text weight="font-bold" size="xs" uppercase tracking="widest" color="accent">Dual-ID Verification</Text>
                </Box>
                <Text size="xs" color="dim">
                  We verify score fidelity across multiple data points (Result IDs, Dancer IDs, and Event URLs) to maintain zero false positives.
                </Text>
              </Stack>
            </Grid>
          </Box>
        )}
      </Box>

      {/* Prominent Search Bar & Filter Controls */}
      <Box border surface="muted" padding="card" radius="xl">
        <Stack gap={6}>
          <Box display="flex" align="center" justify="between">
            <Box display="flex" align="center" gap={3}>
              <Search className="w-5 h-5 text-accent shrink-0" />
              <Text variant="mono" size="xs" weight="font-bold" uppercase color="dim">
                Competitor Search & Filter
              </Text>
            </Box>
            {isSearching && (
              <Box display="flex" align="center" gap={2} data-testid="active-search-indicator">
                <Loader2 className="w-4 h-4 text-accent motion-safe:animate-spin shrink-0" />
                <Text variant="mono" size="micro" color="accent" weight="font-bold">
                  Querying {eventsCountFormatted} records...
                </Text>
              </Box>
            )}
          </Box>

          <Grid cols={{ base: 1, md: 2 }} gap={4}>
            <Box surface="default" border paddingX="compact" paddingY={3} display="flex" align="center" gap={3} radius="md" className="focus-within:border-accent motion-safe:transition-colors">
              <Search className="w-4 h-4 text-dim shrink-0" />
              <input
                type="text"
                placeholder="Search Competitor Name or Dancer ID (e.g. John Doe, ID 1234)..."
                className="bg-transparent border-none outline-none text-sm w-full font-mono placeholder:text-text-dim/60"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                data-testid="wcs-search-input"
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
      ) : isSearching ? (
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
      )}
    </Stack>
  );
}
