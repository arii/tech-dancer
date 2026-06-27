import { RefreshCw, CheckCircle, ChevronRight } from 'lucide-react';
import { UXReport } from '@/features/ux-auditor/useUXAuditor';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';
import { EmptyState } from '@/components/ui/EmptyState';
import { cardVariants, listRowVariants } from '@/lib/variants';

export interface UXAuditorHistoryProps {
  reports: UXReport[];
  activeReport: UXReport | null;
  setActiveReport: (report: UXReport | null) => void;
}

const UXAuditorHistory = ({ reports, activeReport, setActiveReport }: UXAuditorHistoryProps) => {
  return (
    <Stack gap={4} span={{ lg: 1 }} minWidth={0}>
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
            className={listRowVariants({ active: activeReport?.id === report.id })}
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

export default UXAuditorHistory;
