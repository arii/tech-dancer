// impeccable-ignore-file
import React, { useState, useMemo } from 'react';
import { Icon } from '@/components/ui/Icon';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, ArrowRight, Activity, FileText, Cpu, LucideIcon, ExternalLink, Github, Globe, Clock, X, FlaskConical, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { BaseCard } from '@/components/ui/BaseCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ActionButton } from '@/components/ui/ActionButton';
import { useResearch } from './useResearch';
import { cardVariants } from '@/lib/variants';
import { ResearchTool } from '@/config/research-tools';
import { SOCIAL_LINKS } from '@/config/constants';
import { FilterButton } from '@/components/ui/FilterButton';
import { motion, AnimatePresence } from 'framer-motion';

function getToolIcon(tool: ResearchTool): LucideIcon {
  if (tool.category.includes('DevAI')) return Cpu;
  if (tool.id.includes('scraper') || tool.id.includes('pipeline')) return Activity;
  if (tool.id.includes('hrm')) return Globe;
  return Search;
}

function ToolImage({ tool, baseUrl, onImageClick }: { tool: ResearchTool; baseUrl: string; onImageClick?: (src: string) => void }) {
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
        className="opacity-heavy hover:opacity-100 transition-opacity duration-500 w-full"
      />
    </Box>
  );
}

