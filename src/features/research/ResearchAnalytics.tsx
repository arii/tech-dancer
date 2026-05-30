import { Icon } from '@/components/ui/Icon';
import { useNavigate, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Search, ArrowRight, Activity, FileText, Cpu, LucideIcon, ExternalLink, Globe, CheckCircle2 } from 'lucide-react';
import { Box, Stack, Text, Grid, Button } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { BaseCard } from '@/components/ui/BaseCard';
import { Tag } from '@/components/ui/Tag';
import { useResearch } from './useResearch';
import { cardVariants } from '@/lib/variants';
import { ResearchTool, ResearchCTA } from '@/config/research-tools';

function getToolIcon(tool: ResearchTool): LucideIcon {
  if (tool.category.includes('DevAI')) return Cpu;
  if (tool.id.includes('scraper') || tool.id.includes('pipeline')) return Activity;
  if (tool.id.includes('hrm')) return Globe;
  if (tool.id.includes('boomtick')) return Globe;
  return Search;
}

const baseUrl = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

function ToolImage({ tool, className }: { tool: ResearchTool; className?: string }) {
  if (!tool.image) return null;
  const src = tool.image.startsWith('/') ? `${baseUrl}${tool.image}` : tool.image;
  return (
    <Box
      span={{ base: 1, md: 2 }}
      height={{ base: 32, md: 'full' }}
      overflow="hidden"
      border={{ base: 'b', md: 'r' }}
      surface="muted"
      className={cn("border-accent/5 opacity-80", className)}
    >
      <img
        src={src}
        alt={`${tool.title} interface preview`}
        loading="lazy"
        className="w-full h-full object-cover object-top hover:opacity-100 transition-opacity duration-500"
      />
    </Box>
  );
}

function ToolCTA({ cta }: { cta: ResearchCTA }) {
  const isExternal = cta.isExternal;
  const variant = cta.variant || 'outline';

  return (
    <Button
      as={isExternal ? 'a' : Link}
      href={isExternal ? cta.url : undefined}
      to={!isExternal ? cta.url : undefined}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      variant={variant}
      size="sm"
      gap={2}
    >
      {cta.label}
      {isExternal && <Icon icon={ExternalLink} size="xs" />}
    </Button>
  );
}

