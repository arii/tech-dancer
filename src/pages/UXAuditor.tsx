import { Icon } from '@/components/ui/Icon';
import { useState, useEffect, useRef } from 'react';
import {
  Camera, CheckCircle, RefreshCw,
  Smartphone, Monitor, Tablet,
  ChevronRight, ArrowLeft
} from 'lucide-react';
import { useUXAuditor, VIEWPORTS, ViewportAnalysis } from '@/features/ux-auditor/useUXAuditor';
import { Box, Stack, Grid, Text } from '@/layouts/Primitives';
import { PageHeader } from '@/components/ui/PageHeader';
import { SEO } from '@/components/SEO';
import { RESEARCH_TOOLS } from '@/config/research-tools';
import { Skeleton } from '@/components/ui/Skeleton';
import { NavLink } from 'react-router-dom';
import { cardVariants, listRowVariants } from '@/lib/variants';

const viewportIcons = {
  Mobile: <Icon icon={Smartphone} size="md" />,
  Tablet: <Icon icon={Tablet} size="md" />,
  Desktop: <Icon icon={Monitor} size="md" />
};

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
      className="bg-surface rounded-xl shadow-2xl border border-line"
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
        className="border-none bg-white origin-center"
        style={{ transform: `scale(${scale})`, width: `${width}px`, height: `${height}px`, minWidth: `${width}px`, minHeight: `${height}px` } as any} // impeccable-ignore
      />
    </Box>
  );
}

