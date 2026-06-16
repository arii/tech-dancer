// impeccable-ignore-file
import { Icon } from '@/components/ui/Icon';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Activity, FileText, Cpu, LucideIcon, ExternalLink, Github, Globe, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { BaseCard } from '@/components/ui/BaseCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ActionButton } from '@/components/ui/ActionButton';
import { useResearch } from './useResearch';
import { cardVariants } from '@/lib/variants';
import { ResearchTool } from '@/config/research-tools';
import { SOCIAL_LINKS } from '@/config/constants';



function getToolIcon(tool: ResearchTool): LucideIcon {
  if (tool.category.includes('DevAI')) return Cpu;
  if (tool.id.includes('scraper') || tool.id.includes('pipeline')) return Activity;
  if (tool.id.includes('hrm')) return Globe;
  return Search;
}

function ToolImage({ tool, baseUrl }: { tool: ResearchTool; baseUrl: string }) {
  if (tool.id === 'boomtick-blog') {
    return (
      <Box width="full" className="card-screenshot-wrapper boomtick-blog-preview border-b border-white/8">
        <Stack gap={1} className="preview-content">
          <Text className="preview-logo">
            boom<span className="logo-accent">tick</span><span className="logo-dot font-light">.blog</span>
          </Text>
          <Text className="preview-headline">
            Built for dancers.<br />
            <span className="headline-accent">Train smarter.</span><br />
            Travel better.
          </Text>
          <Text className="preview-tagline">
            Training notes, gear reviews, and WCS guides.
          </Text>
        </Stack>
      </Box>
    );
  }

  if (!tool.image) return null;

  const src = tool.image.startsWith('/') ? `${baseUrl}${tool.image}` : tool.image;
  const alt = tool.imageAlt || `Screenshot of the ${tool.title} interface preview`;

  return (
    <Box width="full" className="card-screenshot-wrapper border-b border-white/8">
      <img
        src={src}
        alt={alt}
        className="opacity-heavy hover:opacity-100 transition-opacity duration-500"
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
      height="full" align="start" textAlign="left" gap={0}
      className={cn(cardVariants({ interactive: true }), "pt-[14px] px-4 pb-4")}
    >
      <Stack gap={0} width="full">
        <Box display="flex" justify="between" align="start" width="full" marginBottom={3}>
          <Box width={10} height={10} surface="muted" radius="md" display="flex" align="center" justify="center" className="border border-white/8">
            <Icon icon={getToolIcon(tool)} size="md" color="dim" />
          </Box>
          <Text size="micro" weight="font-bold" uppercase tracking="widest" color="accent">{tool.status}</Text>
        </Box>
        <Text variant="mono" size="micro" color="dim" weight="font-bold" uppercase tracking="widest" opacityVariant="subtle" marginBottom={1}>{tool.category}</Text>
        <Text variant="display" size="xl" weight="font-black" marginBottom={2}>{tool.title}</Text>
        {tool.subtitle && (
          <Text size="micro" color="accent" weight="font-normal" uppercase tracking="tighter" marginBottom={2}>{tool.subtitle}</Text>
        )}
        <Text size="sm" color="dim" marginBottom={3}>{tool.description}</Text>
        <Box display="flex" wrap="wrap" gap={1.5} marginBottom={3}>
          {tool.tags.map(tag => (
            <Text key={tag} className="flagship-tag">{tag}</Text>
          ))}
        </Box>
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
              <Text size="micro" color="dim" uppercase tracking="widest" weight="font-bold" width={24} shrink={0}>Stack</Text>
              <Box display="flex" wrap="wrap" gap={2}>
                {['React', 'Vite', 'TypeScript', 'Python'].map(tag => (
                  <Text key={tag} size="micro" weight="font-bold" paddingX={2} paddingY={0.5} radius="sm" className="bg-[#3C3489]/10 text-[#a78bfa] border border-[#3C3489]/20">{tag}</Text>
                ))}
              </Box>
            </Box>
            <Box display="flex" align="baseline" gap={2}>
              <Text size="micro" color="dim" uppercase tracking="widest" weight="font-bold" width={24} shrink={0}>Infra</Text>
              <Box display="flex" wrap="wrap" gap={2}>
                {['GitHub Actions', 'Vercel', 'Playwright'].map(tag => (
                  <Text key={tag} size="micro" weight="font-bold" paddingX={2} paddingY={0.5} radius="sm" className="bg-[#085041]/10 text-[#34d399] border border-[#085041]/20">{tag}</Text>
                ))}
              </Box>
            </Box>
            <Box display="flex" align="baseline" gap={2}>
              <Text size="micro" color="dim" uppercase tracking="widest" weight="font-bold" width={24} shrink={0}>Robotics</Text>
              <Box display="flex" wrap="wrap" gap={2}>
                {['ROS1/2', 'C++', 'Navigation', 'Localization'].map(tag => (
                  <Text key={tag} size="micro" weight="font-bold" paddingX={2} paddingY={0.5} radius="sm" className="bg-[#085041]/10 text-[#22d3ee] border border-[#085041]/20">{tag}</Text>
                ))}
              </Box>
            </Box>
            <Box display="flex" align="baseline" gap={2}>
              <Text size="micro" color="dim" uppercase tracking="widest" weight="font-bold" width={24} shrink={0}>AI</Text>
              <Box display="flex" wrap="wrap" gap={2}>
                {['LLM Workflows', 'Agentic CI/CD'].map(tag => (
                  <Text key={tag} size="micro" weight="font-bold" paddingX={2} paddingY={0.5} radius="sm" className="bg-[#633806]/10 text-[#fbbf24] border border-[#633806]/20">{tag}</Text>
                ))}
              </Box>
            </Box>
          </Stack>

          <Stack direction={{ base: "col", sm: "row" }} gap={3} marginTop={2} width={{ base: "full", sm: "auto" }}>
            <ActionButton as="a" href="#flagship" variant="primary" paddingX={6} paddingY={3} width={{ base: "full", sm: "auto" }}>
              View Flagship Projects
            </ActionButton>
            <ActionButton as="a" href="#articles" variant="secondary" paddingX={6} paddingY={3} width={{ base: "full", sm: "auto" }}>
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
                height="full"
                overflow="hidden"
              >
                <Stack gap={0} height="full">
                  <ToolImage tool={tool} baseUrl={baseUrl} />
                  <Stack flex={1} className="pt-[14px] px-4 pb-4" gap={0}>
                    <Box display="flex" justify="between" align="start" width="full" marginBottom={3}>
                      <Box width={12} height={12} surface="muted" radius="lg" display="flex" align="center" justify="center" className="border border-white/8">
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
                        className={tool.id === 'boomtick-blog' ? "bg-[#E1F5EE] text-[#085041]" : "bg-accent/10 text-accent"}
                      >
                        {tool.id === 'boomtick-blog' ? 'Active dev' : 'Flagship'}
                      </Text>
                    </Box>

                    <Text variant="mono" size="micro" color="accent" weight="font-bold" uppercase tracking="widest" marginBottom={1}>
                      {tool.category}
                    </Text>
                    <Text variant="display" size="2xl" weight="font-black" marginBottom={2}>
                      {tool.title}
                    </Text>
                    {tool.subtitle && (
                      <Text size="sm" color="accent" weight="font-semibold" uppercase tracking="tighter" marginBottom={2}>
                        {tool.subtitle}
                      </Text>
                    )}
                    <Text variant="body" size="md" color="dim" leading="relaxed" marginBottom={3}>
                      {tool.description}
                    </Text>

                    {tool.id === 'boomtick-blog' && (
                      <div className="in-dev-banner">
                        <i className="ti ti-flask" aria-hidden="true"></i>
                        <p>
                          <strong>RAG + LLM tooling in active development.</strong>
                          This site is the production environment where those pipelines
                          are being built and validated.
                        </p>
                      </div>
                    )}

                    <Box display="flex" wrap="wrap" gap={1.5} marginBottom={3}>
                      {tool.tags.map(tag => (
                        <Text key={tag} className="flagship-tag">
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
                          {tool.externalLinkDisplayLabel || 'Open Link'}
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
                          Source Repo
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

        <Box className="why-this-matters">
          <Text className="label">Why this matters</Text>
          <Text as="p">
            Shipping high-fidelity products requires <Text weight="font-bold" color="main">practical AI orchestration</Text>, not hype. I focus on engineering systems that keep the developer in the loop while maintaining high standards.
          </Text>
        </Box>

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
                  onClick={() => {
                    if (study.status === 'published') {
                      navigate(`/research/${study.slug}`);
                    }
                  }}
                  height="full"
                  surface={study.status === 'published' ? 'surface' : 'muted'}
                  className={cn(cardVariants({
                    interactive: study.status === 'published'
                  }), "pt-[14px] px-4 pb-4")}
                  opacity={study.status === 'published' ? 1 : "high"}
                  cursor={study.status === 'published' ? 'pointer' : 'default'}
                  gap={0}
                >
                  <Box display="flex" justify="between" align="center" marginBottom={3} width="full">
                    <Text variant="mono" size="micro" color="accent" weight="font-bold" uppercase tracking="widest">{study.category}</Text>
                    {study.status && <StatusBadge label={study.status} />}
                  </Box>

                  <Text variant="display" size="2xl" weight="font-black" marginBottom={2}>
                    {study.title}
                  </Text>
                  <Box display="flex" align="center" gap={4} marginBottom={3}>
                    <Text variant="mono" size="micro" color="dim" opacityVariant="muted">{study.date}</Text>
                    {study.readTime && (
                      <Box display="flex" align="center" gap={1} opacityVariant="muted">
                        <Icon icon={Clock} size="xs" color="dim" />
                        <Text variant="mono" size="micro" color="dim">{study.readTime} MIN</Text>
                      </Box>
                    )}
                  </Box>

                  <Text variant="body" size="sm" color="dim" clamp={3} marginBottom={3}>
                    {study.excerpt}
                  </Text>

                  {study.tags && study.tags.length > 0 && (
                    <Box display="flex" wrap="wrap" gap={1.5} marginBottom={3}>
                      {study.tags.map(tag => (
                        <Text key={tag} className="flagship-tag">
                          {tag}
                        </Text>
                      ))}
                    </Box>
                  )}

                  <Box display="flex" align="center" gap={2} marginTop="auto">
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

        <Grid cols={{ base: 1, md: 12 }} gap={8} padding={8} surface="muted" radius="xl" className="border border-line/20" id="work-with-me">
          {/* Contact Details Column */}
          <Stack gap={4} span={{ base: 12, md: 5 }}>
            <Box paddingBottom={2} className="border-b border-line/10">
              <Text variant="headline" size="2xl" weight="font-black">Work with me</Text>
            </Box>
            <Box display="flex" align="center" gap={4} wrap="wrap" marginTop={2}>
              <Box as="a" href="mailto:anders.ariel@gmail.com" className="hover:text-accent transition-colors">
                <Text variant="mono" size="xs" weight="font-bold" color="accent" uppercase tracking="widest">Email</Text>
              </Box>
              <Text color="dim" opacityVariant="muted" size="xs">·</Text>
              <Box as="a" href={SOCIAL_LINKS.LINKEDIN} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <Text variant="mono" size="xs" weight="font-bold" color="accent" uppercase tracking="widest">LinkedIn</Text>
              </Box>
              <Text color="dim" opacityVariant="muted" size="xs">·</Text>
              <Box as="a" href={SOCIAL_LINKS.GITHUB} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <Text variant="mono" size="xs" weight="font-bold" color="accent" uppercase tracking="widest">GitHub</Text>
              </Box>
            </Box>
          </Stack>

          {/* Description Column */}
          <Stack gap={4} span={{ base: 12, md: 7 }} justify="center">
            <Text variant="body" size="lg" color="dim" leading="relaxed">
              These are my own projects — built to solve real problems I care about.
              If you need a senior roboticist, DevAI engineering infrastructure,
              or someone who can do both, I'm available for project-based contracts
              and full-time roles.
            </Text>
          </Stack>
        </Grid>
      </Stack>
    </Box>
  );
}
