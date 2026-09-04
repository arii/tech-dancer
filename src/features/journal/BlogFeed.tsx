import { Box } from '@/layouts/Primitives';
import { useBlog } from './useBlog';
import { SEO } from '@/components/SEO';
import FolioGrid from '@/components/ui/FolioGrid';
import { FilterBar } from '@/components/ui/FilterBar';
import { generateCollectionPageSchema } from '@/utils/schema';

export default function BlogFeed() {
  const { posts, categories, view, setView } = useBlog();

  const blogSchema = generateCollectionPageSchema({
    name: "West Coast Swing Dance Articles & Tips",
    description: "Explore practical West Coast Swing tips, competition travel advice, dance shoe DIY guides, and community insights written by Ariel Anders, PhD.",
    url: "/blog",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Journal", path: "/blog" }
    ]
  });

  return (
    <>
      <SEO
        title="West Coast Swing Dance Articles & Tips"
        description="Explore practical West Coast Swing tips, competition travel advice, dance shoe DIY guides, and community insights written by Ariel Anders, PhD."
        schema={blogSchema}
      />
      <FolioGrid
        items={posts}
        categoryTitle="Blog Posts"
        as="h1"
        label="INSIGHTS"
        description="A searchable, categorized folio of posts covering travel, lifestyle, practical tools, technical portfolio pieces, and everything about West Coast Swing."
        basePath="/blog"
        searchPlaceholder="Search posts..."
        view={view}
        onViewChange={setView}
      >
        <Box marginTop={8}>
          <FilterBar
            categories={categories}
          />
        </Box>
      </FolioGrid>
    </>
  );
}
