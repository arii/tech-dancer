import { useMemo } from 'react';
import { useParams, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { Database, Activity, ArrowLeft, Search } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { useResearch } from './useResearch';
import { BlogDrafter } from '@/features/lab/BlogDrafter';
import WSDCReminders from '@/features/lab/wsdc-reminders/WSDCReminders';
import { WCSScraperTool } from './components/WCSScraperTool';
import { WCSParquetPipelineDetail } from './tools/WCSParquetPipelineDetail';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentType } from 'react';
import { BASE_URL, SITE_NAME } from '@/config/constants';

import { DetailLayout } from '@/components/layout/DetailLayout';

const TOOL_REGISTRY: Record<string, ComponentType> = {
  'blog-drafter': BlogDrafter,
  'wcs-scraper': WCSScraperTool,
  'wsdc-event-reminders': WSDCReminders,
  'wcs-parquet-pipeline': WCSParquetPipelineDetail,
};

export default function ResearchDetail() {
  const navigate = useNavigate();
  const { id: paramId } = useParams();
  const { pathname } = useLocation();

  const { getTool, getStudy, tools } = useResearch();

  const id = useMemo(() => {
    if (paramId) return paramId;
    if (pathname.startsWith('/research/')) {
      return pathname.split('/').filter(Boolean).pop();
    }
    return null;
  }, [paramId, pathname]);

  const tool = useMemo(() => {
    if (!id) return null;
    // Attempt lookup by ID first, then by route matching
    return getTool(id) || tools.find(t => t.route === pathname || t.canonicalPath === pathname);
  }, [id, pathname, tools, getTool]);

  const study = !tool && id ? getStudy(id) : null;

  const registryId = tool?.id || id;

  const structuredData = useMemo(() => {
    if (tool) {
      return {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": tool.title,
        "description": tool.description,
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

  // Redirect non-canonical routes (e.g. /research/ux-auditor -> /ux-auditor)
  if (tool?.canonicalPath && pathname.startsWith('/research/')) {
    return <Navigate to={tool.canonicalPath} replace />;
  }

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
          backLabel="Back to Portfolio"
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
            <Text variant="mono" size="xs">Back to Portfolio</Text>
          </Box>
        </Stack>
      </Box>
    );
  }

  return (
    <Box as="section" padding="panel">
      <SEO
        title={tool.title}
        description={tool.description}
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
          className="hover:text-accent transition-all group"
          cursor="pointer"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <Text variant="mono" size="xs" weight="font-bold" color="dim" className="group-hover:text-accent">Back to Portfolio</Text>
        </Box>

        <Box border surface="surface" radius="lg" padding={{ base: 8, md: 12 }}>
          <Stack gap={12}>
            {tool.status !== 'Coming Soon' && registryId && TOOL_REGISTRY[registryId] ? (
              (() => {
                const ToolComponent = TOOL_REGISTRY[registryId];
                return <ToolComponent />;
              })()
            ) : (
              <Stack gap={12}>
                <Stack gap={4}>
                    <PageHeader
                      label={`PROJECT // ${tool.category}`}
                      title={tool.title}
                      paddingBottom={0}
                      border="none"
                    />
                  <Box border radius="md" surface="default" padding="compact">
                    <Text variant="body" size="lg" color="dim">{tool.description}</Text>
                  </Box>
                </Stack>

                <Grid cols={{ base: 1, md: 2 }} gap={12}>
                  <Stack gap={4}>
                    <Text variant="mono" size="micro" color="dim" uppercase tracking="widest">Status</Text>
                    <Box border radius="md" padding="compact" display="flex" align="center" gap={3}>
                      <Activity className="w-4 h-4 text-accent" />
                      <StatusBadge label={tool.status} />
                    </Box>
                  </Stack>
                  <Stack gap={4}>
                    <Text variant="mono" size="micro" color="dim" uppercase tracking="widest">Source</Text>
                    <Box border radius="md" padding="compact" display="flex" align="center" gap={3}>
                      <Database className="w-4 h-4 text-accent" />
                      <Text variant="mono" size="xs">SYSTEM REPOSITORY // INTERNAL</Text>
                    </Box>
                  </Stack>
                </Grid>

                {(tool.status === 'Coming Soon' || (registryId && !TOOL_REGISTRY[registryId])) && (
                  <Box border radius="lg" padding="card" className="bg-surface/50 border-dashed">
                    <Stack gap={4} align="center" textAlign="center">
                      <Search className="w-8 h-8 text-accent opacity-50" />
                      <Stack gap={2}>
                        <Text variant="display" size="xl">Technical Documentation Pending</Text>
                        <Text variant="body" size="sm" color="dim" maxWidth="md">
                          Detailed architectural breakdown for this system is being finalized. Please refer to the repository source for immediate implementation details.
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
