import React, { useState } from 'react';
import type { ChangeEvent } from 'react';
import {
  Camera, CheckCircle, RefreshCw,
  Smartphone, Monitor, Tablet, Copy, Image as ImageIcon,
  ChevronRight, Github
} from 'lucide-react';
import { useUXAuditor, VIEWPORTS, ViewportAnalysis } from '@/features/ux-auditor/useUXAuditor';
import { Box, Stack, Grid, Text } from '@/layouts/Primitives';
import { PageHeader } from '@/components/ui/PageHeader';

const viewportIcons = {
  Mobile: <Smartphone className="w-5 h-5" />,
  Tablet: <Tablet className="w-5 h-5" />,
  Desktop: <Monitor className="w-5 h-5" />
};


function CopyPromptButton({ suggestion }: { suggestion: string }) {
  const [copied, setCopied] = useState(false);
  const [isCopying, setIsCopying] = useState(false);

  React.useEffect(() => {
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
        <RefreshCw className="w-3 h-3 animate-spin" />
      ) : copied ? (
        <CheckCircle className="w-3 h-3 text-emerald-500" />
      ) : (
        <Copy className="w-3 h-3" />
      )}
      <span>{isCopying ? 'Copying...' : copied ? 'Copied!' : 'Copy Prompt'}</span>
    </Box>
  );
}

