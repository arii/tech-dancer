import { Box, Stack, Text } from '@/layouts/Primitives';
import { NavLink } from 'react-router-dom';
import { Post } from '@/lib/types/content';
import { BLOG_CONTENT } from '@/config/blog-content';

interface PopularResourcesProps {
  posts: Post[];
}

export function PopularResources({ posts }: PopularResourcesProps) {
  return (
    <Box as="aside" padding={6} border radius="lg" className="bg-surface/30">
      <Text variant="mono" size="xs" color="accent" weight="font-black" uppercase tracking="widest" marginBottom={6}>
        {BLOG_CONTENT.sections.popular}
      </Text>
      <Stack gap={6}>
        {posts.map((post, index) => (
          <Stack
            key={post.slug}
            as={NavLink}
            to={`/blog/${post.slug}`}
            gap={2}
            className="group"
          >
            <Text variant="mono" size="xs" color="dim" weight="font-black">
              0{index + 1}
            </Text>
            <Text
              variant="body"
              size="sm"
              weight="font-bold"
              className="group-hover:text-accent transition-colors leading-snug"
            >
              {post.title}
            </Text>
            <Text variant="mono" size="micro" color="dim" uppercase>
              {post.category} • {post.date}
            </Text>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
