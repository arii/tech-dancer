import { useCallback } from 'react';
import { Download, FileJson, FileText } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { ActionButton } from '@/components/ui/ActionButton';
import { useExport } from '../hooks/useExport';
import { WCSRecord } from '../hooks/useWCSData';

interface WCSExportToolsProps {
  data: WCSRecord[];
}

export function WCSExportTools({ data }: WCSExportToolsProps) {
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
