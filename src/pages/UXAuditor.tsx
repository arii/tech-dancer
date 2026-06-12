import { Icon } from '@/components/ui/Icon';
import { useState, useEffect, useRef, ChangeEvent } from 'react';
import {
  Camera, CheckCircle, RefreshCw,
  Smartphone, Monitor, Tablet, Copy, Image as ImageIcon,
  ChevronRight, Github, Trash2, Globe, Key, Settings
} from 'lucide-react';
import { useUXAuditor, VIEWPORTS, ViewportAnalysis } from '@/features/ux-auditor/useUXAuditor';
import { Box, Stack, Grid, Text, Button } from '@/layouts/Primitives';
import { PageHeader } from '@/components/ui/PageHeader';
import { SEO } from '@/components/SEO';
import { BASE_URL } from '@/config/constants';
import { RESEARCH_TOOLS } from '@/config/research-tools';
import { EmptyState } from '@/components/ui/EmptyState';
import { Skeleton } from '@/components/ui/Skeleton';
import { cardVariants, listRowVariants } from '@/lib/variants';

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
    <Button
      onClick={handleCopy}
      disabled={isCopying}
      variant="professional"
      size="sm"
      marginTop={2}
      radius="md"
      surface="default"
      border={true}
      className="tap-target"
    >
      {isCopying ? (
        <Icon icon={RefreshCw} size="xs" className="animate-spin" />
      ) : copied ? (
        <Icon icon={CheckCircle} size="xs" color="accent" />
      ) : (
        <Icon icon={Copy} size="xs" />
      )}
      <Text variant="sans" size="xs" weight="font-bold">
        {isCopying ? 'Copying...' : copied ? 'Copied!' : 'Copy Prompt'}
      </Text>
    </Button>
  );
}

