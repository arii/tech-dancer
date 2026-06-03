import { Box } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { FilterBar } from '@/components/ui/FilterBar';
import FolioGrid from '@/components/ui/FolioGrid';
import { useResearch } from './useResearch';
import { useSearchParam } from '@/hooks/useSearchParam';
import { ContentItem } from '@/lib/content';

export default function ResearchAnalytics() {
  const { tools } = useResearch();
  const [activeCategory] = useSearchParam('category', 'All');

  const categories = ['All', ...new Set(tools.map(t => t.category))];

  const filteredTools = tools.filter(tool =>
    activeCategory === 'All' || tool.category === activeCategory
  );

  // Map ResearchTool to ContentItem format expected by FolioGrid
  const contentItems: ContentItem[] = filteredTools.map(tool => ({
    type: 'study', // Default to study for tool cards
    slug: tool.id,
    title: tool.title,
    category: tool.category,
    excerpt: tool.description,
    content: tool.description, // Required for ContentItem
    author: 'Ariel Anders', // Required for ContentItem
    date: tool.status === 'Active' ? '' : tool.status,
    tags: tool.tags,
    ctaLabel: tool.ctaLabel,
  }));

  return (
    <Box as="section">
      <SEO
        title="DevAI Systems Portfolio"
        description="DevAI systems portfolio by Ariel Anders. High-fidelity automation featuring AI-assisted GitHub PR review agents, data scraping pipelines, Vercel deployments, ecommerce automation, and production React/Vite systems."
        keywords="DevAI, AI engineering, portfolio, GitHub Actions automation, LLM workflows, React, Vite, TypeScript, technical hiring"
      />

      <FolioGrid
        items={contentItems}
        categoryTitle="DevAI Systems Portfolio"
        basePath="/research"
        label="HIRE_ME"
        description="DevAI systems portfolio by Ariel Anders. High-fidelity automation featuring AI-assisted GitHub PR review agents, data scraping pipelines, Vercel deployments, ecommerce automation, and production React/Vite systems."
        searchPlaceholder="Search projects..."
      >
        <FilterBar categories={categories} />
      </FolioGrid>
    </Box>
  );
}
