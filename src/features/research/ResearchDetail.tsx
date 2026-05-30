import { useMemo, lazy, Suspense } from 'react';
import { useParams, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { Database, Activity, ArrowLeft, Search } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { useResearch } from './useResearch';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentType } from 'react';
import { BASE_URL, SITE_NAME } from '@/config/constants';

import { DetailLayout } from '@/components/layout/DetailLayout';

// Lazy load tool components to help with bundle size
const BlogDrafter = lazy(() => import('@/features/lab/BlogDrafter').then(m => ({ default: m.BlogDrafter })));
const WSDCReminders = lazy(() => import('@/features/lab/wsdc-reminders/WSDCReminders'));
const WCSScraperTool = lazy(() => import('./components/WCSScraperTool').then(m => ({ default: m.WCSScraperTool })));
const GitOpsReviewerTool = lazy(() => import('./components/GitOpsReviewerTool').then(m => ({ default: m.GitOpsReviewerTool })));
const BlastRadiusTool = lazy(() => import('./components/BlastRadiusTool').then(m => ({ default: m.BlastRadiusTool })));

const TOOL_REGISTRY: Record<string, ComponentType> = {
  'blog-drafter': BlogDrafter,
  'wcs-scraper': WCSScraperTool,
  'wsdc-event-reminders': WSDCReminders,
  'gitops-pr-reviewer': GitOpsReviewerTool,
  'scope-blast-radius': BlastRadiusTool,
};

export default function ResearchDetail() {
  const navigate = useNavigate();
  const { id: paramId } = useParams();
  const { pathname } = useLocation();

  const { getTool, getStudy } = useResearch();

  const id = useMemo(() => {
    if (paramId) return paramId;
    const segments = pathname.split('/').filter(Boolean);
    // Find the segment after 'research' to identify the tool
    const resIndex = segments.indexOf('research');
    if (resIndex !== -1 && segments[resIndex + 1]) {
      return segments[resIndex + 1];
    }
    // Fallback to the last segment if we are in this component
    return segments[segments.length - 1] || null;
  }, [paramId, pathname]);

  const tool = id ? getTool(id) : null;
  const study = !tool && id ? getStudy(id) : null;

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
  // pathname is relative to basename in React Router 6/7.
  const isResearchPath = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    return segments.includes('research');
  }, [pathname]);

  if (tool?.canonicalPath && pathname !== tool.canonicalPath && isResearchPath) {
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
            <Text variant="mono" size="xs">Back to DevAI Portfolio</Text>
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
        canonical={tool.canonicalPath ? `${BASE_URL}${tool.canonicalPath}` : undefined}
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
          <Text variant="mono" size="xs" weight="font-bold" color="dim" className="group-hover:text-accent">Back to DevAI Portfolio</Text>
        </Box>

        <Box border surface="surface" radius="lg" padding={{ base: 4, md: 12 }}>
          <Stack gap={12}>
            {tool.status !== 'Coming Soon' && id && TOOL_REGISTRY[id] ? (
              <Suspense fallback={
                <Box padding={20} display="flex" align="center" justify="center">
                  <Activity className="animate-spin text-accent" />
                </Box>
              }>
                {(() => {
                  const ToolComponent = TOOL_REGISTRY[id];
                  return <ToolComponent />;
                })()}
              </Suspense>
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
                      <Text variant="mono" size="xs">WSDC REGISTRY // PUBLIC</Text>
                    </Box>
                  </Stack>
                </Grid>

                {tool.status === 'Coming Soon' && (
                  <Box border radius="lg" padding="card" className="bg-surface/50 border-dashed">
                    <Stack gap={4} align="center" textAlign="center">
                      <Search className="w-8 h-8 text-accent opacity-50" />
                      <Stack gap={2}>
                        <Text variant="display" size="xl">Work in Progress</Text>
                        <Text variant="body" size="sm" color="dim" maxWidth="md">
                          This tool is currently being built. We are finishing the data analysis and layout.
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
