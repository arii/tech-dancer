import { Box, Grid, Text, Stack } from '@/layouts/Primitives';
import { useBlog } from './useBlog';
import { SEO } from '@/components/SEO';
import { ContentCard } from '@/components/ui/ContentCard';
import { ContentFeedSection } from '@/components/ui/ContentFeedSection';
import { BlogHero } from './components/BlogHero';
import { FeaturedArticle } from './components/FeaturedArticle';
import { BlogTopicGrid } from './components/BlogTopicGrid';
import { BlogNewsletter } from './components/BlogNewsletter';

export default function BlogFeed() {
  const { posts, view, setView, searchTerm, setSearchTerm } = useBlog();

  const featuredPost = posts.find(p => p.featured) || posts[0];

  return (
    <Box
      as="section"
      marginX="auto"
      width="full"
      maxWidth="screen-2xl"
      minWidth={0}
      paddingX={{ base: 4, sm: 6, lg: 8 }}
      paddingBottom={12}
    >
      <SEO
        title="Blog"
        description="A searchable, categorized folio of posts covering travel, lifestyle, gear reviews, technical portfolio pieces, and everything about West Coast Swing."
      />

      <BlogHero />

      {featuredPost && <FeaturedArticle post={featuredPost} />}

      <BlogTopicGrid posts={posts} />

      <ContentFeedSection
        title="Latest Articles"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        view={view}
        setView={setView}
        placeholder="Search posts..."
        items={posts}
        emptyStateDescription={searchTerm ? `No matches for "${searchTerm}".` : `No articles found.`}
        renderItem={(post) => (
          <ContentCard
            key={post.slug}
            {...post}
            basePath="/blog"
          />
        )}
      />

      <BlogNewsletter />
    </Box>
  );
}
