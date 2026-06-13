import { Icon } from '@/components/ui/Icon';
import {
  CheckCircle, RefreshCw, Github, Copy, Camera
} from 'lucide-react';
import { useUXAuditor, VIEWPORTS, ViewportAnalysis as IViewportAnalysis } from '@/features/ux-auditor/useUXAuditor';
import { Box, Stack, Grid, Text } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { BASE_URL } from '@/config/constants';
import { RESEARCH_TOOLS } from '@/config/research-tools';
import { EmptyState } from '@/components/ui/EmptyState';
import { actionButtonVariants, cardVariants } from '@/lib/variants';
import { AuditHeader } from '@/features/ux-auditor/components/AuditHeader';
import { AuditSidebar } from '@/features/ux-auditor/components/AuditSidebar';
import { ViewportAnalysis } from '@/features/ux-auditor/components/ViewportAnalysis';

export default function UXAuditor() {
  const toolConfig = RESEARCH_TOOLS.find(t => t.id === 'ux-auditor');

  const {
    reports,
    isAnalyzing,
    activeReport,
    setActiveReport,
    url,
    setUrl,
    customApiKey,
    setCustomApiKey,
    snapshotService,
    setSnapshotService,
    isCopiedMarkdown,
    isExportingToGithub,
    runUXAudit,
    exportToGithub,
    copyMarkdown,
  } = useUXAuditor();

  return (
    <Stack gap={8} width="full">
      <SEO
        title="Visual UX Auditor | Perception Telemetry System"
        description="Run automated visual UX audits on any URL using multimodal AI. Identify usability issues and get improvement suggestions for Mobile, Tablet, and Desktop."
        canonical={`${BASE_URL}${toolConfig?.canonicalPath || '/ux-auditor'}`}
      />

      <AuditHeader
        url={url}
        setUrl={setUrl}
        customApiKey={customApiKey}
        setCustomApiKey={setCustomApiKey}
        snapshotService={snapshotService}
        setSnapshotService={setSnapshotService}
        isAnalyzing={isAnalyzing}
        runUXAudit={runUXAudit}
      />

      <Grid cols={{ base: 1, lg: 4 }} gap={8}>
        <AuditSidebar
          reports={reports}
          activeReport={activeReport}
          setActiveReport={setActiveReport}
        />

        <Stack gap={6} span={{ lg: 3 }} minWidth={0} width="full" style={{ gridColumn: 'span 3 / span 3' }} // impeccable-ignore - Override browser grid collapse issues identified in audit
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
                    onClick={copyMarkdown}
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
                    onClick={exportToGithub}
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
                  <ViewportAnalysis
                    key={vp.name}
                    viewport={vp}
                    data={activeReport[`findings_${vp.name.toLowerCase()}`] as IViewportAnalysis}
                    url={activeReport.url}
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
      </Grid>
    </Stack>
  );
}
