import { Icon } from '@/components/ui/Icon';
import { useNavigate } from 'react-router-dom';
import {
  Search, ArrowRight, Activity, Database, FileText,
  Layout, Code2, ShieldCheck, Terminal, Cpu,
  GitBranch, Eye, Binary, Microscope
} from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { useResearch } from './useResearch';
import { cardVariants } from '@/lib/variants';

export default function ResearchAnalytics() {
  const navigate = useNavigate();
  const { studies, tools } = useResearch();

  const getTool = (id: string) => tools.find(t => t.id === id);

  const ToolCard = ({ id }: { id: string }) => {
    const tool = getTool(id);
    if (!tool) return null;

    return (
      <Stack
        as="button"
        onClick={() => navigate(tool.canonicalPath || tool.route || `/research/${tool.id}`)}
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
              <Icon
                icon={
                  tool.id.includes('ux') ? Layout :
                  tool.id.includes('pr') ? ShieldCheck :
                  tool.id.includes('scope') ? GitBranch :
                  tool.id.includes('wcs') ? Database : Activity
                }
                size="md"
                color="dim"
              />
            </Box>
            <Text size="micro" weight="font-bold" uppercase tracking="widest" color="accent">
              {tool.status}
            </Text>
          </Box>
          <Stack gap={2}>
            <Text variant="display" size="xl" weight="font-black">
              {tool.title}
            </Text>
            <Text variant="mono" size="xs" color="accent" weight="font-bold" uppercase tracking="widest">
              {tool.subtitle}
            </Text>
            <Text size="sm" color="dim">
              {tool.description}
            </Text>
            <Box display="flex" flexWrap="wrap" gap={2} marginTop={2}>
               {tool.tags.map(tag => (
                 <Text key={tag} variant="mono" size="micro" paddingX={2} paddingY={0.5} border radius="full" color="dim">
                   {tag}
                 </Text>
               ))}
            </Box>
          </Stack>
        </Stack>
        <Box display="flex" align="center" gap={2} marginTop="auto">
          <Text weight="font-bold" size="xs" uppercase tracking="widest" color="accent">Explore System</Text>
          <Icon icon={ArrowRight} size="md" color="accent" />
        </Box>
      </Stack>
    );
  };

  const SectionFeature = ({ title, description }: { title: string, description: string }) => (
    <Stack gap={1} paddingLeft={4} className="border-l-2 border-accent">
      <Text variant="mono" size="xs" weight="font-bold" uppercase color="accent">{title}</Text>
      <Text size="sm" color="dim">{description}</Text>
    </Stack>
  );

  return (
    <Box as="section">
      <SEO
        title="DevAI Portfolio | System Dashboard"
        description="Agentic Orchestration Active | Quality Gates Enabled. Live production testbed for multi-agent software engineering systems."
      />

      <Stack gap={20}>
        {/* Header Section */}
        <Stack gap={8}>
          <Box borderTop borderBottom paddingY={6} display="flex" flexDir={{ base: 'column', md: 'row' }} gap={8} justify="between" className="bg-surface/30">
            <Stack gap={1}>
              <Text variant="mono" size="micro" color="dim" uppercase tracking="widest">Host Domain</Text>
              <Text variant="mono" size="xs" weight="font-bold">boomtick.blog/research</Text>
            </Stack>
            <Stack gap={1}>
              <Text variant="mono" size="micro" color="dim" uppercase tracking="widest">Status</Text>
              <Text variant="mono" size="xs" weight="font-bold" color="accent">Agentic Orchestration Active | Quality Gates Enabled</Text>
            </Stack>
            <Stack gap={1}>
              <Text variant="mono" size="micro" color="dim" uppercase tracking="widest">Frameworks</Text>
              <Text variant="mono" size="xs" weight="font-bold">Custom Python DevAI SDK, Multi-Agent GitOps, Error-RAG</Text>
            </Stack>
          </Box>

          <Stack gap={6}>
            <Box display="flex" align="center" gap={3}>
              <Cpu className="text-accent w-6 h-6" />
              <Text variant="mono" size="sm" weight="font-bold" color="accent" tracking="widest">[SYSTEM_DASHBOARD]</Text>
            </Box>
            <Text variant="display" as="h1" size={{ base: '4xl', md: '6xl' }} weight="font-black" uppercase tracking="tighter" lineHeight="none">
              DevAI Portfolio as a Platform
            </Text>
            <Text variant="body" size="lg" color="dim" maxWidth="3xl" lineHeight="relaxed">
              Welcome to my active research sandbox. This platform is not a static blog; it is a live production testbed for multi-agent software engineering systems. Every feature, page, and data pipeline on this domain is audited, maintained, and optimized by an autonomous suite of developer agents operating across my local development environment (Inner Loop) and CI/CD pipelines (Outer Loop).
            </Text>
          </Stack>
        </Stack>

        {/* 1. Inner Loop */}
        <Stack gap={10}>
          <Stack gap={4}>
            <Box borderBottom paddingBottom={4} display="flex" justify="between" align="end">
              <Text variant="headline" size="2xl" weight="font-black">1. Transforming the Inner Loop: Spec-Driven Multi-Agent Code Gen</Text>
              <Terminal className="text-dim opacity-50 w-8 h-8" />
            </Box>
            <Text color="dim" maxWidth="3xl">To maximize developer velocity, I engineered a custom, context-aware DevAI SDK (/dev-tools) designed around Spec-Driven Development methodologies.</Text>
          </Stack>

          <Grid cols={{ base: 1, md: 3 }} gap={8}>
            <SectionFeature
              title="Context-Aware Code Orchestration"
              description="Built a model-agnostic abstraction layer supporting SOTA LLMs to automate context-rich refactoring inside devcontainers."
            />
            <SectionFeature
              title="System Integrity Enforcement"
              description="Designed a rigorous Agent Contract (AGENT_CONTRACT.md) ensuring agents respect architectural boundaries and design tokens."
            />
            <SectionFeature
              title="Developer Velocity Multiplier"
              description="Codebases are audited locally using CLI tools (td_cli.py) that pre-flight syntax and detect code smells prior to commit."
            />
          </Grid>

          <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={8}>
            <Box padding={8} border radius="lg" className="bg-surface/50 border-dashed flex items-center justify-center text-center">
              <Stack gap={4} align="center">
                <Code2 className="w-8 h-8 text-accent opacity-50" />
                <Stack gap={2}>
                  <Text variant="mono" size="xs" weight="font-bold">td_cli.py & SDK</Text>
                  <Text size="xs" color="dim">Autonomous multi-agent scheduler and context-aware terminal manager.</Text>
                </Stack>
              </Stack>
            </Box>
          </Grid>
        </Stack>

        {/* 2. Outer Loop */}
        <Stack gap={10}>
          <Stack gap={4}>
            <Box borderBottom paddingBottom={4} display="flex" justify="between" align="end">
              <Text variant="headline" size="2xl" weight="font-black">2. Automating the Outer Loop: GitOps Code Review & Blast-Radius Auditing</Text>
              <ShieldCheck className="text-dim opacity-50 w-8 h-8" />
            </Box>
            <Text color="dim" maxWidth="3xl">To maintain architectural consistency and prevent regression at scale, I built and integrated deterministic GitOps agents directly into our code review lifecycle.</Text>
          </Stack>

          <Grid cols={{ base: 1, md: 3 }} gap={8}>
            <SectionFeature
              title="GitOps Review Agent"
              description="Runs autonomous static analysis on incoming pull requests via mergellama.py, ensuring adherence to design-token rules."
            />
            <SectionFeature
              title="Semantic Blast-Radius Analysis"
              description="Automatically maps and isolates code-change scopes using scope_check.py to identify downstream side-effects."
            />
            <SectionFeature
              title="SDLC Bottleneck Telemetry"
              description="Profiles execution metrics of build scripts and workflows, translating logs into actionable performance trends."
            />
          </Grid>

          <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={8}>
            <ToolCard id="gitops-pr-reviewer" />
            <ToolCard id="scope-blast-radius" />
          </Grid>
        </Stack>

        {/* 3. Perception Debugging */}
        <Stack gap={10}>
          <Stack gap={4}>
            <Box borderBottom paddingBottom={4} display="flex" justify="between" align="end">
              <Text variant="headline" size="2xl" weight="font-black">3. Web UI "Perception Debugging" & Telemetry Telepresence</Text>
              <Eye className="text-dim opacity-50 w-8 h-8" />
            </Box>
            <Text color="dim" maxWidth="3xl">Just as high-complexity software and real-time systems require deep perception debugging to analyze complex behaviors, this platform deploys a dedicated simulation suite.</Text>
          </Stack>

          <Grid cols={{ base: 1, md: 3 }} gap={8}>
            <SectionFeature
              title="Visual Regression Audits"
              description="Integrates headless browser testing with strict visual snapshots to catch UI regressions using layout telemetry."
            />
            <SectionFeature
              title="UX Telemetry Agent"
              description="Actively monitors browser state, tracking performance budgets, accessibility landmarks, and visual shifts."
            />
            <SectionFeature
              title="Simulation vs. Reality Parity"
              description="Ensures absolute cross-device parity through automated Lighthouse CI assertion loops and state-parity checks."
            />
          </Grid>

          <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={8}>
            <ToolCard id="ux-perception-debug" />
          </Grid>
        </Stack>

        {/* 4. Data Pipelines */}
        <Stack gap={10}>
          <Stack gap={4}>
            <Box borderBottom paddingBottom={4} display="flex" justify="between" align="end">
              <Text variant="headline" size="2xl" weight="font-black">4. Productionizing Data Pipelines: Scaled Telemetry Ingestion</Text>
              <Binary className="text-dim opacity-50 w-8 h-8" />
            </Box>
            <Text color="dim" maxWidth="3xl">Demonstrating expertise in production-grade data pipelines, I engineered an unstructured-to-structured ETL pipeline for raw web telemetry.</Text>
          </Stack>

          <Grid cols={{ base: 1, md: 3 }} gap={8}>
            <SectionFeature
              title="Ingestion Pipeline"
              description="Resilient scraper service (scraper.py) targeting raw, highly unstructured competitive event data from registries."
            />
            <SectionFeature
              title="Structured Transformation"
              description="Parses HTML/JSON payload queues and writes high-performance compressed Apache Parquet datasets."
            />
            <SectionFeature
              title="Downstream Modeling"
              description="Feeds analytical visualizations to expose ranking anomalies, structural score trends, and judge consistency."
            />
          </Grid>

          <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={8}>
            <ToolCard id="wcs-parquet-pipeline" />
          </Grid>
        </Stack>

        {/* Articles Section */}
        <Stack gap={8} marginTop={12}>
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
                  <Icon icon={Microscope} size="lg" color="muted" />
                </Box>
                <Stack gap={0.5}>
                  <Text as="h2" size="lg" weight="font-black" color="accent" uppercase tracking="tight">
                    Loading Data...
                  </Text>
                  <Text marginX="auto" maxWidth="md" size="xs" color="body" opacity={0.8}>
                    Agentic scrapers are processing competitive datasets. Detailed studies will be available soon.
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
