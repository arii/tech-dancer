import { Camera } from 'lucide-react';
import { useUXAuditor, VIEWPORTS, ViewportAnalysis } from '@/features/ux-auditor/useUXAuditor';
import { Box, Stack, Grid } from '@/layouts/Primitives';
import { PageHeader } from '@/components/ui/PageHeader';
import { SEO } from '@/components/SEO';
import { BASE_URL } from '@/config/constants';
import { RESEARCH_TOOLS } from '@/config/research-tools';

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

      <Grid cols={{ base: 1, lg: 4 }} gap={8}>
        {/* Reports List */}
        <AuditHistory
          reports={reports}
          activeReportId={activeReport?.id}
          setActiveReport={setActiveReport}
        />

        {/* Detailed View */}
        <Stack gap={6} span={{ lg: 3 }} minWidth={0} width="full" style={{ gridColumn: 'span 3 / span 3' }} // impeccable-ignore - Override browser grid collapse issues identified in audit
        >
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
            <Box
              display="flex"
              direction="col"
              align="center"
              justify="center"
              minHeight={500}
              surface="muted"
              radius="xl"
              className="text-center"
            >
              <Box marginBottom={4} color="dim">
                <Camera size={48} />
              </Box>
              <Grid gap={2}>
                <Box as="h3" className="text-xl font-black">Ready to Audit</Box>
                <Box as="p" className="text-sm text-dim">Enter a URL above to start the visual analysis across Mobile, Tablet, and Desktop.</Box>
              </Grid>
            </Box>
          )}
        </Stack>
      </Grid>
    </Stack>
  );
};

export default UXAuditor;
