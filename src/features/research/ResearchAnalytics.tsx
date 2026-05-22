import { Icon } from '@/components/ui/Icon';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Activity, Database, FileText } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { useResearch } from './useResearch';
import { cardVariants } from '@/lib/variants';

export default function ResearchAnalytics() {
  const navigate = useNavigate();
  const { studies, tools } = useResearch();

  return (
    <Box as="section">
      <SEO
        title="Research & Analytics"
        description="Technical studies and real-time data pipelines at the intersection of robotics and West Coast Swing."
      />
      <Stack gap={12}>
        <PageHeader
          label="TECHNICAL PORTFOLIO"
          title="Data & Development Lab"
          description="Technical portfolio showcasing DevAI-driven analysis tools and machine learning research applied to West Coast Swing."
          as="h1"
        />



        <Stack gap={8}>
          <Box paddingBottom={4} display="flex" justify="between" align="end" border="b">
            <Text variant="headline" size="2xl" weight="font-black" id="intelligence-tools-heading">Intelligence Tools</Text>
            <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase tracking="widest">{tools.length} CONSOLES</Text>
          </Box>
          <Grid autoFill gap={8} overflow="visible">
            {tools.map((tool) => (
              <Stack
                key={tool.id}
                as="button"
                role="article"
                aria-labelledby={`tool-title-${tool.id}`}
                onClick={() => navigate(tool.id === 'ux-auditor' ? '/ux-auditor' : `/research/${tool.id}`)}
                padding={6}
                gap={4}
                height="full"
                align="start"
                textAlign="left"
                className={cardVariants({ interactive: true })}
              >
                <Stack gap={4} width="full">
                  <Box display="flex" justify="between" align="start" width="full">
                    <Box width={10} height={10} surface="muted" border radius="md" display="flex" align="center" justify="center">
                      <Icon icon={tool.id === 'wcs-scraper' ? Activity : Search} size="md" color="dim" />
                    </Box>
                    <Text size="micro" weight="font-bold" uppercase tracking="widest" color="accent">
                      {tool.status}
                    </Text>
                  </Box>
                  <Stack gap={2}>
                    <Text variant="display" size="xl" weight="font-black" id={`tool-title-${tool.id}`}>
                      {tool.name}
                    </Text>
                    <Text size="sm" color="dim">
                      {tool.layman}
                    </Text>
                  </Stack>
                </Stack>
                <Box display="flex" align="center" gap={2} marginTop="auto" minHeight={12} width="full">
                  <Text weight="font-bold" size="xs" uppercase tracking="widest" color="accent">Open Console</Text>
                  <Icon icon={ArrowRight} size="md" color="accent" />
                </Box>
              </Stack>
            ))}
          </Grid>
        </Stack>

        <Stack gap={8}>
          <Box paddingBottom={4} display="flex" justify="between" align="end" border="b">
            <Text variant="headline" size="2xl" weight="font-black" id="published-studies-heading">Published Studies</Text>
            <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase tracking="widest">{studies.length} ARTICLES</Text>
          </Box>

          {studies.length > 0 ? (
            <Grid autoFill gap={8} overflow="visible">
              {studies.map((study) => (
                <Stack
                  key={study.slug}
                  as="button"
                  role="article"
                  aria-labelledby={`study-title-${study.slug}`}
                  padding={8}
                  gap={4}
                  onClick={() => navigate(`/research/${study.slug}`)}
                  textAlign="left"
                  className={cardVariants({ interactive: true })}
                >
                  <Box display="flex" justify="between" align="center" width="full">
                    <Text variant="mono" size="micro" color="accent" weight="font-bold" uppercase tracking="widest">{study.category}</Text>
                    <Text variant="mono" size="micro" color="dim">{study.date}</Text>
                  </Box>
                  <Stack gap={2}>
                    <Text variant="display" size="2xl" weight="font-black" id={`study-title-${study.slug}`}>
                      {study.title}
                    </Text>
                    <Text variant="body" size="sm" color="dim">
                      {study.excerpt}
                    </Text>
                  </Stack>
                  <Box display="flex" align="center" gap={2} marginTop="auto" minHeight={12} width="full">
                    <Text variant="mono" size="xs" weight="font-bold" uppercase tracking="widest" color="accent">Read Paper</Text>
                    <Icon icon={FileText} size="sm" color="accent" />
                  </Box>
                </Stack>
              ))}
          </Grid>
          ) : (
            <Box padding={6} border radius="lg" position="relative" overflow="hidden" surface="surface" textAlign="center">
              <Stack align="center" justify="center" gap={2}>
                <Box>
                  <Icon icon={Database} size="lg" color="muted" />
                </Box>
                <Stack gap={0.5}>
                  <Text as="h2" size="lg" weight="font-black" color="accent" uppercase tracking="tight">
                    ETL Pipeline Synchronizing...
                  </Text>
                  <Text marginX="auto" maxWidth="md" size="xs" color="body" opacity={0.8}>
                    The WCS Competition Data Scraper is ingesting and validating public datasets. Detailed studies will be available once baseline analysis is complete.
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
