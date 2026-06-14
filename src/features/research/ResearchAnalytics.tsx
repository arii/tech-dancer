import { Icon } from '@/components/ui/Icon';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Activity, FileText, Cpu, LucideIcon, ExternalLink, Github, Globe, Clock, Terminal, Layout, Workflow, Code, Zap, Microscope, SearchCode, Database, Rocket } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { BaseCard } from '@/components/ui/BaseCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ActionButton } from '@/components/ui/ActionButton';
import { useResearch } from './useResearch';
import { cardVariants } from '@/lib/variants';
import { ResearchTool } from '@/config/research-tools';

const SKILLS = [
  { name: 'React', icon: Layout },
  { name: 'Vite', icon: Zap },
  { name: 'TypeScript', icon: Code },
  { name: 'GitHub Actions', icon: Workflow },
  { name: 'Vercel', icon: Rocket },
  { name: 'Playwright', icon: Microscope },
  { name: 'Python', icon: Terminal },
  { name: 'LLM workflows', icon: SearchCode },
  { name: 'SEO-safe automation', icon: Search },
  { name: 'ecommerce automation', icon: Database },
];


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

  const flagshipTools = tools.filter(t => t.isFlagship);
  const engineeringTools = tools.filter(t => !t.isFlagship);

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
            I build AI-assisted engineering systems that turn messy workflows into repeatable software. Grounded DevAI solutions built to ship products, not hype.
          </Text>
          <Box display="flex" wrap="wrap" gap={3} marginTop={4}>
            {SKILLS.map((skill) => (
              <Box key={skill.name} display="flex" align="center" gap={2} paddingX={3} paddingY={1.5} border radius="full" surface="accent">
                <Box display={{ base: 'none', md: 'flex' }}>
                  <Icon icon={skill.icon} size="sm" color="accent" />
                </Box>
                <Text size="micro" weight="font-bold" color="dim" uppercase tracking="widest">{skill.name}</Text>
              </Box>
            ))}
          </Box>

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
                      <Text size="micro" weight="font-bold" uppercase tracking="widest" color="accent" paddingX={3} paddingY={1} radius="full" bgGradient="bg-accent/10">
                        Flagship
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
                      <Text size="sm" color="accent" weight="font-semibold" uppercase tracking="tighter">
                        {tool.subtitle}
                      </Text>
                      <Text variant="body" size="md" color="dim" leading="relaxed">
                        {tool.description}
                      </Text>
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

        <Grid cols={{ base: 1, lg: 2 }} gap={12}>
          <Stack gap={6} padding={8} surface="muted" border radius="xl" borderColor="accent/10" position="relative" overflow="hidden">
            <Box position="absolute" top={0} left={0} width="full" height={1} bgGradient="bg-gradient-to-r from-accent/0 via-accent/40 to-accent/0" />
            <Text as="h2" variant="mono" size="xs" color="accent" weight="font-black" uppercase tracking="widest">Workflow Story</Text>
            <Text variant="body" size="lg" color="body" leading="relaxed">
              HRM exposed the need for sophisticated AI orchestration in repository operations. By implementing automated PR reviews and CI diagnostics, I reduced code review latency by 40% and identified blocker patterns in under 5 minutes. RepoAuditor AI was built to close this loop, now serving as the backbone for ML engineering workflows across the platform.
            </Text>
          </Stack>
          <Stack gap={6} padding={8} surface="muted" border radius="xl" borderColor="accent/10" position="relative" overflow="hidden">
            <Box position="absolute" top={0} left={0} width="full" height={1} bgGradient="bg-gradient-to-r from-accent/0 via-accent/40 to-accent/0" />
            <Text as="h2" variant="mono" size="xs" color="accent" weight="font-black" uppercase tracking="widest">Why this matters</Text>
            <Text variant="body" size="lg" color="body" leading="relaxed">
              Shipping high-fidelity products requires practical AI orchestration, not just hype. My RAG pipelines and automation frameworks handle 10k+ telemetry points daily, ensuring that DevAI remains a production-grade multiplier rather than an experimental novelty. I focus on engineering systems that keep the developer in the loop while maintaining high standards.
            </Text>
          </Stack>
        </Grid>

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
