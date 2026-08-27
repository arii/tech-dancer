// impeccable-ignore-file
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  Cpu,
  ExternalLink,
  FileText,
  FlaskConical,
  Github,
  Globe,
  LucideIcon,
  Search,
  X,
} from 'lucide-react';
import { SEO } from '@/components/SEO';
import { ActionButton } from '@/components/ui/ActionButton';
import { BaseCard } from '@/components/ui/BaseCard';
import { Icon } from '@/components/ui/Icon';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ResearchTool } from '@/config/research-tools';
import { Box, Grid, Stack, Text } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';
import { cardVariants } from '@/lib/variants';
import { useResearch } from './useResearch';

function getToolIcon(tool: ResearchTool): LucideIcon {
  if (tool.category.includes('DevAI')) return Cpu;
  if (tool.id.includes('scraper') || tool.id.includes('pipeline')) return Activity;
  if (tool.id.includes('hrm')) return Globe;
  return Search;
}

export interface ToolImageProps {
  tool: ResearchTool;
  baseUrl: string;
  onImageClick?: (src: string) => void;
}

const ToolImage = ({ tool, baseUrl, onImageClick }: ToolImageProps) => {
  if (tool.customPreview) {
    const { logo, headline, tagline } = tool.customPreview;
    return (
      <Box width="full" className="card-screenshot-wrapper boomtick-blog-preview border-b border-white/8">
        <Stack gap={1} className="preview-content">
          <Text className="preview-logo">
            {logo.prefix}<span className="logo-accent">{logo.accent}</span><span className="logo-dot font-light">{logo.suffix}</span>
          </Text>
          <Text className="preview-headline">
            {headline.map((line, idx) => (
              <React.Fragment key={idx}>
                {line.accent ? (
                  <span className="headline-accent">{line.accent}</span>
                ) : (
                  line.text
                )}
                {idx < headline.length - 1 && <br />}
              </React.Fragment>
            ))}
          </Text>
          <Text className="preview-tagline">
            {tagline}
          </Text>
        </Stack>
      </Box>
    );
  }

  if (!tool.image) return null;

  const src = tool.image.startsWith('/') ? `${baseUrl}${tool.image}` : tool.image;
  const alt = tool.imageAlt || `Screenshot of the ${tool.title} interface preview`;

  const handleImageClick = (e: React.MouseEvent) => {
    if (onImageClick) {
      e.preventDefault();
      e.stopPropagation();
      onImageClick(src);
    }
  };

  return (
    <Box width="full" className="card-screenshot-wrapper border-b border-white/8 cursor-zoom-in" onClick={handleImageClick}>
      <img
        src={src}
        alt={alt}
        className="opacity-heavy hover:opacity-100 transition-opacity duration-500 w-full object-cover max-h-52"
      />
    </Box>
  );
};

export interface ExperimentCardProps {
  tool: ResearchTool;
  baseUrl: string;
  onImageClick?: (src: string) => void;
}

