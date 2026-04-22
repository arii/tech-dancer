import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostBySlug } from '@/lib/content';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { BlogPostDetail } from './components/BlogPostDetail';

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = useMemo(() => slug ? getPostBySlug(slug) : undefined, [slug]);

  if (!post) {
    return (
      <Box padding="panel" textAlign="center">
        <Stack gap={8} align="center">
          <Text variant="display" size="2xl">Post Not Found</Text>
          <Box as="button" onClick={() => navigate('/blog')} className="hover:text-accent-brand transition-colors">
            <Text variant="mono" size="xs">Back to Journal</Text>
          </Box>
        </Stack>
      </Box>
    );
  }

  return (
    <BlogPostDetail
      post={post}
      onBack={() => navigate('/blog')}
      backLabel="Back to Folio"
    />
  );
}
