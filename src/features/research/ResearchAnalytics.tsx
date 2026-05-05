import { motion } from 'motion/react';
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
            <Text variant="mono" size="xs" color="dim" weight="font-semibold" className="tracking-widest">{tools.length} TOOLS</Text>
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
                className="group bg-surface hover:border-accent/40 transition-all duration-300 text-left"
              >
                <Stack gap={4}>
                  <Box display="flex" justify="between" align="start">
                    <Box width={10} height={10} surface="muted" border radius="md" display="flex" align="center" justify="center" color="dim" className="interactive-accent">
                      <Search className="w-5 h-5" />
                    </Box>
                    <Text size="micro" weight="font-bold" uppercase tracking="widest" color="accent">
                      {tool.status}
                    </Text>
                  </Box>
                  <Stack gap={2}>
                    <Text variant="display" size="xl" weight="font-black" className="interactive-accent">
                      {tool.name}
                    </Text>
                    <Text size="sm" color="dim" className="leading-relaxed line-clamp-2">
                      {tool.layman}
                    </Text>
                  </Stack>
                </Stack>
                <Box display="flex" align="center" gap={2} marginTop="auto" color="accent" className="group-hover:translate-x-1 transition-transform">
                  <Text weight="font-bold" size="xs" className="uppercase tracking-widest">Launch Console</Text>
                  <ArrowRight className="w-3 h-3" />
                </Box>
              </Stack>
            ))}
          </Grid>
        </Stack>

        <Stack gap={8}>
          <Box paddingBottom={4} display="flex" justify="between" align="end" border="b">
            <Text variant="headline" size="2xl" weight="font-black">Studies</Text>
            <Text variant="mono" size="xs" color="dim" weight="font-semibold" className="tracking-widest">{studies.length} ARTICLES</Text>
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
                  className="group hover:border-accent/40 transition-all"
                  cursor="pointer"
                  onClick={() => navigate(`/research/${study.slug}`)}
                >
                  <Box display="flex" justify="between" align="center">
                    <Text variant="mono" size="micro" color="accent" weight="font-bold" uppercase tracking="widest">{study.category}</Text>
                    <Text variant="mono" size="micro" color="dim">{study.date}</Text>
                  </Box>
                  <Stack gap={2}>
                    <Text variant="display" size="2xl" weight="font-black" className="interactive-accent">
                      {study.title}
                    </Text>
                    <Text variant="body" size="sm" color="dim" className="line-clamp-3 leading-relaxed">
                      {study.excerpt}
                    </Text>
                  </Stack>
                  <Box
                    as={motion.div}
                    display="flex"
                    align="center"
                    gap={2}
                    color="accent"
                    marginTop="auto"
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    <Text variant="mono" size="xs" weight="font-bold" uppercase tracking="widest">Read Study</Text>
                    <FileText className="w-4 h-4" />
                  </Box>
                </Stack>
              ))}
            </Grid>
          ) : (
            <Box padding={12} border radius="2xl" shadow="xl" position="relative" overflow="hidden" className="border-dashed border-border-standard/80 bg-surface/40 text-center">
               <Box position="absolute" top={-12} right={-12} width={40} height={40} surface="accent" opacity={0.03} radius="full" className="blur-3xl" />
               <Stack align="center" justify="center" gap={4}>
                  <Box color="dim" opacity={0.5}>
                    <Database className="w-12 h-12" />
                  </Box>
                  <Stack gap={2}>
                    <Text as="h2" size="2xl" weight="font-black" marginBottom={3} color="accent" uppercase tracking="tighter">ETL Pipeline Synchronizing...</Text>
                    <Text marginX="auto" maxWidth="2xl" className="text-base leading-8 text-text-body/90">
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
