// impeccable-ignore-file
import { NavLink } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { getPosts } from '@/lib/content';
import { CategoryPlaceholder } from '@/components/ui/CategoryPlaceholder';

export function LatestPosts() {
  const posts = getPosts().slice(0, 3);

  return (
    <Box as="section" className="w-full max-w-full min-w-0">
      <Box display="flex" align="center" justify="between" gap={2} marginBottom={4}>
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
          paddingY={{ base: 4, sm: 0 }}
          paddingX={{ base: 4, sm: 0 }}
          className="shrink-0 transition-colors hover:text-accent"
        >
          View all →
        </Text>
      </Box>

      {/* Compact editorial post rows — no card wrapper, border-bottom only */}
      <Stack gap={0} border="t" className="border-line">
        {posts.map((post) => (
          <Box
            key={post.slug}
            as={NavLink}
            to={`/blog/${post.slug}`}
            display="flex"
            align="start"
            gap={4}
            className="group w-full max-w-full min-w-0 border-b border-line py-3.5 transition-colors hover:bg-surface/50"
          >
            {/* Thumbnail — rectangular, 72×56 desktop feel */}
            <Box
              radius="md"
              overflow="hidden"
              className="mt-0.5 h-14 w-[72px] shrink-0 bg-surface-alt"
            >
              {post.image ? (
                <img
                  src={post.image}
                  alt=""
                  aria-hidden="true"
                  className="block h-full w-full max-w-full object-cover"
                />
              ) : (
                <CategoryPlaceholder category={post.category} size="sm" />
              )}
            </Box>

            {/* Text content */}
            <Stack gap={1} className="min-w-0 flex-1">
              <Box display="flex" align="center" gap={3}>
                <Text variant="mono" size="xs" color="accent" weight="font-medium" opacityVariant="subtle">
                  {post.category.toLowerCase()}
                </Text>
                <Text variant="mono" size="xs" color="dim">
                  {post.date}
                </Text>
              </Box>
              <Text variant="body" size="sm" weight="font-bold" className="line-clamp-2 transition-colors group-hover:text-accent">
                {post.title}
              </Text>
              <Text variant="body" size="xs" color="dim" className="line-clamp-1">
                {post.excerpt}
              </Text>
            </Stack>

            <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-accent opacity-subtle transition-opacity group-hover:opacity-full" />
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
