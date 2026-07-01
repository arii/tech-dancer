import { Stack, Box, Text } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';
import { RefreshCw, CheckCircle, ChevronRight } from 'lucide-react';
import { cardVariants, listRowVariants } from '@/lib/variants';
import { EmptyState } from '@/components/ui/EmptyState';
import { UXReport } from '@/features/ux-auditor/useUXAuditor';

interface AuditHistoryProps {
  reports: UXReport[];
  activeReportId?: string;
  setActiveReport: (report: UXReport) => void;
}

const AuditHistory = ({ reports, activeReportId, setActiveReport }: AuditHistoryProps) => {
  return (
    <Stack gap={4} span={{ base: 'full', lg: 3 }} minWidth={0} width="full">
      <Text variant="sans" size="xs" weight="font-bold" uppercase tracking="widest" color="dim" paddingX={1}>
        Audit History
      </Text>
      <Stack className={`${cardVariants({ overflow: "hidden" })} divide-y divide-line`} minWidth={0}>
        {reports.length === 0 && (
          <EmptyState
            compact
            title="No history"
            icon={<Icon icon={RefreshCw} size="sm" color="muted" />}
          />
        )}
        {reports.map((report) => (
          <Stack
            key={report.id}
            as="button"
            direction="row"
            onClick={() => setActiveReport(report)}
            width="full" align="center" gap={3} padding={4}
            className={listRowVariants({ active: activeReportId === report.id })}
          >
            <Box
              width={9}
              height={9}
              radius="full"
              surface={report.status === 'completed' ? 'success' : 'warning'}
              className={`${report.status !== 'completed' ? 'animate-pulse' : ''} flex items-center justify-center`}
              shrink={0}
            >
              {report.status === 'completed' ? <Icon icon={CheckCircle} size="sm" /> : <Icon icon={RefreshCw} size="sm" />}
            </Box>
            <Box flex={1} minWidth="0">
              <Text variant="sans" size="sm" weight="font-bold" className="truncate block">
                {report.url.replace('https://', '')}
              </Text>
              <Text variant="mono" size="xs" weight="font-medium" color="dim" uppercase>
                {new Date(report.timestamp).toLocaleTimeString()}
              </Text>
            </Box>
            <Icon icon={ChevronRight} size="sm" color="muted" />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default AuditHistory;
