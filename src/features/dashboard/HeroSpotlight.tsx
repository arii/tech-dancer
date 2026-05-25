import { motion } from 'motion/react';
import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { motionTokens } from '@/styles/motion';
import type { Post } from '@/lib/content';

interface HeroSpotlightProps {
  featuredPost: Post;
  recentPosts: Post[];
}

export function HeroSpotlight({ featuredPost, recentPosts }: HeroSpotlightProps) {
  return (
    <Stack gap={8} paddingX={{ base: 4, md: 6, lg: 12 }} as={motion.div} variants={motionTokens.staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-50px" }}>
      {/* Split Hero Layout */}
      <Stack
        direction={{ base: "col", lg: "row" }}
        gap={{ base: 6, lg: 8 }}
        align={{ lg: "start" }}
        as={motion.div}
        variants={motionTokens.staggerItem}
      >
        {/* Left: Feature Slot */}
        <Box
          flex={1}
          as={NavLink}
          to={`/blog/${featuredPost.slug}`}
          className="group rounded-xl overflow-hidden bg-surface border border-line transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:-translate-y-1"
          padding={{ base: 6, md: 8 }}
        >
          <Stack gap={4} height="full">
            <Box display="flex" align="center" gap={2}>
              <Box
                paddingX={3}
                paddingY={1.5}
                radius="full"
                className="bg-accent/10 border border-accent/30"
              >
                <Text variant="mono" size="xs" weight="font-black" tracking="wide" color="accent">
                  {featuredPost.category}
                </Text>
              </Box>
              <Text variant="mono" size="xs" color="dim" tracking="widest" uppercase>
                Dance Focus
              </Text>
            </Box>

            <Text
              as="h2"
              size="fluid-7"
              weight="font-black"
              leading="tight"
              className="text-gradient bg-gradient-to-r from-accent to-accent-purple bg-clip-text text-transparent group-hover:from-accent group-hover:to-accent/80 transition-colors"
            >
              {featuredPost.title}
            </Text>

            <Text size="base" leading="relaxed" color="body" className="line-clamp-4">
              {featuredPost.excerpt}
            </Text>

            <Box marginTop="auto" paddingTop={4} border="t" className="border-line/30">
              <Box display="flex" align="center" justify="between">
                <Box display="flex" align="center" gap={2}>
                  <Text variant="mono" size="sm" color="dim">
                    {featuredPost.date}
                  </Text>
                  {featuredPost.readingTime && (
                    <>
                      <Text variant="mono" size="sm" color="dim">•</Text>
                      <Text variant="mono" size="sm" color="dim">
                        {featuredPost.readingTime}
                      </Text>
                    </>
                  )}
                </Box>
                <Text variant="mono" size="sm" weight="font-bold" color="accent" className="group-hover:translate-x-1 transition-transform">
                  Read →
                </Text>
              </Box>
            </Box>
          </Stack>
        </Box>

        {/* Right: Trending List */}
        <Box flex={1} display="flex" direction="col" gap={3} as={motion.div} variants={motionTokens.staggerItem}>
          <Text as="h3" size="sm" weight="font-bold" color="dim" uppercase tracking="widest">
            Recent Updates
          </Text>
          <Stack gap={0} direction="col" className="divide-y divide-line/50">
            {recentPosts.map((post) => (
              <Box
                key={post.slug}
                as={NavLink}
                to={`/blog/${post.slug}`}
                paddingY={3}
                className="group transition-colors hover:bg-surface/50 rounded-md px-2"
              >
                <Stack gap={1}>
                  <Text
                    size="sm"
                    weight="font-bold"
                    color="main"
                    leading="snug"
                    className="group-hover:text-accent transition-colors line-clamp-2"
                  >
                    {post.title}
                  </Text>
                  <Box display="flex" align="center" gap={2}>
                    <Text variant="mono" size="xs" color="dim">
                      {post.category}
                    </Text>
                    <Text variant="mono" size="xs" color="dim">•</Text>
                    <Text variant="mono" size="xs" color="dim">
                      {post.date}
                    </Text>
                  </Box>
                </Stack>
              </Box>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
}
