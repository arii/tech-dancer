import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Database, FileText, Search, ArrowRight } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { useResearch } from './useResearch';

function CompetitionTrendChart() {
  const data = [12, 19, 15, 25, 22, 30, 45, 40, 55, 60, 58, 70];
  const max = Math.max(...data);
  const width = 300;
  const height = 100;
  const points = data.map((d, i) => `${(i / (data.length - 1)) * width},${height - (d / max) * height}`).join(' ');

  return (
    <Box surface="muted" padding={6} border className="bg-bg/50 backdrop-blur-sm">
      <Stack gap={4}>
        <Box display="flex" justify="between" align="center">
          <Text variant="mono" size="micro" weight="font-bold">WCS COMPETITION TRENDS (INDEXED)</Text>
          <Box display="flex" align="center" gap={1.5}>
            <Box className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <Text variant="mono" size="micro" color="accent" weight="font-bold">LIVE DATA</Text>
          </Box>
        </Box>
        <Box height={30} width="full" display="flex" align="end">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polyline
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
              className="drop-shadow-sm"
            />
            <polygon
              fill="url(#gradient)"
              points={`0,${height} ${points} ${width},${height}`}
            />
            {data.map((d, i) => (
              <circle
                key={i}
                cx={(i / (data.length - 1)) * width}
                cy={height - (d / max) * height}
                r="3"
                className="fill-bg stroke-accent stroke-2 hover:r-4 transition-all cursor-crosshair"
              >
                <title>{`Index: ${d}`}</title>
              </circle>
            ))}
          </svg>
        </Box>
        <Box display="flex" justify="between" border="t" paddingTop={2} className="border-line/30">
          <Text variant="mono" size="micro" color="dim">JAN 2024</Text>
          <Text variant="mono" size="micro" color="dim">DEC 2024</Text>
        </Box>
      </Stack>
    </Box>
  );
}

export default function ResearchAnalytics() {
  const navigate = useNavigate();
  const { studies, tools } = useResearch();

  return (
    <Box as="section">
      <SEO
        title="Research"
        description="Technical studies and data analysis at the intersection of robotics and West Coast Swing. Exploring kinematics, competition data, and biomechanics."
      />
      <Stack gap={12}>
        <Grid cols={{ base: 1, lg: "3fr 2fr" }} gap={12} align="end">
          <PageHeader
            label="TECHNICAL PORTFOLIO"
            title="Data & Development Lab"
            description="Sophisticated pages for interactive data science, software development, and specialized tools to optimize the WCS lifestyle."
            as="h1"
          />
          <CompetitionTrendChart />
        </Grid>

        <Stack gap={8}>
          <Box paddingBottom={4} display="flex" justify="between" align="end" className="border-b border-line">
            <Text variant="display" size="2xl" weight="font-black" className="text-accent-navy">Tools Ecosystem</Text>
            <Text variant="mono" size="xs" color="dim" weight="font-semibold" className="tracking-widest">{tools.length} TOOLS</Text>
          </Box>
          <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={8}>
            {tools.map((tool) => (
              <Box 
                key={tool.id}
                as="button"
                onClick={() => navigate(tool.id === 'ux-auditor' ? '/ux-auditor' : `/research/${tool.id}`)}
                surface="default"
                border
                padding="card"
                cursor="pointer"
                className="group hover:border-accent transition-all text-left"
              >
                <Stack gap={6} height="full" justify="between">
                  <Stack gap={4}>
                    <Box display="flex" justify="between" align="start">
                      <Box width={10} height={10} surface="muted" border display="flex" align="center" justify="center" color="dim" className="group-hover:text-accent transition-colors">
                        <Search className="w-5 h-5" />
                      </Box>
                      <Text variant="mono" size="micro" color="brand" weight="font-bold">{tool.status.toUpperCase()}</Text>
                    </Box>
                    <Stack gap={2}>
                      <Text variant="display" size="xl" className="group-hover:text-accent transition-colors">{tool.name}</Text>
                      <Text variant="body" size="sm" color="dim" className="line-clamp-2">{tool.layman}</Text>
                    </Stack>
                  </Stack>
                  <Box display="flex" align="center" gap={2} color="dim" className="group-hover:text-accent transition-colors">
                    <Text variant="mono" size="micro" weight="font-bold">Launch Console</Text>
                    <ArrowRight className="w-3 h-3" />
                  </Box>
                </Stack>
              </Box>
            ))}
          </Grid>
        </Stack>

        <Stack gap={8}>
          <Box paddingBottom={4} display="flex" justify="between" align="end" className="border-b border-line">
            <Text variant="display" size="2xl" weight="font-black" className="text-accent-navy">Studies</Text>
            <Text variant="mono" size="xs" color="dim" weight="font-semibold" className="tracking-widest">{studies.length} ARTICLES</Text>
          </Box>

          {studies.length > 0 ? (
            <Grid cols={{ base: 1, md: 2 }} gap={12}>
              {studies.map((study) => (
                <Box key={study.slug} className="group">
                  <Stack gap={4}>
                    <Box display="flex" justify="between" align="center">
                      <Text variant="mono" size="micro" color="brand" uppercase>{study.category}</Text>
                      <Text variant="mono" size="micro" color="dim">{study.date}</Text>
                    </Box>
                    <Text variant="display" size="2xl" className="group-hover:text-accent transition-colors">
                      {study.title}
                    </Text>
                    <Text variant="body" size="sm" color="dim" className="line-clamp-3">
                      {study.excerpt}
                    </Text>
                    <Box
                      as={motion.div}
                      whileHover={{ x: 5 }}
                      display="flex"
                      align="center"
                      gap={2}
                      color="dim"
                      className="group-hover:text-accent transition-colors"
                    >
                      <Text variant="mono" size="xs" weight="font-bold">Read Study</Text>
                      <FileText className="w-4 h-4" />
                    </Box>
                  </Stack>
                </Box>
              ))}
            </Grid>
          ) : (
            <Box border padding={12} surface="muted" emphasis="low">
              <Stack align="center" gap={4} className="text-center">
                <Database className="w-12 h-12 text-line" />
                <Stack gap={2}>
                  <Text variant="display" size="xl">Pipeline Synchronizing...</Text>
                  <Text variant="body" size="sm" color="dim" maxWidth="prose">
                    Research studies are automatically ingested via the ETL pipeline.
                    New analysis runs weekly—check back soon for recent data.
                  </Text>
                </Stack>
              </Stack>
            </Box>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
