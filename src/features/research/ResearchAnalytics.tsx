import { Icon } from '@/components/ui/Icon';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Activity, FileText, Cpu, LucideIcon, ExternalLink, Github, Globe } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { BaseCard } from '@/components/ui/BaseCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { useResearch } from './useResearch';
import { cardVariants } from '@/lib/variants';
import { ResearchTool } from '@/config/research-tools';

function getToolIcon(tool: ResearchTool): LucideIcon {
  if (tool.category.includes('DevAI')) return Cpu;
  if (tool.id.includes('scraper') || tool.id.includes('pipeline')) return Activity;
  if (tool.id.includes('hrm')) return Globe;
  if (tool.id.includes('ecommerce')) return Activity;
  return Search;
}

export default function ResearchAnalytics() {
  const navigate = useNavigate();
  const { studies, tools } = useResearch();

  const flagshipTools = tools.filter(t => t.isFlagship);
  const engineeringTools = tools.filter(t => !t.isFlagship && t.id !== 'ecommerce-automation');

  const baseUrl = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

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

        <Stack gap={8}>
          <Box paddingBottom={4} display="flex" align="center" gap={4} border="b">
            <Text variant="headline" size="2xl" weight="font-black">Ecommerce Automation Experiments</Text>
            <StatusBadge label="In Progress" />
          </Box>
          <Box padding={8} border radius="xl" surface="muted">
            <Grid cols={12} gap={8}>
              <Box span={{ base: 12, lg: 7 }}>
                <Stack gap={6}>
                  <Text variant="body" size="lg" color="body" weight="font-bold">
                    I am extending the same DevAI workflow patterns into ecommerce operations for BoomTick merch.
                  </Text>
                  <Text variant="body" size="md" color="dim">
                    Current experiments include API-driven Printful template pulls, SEO-safe product copy generation, image QA, and human-in-the-loop catalog review.
                  </Text>
                  <Box display="flex" wrap="wrap" gap={2} marginTop={2}>
                      {['Printful API', 'SEO Safety', 'Image QA', 'Workflow'].map(tag => (
                          <Text key={tag} variant="mono" size="micro" paddingX={2} paddingY={1} radius="sm" color="dim" className="flagship-tag">
                              {tag}
                          </Text>
                      ))}
                  </Box>
                  <Box
                    as="button"
                    onClick={() => navigate('/research/ecommerce-automation')}
                    display="flex"
                    align="center"
                    gap={2}
                    marginTop={4}
                    className="text-accent hover:opacity-80 transition-opacity"
                  >
                    <Text weight="font-bold" size="xs" uppercase tracking="widest">View Workflow Items</Text>
                    <Icon icon={ArrowRight} size="sm" />
                  </Box>
                </Stack>
              </Box>
              <Box span={{ base: 12, lg: 5 }} display="flex" align="center">
                <Box width="full" padding={6} border radius="lg" surface="surface" className="border-accent/10">
                  <Stack gap={4} align="center">
                    <Box display="flex" align="center" gap={2} wrap="wrap" justify="center">
                      <Text variant="mono" size="micro" color="dim">TEMPLATES</Text>
                      <Icon icon={ArrowRight} size="xs" color="dim" />
                      <Text variant="mono" size="micro" color="dim">PACKET</Text>
                      <Icon icon={ArrowRight} size="xs" color="dim" />
                      <Text variant="mono" size="micro" color="accent" weight="bold">AI RECS</Text>
                      <Icon icon={ArrowRight} size="xs" color="accent" />
                      <Text variant="mono" size="micro" color="accent" weight="bold">REVIEW</Text>
                      <Icon icon={ArrowRight} size="xs" color="dim" />
                      <Text variant="mono" size="micro" color="dim">SYNC</Text>
                      <Icon icon={ArrowRight} size="xs" color="dim" />
                      <Text variant="mono" size="micro" color="dim">STOREFRONT</Text>
                    </Box>
                    <Text size="micro" color="accent" uppercase weight="font-black" tracking="widest" opacity={0.6}>CATALOG PIPELINE</Text>
                  </Stack>
                </Box>
              </Box>
            </Grid>
          </Box>
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
