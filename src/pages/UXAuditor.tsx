import { Icon } from '@/components/ui/Icon';
import { useState, useEffect, useRef, ChangeEvent } from 'react';
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
import { sanitizeUrlForDisplay } from '@/utils/url';

const viewportIcons = {
  Mobile: <Icon icon={Smartphone} size="md" />,
  Tablet: <Icon icon={Tablet} size="md" />,
  Desktop: <Icon icon={Monitor} size="md" />
};

interface AuditInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  helpText?: string;
  isPassword?: boolean;
  onClear?: () => void;
  id?: string;
  name?: string;
}

const AuditInput = ({ label, value, onChange, type = "text", placeholder, helpText, isPassword, onClear, id, name }: AuditInputProps) => (
  <Stack gap={1}>
    <Stack
      direction="row"
      align="center"
      gap={3}
      padding={2}
      className={cardVariants()}
    >
      <Text variant="mono" size="xs" color="muted" paddingLeft={2} uppercase weight="font-bold">{label}</Text>
      <Box
        as="input"
        id={id}
        name={name}
        type={isPassword ? "password" : type}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        onFocus={(e) => e.target.select()}
        className="bg-bg border-none focus:ring-2 focus:ring-accent outline-none font-mono text-text-main truncate text-sm"
        flex={1}
        minWidth={0}
        paddingX={4}
        paddingY={2}
        radius="md"
        placeholder={placeholder}
        autoComplete={isPassword ? "new-password" : "off"}
      />
      {onClear && value && (
        <Box
          as="button"
          onClick={onClear}
          display="flex"
          align="center"
          justify="center"
          padding={2}
          radius="md"
          className="hover:bg-surface-alt text-dim hover:text-error transition-colors"
        >
          <Icon icon={Trash2} size="sm" />
        </Box>
      )}
    </Stack>
    {helpText && (
      <Text variant="sans" size="xs" color={isPassword ? "warning" : "dim"} paddingX={2} weight={isPassword ? "font-medium" : "normal"}>
        {helpText}
      </Text>
    )}
  </Stack>
);

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
      shadow="2xl"
      border={true}
    >
      {isLoading && (
        <Box position="absolute" inset={true} display="flex" align="center" justify="center" zIndex="docked" surface="muted">
          <Stack align="center" gap={3}>
             <Icon icon={RefreshCw} size="md" className="animate-spin text-accent" />
             <Text variant="sans" size="xs" color="muted" weight="font-bold" uppercase tracking="wider">Loading Preview...</Text>
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
        className="border-none bg-white origin-center"
        style={{ // impeccable-ignore - Dynamic scaling for iframe preview
          transform: `scale(${scale})`,
          width: `${width}px`,
          height: `${height}px`,
          minWidth: `${width}px`,
          minHeight: `${height}px`,
          maxWidth: 'none',
          maxHeight: 'none',
        }}
      />
      <Box position="absolute" bottom={4} right={4} maxWidth={48} pointerEvents="none">
         <Box
           paddingX={2}
           paddingY={1}
           radius="sm"
           border={true}
           className="bg-bg/80 backdrop-blur-sm"
         >
           <Text variant="sans" size="xs" color="muted">
             ⚠️ Some sites block embedding via CORS.
           </Text>
         </Box>
      </Box>
    </Box>
  );
}

