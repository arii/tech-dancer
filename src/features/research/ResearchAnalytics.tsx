import { Icon } from '@/components/ui/Icon';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Activity, FileText, Cpu, LucideIcon, ExternalLink, Github, Globe, Clock, FlaskConical, GitPullRequest } from 'lucide-react';
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
  if (tool.id === 'hrm-flagship') {
    return (
      <Box width="full" height={48} display="flex" align="center" justify="center" border="b" borderColor="accent/5" surface="default">
        <Box width={32} height={16} surface="contrast" radius="sm" display="flex" align="center" justify="center">
          <Text color="accent" size="xl" weight="font-bold">♥ 74%</Text>
        </Box>
      </Box>
    );
  }

  if (tool.id === 'repo-auditor-ai') {
    return (
      <Box width="full" height={48} display="flex" align="center" justify="center" border="b" borderColor="accent/5" surface="bg">
        <Stack align="center" gap={1} padding={4} surface="default" border radius="sm" borderColor="accent/10">
          <Icon icon={GitPullRequest} size="lg" color="accent" />
          <Text size="micro" color="dim" uppercase tracking="widest">PR audit</Text>
        </Stack>
      </Box>
    );
  }

  if (tool.id === 'boomtick-blog') {
    return (
      <Box width="full" height={48} display="flex" direction="col" align="center" justify="center" border="b" borderColor="accent/5" surface="bg" gap={2}>
        <Text variant="display" size="2xl" color="white" tracking="tight">
          boom<Text color="warning">tick</Text>.blog
        </Text>
        <Text size="micro" color="dim" uppercase tracking="widest">Dance · Pride · Community</Text>
      </Box>
    );
  }

  if (!tool.image) return null;

  const src = tool.image.startsWith('/') ? `${baseUrl}${tool.image}` : tool.image;
  const alt = tool.imageAlt || `Screenshot of the ${tool.title} interface preview`;

  return (
    <Box width="full" height={48} overflow="hidden" border="b" borderColor="accent/5">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover object-top opacity-heavy hover:opacity-100 transition-opacity duration-500"
      />
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
            Senior roboticist and MIT PhD. I ship production robotics systems and build AI-assisted engineering infrastructure — agentic CI/CD, LLM workflows, and developer tooling. Open to Staff SWE roles, robotics contracts, and DevAI consulting.
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
              <Text size="micro" color="dim" uppercase tracking="widest" weight="font-bold" width={14} shrink={0}>Robotics</Text>
              <Box display="flex" wrap="wrap" gap={2}>
                {['ROS1/2', 'C++', 'Navigation', 'Localization'].map(tag => (
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
            <ActionButton as="a" href="#flagship" variant="primary" paddingX={6} paddingY={3} uppercase tracking="widest" width={{ base: "full", sm: "auto" }}>
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
                borderColor="accent/10"
                height="full"
                overflow="hidden"
              >
                <Stack gap={0} height="full">
                  <ToolImage tool={tool} baseUrl={baseUrl} />
                  <Stack gap={6} padding={8} flex={1}>
                    <Box display="flex" justify="between" align="start" width="full">
                      <Box width={12} height={12} surface="muted" border radius="lg" display="flex" align="center" justify="center" borderColor="accent/10">
                        <Icon icon={getToolIcon(tool)} size="lg" color="accent" />
                      </Box>
                      <Text
                        size="micro"
                        weight="font-bold"
                        uppercase
                        tracking="widest"
                        paddingX={3}
                        paddingY={1}
                        radius="full"
                        className={tool.id === 'boomtick-blog' ? "bg-brand-tag-infra-bg text-brand-tag-infra-text" : "bg-accent/10 text-accent"}
                      >
                        {tool.id === 'boomtick-blog' ? 'Active dev' : 'Flagship'}
                      </Text>
                    </Box>

                    <Stack gap={3}>
                      <Stack gap={1}>
                        <Text variant="mono" size="micro" color="accent" weight="font-bold" uppercase tracking="widest">
                          {tool.category}
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

                    <Box display="flex" wrap="wrap" gap={2}>
                      {tool.tags.map(tag => (
                        <Text key={tag} variant="mono" size="micro" paddingX={2} paddingY={1} radius="sm" color="dim" className="flagship-tag">
                          {tag}
                        </Text>
                      ))}
                    </Box>

                    <Stack direction={{ base: "col", sm: "row" }} gap={4} marginTop="auto" paddingTop={4} width={{ base: "full", sm: "auto" }}>
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

        <Stack gap={6} padding={8} surface="muted" radius="xl" border borderColor="accent/10">
          <Text variant="headline" size="2xl" weight="font-black">Work with me</Text>
          <Text variant="body" size="lg" color="dim" leading="relaxed">
            These are my own projects — built to solve real problems I care about. If you need a senior roboticist, DevAI engineering infrastructure, or someone who can do both, I'm available for project-based contracts and full-time roles.
          </Text>
          <Box display="flex" align="center" gap={4}>
            <ActionButton as="a" href="mailto:ariel.anders@gmail.com" variant="ghost" padding={0}>
              Email
            </ActionButton>
            <Text color="dim" opacityVariant="subtle">·</Text>
            <ActionButton as="a" href="https://linkedin.com/in/ariel-anders" target="_blank" variant="ghost" padding={0}>
              LinkedIn
            </ActionButton>
            <Text color="dim" opacityVariant="subtle">·</Text>
            <ActionButton as="a" href="https://github.com/arii" target="_blank" variant="ghost" padding={0}>
              GitHub
            </ActionButton>
          </Box>
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