const ExperimentCard = ({ tool, baseUrl, onImageClick }: ExperimentCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <BaseCard
      key={tool.id}
      padding={0}
      gap={0}
      surface="surface"
      height="full"
      overflow="hidden"
    >
      <Stack gap={0} height="full">
        <ToolImage tool={tool} baseUrl={baseUrl} onImageClick={onImageClick} />
        <Stack flex={1} paddingTop={3.5} paddingX={4} paddingBottom={4} gap={0}>
          <Box display="flex" justify="between" align="start" width="full" marginBottom={3}>
            <Box width={12} height={12} surface="muted" radius="md" display="flex" align="center" justify="center">
              <Icon icon={getToolIcon(tool)} size="lg" color="accent" />
            </Box>
            <StatusBadge label={tool.status} />
          </Box>

          <Text variant="mono" size="micro" color="accent" weight="font-bold" uppercase tracking="widest" marginBottom={1}>
            {tool.category}
          </Text>
          <Text as="h3" variant="display" size="2xl" weight="font-black" marginBottom={2}>
            {tool.title}
          </Text>
          {tool.subtitle && (
            <Text size="sm" color="accent" weight="font-semibold" uppercase tracking="tighter" marginBottom={2}>
              {tool.subtitle}
            </Text>
          )}
          <Text
            variant="body"
            size="md"
            color="dim"
            leading="relaxed"
            marginBottom={3}
            className={cn(!isExpanded && tool.description.length > 150 && "line-clamp-3")}
          >
            {tool.description}
          </Text>
          {tool.description && tool.description.length > 150 && (
            <Box as="button" onClick={handleToggleExpand} marginBottom={5} alignSelf="start" className="text-accent hover:underline text-xs font-semibold focus:outline-none z-30">
              {isExpanded ? "Read Less" : "Read More"}
            </Box>
          )}

          {tool.inDevMessage && (
            <div className="in-dev-banner">
              <Icon icon={FlaskConical} size="sm" color="dim" aria-hidden="true" />
              <p>
                <strong>{tool.inDevMessage.highlight}</strong>{tool.inDevMessage.rest}
              </p>
            </div>
          )}

          <Box display="flex" wrap="wrap" gap={1.5} marginBottom={3}>
            {tool.tags.map(tag => (
              <Text key={tag} className="flagship-tag">
                {tag}
              </Text>
            ))}
          </Box>

          <Stack direction={{ base: "col", sm: "row" }} gap={2.5} marginTop="auto" width="full" wrap="wrap">
            {tool.externalUrl ? (
              <ActionButton
                as="a"
                href={tool.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                paddingX={4}
                paddingY={2}
                zIndex="docked"
                width={{ base: "full", sm: "auto" }}
              >
                {tool.externalLinkDisplayLabel || 'Open Live Tool'}
                <Icon icon={ExternalLink} size="sm" />
              </ActionButton>
            ) : tool.canonicalPath && (
              <ActionButton
                as={Link}
                to={tool.canonicalPath}
                variant="primary"
                paddingX={4}
                paddingY={2}
                zIndex="docked"
                width={{ base: "full", sm: "auto" }}
              >
                Open Live Tool
                <Icon icon={ArrowRight} size="sm" />
              </ActionButton>
            )}
            {tool.deepDivePath && (
              <ActionButton
                as={Link}
                to={tool.deepDivePath}
                variant="secondary"
                paddingX={4}
                paddingY={2}
                zIndex="docked"
                width={{ base: "full", sm: "auto" }}
              >
                Deep-Dive Article
                <Icon icon={FileText} size="sm" />
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
                zIndex="docked"
                width={{ base: "full", sm: "auto" }}
              >
                Source
                <Icon icon={Github} size="sm" />
              </ActionButton>
            )}
          </Stack>
        </Stack>
      </Stack>
    </BaseCard>
  );
};

export interface ToolCardProps {
  tool: ResearchTool;
  navigate: (path: string) => void;
}

