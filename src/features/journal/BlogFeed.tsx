import { Box } from '@/components/layout/Primitives';
import { useBlog } from './useBlog';
import FolioGrid from '@/components/ui/FolioGrid';

export default function BlogFeed() {
  const { posts } = useBlog();

  return (
    <Box as="section">
      <FolioGrid
        items={posts}
        categoryTitle="Blog Posts"
        label="INSIGHTS"
        description="A searchable, categorized folio of posts covering travel, lifestyle, gear reviews, technical portfolio pieces, and everything about West Coast Swing."
        basePath="/blog"
      />
    </Box>
  );
}
