import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPostBySlug } from '@/lib/content';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { BlogPostDetail } from './components/BlogPostDetail';

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: post } = useQuery({
    queryKey: ['posts', slug],
    queryFn: () => slug ? getPostBySlug(slug) : undefined,
    enabled: !!slug
  });

  const structuredData = useMemo(() => {
    if (!post) return null;
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "author": { "@type": "Person", "name": post.author },
      "datePublished": post.date,
      "image": post.image
    };
  }, [post]);

  if (!post) {
    return (
      <Box padding="panel" textAlign="center">
        <Stack gap={8} align="center">
          <Text variant="displayLower" size="2xl">Post Not Found</Text>
          <Box as="button" onClick={() => navigate('/blog')} cursor="pointer" className="hover:text-accent transition-colors">
            <Text variant="mono" size="xs">Back to Journal</Text>
          </Box>
        </Stack>
      </Box>
    );
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        type="article"
        image={post.image}
      />
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      <BlogPostDetail
        post={post}
        onBack={() => navigate('/blog')}
        backLabel="Back to Folio"
      />
    </>
  );
}
