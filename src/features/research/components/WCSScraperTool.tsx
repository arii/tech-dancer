// Cleaned imports
import React, { useCallback, useEffect } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Skeleton } from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils';
import { useExport } from '../hooks/useExport';
import { useWCSData, WCSRecord } from '../hooks/useWCSData';
import { ScoreDistributionChart, AvgScoreTrendChart } from './WCSChartContainers';
import { FilterButton } from '@/components/ui/FilterButton';
import { ActionButton } from '@/components/ui/ActionButton';
import { ResearchToolShell } from '@/components/research/ResearchToolShell';
import DataPanel from '@/components/layout/DataPanel';
import { StatsList } from '@/components/layout/StatsList';
import { ExportActions } from '@/components/layout/ExportActions';

function WCSDataTable({ data }: { data: WCSRecord[] }) {
  return (
    <DataPanel
      title="Scoring Results"
      actions={
        <Text variant="mono" size="micro" color="dim" data-testid="search-results-count">{data.length} RECORDS FOUND</Text>
      }
    >
      <Box className="overflow-x-auto" marginX="-card">
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
                  <Text as="a" href={record.event_url} target="_blank" rel="noopener noreferrer" variant="body" size="xs" color="dim" className="transition-colors underline-offset-4 hover:underline hover:color-accent">{record.event_title}</Text>
                </Box>
                <Text as="td" padding={4} size="xs" color="dim" className="hidden md:table-cell">{record.location}</Text>
                <Text as="td" padding={4} variant="mono" size="xs">{record.Registry_Points_Sum.toFixed(1)}</Text>
                <Box as="td" padding={4} className="hidden sm:table-cell">
                  <Text as="div" display="inline-block" paddingX={2} paddingY={0.5} surface={record.Promoted ? 'accent' : 'muted'} size="xs" weight="font-black" uppercase tracking="widest" className={record.Promoted ? 'text-accent-navy' : 'text-text-dim opacity-muted'}>{record.Promoted ? 'Promoted' : 'Held'}</Text>
                </Box>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={6}>
                  <Box paddingY={12} textAlign="center"><Text variant="body" size="sm" color="dim">No results found for this search.</Text></Box>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Box>
      {data.length > 20 && (
        <Box padding="compact" textAlign="center" borderTop className="border-line/20"><Text variant="mono" size="micro" color="dim">AND {data.length - 20} MORE RECORDS...</Text></Box>
      )}
    </DataPanel>
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
    totalEvents
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
            <ActionButton variant="secondary" paddingX={6} paddingY={3} onClick={() => window.location.reload()}>Retry Connection</ActionButton>
          </Box>
        </Stack>
      </Box>
    );
  }

  const stats = [
    { label: 'Status', value: 'OPERATIONAL' },
    { label: 'Latency', value: latency ? `${(latency / 1000).toFixed(2)}s` : '---' },
    { label: 'Events Processed', value: totalEvents || '---' },
    { label: 'Safe Access', value: 'ACTIVE', isStatusBadge: true }
  ];

  const { exportCSV, exportPDF } = useExport();

  const handleExportPDF = useCallback(() => {
    window.gtag?.('event', 'data_export', { format: 'pdf', tool: 'wcs_scraper' });
    exportPDF({
      title: 'WCS Prelim Scoring Analysis',
      filename: 'wcs_prelims',
      headers: [['Date', 'Competitor', 'Event', 'Score', 'Promoted']],
      data: filteredData.map(r => [r.event_date, r.competitor_name, r.event_title, r.Registry_Points_Sum.toFixed(1), r.Promoted ? 'YES' : 'NO'])
    });
  }, [filteredData, exportPDF]);

  const handleExportCSV = useCallback(() => {
    window.gtag?.('event', 'data_export', { format: 'csv', tool: 'wcs_scraper' });
    exportCSV(filteredData);
  }, [filteredData, exportCSV]);

  const exportActions = [
    { label: 'EXPORT_CSV', description: 'Raw machine-readable data', icon: 'csv' as const, onClick: handleExportCSV },
    { label: 'EXPORT_PDF_REPORT', description: 'Formatted analytical brief', icon: 'pdf' as const, onClick: handleExportPDF }
  ];

  return (
    <ResearchToolShell
      title="WCS Scoring Analysis"
      description={
        <>
          <Text variant="display" size="4xl" weight="font-black">WCS Scoring Analysis</Text>
          <Text variant="body" size="lg" color="dim" maxWidth="3xl">
            A tool for extracting and analyzing public West Coast Swing competition results.
            Provides transparency on scoring patterns and promotion trends through data analysis.
          </Text>
        </>
      }
      controls={
        <Box border surface="muted" padding="card">
          <Stack gap={6}>
            <Box display="flex" align="center" gap={3}>
              <Search className="w-5 h-5 text-dim" />
              <Text variant="mono" size="xs" weight="font-bold" uppercase color="dim">Search</Text>
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
                {(['all', 'promoted', 'not-promoted'] as const).map(filter => (
                  <Box key={filter} flex={1}>
                    <FilterButton
                      variant="compact"
                      label={filter.replace('-', ' ')}
                      onClick={() => handleFilterChange(filter)}
                      isActive={filterPromoted === filter}
                      className={cn(
                        "w-full justify-center",
                        filterPromoted === filter ? "bg-accent text-bg border-accent" : "bg-surface-alt text-text-dim border-line/50"
                      )}
                    />
                  </Box>
                ))}
              </Stack>
            </Grid>
          </Stack>
        </Box>
      }
      summaryCards={
        <>
          <DataPanel title="Verification">
            <Box paddingX={4} paddingY={6}>
              <StatsList stats={stats} />
            </Box>
          </DataPanel>
          <DataPanel title="Stats">
            <Box paddingX={4} paddingY={6}>
              <StatsList stats={stats} />
            </Box>
          </DataPanel>
        </>
      }
      output={
        isLoading ? (
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
            <Grid cols={{ base: 1, lg: 3 }} gap={8}>
              <Stack gap={8} className="lg:col-span-2">
                <Grid cols={{ base: 1, md: 2 }} gap={{ base: 4, md: 8 }}>
                  <ScoreDistributionChart data={scoreDistribution} />
                  <AvgScoreTrendChart data={trendData} />
                </Grid>
                <WCSDataTable data={filteredData} />
              </Stack>
              <Stack gap={8}>
                <DataPanel title="Export Data">
                  <ExportActions actions={exportActions} />
                </DataPanel>
                <DataPanel title="Stats">
                  <Box paddingX={4} paddingY={6}>
                    <StatsList stats={stats} />
                  </Box>
                </DataPanel>
              </Stack>
            </Grid>
          </>
        )
      }
    />
  );
}
