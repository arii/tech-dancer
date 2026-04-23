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

  const sidebar = headings.length > 0 ? <TOC headings={headings} /> : undefined;

  const headerExtras = (
    <Box display="flex" align="center" justify="between" border="y" paddingY={6} className="border-line/50">
      <Box display="flex" align="center" gap={4}>
        <Box position="relative" width={10} height={10} radius="full" display="flex" align="center" justify="center" overflow="hidden" border={true} className="bg-accent text-white border-line/20">
          <Text variant="mono" size="xs" weight="font-bold">
            {post.author ? post.author.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'AA'}
          </Text>
          {post.authorAvatar ? (
            <img
              src={post.authorAvatar}
              alt={post.author}
              className="absolute inset-0 w-full h-full object-cover bg-accent"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : null}
        </Box>
        <Stack gap={0}>
          <Text variant="mono" size="xs" weight="font-bold">{post.author || 'Ariel Anders, PhD'}</Text>
          <Text variant="mono" size="tiny" color="dim">Author & Engineer</Text>
        </Stack>
      </Box>
      <Box as="button" display="flex" align="center" gap={2} color="dim" className="hover:text-accent transition-colors">
        <Share2 className="w-4 h-4" />
        <Text variant="mono" size="xs">Share</Text>
      </Box>
    </Box>
  );

  const relatedContent = relatedPosts.length > 0 && (
    <Box border="t" paddingTop={12} marginTop={12}>
      <Text variant="mono" size="xs" weight="font-bold" marginBottom={8} display="block" uppercase tracking="widest">Related Posts</Text>
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
