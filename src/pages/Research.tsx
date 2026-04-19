import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Database, FileText, Search, Activity, ArrowRight } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/components/Primitives';
import { PageHeader } from '@/components/PageHeader';
import { useResearch } from '@/features/research/useResearch';

export default function ResearchAnalytics() {
  const navigate = useNavigate();
  const { studies, tools } = useResearch();

  return (
    <Box as="section">
      <Stack gap={12}>
        <PageHeader 
          label="TECHNICAL PORTFOLIO"
          title="Data & Development Lab"
          description="Sophisticated pages for interactive data science, software development, and specialized tools to optimize the WCS lifestyle."
        />

        <Stack gap={8}>
          <Box paddingBottom={4} display="flex" justify="between" align="end" className="border-b border-slate-200">
            <Text variant="display" size="2xl" weight="font-black" className="text-accent-navy">Tools Ecosystem</Text>
            <Text variant="mono" size="xs" color="dim" weight="font-semibold" className="tracking-[0.15em]">{tools.length} TOOLS</Text>
          </Box>
          <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={8}>
            {tools.map((tool) => (
              <Box 
                key={tool.id}
                as="button"
                onClick={() => navigate(`/research/${tool.id}`)}
                surface="default"
                border
                padding="card"
                cursor="pointer"
                className="group hover:border-accent-brand transition-all text-left"
              >
                <Stack gap={6} height="full" justify="between">
                  <Stack gap={4}>
                    <Box display="flex" justify="between" align="start">
                      <Box width={10} height={10} surface="muted" border display="flex" align="center" justify="center" color="dim" className="group-hover:text-accent-brand transition-colors">
                        <Search className="w-5 h-5" />
                      </Box>
                      <Text variant="mono" size="micro" color="brand" weight="font-bold">{tool.status.toUpperCase()}</Text>
                    </Box>
                    <Stack gap={2}>
                      <Text variant="display" size="xl" className="group-hover:text-accent-brand transition-colors">{tool.name}</Text>
                      <Text variant="body" size="sm" color="dim" className="line-clamp-2">{tool.layman}</Text>
                    </Stack>
                  </Stack>
                  <Box display="flex" align="center" gap={2} color="dim" className="group-hover:text-accent-brand transition-colors">
                    <Text variant="mono" size="micro" weight="font-bold">Launch Console</Text>
                    <ArrowRight className="w-3 h-3" />
                  </Box>
                </Stack>
              </Box>
            ))}
          </Grid>
        </Stack>

        <Stack gap={8}>
          <Box paddingBottom={4} display="flex" justify="between" align="end" className="border-b border-slate-200">
            <Text variant="display" size="2xl" weight="font-black" className="text-accent-navy">Studies</Text>
            <Text variant="mono" size="xs" color="dim" weight="font-semibold" className="tracking-[0.15em]">{studies.length} ARTICLES</Text>
          </Box>
          <Grid cols={{ base: 1, md: 2 }} gap={12}>
            {studies.map((study) => (
              <Box key={study.slug} className="group">
                <Stack gap={4}>
                  <Box display="flex" justify="between" align="center">
                    <Text variant="mono" size="micro" color="brand" uppercase>{study.category}</Text>
                    <Text variant="mono" size="micro" color="dim">{study.date}</Text>
                  </Box>
                  <Text variant="display" size="2xl" className="group-hover:text-accent-brand transition-colors">
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
                    className="group-hover:text-accent-brand transition-colors"
                  >
                    <Text variant="mono" size="xs" weight="font-bold">Read Study</Text>
                    <FileText className="w-4 h-4" />
                  </Box>
                </Stack>
              </Box>
            ))}
          </Grid>
        </Stack>
      </Stack>
    </Box>
  );
}
