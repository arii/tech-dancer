import { Box, Grid } from '@/layouts/Primitives';
import { ContentCard } from '@/components/ui/ContentCard';
import { Post } from '@/lib/types/content';
import { EmptyState } from '@/components/ui/EmptyState';
import { Search } from 'lucide-react';
import { LATEST_ARTICLES_SECTION_ID } from '@/config/blog-content';

interface LatestArticlesProps {
  posts: Post[];
}

export function LatestArticles({ posts }: LatestArticlesProps) {
  if (posts.length === 0) {
    return (
      <EmptyState
        icon={<Search className="w-12 h-12" />}
        title="No results found"
        description="No articles match your current filter or search criteria."
      />
    );
  }

  return (
    <Box id={LATEST_ARTICLES_SECTION_ID} as="section" width="full">
      <Grid cols={{ base: 1, md: 2 }} gap={6}>
        {posts.map((post) => (
          <ContentCard
            key={post.slug}
            {...post}
            basePath="/blog"
          />
        ))}
      </Grid>
    </Box>
  );
}
