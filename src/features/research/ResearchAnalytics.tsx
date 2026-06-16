import { Icon } from '@/components/ui/Icon';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Activity, FileText, Cpu, LucideIcon, ExternalLink, Github, Globe, Clock, FlaskConical } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { BaseCard } from '@/components/ui/BaseCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ActionButton } from '@/components/ui/ActionButton';
import { useResearch } from './useResearch';
import { cardVariants } from '@/lib/variants';
import { ResearchTool } from '@/config/research-tools';



function getToolIcon(tool: ResearchTool): LucideIcon {
  if (tool.category.includes('DevAI')) return Cpu;
  if (tool.id.includes('scraper') || tool.id.includes('pipeline')) return Activity;
  if (tool.id.includes('hrm')) return Globe;
  return Search;
}

function ToolImage({ tool, baseUrl }: { tool: ResearchTool; baseUrl: string }) {
  if (!tool.image) return null;

  const src = tool.image.startsWith('/') ? `${baseUrl}${tool.image}` : tool.image;
  const alt = tool.imageAlt || `Screenshot of the ${tool.title} interface preview`;

  return (
    <Box width="full" height={40} overflow="hidden" radius="t-md" borderColor="white/8" position="relative" display="block">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover object-top opacity-heavy hover:opacity-100 transition-opacity duration-500"
      />
      <Box position="absolute" top={2} right={2} zIndex={10}>
        <Text
          size="micro"
          weight="font-bold"
          uppercase
          tracking="widest"
          paddingX={3}
          paddingY={1}
          radius="full"
          className={tool.id === 'boomtick-blog' ? "bg-brand-tag-infra-bg text-brand-tag-infra-text" : "bg-brand-tag-ai-bg text-brand-tag-ai-text"}
        >
          {tool.id === 'boomtick-blog' ? 'Active dev' : 'Flagship'}
        </Text>
      </Box>
    </Box>
  );
}


function ToolCard({ tool, navigate }: {
  tool: ResearchTool;
  navigate: (path: string) => void;
}) {
  return (
    <Stack
      as="button"
      onClick={() => navigate(tool.canonicalPath || `/research/${tool.id}`)}
      padding={6} paddingBottom={10} gap={4} height="full" align="start" textAlign="left"
      className={cardVariants({ interactive: true })}
    >
      <Stack gap={4} width="full">
        <Box display="flex" justify="between" align="start" width="full">
          <Box width={10} height={10} surface="muted" border radius="md" display="flex" align="center" justify="center" borderColor="accent/10">
            <Icon icon={getToolIcon(tool)} size="md" color="dim" />
          </Box>
          <Text size="micro" weight="font-bold" uppercase tracking="widest" color="accent">{tool.status}</Text>
        </Box>
        <Stack gap={3}>
          <Stack gap={1}>
            <Text variant="mono" size="micro" color="dim" weight="font-bold" uppercase tracking="widest" opacityVariant="subtle">{tool.category}</Text>
            <Text variant="display" size="xl" weight="font-black">{tool.title}</Text>
          </Stack>
          <Text size="micro" color="accent" weight="font-normal" uppercase tracking="tighter">{tool.subtitle}</Text>
          <Text size="sm" color="dim">{tool.description}</Text>
          <Box display="flex" wrap="wrap" gap={2} marginTop={2}>
            {tool.tags.map(tag => (
              <Text key={tag} variant="mono" size="micro" paddingX={2} paddingY={0.5} radius="sm" color="dim" className="flagship-tag">{tag}</Text>
            ))}
          </Box>
        </Stack>
      </Stack>
      <Box display="flex" align="center" gap={2} marginTop="auto">
        <Text weight="font-bold" size="xs" uppercase tracking="widest" color="accent">View Assets</Text>
        <Icon icon={ArrowRight} size="md" color="accent" />
      </Box>
    </Stack>
  );
}

