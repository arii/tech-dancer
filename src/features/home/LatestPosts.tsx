import { NavLink } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { getPosts } from '@/lib/content';
import { CategoryPlaceholder } from '@/components/ui/CategoryPlaceholder';
import { OptimizedImage } from '@/components/ui/OptimizedImage';

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
          className="shrink-0 uppercase tracking-widest transition-colors hover:text-accent"
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
            paddingY={3.5}
            className="group w-full max-w-full min-w-0 border-b border-line transition-colors hover:bg-surface/50"
          >
            {/* Thumbnail — rectangular, 72×56 desktop feel */}
            <Box
              radius="md"
              overflow="hidden"
              width={72}
              height={14}
              shrink={0}
              marginTop={0.5}
              surface="alt"
            >
              {post.image ? (
                <OptimizedImage
                  src={post.image}
                  alt=""
                  width={72}
                  height={56}
                  sizes="72px" // impeccable-ignore
                  loading="lazy"
                />
              ) : (
                <CategoryPlaceholder category={post.category} size="sm" />
              )}
            </Box>

            {/* Text content */}
            <Stack gap={1} flex="1" className="min-w-0">
              <Box display="flex" align="center" gap={3}>
                <Text variant="mono" size="xs" color="accent" weight="font-bold" uppercase>
                  {post.category}
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

            <Box marginTop={1} shrink={0}>
              <ArrowRight className="h-4 w-4 text-accent opacity-subtle transition-opacity group-hover:opacity-full" />
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