const ToolCard = ({ tool, navigate }: ToolCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const href = tool.canonicalPath || tool.sourceUrl || `/research/${tool.id}`;
  const isLink = href.startsWith('http');

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isLink) {
      e.preventDefault();
      navigate(href);
    }
  };

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <Stack
      as="a"
      href={href}
      target={isLink ? "_blank" : undefined}
      rel={isLink ? "noopener noreferrer" : undefined}
      onClick={handleClick}
      height="full" align="start" textAlign="left" gap={0}
      paddingTop={3.5} paddingX={4} paddingBottom={4}
      className={cn(cardVariants({ interactive: true }), "no-underline")}
    >
      <Stack gap={0} width="full">
        <Box display="flex" justify="between" align="start" width="full" marginBottom={3}>
          <Box width={10} height={10} surface="muted" radius="md" display="flex" align="center" justify="center">
            <Icon icon={getToolIcon(tool)} size="md" color="dim" />
          </Box>
          <StatusBadge label={tool.status} />
        </Box>
        <Text variant="mono" size="micro" color="dim" weight="font-bold" uppercase tracking="widest" opacityVariant="subtle" marginBottom={1}>{tool.category}</Text>
        <Text variant="display" size="xl" weight="font-black" marginBottom={2}>{tool.title}</Text>
        {tool.subtitle && (
          <Text size="micro" color="accent" weight="font-normal" uppercase tracking="tighter" marginBottom={2}>{tool.subtitle}</Text>
        )}
        <Text
          size="sm"
          color="dim"
          leading="relaxed"
          marginBottom={3}
          className={cn(!isExpanded && tool.description.length > 120 && "line-clamp-3")}
        >
          {tool.description}
        </Text>
        {tool.description && tool.description.length > 120 && (
          <Box as="button" onClick={handleToggleExpand} marginBottom={5} alignSelf="start" className="text-accent hover:underline text-xs font-semibold focus:outline-none">
            {isExpanded ? "Read Less" : "Read More"}
          </Box>
        )}
        <Box display="flex" wrap="wrap" gap={1.5} marginBottom={3}>
          {tool.tags.map(tag => (
            <Text key={tag} className="flagship-tag">{tag}</Text>
          ))}
        </Box>
      </Stack>
      <Box display="flex" align="center" gap={2} marginTop="auto">
        <Text weight="font-bold" size="xs" uppercase tracking="widest" color="accent">
          {isLink ? 'View Source' : 'Open Tool'}
        </Text>
        <Icon icon={ArrowRight} size="md" color="accent" />
      </Box>
    </Stack>
  );
};



const STACK_CATEGORIES = [
  { label: 'Stack', tags: ['React 19', 'Vite', 'TypeScript', 'Tailwind v4'], colorClass: 'bg-brand-purple/10 text-brand-purple border border-brand-purple/20' },
  { label: 'Pipelines', tags: ['GitHub Actions', 'Playwright', 'Pixelmatch', 'Parquet ETL'], colorClass: 'bg-brand-green/10 text-brand-green border border-brand-green/20' },
  { label: 'AI / RAG', tags: ['Ground Truth APIs', 'RAG Pipelines', 'LLM Assisted Authoring'], colorClass: 'bg-brand-amber/10 text-brand-amber border border-brand-amber/20' },
];

export interface ToolSectionProps {
  title: string;
  tools: ResearchTool[];
  navigate: (path: string) => void;
}

const ToolSection = ({ title, tools, navigate }: ToolSectionProps) => {
  if (tools.length === 0) return null;
  return (
    <Stack gap={12} width="full">
      <Box paddingBottom={4} display="flex" justify="between" align="center" border="b" width="full">
        <Text variant="headline" size="2xl" weight="font-black">{title}</Text>
        <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase tracking="widest" opacityVariant="subtle">{tools.length} TOOLS</Text>
      </Box>
      <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={6} width="full">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} navigate={navigate} />
        ))}
      </Grid>
    </Stack>
  );
};

