import { Box, Grid, Stack, Text } from '@/layouts/Primitives';
import { useBlog } from './useBlog';
import { SEO } from '@/components/SEO';
import { EditorialNewsletter } from '@/components/editorial/EditorialNewsletter';
import { BlogHero } from './components/BlogHero';
import { FeaturedArticle } from './components/FeaturedArticle';
import { TopicNavigation } from './components/TopicNavigation';
import { LatestArticles } from './components/LatestArticles';
import { PopularResources } from './components/PopularResources';
import { SearchBox } from '@/components/ui/SearchBox';

export default function BlogFeed() {
  const { posts, activeCategory, searchTerm, setSearchTerm } = useBlog();

  // Featured article: most popular or most recent guide
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);
  const popularPosts = posts.slice(1, 4);

  return (
    <Box as="section">
      <SEO
        title="Blog"
        description="A searchable, categorized folio of posts covering travel, lifestyle, gear reviews, technical portfolio pieces, and everything about West Coast Swing."
      />

      {activeCategory === 'All' && !searchTerm && (
        <>
          <BlogHero />

          {featuredPost && (
            <Box paddingY={12}>
              <FeaturedArticle post={featuredPost} />
            </Box>
          )}

          <TopicNavigation />
        </>
      )}

      <Stack gap={8} paddingY={12}>
        <Box display="flex" align="center" justify="between" gap={4} flexWrap="wrap">
          <Text variant="headline" size="lg" weight="font-black" uppercase tracking="widest">
            {searchTerm ? `Results for "${searchTerm}"` : (activeCategory === 'All' ? 'Latest Articles' : activeCategory)}
          </Text>
          <SearchBox
            value={searchTerm || ''}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search posts..."
          />
        </Box>

        <Grid cols={{ base: 1, lg: 12 }} gap={12}>
          <Box gridColumn={{ lg: "span 8" }}>
            <LatestArticles posts={activeCategory === 'All' && !searchTerm ? remainingPosts : posts} />
          </Box>

          <Box gridColumn={{ lg: "span 4" }} display={{ base: 'none', lg: 'block' }}>
            <Stack gap={12} position="sticky" top={24}>
              <PopularResources posts={popularPosts} />
              <EditorialNewsletter />
            </Stack>
          </Box>
        </Grid>
      </Stack>

      {/* Mobile Newsletter */}
      <Box display={{ base: 'block', lg: 'none' }} paddingY={12}>
        <EditorialNewsletter />
      </Box>
    </Box>
  );
}
