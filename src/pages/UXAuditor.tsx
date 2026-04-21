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
    <Stack gap={8} className="w-full">
      <Stack
        direction={{ base: 'col', md: 'row' }}
        align={{ base: 'start', md: 'center' }}
        justify="between"
        gap={6}
        className="border-b border-line pb-6"
      >
        <Box>
          <PageHeader
            label="Visual UX Auditor"
            title="Multimodal AI Analysis"
            description="Automated visual regression and UX improvement suggestions across viewports."
          />
        </Box>

        <Box
          display="flex"
          align="center"
          gap={3}
          className="bg-surface p-2 rounded-xl shadow-sm border border-line"
        >
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="px-4 py-2 rounded-lg bg-bg border-none focus:ring-2 focus:ring-accent outline-none w-64 text-sm font-mono text-text"
            placeholder="https://..."
          />
          <button
            onClick={runUXAudit}
            disabled={isAnalyzing}
            className="bg-accent hover:opacity-90 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-all disabled:opacity-50"
          >
            {isAnalyzing ? <RefreshCw className="animate-spin w-4 h-4" /> : <Camera className="w-4 h-4" />}
            {isAnalyzing ? 'Auditing...' : 'Start Audit'}
          </button>
        </Box>
      </Box>

      <Grid cols={{ base: 1, lg: 4 }} gap={8}>
        {/* Reports List */}
        <Stack gap={4} className="lg:col-span-1">
          <Text variant="sans" size="xs" weight="font-bold" className="uppercase tracking-widest text-text-dim px-1">
            Audit History
          </Text>
          <Box className="bg-surface rounded-2xl shadow-sm border border-line overflow-hidden divide-y divide-line">
            {reports.length === 0 && (
              <Box padding={10} className="text-center text-text-dim italic text-sm">
                No snapshots recorded
              </Box>
            )}
            {reports.map((report) => (
              <button
                key={report.id}
                onClick={() => setActiveReport(report)}
                className={`w-full text-left p-4 hover:bg-bg transition-all flex items-center gap-3 ${
                  activeReport?.id === report.id ? 'bg-bg border-l-4 border-accent' : 'border-l-4 border-transparent'
                }`}
              >
                <Box
                  padding={2}
                  radius="full"
                  className={report.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600 animate-pulse'}
                >
                  {report.status === 'completed' ? <CheckCircle className="w-4 h-4" /> : <RefreshCw className="w-4 h-4" />}
                </Box>
                <Box flex={1} className="min-w-0">
                  <Text variant="sans" size="sm" weight="font-bold" className="text-text truncate">
                    {report.url.replace('https://', '')}
                  </Text>
                  <Text variant="mono" size="xs" weight="font-medium" className="text-text-dim uppercase">
                    {new Date(report.timestamp).toLocaleTimeString()}
                  </Text>
                </Box>
                <ChevronRight className="w-4 h-4 text-text-dim opacity-50" />
              </button>
            ))}
          </Box>
        </Stack>

        {/* Detailed View */}
        <Stack gap={6} className="lg:col-span-3">
          {activeReport ? (
            <>
              <Box
                className="bg-surface p-6 rounded-2xl shadow-sm border border-line flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <Box>
                  <Text variant="sans" size="xs" weight="font-bold" className="text-accent mb-1 uppercase tracking-tighter">
                    Current Session
                  </Text>
                  <Text variant="sans" size="xl" weight="font-black" className="text-text">
                    {activeReport.url}
                  </Text>
                </Box>
                <Box display="flex" gap={2}>
                  <button
                    onClick={copyMarkdown}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold bg-bg text-text-dim hover:text-text transition-all text-sm"
                  >
                    {isExporting ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {isExporting ? 'Copied' : 'Copy MD'}
                  </button>
                  <button
                    onClick={exportToGithub}
                    disabled={activeReport.status !== 'completed'}
                    className="flex items-center gap-2 px-6 py-2 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-lg text-sm transition-all disabled:opacity-50"
                  >
                    <Github className="w-4 h-4" />
                    Export to GitHub Issue
                  </button>
                </Box>
              </Box>

              <Stack gap={8}>
                {VIEWPORTS.map(vp => {
                  const data = activeReport[`findings_${vp.name.toLowerCase()}`] as ViewportAnalysis;
                  const imgUrl = activeReport[`image_${vp.name.toLowerCase()}`];

                  return (
                    <Box key={vp.name} className="bg-surface rounded-2xl shadow-sm border border-line overflow-hidden">
                      <Box className="p-4 border-b border-line flex items-center justify-between bg-bg">
                        <Box display="flex" align="center" gap={3}>
                          <Box className="p-2 bg-surface rounded-lg shadow-sm text-accent">
                            {viewportIcons[vp.name as keyof typeof viewportIcons]}
                          </Box>
                          <Text variant="sans" size="base" weight="font-bold" className="text-text">
                            {vp.name} Analysis
                          </Text>
                        </Box>
                        <Text variant="mono" size="xs" weight="font-bold" className="text-text-dim uppercase tracking-widest">
                          {vp.width}w × {vp.height}h
                        </Text>
                      </Box>

                      <Grid cols={{ base: 1, md: 2 }}>
                        <Box className="p-8 bg-bg flex items-center justify-center border-r border-line min-h-[400px]">
                          {imgUrl ? (
                            <img
                              src={imgUrl}
                              alt={`${vp.name} snapshot`}
                              className="w-full h-auto rounded-xl shadow-2xl border border-surface object-contain bg-surface"
                              style={{ maxHeight: '450px' }}
                              onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/${vp.width}x${vp.height}/e2e8f0/64748b?text=Snapshot+Unavailable`; }}
                            />
                          ) : (
                            <Box className="text-center text-text-dim">
                              <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-20" />
                              <Text variant="sans" size="xs" weight="font-bold" className="uppercase tracking-wider">
                                Awaiting Frame...
                              </Text>
                            </Box>
                          )}
                        </Box>

                        <Stack gap={6} padding={8}>
                          {data ? (
                            <>
                              <Box className="bg-bg border border-line p-5 rounded-2xl">
                                <Text variant="sans" size="xs" weight="font-black" className="text-accent uppercase mb-2 tracking-widest">
                                  Analysis Summary
                                </Text>
                                <Text variant="sans" size="sm" weight="font-medium" className="text-text leading-relaxed">
                                  "{data.summary}"
                                </Text>
                              </Box>
                              <Stack gap={4}>
                                {data.improvements?.map((imp, idx) => (
                                  <Box key={idx} className="p-4 rounded-xl border border-line hover:border-accent/30 transition-all bg-surface shadow-sm">
                                    <Box display="flex" justify="between" align="start" className="mb-2">
                                      <Text variant="sans" size="sm" weight="font-black" className="text-text flex items-center gap-2">
                                        <div className={`h-2 w-2 rounded-full ${imp.severity > 7 ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]' : 'bg-amber-500'}`} />
                                        {imp.element}
                                      </Text>
                                      <Text variant="mono" size="xs" weight="font-black" className="px-2 py-0.5 rounded-full bg-bg text-text-dim uppercase">
                                        LVL {imp.severity}
                                      </Text>
                                    </Box>
                                    <Text variant="sans" size="xs" className="text-text-dim mb-3">
                                      {imp.issue}
                                    </Text>
                                    <Box className="bg-bg p-3 rounded-lg border border-line flex items-start gap-2">
                                      <Text variant="sans" size="xs" weight="font-bold" className="text-accent mt-0.5">FIX</Text>
                                      <Box className="flex-1 min-w-0">
                                        <Text variant="sans" size="xs" weight="font-bold" className="text-text break-words whitespace-pre-wrap line-clamp-4">
                                          {imp.suggestion}
                                        </Text>
                                        {imp.element === "Manual Audit Required" && (
                                          <button
                                            onClick={() => navigator.clipboard.writeText(imp.suggestion)}
                                            className="mt-2 flex items-center gap-1 px-3 py-1 rounded bg-surface border border-line hover:border-accent transition-colors text-xs font-bold text-text-dim hover:text-accent"
                                          >
                                            <Copy className="w-3 h-3" />
                                            Copy Prompt
                                          </button>
                                        )}
                                      </Box>
                                    </Box>
                                  </Box>
                                ))}
                              </Stack>
                            </>
                          ) : (
                            <Box className="flex flex-col items-center justify-center py-20 text-text-dim">
                              <RefreshCw className="animate-spin mb-3 w-6 h-6" />
                              <Text variant="sans" size="xs" weight="font-bold" className="tracking-widest uppercase">
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
            <Box className="h-full flex flex-col items-center justify-center bg-surface rounded-3xl border-2 border-dashed border-line p-20 text-center min-h-[500px]">
              <Box className="bg-bg p-6 rounded-full mb-6 text-text-dim/50">
                <Camera className="w-16 h-16" />
              </Box>
              <Text variant="sans" size="xl" weight="font-black" className="text-text mb-2">
                Ready to Audit
              </Text>
              <Text variant="sans" size="sm" weight="font-medium" className="text-text-dim max-w-sm mx-auto">
                Enter a URL above to start the visual analysis across Mobile, Tablet, and Desktop.
              </Text>
            </Box>
          )}
        </Stack>
      </Grid>
    </Stack>
  );
}