export default function UXAuditor() {
  const {
    reports,
    isAnalyzing,
    activeReport,
    setActiveReport,
    url,
    setUrl,
    isCopiedMarkdown,
    isExportingToGithub,
    runUXAudit,
    exportToGithub,
    copyMarkdown,
  } = useUXAuditor();

  return (
    <Stack gap={8} width="full">
      <Stack
        direction={{ base: 'col', md: 'row' }}
        align={{ base: 'start', md: 'center' }}
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

        <Stack
          direction="row"
          align="center"
          gap={3}
          surface="default" padding={2} radius="xl" shadow="sm" border={true}
        >
          <Box
            as="input"
            type="text"
            value={url}
            title={url}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
            className="bg-bg border-none focus:ring-2 focus:ring-accent outline-none font-mono text-text-main truncate text-sm"
            width={64}
            paddingX={4}
            paddingY={2}
            radius="lg"
            placeholder="https://..."
            aria-label="URL to audit"
          />
          <Box
            as="button"
            onClick={runUXAudit}
            disabled={isAnalyzing}
            display="flex"
            align="center"
            gap={2}
            className="bg-accent hover:opacity-90 text-white font-bold transition-all disabled:opacity-50"
            paddingX={6}
            paddingY={2}
            radius="md"
          >
            {isAnalyzing ? <RefreshCw className="animate-spin w-4 h-4" /> : <Camera className="w-4 h-4" />}
            {isAnalyzing ? 'Auditing...' : 'Start Audit'}
          </Box>
        </Stack>
      </Stack>

      <Grid cols={{ base: 1, lg: 4 }} gap={8}>
        {/* Reports List */}
        <Stack gap={4} span={{ lg: 1 }}>
          <Text variant="sans" size="xs" weight="font-bold" uppercase tracking="widest" color="dim" paddingX={1}>
            Audit History
          </Text>
          <Stack surface="default" radius="2xl" shadow="sm" border={true} overflow="hidden" className="divide-y divide-line">
            {reports.length === 0 && (
              <Box padding={10} align="center">
                <Text color="dim" size="sm" className="italic">No audits recorded.</Text>
              </Box>
            )}
            {reports.map((report) => (
              <Box
                key={report.id}
                as="button"
                onClick={() => setActiveReport(report)}
                width="full" display="flex" align="center" gap={3} padding={4} className={`text-left hover:bg-surface transition-all ${
                  activeReport?.id === report.id ? 'bg-bg border-l-4 border-accent' : 'border-l-4 border-transparent'
                }`}
              >
                <Box
                  padding={2}
                  radius="full"
                  surface={report.status === 'completed' ? 'success' : 'warning'}
                  className={report.status !== 'completed' ? 'animate-pulse' : ''}
                >
                  {report.status === 'completed' ? <CheckCircle className="w-4 h-4" /> : <RefreshCw className="w-4 h-4" />}
                </Box>
                <Box flex={1} minWidth="0">
                  <Text variant="sans" size="sm" weight="font-bold" className="truncate">
                    {report.url.replace('https://', '')}
                  </Text>
                  <Text variant="mono" size="xs" weight="font-medium" color="dim" uppercase>
                    {new Date(report.timestamp).toLocaleTimeString()}
                  </Text>
                </Box>
                <Text color="dim">
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </Text>
              </Box>
            ))}
          </Stack>
        </Stack>

        {/* Detailed View */}
        <Stack gap={6} span={{ lg: 3 }}>
          {activeReport ? (
            <>
              <Box
                surface="default" padding={6} radius="2xl" shadow="sm" border={true} display="flex" justify="between" align={{ base: "start", md: "center" }} gap={4} direction={{ base: "col", md: "row" }}
              >
                <Stack gap={1} marginBottom={{ base: 4, md: 0 }} minWidth="0" flex={1}>
                  <Text variant="sans" size="xs" weight="font-bold" color="accent" uppercase tracking="widest" display="block">
                    Current Session
                  </Text>
                  <Text variant="sans" size="xl" weight="font-black" className="truncate block" title={activeReport.url}>
                    {activeReport.url}
                  </Text>
                </Stack>
                <Box display="flex" gap={2}>
                  <Text
                    as="button"
                    onClick={copyMarkdown}
                    display="flex"
                    align="center"
                    gap={2}
                    className="font-bold hover:text-text-main transition-all text-sm" surface="muted"
                    color="dim"
                    paddingX={4}
                    paddingY={2}
                    radius="xl"
                  >
                    {isCopiedMarkdown ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {isCopiedMarkdown ? 'Copied' : 'Copy MD'}
                  </Box>
                  <Box
                    as="button"
                    onClick={exportToGithub}
                    disabled={activeReport.status !== 'completed' || isExportingToGithub}
                    display="flex"
                    align="center"
                    gap={2}
                    className="font-bold bg-accent text-white hover:opacity-90 shadow-md transition-all disabled:opacity-50 text-sm"
                    paddingX={6}
                    paddingY={2}
                    radius="xl"
                  >
                    {isExportingToGithub ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Github className="w-4 h-4" />}
                    <span className="whitespace-nowrap">{isExportingToGithub ? 'Exporting...' : 'Export to GitHub Issue'}</span>
                  </Box>
                </Box>
              </Box>

              <Stack gap={8}>
                {VIEWPORTS.map(vp => {
                  const data = activeReport[`findings_${vp.name.toLowerCase()}`] as ViewportAnalysis;
                  const imgUrl = activeReport[`image_${vp.name.toLowerCase()}`];

                  return (
                    <Box key={vp.name} surface="default" radius="2xl" shadow="sm" border={true} overflow="hidden">
                      <Box padding={4} border="b" display="flex" align="center" justify="between" surface="muted">
                        <Box display="flex" align="center" gap={3}>
                          <Box padding={2} surface="default" radius="lg" shadow="sm">
                            <Text color="accent">
                              {viewportIcons[vp.name as keyof typeof viewportIcons]}
                            </Text>
                          </Box>
                          <Text variant="sans" size="base" weight="font-bold">
                            {vp.name} Analysis
                          </Text>
                        </Box>
                        <Text variant="mono" size="xs" weight="font-bold" color="dim" uppercase tracking="widest">
                          {vp.width}w × {vp.height}h
                        </Text>
                      </Box>

                      <Stack direction={{ base: 'col', md: 'row' }} width="full">
                        <Box padding={8} surface="muted" display="flex" align="center" justify="center" border={{ base: 'b', md: 'r' }} minHeight={400} width={{ base: 'full', md: '41.666%' }}>
                          {imgUrl ? (
                            <img
                              src={imgUrl}
                              alt={`${vp.name} snapshot`}
                              className="w-full h-auto rounded-xl shadow-2xl border border-surface object-contain bg-surface max-h-96"
                              onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/${vp.width}x${vp.height}/e2e8f0/64748b?text=Snapshot+Unavailable`; }}
                            />
                          ) : (
                            <Box display="flex" direction="col" align="center" className="text-center">
                              <Box marginBottom={2}>
                                <Text color="dim">
                                  <ImageIcon className="w-12 h-12 opacity-20" />
                                </Text>
                              </Box>
                              <Text variant="sans" size="xs" weight="font-bold" uppercase tracking="wider" color="dim">
                                Awaiting Frame...
                              </Text>
                            </Box>
                          )}
                        </Box>

                        <Stack gap={6} padding={8} flex={1} minWidth="0" overflow="hidden">
                          {data ? (
                            <>
                              <Box surface="muted" border={true} padding={5} radius="2xl">
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
                                  <Box key={idx} padding={4} radius="xl" border={true} surface="default" shadow="sm" className="hover:border-accent transition-all">
                                    <Box display="flex" justify="between" align="start" marginBottom={2}>
                                      <Stack direction="row" align="center" gap={2}>
                                        <Box width={2} height={2} radius="full" surface={imp.severity > 7 ? "error" : "warning"} className={imp.severity > 7 ? 'bg-red-500 shadow-sm' : 'bg-amber-500'} />
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
                                      <Box surface="muted" padding={3} radius="lg" border={true} display="flex" direction={{ base: 'col', sm: 'row' }} align="start" gap={2}>
                                        <Text variant="sans" size="xs" weight="font-black" color="accent" marginTop={0.5} uppercase tracking="widest" className="shrink-0">FIX</Text>
                                        <Box flex={1} minWidth="0">
                                          <Text variant="sans" size="xs" weight="font-bold" className="break-words whitespace-pre-wrap line-clamp-4">
                                            {imp.suggestion}
                                          </Text>
                                          {imp.element === "Manual Audit Required" && (
                                            <CopyPromptButton suggestion={imp.suggestion} />
                                          )}
                                        </Box>
                                      </Box>
                                    )}
                                  </Box>
                                ))}
                              </Stack>
                            </>
                          ) : (
                            <Box display="flex" align="center" justify="center" paddingY={20} direction="col">
                              <Text color="dim">
                                <RefreshCw className="animate-spin w-6 h-6" />
                              </Text>
                              <Text variant="sans" size="xs" weight="font-bold" tracking="widest" uppercase color="dim">
                                Agent Processing...
                              </Text>
                            </Box>
                          )}
                        </Stack>
                      </Stack>
                    </Box>
                  );
                })}
              </Stack>
            </>
          ) : (
            <Stack height="full" align="center" justify="center" surface="default" radius="3xl" padding={20} minHeight={500} className="border-2 border-dashed text-center">
              <Box surface="muted" padding={6} radius="full" marginBottom={6}>
                <Text color="dim" className="opacity-50">
                  <Camera className="w-16 h-16" />
                </Text>
              </Box>
              <Text variant="sans" size="xl" weight="font-black" marginBottom={2}>
                Ready to Audit
              </Text>
              <Text variant="sans" size="sm" weight="font-medium" color="dim" maxWidth="sm" marginX="auto">
                Enter a URL above to start the visual analysis across Mobile, Tablet, and Desktop.
              </Text>
            </Stack>
          )}
        </Stack>
      </Grid>
    </Stack>
  );
}