function FlagshipCard({ tool }: { tool: ResearchTool }) {
  return (
    <BaseCard
      padding={0}
      gap={0}
      surface="surface"
      className="border-accent/10 h-full overflow-hidden"
    >
      <Grid cols={{ base: 1, md: 5 }} gap={0} height="full">
        <ToolImage tool={tool} />
        <Stack
          span={{ base: 1, md: tool.image ? 3 : 5 }}
          gap={{ base: 4, md: 6 }}
          padding={{ base: 6, md: 8 }}
          flex={1}
          className="min-w-0" // Prevent horizontal overflow
        >
          <Box display="flex" justify="between" align="start" width="full">
            <Box width={12} height={12} surface="muted" border radius="lg" display="flex" align="center" justify="center" className="border-accent/10">
              <Icon icon={getToolIcon(tool)} size="lg" color="accent" />
            </Box>
            <Text size="micro" weight="font-bold" uppercase tracking="widest" color="accent" paddingX={3} paddingY={1} radius="full" className="bg-accent/10">
              Flagship
            </Text>
          </Box>

          <Stack gap={4}>
            <Stack gap={1}>
              <Text variant="mono" size="micro" color="accent" weight="font-bold" uppercase tracking="widest">
                {tool.category}
              </Text>
              <Text variant="display" size="2xl" weight="font-black">
                {tool.title}
              </Text>
              <Text size="sm" color="accent" weight="font-semibold" uppercase tracking="tighter">
                {tool.subtitle}
              </Text>
            </Stack>

            <Text variant="body" size="md" color="dim" className="leading-relaxed">
              {tool.description}
            </Text>

            {tool.proves && (
              <Stack gap={2}>
                <Text variant="mono" size="micro" color="dim" weight="font-bold" uppercase tracking="widest" opacity={0.6}>
                  Proves
                </Text>
                <Grid cols={{ base: 1, sm: 2 }} gapX={4} gapY={1.5}>
                  {tool.proves.map(item => (
                    <Box key={item} display="flex" align="center" gap={2}>
                      <Icon icon={CheckCircle2} size="xs" color="accent" className="opacity-50" />
                      <Text size="xs" color="body" weight="font-medium">{item}</Text>
                    </Box>
                  ))}
                </Grid>
              </Stack>
            )}
          </Stack>

          <Stack gap={3} marginTop="auto" paddingTop={4}>
            <Box display="flex" wrap="wrap" gap={2}>
              {tool.tags.map(tag => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </Box>

            <Box display="flex" wrap="wrap" gap={3}>
              {tool.ctas?.map((cta) => (
                <ToolCTA key={cta.url} cta={cta} />
              ))}
            </Box>
          </Stack>
        </Stack>
      </Grid>
    </BaseCard>
  );
}

function EngineeringToolCard({ tool }: { tool: ResearchTool }) {
  return (
    <Stack
      as={Link}
      to={tool.canonicalPath || `/research/${tool.id}`}
      padding={6}
      paddingBottom={10}
      gap={4}
      height="full"
      align="start"
      textAlign="left"
      className={cn(cardVariants({ interactive: true }), "min-w-0")} // Prevent overflow
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
                  <Tag key={tag} variant="compact">{tag}</Tag>
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

  const flagshipTools = tools.filter(t => t.isFlagship);
  const engineeringTools = tools.filter(t => !t.isFlagship);

  return (
    <Box as="section">
      <SEO
        title="DevAI Portfolio | AI Orchestration & ML Engineering"
        description="Showcase of AI-assisted product development, DevAI orchestration consoles, and high-fidelity RAG telemetry pipelines."
      />
      <Stack gap={12}>
        <PageHeader
          label="DEVAI_PORTFOLIO"
          title="DevAI Portfolio as a Platform"
          description="Real-world examples of AI-assisted product development, DevAI orchestration consoles, and high-fidelity telemetry pipelines."
          as="h1"
        />

        <Box maxWidth="2xl">
          <Text variant="body" size="lg" color="body">
            Grounded DevAI solutions built to ship products, not hype. From <strong>custom RAG pipelines</strong> to <strong>autonomous repository auditing</strong>, these projects demonstrate practical applications of prompt engineering and agentic workflows in modern software engineering.
          </Text>
        </Box>

        <Stack gap={8}>
          <Box paddingBottom={4} display="flex" justify="between" align="end" border="b">
            <Text variant="headline" size="2xl" weight="font-black">Featured Outputs</Text>
            <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase tracking="widest" opacity={0.4}>FLAGSHIP PROJECTS</Text>
          </Box>
          <Grid cols={1} gap={8}>
            {flagshipTools.map((tool) => (
              <FlagshipCard key={tool.id} tool={tool} />
            ))}
          </Grid>
        </Stack>

        <Grid cols={{ base: 1, lg: 2 }} gap={12}>
          <Stack gap={6}>
            <Text variant="mono" size="xs" color="accent" weight="font-black" uppercase tracking="widest">Workflow Story</Text>
            <Text variant="body" size="lg" color="body" className="leading-relaxed">
              HRM exposed the need for sophisticated <strong>AI orchestration</strong> in repository operations. From automated PR reviews to diagnosing CI failures, the project demanded a <strong>Dev AI</strong> console capable of precise <strong>prompt engineering</strong> and structured agent handoff. <strong>RepoAuditor AI</strong> was built to close this loop, now serving as the backbone for <strong>ML engineering</strong> workflows across tech-dancer/BoomTick.
            </Text>
          </Stack>
          <Stack gap={6}>
            <Text variant="mono" size="xs" color="accent" weight="font-black" uppercase tracking="widest">Why this matters</Text>
            <Text variant="body" size="lg" color="body" className="leading-relaxed">
              Shipping high-fidelity products requires more than just AI hype—it requires practical <strong>AI orchestration</strong> and robust <strong>RAG</strong> pipelines. By focusing on <strong>ML engineering</strong> that keeps the developer in the loop, we maintain high standards while leveraging <strong>Dev AI</strong> to handle high-scale telemetry and complex multi-platform integrations.
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
              <EngineeringToolCard key={tool.id} tool={tool} />
            ))}
          </Grid>
        </Stack>

        {studies.length > 0 && (
          <Stack gap={8}>
            <Box paddingBottom={4} display="flex" justify="between" align="end" border="b">
              <Text variant="headline" size="2xl" weight="font-black">Articles & Research</Text>
              <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase tracking="widest" opacity={0.4}>{studies.length} POSTS</Text>
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
