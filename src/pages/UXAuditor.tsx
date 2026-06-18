import { Icon } from '@/components/ui/Icon';
import { ChangeEvent } from 'react';
import {
  Camera, CheckCircle, RefreshCw, Copy, ChevronRight, Github, Trash2
} from 'lucide-react';
import { useUXAuditor, VIEWPORTS, ViewportAnalysis } from '@/features/ux-auditor/useUXAuditor';
import { Box, Stack, Grid, Text } from '@/layouts/Primitives';
import { PageHeader } from '@/components/ui/PageHeader';
import { SEO } from '@/components/SEO';
import { BASE_URL } from '@/config/constants';
import { RESEARCH_TOOLS } from '@/config/research-tools';
import { EmptyState } from '@/components/ui/EmptyState';
import { actionButtonVariants, cardVariants, listRowVariants } from '@/lib/variants';
import { ViewportAnalysisCard } from '@/features/ux-auditor/components/ViewportAnalysisCard';

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
          />
        </Box>

        <Stack gap={4} as="form" autoComplete="off" onSubmit={(e) => { e.preventDefault(); runUXAudit(url); }}>
          <Stack
            direction="row"
            align="center"
            gap={3}
            padding={2}
            className={cardVariants()}
          >
            <Box
              as="input"
              id="audit-url"
              name="audit-url"
              type="url"
              autoComplete="off"
              value={url}
              title={url}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
              onFocus={(e) => e.target.select()}
              className="bg-bg border-none focus:ring-2 focus:ring-accent outline-none font-mono text-text-main text-sm"
                flex={1}
                minWidth={0}
              paddingX={4}
              paddingY={2}
              radius="lg"
              placeholder="https://..."
              aria-label="URL to audit"
            />
            <Box
              as="button"
              onClick={() => runUXAudit(url)}
              disabled={isAnalyzing}
              display="flex"
              align="center"
              gap={2}
              className="bg-accent hover:opacity-solid text-bg font-bold transition-all disabled:opacity-muted"
              paddingX={6}
              paddingY={2}
              radius="md"
            >
              {isAnalyzing ? <Icon icon={RefreshCw} size="sm" className="animate-spin" /> : <Icon icon={Camera} size="sm" />}
              {isAnalyzing ? 'Auditing...' : 'Start Audit'}
            </Box>
          </Stack>
          <Stack gap={2}>
            <Stack
              direction="row"
              align="center"
              gap={3}
              padding={2}
              className={cardVariants()}
            >
              <Text variant="mono" size="xs" color="dim" paddingLeft={2} uppercase weight="font-bold">API KEY</Text>
              <Box
                as="input"
              id="audit-api-key"
              name="audit-api-key"
                type="password"
              autoComplete="new-password"
                value={customApiKey}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setCustomApiKey(e.target.value)}
                onFocus={(e) => e.target.select()}
                className="bg-bg border-none focus:ring-2 focus:ring-accent outline-none font-mono text-text-main truncate text-sm"
                flex={1}
                paddingX={4}
                paddingY={2}
                radius="lg"
                placeholder="OpenAI or Gemini API Key (optional override)"
                aria-label="API Key"
              />
              {customApiKey && (
                <Box
                  as="button"
                  onClick={() => setCustomApiKey("")}
                  display="flex"
                  align="center"
                  justify="center"
                  padding={2}
                  radius="md"
                  className="hover:bg-surface-alt text-dim hover:text-error transition-colors"
                  title="Clear API Key"
                >
                  <Icon icon={Trash2} size="sm" />
                </Box>
              )}
            </Stack>
            <Text variant="sans" size="xs" color="warning" paddingX={2} weight="font-medium">
              ⚠️ API keys are stored in your browser's session storage. They are cleared when you close the tab. Plain-text storage is not fully secure; use only on trusted devices.
            </Text>
          </Stack>
          <Stack gap={1}>
            <Stack
              direction="row"
              align="center"
              gap={3}
              padding={2}
              className={cardVariants()}
            >
              <Text variant="mono" size="xs" color="dim" paddingLeft={2} uppercase weight="font-bold">SNAPSHOT SERVICE</Text>
              <Box
                as="input"
                id="audit-snapshot-url"
                name="audit-snapshot-url"
                type="url"
                autoComplete="off"
                value={snapshotService}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSnapshotService(e.target.value)}
                onFocus={(e) => e.target.select()}
                className="bg-bg border-none focus:ring-2 focus:ring-accent outline-none font-mono text-text-main truncate text-sm"
                flex={1}
                paddingX={4}
                paddingY={2}
                radius="lg"
                placeholder="Custom service URL with {url}, {width}, {height} (optional)"
                aria-label="Snapshot Service URL"
              />
            </Stack>
            <Text variant="sans" size="xs" color="dim" paddingX={2} marginTop={1}>
              Use {"{url}"}, {"{width}"}, and {"{height}"} as placeholders. Example: https://api.service.com?url={"{url}"}&size={"{width}"}x{"{height}"}
            </Text>
          </Stack>
        </Stack>
      </Stack>

      <Grid cols={{ base: 1, lg: 4 }} gap={8}>
        {/* Reports List */}
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

        {/* Detailed View */}
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
}
