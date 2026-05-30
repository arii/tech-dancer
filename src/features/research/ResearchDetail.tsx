
import { useMemo, lazy, Suspense } from 'react';
import { useParams, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { Database, Activity, Search, Share2 } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { useResearch } from './useResearch';
import { SEO } from '@/components/SEO';
import { ComponentType } from 'react';
import { BASE_URL } from '@/config/constants';

import { ArticleLayout } from '@/components/article/ArticleLayout';
import { PostHeader } from '@/components/article/PostHeader';
import { ArticleFeatureCard } from '@/components/article/ArticleFeatureCard';
import { ArticleSidebar } from '@/components/article/ArticleSidebar';
import { ArticleFooter } from '@/components/article/ArticleFooter';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
import { readingTime as getReadingTime } from '@/lib/content';

// Lazy load tool components
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

export function ResearchDetail() {
  const navigate = useNavigate();
  const { id: paramId } = useParams();
  const { pathname } = useLocation();
  const { getTool, getStudy } = useResearch();

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
  const study = !tool && id ? getStudy(id) : null;

  if (!tool && !study) {
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

  const share = () => {
    const title = study?.title || tool?.title || 'Research';
    const text = study?.excerpt || tool?.description || '';
    if (navigator.share) {
      navigator.share({ title, text, url: window.location.href }).catch(console.error);
    }
  };

  const shareAction = (
    <Stack as="button" direction="row" onClick={share} align="center" gap={1.5} className="text-text-dim/60 hover:text-accent transition-colors">
      <Share2 className="w-3.5 h-3.5" />
      <Text variant="mono" size="micro" weight="font-bold" className="uppercase tracking-wider">SHARE</Text>
    </Stack>
  );

  if (study) {
    const rt = study.readingTime || `${getReadingTime(study.content)} min read`;
    return (
      <>
        <SEO title={study.title} description={study.excerpt} type="article" />
        <ArticleLayout
          onBack={() => navigate('/research')}
          backLabel="Back to Portfolio"
          hero={
            <PostHeader
              category={study.category || 'Research'}
              date={study.date}
              readTime={rt}
              title={study.title}
              dek={study.excerpt}
              author={study.author}
              authorAvatar={study.authorAvatar}
              shareAction={shareAction}
              visual={study.image ? <ArticleFeatureCard image={study.image} /> : null}
              tags={study.tags}
            />
          }
          sidebar={
            <ArticleSidebar
              snapshot={[
                { label: 'Project', value: study.category || 'Research' },
                { label: 'Status', value: study.status || 'Published' },
              ]}
            />
          }
          footer={<ArticleFooter related={study.related} />}
        >
          <MarkdownRenderer content={study.content} />
        </ArticleLayout>
      </>
    );
  }

  // Handle canonical redirects
  if (tool && tool.canonicalPath && pathname !== tool.canonicalPath && pathname.includes('research')) {
    return <Navigate to={tool.canonicalPath} replace />;
  }

  return (
    <ArticleLayout
      onBack={() => navigate('/research')}
      backLabel="Back to Portfolio"
      hero={
        <PostHeader
          category={`PROJECT // ${tool.category}`}
          title={tool.title}
          dek={tool.description}
          shareAction={shareAction}
        />
      }
      sidebar={
        <ArticleSidebar
          snapshot={[
            { label: 'Status', value: tool.status },
            { label: 'Source', value: 'PUBLIC REGISTRY' },
          ]}
          custom={
            <Stack gap={4} border radius="md" padding="compact" surface="surface-alt">
              <Text variant="mono" size="micro" color="dim" uppercase tracking="widest">LAB METRICS</Text>
              <Stack gap={3}>
                <Box display="flex" align="center" gap={3}>
                  <Activity className="w-4 h-4 text-accent" />
                  <StatusBadge label={tool.status} />
                </Box>
                <Box display="flex" align="center" gap={3}>
                  <Database className="w-4 h-4 text-accent" />
                  <Text variant="mono" size="xs">WSDC REGISTRY</Text>
                </Box>
              </Stack>
            </Stack>
          }
        />
      }
    >
      <SEO
        title={tool.title}
        description={tool.description}
        type="website"
        canonical={tool.canonicalPath ? `${BASE_URL}${tool.canonicalPath}` : undefined}
      />

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
    </ArticleLayout>
  );
}
