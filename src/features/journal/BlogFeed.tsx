import { Box } from '@/layouts/Primitives';
import { useBlog } from './useBlog';
import FolioGrid from '@/components/ui/FolioGrid';
import { FilterBar } from '@/components/ui/FilterBar';

export default function BlogFeed() {
  const { posts, categories, view, setView, isLoading } = useBlog();

  return (
    <Box as="section">
      <FolioGrid
        items={posts}
        loading={isLoading}
        categoryTitle="Blog Posts"
        label="INSIGHTS"
        description="A searchable, categorized folio of posts covering travel, lifestyle, gear reviews, technical portfolio pieces, and everything about West Coast Swing."
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