export default function ResearchAnalytics() {
  const navigate = useNavigate();
  const { studies, tools } = useResearch();
  const baseUrl = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

  const flagshipTools = tools.filter(t => t.taxonomyBucket === 'flagship' || t.isFlagship);
  const engineeringTools = tools.filter(t => t.taxonomyBucket === 'engineering');
  const dataContentTools = tools.filter(t => t.taxonomyBucket === 'data-content');
  const e_commerceTools = tools.filter(t => t.taxonomyBucket === 'e-commerce');

  return (
    <Box as="section">
      <SEO
        title="DevAI Portfolio"
        description="DevAI portfolio by Ariel Anders. High-fidelity automation featuring AI-assisted GitHub PR review agents, data scraping pipelines, Vercel deployments, ecommerce automation, and production React/Vite systems."
        keywords="DevAI, AI engineering, portfolio, GitHub Actions automation, LLM workflows, React, Vite, TypeScript, technical hiring"
      />
      <Stack gap={16}>
        <Stack gap={2}>
          <PageHeader
            label="HIRE_ME"
            title="DevAI Portfolio"
            as="h1"
            paddingBottom={0}
            border="none"
          />
          <Text variant="body" size={{ base: "lg", lg: "xl" }} color="dim" maxWidth="prose" leading="relaxed">
            MIT PhD and former Waymo senior engineer. I build AI-assisted infrastructure — agentic CI/CD, LLM workflows, and developer tooling — grounded in production robotics experience.
          </Text>
          <Stack gap={2} marginTop={4} marginBottom={4}>
            <Box display="flex" align="baseline" gap={2}>
              <Text size="micro" color="dim" uppercase tracking="widest" weight="font-bold" width={14} shrink={0}>Stack</Text>
              <Box display="flex" wrap="wrap" gap={2}>
                {['React', 'Vite', 'TypeScript', 'Python'].map(tag => (
                  <Text key={tag} size="micro" weight="font-bold" paddingX={2} paddingY={0.5} radius="sm" className="bg-brand-tag-stack-bg text-brand-tag-stack-text">{tag}</Text>
                ))}
              </Box>
            </Box>
            <Box display="flex" align="baseline" gap={2}>
              <Text size="micro" color="dim" uppercase tracking="widest" weight="font-bold" width={14} shrink={0}>Infra</Text>
              <Box display="flex" wrap="wrap" gap={2}>
                {['GitHub Actions', 'Vercel', 'Playwright'].map(tag => (
                  <Text key={tag} size="micro" weight="font-bold" paddingX={2} paddingY={0.5} radius="sm" className="bg-brand-tag-infra-bg text-brand-tag-infra-text">{tag}</Text>
                ))}
              </Box>
            </Box>
            <Box display="flex" align="baseline" gap={2}>
              <Text size="micro" color="dim" uppercase tracking="widest" weight="font-bold" width={14} shrink={0}>AI</Text>
              <Box display="flex" wrap="wrap" gap={2}>
                {['LLM Workflows', 'Agentic CI/CD'].map(tag => (
                  <Text key={tag} size="micro" weight="font-bold" paddingX={2} paddingY={0.5} radius="sm" className="bg-brand-tag-ai-bg text-brand-tag-ai-text">{tag}</Text>
                ))}
              </Box>
            </Box>
          </Stack>

          <Stack direction={{ base: "col", sm: "row" }} gap={3} marginTop={2} width={{ base: "full", sm: "auto" }}>
            <ActionButton as="a" href="#flagship" variant="primary" paddingX={6} paddingY={3} uppercase tracking="widest" width={{ base: "full", sm: "auto" }} bg="brand-primary-emerald">
              View Flagship Projects
            </ActionButton>
            <ActionButton as="a" href="#articles" variant="secondary" paddingX={6} paddingY={3} uppercase tracking="widest" width={{ base: "full", sm: "auto" }}>
              Read Implementation Articles
            </ActionButton>
          </Stack>
        </Stack>



        <Stack gap={8} id="flagship" marginTop={2}>
          <Box paddingBottom={2} display="flex" justify="between" align="end" border="b">
            <Text variant="headline" size="2xl" weight="font-black">Flagship Projects</Text>
            <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase tracking="widest" opacityVariant="subtle">CASE STUDIES</Text>
          </Box>
          <Grid cols={{ base: 1, md: 2 }} gap={6}>
            {flagshipTools.map((tool) => (
              <BaseCard
                key={tool.id}
                padding={0}
                gap={0}
                surface="surface"
                radius="md"
                borderColor="white/8"
                border={0.5}
                height="full"
                overflow="hidden"
              >
                <Stack gap={0} height="full">
                  <ToolImage tool={tool} baseUrl={baseUrl} />
                  <Stack gap={3} paddingX={4} paddingTop={3.5} paddingBottom={4} flex={1}>
                    <Box display="flex" justify="between" align="start" width="full">
                      <Box width={10} height={10} surface="muted" border radius="md" display="flex" align="center" justify="center" borderColor="accent/10">
                        <Icon icon={getToolIcon(tool)} size="md" color="accent" />
                      </Box>
                    </Box>

                    <Stack gap={2}>
                      <Stack gap={1}>
                        <Text variant="mono" size="micro" color="brand-primary-emerald" weight="font-bold" uppercase tracking="widest">
                          {tool.subtitle}
                        </Text>
                        <Text variant="display" size="2xl" weight="font-black">
                          {tool.title}
                        </Text>
                      </Stack>
                      <Text variant="body" size="md" color="dim" leading="relaxed">
                        {tool.description}
                      </Text>

                      {tool.id === 'boomtick-blog' && (
                        <Box display="flex" align="start" gap={3} padding={3} surface="alt" radius="md" marginTop={2}>
                          <Icon icon={FlaskConical} size="sm" color="dim" className="shrink-0" />
                          <Text size="xs" color="dim" leading="relaxed">
                            <Text weight="font-bold" color="main">RAG + LLM tooling in active development.</Text> This site is the production environment where those pipelines are being built and validated.
                          </Text>
                        </Box>
                      )}
                    </Stack>

                    <Box display="flex" wrap="wrap" gap={1.5}>
                      {tool.tags.map(tag => (
                        <Text key={tag} variant="mono" size="micro" paddingX={2} paddingY={0.5} radius="sm" color="dim" className="flagship-tag">
                          {tag}
                        </Text>
                      ))}
                    </Box>

                    <Stack direction={{ base: "col", sm: "row" }} gap={2} marginTop={3} width={{ base: "full", sm: "auto" }}>
                      {tool.externalUrl && (
                        <ActionButton
                          as="a"
                          href={tool.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="primary"
                          paddingX={4}
                          paddingY={2}
                          zIndex={20}
                          width={{ base: "full", sm: "auto" }}
                        >
                          <Text weight="font-bold" size="xs" uppercase tracking="widest">
                            {tool.externalLinkDisplayLabel || 'Open Link'}
                          </Text>
                          <Icon icon={ExternalLink} size="sm" />
                        </ActionButton>
                      )}
                      {tool.sourceUrl && (
                        <ActionButton
                          as="a"
                          href={tool.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="secondary"
                          paddingX={4}
                          paddingY={2}
                          zIndex={20}
                          width={{ base: "full", sm: "auto" }}
                        >
                          <Text weight="font-bold" size="xs" uppercase tracking="widest">Source Repo</Text>
                          <Icon icon={Github} size="sm" />
                        </ActionButton>
                      )}
                    </Stack>
                  </Stack>
                </Stack>
              </BaseCard>
            ))}
          </Grid>
        </Stack>

        <Stack gap={4} padding={6} surface="alt" radius="lg">
          <Text size="micro" weight="font-bold" color="dim" uppercase tracking="widest">Why this matters</Text>
          <Text variant="body" size="md" color="dim" leading="relaxed">
            Shipping high-fidelity products requires <Text as="span" weight="font-bold" color="main">practical AI orchestration</Text>, not hype. I focus on engineering systems that keep the developer in the loop while maintaining high standards.
          </Text>
        </Stack>

        {engineeringTools.length > 0 && (
          <Stack gap={12}>
            <Box paddingBottom={4} display="flex" justify="between" align="end" border="b">
              <Text variant="headline" size="2xl" weight="font-black">Engineering Systems</Text>
              <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase tracking="widest" opacityVariant="subtle">{engineeringTools.length} TOOLS</Text>
            </Box>

            <Grid cols={{ base: 1, md: 2, lg: 3 }} gapX={6} gapY={12}>
              {engineeringTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} navigate={navigate} />
              ))}
            </Grid>
          </Stack>
        )}

        {dataContentTools.length > 0 && (
          <Stack gap={12}>
            <Box paddingBottom={4} display="flex" justify="between" align="end" border="b">
              <Text variant="headline" size="2xl" weight="font-black">Data & Content Systems</Text>
              <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase tracking="widest" opacityVariant="subtle">{dataContentTools.length} TOOLS</Text>
            </Box>

            <Grid cols={{ base: 1, md: 2, lg: 3 }} gapX={6} gapY={12}>
              {dataContentTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} navigate={navigate} />
              ))}
            </Grid>
          </Stack>
        )}

        {e_commerceTools.length > 0 && (
          <Stack gap={12}>
            <Box paddingBottom={4} display="flex" justify="between" align="end" border="b">
              <Text variant="headline" size="2xl" weight="font-black">Ecommerce Experiments</Text>
              <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase tracking="widest" opacityVariant="subtle">{e_commerceTools.length} TOOLS</Text>
            </Box>

            <Grid cols={{ base: 1, md: 2, lg: 3 }} gapX={6} gapY={12}>
              {e_commerceTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} navigate={navigate} />
              ))}
            </Grid>
          </Stack>
        )}

        {studies.length > 0 && (
          <Stack gap={12} id="articles">
            <Box paddingBottom={4} display="flex" justify="between" align="end" border="b">
              <Text as="h2" variant="headline" size="2xl" weight="font-black">Articles & Research</Text>
              <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase tracking="widest" opacityVariant="subtle">{studies.length} POSTS</Text>
            </Box>

            <Grid cols={{ base: 1, md: 2 }} gapX={8} gapY={12}>
              {studies.map((study) => (
                <Stack
                  key={study.slug}
                  padding={8}
                  gap={6}
                  onClick={() => {
                    if (study.status === 'published') {
                      navigate(`/research/${study.slug}`);
                    }
                  }}
                  height="full"
                  surface={study.status === 'published' ? 'surface' : 'muted'}
                  className={cardVariants({
                    interactive: study.status === 'published'
                  })}
                  opacity={study.status === 'published' ? 1 : "high"}
                  cursor={study.status === 'published' ? 'pointer' : 'default'}
                >
                  <Stack gap={4}>
                    <Box display="flex" justify="between" align="center">
                      <Text variant="mono" size="micro" color="accent" weight="font-bold" uppercase tracking="widest">{study.category}</Text>
                      {study.status && <StatusBadge label={study.status} />}
                    </Box>

                    <Stack gap={2}>
                      <Text variant="display" size="2xl" weight="font-black">
                        {study.title}
                      </Text>
                      <Box display="flex" align="center" gap={4}>
                      <Text variant="mono" size="micro" color="dim" opacityVariant="muted">{study.date}</Text>
                        {study.readTime && (
                        <Box display="flex" align="center" gap={1} opacityVariant="muted">
                            <Icon icon={Clock} size="xs" color="dim" />
                            <Text variant="mono" size="micro" color="dim">{study.readTime} MIN</Text>
                          </Box>
                        )}
                      </Box>
                    </Stack>

                    <Text variant="body" size="sm" color="dim" clamp={3}>
                      {study.excerpt}
                    </Text>

                    {study.tags && study.tags.length > 0 && (
                      <Box display="flex" wrap="wrap" gap={2}>
                        {study.tags.map(tag => (
                          <Text key={tag} variant="mono" size="micro" paddingX={2} paddingY={0.5} radius="sm" color="dim" className="flagship-tag">
                            {tag}
                          </Text>
                        ))}
                      </Box>
                    )}
                  </Stack>

                  <Box display="flex" align="center" gap={2} marginTop="auto" paddingTop={4}>
                    <Text variant="mono" size="xs" weight="font-bold" uppercase tracking="widest" color="accent">
                      {study.status === 'planned'
                        ? 'Coming Soon'
                        : study.status === 'draft'
                          ? 'Draft in Progress'
                          : 'Read Article'}
                    </Text>
                    <Icon icon={FileText} size="sm" color="accent" />
                  </Box>
                </Stack>
              ))}
            </Grid>
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
