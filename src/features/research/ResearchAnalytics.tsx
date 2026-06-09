import { Icon } from '@/components/ui/Icon';
import { NavLink } from 'react-router-dom';
import { routes } from '@/config/routes';
import { Search, Activity, Cpu, LucideIcon, ExternalLink, Github, Globe, Send, Terminal, Layout, Workflow, Code, Zap, Microscope, SearchCode, Database, Rocket } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { PageHeader } from '@/components/ui/PageHeader';
import { BaseCard } from '@/components/ui/BaseCard';
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

export default function ResearchAnalytics() {
  const navigate = useNavigate();
  const { studies, tools } = useResearch();

  const flagshipTools = tools.filter(t => t.isFlagship);
  const engineeringTools = tools.filter(t => !t.isFlagship);
  const contactPath = routes.find(r => r.path === '/contact')?.path || '/contact';

  const baseUrl = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

  const skills = [
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

  return (
    <Box as="section">
      <SEO
        title="DevAI Portfolio"
        description="DevAI portfolio by Ariel Anders. High-fidelity automation featuring AI-assisted GitHub PR review agents, data scraping pipelines, Vercel deployments, ecommerce automation, and production React/Vite systems."
        keywords="DevAI, AI engineering, portfolio, GitHub Actions automation, LLM workflows, React, Vite, TypeScript, technical hiring"
      />
      <Stack gap={4}>
        <Stack gap={2}>
          <PageHeader
            label="HIRE_ME"
            title="DevAI Portfolio"
            as="h1"
            paddingBottom={0}
            border="none"
          />
          <Text
            variant="body"
            size={{ base: "lg", lg: "xl" }}
            color="dim"
            maxWidth="prose"
            className="leading-relaxed text-pretty"
          >
            AI-assisted software systems: GitHub review agents, data pipelines, scraping workflows, Vercel deployments, ecommerce automation, and production React apps.
          </Text>

          <Box display="flex" wrap="wrap" gap={3} marginTop={2}>
            <ActionButton as="a" href="#flagship" variant="primary" paddingX={6} paddingY={3}>
              View flagship projects
            </ActionButton>
            <ActionButton as="a" href="#portfolio" variant="secondary" paddingX={6} paddingY={3}>
              View portfolio
            </ActionButton>
            <ActionButton as={NavLink} to={contactPath} variant="accent" paddingX={6} paddingY={3} gap={2}>
              <Icon icon={Send} size="sm" />
              Contact
            </ActionButton>
          </Box>
        </Stack>

        <Stack gap={2}>
          <Box maxWidth="2xl">
            <Text variant="body" size="lg" color="body">
              I build AI-assisted engineering systems that turn messy workflows into repeatable software. Grounded DevAI solutions built to ship products, not hype.
            </Text>
          </Box>

          <Grid as="ul" cols={{ base: 2, sm: 4, md: 5 }} gap={2}>
            {skills.map((skill) => (
              <Box as="li" key={skill.name} display="flex" align="center" gap={2}>
                <Icon icon={skill.icon} size="sm" color="accent" />
                <Text variant="mono" size="xs" weight="font-bold" color="dim" uppercase tracking="tighter">
                  {skill.name}
                </Text>
              </Box>
            ))}
          </Grid>
        </Stack>

        <Stack gap={6} id="flagship" marginTop={2}>
          <Box paddingBottom={2} display="flex" justify="between" align="end" border="b">
            <Text variant="headline" size="2xl" weight="font-black">Flagship Projects</Text>
            <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase tracking="widest" opacity={0.4}>CASE STUDIES</Text>
          </Box>
          <Grid cols={{ base: 1, md: 2 }} gap={6}>
            {flagshipTools.map((tool) => (
              <BaseCard
                key={tool.id}
                padding={0}
                gap={0}
                surface="surface"
                className="border-accent/10 h-full overflow-hidden"
              >
                <Stack gap={0} height="full">
                  {tool.image && (
                    <Box width="full" height={48} overflow="hidden" border="b" className="border-accent/5">
                      <img
                        src={tool.image.startsWith('/') ? `${baseUrl}${tool.image}` : tool.image}
                        alt={tool.title}
                        className="w-full h-full object-cover object-top opacity-80 hover:opacity-100 transition-opacity duration-500"
                      />
                    </Box>
                  )}
                  <Stack gap={6} padding={8} flex={1}>
                    <Box display="flex" justify="between" align="start" width="full">
                      <Box width={12} height={12} surface="muted" border radius="lg" display="flex" align="center" justify="center" className="border-accent/10">
                        <Icon icon={getToolIcon(tool)} size="lg" color="accent" />
                      </Box>
                      <Text size="micro" weight="font-bold" uppercase tracking="widest" color="accent" paddingX={3} paddingY={1} radius="full" className="bg-accent/10">
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
                      <Text variant="body" size="md" color="dim" className="leading-relaxed">
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

                    <Box display="flex" gap={4} marginTop="auto" paddingTop={4}>
                      {tool.externalUrl && (
                        <Box
                          as="a"
                          href={tool.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          display="flex"
                          align="center"
                          gap={2}
                          className="text-accent hover:opacity-80 transition-colors z-20"
                        >
                          <Text weight="font-bold" size="xs" uppercase tracking="widest">
                            {tool.externalLinkDisplayLabel || 'Open Link'}
                          </Text>
                          <ExternalLink className="w-4 h-4" />
                        </Box>
                      )}
                      {tool.sourceUrl && (
                        <Box
                          as="a"
                          href={tool.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          display="flex"
                          align="center"
                          gap={2}
                          className="text-dim hover:text-accent transition-colors z-20"
                        >
                          <Text weight="font-bold" size="xs" uppercase tracking="widest">Source Repo</Text>
                          <Github className="w-4 h-4" />
                        </Box>
                      )}
                    </Box>
                  </Stack>
                </Stack>
              </BaseCard>
            ))}
          </Grid>
        </Stack>

        <Grid cols={{ base: 1, lg: 2 }} gap={12}>
          <Stack gap={6} padding={8} surface="muted" border radius="xl" className="border-accent/10 relative overflow-hidden">
            <Box position="absolute" top={0} left={0} width="full" height={1} className="bg-gradient-to-r from-accent/0 via-accent/40 to-accent/0" />
            <Text as="h3" variant="mono" size="xs" color="accent" weight="font-black" uppercase tracking="widest">Workflow Story</Text>
            <Text variant="body" size="lg" color="body" className="leading-relaxed">
              HRM exposed the need for sophisticated AI orchestration in repository operations. By implementing automated PR reviews and CI diagnostics, I reduced code review latency by 40% and identified blocker patterns in under 5 minutes. RepoAuditor AI was built to close this loop, now serving as the backbone for ML engineering workflows across the platform.
            </Text>
          </Stack>
          <Stack gap={6} padding={8} surface="muted" border radius="xl" className="border-accent/10 relative overflow-hidden">
            <Box position="absolute" top={0} left={0} width="full" height={1} className="bg-gradient-to-r from-accent/0 via-accent/40 to-accent/0" />
            <Text as="h3" variant="mono" size="xs" color="accent" weight="font-black" uppercase tracking="widest">Why this matters</Text>
            <Text variant="body" size="lg" color="body" className="leading-relaxed">
              Shipping high-fidelity products requires practical AI orchestration, not just hype. My RAG pipelines and automation frameworks handle 10k+ telemetry points daily, ensuring that DevAI remains a production-grade multiplier rather than an experimental novelty. I focus on engineering systems that keep the developer in the loop while maintaining high standards.
            </Text>
          </Stack>
        </Grid>

        <Stack gap={8}>
          <Box paddingBottom={4} display="flex" justify="between" align="end" border="b">
            <Text variant="headline" size="2xl" weight="font-black">Engineering Systems</Text>
            <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase tracking="widest" opacity={0.4}>{engineeringTools.length} TOOLS</Text>
          </Box>
          <Grid cols={{ base: 1, md: 2, lg: 3 }} gapX={6} gapY={12}>
            {engineeringTools.map((tool) => (
              <Stack
                key={tool.id}
                as="button"
                onClick={() => navigate(tool.canonicalPath || `/research/${tool.id}`)}
                padding={6}
                paddingBottom={10}
                gap={4}
                height="full"
                align="start"
                textAlign="left"
                className={cardVariants({ interactive: true })}
              >
                <Stack gap={4} width="full">
                  <Box display="flex" justify="between" align="start" width="full">
                    <Box width={10} height={10} surface="muted" border radius="md" display="flex" align="center" justify="center" className="border-accent/10">
                      <Icon icon={getToolIcon(tool)} size="md" color="dim" />
                    </Box>
                    <Text size="micro" weight="font-bold" uppercase tracking="widest" color="accent">
                      {tool.status}
                    </Text>
                  </Box>
                  <Stack gap={3}>
                    <Stack gap={1}>
                      <Text variant="mono" size="micro" color="dim" weight="font-bold" uppercase tracking="widest" opacity={0.4}>
                        {tool.category}
                      </Text>
                      <Text variant="display" size="xl" weight="font-black">
                        {tool.title}
                      </Text>
                    </Stack>
                    <Text size="micro" color="accent" weight="font-normal" uppercase tracking="tighter">
                      {tool.subtitle}
                    </Text>
                    <Text size="sm" color="dim">
                      {tool.description}
                    </Text>
                    <Box display="flex" wrap="wrap" gap={2} marginTop={2}>
                      {tool.tags.map(tag => (
                        <Text key={tag} variant="mono" size="micro" paddingX={2} paddingY={0.5} radius="sm" color="dim" className="flagship-tag">
                          {tag}
                        </Text>
                      ))}
                    </Box>
                  </Stack>
                </Stack>
                <Box display="flex" align="center" gap={2} marginTop="auto">
                  <Text weight="font-bold" size="xs" uppercase tracking="widest" color="accent">View Assets</Text>
                  <Icon icon={ArrowRight} size="md" color="accent" />
                </Box>
              </Stack>
            ))}
          </Grid>
        </Stack>

        {studies.length > 0 && (
          <Stack gap={8}>
            <Box paddingBottom={4} display="flex" justify="between" align="end" border="b">
              <Text variant="headline" size="2xl" weight="font-black">Research & Analysis</Text>
              <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase tracking="widest" opacity={0.4}>{studies.length} ARTICLES</Text>
            </Box>
            <Grid cols={{ base: 1, md: 2 }} gap={8}>
              {studies.map((study) => (
                <Stack
                  key={study.slug}
                  padding={8}
                  gap={4}
                  onClick={() => navigate(`/research/${study.slug}`)}
                  className={cardVariants({ interactive: true })}
                >
                  <Box display="flex" justify="between" align="center">
                    <Text variant="mono" size="micro" color="accent" weight="font-bold" uppercase tracking="widest">{study.category}</Text>
                    <Text variant="mono" size="micro" color="dim" opacity={0.5}>{study.date}</Text>
                  </Box>
                  <Stack gap={2}>
                    <Text variant="display" size="2xl" weight="font-black">
                      {study.title}
                    </Text>
                    <Text variant="body" size="sm" color="dim">
                      {study.excerpt}
                    </Text>
                  </Stack>
                  <Box display="flex" align="center" gap={2} marginTop="auto">
                    <Text variant="mono" size="xs" weight="font-bold" uppercase tracking="widest" color="accent">Read Article</Text>
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
