import { Box, Stack, Text } from '@/layouts/Primitives';
import { useBlog } from './useBlog';
import FolioGrid from '@/components/ui/FolioGrid';
import { FilterBar } from '@/components/ui/FilterBar';
import { AlertCircle } from 'lucide-react';

export default function BlogFeed() {
  const { posts, categories, activeCategory, setActiveCategory, isLoading, error } = useBlog();

  if (error) {
    return (
      <Box as="section" padding="panel" display="flex" align="center" justify="center">
        <Stack gap={4} align="center" textAlign="center">
          <Box display="flex" align="center" justify="center" opacity={20} color="brand">
            <AlertCircle className="w-12 h-12" />
          </Box>
          <Text variant="display" size="2xl">System Error</Text>
          <Text variant="mono" size="xs" color="dim">{error}</Text>
        </Stack>
      </Box>
    );
  }

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
