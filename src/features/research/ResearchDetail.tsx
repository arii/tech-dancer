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
import { AUTHOR_ARIEL_ANDERS } from '@/utils/schema';
import { EditorialLayout } from '@/components/editorial/EditorialLayout';
import { EditorialHeader } from '@/components/editorial/EditorialHeader';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
import { readingTime } from '@/lib/content';
import { ArticleNavigation } from '@/components/editorial/ArticleNavigation';
import { useArticleNavigation } from '@/lib/hooks/useArticleNavigation';
import { ActionButton } from '@/components/ui/ActionButton';
import { RoboticsPortfolioCard } from '@/components/ui/RoboticsPortfolioCard';

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
    if (study) {
      const studyImageUrl = study.authorImage || `${BASE_URL}/assets/comp_analysis_hero.webp`;

      const isAriel = !study.author || study.author === 'Ariel Anders' || study.author.includes('Ariel');
      const authorSchema = isAriel
        ? AUTHOR_ARIEL_ANDERS
        : {
            "@type": "Person" as const,
            "name": study.author,
            "url": `${BASE_URL}/about`
          };

      const techArticleSchema = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": study.title,
        "description": study.excerpt,
        "proficiencyLevel": "Expert",
        "articleSection": "Technical Deep Dive",
        "author": authorSchema,
        "datePublished": study.date,
        "dateModified": study.date,
        "image": [
          studyImageUrl.startsWith('http') ? studyImageUrl : `${BASE_URL}${studyImageUrl}`,
          {
            "@type": "ImageObject",
            "url": studyImageUrl.startsWith('http') ? studyImageUrl : `${BASE_URL}${studyImageUrl}`,
            "caption": study.title,
            "creditText": study.author || "Ariel Anders",
            "creator": {
              "@type": "Person",
              "name": study.author || "Ariel Anders"
            }
          }
        ],
        "publisher": {
          "@type": "Organization",
          "name": SITE_NAME,
          "logo": {
            "@type": "ImageObject",
            "url": `${BASE_URL}/favicon.ico`
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${BASE_URL}/research/${study.slug}`
        }
      };

      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": `${BASE_URL}`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Experiments",
            "item": `${BASE_URL}/research`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": study.title,
            "item": `${BASE_URL}/research/${study.slug}`
          }
        ]
      };

      return [techArticleSchema, breadcrumbSchema];
    }
    if (tool) {
      const toolSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": tool.title,
        "description": tool.description,
        "applicationCategory": "EducationalApplication"
      };

      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": `${BASE_URL}`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Experiments",
            "item": `${BASE_URL}/research`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": tool.title,
            "item": `${BASE_URL}${tool.canonicalPath || `/research/${tool.id}`}`
          }
        ]
      };

      return [toolSchema, breadcrumbSchema];
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

  if (study) {
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
          backLabel="Back to Experiments"
          header={
            <Stack gap={4}>
              {/* Primary Portfolio CTA Banner */}
              <Box marginBottom={2}>
                <RoboticsPortfolioCard />
              </Box>

              <EditorialHeader
                category={study.category}
                date={study.date}
                readTime={rt}
                title={study.title}
                dek={study.excerpt}
                author={study.author}
                authorAvatarSrc={study.authorImage}
              />
            </Stack>
          }
          footer={
            <Stack gap={12}>
              <ArticleNavigation previous={studyPrevious} next={studyNext} />
            </Stack>
          }
        >
          <Stack gap={12}>
            <Box className="prose-editorial">
              <MarkdownRenderer content={study.content} />
            </Box>

            {tool && (
              <Stack gap={12} marginTop={12}>
                <Box height={0.5} width="full" surface="muted" opacityVariant="low" />
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
                          label={`PROJECT // ${tool.taxonomyBucket || 'RESEARCH'}`}
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
                        <Box border radius="md" padding="card" surface="muted" borderStyle="dashed">
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
                </Stack>
              </Stack>
            )}
          </Stack>
        </EditorialLayout>
      </>
    );
  }

  if (!tool || tool.taxonomyBucket === 'migrated') {
    const migratedTitle = tool?.title || 'Project Migrated';
    const migratedUrl = tool?.migratedUrl || 'https://arii.github.io';

    return (
      <Box padding="panel" textAlign="center" maxWidth="3xl" marginX="auto">
        <SEO
          title={`${migratedTitle} - Migrated`}
          description="This project has been migrated to Ariel Anders' primary portfolio at arii.github.io."
        />
        <Stack gap={8} align="center">
          <Box width={16} height={16} surface="muted" radius="full" display="flex" align="center" justify="center">
            <Database size={32} className="text-accent" />
          </Box>
          <Stack gap={2}>
            <Text variant="display" size="3xl" weight="font-black">{migratedTitle}</Text>
            <Text variant="body" size="lg" color="dim">
              This flagship project is hosted on Ariel's official primary portfolio for production engineering and robotics work.
            </Text>
          </Stack>

          <Stack direction={{ base: "col", sm: "row" }} gap={4}>
            <Box as="a" href={migratedUrl} target="_blank" rel="noopener noreferrer">
              <ActionButton variant="primary" paddingX={6} paddingY={3}>
                View on arii.github.io →
              </ActionButton>
            </Box>
            <Box as="button" onClick={() => navigate('/research')}>
              <ActionButton variant="secondary" paddingX={6} paddingY={3}>
                Explore Live Experiments
              </ActionButton>
            </Box>
          </Stack>
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
          <Text variant="mono" size="xs" weight="font-bold" color="dim" className="group-hover:text-accent">Back to Experiments</Text>
        </Box>

        <Box border surface="surface" radius="md" padding={{ base: 4, md: 12 }}>
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
                  <Box border radius="md" padding="card" className="bg-surface/50 border-dashed">
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
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
