import { Box, Grid, Text, Stack } from '@/layouts/Primitives';
import { useBlog } from './useBlog';
import { SEO } from '@/components/SEO';
import { ContentCard } from '@/components/ui/ContentCard';
import { SearchBox } from '@/components/ui/SearchBox';
import { ViewToggle } from '@/components/ui/ViewToggle';
import { EmptyState } from '@/components/ui/EmptyState';
import { Search } from 'lucide-react';
import { BlogHero } from './components/BlogHero';
import { FeaturedArticle } from './components/FeaturedArticle';
import { BlogTopicGrid } from './components/BlogTopicGrid';
import { PopularResources } from './components/PopularResources';
import { BlogNewsletter } from './components/BlogNewsletter';

export default function BlogFeed() {
  const { posts, view, setView, searchTerm, setSearchTerm } = useBlog();

  const featuredPost = posts.find(p => p.slug === '2026-04-18-make-shoe-dance') || posts[0];

  return (
    <Box as="section" className="mx-auto w-full max-w-[1600px] min-w-0 px-4 sm:px-6 lg:px-8 pb-safe-bottom">
      <SEO
        title="Blog"
        description="A searchable, categorized folio of posts covering travel, lifestyle, gear reviews, technical portfolio pieces, and everything about West Coast Swing."
      />

      <BlogHero />

      {featuredPost && <FeaturedArticle post={featuredPost} />}

      <BlogTopicGrid posts={posts} />

      {/* Latest Articles Section */}
      <Box as="section" marginTop={{ base: 16, lg: 32 }}>
        <Stack
          direction={{ base: 'col', sm: 'row' }}
          align={{ base: 'start', sm: 'center' }}
          justify="between"
          gap={6}
          marginBottom={8}
        >
          <Text variant="mono" size="xs" color="brand" weight="font-black" uppercase tracking="widest">
            Latest Articles
          </Text>

          <Box display="flex" align="center" gap={4} wrap className="w-full sm:w-auto">
            <SearchBox
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search posts..."
            />
            <ViewToggle view={view} onChange={setView} />
          </Box>
        </Stack>

        {posts.length === 0 ? (
          <EmptyState
            icon={<Search className="w-12 h-12" />}
            title="No results found"
            description={searchTerm ? `No matches for "${searchTerm}".` : `No articles found.`}
          />
        ) : (
          <Grid
            cols={{ base: 1, md: 2, xl: 3, "2xl": 4 }}
            gap={4}
            className="grid-cols-[repeat(auto-fit,minmax(360px,1fr))]"
          >
            {posts.map((post) => (
              <ContentCard
                key={post.slug}
                {...post}
                basePath="/blog"
              />
            ))}
          </Grid>
        )}
      </Box>

      <PopularResources />
      <BlogNewsletter />
    </Box>
  );
}
