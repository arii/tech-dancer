import { useMemo, lazy, Suspense } from 'react';
import { useParams, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { Database, Activity, Search, ArrowLeft } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { useResearch } from './useResearch';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentType } from 'react';
import { BASE_URL, SITE_NAME } from '@/config/constants';
import { EditorialLayout } from '@/components/editorial/EditorialLayout';
import { EditorialHeader } from '@/components/editorial/EditorialHeader';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
import { readingTime } from '@/lib/content';
import { ArticleNavigation } from '@/components/editorial/ArticleNavigation';
import { useArticleNavigation } from '@/lib/hooks/useArticleNavigation';

// Lazy load tool components to help with bundle size
const BlogDrafter = lazy(() => import('@/features/lab/BlogDrafter').then(m => ({ default: m.BlogDrafter })));
const WCSScraperTool = lazy(() => import('./components/WCSScraperTool').then(m => ({ default: m.WCSScraperTool })));
const GitOpsReviewerTool = lazy(() => import('./components/GitOpsReviewerTool').then(m => ({ default: m.GitOpsReviewerTool })));
const DeploymentImpactAnalyzerTool = lazy(() => import('./components/DeploymentImpactAnalyzerTool').then(m => ({ default: m.DeploymentImpactAnalyzerTool })));
const EcommerceAutomationTool = lazy(() => import('./components/EcommerceAutomationTool').then(m => ({ default: m.EcommerceAutomationTool })));

const TOOL_REGISTRY: Record<string, ComponentType> = {
  'blog-drafter': BlogDrafter,
  'wcs-scraper': WCSScraperTool,
  'gitops-pr-reviewer': GitOpsReviewerTool,
  'deployment-impact-analyzer': DeploymentImpactAnalyzerTool,
  'ecommerce-automation': EcommerceAutomationTool,
};

export default function ResearchDetail() {
  const navigate = useNavigate();
  const { id: paramId } = useParams();
  const { pathname } = useLocation();

  const { getTool, getStudy, studies } = useResearch();

  const id = useMemo(() => {
    if (paramId) return paramId;
    const segments = pathname.split('/').filter(Boolean);
    const resIndex = segments.indexOf('research');
    if (resIndex !== -1 && segments[resIndex + 1]) {
      return segments[resIndex + 1];
    }
    return segments[segments.length - 1] || null;
  }, [paramId, pathname]);

  const tool = id ? getTool(id) : null;
  const study = id ? getStudy(id) : null;

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

  const isResearchPath = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    return segments.includes('research');
  }, [pathname]);

  const { previous: studyPrevious, next: studyNext } = useArticleNavigation(
    studies,
    study?.slug || '',
    '/research'
  );

  if (tool?.canonicalPath && pathname !== tool.canonicalPath && isResearchPath) {
    return <Navigate to={tool.canonicalPath} replace />;
  }

  if (study && !tool) {
    const rt = `${readingTime(study.content)} min read`;
    return (
      <>
        <SEO
          title={study.title}
          description={study.excerpt}
          type="article"
          schema={structuredData}
        />
        <EditorialLayout
          onBack={() => navigate('/research')}
          backLabel="Back to Portfolio"
          header={
            <EditorialHeader
              category={study.category}
              date={study.date}
              readTime={rt}
              title={study.title}
              dek={study.excerpt}
              author={study.author}
              authorAvatarSrc={study.authorImage}
            />
          }
          footer={
            <Stack gap={12}>
              <ArticleNavigation previous={studyPrevious} next={studyNext} />
            </Stack>
          }
        >
          <Box className="prose-editorial">
            <MarkdownRenderer content={study.content} />
          </Box>
        </EditorialLayout>
      </>
    );
  }

  if (!tool) {
    return (
      <Box padding="panel" textAlign="center">
        <Stack gap={8} align="center">
          <Search size={48} className="opacity-low" />
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
          <Text variant="mono" size="xs" weight="font-bold" color="dim" className="group-hover:text-accent">Back to Portfolio</Text>
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
                      <Search className="w-8 h-8 text-accent opacity-muted" />
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

            {study && (
              <Box className="prose-editorial" paddingTop={8} borderTop>
                <MarkdownRenderer content={study.content} />
              </Box>
            )}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
