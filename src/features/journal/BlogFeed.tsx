import { Box } from '@/components/layout/Primitives';
import { useBlog } from './useBlog';
import FolioGrid from '@/components/ui/FolioGrid';

export default function BlogFeed() {
  const { posts } = useBlog();

  return (
    <Box as="section">
      <FolioGrid items={posts} categoryTitle="Blog Posts" basePath="/blog" />
    </Box>
  );
}
