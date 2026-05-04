import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Database, Activity, ArrowLeft, Search } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { useResearch } from './useResearch';
import { BlogDrafter } from '@/features/lab/BlogDrafter';
import { WCSScraperTool } from './components/WCSScraperTool';
import { SEO } from '@/components/SEO';
import { ComponentType } from 'react';
import { BASE_URL, SITE_NAME } from '@/config/constants';

import { DetailLayout } from '@/components/layout/DetailLayout';

const TOOL_REGISTRY: Record<string, ComponentType> = {
  'blog-drafter': BlogDrafter,
  'wcs-scraper': WCSScraperTool,
};

export default function ResearchDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTool, getStudy } = useResearch();

  const tool = id ? getTool(id) : null;
  const study = !tool && id ? getStudy(id) : null;

  const structuredData = useMemo(() => {
    if (tool) {
      return {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": tool.name,
        "description": tool.layman,
        "applicationCategory": "EducationalApplication"
      };
    }
    if (study) {
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": study.title,
        "description": study.excerpt,
        "author": {
          "@type": "Person",
          "name": study.author || "Ariel Anders",
          "url": `${BASE_URL}/about`
        },
        "datePublished": study.date,
        "publisher": {
          "@type": "Organization",
          "name": SITE_NAME
        }
      };
    }
    return null;
  }, [tool, study]);

  if (study) {
    return (
      <>
        <SEO
          title={study.title}
          description={study.excerpt}
          type="article"
          schema={structuredData}
        />
        <DetailLayout
          title={study.title}
          category={study.category}
          date={study.date}
          content={study.content}
          onBack={() => navigate('/research')}
          backLabel="Back to Lab"
        />
      </>
    );
  }

  if (!tool) {
    return (
      <Box padding="panel" textAlign="center">
        <Stack gap={8} align="center">
          <Search size={48} className="opacity-20" />
          <Text variant="display" size="2xl">Content Not Found</Text>
          <Box as="button" onClick={() => navigate('/research')} className="hover:text-accent transition-colors">
            <Text variant="mono" size="xs">Back to Laboratory</Text>
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
        schema={structuredData}
      />
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
          <ArrowLeft size={16} />
          <Text variant="mono" size="xs" weight="font-bold" color="dim">Back to Lab</Text>
        </Box>

        <Box border surface="default" padding={{ base: 8, md: 12 }} className="rounded-none">
          <Stack gap={12}>
            {tool.status !== 'Coming Soon' && id && TOOL_REGISTRY[id] ? (
              (() => {
                const ToolComponent = TOOL_REGISTRY[id];
                return <ToolComponent />;
              })()
            ) : (
              <Stack gap={12}>
                <Stack gap={4}>
                    <Text variant="mono" color="dim" size="xs" weight="font-semibold" tracking="widest" uppercase>
                      LABORATORY_ACCESS // {tool.category}
                    </Text>
                    <Text as="h1" variant="headline" size="fluid-5" weight="font-black" leading="tight" tracking="tight">
                      {tool.name}
                    </Text>
                  <Box border surface="accent" padding="compact">
                    <Text variant="body" size="lg" color="body">{tool.layman}</Text>
                  </Box>
                </Stack>

                <Grid cols={{ base: 1, md: 2 }} gap={12}>
                  <Stack gap={4}>
                    <Text variant="mono" size="micro" color="dim" uppercase tracking="widest">System Status</Text>
                    <Box border padding="compact" display="flex" align="center" gap={3}>
                      <Activity className="w-4 h-4 text-accent" />
                      <StatusBadge label={tool.status} />
                    </Box>
                  </Stack>
                  <Stack gap={4}>
                    <Text variant="mono" size="micro" color="dim" uppercase tracking="widest">Database Source</Text>
                    <Box border padding="compact" display="flex" align="center" gap={3}>
                      <Database className="w-4 h-4 text-accent" />
                      <Text variant="mono" size="xs">WSDC REGISTRY // AUTHENTICATED</Text>
                    </Box>
                  </Stack>
                </Grid>

                {tool.status === 'Coming Soon' && (
                  <Box border surface="accent" padding="card" className="bg-accent/5 border-dashed">
                    <Stack gap={4} align="center" textAlign="center">
                      <Search className="w-8 h-8 text-accent opacity-50" />
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
