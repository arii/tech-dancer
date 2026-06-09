import { Icon } from '@/components/ui/Icon';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Tag } from '@/components/ui/Tag';
import { Search, ArrowRight, Activity, FileText, Cpu, LucideIcon, ExternalLink, CheckCircle2, Globe } from 'lucide-react';
import { Box, Stack, Text, Grid, Button } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { BaseCard } from '@/components/ui/BaseCard';
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
      height={{ base: 64, md: 72, lg: 'full' }} // Provide better aspect ratio for screenshots
      overflow="hidden"
      border={{ base: 'b', md: 'r' }}
      surface="muted"
      className={cn("border-accent/5 opacity-80 relative", className)}
    >
      <img
        src={src}
        alt={`${tool.title} interface preview`}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover object-top hover:opacity-100 transition-opacity duration-500"
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
  const isPrimary = tool.id === 'boomtick-blog' || tool.id === 'repo-auditor-ai';

  return (
    <BaseCard
      padding={0}
      gap={0}
      surface={isPrimary ? "muted" : "surface"}
      className={cn(
        "border-accent/10 h-full overflow-hidden transition-all duration-300",
        isPrimary && "ring-1 ring-accent/20 shadow-xl shadow-accent/5"
      )}
    >
      <Grid cols={{ base: 1, md: 5 }} gap={0} height="full">
        <ToolImage tool={tool} className={cn(isPrimary && "opacity-90")} />
        <Stack
          span={{ base: 1, md: tool.image ? 3 : 5 }}
          gap={{ base: 4, md: 5 }}
          padding={{ base: 6, md: 8 }}
          flex={1}
          className="min-w-0" // Prevent horizontal overflow
        >
          <Box display="flex" justify="between" align="start" width="full">
            <Box
              width={isPrimary ? 14 : 12}
              height={isPrimary ? 14 : 12}
              surface="surface"
              border
              radius="lg"
              display="flex"
              align="center"
              justify="center"
              className="border-accent/10 shadow-sm"
            >
              <Icon icon={getToolIcon(tool)} size={isPrimary ? "xl" : "lg"} color="accent" />
            </Box>
            <Text
              size="micro"
              weight="font-bold"
              uppercase
              tracking="widest"
              color="accent"
              paddingX={4}
              paddingY={1.5}
              radius="full"
              className="bg-accent/10 border border-accent/20"
            >
              Flagship Output
            </Text>
          </Box>

          <Stack gap={5}>
            <Stack gap={1}>
              <Text variant="mono" size="micro" color="accent" weight="font-bold" uppercase tracking="widest">
                {tool.category}
              </Text>
              <Text variant="display" size={isPrimary ? "3xl" : "2xl"} weight="font-black">
                {tool.title}
              </Text>
              <Text size="sm" color="accent" weight="font-semibold" uppercase tracking="tighter">
                {tool.subtitle}
              </Text>
            </Stack>

            {tool.problem && tool.solution && tool.outcome ? (
              <Grid cols={{ base: 1, lg: 3 }} gap={4} paddingY={4} border="y" className="border-accent/5">
                <Stack gap={2}>
                  <Text variant="mono" size="micro" color="dim" weight="font-bold" uppercase tracking="widest" opacity={0.6}>Problem</Text>
                  <Text size="sm" color="body" className="leading-relaxed">{tool.problem}</Text>
                </Stack>
                <Stack gap={2}>
                  <Text variant="mono" size="micro" color="dim" weight="font-bold" uppercase tracking="widest" opacity={0.6}>Solution</Text>
                  <Text size="sm" color="body" className="leading-relaxed">{tool.solution}</Text>
                </Stack>
                <Stack gap={2}>
                  <Text variant="mono" size="micro" color="dim" weight="font-bold" uppercase tracking="widest" opacity={0.6}>Outcome</Text>
                  <Text size="sm" color="body" weight="font-semibold" className="leading-relaxed">{tool.outcome}</Text>
                </Stack>
              </Grid>
            ) : (
              <Text variant="body" size="md" color="dim" className="leading-relaxed">
                {tool.description}
              </Text>
            )}

            {tool.proves && (
              <Stack gap={3}>
                <Text variant="mono" size="micro" color="dim" weight="font-bold" uppercase tracking="widest" opacity={0.6}>
                  Proves (Hiring Skills)
                </Text>
                <Grid cols={{ base: 1, sm: 2, lg: 3 }} gapX={6} gapY={2}>
                  {tool.proves.map(item => (
                    <Box key={item} display="flex" align="center" gap={2}>
                      <Icon icon={CheckCircle2} size="xs" color="accent" className="opacity-60" />
                      <Text size="sm" color="body" weight="font-medium">{item}</Text>
                    </Box>
                  ))}
                </Grid>
              </Stack>
            )}
          </Stack>

          <Stack gap={4} marginTop="auto" paddingTop={6}>
            <Stack gap={2}>
              <Text variant="mono" size="micro" color="dim" weight="font-bold" uppercase tracking="widest" opacity={0.4}>
                Stack
              </Text>
              <Box display="flex" wrap="wrap" gap={2}>
                {tool.tags.map(tag => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </Box>
            </Stack>

            <Box display="flex" wrap="wrap" gap={3} paddingTop={2}>
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
      paddingBottom={6}
      gap={4}
      height="full"
      align="start"
      textAlign="left"
      className={cn(cardVariants({ interactive: true }), "min-w-0", "hover:border-accent/40")} // Prevent overflow
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
        <Text weight="font-bold" size="xs" uppercase tracking="widest" color="accent">View Project Details</Text>
        <Icon icon={ArrowRight} size="md" color="accent" />
      </Box>
    </Stack>
  );
}

export default function ResearchAnalytics() {
  const { studies, tools } = useResearch();

  const flagshipTools = tools.filter(t => t.isFlagship);
  const engineeringTools = tools.filter(t => !t.isFlagship);

  return (
    <Box as="section">
      <SEO
        title="DevAI Portfolio"
        description="DevAI portfolio by Ariel Anders. High-fidelity automation featuring AI-assisted GitHub PR review agents, data scraping pipelines, Vercel deployments, ecommerce automation, and production React/Vite systems."
        keywords="DevAI, AI engineering, portfolio, GitHub Actions automation, LLM workflows, React, Vite, TypeScript, technical hiring"
      />
      <Stack gap={8}>
        <Stack gap={4}>
          <PageHeader
            label="HIRE_ME"
            title="DevAI Portfolio"
            as="h1"
            paddingBottom={0}
            border="none"
          />
          <Stack gap={4} maxWidth="prose">
            <Text
              variant="body"
              size={{ base: "lg", lg: "xl" }}
              color="dim"
              className="leading-relaxed text-pretty"
            >
              Software systems: GitHub review agents, data pipelines, scraping workflows, Vercel deployments, ecommerce automation, and production React apps.
            </Text>
            <Text variant="body" size="lg" color="body">
              I build engineering systems that turn messy workflows into repeatable software. Grounded solutions built to ship products, not hype.
            </Text>
          </Stack>
        </Stack>


        <Stack gap={6} id="flagship" marginTop={4}>
          <Box paddingBottom={2} display="flex" justify="between" align="end" border="b">
            <Text variant="headline" size="2xl" weight="font-black">Flagship Projects</Text>
            <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase tracking="widest" opacity={0.4}>CASE STUDIES</Text>
          </Box>
          <Grid cols={1} gap={8}>
            {flagshipTools.map((tool) => (
              <FlagshipCard key={tool.id} tool={tool} />
            ))}
          </Grid>
        </Stack>

        <Stack gap={8} marginTop={8}>
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
          <Stack gap={8} id="articles">
            <Box paddingBottom={4} display="flex" justify="between" align="end" border="b">
              <Text variant="headline" size="2xl" weight="font-black">Articles & Research</Text>
              <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase tracking="widest" opacity={0.4}>{studies.length} POSTS</Text>
            </Box>

            <Grid cols={{ base: 1, md: 2 }} gap={8}>
              {studies.map((study) => (
                <Stack
                  key={study.slug}
                  as={Link}
                  to={`/research/${study.slug}`}
                  padding={6}
                  gap={4}
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
