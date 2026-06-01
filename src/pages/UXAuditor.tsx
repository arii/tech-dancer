import { Icon } from '@/components/ui/Icon';
import { useState, useEffect, ChangeEvent } from 'react';
import {
  Camera, CheckCircle, RefreshCw,
  Smartphone, Monitor, Tablet, Copy, Image as ImageIcon,
  ChevronRight, Github, Trash2
} from 'lucide-react';
import { useUXAuditor, VIEWPORTS, ViewportAnalysis } from '@/features/ux-auditor/useUXAuditor';
import { Box, Stack, Grid, Text } from '@/layouts/Primitives';
import { PageHeader } from '@/components/ui/PageHeader';
import { SEO } from '@/components/SEO';
import { BASE_URL } from '@/config/constants';
import { RESEARCH_TOOLS } from '@/config/research-tools';
import { EmptyState } from '@/components/ui/EmptyState';
import { Skeleton } from '@/components/ui/Skeleton';
import { actionButtonVariants, cardVariants, listRowVariants } from '@/lib/variants';

const viewportIcons = {
  Mobile: <Icon icon={Smartphone} size="md" />,
  Tablet: <Icon icon={Tablet} size="md" />,
  Desktop: <Icon icon={Monitor} size="md" />
};


function CopyPromptButton({ suggestion }: { suggestion: string }) {
  const [copied, setCopied] = useState(false);
  const [isCopying, setIsCopying] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => {
      if (document.startViewTransition) {
        document.startViewTransition(() => setCopied(false));
      } else {
        setCopied(false);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    setIsCopying(true);
    try {
      await navigator.clipboard.writeText(suggestion);

      // Artificial slight delay for visual feedback if copy is instant
      await new Promise(resolve => setTimeout(resolve, 400));

      if (document.startViewTransition) {
        document.startViewTransition(() => {
          setCopied(true);
        });
      } else {
        setCopied(true);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    } finally {
      setIsCopying(false);
    }
  };

  return (
    <Box
      as="button"
      onClick={handleCopy}
      disabled={isCopying}
      marginTop={2}
      display="flex"
      align="center"
      gap={1}
      paddingX={3}
      paddingY={1}
      radius="md"
      surface="default"
      border={true}
      className="hover:border-accent transition-colors hover:text-accent font-bold text-xs"
    >
      {isCopying ? (
        <Icon icon={RefreshCw} size="xs" className="animate-spin" />
      ) : copied ? (
        <Icon icon={CheckCircle} size="xs" color="accent" />
      ) : (
        <Icon icon={Copy} size="xs" />
      )}
      <span>{isCopying ? 'Copying...' : copied ? 'Copied!' : 'Copy Prompt'}</span>
    </Box>
  );
}

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
        title="Playwright Visual QA & UX Auditor | Perception Telemetry System"
        description="Run automated visual UX audits on any URL using multimodal AI. Identify usability issues and get improvement suggestions for Mobile, Tablet, and Desktop."
        canonical={`${BASE_URL}${toolConfig?.canonicalPath || '/ux-auditor'}`}
      />
      <Stack
        direction={{ base: 'col', md: 'row' }}
        align={{ base: 'start', md: 'center' }}
        justify="between"
        gap={6}
        border="b" paddingBottom={6}
      >
        <Box>
          <PageHeader
            label="PORTFOLIO"
            title="Playwright Visual QA & UX Auditor"
            description="Automated visual regression and UX improvement suggestions across viewports."
          />
        </Box>

        <Stack gap={4}>
          <Stack
            direction="row"
            align="center"
            gap={3}
            padding={2}
            className={cardVariants()}
          >
            <Box
              as="input"
              type="text"
              value={url}
              title={url}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
              className="bg-bg border-none focus:ring-2 focus:ring-accent outline-none font-mono text-text-main truncate text-sm"
              width={{ base: "full", sm: 64, md: 80 }}
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
              className="bg-accent hover:opacity-90 text-bg font-bold transition-all disabled:opacity-50"
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
                type="password"
                value={customApiKey}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setCustomApiKey(e.target.value)}
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
              type="text"
              value={snapshotService}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSnapshotService(e.target.value)}
              className="bg-bg border-none focus:ring-2 focus:ring-accent outline-none font-mono text-text-main truncate text-sm"
              flex={1}
              paddingX={4}
              paddingY={2}
              radius="lg"
              placeholder="Custom service URL with {url}, {width}, {height} (optional)"
              aria-label="Snapshot Service URL"
            />
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
        <Stack gap={6} span={{ lg: 3 }} minWidth={0}>
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
                <Stack direction="row" gap={3} shrink={0}>
                  <Box
                    as="button"
                    onClick={copyMarkdown}
                    display="flex"
                    align="center"
                    gap={2}
                    className={actionButtonVariants({ variant: "default" })}
                    surface="muted" 
                    color="dim"
                    paddingX={4}
                    paddingY={2}
                    radius="xl"
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
                    gap={2}
                    className={actionButtonVariants({ variant: "primary" })}
                    paddingX={6}
                    paddingY={2}
                    radius="xl"
                  >
                    {isExportingToGithub ? <Icon icon={RefreshCw} size="sm" className="animate-spin" /> : <Icon icon={Github} size="sm" />}
                    <span className="whitespace-nowrap">{isExportingToGithub ? 'Exporting...' : 'Export to GitHub Issue'}</span>
                  </Box>
                </Stack>
              </Stack>

              <Stack gap={8}>
                {VIEWPORTS.map(vp => {
                  const data = activeReport[`findings_${vp.name.toLowerCase()}`] as ViewportAnalysis;
                  const imgUrl = activeReport[`image_${vp.name.toLowerCase()}`];

                  return (
                    <Box key={vp.name} className={cardVariants({ overflow: "hidden" })}>
                      <Stack padding={4} border="b" direction="row" align="center" justify="between" surface="muted">
                        <Stack direction="row" align="center" gap={3}>
                          <Box width={9} height={9} surface="default" radius="lg" shadow="sm" color="accent" display="flex" align="center" justify="center" shrink={0}>
                            {viewportIcons[vp.name as keyof typeof viewportIcons]}
                          </Box>
                          <Text variant="sans" size="base" weight="font-bold">
                            {vp.name} Analysis
                          </Text>
                        </Stack>
                        <Text variant="mono" size="xs" weight="font-bold" color="dim" uppercase tracking="widest">
                          {vp.width}w × {vp.height}h
                        </Text>
                      </Stack>

                      <Stack direction={{ base: 'col', md: 'row' }} width="full">
                        <Box padding={8} surface="muted" display="flex" align="center" justify="center" border={{ base: 'b', md: 'r' }} minHeight={400} width={{ base: 'full', md: '41.666%' }}>
                          {imgUrl ? (
                            <img
                              src={imgUrl}
                              alt={`${vp.name} snapshot`}
                              loading="lazy"
                              data-testid="ux-analysis-snapshot"
                              className="w-full h-auto rounded-xl shadow-2xl border border-surface object-contain bg-surface max-h-96"
                              onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/${vp.width}x${vp.height}/e2e8f0/64748b?text=Snapshot+Unavailable`; }}
                            />
                          ) : (
                            <Stack align="center" justify="center" color="dim" className="text-center">
                              <Box marginBottom={2}>
                                <Icon icon={ImageIcon} size="2xl" color="muted" />
                              </Box>
                              <Text variant="sans" size="xs" weight="font-bold" uppercase tracking="wider">
                                Awaiting Frame...
                              </Text>
                            </Stack>
                          )}
                        </Box>

                        <Stack gap={6} padding={8} flex={1} minWidth="0" overflow="hidden">
                          {data ? (
                            <>
                              <Box surface="alt" padding={5} className="border border-line rounded-lg">
                                <Box marginBottom={3}>
                                  <Text variant="sans" size="xs" weight="font-black" color="accent" uppercase display="block" tracking="widest">
                                    Analysis Summary
                                  </Text>
                                </Box>
                                <Text variant="sans" size="sm" weight="font-medium" className="leading-relaxed break-words block">
                                  "{data.summary}"
                                </Text>
                              </Box>
                              <Stack gap={4}>
                                {data.improvements?.map((imp, idx) => (
                                  <Box key={idx} padding={4} className={cardVariants({ interactive: true })}>
                                    <Box display="flex" justify="between" align="start" marginBottom={2}>
                                      <Stack direction="row" align="center" gap={2}>
                                        <Box width={2} height={2} radius="full" className={imp.severity > 7 ? 'bg-error shadow-sm' : 'bg-accent-purple shadow-sm'} />
                                        <Text variant="sans" size="sm" weight="font-black">
                                          {imp.element}
                                        </Text>
                                      </Stack>
                                      <Text variant="mono" size="xs" weight="font-black" paddingX={2} paddingY={0.5} radius="full" surface="muted" color="dim" uppercase title={`Severity level: ${imp.severity} out of 10 (1-10 scale)`}>
                                        SEV {imp.severity}
                                      </Text>
                                    </Box>
                                    <Text variant="sans" size="xs" color="dim" marginBottom={3}>
                                      {imp.issue}
                                    </Text>
                                    {imp.suggestion && imp.suggestion.trim() !== '' && (
                            <Box surface="muted" padding={3} radius="lg" border={true}>
                              <Stack direction={{ base: 'col', sm: 'row' }} align="start" gap={2}>
                                <Text variant="sans" size="xs" weight="font-black" color="accent" marginTop={0.5} uppercase tracking="widest" className="shrink-0">FIX</Text>
                                        <Box flex={1} minWidth="0">
                                          <Text variant="sans" size="xs" weight="font-bold" className="break-words whitespace-pre-wrap line-clamp-4">
                                            {imp.suggestion}
                                          </Text>
                                          {imp.element === "Manual Audit Required" && (
                                            <CopyPromptButton suggestion={imp.suggestion} />
                                          )}
                                        </Box>
                              </Stack>
                            </Box>
                                    )}
                                  </Box>
                                ))}
                              </Stack>
                            </>
                          ) : (
                            <Stack gap={4} width="full">
                              <Skeleton height={20} width="full" />
                              <Stack gap={2}>
                                <Skeleton height={4} width="full" />
                                <Skeleton height={4} width="full" />
                                <Skeleton height={4} width="3/4" />
                              </Stack>
                            </Stack>
                          )}
                        </Stack>
                      </Stack>
                    </Box>
                  );
                })}
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
