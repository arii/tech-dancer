import { Box, Stack, Text } from '@/layouts/Primitives';

import { DetailLayout } from '@/components/layout/DetailLayout';
import { ArticleActions } from '@/components/layout/ArticleActions';
import { Post } from '@/lib/content';

interface BlogPostDetailProps {
  post: Post;
  onBack: () => void;
  backLabel: string;
}

export function BlogPostDetail({ post, onBack, backLabel }: BlogPostDetailProps) {
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
        <Stack direction="row" gap={4} marginTop={6}>
          <Stack direction="row" align="center" gap={2} color="dim">
             <Box width={8} height={8} radius="full" surface="muted" />
             <Text variant="mono" size="xs">{post.author}</Text>
          </Stack>
          <Box flex />
          <ArticleActions title={post.title} description={post.excerpt} />
        </Stack>
      }
    >
      {post.tags && post.tags.length > 0 && (
        <Box border="t" paddingTop={8} marginTop={10} className="border-line/30">
          <Stack gap={4}>
            <Text variant="mono" size="tiny" color="dim" uppercase tracking="widest">Discovery Tags</Text>
            <Stack direction="row" wrap gap={2}>
              {post.tags.map(tag => (
                <Box key={tag} paddingX={3} paddingY={1} surface="muted" border className="hover:border-accent transition-colors">
                  <Text variant="mono" size="micro">{tag.toUpperCase()}</Text>
                </Box>
              ))}
            </Stack>
          </Stack>
        </Box>
      )}
    </DetailLayout>
  );
}
