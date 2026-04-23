import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Database, FileText, Search, Activity, ArrowRight } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { useResearch } from './useResearch';
import { contentWidth } from '@/styles/design-tokens';

export default function ResearchAnalytics() {
  const navigate = useNavigate();
  const { studies, tools } = useResearch();

  return (
    <Box as="section" className={`${contentWidth.tool} w-full mx-auto`}>
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
          <Box paddingBottom={4} display="flex" justify="between" align="end" className="border-b border-slate-200">
            <Text variant="displayLower" size="2xl" weight="font-black" className="text-accent-navy">Tools Ecosystem</Text>
            <Text variant="mono" size="xs" color="dim" weight="font-semibold" >{tools.length} TOOLS</Text>
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
                      <Box width={10} height={10} surface="muted" border={true} display="flex" align="center" justify="center" color="dim" className="group-hover:text-accent transition-colors">
                        <Search className="w-5 h-5" />
                      </Box>
                      <Text variant="mono" size="micro" color="brand" weight="font-bold">{tool.status.toUpperCase()}</Text>
                    </Box>
                    <Stack gap={2}>
                      <Text variant="displayLower" size="xl" color="brand" className="group-hover:text-accent transition-colors">{tool.name}</Text>
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
          <Box paddingBottom={4} display="flex" justify="between" align="end" border="b" className="border-slate-200">
            <Text variant="displayLower" size="2xl" weight="font-black" color="brand">Studies</Text>
            <Text variant="mono" size="xs" color="dim" weight="font-semibold" >{studies.length} ARTICLES</Text>
          </Box>

          {studies.length > 0 ? (
            <Grid cols={{ base: 1, md: 2 }} gap={12}>
              {studies.map((study) => (
                <Box key={study.slug} className="group">
                  <Stack gap={4}>
                    <Box display="flex" justify="between" align="center">
                      <Text variant="mono" size="micro" color="brand" uppercase={true}>{study.category}</Text>
                      <Text variant="mono" size="micro" color="dim">{study.date}</Text>
                    </Box>
                    <Text variant="displayLower" size="2xl" color="brand" className="group-hover:text-accent transition-colors">
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
            <Box border={true} padding={12} surface="muted" emphasis="low">
              <Stack align="center" gap={4} textAlign="center">
                <Database className="w-12 h-12 text-line" />
                <Stack gap={2}>
                  <Text variant="displayLower" size="xl">Pipeline Synchronizing...</Text>
                  <Text variant="body" size="sm" color="dim" maxWidth="md">
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
