import { useMemo } from 'react';
import { Box, Grid, Text } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { ContentCard } from '@/components/ui/ContentCard';
import FolioGrid from '@/components/ui/FolioGrid';
import { FilterBar } from '@/components/ui/FilterBar';
import { useBlog } from './useBlog';

const BlogFeed = () => {
  const { posts, categories, view, setView, activeCategory, searchTerm } = useBlog();

  const isInitialView = activeCategory === 'All' && !searchTerm;

  const featuredPosts = useMemo(() =>
    posts.filter(post => post.featured === true),
  [posts]);

  const mainFeedPosts = useMemo(() =>
    isInitialView
      ? posts.filter(post => !post.featured)
      : posts,
  [isInitialView, posts]);

  return (
    <>
      <SEO
        title="Blog"
        description="A searchable, categorized folio of posts covering travel, lifestyle, practical tools, technical portfolio pieces, and everything about West Coast Swing."
      />
      <FolioGrid
        items={mainFeedPosts}
        categoryTitle="Blog Posts"
        as="h1"
        label="INSIGHTS"
        description="A searchable, categorized folio of posts covering travel, lifestyle, practical tools, technical portfolio pieces, and everything about West Coast Swing."
        basePath="/blog"
        searchPlaceholder="Search posts..."
        view={view}
        onViewChange={setView}
        compact={true}
      >
        <Box marginTop={8}>
          <FilterBar
            categories={categories}
          />
        </Box>

        {posts.length === 0 ? (
          <Box paddingY={12} display="flex" align="center" justify="center" minHeight="50vh">
            <Text variant="body" size="lg" color="dim" align="center">
              No posts found.
            </Text>
          </Box>
        ) : (
          isInitialView && featuredPosts.length > 0 && (
          <Box marginTop={12} marginBottom={8} border="b" paddingBottom={12} className="border-line">
            <Box marginBottom={6}>
              <Text variant="mono" size="xs" weight="font-bold" color="accent" tracking="widest" uppercase display="block" marginBottom={2}>
                CURATED GUIDES
              </Text>
              <Text as="h2" variant="display" size="2xl" weight="font-black" color="main" tracking="tight">
                Featured Essentials
              </Text>
              <Text variant="body" size="base" color="dim" marginTop={2}>
                Handpicked, high-priority evergreen advice for local and travel events.
              </Text>
            </Box>
            <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={6}>
              {featuredPosts.map((post) => (
                <Box key={`featured-${post.slug}`} height="full">
                  <ContentCard {...post} basePath="/blog" />
                </Box>
              ))}
            </Grid>
          </Box>
          )
        )}
      </FolioGrid>
    </>
  );
};

export default BlogFeed;
