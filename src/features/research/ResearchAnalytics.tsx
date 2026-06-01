import { useNavigate } from 'react-router-dom';
import { Box, Stack } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { FilterBar } from '@/components/ui/FilterBar';
import FolioGrid from '@/components/ui/FolioGrid';
import { useResearch } from './useResearch';
import { useSearchParam } from '@/hooks/useSearchParam';
import { ResearchTool } from '@/config/research-tools';
import { ContentCard } from '@/components/ui/ContentCard';

export default function ResearchAnalytics() {
  const navigate = useNavigate();
  const { tools } = useResearch();
  const [activeCategory] = useSearchParam('category', 'All');

  const categories = ['All', ...new Set(tools.map(t => t.category))];

  const filteredTools = tools.filter(tool =>
    activeCategory === 'All' || tool.category === activeCategory
  );

  // Map ResearchTool to ContentItem format expected by FolioGrid
  const contentItems = filteredTools.map(tool => ({
    slug: tool.id,
    title: tool.title,
    category: tool.category,
    excerpt: tool.description,
    date: tool.status === 'Active' ? undefined : tool.status,
    tags: tool.tags,
    ctaLabel: tool.ctaLabel,
  }));

  return (
    <Box as="section">
      <SEO
        title="DevAI Portfolio | AI Systems & Orchestration"
        description="A portfolio of AI-assisted product development, DevAI orchestration consoles, and high-fidelity RAG telemetry pipelines."
      />

      <FolioGrid
        items={contentItems as any}
        categoryTitle="DevAI Portfolio"
        basePath="/research"
        label="PORTFOLIO"
        description="Real-world examples of AI-assisted product development, orchestration consoles, and automated engineering workflows."
        searchPlaceholder="Search projects..."
      >
        <FilterBar categories={categories} />
      </FolioGrid>
    </Box>
  );
}
