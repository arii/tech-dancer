import { Box, Stack } from '@/components/Primitives';
import { useBlog } from '@/hooks/useBlog';
import FolioGrid from '@/components/FolioGrid';
import { FilterBar } from '@/components/FilterBar';

export default function BlogFeed() {
  const { posts, categories, activeCategory, setActiveCategory, isLoading } = useBlog();

  return (
    <Box as="section">
      <FolioGrid
        items={posts}
        loading={isLoading}
        categoryTitle="Blog Posts"
        label="INSIGHTS"
        description="A searchable, categorized folio of posts covering travel, lifestyle, gear reviews, technical portfolio pieces, and everything about West Coast Swing."
        basePath="/blog"
      >
        <Box marginTop={8}>
          <FilterBar
            activeCategory={activeCategory}
            categories={categories}
            onSelect={setActiveCategory}
          />
        </Box>
      </FolioGrid>
    </Box>
  );
}