function ViewportAnalysisCard({ vp, data, activeReportUrl }: { vp: typeof VIEWPORTS[0], data: ViewportAnalysis, activeReportUrl?: string }) {
  return (
    <Box className={cardVariants({ overflow: "hidden" })}>
      <Stack padding={4} border="b" direction="row" align="center" justify="between" surface="muted">
        <Stack direction="row" align="center" gap={3}>
          <Box width={9} height={9} surface="default" radius="md" shadow="sm" color="accent" display="flex" align="center" justify="center" shrink={0}>
            {viewportIcons[vp.name as keyof typeof viewportIcons]}
          </Box>
          <Text variant="sans" size="base" weight="font-bold">
            {vp.name} Analysis
          </Text>
        </Stack>
        <Text variant="mono" size="xs" weight="font-bold" color="muted" uppercase tracking="widest">
          {vp.width}w × {vp.height}h
        </Text>
      </Stack>

      <Stack direction={{ base: 'col', md: 'row' }} width="full">
        <Box padding={8} surface="muted" display="flex" align="center" justify="center" border={{ base: 'b', md: 'r' }} minHeight={400} width={{ base: 'full', md: '41.666%' }}>
          {activeReportUrl ? (
            <ViewportFrame
              key={`${vp.name}-${activeReportUrl}`}
              url={sanitizeUrlForDisplay(activeReportUrl)}
              width={vp.width}
              height={vp.height}
            />
          ) : (
            <Stack align="center" justify="center" color="muted" className="text-center">
              <Box marginBottom={2}>
                <Icon icon={ImageIcon} size="2xl" color="muted" />
              </Box>
              <Text variant="sans" size="xs" weight="font-bold" uppercase tracking="wider">
                Awaiting Frame...
              </Text>
            </Stack>
          )}
        </Box>

        <Stack gap={6} padding={8} flex={1} minWidth={0} overflow="hidden">
          {data ? (
            <>
              <Box surface="alt" padding={5} border={true} radius="lg">
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
                      <Text variant="mono" size="xs" weight="font-black" paddingX={2} paddingY={0.5} radius="full" surface="muted" color="muted" uppercase title={`Severity level: ${imp.severity} out of 10 (1-10 scale)`}>
                        SEV {imp.severity}
                      </Text>
                    </Box>
                    <Text variant="sans" size="xs" color="muted" marginBottom={3}>
                      {imp.issue}
                    </Text>
                    {imp.suggestion && imp.suggestion.trim() !== '' && (
                      <Box surface="muted" padding={3} radius="md" border={true}>
                        <Stack direction={{ base: 'col', sm: 'row' }} align="start" gap={2} minWidth={0}>
                          <Text variant="sans" size="xs" weight="font-black" color="accent" marginTop={0.5} uppercase tracking="widest" className="shrink-0">FIX</Text>
                          <Box flex={1} minWidth={0} overflow="hidden">
                            <Text variant="sans" size="xs" weight="font-bold" className="break-all line-clamp-3" title={imp.suggestion}>
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

        <Stack gap={4} as="form" autoComplete="off" onSubmit={(e) => { e.preventDefault(); if (!isAnalyzing) runUXAudit(url); }}>
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
              title={sanitizeUrlForDisplay(url)}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
              onFocus={(e) => e.target.select()}
              className="bg-bg border-none focus:ring-2 focus:ring-accent outline-none font-mono text-text-main text-sm"
                flex={1}
                minWidth={0}
              paddingX={4}
              paddingY={2}
              radius="md"
              placeholder="https://..."
              aria-label="URL to audit"
            />
            <Box
              as="button"
              onClick={() => { if (!isAnalyzing) runUXAudit(url); }}
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
          <AuditInput
            id="audit-api-key"
            name="audit-api-key"
            label="API KEY"
            value={customApiKey}
            onChange={setCustomApiKey}
            isPassword
            placeholder="OpenAI or Gemini API Key (optional override)"
            onClear={() => setCustomApiKey("")}
            helpText="⚠️ API keys are stored in your browser's session storage. They are cleared when you close the tab. Plain-text storage is not fully secure; use only on trusted devices."
          />

          <AuditInput
            id="audit-snapshot-service"
            name="audit-snapshot-service"
            label="SNAPSHOT SERVICE"
            value={snapshotService}
            onChange={setSnapshotService}
            type="url"
            placeholder="Custom service URL with {url}, {width}, {height} (optional)"
            helpText='Use {"{url}"}, {"{width}"}, and {"{height}"} as placeholders. Example: https://api.service.com?url={"{url}"}&size={"{width}"}x{"{height}"}'
          />
        </Stack>
      </Stack>

      <Grid cols={{ base: 1, lg: 4 }} gap={8}>
        {/* Reports List */}
        <Stack gap={4} span={{ lg: 1 }}>
          <Text variant="sans" size="xs" weight="font-bold" uppercase tracking="widest" color="muted" paddingX={1}>
            Audit History
          </Text>
          <Stack className={cardVariants({ overflow: "hidden" })} border={true}>
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
                width="full" align="center" gap={3} padding={4} border="b"
                className={listRowVariants({ active: activeReport?.id === report.id })}
              >
                <Box
                  width={9}
                  height={9}
                  radius="full"
                  surface={report.status === 'completed' ? 'success' : 'warning'}
                  className={report.status !== 'completed' ? 'animate-pulse' : ''}
                  display="flex"
                  align="center"
                  justify="center"
                  shrink={0}
                >
                  {report.status === 'completed' ? <Icon icon={CheckCircle} size="sm" /> : <Icon icon={RefreshCw} size="sm" />}
                </Box>
                <Box flex={1} minWidth={0}>
                  <Text variant="sans" size="sm" weight="font-bold" display="block" truncate={true} title={sanitizeUrlForDisplay(report.url)}>
                    {report.url.replace('https://', '')}
                  </Text>
                  <Text variant="mono" size="xs" weight="font-medium" color="muted" uppercase>
                    {new Date(report.timestamp).toLocaleTimeString()}
                  </Text>
                </Box>
                <Icon icon={ChevronRight} size="sm" color="muted" />
              </Stack>
            ))}
          </Stack>
        </Stack>

        {/* Detailed View */}
        <Stack gap={6} span={{ lg: 3 }} width="full">
          {activeReport ? (
            <>
              <Stack
                padding={6}
                className={cardVariants()}
                justify="between" align={{ base: "start", md: "center" }} 
                gap={6} direction={{ base: "col", md: "row" }}
                width="full"
              >
                <Stack gap={1} minWidth={0} flex={1}>
                  <Text variant="sans" size="xs" weight="font-bold" color="accent" uppercase tracking="widest" display="block">
                    Current Session
                  </Text>
                  <Text
                    variant="sans"
                    size="xl"
                    weight="font-black"
                    display="block"
                    truncate={true}
                    title={sanitizeUrlForDisplay(activeReport.url)}
                  >
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
                    color="muted"
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
