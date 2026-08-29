import { Icon } from '@/components/ui/Icon';
import { useState, useEffect, ChangeEvent } from 'react';
import {
  Camera, CheckCircle, RefreshCw,
  Smartphone, Monitor, Tablet, Copy, Image as ImageIcon,
  ChevronRight, Github, Trash2, Sliders
} from 'lucide-react';
import { useUXAuditor, VIEWPORTS, ViewportAnalysis, AnalysisFocus, DesignPreset, UXReport } from '@/features/ux-auditor/useUXAuditor';
import { Box, Stack, Grid, Text } from '@/layouts/Primitives';
import { PageHeader } from '@/components/ui/PageHeader';
import { SEO } from '@/components/SEO';
import { BASE_URL } from '@/config/constants';
import { RESEARCH_TOOLS } from '@/config/research-tools';
import { EmptyState } from '@/components/ui/EmptyState';
import { actionButtonVariants, cardVariants, listRowVariants } from '@/lib/variants';
import { sanitizeUrlForDisplay } from '@/utils/url';

const viewportIcons = {
  Mobile: <Icon icon={Smartphone} size="md" />,
  Tablet: <Icon icon={Tablet} size="md" />,
  Desktop: <Icon icon={Monitor} size="md" />,
  Laptop: <Icon icon={Monitor} size="md" />,
  Ultrawide: <Icon icon={Monitor} size="md" />,
};

const ALL_FOCI: AnalysisFocus[] = [
  'Core Layout & Spacing',
  'Accessibility (WCAG)',
  'Typography',
  'Interactive Density',
];

const ALL_PRESETS: DesignPreset[] = [
  'Flat / Minimal',
  'Modern Semi-Flat (Depth/Shadows)',
  'Unrestricted',
];

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
      <Text variant="sans" size="xs" color={isPassword ? "warning" : "muted"} paddingX={2} weight={isPassword ? "font-medium" : "normal"}>
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

interface ViewportFrameProps {
  imageSrc?: string;
  width: number;
  height: number;
  vpName: string;
}

function ViewportFrame({ imageSrc, width, height, vpName }: ViewportFrameProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <Box
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
      padding={2}
    >
      {isLoading && !hasError && imageSrc && (
        <Box position="absolute" inset={true} display="flex" align="center" justify="center" zIndex="docked" surface="muted" role="status" aria-live="polite" aria-busy="true">
          <Stack align="center" gap={3}>
            <Icon icon={RefreshCw} size="md" className="animate-spin text-accent" />
            <Text variant="sans" size="xs" color="muted" weight="font-bold" uppercase tracking="wider">Loading Snapshot...</Text>
          </Stack>
        </Box>
      )}
      {imageSrc && !hasError ? (
        <Box display="flex" align="center" justify="center" width="full" height="full" overflow="auto">
          <img
            src={imageSrc}
            alt={`${vpName} snapshot preview (${width}x${height})`}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
            className="max-w-full max-h-full object-contain rounded-md shadow"
          />
        </Box>
      ) : (
        <Stack align="center" justify="center" color="muted" className="text-center" padding={6}>
          <Icon icon={ImageIcon} size="2xl" color="muted" />
          <Text variant="sans" size="xs" weight="font-bold" uppercase tracking="wider">
            {hasError ? 'Snapshot Error' : 'No Snapshot Available'}
          </Text>
        </Stack>
      )}
    </Box>
  );
}

function SeverityBadge({ severity }: { severity: number }) {
  if (severity >= 4.0) {
    return (
      <Box display="flex" align="center" gap={1} paddingX={2} paddingY={0.5} radius="full" className="bg-error/10 text-error font-mono text-xs font-bold border border-error/30">
        <span>🔴</span>
        <span>SEV {severity.toFixed(1)}</span>
      </Box>
    );
  }
  if (severity >= 3.0) {
    return (
      <Box display="flex" align="center" gap={1} paddingX={2} paddingY={0.5} radius="full" className="bg-warning/10 text-warning font-mono text-xs font-bold border border-warning/30">
        <span>🟡</span>
        <span>SEV {severity.toFixed(1)}</span>
      </Box>
    );
  }
  return (
    <Box display="flex" align="center" gap={1} paddingX={2} paddingY={0.5} radius="full" className="bg-accent/10 text-accent font-mono text-xs font-bold border border-accent/30">
      <span>🔵</span>
      <span>SEV {severity.toFixed(1)}</span>
    </Box>
  );
}

