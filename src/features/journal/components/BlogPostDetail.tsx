import { User, Share2 } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { Post, getPosts } from '@/lib/content';
import { ContentCard } from '@/components/ui/ContentCard';
import { useMemo } from 'react';
import { DetailLayout } from '@/components/layout/DetailLayout';
import { TOC } from '@/components/layout/DetailElements';

interface BlogPostDetailProps {
  post: Post;
  onBack: () => void;
  backLabel: string;
}

export function BlogPostDetail({ post, onBack, backLabel }: BlogPostDetailProps) {
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

  const sidebar = <TOC headings={headings} />;

  const headerExtras = (
    <Box display="flex" align="center" justify="between" border="y" paddingY={6} className="border-line/50">
      <Box display="flex" align="center" gap={4}>
        <Box className="w-10 h-10 rounded-none bg-accent-navy flex items-center justify-center text-white">
          <Text variant="mono" size="xs" weight="font-bold">AA</Text>
        </Box>
        <Stack gap={0}>
          <Text variant="mono" size="xs" weight="font-bold">{post.author || 'Ariel Anders, PhD'}</Text>
          <Text variant="mono" size="tiny" color="dim">Author & Engineer</Text>
        </Stack>
      </Box>
      <Box as="button" display="flex" align="center" gap={2} color="dim" className="hover:text-accent-brand transition-colors">
        <Share2 className="w-4 h-4" />
        <Text variant="mono" size="xs">Share</Text>
      </Box>
    </Box>
  );

  const relatedContent = relatedPosts.length > 0 && (
    <Box border="t" paddingTop={12} marginTop={12}>
      <Text variant="mono" size="xs" weight="font-bold" className="mb-8 block uppercase tracking-widest">Related Posts</Text>
      <Grid cols={{ base: 1, md: 2 }} gap={8}>
        {relatedPosts.map(p => (
          <ContentCard key={p.slug} {...p} basePath="/blog" />
        ))}
      </Grid>
    </Box>
  );

  return (
    <DetailLayout
      title={post.title}
      category={post.category}
      date={post.date}
      content={post.content}
      image={post.image}
      onBack={onBack}
      backLabel={backLabel}
      sidebar={sidebar}
      headerExtras={headerExtras}
      relatedContent={relatedContent}
    />
  );
}
