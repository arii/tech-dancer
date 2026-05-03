import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Database, FileText, Search, ArrowRight } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { useResearch } from './useResearch';
import type { JSX } from 'react';

export default function ResearchAnalytics(): JSX.Element {
  const navigate = useNavigate();
  const { studies, tools } = useResearch();

  return (
    <Box as="section">
      <SEO
        title="Research"
        description="Boom Tick research on robotics, dance analytics, competition data, and biomechanics for West Coast Swing dancers."
      />
      <Stack gap={12}>
        <PageHeader
          label="TECHNICAL PORTFOLIO"
          title="Data & Development Lab"
          description="Interactive data science, software development, and specialized tools to optimize the Boom Tick West Coast Swing lifestyle."
          as="h1"
        />

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
                type="button"
                aria-label={`Open ${tool.name}`}
                onClick={() => navigate(tool.id === 'ux-auditor' ? '/ux-auditor' : `/research/${tool.id}`)}
                surface="default"
                border
                padding="card"
                cursor="pointer"
                className="group hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all text-left"
              >
                <Stack gap={6} height="full" justify="between">
                  <Stack gap={4}>
                    <Box display="flex" justify="between" align="start">
                      <Box width={10} height={10} surface="muted" border display="flex" align="center" justify="center" color="dim" className="group-hover:text-accent transition-colors">
                        <Search className="w-5 h-5" />
                      </Box>
                      <StatusBadge label={tool.status} />
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
                <Box
                  key={study.slug}
                  as="button"
                  type="button"
                  onClick={() => navigate(`/research/${study.slug}`)}
                  aria-label={`Read study ${study.title}`}
                  className="group w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Stack gap={4} surface="default" border padding="card" className="transition-all hover:border-accent">
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
            <EmptyState
              icon={<Database className="w-12 h-12" />}
              title="ETL Pipeline Synchronizing..."
              description="The WCS Competition Data Scraper is currently ingesting and validating public datasets. Detailed studies on judge variance and performance metrics will appear once the baseline analysis is complete."
            />
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