const ResearchAnalytics = () => {
  const navigate = useNavigate();
  const { tools } = useResearch();
  const baseUrl = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const liveExperiments = tools.filter(t => t.taxonomyBucket === 'live-experiments' || t.isFeatured);
  const engineeringTools = tools.filter(t => t.taxonomyBucket === 'engineering');
  const e_commerceTools = tools.filter(t => t.taxonomyBucket === 'e-commerce');

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

          {/* Official Primary Portfolio Banner */}
          <Box
            marginTop={2}
            padding={4}
            radius="md"
            border
            className="bg-accent/10 border-accent/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full"
          >
            <Stack gap={1}>
              <Text variant="mono" size="micro" color="accent" weight="font-bold" uppercase tracking="wider">
                Official Primary Portfolio
              </Text>
              <Text variant="body" size="sm" color="main" className="whitespace-normal break-normal">
                Looking for production robotics software, autonomous systems case studies, and engineering consulting?
              </Text>
            </Stack>
            <Box as="a" href="https://arii.github.io" target="_blank" rel="noopener noreferrer" className="shrink-0">
              <Text variant="mono" size="xs" color="accent" weight="font-bold" className="hover:underline flex items-center gap-1">
                Visit arii.github.io →
              </Text>
            </Box>
          </Box>
          
          {/* Scrollable Focus Tags for Mobile */}
          <Stack direction="col" align="start" gap={2} width="full" marginTop={3} marginBottom={2} paddingY={1} display={{ base: "flex", lg: "none" }}>
            <Text size="micro" color="dim" uppercase tracking="widest" weight="font-bold">Focus</Text>
            <Box display="flex" overflowX="auto" noScrollbar gap={2} width="full" className="flex-nowrap scroll-mask-fade">
              {STACK_CATEGORIES.flatMap(cat => cat.tags.map(tag => ({ tag, col: cat.colorClass }))).map(item => (
                <Text key={item.tag} size="micro" weight="font-bold" paddingX={2} paddingY={0.5} radius="sm" className={cn(item.col, "shrink-0")}>{item.tag}</Text>
              ))}
            </Box>
          </Stack>

          {/* Categorized Stack Grid for Desktop */}
          <Stack gap={2} marginTop={3} marginBottom={3} width="full" display={{ base: "none", lg: "flex" }}>
            {STACK_CATEGORIES.map(cat => (
              <Box key={cat.label} display="flex" align="center" gap={2} width="full">
                <Text size="micro" color="dim" uppercase tracking="widest" weight="font-bold" width={24} shrink={0}>{cat.label}</Text>
                <Box display="flex" wrap="wrap" gap={2} width="full">
                  {cat.tags.map(tag => (
                    <Text key={tag} size="micro" weight="font-bold" paddingX={2} paddingY={0.5} radius="sm" className={cat.colorClass}>{tag}</Text>
                  ))}
                </Box>
              </Box>
            ))}
          </Stack>

          <Stack direction={{ base: "col", sm: "row" }} gap={3} marginTop={2} width={{ base: "full", sm: "auto" }}>
            <ActionButton as="a" href="#experiments" variant="primary" paddingX={6} paddingY={3} width={{ base: "full", sm: "auto" }}>
              Explore Live Testbeds
            </ActionButton>
          </Stack>
        </Stack>

        {/* Featured Live Experiments Section */}
        <Stack gap={8} id="experiments" marginTop={2} width="full">
          <Box paddingBottom={2} display="flex" justify="between" align="center" border="b" width="full">
            <Text variant="headline" size="2xl" weight="font-black">Featured Live Experiments</Text>
            <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase tracking="widest" opacityVariant="subtle">LIVE TESTBEDS</Text>
          </Box>
          <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={6} width="full">
            {liveExperiments.map((tool) => (
              <ExperimentCard key={tool.id} tool={tool} baseUrl={baseUrl} onImageClick={setLightboxImage} />
            ))}
          </Grid>
        </Stack>

        <Box className="why-this-matters">
          <Text as="h2" size="3xl" className="label">Why this matters</Text>
          <Text as="p">
            Shipping high-fidelity products requires <Text weight="font-bold" color="main">practical AI orchestration and live testing</Text>. These experiments serve as active sandbox environments to prototype RAG architectures, test hallucination mitigations, and evaluate automated developer workflows in public.
          </Text>
        </Box>

        {/* Secondary Engineering Experiments */}
        <ToolSection title="Automation & Pipeline Experiments" tools={engineeringTools} navigate={navigate} />

        {/* Ecommerce Experiments Section */}
        <ToolSection title="Ecommerce Automation Experiments" tools={e_commerceTools} navigate={navigate} />
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