function ViewportFrame({ url, width, height }: { url: string; width: number; height: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const containerHeight = containerRef.current.offsetHeight;
        const scaleX = containerWidth / width;
        const scaleY = containerHeight / height;
        setScale(Math.min(scaleX, scaleY, 1));
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [width, height]);

  return (
    <Box
      ref={containerRef}
      width="full"
      height="full"
      display="flex"
      align="center"
      justify="center"
      overflow="hidden"
      position="relative"
      surface="default"
      radius="xl"
      shadow="standard"
      border={true}
    >
      {isLoading && (
        <Box position="absolute" inset={true} display="flex" align="center" justify="center" zIndex="docked" surface="muted">
          <Stack align="center" gap={3}>
             <Icon icon={RefreshCw} size="md" className="animate-spin text-accent" />
             <Text variant="sans" size="xs" color="dim" weight="font-bold" uppercase tracking="wider">Loading Preview...</Text>
          </Stack>
        </Box>
      )}
      <Box
        as="iframe"
        src={url}
        title="Viewport Preview"
        onLoad={() => setIsLoading(false)}
        width={width}
        height={height}
        border={false}
        surface="default"
        className="origin-center"
        style={{ // impeccable-ignore - Dynamic scaling for iframe preview
          transform: `scale(${scale})`,
          width: `${width}px`,
          height: `${height}px`,
          minWidth: `${width}px`,
          minHeight: `${height}px`,
          backgroundColor: '#fff' // impeccable-ignore
        }}
      />
      <Box position="absolute" bottom={4} right={4} maxWidth="[12rem]" pointerEvents="none">
         <Box
           paddingX={2}
           paddingY={1}
           radius="sm"
           border={true}
           surface="bg"
           opacity="heavy"
           className="backdrop-blur-sm"
         >
           <Text variant="sans" size="xs" color="dim" textAlign="left">
             ⚠️ Some sites block embedding via CORS.
           </Text>
         </Box>
      </Box>
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
        title="Visual UX Auditor | Perception Telemetry System"
        description="Run automated visual UX audits on any URL using multimodal AI. Identify usability issues and get improvement suggestions for Mobile, Tablet, and Desktop."
        canonical={`${BASE_URL}${toolConfig?.canonicalPath || '/ux-auditor'}`}
      />
      <Box border="b" paddingBottom={8}>
        <PageHeader
          label="Visual UX Auditor"
          title="Multimodal AI Analysis"
          description="Automated visual regression and UX improvement suggestions across viewports."
          paddingBottom={8}
          border={false}
        />

        <Box padding={6} radius="lg" surface="card" border={true}>
          <Grid cols={{ base: 1, lg: 12 }} gap={6} align="end">
            <Stack gap={2} span={{ lg: 4 }}>
              <Stack direction="row" align="center" gap={2} paddingLeft={1}>
                <Icon icon={Globe} size="xs" color="accent" />
                <Text variant="sans" size="xs" weight="font-black" color="dim" uppercase tracking="widest">
                  URL
                </Text>
              </Stack>
              <Box
                as="input"
                type="url"
                autoComplete="off"
                value={url}
                title={url}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
                onFocus={(e) => e.target.select()}
                surface="bg"
                border={true}
                width="full"
                paddingX={4}
                paddingY={3}
                radius="md"
                placeholder="https://example.com"
                aria-label="URL to audit"
                className="focus:border-accent focus:ring-1 focus:ring-accent outline-none font-mono text-text-main text-sm transition-all"
              />
            </Stack>

            <Stack gap={2} span={{ lg: 3 }}>
              <Stack direction="row" align="center" gap={2} paddingLeft={1}>
                <Icon icon={Key} size="xs" color="dim" />
                <Text variant="sans" size="xs" weight="font-black" color="dim" uppercase tracking="widest">
                  API Key
                </Text>
              </Stack>
              <Box position="relative">
                <Box
                  as="input"
                  type="password"
                  autoComplete="new-password"
                  value={customApiKey}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setCustomApiKey(e.target.value)}
                  surface="bg"
                  border={true}
                  width="full"
                  paddingX={4}
                  paddingRight={12}
                  paddingY={3}
                  radius="md"
                  placeholder="sk-..."
                  aria-label="API Key"
                  className="focus:border-accent focus:ring-1 focus:ring-accent outline-none font-mono text-text-main text-sm transition-all"
                />
                {customApiKey && (
                  <Box
                    as="button"
                    onClick={() => setCustomApiKey("")}
                    position="absolute"
                    right={0}
                    top="1/2"
                    display="flex"
                    align="center"
                    justify="center"
                    radius="md"
                    title="Clear API Key"
                    className="-translate-y-1/2 hover:text-error text-text-dim transition-colors tap-target"
                    paddingX={3}
                  >
                    <Icon icon={Trash2} size="xs" />
                  </Box>
                )}
              </Box>
            </Stack>

            <Stack gap={2} span={{ lg: 3 }}>
              <Stack direction="row" align="center" gap={2} paddingLeft={1}>
                <Icon icon={Settings} size="xs" color="dim" />
                <Text variant="sans" size="xs" weight="font-black" color="dim" uppercase tracking="widest">
                  Snapshot Service
                </Text>
              </Stack>
              <Box
                as="input"
                type="url"
                autoComplete="off"
                value={snapshotService}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSnapshotService(e.target.value)}
                surface="bg"
                border={true}
                width="full"
                paddingX={4}
                paddingY={3}
                radius="md"
                placeholder="Service URL..."
                aria-label="Snapshot Service URL"
                className="focus:border-accent focus:ring-1 focus:ring-accent outline-none font-mono text-text-main text-sm transition-all"
              />
            </Stack>

            <Box span={{ lg: 2 }}>
              <Button
                onClick={() => runUXAudit(url)}
                disabled={isAnalyzing || !url}
                variant="primary"
                fullWidth
                size="lg"
              >
                {isAnalyzing ? <Icon icon={RefreshCw} size="sm" className="animate-spin" /> : <Icon icon={Camera} size="sm" />}
                {isAnalyzing ? 'Auditing...' : 'Start Audit'}
              </Button>
            </Box>
          </Grid>

          {customApiKey && (
            <Box marginTop={4} paddingX={1}>
              <Text variant="sans" size="xs" color="warning" weight="font-medium">
                ⚠️ API keys are stored in session storage and cleared on tab close. Use only on trusted devices.
              </Text>
            </Box>
          )}
        </Box>
      </Box>

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
                width="full"
                align="center"
                gap={4}
                padding={4}
                className={listRowVariants({ active: activeReport?.id === report.id })}
              >
                <Box
                  radius="md"
                  surface={report.status === 'completed' ? 'success' : 'warning'}
                  opacity={report.status !== 'completed' ? 'subtle' : 'full'}
                  display="flex"
                  align="center"
                  justify="center"
                  shrink={0}
                  padding={2}
                  className={report.status !== 'completed' ? 'animate-pulse' : ''}
                >
                  {report.status === 'completed' ? <Icon icon={CheckCircle} size="sm" /> : <Icon icon={RefreshCw} size="sm" />}
                </Box>
                <Box flex={1} minWidth={0} textAlign="left">
                  <Text variant="sans" size="sm" weight="font-bold" display="block" truncate={true}>
                    {report.url.replace('https://', '')}
                  </Text>
                  <Text variant="mono" size="xs" weight="font-medium" color="dim" uppercase={true}>
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
                <Stack gap={1} minWidth="0" flex={1} textAlign="left">
                  <Text variant="sans" size="xs" weight="font-bold" color="accent" uppercase={true} tracking="widest" display="block">
                    Current Session
                  </Text>
                  <Text variant="sans" size="xl" weight="font-black" display="block" truncate={true} title={activeReport.url}>
                    {activeReport.url}
                  </Text>
                </Stack>
                <Stack direction="row" gap={3} shrink={0}>
                  <Button
                    onClick={copyMarkdown}
                    variant="professional"
                    surface="muted"
                    size="sm"
                    radius="md"
                    gap={2}
                  >
                    {isCopiedMarkdown ? <Icon icon={CheckCircle} size="sm" /> : <Icon icon={Copy} size="sm" />}
                    {isCopiedMarkdown ? 'Copied' : 'Copy MD'}
                  </Button>
                  <Button
                    onClick={exportToGithub}
                    disabled={activeReport.status !== 'completed' || isExportingToGithub}
                    variant="primary"
                    size="sm"
                    radius="md"
                    gap={2}
                  >
                    {isExportingToGithub ? <Icon icon={RefreshCw} size="sm" className="animate-spin" /> : <Icon icon={Github} size="sm" />}
                    <Text variant="sans" size="sm" weight="font-bold" whiteSpace="nowrap">
                      {isExportingToGithub ? 'Exporting...' : 'Export to GitHub Issue'}
                    </Text>
                  </Button>
                </Stack>
              </Stack>

              <Stack gap={8}>
                {VIEWPORTS.map(vp => {
                  const data = activeReport[`findings_${vp.name.toLowerCase()}`] as ViewportAnalysis;

                  return (
                    <Box key={vp.name} className={cardVariants({ overflow: "hidden" })}>
                      <Stack padding={4} border="b" direction="row" align="center" justify="between" surface="muted">
                        <Stack direction="row" align="center" gap={3}>
                          <Box width={9} height={9} surface="default" radius="lg" shadow="standard" color="accent" display="flex" align="center" justify="center" shrink={0} aria-hidden="true">
                            {viewportIcons[vp.name as keyof typeof viewportIcons]}
                          </Box>
                          <Text variant="sans" size="base" weight="font-bold" textAlign="left">
                            {vp.name} Viewport Analysis
                          </Text>
                        </Stack>
                        <Text variant="mono" size="xs" weight="font-bold" color="dim" uppercase tracking="widest">
                          {vp.width}w × {vp.height}h
                        </Text>
                      </Stack>

                      <Stack direction={{ base: 'col', md: 'row' }} width="full">
                        <Box padding={8} surface="muted" display="flex" align="center" justify="center" border={{ base: 'b', md: 'r' }} minHeight={400} width={{ base: 'full', md: '[41.666%]' }}>
                          {activeReport.url ? (
                            <ViewportFrame
                              key={`${vp.name}-${activeReport.url}`}
                              url={activeReport.url}
                              width={vp.width}
                              height={vp.height}
                            />
                          ) : (
                            <Stack align="center" justify="center" textAlign="center">
                              <Box marginBottom={2}>
                                <Icon icon={ImageIcon} size="xl" color="muted" />
                              </Box>
                              <Text variant="sans" size="xs" weight="font-bold" color="dim" uppercase tracking="wider">
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
                                  <Text variant="sans" size="xs" weight="font-black" color="accent" uppercase={true} display="block" tracking="widest" textAlign="left">
                                    Analysis Summary
                                  </Text>
                                </Box>
                                <Text variant="sans" size="sm" weight="font-medium" leading="relaxed" display="block" breakWords={true} textAlign="left">
                                  "{data.summary}"
                                </Text>
                              </Box>
                              <Stack gap={4}>
                                {data.improvements?.map((imp, idx) => (
                                  <Box key={idx} padding={4} className={cardVariants({ interactive: true })}>
                                    <Box display="flex" justify="between" align="start" marginBottom={2}>
                                      <Stack direction="row" align="center" gap={2}>
                                        <Box
                                          width={2}
                                          height={2}
                                          radius="full"
                                          shadow="standard"
                                          surface={imp.severity > 7 ? 'error' : 'warning'}
                                        />
                                        <Text variant="sans" size="sm" weight="font-black" textAlign="left">
                                          {imp.element}
                                        </Text>
                                      </Stack>
                                      <Text variant="mono" size="xs" weight="font-black" paddingX={3} paddingY={1} radius="full" surface="muted" color="dim" uppercase={true} textAlign="right" minWidth={16} title={`Severity level: ${imp.severity} out of 10 (1-10 scale)`}>
                                        SEV {imp.severity}
                                      </Text>
                                    </Box>
                                    <Text variant="sans" size="xs" color="dim" marginBottom={3} textAlign="left" display="block">
                                      {imp.issue}
                                    </Text>
                                    {imp.suggestion && imp.suggestion.trim() !== '' && (
                                      <Box surface="muted" padding={3} radius="lg" border={true}>
                                        <Stack direction={{ base: 'col', sm: 'row' }} align="start" gap={2}>
                                          <Text variant="sans" size="xs" weight="font-black" color="accent" marginTop={0.5} uppercase={true} tracking="widest" shrink={0}>FIX</Text>
                                          <Box flex={1} minWidth={0} textAlign="left">
                                            <Text variant="sans" size="xs" weight="font-bold" display="block" breakWords={true} whiteSpace="pre-wrap" clamp={4}>
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
