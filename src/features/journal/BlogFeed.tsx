import { Box, Grid, Stack, Text, Button } from '@/layouts/Primitives';
import { useBlog } from './useBlog';
import { SEO } from '@/components/SEO';
import { EditorialNewsletter } from '@/components/editorial/EditorialNewsletter';
import { BlogHero } from './components/BlogHero';
import { FeaturedArticle } from './components/FeaturedArticle';
import { TopicNavigation } from './components/TopicNavigation';
import { LatestArticles } from './components/LatestArticles';
import { PopularResources } from './components/PopularResources';
import { SearchBox } from '@/components/ui/SearchBox';
import { useSearchParam } from '@/hooks/useSearchParam';

export default function BlogFeed() {
  const {
    activeCategory,
    searchTerm,
    setSearchTerm,
    featuredPost,
    popularPosts,
    latestPosts
  } = useBlog();
  const [, setCategory] = useSearchParam('category', 'All');

  const isFiltered = activeCategory !== 'All' || !!searchTerm;

  return (
    <Box as="section">
      <SEO
        title="Blog"
        description="A searchable, categorized folio of posts covering travel, lifestyle, gear reviews, technical portfolio pieces, and everything about West Coast Swing."
      />

      {!isFiltered && (
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
          <Stack direction="row" align="center" gap={4}>
            <Text variant="headline" size="lg" weight="font-black" uppercase tracking="widest">
              {searchTerm ? `Results for "${searchTerm}"` : (activeCategory === 'All' ? 'Latest Articles' : activeCategory)}
            </Text>
            {isFiltered && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setCategory('All');
                  setSearchTerm('');
                }}
                padding={0}
                height="auto"
                className="text-accent hover:underline"
              >
                Clear all
              </Button>
            )}
          </Stack>
          <SearchBox
            value={searchTerm || ''}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search posts..."
          />
        </Box>

        <Grid cols={{ base: 1, lg: 12 }} gap={12}>
          <Box gridColumn={{ lg: "span 8" }}>
            <LatestArticles posts={latestPosts} />
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
