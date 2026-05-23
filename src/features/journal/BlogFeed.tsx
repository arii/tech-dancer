import { Box } from '@/layouts/Primitives';
import { useBlog } from './useBlog';
import { SEO } from '@/components/SEO';
import FolioGrid from '@/components/ui/FolioGrid';
import { FilterBar } from '@/components/ui/FilterBar';

export default function BlogFeed() {
  const { posts, categories, view, setView } = useBlog();

  return (
    <Box as="section">
      <SEO
        title="Blog"
        description="A curated collection of posts covering travel, lifestyle, gear reviews, and the technical DevAI portfolio for West Coast Swing."
      />
      <FolioGrid
        items={posts}
        categoryTitle="Blog"
        as="h1"
        label="INSIGHTS"
        description="A curated collection of posts covering travel, lifestyle, gear reviews, and the technical DevAI portfolio for West Coast Swing."
        basePath="/blog"
        view={view}
        onViewChange={setView}
      >
        <Box marginTop={8}>
          <FilterBar
            categories={categories}
          />
        </Box>
      </FolioGrid>
    </Box>
  );
}
