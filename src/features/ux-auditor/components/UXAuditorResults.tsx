import { CheckCircle, Copy, RefreshCw, Github, Camera } from 'lucide-react';

import { EmptyState } from '@/components/ui/EmptyState';
import { Icon } from '@/components/ui/Icon';
import { UXReport, ViewportAnalysis, VIEWPORTS } from '@/features/ux-auditor/useUXAuditor';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { actionButtonVariants, cardVariants } from '@/lib/variants';

import ViewportAnalysisCard from './ViewportAnalysisCard';

export interface UXAuditorResultsProps {
  activeReport: UXReport | null;
  copyMarkdown: () => void;
  isCopiedMarkdown: boolean;
  exportToGithub: () => void;
  isExportingToGithub: boolean;
}

const UXAuditorResults = ({
  activeReport,
  copyMarkdown,
  isCopiedMarkdown,
  exportToGithub,
  isExportingToGithub,
}: UXAuditorResultsProps) => {
  const handleCopyMarkdown = () => copyMarkdown();
  const handleExportToGithub = () => exportToGithub();

  return (
    <Stack
        gap={6} span={{ lg: 3 }} minWidth={0} width="full"
        style={{ gridColumn: 'span 3 / span 3' }} // impeccable-ignore - Override browser grid collapse issues
    >
      {activeReport ? (
        <>
          <Stack
            padding={6}
            className={cardVariants()}
            justify="between" align={{ base: "start", md: "center" }}
            gap={6} direction={{ base: "col", md: "row" }}
          >
            <Stack gap={1} minWidth="0" flex={1}>
              <Text variant="sans" size="xs" weight="font-bold" color="accent" uppercase tracking="widest" display="block">
                Current Session
              </Text>
              <Text variant="sans" size="xl" weight="font-black" className="truncate block" title={activeReport.url}>
                {activeReport.url}
              </Text>
            </Stack>
            <Stack direction={{ base: 'col', sm: 'row' }} gap={3} shrink={0} width={{ base: 'full', sm: 'auto' }} align={{ base: 'stretch', sm: 'center' }}>
              <Box
                as="button"
                onClick={handleCopyMarkdown}
                display="flex"
                align="center"
                justify="center"
                gap={2}
                className={actionButtonVariants({ variant: "default" })}
                surface="muted"
                color="dim"
                paddingX={4}
                paddingY={2}
                radius="xl"
                width={{ base: 'full', sm: 'auto' }}
              >
                {isCopiedMarkdown ? <Icon icon={CheckCircle} size="sm" /> : <Icon icon={Copy} size="sm" />}
                {isCopiedMarkdown ? 'Copied' : 'Copy MD'}
              </Box>
              <Box
                as="button"
                onClick={handleExportToGithub}
                disabled={activeReport.status !== 'completed' || isExportingToGithub}
                display="flex"
                align="center"
                justify="center"
                gap={2}
                className={actionButtonVariants({ variant: "primary" })}
                paddingX={6}
                paddingY={2}
                radius="xl"
                width={{ base: 'full', sm: 'auto' }}
              >
                {isExportingToGithub ? <Icon icon={RefreshCw} size="sm" className="animate-spin" /> : <Icon icon={Github} size="sm" />}
                <span className="whitespace-nowrap">{isExportingToGithub ? 'Exporting...' : 'Export to GitHub Issue'}</span>
              </Box>
            </Stack>
          </Stack>

          <Stack gap={8}>
            {VIEWPORTS.map(vp => (
              <ViewportAnalysisCard
                key={vp.name}
                vp={vp}
                data={activeReport[`findings_${vp.name.toLowerCase()}`] as ViewportAnalysis}
                activeReportUrl={activeReport.url}
              />
            ))}
          </Stack>
        </>
      ) : (
        <EmptyState
          minHeight={500}
          icon={<Icon icon={Camera} size="xl" color="muted" />}
          title="Ready to Audit"
          description="Enter a URL above to start the visual analysis across Mobile, Tablet, and Desktop."
        />
      )}
    </Stack>
  );
};

export default UXAuditorResults;
