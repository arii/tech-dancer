import { Box } from '@/layouts/Primitives';
import { useBlog } from './useBlog';
import { SEO } from '@/components/SEO';
import FolioGrid from '@/components/ui/FolioGrid';
import { FilterBar } from '@/components/ui/FilterBar';

/**
 * Main feed for the Boomtick Blog.
 *
 * WHY:
 * Central hub for all editorial content, providing search,
 * filtering, and featured article highlights.
 */
export default function BlogFeed() {
  const { posts, categories, activeCategory, setCategory, view, setView, isLoading } = useBlog();

  return (
    <>
      <SEO
        title="Blog"
        description="A searchable, categorized folio of posts covering travel, lifestyle, practical tools, technical portfolio pieces, and everything about West Coast Swing."
      />
      <FolioGrid
        items={posts}
        categoryTitle="Blog Posts"
        as="h1"
        label="INSIGHTS"
        description="A searchable, categorized folio of posts covering travel, lifestyle, practical tools, technical portfolio pieces, and everything about West Coast Swing."
        overview="Explore: • Guides • Gear Reviews • Event Resources • Travel & Lifestyle • Dance Knowledge"
        basePath="/blog"
        view={view}
        onViewChange={setView}
        loading={isLoading}
      >
        <Box marginTop={8}>
          <FilterBar
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setCategory}
          />
        </Box>
      </FolioGrid>
    </>
  );
}
