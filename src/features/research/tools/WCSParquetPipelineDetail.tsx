import { Box, Stack, Text } from '@/layouts/Primitives';
import { PageHeader } from '@/components/ui/PageHeader';
import { Binary } from 'lucide-react';

export function WCSParquetPipelineDetail() {
  return (
    <Stack gap={12}>
      <PageHeader
        label="DATA PIPELINE // SYSTEM ARCHITECTURE"
        title="WCS Parquet Ingestion Engine"
        paddingBottom={0}
        border="none"
      />

      <Box border radius="md" surface="default" padding="compact">
        <Text variant="body" size="lg" color="dim">
          A high-scale, unstructured-to-structured ETL pipeline designed to convert raw web telemetry from WCS competition registries into analysis-ready Apache Parquet datasets.
        </Text>
      </Box>

      <Stack gap={8}>
        <Text variant="headline" size="xl" weight="font-black">Architectural Overview</Text>
        <Stack gap={6}>
          <Stack gap={2} paddingLeft={4} className="border-l-2 border-accent">
            <Text variant="mono" size="xs" weight="font-bold" uppercase color="accent">1. Ingestion Phase</Text>
            <Text size="sm" color="dim">The scraper (scraper.py) executes resilient HTTP request queues to extract raw HTML/JSON competitive records, handling pagination and rate-limiting across distributed registries.</Text>
          </Stack>
          <Stack gap={2} paddingLeft={4} className="border-l-2 border-accent">
            <Text variant="mono" size="xs" weight="font-bold" uppercase color="accent">2. Transformation Phase</Text>
            <Text size="sm" color="dim">The processor (processor.py) normalizes inconsistent scoring schemas, resolves dancer identity overlaps, and validates data integrity against strict TypeScript-aligned contracts.</Text>
          </Stack>
          <Stack gap={2} paddingLeft={4} className="border-l-2 border-accent">
            <Text variant="mono" size="xs" weight="font-bold" uppercase color="accent">3. Serialization Phase</Text>
            <Text size="sm" color="dim">Data is serialized into compressed Apache Parquet format (wcs_prelims.parquet), enabling high-performance column-oriented analytical queries with minimal disk footprint.</Text>
          </Stack>
        </Stack>
      </Stack>

      <Box border radius="lg" padding="card" className="bg-surface/50 border-dashed">
        <Stack gap={4} align="center" textAlign="center">
          <Binary className="w-8 h-8 text-accent opacity-50" />
          <Stack gap={2}>
            <Text variant="display" size="xl">System Benefits</Text>
            <Text variant="body" size="sm" color="dim" maxWidth="md">
              By shifting from raw JSON to columnar Parquet, we achieved a 12x reduction in data size and a 50x speed increase for downstream analytical visualizations.
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
