import { NavLink } from 'react-router-dom';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { Post } from '@/lib/content';
import { ActionButton } from '@/components/ui/ActionButton';

interface FeaturedArticleProps {
  post: Post;
}

export function FeaturedArticle({ post }: FeaturedArticleProps) {
  if (!post) return null;

  return (
    <Box as="section" marginTop={{ base: 12, lg: 20 }}>
      <Text variant="mono" size="xs" color="brand" weight="font-black" marginBottom={6} uppercase tracking="widest">
        FEATURED
      </Text>

      <Box
        border
        radius="xl"
        overflow="hidden"
        surface="default"
        className="group relative transition-all hover:border-accent/30"
      >
        <Grid cols={{ base: 1, lg: post.image ? 10 : 1 }} gap={0} minHeight={{ base: "auto", lg: post.image ? 96 : "auto" }}>
          {/* Image Area - 60% */}
          {post.image && (
            <Box className="lg:col-span-6 relative overflow-hidden h-64 lg:h-auto">
              <img
                src={post.image}
                alt={post.imageAlt || post.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <Box position="absolute" inset className="bg-gradient-to-r from-bg/20 to-transparent lg:hidden" />
            </Box>
          )}

          {/* Content Area - 40% (or 100% if no image) */}
          <Stack
            className={post.image ? "lg:col-span-4" : ""}
            padding={{ base: 6, md: 8, lg: 10 }}
            justify="center"
            gap={6}
          >
            <Stack gap={3}>
              <Text as="h2" variant="headline" size="3xl" weight="font-black" leading="tight">
                {post.title}
              </Text>
              <Text variant="body" size="base" color="dim" leading="relaxed" className="line-clamp-4">
                {post.excerpt}
              </Text>
            </Stack>

            <ActionButton
              as={NavLink}
              to={`/blog/${post.slug}`}
              variant="primary"
              paddingX={8}
              paddingY={3}
              width="fit"
              className="tap-target"
            >
              Read Guide
            </ActionButton>
          </Stack>
        </Grid>
      </Box>
    </Box>
  );
}
