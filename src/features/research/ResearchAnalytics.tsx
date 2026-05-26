import { Icon } from '@/components/ui/Icon';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Activity, Database, FileText, Cpu, ShieldCheck, Zap, LucideIcon } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { useResearch } from './useResearch';
import { cardVariants } from '@/lib/variants';
import { ResearchTool } from '@/config/research-tools';

function getToolIcon(tool: ResearchTool): LucideIcon {
  if (tool.category.includes('DevAI')) return Cpu;
  if (tool.id.includes('scraper') || tool.id.includes('pipeline')) return Activity;
  return Search;
}

export default function ResearchAnalytics() {
  const navigate = useNavigate();
  const { studies, tools } = useResearch();

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
          description="Active Research Sandbox // Agentic Orchestration Active"
          as="h1"
        />

        <Box border radius="lg" padding={8} surface="surface" className="border-accent/20">
          <Stack gap={6}>
            <Grid cols={{ base: 1, md: 3 }} gap={4}>
              <Box display="flex" align="center" gap={3} padding={4} border radius="md" surface="default">
                <Cpu className="w-5 h-5 text-accent" />
                <Stack gap={0.5}>
                  <Text variant="mono" size="micro" color="dim" uppercase>Status</Text>
                  <Text variant="mono" size="xs" weight="font-bold">ORCHESTRATION ACTIVE</Text>
                </Stack>
              </Box>
              <Box display="flex" align="center" gap={3} padding={4} border radius="md" surface="default">
                <ShieldCheck className="w-5 h-5 text-accent" />
                <Stack gap={0.5}>
                  <Text variant="mono" size="micro" color="dim" uppercase>Quality Gates</Text>
                  <Text variant="mono" size="xs" weight="font-bold">ENABLED</Text>
                </Stack>
              </Box>
              <Box display="flex" align="center" gap={3} padding={4} border radius="md" surface="default">
                <Zap className="w-5 h-5 text-accent" />
                <Stack gap={0.5}>
                  <Text variant="mono" size="micro" color="dim" uppercase>Frameworks</Text>
                  <Text variant="mono" size="xs" weight="font-bold">CUSTOM DEVAI SDK</Text>
                </Stack>
              </Box>
            </Grid>

            <Text variant="body" size="lg" color="body">
              Welcome to my active research sandbox. This platform is a <strong>live production testbed</strong> where every feature and data pipeline is audited and optimized by an autonomous suite of developer agents operating across local environments and CI/CD pipelines.
            </Text>
          </Stack>
        </Box>

        <Stack gap={8}>
          <Box paddingBottom={4} display="flex" justify="between" align="end" border="b">
            <Text variant="headline" size="2xl" weight="font-black">Engineering Systems</Text>
            <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase tracking="widest">{tools.length} TOOLS</Text>
          </Box>
          <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={8}>
            {tools.map((tool) => (
              <Stack
                key={tool.id}
                as="button"
                onClick={() => navigate(tool.canonicalPath || `/research/${tool.id}`)}
                padding={6}
                gap={4}
                height="full"
                align="start"
                textAlign="left"
                className={cardVariants({ interactive: true })}
              >
                <Stack gap={4} width="full">
                  <Box display="flex" justify="between" align="start" width="full">
                    <Box width={10} height={10} surface="muted" border radius="md" display="flex" align="center" justify="center">
                      <Icon icon={getToolIcon(tool)} size="md" color="dim" />
                    </Box>
                    <Text size="micro" weight="font-bold" uppercase tracking="widest" color="accent">
                      {tool.status}
                    </Text>
                  </Box>
                  <Stack gap={2}>
                    <Stack gap={0.5}>
                        <Text variant="mono" size="micro" color="accent" weight="font-bold" uppercase tracking="widest">
                            {tool.category}
                        </Text>
                        <Text variant="display" size="xl" weight="font-black">
                            {tool.title}
                        </Text>
                    </Stack>
                    <Text size="xs" color="accent" weight="font-bold" uppercase tracking="tighter">
                        {tool.subtitle}
                    </Text>
                    <Text size="sm" color="dim">
                      {tool.description}
                    </Text>
                    <Box display="flex" wrap="wrap" gap={2} marginTop={2}>
                        {tool.tags.map(tag => (
                            <Text key={tag} variant="mono" size="micro" paddingX={2} paddingY={0.5} border radius="full" color="dim">
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
            <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase tracking="widest">{studies.length} POSTS</Text>
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
                    <Text variant="mono" size="micro" color="dim">{study.date}</Text>
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
