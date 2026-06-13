import { Icon } from '@/components/ui/Icon';
import { useNavigate, NavLink } from 'react-router-dom';
import { routes } from '@/config/routes';
import { Search, ArrowRight, Activity, FileText, Cpu, LucideIcon, ExternalLink, Github, Globe, Clock, Send, Terminal, Layout, Workflow, Code, Zap, Microscope, SearchCode, Database, Rocket } from 'lucide-react';
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
    <Box width="full" height={48} overflow="hidden" border="b" className="border-accent/5">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover object-top opacity-heavy hover:opacity-100 transition-opacity duration-500"
      />
    </Box>
  );
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
          <Text variant="body" size={{ base: "lg", lg: "xl" }} color="dim" maxWidth="prose" className="leading-relaxed text-pretty">
            I build AI-assisted engineering systems that turn messy workflows into repeatable software. Grounded DevAI solutions built to ship products, not hype.
          </Text>
          <Box display="flex" wrap="wrap" gap={3} marginTop={4}>
            {skills.map((skill) => (
              <Box key={skill.name} display="flex" align="center" gap={2} paddingX={3} paddingY={1.5} border radius="sm" className="border-accent/10 bg-surface-alt">
                <Box display={{ base: 'none', md: 'flex' }}>
                  <Icon icon={skill.icon} size="sm" color="accent-teal" />
                </Box>
                <Text variant="mono" size="micro" weight="font-bold" color="accent-teal" uppercase tracking="widest">
                  {skill.name}
                </Text>
              </Box>
            ))}
          </Box>

          <Stack direction={{ base: "col", sm: "row" }} gap={3} marginTop={2} width="full" className="sm:w-auto">
            <ActionButton as="a" href="#flagship" variant="primary" paddingX={6} paddingY={3} uppercase tracking="widest" className="w-full sm:w-auto">
              View Flagship Projects
            </ActionButton>
            <ActionButton as="a" href="#articles" variant="secondary" paddingX={6} paddingY={3} uppercase tracking="widest" className="w-full sm:w-auto">
              Read Implementation Articles
            </ActionButton>
            <ActionButton as={NavLink} to={contactPath} variant="accent" paddingX={6} paddingY={3} gap={2} uppercase tracking="widest" className="w-full sm:w-auto">
              <Icon icon={Send} size="sm" />
              Contact
            </ActionButton>
          </Stack>
        </Stack>



        <Stack gap={6} id="flagship" marginTop={8}>
          <Box position="sticky" top={16} zIndex="docked" className="bg-bg/90 backdrop-blur-md py-4 border-b">
            <Box display="flex" justify="between" align="end">
              <Text variant="headline" size="2xl" weight="font-black">Flagship Projects</Text>
              <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase tracking="widest" opacityVariant="subtle">CASE STUDIES</Text>
            </Box>
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
                  <ToolImage tool={tool} baseUrl={baseUrl} />
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

                    <Stack direction={{ base: "col", sm: "row" }} gap={4} marginTop="auto" paddingTop={4} width="full" className="sm:w-auto">
                      {tool.externalUrl && (
                        <ActionButton
                          as="a"
                          href={tool.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="primary"
                          paddingX={4}
                          paddingY={2}
                          className="z-20 w-full sm:w-auto"
                        >
                          <span className="font-bold text-xs uppercase tracking-widest">
                            {tool.externalLinkDisplayLabel || 'Open Link'}
                          </span>
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
                          className="z-20 w-full sm:w-auto"
                        >
                          <span className="font-bold text-xs uppercase tracking-widest">Source Repo</span>
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

        <Box padding={12} surface="muted" border radius="xl" className="border-accent-amber/20 relative overflow-hidden mt-12">
          <Box position="absolute" top={0} left={0} width={1.5} height="full" className="bg-accent-amber shadow-[0_0_15px_rgba(251,191,36,0.3)]" />
          <Text as="h2" variant="mono" size="xs" color="accent-amber" weight="font-black" uppercase tracking="widest" marginBottom={6}>The DevAI Philosophy</Text>
          <Text variant="display" size="2xl" color="white" className="italic font-medium leading-relaxed max-width-3xl">
            &ldquo;Shipping high-fidelity products requires practical AI orchestration, not just hype. My systems handle 10k+ telemetry points daily, ensuring that AI remains a production-grade multiplier rather than an experimental novelty. I build engineering systems that keep the developer in the loop while maintaining uncompromising standards.&rdquo;
          </Text>
        </Box>

        <Stack gap={8}>
          <Box id="systems" paddingBottom={4} display="flex" justify="between" align="end" border="b" marginTop={16}>
            <Text variant="headline" size="2xl" weight="font-black">Engineering Systems</Text>
            <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase tracking="widest" opacityVariant="subtle">{engineeringTools.length} TOOLS</Text>
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
                    <Box display="flex" align="center" gap={2}>
                       <Box width={2} height={2} radius="full" className={tool.status === 'ACTIVE' ? 'bg-accent-teal' : 'bg-accent-amber'} />
                       <Text size="micro" weight="font-bold" uppercase tracking="widest" color={tool.status === 'ACTIVE' ? 'accent-teal' : 'accent-amber'}>
                         {tool.status}
                       </Text>
                    </Box>
                  </Box>
                  <Stack gap={3}>
                    <Stack gap={1}>
                      <Text variant="mono" size="micro" color="dim" weight="font-bold" uppercase tracking="widest" opacityVariant="subtle">
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
          <Stack gap={8} id="articles">
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
                  className={cardVariants({
                    interactive: study.status === 'published',
                    surface: study.status === 'published' ? 'surface' : 'muted'
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
                            <Clock size={12} className="text-dim" />
                            <Text variant="mono" size="micro" color="dim">{study.readTime} MIN</Text>
                          </Box>
                        )}
                      </Box>
                    </Stack>

                    <Text variant="body" size="sm" color="dim" className="line-clamp-3">
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
