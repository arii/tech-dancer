
import { NavLink } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';
import { getPosts } from '@/lib/content';
import { CategoryPlaceholder } from '@/components/ui/CategoryPlaceholder';

export function LatestPosts() {
  const posts = getPosts().slice(0, 3);

  return (
    <Box as="section" width="full" maxWidth="full" minWidth={0}>
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
          paddingX={2}
          paddingY={4}
          marginRight={-2}
          uppercase
          tracking="widest"
          shrink={0}
          className="transition-colors hover:text-accent"
        >
          View all →
        </Text>
      </Box>

      {/* Compact editorial post rows — no card wrapper, border-bottom only */}
      <Stack gap={0} border="t" borderColor="line">
        {posts.map((post) => (
          <Box
            key={post.slug}
            as={NavLink}
            to={`/blog/${post.slug}`}
            display="flex"
            align="start"
            gap={4}
            paddingY={{ base: 5, md: 3.5 }}
            width="full"
            maxWidth="full"
            minWidth={0}
            border="b"
            borderColor="line"
            className="group transition-colors hover:bg-surface/50"
          >
            {/* Thumbnail — rectangular, 72×56 desktop feel */}
            <Box
              radius="md"
              overflow="hidden"
              marginTop={0.5}
              height={14}
              width={72}
              shrink={0}
              surface="alt"
                display="flex"
                align="center"
                justify="center"
            >
              {post.image ? (
                <Box
                  as="img"
                  src={post.image}
                  alt=""
                  aria-hidden="true"
                  display="block"
                  height="full"
                  width="full"
                  maxWidth="full"
                  className="object-cover"
                />
              ) : (
                <CategoryPlaceholder category={post.category} size="sm" />
              )}
            </Box>

            {/* Text content */}
            <Stack gap={1} minWidth={0} flex={1}>
              <Box display="flex" align="center" gap={3}>
                <Text variant="mono" size="xs" color="accent" weight="font-bold" uppercase>
                  {post.category}
                </Text>
                <Text variant="mono" size="xs" color="dim">
                  {post.date}
                </Text>
              </Box>
              <Text variant="body" size="sm" weight="font-bold" clamp={2} className="transition-colors group-hover:text-accent">
                {post.title}
              </Text>
              <Text variant="body" size="xs" color="dim" clamp={1}>
                {post.excerpt}
              </Text>
            </Stack>

            <Icon icon={ArrowRight} marginTop={1} shrink={0} size="sm" color="accent" className="opacity-40 transition-opacity group-hover:opacity-100" />
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
