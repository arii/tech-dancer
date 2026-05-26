// impeccable-ignore-file
import { NavLink } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { getPosts } from '@/lib/content';
import { CategoryPlaceholder } from '@/components/ui/CategoryPlaceholder';

export function LatestPosts() {
  const posts = getPosts().slice(0, 3);

  return (
    <Box as="section">
      <Box display="flex" align="center" justify="between" gap={2} marginBottom={5}>
        <Text as="h2" variant="headline" size="2xl" weight="font-black">
          Latest from BoomTick
        </Text>
        <Text
          as={NavLink}
          to="/blog"
          variant="mono"
          size="xs"
          color="dim"
          weight="font-bold"
          className="shrink-0 uppercase tracking-widest transition-colors hover:text-accent"
        >
          View all →
        </Text>
      </Box>

      <Stack gap={0} border="t" className="border-line">
        {posts.map((post) => (
          <Box
            key={post.slug}
            as={NavLink}
            to={`/blog/${post.slug}`}
            display="flex"
            align="start"
            gap={4}
            paddingY={4}
            border="b"
            className="group border-line transition-colors hover:bg-surface/50"
          >
            {/* Thumbnail — slightly larger on mobile for editorial feel */}
            <Box width={16} height={16} radius="md" overflow="hidden" className="mt-0.5 shrink-0 bg-surface-alt">
              {post.image ? (
                <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
              ) : (
                <CategoryPlaceholder category={post.category} size="sm" />
              )}
            </Box>
            <Stack gap={1} className="min-w-0 flex-1">
              <Box display="flex" align="center" gap={3}>
                <Text variant="mono" size="xs" color="accent" weight="font-bold" uppercase>
                  {post.category}
                </Text>
                <Text variant="mono" size="xs" color="dim">
                  {post.date}
                </Text>
              </Box>
              {/* Allow title to wrap to 2 lines on mobile */}
              <Text variant="body" size="base" weight="font-bold" className="line-clamp-2 transition-colors group-hover:text-accent">
                {post.title}
              </Text>
              <Text variant="body" size="xs" color="dim" className="line-clamp-1">
                {post.excerpt}
              </Text>
            </Stack>
            <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-accent opacity-40 transition-opacity group-hover:opacity-100" />
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
