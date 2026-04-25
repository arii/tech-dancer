import { Share2 } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';

import { DetailLayout } from '@/components/layout/DetailLayout';
import { Post } from '@/lib/content';

interface BlogPostDetailProps {
  post: Post;
  onBack: () => void;
  backLabel: string;
}

export function BlogPostDetail({ post, onBack, backLabel }: BlogPostDetailProps) {
  const share = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(console.error);
    }
  };

  return (
    <DetailLayout
      title={post.title}
      category={post.category}
      date={post.date}
      content={post.content}
      image={post.image}
      onBack={onBack}
      backLabel={backLabel}
      headerExtras={
        <Box display="flex" gap={4} marginTop={6}>
          <Box display="flex" align="center" gap={2} color="dim">
             <Box width={8} height={8} radius="full" surface="muted" />
             <Text variant="mono" size="xs">{post.author}</Text>
          </Box>
          <Box className="flex-1" />
          <Box as="button" onClick={share} display="flex" align="center" gap={2} className="text-accent hover:opacity-70 transition-opacity">
            <Share2 className="w-4 h-4" />
            <Text variant="mono" size="xs" weight="font-bold">Share</Text>
          </Box>
        </Box>
      }
    >
      {post.tags && post.tags.length > 0 && (
        <Box border="t" paddingTop={12} marginTop={12} className="border-line/30">
          <Stack gap={4}>
            <Text variant="mono" size="tiny" color="dim" uppercase tracking="widest">Discovery Tags</Text>
            <Box display="flex" wrap gap={2}>
              {post.tags.map(tag => (
                <Box key={tag} paddingX={3} paddingY={1} surface="muted" border className="hover:border-accent transition-colors">
                  <Text variant="mono" size="micro">{tag.toUpperCase()}</Text>
                </Box>
              ))}
            </Box>
          </Stack>
        </Box>
      )}
    </DetailLayout>
  );
}
