import { motion } from 'motion/react';
import { NavLink } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { motionTokens } from '@/styles/motion';
import { CategoryPlaceholder } from '@/components/ui/CategoryPlaceholder';
import type { Post } from '@/lib/content';

interface HeroSpotlightProps {
  featuredPost: Post;
  recentPosts: Post[];
}

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

export function HeroSpotlight({ featuredPost, recentPosts }: HeroSpotlightProps) {
  const readingTime = calculateReadingTime(featuredPost.content);

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
        {/* Left: Feature Slot with Image */}
        <Box
          flex={1}
          as={NavLink}
          to={`/blog/${featuredPost.slug}`}
          className="group rounded-xl overflow-hidden bg-surface border border-line transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:-translate-y-1"
        >
          <Stack gap={0} height="full">
            {/* Featured Post Image */}
            <Box
              position="relative"
              width="full"
              aspectRatio="16/9"
              overflow="hidden"
              className="bg-surface-alt/20"
            >
              {featuredPost.image ? (
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <CategoryPlaceholder category={featuredPost.category} size="lg" />
              )}
              {/* Blog Badge Overlay */}
              <Box
                position="absolute"
                top={3}
                left={3}
                paddingX={2}
                paddingY={1.5}
                radius="full"
                display="flex"
                align="center"
                gap={2}
                className="bg-accent/90 backdrop-blur-sm shadow-sm"
              >
                <BookOpen size={14} className="text-white" />
                <Text variant="mono" size="xs" weight="font-bold" uppercase tracking="wide" className="text-white">
                  Blog Post
                </Text>
              </Box>
            </Box>

            {/* Content */}
            <Stack gap={4} padding={{ base: 6, md: 8 }}>
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
                  Featured
                </Text>
              </Box>

              <Text
                as="h2"
                size="fluid-7"
                weight="font-black"
                leading="tight"
                color="accent"
                className="transition-colors group-hover:opacity-80"
              >
                {featuredPost.title}
              </Text>

              <Text size="base" leading="relaxed" color="body" className="line-clamp-3">
                {featuredPost.excerpt}
              </Text>

              <Box paddingTop={2} border="t" className="border-line/30">
                <Box display="flex" align="center" justify="between">
                  <Box display="flex" align="center" gap={2}>
                    <Text variant="mono" size="sm" color="dim">
                      {featuredPost.date}
                    </Text>
                    <Text variant="mono" size="sm" color="dim">•</Text>
                    <Text variant="mono" size="sm" color="dim">
                      {readingTime}
                    </Text>
                  </Box>
                  <Text variant="mono" size="sm" weight="font-bold" color="accent" className="group-hover:translate-x-1 transition-transform">
                    Read →
                  </Text>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Box>

        {/* Right: Recent Posts List */}
        <Box flex={1} display="flex" direction="col" gap={3} as={motion.div} variants={motionTokens.staggerItem}>
          <Text as="h3" size="sm" weight="font-bold" color="dim" uppercase tracking="widest">
            Recent Articles
          </Text>
          <Stack gap={0} direction="col" className="divide-y divide-line/50">
            {recentPosts.map((post) => {
              const postReadingTime = calculateReadingTime(post.content);
              return (
                <Box
                  key={post.slug}
                  as={NavLink}
                  to={`/blog/${post.slug}`}
                  paddingY={3}
                  paddingX={2}
                  className="group transition-colors hover:bg-surface/50 rounded-md"
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
                        {postReadingTime}
                      </Text>
                    </Box>
                  </Stack>
                </Box>
              );
            })}
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
}
