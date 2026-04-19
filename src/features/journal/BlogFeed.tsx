import { Box, Stack, Grid } from '@/components/layout/Primitives';
import { useBlog } from './useBlog';
import { PageHeader } from '@/components/ui/PageHeader';
import { FilterBar } from '@/components/ui/FilterBar';
import { ContentCard } from '@/components/ui/ContentCard';

export default function BlogFeed() {
  const { posts, activeCategory, setActiveCategory, categories } = useBlog();

  return (
    <Box as="section">
      <Stack gap={16}>
        <PageHeader 
          label="INSIGHTS"
          title="Blog Posts"
          description="A searchable, categorized folio of posts covering travel, lifestyle, gear reviews, technical portfolio pieces, and everything about West Coast Swing."
        />
        
        <Stack gap={10}>
          <FilterBar 
            activeCategory={activeCategory} 
            categories={categories} 
            onSelect={setActiveCategory} 
          />
   
          <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={10}>
          {posts.map((post) => (
            <ContentCard 
              key={post.slug}
              {...post}
              basePath="/blog"
              aspect="video"
            />
          ))}
          </Grid>
        </Stack>
      </Stack>
    </Box>
  );
}
