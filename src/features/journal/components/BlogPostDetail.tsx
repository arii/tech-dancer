import { motion } from 'motion/react';
import { ArrowLeft, Share2, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { Post, readingTime, getPosts } from '@/lib/content';
import { ContentCard } from '@/components/ui/ContentCard';
import { useMemo } from 'react';

interface BlogPostDetailProps {
  post: Post;
  onBack: () => void;
  backLabel: string;
}

export function BlogPostDetail({ post, onBack, backLabel }: BlogPostDetailProps) {
  const rt = readingTime(post.content);

  // Extract Headings for TOC
  const headings = useMemo(() => {
    const lines = post.content.split('\n');
    return lines
      .filter(line => line.startsWith('## '))
      .map(line => line.replace('## ', '').trim());
  }, [post.content]);

  // Related Posts
  const relatedPosts = useMemo(() => {
    return getPosts()
      .filter(p => p.category === post.category && p.slug !== post.slug)
      .slice(0, 2);
  }, [post.category, post.slug]);

  return (
    <Box as="article" padding="panel">
      <Stack gap={12} maxWidth="5xl" marginX="auto" className="w-full">
        {/* Navigation */}
        <Box
          as="button"
          onClick={onBack}
          display="flex"
          align="center"
          gap={2}
          color="dim"
          className="hover:text-accent-brand transition-colors"
          cursor="pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <Text variant="mono" size="xs" weight="font-bold">{backLabel}</Text>
        </Box>

        <Stack gap={10}>
          {/* Header */}
          <Stack gap={6}>
            <Box display="flex" align="center" gap={4}>
              <Box className="px-3 py-1 bg-accent-navy/10 border border-accent-navy/20 rounded-sm">
                <Text variant="mono" size="micro" weight="font-bold" className="text-accent-navy uppercase">
                  {post.category}
                </Text>
              </Box>
              <Text variant="mono" size="micro" color="dim">{post.date} • {rt} min read</Text>
            </Box>

            <Text variant="headline" size="fluid-8" className="tracking-tighter leading-none">
              {post.title}
            </Text>

            {/* Byline row */}
            <Box display="flex" align="center" justify="between" border="y" paddingY={6} className="border-line/50">
              <Box display="flex" align="center" gap={4}>
                <Box className="w-10 h-10 rounded-full bg-accent-navy flex items-center justify-center text-white">
                  <User className="w-5 h-5" />
                </Box>
                <Stack gap={0}>
                  <Text variant="mono" size="xs" weight="font-bold">{post.author || 'Ariel Anders, PhD'}</Text>
                  <Text variant="mono" size="micro" color="dim">Author & Engineer</Text>
                </Stack>
              </Box>
              <Box as="button" display="flex" align="center" gap={2} color="dim" className="hover:text-accent-brand transition-colors">
                <Share2 className="w-4 h-4" />
                <Text variant="mono" size="xs">Share</Text>
              </Box>
            </Box>
          </Stack>

          {/* Hero Image */}
          {post.image && (
            <Box
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              aspect="video"
              overflow="hidden"
              border
              className="bg-muted shadow-xl"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </Box>
          )}

          <Grid cols={{ base: 1, lg: 4 }} gap={12}>
            {/* TOC Sidebar */}
            <Box className="hidden lg:block">
              <Stack gap={4} className="sticky top-32">
                <Text variant="mono" size="micro" weight="font-bold" color="dim" uppercase className="tracking-widest border-b border-line pb-2">In this post</Text>
                <Stack gap={2}>
                  {headings.map((h, i) => (
                    <Text key={i} variant="mono" size="micro" className="cursor-pointer hover:text-accent transition-colors">
                      <span className="opacity-30 mr-2">0{i+1}</span> {h}
                    </Text>
                  ))}
                </Stack>
              </Stack>
            </Box>

            {/* Content */}
            <Box className="lg:col-span-3">
              <Box className="prose prose-slate max-w-[70ch] prose-headings:font-display prose-p:font-sans prose-p:text-text-dim prose-strong:text-text-main">
                <ReactMarkdown
                  components={{
                    a: ({node, ...props}) => <a {...props} rel="noopener noreferrer" target="_blank" />,
                    blockquote: ({node, ...props}) => (
                      <Box className="bg-amber-50 border-l-4 border-amber-500 p-6 my-8 rounded-r-lg">
                         <Text variant="mono" size="micro" weight="font-bold" className="text-amber-700 uppercase mb-2 block tracking-widest">Key Takeaway</Text>
                         <blockquote className="m-0 p-0 text-amber-900 font-medium italic" {...props} />
                      </Box>
                    )
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </Box>
            </Box>
          </Grid>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <Box border="t" paddingTop={12} marginTop={12}>
              <Text variant="mono" size="xs" weight="font-bold" className="mb-8 block uppercase tracking-widest">Related Posts</Text>
              <Grid cols={{ base: 1, md: 2 }} gap={8}>
                {relatedPosts.map(p => (
                  <ContentCard key={p.slug} {...p} basePath="/blog" />
                ))}
              </Grid>
            </Box>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
