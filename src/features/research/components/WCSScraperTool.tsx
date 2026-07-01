import { Stack, Grid } from '@/layouts/Primitives';
import { Skeleton } from '@/components/ui/Skeleton';
import { useWCSData } from '../hooks/useWCSData';
import { ScoreDistributionChart, AvgScoreTrendChart } from './WCSChartContainers';
import { WCSDataTable } from './WCSDataTable';
import { WCSExportTools } from './WCSExportTools';
import { WCSScraperStats } from './WCSScraperStats';
import { WCSScraperHeader } from './WCSScraperHeader';
import { WCSScraperDashboard } from './WCSScraperDashboard';
import { WCSScraperSearch } from './WCSScraperSearch';

export function WCSScraperTool() {
  const {
    filteredData,
    isLoading,
    latency,
    scoreDistribution,
    trendData,
    totalEvents
  } = useWCSData();

  return (
    <Stack gap={8}>
      <WCSScraperHeader />
      <WCSScraperDashboard />

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
          <WCSScraperSearch />
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