function FlagshipCard({
  tool,
  baseUrl,
  onImageClick
}: {
  tool: ResearchTool;
  baseUrl: string;
  onImageClick?: (src: string) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = (e: React.MouseEvent) => {
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
        <Stack flex={1} className="pt-[14px] px-4 pb-4" gap={0}>
          <Box display="flex" justify="between" align="start" width="full" marginBottom={3}>
            <Box width={12} height={12} surface="muted" radius="lg" display="flex" align="center" justify="center" className="border border-white/8">
              <Icon icon={getToolIcon(tool)} size="lg" color="accent" />
            </Box>
            <StatusBadge label={tool.id === 'boomtick-blog' ? 'Active dev' : 'Flagship'} />
          </Box>

          <Text variant="mono" size="micro" color="accent" weight="font-bold" uppercase tracking="widest" marginBottom={1}>
            {tool.category}
          </Text>
          <Text variant="display" size="2xl" weight="font-black" marginBottom={2}>
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
            <Box as="button" onClick={toggleExpand} className="text-accent hover:underline text-xs font-semibold mb-5 self-start focus:outline-none z-30">
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

          <Stack direction={{ base: "col", sm: "row" }} gap={3} marginTop="auto" width={{ base: "full", sm: "auto" }}>
            {tool.externalUrl && (
              <ActionButton
                as="a"
                href={tool.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                paddingX={4}
                paddingY={2}
                zIndex={20}
                width={{ base: "full", sm: "auto" }}
              >
                {tool.externalLinkDisplayLabel || 'Open Link'}
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
                zIndex={20}
                width={{ base: "full", sm: "auto" }}
              >
                Source Repo
                <Icon icon={Github} size="sm" />
              </ActionButton>
            )}
          </Stack>
        </Stack>
      </Stack>
    </BaseCard>
  );
}

function ToolCard({ tool, navigate }: {
  tool: ResearchTool;
  navigate: (path: string) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLink = !!tool.sourceUrl;
  const href = tool.sourceUrl || tool.canonicalPath || `/research/${tool.id}`;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isLink) {
      e.preventDefault();
      navigate(href);
    }
  };

  const toggleExpand = (e: React.MouseEvent) => {
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
      className={cn(cardVariants({ interactive: true }), "pt-[14px] px-4 pb-4 flex flex-col h-full no-underline")}
    >
      <Stack gap={0} width="full">
        <Box display="flex" justify="between" align="start" width="full" marginBottom={3}>
          <Box width={10} height={10} surface="muted" radius="md" display="flex" align="center" justify="center" className="border border-white/8">
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
          <Box as="button" onClick={toggleExpand} className="text-accent hover:underline text-xs font-semibold mb-5 self-start focus:outline-none">
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
          {isLink ? 'View Source' : 'View Assets'}
        </Text>
        <Icon icon={ArrowRight} size="md" color="accent" />
      </Box>
    </Stack>
  );
}


export default function ResearchAnalytics() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'All';
  const { studies, tools } = useResearch();
  const baseUrl = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(['All']);
    tools.forEach(tool => {
      tool.categories?.forEach(cat => cats.add(cat));
    });
    return Array.from(cats).sort((a, b) => {
      if (a === 'All') return -1;
      if (b === 'All') return 1;
      return a.localeCompare(b);
    });
  }, [tools]);

  const filteredTools = useMemo(() => {
    if (activeCategory === 'All') return tools;
    return tools.filter(tool => tool.categories?.includes(activeCategory));
  }, [tools, activeCategory]);

  const flagshipTools = filteredTools.filter(t => t.taxonomyBucket === 'flagship' || t.isFlagship);
  const engineeringTools = filteredTools.filter(t => t.taxonomyBucket === 'engineering');
  const dataContentTools = filteredTools.filter(t => t.taxonomyBucket === 'data-content');
  const e_commerceTools = filteredTools.filter(t => t.taxonomyBucket === 'e-commerce');

  const handleCategoryChange = (category: string) => {
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const researchCollections = [
    { title: 'AI Engineering', id: 'AI' },
    { title: 'Automation', id: 'Automation' },
    { title: 'Observability', id: 'Observability' },
    { title: 'Developer Productivity', id: 'Productivity' },
  ];

  return (
    <Box as="section" maxWidth="7xl" marginX="auto" width="full">
      <SEO
        title="DevAI Portfolio"
        description="DevAI portfolio by Ariel Anders. High-fidelity automation featuring AI-assisted GitHub PR review agents, data scraping pipelines, Vercel deployments, ecommerce automation, and production React/Vite systems."
        keywords="DevAI, AI engineering, portfolio, GitHub Actions automation, LLM workflows, React, Vite, TypeScript, technical hiring"
      />
      <Stack gap={16} width="full">
        {/* Split Hero Section */}
        <Grid cols={{ base: 1, lg: 12 }} gap={8} align="center" width="full">
          <Stack gap={2} span={{ base: 1, lg: 7 }}>
            <PageHeader
              label="HIRE_ME"
              title="DevAI Portfolio"
              as="h1"
              paddingBottom={0}
              border="none"
            />
            <Text variant="body" size={{ base: "lg", lg: "xl" }} color="dim" maxWidth="prose" leading="relaxed">
              Senior roboticist and MIT PhD. I ship production robotics systems and build AI-assisted engineering infrastructure — agentic CI/CD, LLM workflows, and developer tooling. Open to Staff SWE roles, robotics contracts, and DevAI consulting.
            </Text>
            
            {/* Scrollable Focus Tags for Mobile */}
            <Stack direction="col" align="start" gap={2} width="full" marginTop={2} marginBottom={2} display={{ base: "flex", lg: "none" }} className="py-1">
              <Text size="micro" color="dim" uppercase tracking="widest" weight="font-bold">Focus</Text>
              <Box display="flex" overflowX="auto" noScrollbar gap={2} width="full" className="flex-nowrap scroll-mask-fade">
                {[
                  { tag: 'React', col: 'bg-brand-purple/10 text-brand-purple border border-brand-purple/20' },
                  { tag: 'Vite', col: 'bg-brand-purple/10 text-brand-purple border border-brand-purple/20' },
                  { tag: 'TypeScript', col: 'bg-brand-purple/10 text-brand-purple border border-brand-purple/20' },
                  { tag: 'Python', col: 'bg-brand-purple/10 text-brand-purple border border-brand-purple/20' },
                  { tag: 'GitHub Actions', col: 'bg-brand-green/10 text-brand-green border border-brand-green/20' },
                  { tag: 'Vercel', col: 'bg-brand-green/10 text-brand-green border border-brand-green/20' },
                  { tag: 'Playwright', col: 'bg-brand-green/10 text-brand-green border border-brand-green/20' },
                  { tag: 'ROS1/2', col: 'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20' },
                  { tag: 'C++', col: 'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20' },
                  { tag: 'Navigation', col: 'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20' },
                  { tag: 'Localization', col: 'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20' },
                  { tag: 'LLM Workflows', col: 'bg-brand-amber/10 text-brand-amber border border-brand-amber/20' },
                  { tag: 'Agentic CI/CD', col: 'bg-brand-amber/10 text-brand-amber border border-brand-amber/20' },
                ].map(item => (
                  <Text key={item.tag} size="micro" weight="font-bold" paddingX={2} paddingY={0.5} radius="sm" className={cn(item.col, "shrink-0")}>{item.tag}</Text>
                ))}
              </Box>
            </Stack>

            {/* Categorized Stack Grid for Desktop */}
            <Stack gap={2} marginTop={4} marginBottom={4} width="full" display={{ base: "none", lg: "flex" }}>
              <Box display="flex" align="center" gap={2} width="full">
                <Text size="micro" color="dim" uppercase tracking="widest" weight="font-bold" width={24} shrink={0}>Stack</Text>
                <Box display="flex" wrap="wrap" gap={2} width="full">
                  {['React', 'Vite', 'TypeScript', 'Python'].map(tag => (
                    <Text key={tag} size="micro" weight="font-bold" paddingX={2} paddingY={0.5} radius="sm" className="bg-brand-purple/10 text-brand-purple border border-brand-purple/20">{tag}</Text>
                  ))}
                </Box>
              </Box>
              <Box display="flex" align="center" gap={2} width="full">
                <Text size="micro" color="dim" uppercase tracking="widest" weight="font-bold" width={24} shrink={0}>Infra</Text>
                <Box display="flex" wrap="wrap" gap={2} width="full">
                  {['GitHub Actions', 'Vercel', 'Playwright'].map(tag => (
                    <Text key={tag} size="micro" weight="font-bold" paddingX={2} paddingY={0.5} radius="sm" className="bg-brand-green/10 text-brand-green border border-brand-green/20">{tag}</Text>
                  ))}
                </Box>
              </Box>
              <Box display="flex" align="center" gap={2} width="full">
                <Text size="micro" color="dim" uppercase tracking="widest" weight="font-bold" width={24} shrink={0}>Robotics</Text>
                <Box display="flex" wrap="wrap" gap={2} width="full">
                  {['ROS1/2', 'C++', 'Navigation', 'Localization'].map(tag => (
                    <Text key={tag} size="micro" weight="font-bold" paddingX={2} paddingY={0.5} radius="sm" className="bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20">{tag}</Text>
                  ))}
                </Box>
              </Box>
              <Box display="flex" align="center" gap={2} width="full">
                <Text size="micro" color="dim" uppercase tracking="widest" weight="font-bold" width={24} shrink={0}>AI</Text>
                <Box display="flex" wrap="wrap" gap={2} width="full">
                  {['LLM Workflows', 'Agentic CI/CD'].map(tag => (
                    <Text key={tag} size="micro" weight="font-bold" paddingX={2} paddingY={0.5} radius="sm" className="bg-brand-amber/10 text-brand-amber border border-brand-amber/20">{tag}</Text>
                  ))}
                </Box>
              </Box>
            </Stack>

            <Stack direction={{ base: "col", sm: "row" }} gap={3} marginTop={2} width={{ base: "full", sm: "auto" }}>
              <ActionButton as="a" href="#flagship" variant="primary" paddingX={6} paddingY={3} width={{ base: "full", sm: "auto" }}>
                View Flagship Projects
              </ActionButton>
              <ActionButton as="a" href="#articles" variant="secondary" paddingX={6} paddingY={3} width={{ base: "full", sm: "auto" }}>
                Read Implementation Articles
              </ActionButton>
            </Stack>
          </Stack>

        </Grid>

        {/* Filter Section */}
        <Stack
          gap={3}
          position="sticky"
          top={0}
          zIndex={20}
          paddingY={4}
          paddingX={{ base: 4, sm: 0 }}
          marginX={{ base: -4, sm: 0 }}
          className="backdrop-blur-md bg-bg/80"
        >
          <Stack direction="row" align="center" gap={2}>
            <Filter className="w-4 h-4 text-dim" />
            <Text variant="headline" size="sm" weight="font-bold" uppercase tracking="wider" color="dim">
              Filter Research
            </Text>
          </Stack>
          <Box border="b" paddingBottom={2} overflowX="auto" noScrollbar>
            <Stack direction="row" gap={2} padding={1} minWidth="max">
              {categories.map((category) => (
                <FilterButton
                  key={category}
                  label={category}
                  isActive={activeCategory === category}
                  onClick={() => handleCategoryChange(category)}
                />
              ))}
            </Stack>
          </Box>
        </Stack>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Stack gap={16}>
              {/* Flagship Projects Section */}
              {flagshipTools.length > 0 && (
                <Stack gap={8} id="flagship" width="full">
                  <Box paddingBottom={2} display="flex" justify="between" align="center" border="b" width="full">
                    <Text variant="headline" size="2xl" weight="font-black">Flagship Projects</Text>
                    <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase tracking="widest" opacityVariant="subtle">CASE STUDIES</Text>
                  </Box>
                  <Box display="grid" className="responsive-grid" gap={6} width="full">
                    {flagshipTools.map((tool) => (
                      <FlagshipCard key={tool.id} tool={tool} baseUrl={baseUrl} onImageClick={setLightboxImage} />
                    ))}
                  </Box>
                </Stack>
              )}

              {/* Engineering Systems Section */}
              {engineeringTools.length > 0 && (
                <Stack gap={12} width="full">
                  <Box paddingBottom={4} display="flex" justify="between" align="center" border="b" width="full">
                    <Text variant="headline" size="2xl" weight="font-black">Engineering Systems</Text>
                    <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase tracking="widest" opacityVariant="subtle">{engineeringTools.length} TOOLS</Text>
                  </Box>

                  <Box display="grid" className="responsive-grid" gap={6} width="full">
                    {engineeringTools.map((tool) => (
                      <ToolCard key={tool.id} tool={tool} navigate={navigate} />
                    ))}
                  </Box>
                </Stack>
              )}

              {/* Data & Content Systems Section */}
              {dataContentTools.length > 0 && (
                <Stack gap={12} width="full">
                  <Box paddingBottom={4} display="flex" justify="between" align="center" border="b" width="full">
                    <Text variant="headline" size="2xl" weight="font-black">Data & Content Systems</Text>
                    <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase tracking="widest" opacityVariant="subtle">{dataContentTools.length} TOOLS</Text>
                  </Box>

                  <Box display="grid" className="responsive-grid" gap={6} width="full">
                    {dataContentTools.map((tool) => (
                      <ToolCard key={tool.id} tool={tool} navigate={navigate} />
                    ))}
                  </Box>
                </Stack>
              )}

              {/* Ecommerce Experiments Section */}
              {e_commerceTools.length > 0 && (
                <Stack gap={12} width="full">
                  <Box paddingBottom={4} display="flex" justify="between" align="center" border="b" width="full">
                    <Text variant="headline" size="2xl" weight="font-black">Ecommerce Experiments</Text>
                    <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase tracking="widest" opacityVariant="subtle">{e_commerceTools.length} TOOLS</Text>
                  </Box>

                  <Box display="grid" className="responsive-grid" gap={6} width="full">
                    {e_commerceTools.map((tool) => (
                      <ToolCard key={tool.id} tool={tool} navigate={navigate} />
                    ))}
                  </Box>
                </Stack>
              )}
            </Stack>
          </motion.div>
        </AnimatePresence>

        {/* Research Collections Section */}
        <Stack gap={8} width="full">
          <Box paddingBottom={2} display="flex" justify="between" align="center" border="b" width="full">
            <Text variant="headline" size="2xl" weight="font-black">Research Collections</Text>
            <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase tracking="widest" opacityVariant="subtle">CURATED GROUPS</Text>
          </Box>
          <Grid cols={{ base: 1, sm: 2, md: 4 }} gap={4}>
            {researchCollections.map((collection) => (
              <Stack
                key={collection.id}
                as="button"
                onClick={() => handleCategoryChange(collection.id)}
                padding={6}
                surface="muted"
                radius="xl"
                align="center"
                justify="center"
                className="border border-line/20 hover:border-accent/40 transition-all group"
              >
                <Text weight="font-bold" color="main" className="group-hover:text-accent transition-colors">
                  {collection.title}
                </Text>
                <Box display="flex" align="center" gap={1} marginTop={2}>
                  <Text variant="mono" size="xs" weight="font-bold" color="accent" uppercase tracking="widest">Explore</Text>
                  <Icon icon={ArrowRight} size="xs" color="accent" />
                </Box>
              </Stack>
            ))}
          </Grid>
        </Stack>

        <Box className="why-this-matters">
          <Text className="label">Why this matters</Text>
          <Text as="p">
            Shipping high-fidelity products requires <Text weight="font-bold" color="main">practical AI orchestration</Text>, not hype. I focus on engineering systems that keep the developer in the loop while maintaining high standards.
          </Text>
        </Box>

        {/* Articles & Research Section */}
        {studies.length > 0 && (
          <Stack gap={12} id="articles" width="full">
            <Box paddingBottom={4} display="flex" justify="between" align="center" border="b" width="full">
              <Text as="h2" variant="headline" size="2xl" weight="font-black">Articles & Research</Text>
              <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase tracking="widest" opacityVariant="subtle">{studies.length} POSTS</Text>
            </Box>

            <Box display="grid" className="responsive-grid" gap={6} width="full">
              {studies.map((study) => (
                <Stack
                  key={study.slug}
                  onClick={() => {
                    if (study.status === 'published') {
                      navigate(`/research/${study.slug}`);
                    }
                  }}
                  height="full"
                  surface={study.status === 'published' ? 'surface' : 'muted'}
                  className={cn(cardVariants({
                    interactive: study.status === 'published'
                  }), "pt-[14px] px-4 pb-4")}
                  opacity={study.status === 'published' ? 1 : "high"}
                  cursor={study.status === 'published' ? 'pointer' : 'default'}
                  gap={0}
                >
                  <Box display="flex" justify="between" align="center" marginBottom={3} width="full">
                    <Text variant="mono" size="micro" color="accent" weight="font-bold" uppercase tracking="widest">{study.category}</Text>
                    {study.status && <StatusBadge label={study.status} />}
                  </Box>

                  <Text variant="display" size="2xl" weight="font-black" marginBottom={2}>
                    {study.title}
                  </Text>
                  <Box display="flex" align="center" gap={4} marginBottom={3}>
                    <Text variant="mono" size="micro" color="dim" opacityVariant="muted">{study.date}</Text>
                    {study.readTime && (
                      <Box display="flex" align="center" gap={1} opacityVariant="muted">
                        <Icon icon={Clock} size="xs" color="dim" />
                        <Text variant="mono" size="micro" color="dim">{study.readTime} MIN</Text>
                      </Box>
                    )}
                  </Box>

                  <Text variant="body" size="sm" color="dim" clamp={3} leading="relaxed" marginBottom={3}>
                    {study.excerpt}
                  </Text>

                  {study.tags && study.tags.length > 0 && (
                    <Box display="flex" wrap="wrap" gap={1.5} marginBottom={3}>
                      {study.tags.map(tag => (
                        <Text key={tag} className="flagship-tag">
                          {tag}
                        </Text>
                      ))}
                    </Box>
                  )}

                  <Box display="flex" align="center" gap={2} marginTop="auto">
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
            </Box>
          </Stack>
        )}

        {/* Work With Me block */}
        <Grid cols={{ base: 1, md: 12 }} gap={8} padding={8} surface="muted" radius="xl" className="border border-line/20" id="work-with-me" align="center" width="full">
          {/* Description Column (Left) */}
          <Stack gap={4} span={{ base: 1, md: 7 }} justify="center">
            <Box paddingBottom={2} className="border-b border-line/10">
              <Text variant="headline" size="2xl" weight="font-black">Work with me</Text>
            </Box>
            <Text variant="body" size="lg" color="dim" leading="relaxed" maxWidth="prose">
              These are my own projects — built to solve real problems I care about.
              If you need a senior roboticist, DevAI engineering infrastructure,
              or someone who can do both, I'm available for project-based contracts
              and full-time roles.
            </Text>
          </Stack>

          {/* Contact Details Column (Right) */}
          <Stack gap={4} span={{ base: 1, md: 5 }} align={{ base: "start", md: "end" }} textAlign={{ base: "left", md: "right" }}>
            <Text variant="mono" size="xs" color="dim" uppercase tracking="widest" weight="font-bold" opacityVariant="subtle">Get in touch</Text>
            <Box display="flex" align="center" gap={4} wrap="wrap" justify={{ base: "start", md: "end" }} marginTop={2}>
              <Box as="a" href="mailto:anders.ariel@gmail.com" className="hover:text-accent transition-colors">
                <Text variant="mono" size="xs" weight="font-bold" color="accent" uppercase tracking="widest">Email</Text>
              </Box>
              <Text color="dim" opacityVariant="muted" size="xs">·</Text>
              <Box as="a" href={SOCIAL_LINKS.LINKEDIN} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <Text variant="mono" size="xs" weight="font-bold" color="accent" uppercase tracking="widest">LinkedIn</Text>
              </Box>
              <Text color="dim" opacityVariant="muted" size="xs">·</Text>
              <Box as="a" href={SOCIAL_LINKS.GITHUB} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <Text variant="mono" size="xs" weight="font-bold" color="accent" uppercase tracking="widest">GitHub</Text>
              </Box>
            </Box>
          </Stack>
        </Grid>
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
}
