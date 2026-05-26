import { Icon } from '@/components/ui/Icon';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Activity, Database, FileText, Cpu, ShieldCheck, Zap, LucideIcon, ExternalLink, Github, Globe } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { BaseCard } from '@/components/ui/BaseCard';
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

  // Dashboard status could be moved to a config or API later
  const statusConfig = {
    orchestration: "ACTIVE",
    qualityGates: "ENABLED",
    frameworks: "CUSTOM DEVAI SDK"
  };

  return (
    <Box as="section">
      <SEO
        title="DevAI Portfolio | Multi-Agent Systems & SDLC Automation"
        description="Active production testbed for multi-agent software engineering systems, GitOps code review agents, and high-scale telemetry pipelines."
      />
      <Stack gap={12}>
        <PageHeader
          label="SYSTEM_DASHBOARD"
          title="DevAI Portfolio as a Platform"
          description="DevAI projects and tooling built to ship real products, review AI-generated work, and keep repository workflows moving."
          as="h1"
        />

        <Stack gap={8} width="full" maxWidth="4xl">
          <Grid cols={{ base: 1, md: 3 }} gap={4} width="full">
            <Box display="flex" align="center" gap={3} padding={5} border radius="lg" surface="surface" className="border-accent/10">
              <Cpu className="w-5 h-5 text-accent" />
              <Stack gap={0.5}>
                <Text variant="mono" size="micro" color="dim" uppercase opacity={0.4}>Status</Text>
                <Text variant="mono" size="xs" weight="font-bold">ORCHESTRATION {statusConfig.orchestration}</Text>
              </Stack>
            </Box>
            <Box display="flex" align="center" gap={3} padding={5} border radius="lg" surface="surface" className="border-accent/10">
              <ShieldCheck className="w-5 h-5 text-accent" />
              <Stack gap={0.5}>
                <Text variant="mono" size="micro" color="dim" uppercase opacity={0.4}>Quality Gates</Text>
                <Text variant="mono" size="xs" weight="font-bold">{statusConfig.qualityGates}</Text>
              </Stack>
            </Box>
            <Box display="flex" align="center" gap={3} padding={5} border radius="lg" surface="surface" className="border-accent/10">
              <Zap className="w-5 h-5 text-accent" />
              <Stack gap={0.5}>
                <Text variant="mono" size="micro" color="dim" uppercase opacity={0.4}>Frameworks</Text>
                <Text variant="mono" size="xs" weight="font-bold">{statusConfig.frameworks}</Text>
              </Stack>
            </Box>
          </Grid>

          <Box maxWidth="2xl">
            <Text variant="body" size="lg" color="body">
              Welcome to my active research sandbox. This platform is a <strong>live production testbed</strong> where every feature and data pipeline is audited and optimized by an autonomous suite of developer agents operating across local environments and CI/CD pipelines.
            </Text>
          </Box>
        </Stack>

        <Stack gap={8}>
          <Box paddingBottom={4} display="flex" justify="between" align="end" border="b">
            <Text variant="headline" size="2xl" weight="font-black">Flagship Projects</Text>
            <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase tracking="widest" opacity={0.4}>CASE STUDIES</Text>
          </Box>
          <Grid cols={{ base: 1, md: 2 }} gap={6}>
            {flagshipTools.map((tool) => (
              <BaseCard
                key={tool.id}
                padding={8}
                gap={6}
                surface="surface"
                className="border-accent/10 h-full"
              >
                <Stack gap={6} height="full">
                  <Box display="flex" justify="between" align="start" width="full">
                    <Box width={12} height={12} surface="muted" border radius="lg" display="flex" align="center" justify="center" className="border-accent/10">
                      <Icon icon={getToolIcon(tool)} size="lg" color="accent" />
                    </Box>
                    <Text size="micro" weight="font-bold" uppercase tracking="widest" color="accent" className="px-3 py-1 rounded-full bg-accent/10">
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
                      <Text key={tag} variant="mono" size="micro" paddingX={2} paddingY={1} radius="sm" color="dim" className="bg-surface-muted/50 border border-white/5" /* impeccable-ignore */>
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
                        className="text-accent hover:text-accent-hover transition-colors z-20"
                      >
                        <Text weight="font-bold" size="xs" uppercase tracking="widest">
                          {tool.id.includes('hrm') ? 'View HRM' : 'Open RepoAuditor AI'}
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
              </BaseCard>
            ))}
          </Grid>
        </Stack>

        <Grid cols={{ base: 1, lg: 2 }} gap={12}>
          <Stack gap={6}>
            <Text variant="mono" size="xs" color="accent" weight="font-black" uppercase tracking="widest">Workflow Story</Text>
            <Text variant="body" size="lg" color="body" className="leading-relaxed">
              HRM exposed the need for better AI-assisted repo operations: reviewing pull requests, diagnosing CI/workflow failures, creating precise implementation issues, and handing branch-specific work to coding agents. <strong>RepoAuditor AI</strong> was created to support that loop and later became part of the development workflow for <strong>tech-dancer/BoomTick</strong>.
            </Text>
          </Stack>
          <Stack gap={6}>
            <Text variant="mono" size="xs" color="accent" weight="font-black" uppercase tracking="widest">Why this matters</Text>
            <Text variant="body" size="lg" color="body" className="leading-relaxed">
              Real product development requires grounded DevAI tooling. By focusing on <strong>AI-assisted workflows</strong> rather than total autonomy, we maintain high engineering standards while shipping complex features like real-time telemetry and multi-platform integrations.
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
                            <Text key={tag} variant="mono" size="micro" paddingX={2} paddingY={0.5} radius="sm" color="dim" className="bg-surface-muted/30" /* impeccable-ignore */>
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

        <Stack gap={8}>
          <Box paddingBottom={4} display="flex" justify="between" align="end" border="b">
            <Text variant="headline" size="2xl" weight="font-black">Articles & Research</Text>
            <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase tracking="widest" opacity={0.4}>{studies.length} POSTS</Text>
          </Box>

          {studies.length > 0 ? (
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
          ) : (
            <Box padding={6} border radius="lg" position="relative" overflow="hidden" surface="surface" textAlign="center">
              <Stack align="center" justify="center" gap={2}>
                <Box>
                  <Icon icon={Database} size="lg" color="muted" />
                </Box>
                <Stack gap={0.5}>
                  <Text as="h2" size="lg" weight="font-black" color="accent" uppercase tracking="tight">
                    Loading Data...
                  </Text>
                  <Text marginX="auto" maxWidth="md" size="xs" color="body" opacity={0.8}>
                    The WCS Competition Data Scraper is getting data ready. Detailed studies will be available soon.
                  </Text>
                </Stack>
              </Stack>
            </Box>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
