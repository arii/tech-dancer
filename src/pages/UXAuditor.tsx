import { Camera } from 'lucide-react';
import { useUXAuditor, VIEWPORTS, ViewportAnalysis } from '@/features/ux-auditor/useUXAuditor';
import { Box, Stack, Grid } from '@/layouts/Primitives';
import { PageHeader } from '@/components/ui/PageHeader';
import { SEO } from '@/components/SEO';
import { BASE_URL } from '@/config/constants';
import { RESEARCH_TOOLS } from '@/config/research-tools';
import { EmptyState } from '@/components/ui/EmptyState';
import { Icon } from '@/components/ui/Icon';

// Sub-components
import ViewportAnalysisCard from '@/features/ux-auditor/components/ViewportAnalysisCard';
import AuditForm from '@/features/ux-auditor/components/AuditForm';
import AuditHistory from '@/features/ux-auditor/components/AuditHistory';
import AuditSessionHeader from '@/features/ux-auditor/components/AuditSessionHeader';

const UXAuditor = () => {
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
      <Stack
          direction={{ base: 'col', xl: 'row' }}
          align={{ base: 'stretch', xl: 'center' }}
        justify="between"
        gap={6}
        border="b" paddingBottom={6}
      >
        <Box>
          <PageHeader
            label="Visual UX Auditor"
            title="Multimodal AI Analysis"
            description="Automated visual regression and UX improvement suggestions across viewports."
            icon={Camera}
          />
        </Box>

        <AuditForm
          url={url}
          setUrl={setUrl}
          isAnalyzing={isAnalyzing}
          runUXAudit={runUXAudit}
          customApiKey={customApiKey}
          setCustomApiKey={setCustomApiKey}
          snapshotService={snapshotService}
          setSnapshotService={setSnapshotService}
        />
      </Stack>

      <Grid gap={8}>
        {/* Reports List */}
        <AuditHistory
          reports={reports}
          activeReportId={activeReport?.id}
          setActiveReport={setActiveReport}
        />

        {/* Detailed View */}
        <Stack gap={6} span={{ base: 'full', lg: 9 }} minWidth={0} width="full">
          {activeReport ? (
            <>
              <AuditSessionHeader
                url={activeReport.url}
                isCopiedMarkdown={isCopiedMarkdown}
                copyMarkdown={copyMarkdown}
                isExportingToGithub={isExportingToGithub}
                exportToGithub={exportToGithub}
                isCompleted={activeReport.status === 'completed'}
              />

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
      </Grid>
    </Stack>
  );
};

export default UXAuditor;
