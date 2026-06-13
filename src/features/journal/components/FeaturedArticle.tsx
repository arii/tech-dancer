import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { Post } from '@/lib/types/content';
import { ASSET_PREFIX } from '@/config/constants';
import { NavLink } from 'react-router-dom';
import { journalVariants } from '@/lib/variants';
import { BLOG_CONTENT } from '@/config/blog-content';

interface FeaturedArticleProps {
  post: Post;
}

export function FeaturedArticle({ post }: FeaturedArticleProps) {
  return (
    <Box
      as={NavLink}
      to={`/blog/${post.slug}`}
      display="block"
      border
      radius="xl"
      overflow="hidden"
      className={journalVariants.card({ variant: 'hero', interactive: true })}
    >
      <Grid cols={{ base: 1, lg: 10 }} gap={0}>
        <Box span={{ lg: 6 }} height={{ base: "64", lg: "96" }} position="relative">
          <img
            src={post.image?.startsWith('/') ? `${ASSET_PREFIX}${post.image}` : post.image}
            alt={post.imageAlt || post.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </Box>
        <Box span={{ lg: 4 }} padding={{ base: 6, md: 10 }} display="flex" direction="col" justify="center">
          <Stack gap={4}>
            <Text variant="mono" size="xs" color="accent" weight="font-black" uppercase tracking="widest">
              {BLOG_CONTENT.sections.featured}
            </Text>
            <Text as="h2" variant="h1" size={{ base: "2xl", md: "3xl" }} weight="font-black" leading="tight">
              {post.title}
            </Text>
            <Text variant="body" size="base" color="dim" leading="relaxed" className="line-clamp-3">
              {post.excerpt}
            </Text>
            <Box marginTop={2}>
              <Text variant="mono" size="xs" weight="font-bold" color="accent" uppercase tracking="wider">
                Read full story →
              </Text>
            </Box>
          </Stack>
        </Box>
      </Grid>
    </Box>
  );
}
