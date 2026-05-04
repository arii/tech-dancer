import { Box, Grid, Text } from '@/layouts/Primitives';
import { useBlog } from './useBlog';
import { SEO } from '@/components/SEO';
import { NavLink } from 'react-router-dom';

export default function BlogFeed() {
  const { posts, categories, activeCategory, setActiveCategory, tagColors } = useBlog();

  return (
    <Box as="section" className="bg-bg text-text-main">
      <SEO
        title="Blog"
        description="Browse West Coast Swing blog posts on training, travel, gear reviews, and dance research."
      />
      <Box paddingX={{ base: 4, sm: 6, md: 10 }} paddingY={{ base: 6, md: 14 }}>
        <Box as="section" className="max-w-6xl">
          <Text variant="sans" size="xs" weight="font-bold" uppercase className="tracking-widest text-text-dim">
            Insights
          </Text>
          <Text as="h1" variant="display" size="5xl" weight="font-black" className="text-3xl 4xl 5xl">
            Blog Posts
          </Text>
          <Text variant="body" size="base" className="max-w-3xl leading-7 text-text-dim">
            A searchable collection of West Coast Swing posts covering travel, lifestyle, gear reviews, and dance research.
          </Text>

          <Box display="flex" wrap gap={2} padding={3} className="rounded-2xl border border-border/80 bg-surface shadow-sm">
            {categories.map((item) => (
              <Box
                key={item}
                as="button"
                type="button"
                onClick={() => setActiveCategory(item)}
                aria-pressed={activeCategory === item}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${activeCategory === item ? "border-secondary bg-secondary text-background shadow-sm" : "border-border bg-bg/40 text-text-dim hover:border-primary/40 hover:bg-bg/70 hover:text-text-main"}`}
              >
                {item}
              </Box>
            ))}
          </Box>

          <Grid cols={{ base: 1, sm: 2, xl: 3 }} gap={4}>
            {posts.map((post) => (
              <Box as="article" key={post.slug} display="flex" className="min-h-64 -col rounded-2xl border border-border/80 bg-surface shadow-sm transition-colors hover:border-primary/30">
                <Box display="flex" align="center" justify="between" gap={3}>
                  <Text as="span" variant="sans" size="xs" weight="font-bold" uppercase className={`inline-flex rounded-full border px-2.5 py-1 text-xs tracking-widest ${tagColors[post.category] ?? "text-text-dim border-border"}`}>
                    {post.category}
                  </Text>
                  <Text as="time" variant="mono" size="xs" className="text-xs text-text-dim">
                    {post.date}
                  </Text>
                </Box>
                <Text as="h2" variant="display" size="lg" weight="font-black" className="leading-snug">
                  {post.title}
                </Text>
                <Text variant="body" size="sm" className="leading-7 text-text-dim">
                  {post.excerpt}
                </Text>
                <Box as={NavLink} to={`/blog/${post.slug}`} className="rounded-sm text-xs font-bold uppercase tracking-widest text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60" aria-label={`Read article ${post.title}`}>
                  Read Article
                </Box>
              </Box>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
