// impeccable-ignore-file
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  Cpu,
  FileText,
  Github,
  Search,
  X,
} from 'lucide-react';
import { SEO } from '@/components/SEO';
import { ActionButton } from '@/components/ui/ActionButton';
import { BaseCard } from '@/components/ui/BaseCard';
import { Icon } from '@/components/ui/Icon';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Box, Grid, Stack, Text } from '@/layouts/Primitives';
import { useResearch } from './useResearch';

const ResearchAnalytics = () => {
  const { tools } = useResearch();
  const baseUrl = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const liveTools = tools.filter(t => ['versiontruth', 'ux-auditor', 'wcs-navigator'].includes(t.id));
  const experimentTools = tools.filter(t => ['blog-drafter', 'wcs-scraper', 'ecommerce-automation'].includes(t.id));

  return (
    <Box as="section" maxWidth="7xl" marginX="auto" width="full">
      <SEO
        title="DevAI Experiments"
        description="DevAI experiments and live testing ground by Ariel Anders, PhD. Active sandbox featuring VersionTruth ground-truth intelligence, Playwright visual regression auditor, WCS Navigator, and RAG data pipelines."
        keywords="DevAI, live testbeds, visual regression, VersionTruth, Playwright, pixelmatch, RAG pipelines, data engineering"
      />
      <Stack gap={16} width="full">
        {/* Full-width Hero Section */}
        <Stack gap={4} width="full" maxWidth="4xl">
          <PageHeader
            label="EXPERIMENTS"
            title="DevAI Experiments"
            as="h1"
            paddingBottom={0}
            border="none"
          />
          <Text variant="body" size={{ base: "lg", lg: "xl" }} color="dim" leading="relaxed" className="whitespace-normal break-normal">
            An active sandbox and live testing environment for AI-assisted engineering tools, RAG pipelines, and automated developer workflows. Explore live testbeds, visual regression engines, and high-scale data telemetry systems.
          </Text>

          {/* Main Portfolio & Projects Banner */}
          <Box
            marginTop={2}
            padding={4}
            radius="lg"
            border
            className="bg-surface-subtle border-brand-cyan/40 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full"
          >
            <Stack gap={1}>
              <Text variant="mono" size="micro" color="accent" weight="font-bold" uppercase tracking="wider">
                MAIN PORTFOLIO &amp; PROJECTS
              </Text>
              <Text variant="body" size="sm" color="main" className="whitespace-normal break-normal">
                Looking for my production robotics software, autonomous systems case studies, or engineering consulting?
              </Text>
            </Stack>
            <Box
              as="a"
              href="https://arii.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-3.5 py-2 rounded-md bg-brand-cyan text-black font-bold text-xs hover:opacity-90 transition-opacity whitespace-nowrap shadow-sm"
            >
              <span>VISIT ARII.GITHUB.IO →</span>
            </Box>
          </Box>
          

        </Stack>

        {/* LIVE TOOLS SECTION */}
        <Stack gap={8} id="experiments" marginTop={2} width="full">
          <Box paddingBottom={2} display="flex" justify="between" align="center" border="b" width="full">
            <Text variant="headline" size="2xl" weight="font-black">Live Tools</Text>
          </Box>
          <Grid cols={1} gap={6} width="full">
            {liveTools.map((tool) => (
              <BaseCard key={tool.id} padding={0} gap={0} surface="surface" overflow="hidden">
                <Grid cols={{ base: 1, lg: 12 }}>
                  <Box className="lg:col-span-8 cursor-zoom-in" onClick={() => setLightboxImage(tool.image?.startsWith('/') ? `${baseUrl}${tool.image}` : tool.image || '')}>
                    {tool.image && (
                      <img
                        src={tool.image.startsWith('/') ? `${baseUrl}${tool.image}` : tool.image}
                        alt={tool.imageAlt || `Preview of ${tool.title}`}
                        className="w-full h-full object-cover opacity-heavy hover:opacity-100 transition-opacity duration-500"
                      />
                    )}
                  </Box>
                  <Box className="lg:col-span-4" padding={6}>
                    <Stack gap={0} height="full">
                      <Box display="flex" justify="between" align="start" width="full" marginBottom={3}>
                        <Box width={12} height={12} surface="muted" radius="md" display="flex" align="center" justify="center">
                          <Icon icon={tool.category.includes('DevAI') ? Cpu : (tool.id.includes('scraper') || tool.id.includes('pipeline') ? Activity : Search)} size="lg" color="accent" />
                        </Box>
                        <StatusBadge label={tool.status} />
                      </Box>
                      <Text variant="mono" size="micro" color="accent" weight="font-bold" uppercase tracking="widest" marginBottom={1}>
                        {tool.status === 'Live Tool' ? '● LIVE UTILITY' : '● PRODUCTION SANDBOX'}
                      </Text>
                      <Text as="h3" variant="display" size="2xl" weight="font-black" marginBottom={2}>
                        {tool.title}
                      </Text>
                      {tool.subtitle && (
                        <Text size="sm" color="accent" weight="font-semibold" uppercase tracking="tighter" marginBottom={2}>
                          {tool.subtitle}
                        </Text>
                      )}
                      <Text variant="body" size="md" color="dim" leading="relaxed" marginBottom={3}>
                        {tool.description}
                      </Text>

                      <Box display="flex" wrap="wrap" gap={1.5} marginBottom={5}>
                        {tool.tags.map(tag => (
                          <Text key={tag} className="flagship-tag">{tag}</Text>
                        ))}
                      </Box>

                      <Stack direction="col" gap={2.5} marginTop="auto" width="full">
                        {tool.canonicalPath && (
                          <ActionButton as={Link} to={tool.canonicalPath} variant="primary" paddingX={4} paddingY={3} width="full" className="bg-brand-cyan hover:opacity-95 text-black border-brand-cyan font-bold">
                            OPEN LIVE TOOL →
                          </ActionButton>
                        )}
                        {tool.deepDivePath && (
                          <ActionButton as={Link} to={tool.deepDivePath} variant="secondary" paddingX={4} paddingY={2} width="full">
                            Deep-Dive Article <Icon icon={FileText} size="sm" />
                          </ActionButton>
                        )}
                        {tool.sourceUrl && (
                          <ActionButton as="a" href={tool.sourceUrl} target="_blank" rel="noopener noreferrer" variant="secondary" paddingX={4} paddingY={2} width="full">
                            Source <Icon icon={Github} size="sm" />
                          </ActionButton>
                        )}
                      </Stack>
                    </Stack>
                  </Box>
                </Grid>
              </BaseCard>
            ))}
          </Grid>
        </Stack>

        {/* EXPERIMENTS SECTION */}
        <Stack gap={8} id="experiments-list" marginTop={2} width="full">
          <Box paddingBottom={2} display="flex" justify="between" align="center" border="b" width="full">
            <Text variant="headline" size="2xl" weight="font-black">Active Experiments</Text>
          </Box>
          <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={6} width="full">
            {experimentTools.map((tool) => (
              <BaseCard key={tool.id} padding={0} gap={0} surface="surface" overflow="hidden" className="flex flex-col h-full">
                <Stack gap={0} height="full" className="flex-1 flex flex-col justify-between">
                  <Box width="full" className="border-b border-line/40 cursor-zoom-in bg-surface-muted min-h-[160px] flex items-center justify-center relative overflow-hidden" onClick={() => setLightboxImage(tool.image?.startsWith('/') ? `${baseUrl}${tool.image}` : tool.image || '')}>
                    {tool.image ? (
                      <img
                        src={tool.image.startsWith('/') ? `${baseUrl}${tool.image}` : tool.image}
                        alt={tool.imageAlt || `Preview of ${tool.title}`}
                        className="w-full h-full object-cover absolute inset-0 opacity-80 hover:opacity-100 transition-opacity duration-300"
                      />
                    ) : (
                       <Icon icon={Activity} size="xl" color="dim" className="opacity-30" />
                    )}
                  </Box>
                  <Stack flex={1} paddingTop={3.5} paddingX={4} paddingBottom={4} gap={0} className="flex flex-col justify-between">
                    <Box>
                      <Box display="flex" justify="between" align="start" width="full" marginBottom={3}>
                        <Box width={10} height={10} surface="muted" radius="md" display="flex" align="center" justify="center">
                          <Icon icon={tool.category.includes('DevAI') ? Cpu : Activity} size="md" color="dim" />
                        </Box>
                        <StatusBadge label={tool.status} />
                      </Box>
                      <Text variant="mono" size="micro" color="accent" weight="font-bold" uppercase tracking="widest" marginBottom={1}>
                        {tool.status === 'Live Tool' || tool.status === 'In Progress' ? '▲ ACTIVE EXPERIMENT' : '▲ LOCAL PROTOTYPE'}
                      </Text>
                      <Text as="h3" variant="display" size="xl" weight="font-black" marginBottom={2}>
                        {tool.title}
                      </Text>
                      <Text variant="body" size="sm" color="dim" leading="relaxed" marginBottom={3} className="line-clamp-3">
                        {tool.description}
                      </Text>
                      <Box display="flex" wrap="wrap" gap={1.5} marginBottom={3}>
                        {tool.tags.slice(0, 3).map(tag => (
                          <Text key={tag} className="flagship-tag">{tag}</Text>
                        ))}
                      </Box>
                    </Box>
                    <Box display="flex" align="center" gap={2} marginTop="auto" width="full">
                      {tool.canonicalPath && (
                        <ActionButton as={Link} to={tool.canonicalPath} variant="primary" paddingX={3} paddingY={1.5} className="flex-1 text-center justify-center">
                          Open Tool <Icon icon={ArrowRight} size="sm" />
                        </ActionButton>
                      )}
                      {tool.deepDivePath && (
                        <ActionButton as={Link} to={tool.deepDivePath} variant="secondary" paddingX={3} paddingY={1.5} className="text-center justify-center">
                          Deep-Dive <Icon icon={FileText} size="sm" />
                        </ActionButton>
                      )}
                    </Box>
                  </Stack>
                </Stack>
              </BaseCard>
            ))}
          </Grid>
        </Stack>

      </Stack>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <Box
          position="fixed"
          inset={0}
          zIndex={100}
          display="flex"
          align="center"
          justify="center"
          className="bg-black/90 cursor-zoom-out"
          onClick={() => setLightboxImage(null)}
        >
          <Box position="absolute" top={4} right={4} className="text-white hover:text-accent p-2">
            <Icon icon={X} size="lg" />
          </Box>
          <img
            src={lightboxImage}
            alt="Enlarged screenshot preview"
            className="max-w-[95vw] max-h-[95vh] md:max-w-[85vw] md:max-h-[85vh] object-contain rounded-lg border border-white/10 shadow-2xl"
          />
        </Box>
      )}
    </Box>
  );
};


export default ResearchAnalytics;
