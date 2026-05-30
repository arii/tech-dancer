import { Icon } from '@/components/ui/Icon';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Activity, FileText, Cpu, LucideIcon, ExternalLink, Github, Globe, Check } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { ActionButton } from '@/components/ui/ActionButton';
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

  const baseUrl = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

  return (
    <Box as="section" className="relative overflow-hidden">
      {/* Decorative Background Elements */}
      <Box
        position="absolute"
        top={-20}
        right={-20}
        width={96}
        height={96}
        radius="full"
        className="bg-accent/5 blur-3xl -z-10 pointer-events-none"
      />
      <Box
        position="absolute"
        bottom="1/3"
        left={-20}
        width={64}
        height={64}
        radius="full"
        className="bg-accent/5 blur-3xl -z-10 pointer-events-none"
      />

      <SEO
        title="DevAI Portfolio | AI Systems & Orchestration"
        description="A portfolio of AI-assisted product development, DevAI orchestration consoles, and high-fidelity RAG telemetry pipelines."
      />
      <Stack gap={12} className="relative z-10">
        <PageHeader
          title="DevAI Portfolio"
          description="Real-world examples of AI-assisted product development, orchestration consoles, and automated engineering workflows."
          as="h1"
        />

        <Stack gap={8} maxWidth="2xl">
          <Text variant="body" size="lg" color="body">
            Grounded DevAI solutions built for production systems. These projects demonstrate practical applications of agentic workflows and AI engineering in modern software delivery.
          </Text>
          <Stack gap={3}>
            {[
              { title: 'Custom RAG Pipelines', desc: 'Grounded production solutions.' },
              { title: 'Autonomous Repository Auditing', desc: 'Practical agentic workflows.' },
              { title: 'AI Engineering', desc: 'Modern software delivery.' }
            ].map((item, i) => (
              <Box key={i} display="flex" align="start" gap={3}>
                <Box marginTop={1} color="accent">
                  <Check size={16} strokeWidth={3} />
                </Box>
                <Text size="sm" color="body">
                  <strong>{item.title}</strong> — {item.desc}
                </Text>
              </Box>
            ))}
          </Stack>
          <Box paddingTop={2}>
            <ActionButton
              as="a"
              href="#flagship"
              variant="primary"
              paddingX={6}
              paddingY={3}
              radius="md"
              className="w-fit"
            >
              Explore Projects
            </ActionButton>
          </Box>
        </Stack>

        <Stack gap={8} id="flagship">
          <Box paddingBottom={4} display="flex" direction={{ base: "col", md: "row" }} justify="between" align={{ base: "start", md: "end" }} border="b" gap={2}>
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
                      <Box
                        width={12}
                        height={12}
                        surface="muted"
                        radius="lg"
                        display="flex"
                        align="center"
                        justify="center"
                        className="border border-accent/20 bg-accent/5 shadow-sm shadow-accent/5"
                      >
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
                      <Text size="sm" color="body" weight="font-bold" uppercase tracking="tighter">
                        {tool.subtitle}
                      </Text>
                      <Text variant="body" size="md" color="dim" className="leading-relaxed">
                        {tool.description}
                      </Text>
                    </Stack>

                    <Box display="flex" wrap="wrap" gap={2}>
                      {tool.tags.map(tag => (
                        <Text key={tag} variant="mono" size="micro" paddingX={1.5} paddingY={0.5} radius="sm" color="dim" className="bg-surface-alt/50 border border-line/10">
                          {tag}
                        </Text>
                      ))}
                    </Box>

                    <Box display="flex" gap={4} marginTop="auto" paddingTop={4}>
                      {tool.externalUrl && (
                        <ActionButton
                          as="a"
                          href={tool.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="accent"
                          size="sm"
                          paddingX={4}
                          paddingY={2}
                          radius="md"
                          gap={2}
                          className="z-20"
                        >
                          <Text weight="font-bold" size="xs" uppercase tracking="widest">
                            {tool.ctaLabel || tool.externalLinkDisplayLabel || 'Open Link'}
                          </Text>
                          <ExternalLink className="w-4 h-4" />
                        </ActionButton>
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
          <Box paddingBottom={4} display="flex" direction={{ base: "col", md: "row" }} justify="between" align={{ base: "start", md: "end" }} border="b" gap={2}>
            <Text variant="headline" size="2xl" weight="font-black">DevAI Systems</Text>
            <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase tracking="widest" opacity={0.4}>{engineeringTools.length} PROJECTS</Text>
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
                    <Box
                      width={10}
                      height={10}
                      surface="muted"
                      radius="md"
                      display="flex"
                      align="center"
                      justify="center"
                      className="border border-accent/10 bg-accent/5 shadow-sm shadow-accent/5"
                    >
                      <Icon icon={getToolIcon(tool)} size="md" color="dim" />
                    </Box>
                    {tool.status !== 'Active' && (
                      <Text size="micro" weight="font-bold" uppercase tracking="widest" color="accent">
                        {tool.status}
                      </Text>
                    )}
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
                    <Text size="micro" color="body" weight="font-bold" uppercase tracking="tighter">
                        {tool.subtitle}
                    </Text>
                    <Text size="sm" color="dim">
                      {tool.description}
                    </Text>
                    <Box display="flex" wrap="wrap" gap={2} marginTop={2}>
                        {tool.tags.map(tag => (
                            <Text key={tag} variant="mono" size="micro" paddingX={1.5} paddingY={0.5} radius="sm" color="dim" className="bg-surface-alt/50 border border-line/10">
                                {tag}
                            </Text>
                        ))}
                    </Box>
                  </Stack>
                </Stack>
                <ActionButton
                  variant="secondary"
                  size="sm"
                  paddingX={4}
                  paddingY={2}
                  radius="md"
                  gap={2}
                  marginTop="auto"
                  className="w-fit"
                >
                  <Text weight="font-bold" size="xs" uppercase tracking="widest">
                    {tool.ctaLabel || 'View Assets'}
                  </Text>
                  <Icon icon={ArrowRight} size="md" />
                </ActionButton>
              </Stack>
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
