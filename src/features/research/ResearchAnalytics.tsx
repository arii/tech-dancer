import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Database, FileText, ArrowRight } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { useResearch } from './useResearch';

export default function ResearchAnalytics() {
  const navigate = useNavigate();
  const { studies, tools } = useResearch();

  return (
    <Box as="section">
      <SEO
        title="Research"
        description="Interactive data science, software development, and specialized tools for West Coast Swing research and analysis."
      />
      <Stack gap={12}>
        <PageHeader
          label="TECHNICAL PORTFOLIO"
          title="Data & Development Lab"
          description="Interactive data science, software development, and specialized tools for West Coast Swing research and analysis."
          as="h1"
        />

        <Stack gap={8}>
          <Grid cols={{ base: 1, sm: 2, xl: 3 }} gap={4}>
            {tools.map((tool) => (
              <Box 
                key={tool.id}
                as="article"
                surface="default"
                border
                padding={5}
                radius="2xl"
                className="border-line/80 bg-surface shadow-sm transition-colors hover:border-primary/30 group cursor-pointer"
                onClick={() => navigate(tool.id === 'ux-auditor' ? '/ux-auditor' : `/research/${tool.id}`)}
              >
                <Text size="micro" weight="font-bold" className="mb-3 uppercase tracking-[0.25em] text-text-dim/65">
                  {tool.status}
                </Text>
                <Text as="h2" size="lg" weight="font-bold" className="mb-2 group-hover:text-primary transition-colors">
                  {tool.name}
                </Text>
                <Text size="sm" className="leading-7 text-text-body/72 mb-4">
                  {tool.layman}
                </Text>
                <Box display="flex" align="center" gap={2} className="text-text-dim/60 group-hover:text-primary transition-colors mt-auto">
                  <Text weight="font-bold" size="xs" className="uppercase tracking-widest">Launch Console</Text>
                  <ArrowRight size={14} />
                </Box>
              </Box>
            ))}
          </Grid>
        </Stack>

        <Stack gap={8}>
          {studies.length > 0 ? (
            <Grid cols={{ base: 1, md: 2 }} gap={8}>
              {studies.map((study) => (
                <Box 
                  key={study.slug} 
                  as="article" 
                  padding={5} 
                  border 
                  radius="2xl" 
                  className="border-line/80 bg-surface shadow-sm transition-colors hover:border-primary/30 group cursor-pointer"
                  onClick={() => navigate(`/research/${study.slug}`)}
                >
                  <Stack gap={4}>
                    <Box display="flex" justify="between" align="center">
                      <Text size="micro" weight="font-bold" className="uppercase tracking-widest text-text-dim/65">{study.category}</Text>
                      <Text variant="mono" size="micro" className="text-text-dim/60">{study.date}</Text>
                    </Box>
                    <Text as="h2" size="xl" weight="font-black" className="group-hover:text-primary transition-colors leading-tight">
                      {study.title}
                    </Text>
                    <Text size="sm" className="leading-7 text-text-body/72 line-clamp-3">
                      {study.excerpt}
                    </Text>
                    <Box display="flex" align="center" gap={2} className="text-text-dim/60 group-hover:text-accent-vivid transition-colors">
                      <Text weight="font-bold" size="xs" className="uppercase tracking-widest">Read Study</Text>
                      <FileText size={14} />
                    </Box>
                  </Stack>
                </Box>
              ))}
            </Grid>
          ) : (
            <Box className="rounded-2xl border border-dashed border-line/80 bg-surface/40 p-12 text-center shadow-xl relative overflow-hidden">
              <Box position="absolute" top={-12} right={-12} width={40} height={40} surface="accent" opacity={0.03} radius="full" className="blur-3xl" />
              <Text as="h2" size="2xl" weight="font-black" className="mb-3 text-accent uppercase tracking-tighter">ETL Pipeline Synchronizing...</Text>
              <Text className="mx-auto max-w-2xl text-base leading-8 text-text-body/90">
                The WCS Competition Data Scraper is ingesting and validating public datasets. Detailed studies on judge variance and performance metrics will be available once the baseline analysis is complete.
              </Text>
            </Box>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
