import { Box } from '@/layouts/Primitives';
import { useBlog } from './useBlog';
import { SEO } from '@/components/SEO';
import FolioGrid from '@/components/ui/FolioGrid';
import { FilterBar } from '@/components/ui/FilterBar';
import type { JSX } from 'react';

export default function BlogFeed(): JSX.Element {
  const { posts, categories, view, setView } = useBlog();

  return (
    <Box as="section">
      <SEO
        title="Blog"
        description="West Coast Swing blog posts covering travel, lifestyle, gear reviews, technical notes, and competition insights."
      />
      <FolioGrid
        items={posts}
        categoryTitle="Blog Posts"
        as="h1"
        label="INSIGHTS"
        description="West Coast Swing blog posts covering travel, lifestyle, gear reviews, technical notes, and competition insights."
        basePath="/blog"
        view={view}
        onViewChange={setView}
      >
        <Box marginTop={8} aria-label="Blog category filters">
          <FilterBar
            categories={categories}
          />
        </Box>
      </FolioGrid>
    </Box>
  );
}
