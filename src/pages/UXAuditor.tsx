import { useUXAuditor } from '@/features/ux-auditor/useUXAuditor';
import { Stack, Grid, Box } from '@/layouts/Primitives';
import { PageHeader } from '@/components/ui/PageHeader';
import { SEO } from '@/components/SEO';
import { BASE_URL } from '@/config/constants';
import { RESEARCH_TOOLS } from '@/config/research-tools';
import { UXAuditorForm } from '@/features/ux-auditor/components/UXAuditorForm';
import { UXAuditorHistory } from '@/features/ux-auditor/components/UXAuditorHistory';
import { UXAuditorResults } from '@/features/ux-auditor/components/UXAuditorResults';

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
        border="b"
        paddingBottom={6}
      >
        <Box>
          <PageHeader
            label="Visual UX Auditor"
            title="Multimodal AI Analysis"
            description="Automated visual regression and UX improvement suggestions across viewports."
          />
        </Box>

        <UXAuditorForm
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
        <UXAuditorHistory
          reports={reports}
          activeReport={activeReport}
          setActiveReport={setActiveReport}
        />

        <UXAuditorResults
          activeReport={activeReport}
          copyMarkdown={copyMarkdown}
          isCopiedMarkdown={isCopiedMarkdown}
          exportToGithub={exportToGithub}
          isExportingToGithub={isExportingToGithub}
        />
      </Grid>
    </Stack>
  );
};

export default UXAuditor;
