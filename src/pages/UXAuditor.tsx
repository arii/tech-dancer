import { useState } from 'react';
import type { ChangeEvent } from 'react';
import {
  Camera, CheckCircle, RefreshCw,
  Smartphone, Monitor, Tablet, Copy, Image as ImageIcon,
  ChevronRight, Github
} from 'lucide-react';
import { useUXAuditor, VIEWPORTS, ViewportAnalysis } from '@/features/ux-auditor/useUXAuditor';
import { Box, Stack, Grid, Text } from '@/layouts/Primitives';
import { PageHeader } from '@/components/ui/PageHeader';
import { contentWidth } from '@/styles/design-tokens';

const viewportIcons = {
  Mobile: <Smartphone className="w-5 h-5" />,
  Tablet: <Tablet className="w-5 h-5" />,
  Desktop: <Monitor className="w-5 h-5" />
};


function CopyPromptButton({ suggestion }: { suggestion: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(suggestion);
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setCopied(true);
      });
    } else {
      setCopied(true);
    }
    setTimeout(() => {
      if (document.startViewTransition) {
        document.startViewTransition(() => setCopied(false));
      } else {
        setCopied(false);
      }
    }, 2000);
  };

  return (
    <Box
      as="button"
      onClick={handleCopy}
      marginTop={2}
      display="flex"
      align="center"
      gap={1}
      paddingX={3}
      paddingY={1}
      radius="md"
      surface={copied ? "success" : "default"}
      border={true}
      cursor="pointer"
      className={`transition-colors font-bold text-xs ${!copied ? "hover:border-accent hover:text-accent" : ""}`}
    >
      <Box color={copied ? "accent" : "main"} display="flex" align="center" gap={1}>
        {copied ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
        <Text>{copied ? "Copied!" : "Copy Prompt"}</Text>
      </Box>
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
    isExporting,
    runUXAudit,
    exportToGithub,
    copyMarkdown,
  } = useUXAuditor();

  return (
    <Stack gap={8} className={`${contentWidth.tool} w-full mx-auto`}>
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
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
            width={64}
            paddingX={4}
            paddingY={2}
            radius="md"
            className="bg-bg border-none focus:ring-2 focus:ring-accent outline-none font-mono text-text-main text-sm"
            placeholder="https://..."
          />
          <Box
            as="button"
            onClick={runUXAudit}
            disabled={isAnalyzing}
            display="flex"
            align="center"
            gap={2}
            paddingX={6}
            paddingY={2}
            radius="md"
            cursor="pointer"
            className="bg-accent hover:opacity-90 text-white font-bold transition-all disabled:opacity-50"
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
              <Box padding={10} className="italic" color="dim" align="center" size="sm">
                No audits recorded.
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
                  surface={report.status === 'completed' ? "success" : "warning"}
                  opacity={report.status === 'completed' ? 100 : 20}
                  className={report.status === 'completed' ? '' : 'animate-pulse'}
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
                <ChevronRight className="w-4 h-4 text-text-dim opacity-50" />
              </Box>
            ))}
          </Stack>
        </Stack>

        {/* Detailed View */}
        <Stack gap={6} span={{ lg: 3 }}>
          {activeReport ? (
            <>
              <Box
                surface="default" padding={6} radius="2xl" shadow="sm" border={true} display="flex" justify="between" align="center" gap={4} direction={{ base: "col", md: "row" }}
                marginBottom={2}
              >
                <Box>
                  <Text variant="sans" size="xs" weight="font-bold" color="accent" uppercase tracking="tighter" marginBottom={1}>
                    Current Session
                  </Text>
                  <Text variant="sans" size="xl" weight="font-black">
                    {activeReport.url}
                  </Text>
                </Box>
                <Box display="flex" gap={2}>
                  <Box
                    as="button"
                    onClick={copyMarkdown}
                    display="flex"
                    align="center"
                    gap={2}
                    paddingX={4}
                    paddingY={2}
                    radius="xl"
                    surface="muted"
                    color="dim"
                    cursor="pointer"
                    className="font-bold hover:text-text-main transition-all text-sm"
                  >
                    {isExporting ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {isExporting ? 'Copied' : 'Copy MD'}
                  </Box>
                  <Box
                    as="button"
                    onClick={exportToGithub}
                    disabled={activeReport.status !== 'completed'}
                    display="flex"
                    align="center"
                    gap={2}
                    paddingX={6}
                    paddingY={2}
                    radius="xl"
                    cursor="pointer"
                    surface="inverted"
                    className="font-bold hover:opacity-90 shadow-md transition-all disabled:opacity-50 text-sm"
                  >
                    <Github className="w-4 h-4" />
                    Export to GitHub Issue
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
                          <Box padding={2} surface="default" radius="lg" shadow="sm" color="accent">
                            {viewportIcons[vp.name as keyof typeof viewportIcons]}
                          </Box>
                          <Text variant="sans" size="base" weight="font-bold">
                            {vp.name} Analysis
                          </Text>
                        </Box>
                        <Text variant="mono" size="xs" weight="font-bold" color="dim" uppercase tracking="widest">
                          {vp.width}w × {vp.height}h
                        </Text>
                      </Box>

                      <Grid cols={{ base: 1, md: 12 }}>
                        <Box padding={8} surface="muted" display="flex" align="center" justify="center" border="r" minHeight={400} span={{ base: 1, md: 5 }}>
                          {imgUrl ? (
                            <img
                              src={imgUrl}
                              alt={`${vp.name} snapshot`}
                              className="w-full h-auto rounded-xl shadow-2xl border border-surface object-contain bg-surface"
                              style={{ maxHeight: '450px' }}
                              onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/${vp.width}x${vp.height}/e2e8f0/64748b?text=Snapshot+Unavailable`; }}
                            />
                          ) : (
                            <Stack gap={2} textAlign="center" color="dim" marginX="auto" padding={1}>
                              <Box marginX="auto">
                                <ImageIcon className="w-12 h-12 opacity-20" />
                              </Box>
                              <Text variant="sans" size="xs" weight="font-bold" uppercase={true} tracking="wider">
                                Awaiting Frame...
                              </Text>
                            </Stack>
                          )}
                        </Box>

                        <Stack gap={6} padding={8} span={{ base: 1, md: 7 }}>
                          {data ? (
                            <>
                              <Box surface="muted" border={true} padding={5} radius="2xl">
                                <Text variant="sans" size="xs" weight="font-black" color="accent" uppercase marginBottom={2} tracking="widest">
                                  Analysis Summary
                                </Text>
                                <Text variant="sans" size="sm" weight="font-medium" className="leading-relaxed">
                                  "{data.summary}"
                                </Text>
                              </Box>
                              <Stack gap={4}>
                                {data.improvements?.map((imp, idx) => (
                                  <Box key={idx} padding={4} radius="xl" border={true} surface="default" shadow="sm" className="hover:border-accent transition-all">
                                    <Box display="flex" justify="between" align="start" marginBottom={2}>
                                      <Box as="span" display="flex" align="center" gap={2}>
                                        <Box width={2} height={2} radius="full" className={imp.severity > 7 ? 'bg-red-600 shadow-sm' : 'bg-amber-500'} />
                                        <Text variant="sans" size="sm" weight="font-black">
                                          {imp.element}
                                        </Text>
                                      </Box>
                                      <Text variant="mono" size="xs" weight="font-black" paddingX={2} paddingY={0.5} radius="full" surface="muted" color="dim" uppercase>
                                        LVL {imp.severity}
                                      </Text>
                                    </Box>
                                    <Text variant="sans" size="xs" color="dim" marginBottom={3}>
                                      {imp.issue}
                                    </Text>
                                    <Box surface="muted" padding={3} radius="lg" border={true} display="flex" align="start" gap={2}>
                                      <Text variant="sans" size="xs" weight="font-bold" color="brand" marginTop={0.5}>FIX</Text>
                                      <Box flex={1} minWidth="0">
                                        <Text variant="sans" size="xs" weight="font-bold" className="break-words whitespace-pre-wrap line-clamp-4">
                                          {imp.suggestion}
                                        </Text>
                                        {imp.element === "Manual Audit Required" && (
                                          <CopyPromptButton suggestion={imp.suggestion} />
                                        )}
                                      </Box>
                                    </Box>
                                  </Box>
                                ))}
                              </Stack>
                            </>
                          ) : (
                            <Box display="flex" align="center" justify="center" paddingY={20} direction="col" color="dim">
                              <RefreshCw className="animate-spin w-6 h-6" />
                              <Text variant="sans" size="xs" weight="font-bold" tracking="widest" uppercase>
                                Agent Processing...
                              </Text>
                            </Box>
                          )}
                        </Stack>
                      </Grid>
                    </Box>
                  );
                })}
              </Stack>
            </>
          ) : (
            <Stack height="full" align="center" justify="center" surface="default" radius="3xl" padding={20} minHeight={500} className="border-2 border-dashed text-center">
              <Box surface="muted" padding={6} radius="full" marginBottom={6} className="text-text-dim/50">
                <Camera className="w-16 h-16" />
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
