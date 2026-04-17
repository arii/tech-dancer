/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Calendar, Clock, User, ArrowLeft, Share2, Bookmark, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import { getAllContent, ContentItem } from '@/lib/content';
import { Box, Stack, Text, Grid, Motion, Icon, Inline } from '@/components/layout/Primitives';

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<ContentItem | null>(null);
  const [posts, setPosts] = useState<ContentItem[]>([]);

  useEffect(() => {
    const loadedPosts = getAllContent('posts');
    setPosts(loadedPosts);
  }, []);

  if (selectedPost) {
    return (
      <Box as="section" panel height="full" overflow="y-auto">
        <Motion 
          as="button"
          whileHover={{ x: -4 }}
          onClick={() => setSelectedPost(null)}
          display="flex"
          alignItems="center"
          gap="sm"
          color="accent"
          weight="font-bold"
          uppercase
          tracking="widest"
          size="sys"
          variant="mono"
          marginBottom="lg"
          cursor="pointer"
        >
          <Icon icon={ArrowLeft} size="sm" />
          Back to Blog
        </Motion>

        <Motion 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          maxWidth="4xl"
          marginX="auto"
          paddingBottom="3xl"
        >
          <Stack direction={{ base: "col", md: "row" }} align={{ base: "start", md: "center" }} gap="lg" marginBottom="xl">
            <Box surface="accent" border="accent" paddingX="sm" paddingY="xs">
              <Text variant="mono" size="micro" color="brand" weight="font-bold">{selectedPost.category}</Text>
            </Box>
            <Inline gap="xs">
              <Icon icon={Calendar} size="xs" color="dim" />
              <Text variant="mono" size="micro" color="dim" weight="font-bold">{selectedPost.date}</Text>
            </Inline>
            <Box display={{ base: "none", md: "block" }} width={1} height={4} surface="muted" shrink={0} />
            <Text variant="mono" size="micro" color="dim" weight="font-bold">
              LOG_REF: {selectedPost.slug.substring(0, 8).toUpperCase()}
            </Text>
          </Stack>

          <Text as="h1" variant="headline" size="7xl" marginBottom="xl">
            {selectedPost.title}
          </Text>

          <Box display="flex" alignItems="center" justifyContent="between" border="y" paddingY="lg" marginBottom="xl">
            <Inline gap="lg">
              <Box width={15} height={15} border surface="muted" overflow="hidden" shrink={0}>
                <Box as="img" src="https://picsum.photos/seed/ariel/120/120" alt="Author" width="full" height="full" className="object-cover grayscale" />
              </Box>
              <Stack gap="xs">
                <Text variant="mono" size="xs" weight="font-bold" color="main" uppercase tracking="widest">{selectedPost.author}</Text>
                <Text variant="micro" color="accent" weight="font-bold" tracking="wide">MIT ROBOTICIST // WCS</Text>
              </Stack>
            </Inline>
            <Inline gap="md">
              <Motion as="button" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} surface="default" border padding="sm" cursor="pointer">
                <Icon icon={Share2} size="sm" color="dim" />
              </Motion>
              <Motion as="button" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} surface="default" border padding="sm" cursor="pointer">
                <Icon icon={Bookmark} size="sm" color="dim" />
              </Motion>
            </Inline>
          </Box>

          <Motion 
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            aspect="video"
            border
            overflow="hidden"
            marginBottom="xl"
            shadow="lg"
          >
            <Box as="img" src={selectedPost.image} alt={selectedPost.title} width="full" height="full" className="object-cover grayscale" referrerPolicy="no-referrer" />
          </Motion>

          <Box className="markdown-body prose prose-invert max-w-none text-text-body leading-relaxed space-y-8">
            <Markdown>{selectedPost.content}</Markdown>
          </Box>
          
          <Box marginTop="3xl" paddingTop="2xl" border="t">
            <Text variant="mono" color="accent" weight="font-bold" size="micro" tracking="wide" marginBottom="xl">
              // RELATED_FILES
            </Text>
            <Grid cols={{ base: 1, md: 2 }} gap={0} border surface="muted" height="auto">
              {posts.filter(p => p.slug !== selectedPost.slug).map(post => (
                <Box 
                  key={post.slug} 
                  onClick={() => {
                    setSelectedPost(post);
                    window.scrollTo(0,0);
                  }}
                  surface="default"
                  padding="lg"
                  cursor="pointer"
                  border={{ base: "b", md: "r" }}
                  className="group hover:bg-card-bg transition-colors"
                >
                  <Text as="h5" variant="display" size="xl" color="main" weight="font-bold" marginBottom="md" uppercase className="group-hover:text-accent-brand transition-colors">
                    {post.title}
                  </Text>
                  <Text variant="body" size="xs" color="dim" opacity="70" className="line-clamp-2">
                    {post.excerpt}
                  </Text>
                </Box>
              ))}
            </Grid>
          </Box>
        </Motion>
      </Box>
    );
  }

  return (
    <Box as="section" panel height="full" overflow="y-auto">
      <Stack gap="lg" marginBottom="2xl" paddingX={{ base: "md", md: 0 }}>
        <Text variant="headline" size="8xl">The Blog.</Text>
        <Text variant="body" size="xl">
          Deep dives into the intersection of robotics, dance, and lifestyle optimization.
        </Text>
      </Stack>

      <Motion 
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        display="grid"
        gap="xs"
        border="t"
        surface="muted"
        maxWidth="5xl"
      >
        {posts.map((post) => (
          <Motion
            key={post.slug}
            variants={{
              hidden: { opacity: 0, x: -10 },
              visible: { opacity: 1, x: 0 }
            }}
            whileHover={{ x: 5 }}
            onClick={() => setSelectedPost(post)}
            surface="default"
            padding={{ base: "lg", md: "xl" }}
            cursor="pointer"
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            gap="xl"
            border={{ base: "b", md: "x" }}
            className="group hover:bg-card-bg transition-all"
          >
            <Box width={{ base: "full", md: "40%" }} aspect="video" overflow="hidden" shrink={0} border>
              <Motion 
                as="img"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8 }}
                src={post.image} 
                alt={post.title} 
                width="full"
                height="full"
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </Box>
            <Stack justify="center" gap="lg">
              <Inline gap="md">
                <Box border paddingX="xs" paddingY="0.5">
                  <Text variant="mono" color="accent" size="micro" weight="font-bold">{post.category}</Text>
                </Box>
                <Inline gap="xs">
                  <Icon icon={Calendar} size="xs" color="dim" />
                  <Text variant="mono" color="dim" size="micro">{post.date}</Text>
                </Inline>
              </Inline>
              <Text variant="headline" size="4xl" className="group-hover:text-accent-brand transition-colors">
                {post.title}
              </Text>
              <Text variant="body" size="base" opacity="90">
                {post.excerpt}
              </Text>
              <Motion 
                whileHover={{ x: 3 }}
                display="flex"
                alignItems="center"
                gap="sm"
                color="accent"
                weight="font-bold"
                uppercase
                tracking="widest"
                size="micro"
                variant="mono"
                paddingTop="xs"
              >
                Read Full Entry <Icon icon={ArrowRight} size="xs" />
              </Motion>
            </Stack>
          </Motion>
        ))}
      </Motion>
    </Box>
  );
}
