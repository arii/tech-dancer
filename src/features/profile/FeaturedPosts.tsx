// impeccable-ignore-file
import { Box, Stack, Text } from '@/layouts/Primitives';
import { FeaturedPost } from './types';
import { Link } from 'react-router-dom';

interface FeaturedPostsProps {
  posts: FeaturedPost[];
}

export default function FeaturedPosts({ posts }: FeaturedPostsProps) {
  return (
    <Stack gap={4} marginBottom={8}>
      <Text variant="mono" size="micro" color="dim" tracking="emphasized">From the blog</Text>
      <Box display="grid" cols={{ base: 1, md: 2 }} gap={3}>
        {posts.map((post) => (
          <Box
            key={post.slug}
            as={Link}
            to={`/blog/${post.slug}`}
            border
            radius="lg"
            padding={4}
            display="flex"
            direction="col"
            gap={2}
            className="hover:border-line transition-colors group"
          >
            <Text variant="mono" size="micro" color="dim" weight="font-medium" tracking="emphasized">{post.eyebrow}</Text>
            <Text variant="display" size="sm" weight="font-medium" className="text-accent-navy leading-snug group-hover:text-accent transition-colors">
              {post.title}
            </Text>
            <Box marginTop="auto">
              <Text variant="mono" size="micro" className="text-[#185FA5]">Read post →</Text>
            </Box>
          </Box>
        ))}
      </Box>
    </Stack>
  );
}
