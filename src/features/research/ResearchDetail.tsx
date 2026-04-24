import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Database, Activity, ArrowLeft, Search } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { useResearch } from './useResearch';
import { BlogDrafter } from '@/features/lab/BlogDrafter';
import { SEO } from '@/components/SEO';

import { DetailLayout } from '@/components/layout/DetailLayout';

export default function ResearchDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTool, getStudy } = useResearch();
  
  const tool = id ? getTool(id) : null;
  const study = !tool && id ? getStudy(id) : null;

  if (study) {
    return (
      <DetailLayout
        title={study.title}
        category={study.category}
        date={study.date}
        content={study.content}
        onBack={() => navigate('/research')}
        backLabel="Back to Lab"
      />
    );
  }

  const structuredData = useMemo(() => {
    if (!tool) return null;
    return {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": tool.name,
      "description": tool.layman,
      "applicationCategory": "EducationalApplication"
    };
  }, [tool]);

  if (!tool) {
    return (
      <Box padding="panel" textAlign="center">
        <Stack gap={8} align="center">
          <Search className="w-12 h-12 opacity-20" />
          <Text variant="displayLower" size="2xl">Content Not Found</Text>
          <Box as="button" onClick={() => navigate('/research')} cursor="pointer" className="hover:text-accent transition-colors">
            <Text variant="mono-uppercase" size="xs">Back to Laboratory</Text>
          </Box>
        </Stack>
      </Box>
    );
  }

  return (
    <Box as="section" padding="panel">
      <SEO
        title={tool.name}
        description={tool.layman}
        type="website"
      />
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      <Stack gap={12}>
        <Box 
          as="button" 
          onClick={() => navigate('/research')}
          display="flex" 
          align="center" 
          gap={2}
          color="dim"
          className="hover:text-accent transition-colors"
          cursor="pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <Text variant="mono-uppercase" size="xs" weight="font-bold">Back to Lab</Text>
        </Box>

        <Box border surface="default" padding={{ base: 8, md: 12 }} className="rounded-none">
          <Stack gap={12}>
            {tool.id === 'blog-drafter' ? (
              <BlogDrafter />
            ) : (
              <Stack gap={12}>
                <Stack gap={4}>
                  <Text variant="mono-uppercase" color="brand" size="xs" weight="font-bold">
                    LABORATORY_ACCESS // {tool.category.toUpperCase()}
                  </Text>
                  <Text as="h1" variant="headline" size="fluid-7">{tool.name}</Text>
                  <Box border={true} surface="accent" padding="compact" opacity={5}>
                    <Text variant="body" size="lg" color="body">{tool.layman}</Text>
                  </Box>
                </Stack>

                <Grid cols={{ base: 1, md: 2 }} gap={12}>
                  <Stack gap={4}>
                    <Text variant="mono-uppercase" size="micro" color="dim">System Status</Text>
                    <Box border={true} padding="compact" display="flex" align="center" gap={3}>
                      <Activity className="w-4 h-4 text-accent" />
                      <Text variant="mono-uppercase" size="xs" color="brand" weight="font-bold">{tool.status.toUpperCase()}</Text>
                    </Box>
                  </Stack>
                  <Stack gap={4}>
                    <Text variant="mono-uppercase" size="micro" color="dim">Database Source</Text>
                    <Box border={true} padding="compact" display="flex" align="center" gap={3}>
                      <Database className="w-4 h-4 text-accent opacity-50" />
                      <Text variant="mono-uppercase" size="xs">WSDC REGISTRY // AUTHENTICATED</Text>
                    </Box>
                  </Stack>
                </Grid>

                {tool.status === 'Coming Soon' && (
                  <Box border={true} surface="accent" padding="card" opacity={5} className="border-dashed">
                    <Stack gap={4} align="center" textAlign="center">
                      <Search className="w-8 h-8 text-accent opacity-50" />
                      <Stack gap={2}>
                        <Text variant="displayLower" size="xl">Work in Progress</Text>
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