export default function UXAuditor() {
  const {
    reports, isAnalyzing, activeReport, setActiveReport,
    url, setUrl, runUXAudit,
  } = useUXAuditor();

  return (
    <Stack gap={8} width="full">
      <SEO title="Visual UX Auditor" description="Run automated visual UX audits." />

      <Stack gap={4}>
        <Stack as={NavLink} to="/research" direction="row" align="center" gap={2} className="group text-accent hover:text-accent-sky transition-colors w-fit">
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          <Text variant="mono" size="xs" weight="font-bold" uppercase tracking="widest">DevAI Portfolio</Text>
        </Stack>

        <Stack direction={{ base: 'col', xl: 'row' }} align={{ base: 'stretch', xl: 'center' }} justify="between" gap={6} border="b" paddingBottom={6}>
          <Box>
            <PageHeader
              label="Engineering System"
              title="Visual UX Auditor"
              description="Automated visual regression and UX improvement suggestions."
              border="none" paddingBottom={0}
            />
          </Box>

          <Stack gap={4} as="form" autoComplete="off" onSubmit={(e) => { e.preventDefault(); runUXAudit(url); }}>
            <Stack direction="row" align="center" gap={3} padding={2} className={cardVariants()}>
              <Box
                as="input"
                type="url"
                value={url}
                onChange={(e: any) => setUrl(e.target.value)}
                flex={1}
                paddingX={4}
                paddingY={2}
                radius="lg"
                className="bg-bg border-none focus:ring-2 focus:ring-accent outline-none font-mono text-text-main text-sm"
                placeholder="https://..."
              />
              <Box
                as="button"
                onClick={() => runUXAudit(url)}
                disabled={isAnalyzing}
                paddingX={6} paddingY={2} radius="md"
                display="flex"
                align="center"
                gap={2}
                className="bg-accent hover:opacity-90 text-bg font-bold transition-all disabled:opacity-50"
              >
                {isAnalyzing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
                <Text size="sm" weight="font-bold" color="bg">{isAnalyzing ? 'Auditing...' : 'Start Audit'}</Text>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <Grid cols={{ base: 1, lg: 4 }} gap={8}>
        <Stack gap={4} span={{ lg: 1 }} minWidth={0}>
          <Text variant="sans" size="xs" weight="font-bold" uppercase tracking="widest" color="dim">Audit History</Text>
          <Stack className="divide-y divide-line border border-line rounded-lg overflow-hidden bg-surface">
            {reports.map((report) => (
              <Stack key={report.id} as="button" direction="row" onClick={() => setActiveReport(report)} width="full" align="center" gap={3} padding={4}
                className={listRowVariants({ active: activeReport?.id === report.id })}>
                <Box width={9} height={9} radius="full" surface={report.status === 'completed' ? 'success' : 'warning'}
                  display="flex" align="center" justify="center"
                  className={report.status === 'completed' ? '' : 'animate-pulse'}>
                  {report.status === 'completed' ? <CheckCircle className="w-4 h-4" /> : <RefreshCw className="w-4 h-4 animate-spin" />}
                </Box>
                <Box flex={1} minWidth="0" textAlign="left">
                  <Text variant="sans" size="sm" weight="font-bold" className="truncate block">{report.url.replace('https://', '')}</Text>
                  <Text variant="mono" size="xs" color="dim">{new Date(report.timestamp).toLocaleTimeString()}</Text>
                </Box>
                <ChevronRight className="w-4 h-4 text-dim" />
              </Stack>
            ))}
          </Stack>
        </Stack>

        <Stack gap={6} span={{ lg: 3 }}>
          {activeReport ? (
            <Stack gap={8}>
              {VIEWPORTS.map(vp => {
                const data = (activeReport as any)[`findings_${vp.name.toLowerCase()}`] as ViewportAnalysis;
                return (
                  <Box key={vp.name} border radius="xl" overflow="hidden" surface="surface">
                    <Stack padding={4} border="b" direction="row" align="center" justify="between" surface="muted">
                      <Text variant="sans" size="base" weight="font-bold">{vp.name} Analysis</Text>
                      <Text variant="mono" size="xs" color="dim">{vp.width} × {vp.height}</Text>
                    </Stack>
                    <Stack direction={{ base: 'col', md: 'row' }}>
                      <Box padding={8} surface="muted" display="flex" align="center" justify="center" border={{ base: 'b', md: 'r' }} minHeight={400} width={{ base: 'full', md: '40%' }}>
                        <ViewportFrame url={activeReport.url} width={vp.width} height={vp.height} />
                      </Box>
                      <Stack gap={6} padding={8} flex={1}>
                        {data ? (
                          <Stack gap={4}>
                            <Box surface="alt" padding={5} radius="lg" border>
                              <Text variant="sans" size="xs" weight="font-black" color="accent" uppercase tracking="widest" display="block" marginBottom={2}>Summary</Text>
                              <Text variant="sans" size="sm">"{data.summary}"</Text>
                            </Box>
                            {data.improvements?.map((imp, idx) => (
                              <Box key={idx} padding={4} border radius="lg" className="border-line/30">
                                <Box display="flex" justify="between" align="center" marginBottom={2}>
                                  <Text variant="sans" size="sm" weight="font-black">{imp.element}</Text>
                                  <Text variant="mono" size="xs" color="dim">SEV {imp.severity}</Text>
                                </Box>
                                <Text variant="sans" size="xs" color="dim">{imp.issue}</Text>
                                {imp.suggestion && (
                                  <Box surface="muted" padding={3} radius="md" border marginTop={3}>
                                    <Text variant="sans" size="xs" weight="font-bold">{imp.suggestion}</Text>
                                  </Box>
                                )}
                              </Box>
                            ))}
                          </Stack>
                        ) : (
                          <Stack gap={4}>
                            <Skeleton height={10} width="full" />
                            <Skeleton height={20} width="full" />
                          </Stack>
                        )}
                      </Stack>
                    </Stack>
                  </Box>
                );
              })}
            </Stack>
          ) : (
            <Box padding={12} radius="xl" border className="border-accent/10 bg-accent/5" minHeight={500}>
              <Stack align="center" justify="center" gap={8}>
                <Camera className="w-16 h-16 text-accent opacity-20" />
                <Stack align="center" gap={2} textAlign="center">
                  <Text variant="display" size="2xl" weight="font-black">Ready to Audit</Text>
                  <Text variant="body" size="base" color="dim" maxWidth="md">Analyze any public URL for visual regression and UX improvements.</Text>
                </Stack>
                <Grid cols={{ base: 1, md: 3 }} gap={6} width="full" maxWidth="3xl">
                  {[
                    { s: '01', t: 'Enter URL', d: 'Paste destination link' },
                    { s: '02', t: 'Capture', d: 'System generates viewports' },
                    { s: '03', t: 'Analyze', d: 'AI delivers improvements' }
                  ].map(step => (
                    <Stack key={step.s} padding={6} surface="alt" border radius="lg" className="border-accent/10 relative overflow-hidden">
                      <Box position="absolute" top={0} left={0} width="full" height={0.5} className="bg-accent/20" />
                      <Text variant="mono" size="tiny" color="accent" weight="font-black">{step.s}</Text>
                      <Text weight="font-bold" size="sm">{step.t}</Text>
                      <Text size="xs" color="dim">{step.d}</Text>
                    </Stack>
                  ))}
                </Grid>
              </Stack>
            </Box>
          )}
        </Stack>
      </Grid>
    </Stack>
  );
}
