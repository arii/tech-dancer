import { useNavigate } from 'react-router-dom';
import { Database, FileText, Search, ArrowRight } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { useResearch } from './useResearch';

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
        <PageHeader
          label="TECHNICAL PORTFOLIO"
          title="Data & Development Lab"
          description="Sophisticated pages for interactive data science, software development, and specialized tools to optimize the WCS lifestyle."
          as="h1"
        />

        <Stack gap={8}>
          <Box paddingBottom={4} display="flex" justify="between" align="end" border="b">
            <Text variant="headline" size="2xl" weight="font-black">Tools Ecosystem</Text>
            <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase tracking="widest">{tools.length} TOOLS</Text>
          </Box>
          <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={8}>
            {tools.map((tool) => (
              <Stack
                key={tool.id}
                as="button"
                onClick={() => navigate(tool.id === 'ux-auditor' ? '/ux-auditor' : `/research/${tool.id}`)}
                padding={6}
                radius="lg"
                border
                gap={4}
                height="full"
                cursor="pointer"
                surface="surface"
                align="start"
                textAlign="left"
              >
                <Stack gap={4} width="full">
                  <Box display="flex" justify="between" align="start" width="full">
                    <Box width={10} height={10} surface="muted" border radius="md" display="flex" align="center" justify="center" color="dim">
                      <Search size={20} />
                    </Box>
                    <Text size="micro" weight="font-bold" uppercase tracking="widest" color="accent">
                      {tool.status}
                    </Text>
                  </Box>
                  <Stack gap={2}>
                    <Text variant="display" size="xl" weight="font-black">
                      {tool.name}
                    </Text>
                    <Text size="sm" color="dim">
                      {tool.layman}
                    </Text>
                  </Stack>
                </Stack>
                <Box display="flex" align="center" gap={2} marginTop="auto" color="accent">
                  <Text weight="font-bold" size="xs" uppercase tracking="widest">Launch Console</Text>
                  <ArrowRight size={14} />
                </Box>
              </Stack>
            ))}
          </Grid>
        </Stack>

        <Stack gap={8}>
          <Box paddingBottom={4} display="flex" justify="between" align="end" border="b">
            <Text variant="headline" size="2xl" weight="font-black">Studies</Text>
            <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase tracking="widest">{studies.length} ARTICLES</Text>
          </Box>

          {studies.length > 0 ? (
            <Grid cols={{ base: 1, md: 2 }} gap={8}>
              {studies.map((study) => (
                <Stack
                  key={study.slug}
                  padding={8}
                  radius="lg"
                  border
                  surface="surface"
                  gap={4}
                  cursor="pointer"
                  onClick={() => navigate(`/research/${study.slug}`)}
                >
                  <Box display="flex" justify="between" align="center">
                    <Text variant="mono" size="micro" color="accent" weight="font-bold" uppercase tracking="widest">{study.category}</Text>
                    <Text variant="mono" size="micro" color="dim">{study.date}</Text>
                  </Box>
                  <Stack gap={2}>
                    <Text variant="display" size="2xl" weight="font-black">
                      {study.title}
                    </Text>
                    <Text variant="body" size="sm" color="dim">
                      {study.excerpt}
                    </Text>
                  </Stack>
                  <Box display="flex" align="center" gap={2} color="accent" marginTop="auto">
                    <Text variant="mono" size="xs" weight="font-bold" uppercase tracking="widest">Read Study</Text>
                    <FileText size={16} />
                  </Box>
                </Stack>
              ))}
            </Grid>
          ) : (
            <Box padding={12} border radius="2xl" position="relative" overflow="hidden" surface="surface" textAlign="center">
              <Stack align="center" justify="center" gap={4}>
                <Box color="dim" opacity={0.5}>
                  <Database size={48} />
                </Box>
                <Stack gap={2}>
                  <Text as="h2" size="2xl" weight="font-black" marginBottom={3} color="accent" uppercase tracking="tight">
                    ETL Pipeline Synchronizing...
                  </Text>
                  <Text marginX="auto" maxWidth="2xl" size="base" color="body">
                    The WCS Competition Data Scraper is ingesting and validating public datasets. Detailed studies on judge variance and performance metrics will be available once the baseline analysis is complete.
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