function CondensedReportMatrix({ report }: { report: UXReport }) {
  const [activeTab, setActiveTab] = useState<string>('All');

  const availableViewports = VIEWPORTS.filter(
    vp => report[`findings_${vp.name.toLowerCase()}`] || report[`image_${vp.name.toLowerCase()}`]
  );

  const selectedVp = VIEWPORTS.find(vp => vp.name === activeTab) || availableViewports[0] || VIEWPORTS[0];
  const activeSnapshotSrc = report[`image_${selectedVp.name.toLowerCase()}`] as string | undefined;

  const allItems = VIEWPORTS.flatMap(vp => {
    const data = report[`findings_${vp.name.toLowerCase()}`] as ViewportAnalysis | undefined;
    if (!data?.improvements) return [];
    return data.improvements.map(imp => ({
      ...imp,
      viewportName: vp.name
    }));
  });

  const filteredItems = activeTab === 'All'
    ? allItems
    : allItems.filter(i => i.viewportName === activeTab);

  return (
    <Stack gap={6} width="full">
      {/* Viewport Tabs */}
      <Stack direction="row" align="center" gap={2} overflow="auto" paddingBottom={1} border="b">
        <Box
          as="button"
          onClick={() => setActiveTab('All')}
          paddingX={4}
          paddingY={2}
          radius="md"
          className={`font-sans text-xs font-bold transition-colors ${
            activeTab === 'All'
              ? 'bg-accent text-bg shadow-sm'
              : 'surface-muted text-muted hover:text-text-main'
          }`}
        >
          All Viewports ({allItems.length})
        </Box>
        {availableViewports.map(vp => {
          const count = (report[`findings_${vp.name.toLowerCase()}`] as ViewportAnalysis | undefined)?.improvements?.length || 0;
          return (
            <Box
              key={vp.name}
              as="button"
              onClick={() => setActiveTab(vp.name)}
              display="flex"
              align="center"
              gap={2}
              paddingX={4}
              paddingY={2}
              radius="md"
              className={`font-sans text-xs font-bold transition-colors ${
                activeTab === vp.name
                  ? 'bg-accent text-bg shadow-sm'
                  : 'surface-muted text-muted hover:text-text-main'
              }`}
            >
              {viewportIcons[vp.name as keyof typeof viewportIcons]}
              <span>{vp.name}</span>
              <span className="opacity-75">({count})</span>
            </Box>
          );
        })}
      </Stack>

      {/* Snapshot Preview & Compact Table Matrix */}
      <Grid cols={{ base: 1, xl: 12 }} gap={6}>
        {/* CORS-Free Snapshot Preview Pane */}
        <Box span={{ base: 1, xl: 5 }} minHeight={350}>
          <ViewportFrame
            key={activeSnapshotSrc || selectedVp.name}
            imageSrc={activeSnapshotSrc}
            width={selectedVp.width}
            height={selectedVp.height}
            vpName={selectedVp.name}
          />
        </Box>

        {/* Compact Micro-Matrix Table */}
        <Box span={{ base: 1, xl: 7 }} className={cardVariants({ overflow: 'hidden' })}>
          <Box overflow="auto">
            <Stack gap={0} width="full">
              {/* Header */}
              <Grid cols={12} gap={2} padding={3} border="b" surface="muted">
                <Box span={3}>
                  <Text variant="mono" size="xs" color="dim" uppercase weight="font-bold">Component</Text>
                </Box>
                <Box span={2}>
                  <Text variant="mono" size="xs" color="dim" uppercase weight="font-bold">Viewport</Text>
                </Box>
                <Box span={2}>
                  <Text variant="mono" size="xs" color="dim" uppercase weight="font-bold">Severity</Text>
                </Box>
                <Box span={2}>
                  <Text variant="mono" size="xs" color="dim" uppercase weight="font-bold">Issue</Text>
                </Box>
                <Box span={3}>
                  <Text variant="mono" size="xs" color="dim" uppercase weight="font-bold">Fix</Text>
                </Box>
              </Grid>

              {/* Rows */}
              {filteredItems.length === 0 ? (
                <Box padding={8} display="flex" align="center" justify="center">
                  <Text variant="sans" size="xs" color="dim">
                    No UX findings recorded for this viewport filter.
                  </Text>
                </Box>
              ) : (
                filteredItems.map((item, idx) => (
                  <Grid key={idx} cols={12} gap={2} padding={3} border="b" className="hover:bg-surface-alt/50 transition-colors">
                    <Box span={3}>
                      <Text variant="sans" size="xs" weight="font-bold" color="main">
                        {item.element}
                      </Text>
                    </Box>
                    <Box span={2}>
                      <Text variant="mono" size="xs" color="dim">
                        {item.viewportName}
                      </Text>
                    </Box>
                    <Box span={2}>
                      <SeverityBadge severity={item.severity} />
                    </Box>
                    <Box span={2}>
                      <Text variant="sans" size="xs" color="dim" className="break-words">
                        {item.issue}
                      </Text>
                    </Box>
                    <Box span={3}>
                      <Stack gap={1}>
                        <Text variant="sans" size="xs" weight="font-medium" color="main" className="break-words">
                          {item.suggestion}
                        </Text>
                        {item.element === "Manual Audit Required" && (
                          <CopyPromptButton suggestion={item.suggestion} />
                        )}
                      </Stack>
                    </Box>
                  </Grid>
                ))
              )}
            </Stack>
          </Box>
        </Box>
      </Grid>
    </Stack>
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
    selectedViewports,
    setSelectedViewports,
    selectedFoci,
    setSelectedFoci,
    selectedPreset,
    setSelectedPreset,
    isCopiedMarkdown,
    isExportingToGithub,
    runUXAudit,
    exportToGithub,
    copyMarkdown,
  } = useUXAuditor();

  return (
    <Stack gap={8} width="full" data-testid="ux-auditor-container">
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

        {/* Scoped Configuration Controls & Detailed View */}
        <Stack gap={6} span={{ lg: 3 }} width="full">
          {/* Audit Controls & Options */}
          <Box className={cardVariants()} padding={6}>
            <Stack gap={4}>
              <Stack direction="row" align="center" gap={2} border="b" paddingBottom={3}>
                <Icon icon={Sliders} size="sm" color="accent" />
                <Text variant="sans" size="sm" weight="font-bold" uppercase tracking="wider">
                  Audit Evaluation Scope
                </Text>
              </Stack>

              <Grid cols={{ base: 1, md: 3 }} gap={6}>
                {/* Viewports */}
                <Stack gap={2}>
                  <Text variant="mono" size="xs" color="muted" uppercase weight="font-bold">
                    Viewports
                  </Text>
                  <Stack gap={2}>
                    {VIEWPORTS.map((vp) => {
                      const isSelected = selectedViewports.includes(vp.name);
                      return (
                        <Box
                          key={vp.name}
                          as="label"
                          display="flex"
                          align="center"
                          gap={2}
                          className="cursor-pointer text-xs font-sans font-medium text-text-main"
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {
                              if (isSelected) {
                                if (selectedViewports.length > 1) {
                                  setSelectedViewports(selectedViewports.filter(v => v !== vp.name));
                                }
                              } else {
                                setSelectedViewports([...selectedViewports, vp.name]);
                              }
                            }}
                            className="rounded border-border text-accent focus:ring-accent"
                          />
                          <span>{vp.name} ({vp.width}w × {vp.height}h)</span>
                        </Box>
                      );
                    })}
                  </Stack>
                </Stack>

                {/* Analysis Focus */}
                <Stack gap={2}>
                  <Text variant="mono" size="xs" color="muted" uppercase weight="font-bold">
                    Analysis Focus
                  </Text>
                  <Stack gap={2}>
                    {ALL_FOCI.map((focus) => {
                      const isSelected = selectedFoci.includes(focus);
                      return (
                        <Box
                          key={focus}
                          as="label"
                          display="flex"
                          align="center"
                          gap={2}
                          className="cursor-pointer text-xs font-sans font-medium text-text-main"
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {
                              if (isSelected) {
                                if (selectedFoci.length > 1) {
                                  setSelectedFoci(selectedFoci.filter(f => f !== focus));
                                }
                              } else {
                                setSelectedFoci([...selectedFoci, focus]);
                              }
                            }}
                            className="rounded border-border text-accent focus:ring-accent"
                          />
                          <span>{focus}</span>
                        </Box>
                      );
                    })}
                  </Stack>
                </Stack>

                {/* Design Preset */}
                <Stack gap={2}>
                  <Text variant="mono" size="xs" color="muted" uppercase weight="font-bold">
                    Design System Preset
                  </Text>
                  <Stack gap={2}>
                    {ALL_PRESETS.map((preset) => (
                      <Box
                        key={preset}
                        as="label"
                        display="flex"
                        align="center"
                        gap={2}
                        className="cursor-pointer text-xs font-sans font-medium text-text-main"
                      >
                        <input
                          type="radio"
                          name="design-preset"
                          checked={selectedPreset === preset}
                          onChange={() => setSelectedPreset(preset)}
                          className="border-border text-accent focus:ring-accent"
                        />
                        <span>{preset}</span>
                      </Box>
                    ))}
                  </Stack>
                </Stack>
              </Grid>
            </Stack>
          </Box>

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
                    {isCopiedMarkdown ? 'Copied' : 'Copy MD Matrix'}
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
                    <span className="whitespace-nowrap">{isExportingToGithub ? 'Exporting...' : 'Export Issue'}</span>
                  </Box>
                </Stack>
              </Stack>

              {/* Matrix Table & Snapshot Section */}
              <CondensedReportMatrix report={activeReport} />
            </>
          ) : (
            <EmptyState
              minHeight={400}
              icon={<Icon icon={Camera} size="xl" color="muted" />}
              title="Ready to Audit"
              description="Configure your evaluation scope above and enter a URL to start the CORS-free visual analysis."
            />
          )}
        </Stack>
      </Grid>
    </Stack>
  );
}
