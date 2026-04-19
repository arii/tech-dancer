import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Database, Activity, ArrowLeft, Search } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/components/layout/Primitives';
import { useResearch } from './useResearch';
import { BlogDrafter } from '@/features/lab/BlogDrafter';

export default function ResearchDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTool } = useResearch();
  
  const tool = id ? getTool(id) : null;

  if (!tool) {
    return (
      <Box padding="panel" textAlign="center">
        <Stack gap={8} align="center">
          <Search className="w-12 h-12 opacity-20" />
          <Text variant="display" size="2xl">Tool Not Found</Text>
          <Box as="button" onClick={() => navigate('/research')} className="hover:text-accent-brand transition-colors">
            <Text variant="mono" size="xs">Back to Laboratory</Text>
          </Box>
        </Stack>
      </Box>
    );
  }

  return (
    <Box as="section" padding="panel">
      <Stack gap={12}>
        <Box 
          as="button" 
          onClick={() => navigate('/research')}
          display="flex" 
          align="center" 
          gap={2}
          color="dim"
          className="hover:text-accent-brand transition-colors"
          cursor="pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <Text variant="mono" size="xs" weight="font-bold">Back to Lab</Text>
        </Box>

        <Box border surface="default" padding={{ base: 8, md: 12 }}>
          <Stack gap={12}>
            {tool.id === 'blog-drafter' ? (
              <BlogDrafter />
            ) : (
              <Stack gap={12}>
                <Stack gap={4}>
                  <Text variant="mono" color="brand" size="xs" weight="font-bold" uppercase tracking="widest">
                    LABORATORY_ACCESS // {tool.category.toUpperCase()}
                  </Text>
                  <Text variant="headline" size="fluid-7">{tool.name}</Text>
                  <Box border surface="accent" padding="compact" opacity={5} className="bg-accent/5">
                    <Text variant="body" size="lg" color="body">{tool.layman}</Text>
                  </Box>
                </Stack>

                <Grid cols={{ base: 1, md: 2 }} gap={12}>
                  <Stack gap={4}>
                    <Text variant="mono" size="micro" color="dim" uppercase tracking="widest">System Status</Text>
                    <Box border padding="compact" display="flex" align="center" gap={3}>
                      <Activity className="w-4 h-4 text-accent-brand" />
                      <Text variant="mono" size="xs" color="brand" weight="font-bold">{tool.status.toUpperCase()}</Text>
                    </Box>
                  </Stack>
                  <Stack gap={4}>
                    <Text variant="mono" size="micro" color="dim" uppercase tracking="widest">Database Source</Text>
                    <Box border padding="compact" display="flex" align="center" gap={3}>
                      <Database className="w-4 h-4 text-accent-brand text-dim" />
                      <Text variant="mono" size="xs">WSDC REGISTRY // AUTHENTICATED</Text>
                    </Box>
                  </Stack>
                </Grid>

                {tool.status === 'Coming Soon' && (
                  <Box border surface="accent" padding="card" className="bg-accent-brand/5 border-dashed">
                    <Stack gap={4} align="center" textAlign="center">
                      <Search className="w-8 h-8 text-accent-brand opacity-50" />
                      <Stack gap={2}>
                        <Text variant="display" size="xl">Work in Progress</Text>
                        <Text variant="body" size="sm" color="dim" maxWidth="md">
                          This specialized module is currently being integrated into the Tech-Dancer platform. We are finalizing the analysis models and UI components.
                        </Text>
                      </Stack>
                    </Stack>
                  </Box>
                )}
              </Stack>
            )}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
