import { useBlog } from './useBlog';
import { SEO } from '@/components/SEO';
import FolioGrid from '@/components/ui/FolioGrid';
import { FilterBar } from '@/components/ui/FilterBar';
import { Box } from "@/layouts/Primitives";

export default function BlogFeed() {
  const { posts, categories, view, setView } = useBlog();

  return (
    <Box as="section">
      <SEO
        title="Blog"
        description="A searchable, categorized folio of posts covering travel, lifestyle, gear reviews, technical portfolio pieces, and everything about West Coast Swing."
      />
      <FolioGrid
        items={posts}
        categoryTitle="Blog Posts"
        as="h1"
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
