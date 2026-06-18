// impeccable-ignore-file
import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPostBySlug } from '@/lib/content';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { BASE_URL, SITE_NAME } from '@/config/constants';
import { BlogPostDetail } from './components/BlogPostDetail';

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: post } = useQuery({
    queryKey: ['posts', slug],
    queryFn: () => slug ? getPostBySlug(slug) : undefined,
    enabled: !!slug,
    initialData: () => slug ? getPostBySlug(slug) : undefined,
  });

  const structuredData = useMemo(() => {
    if (!post) return null;
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "author": {
        "@type": "Person",
        "name": post.author || "Ariel Anders",
        "url": `${BASE_URL}/about`
      },
      "datePublished": post.date,
      "image": post.image || `${BASE_URL}/assets/comp_analysis_hero.webp`,
      "publisher": {
        "@type": "Organization",
        "name": SITE_NAME,
        "logo": {
          "@type": "ImageObject",
          "url": `${BASE_URL}/favicon.ico`
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${BASE_URL}/blog/${post.slug}`
      }
    };
  }, [post]);

  if (!post) {
    return (
      <Box padding="panel" textAlign="center">
        <Stack gap={8} align="center">
          <Text variant="display" size="2xl">Post Not Found</Text>
          <Box as="button" onClick={() => navigate('/blog')} className="hover:text-accent transition-colors">
            <Text variant="mono" size="xs">Back to Journal</Text>
          </Box>
        </Stack>
      </Box>
    );
  }

  return (
    <>
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        height={1}
        zIndex={100}
        className="bg-accent/20"
      >
        <Box
          height="full"
          className="bg-accent transition-all duration-150"
          // impeccable-ignore-next-line
          style={{ width: '0%' }}
          id="reading-progress-bar"
        />
      </Box>
      <SEO
        title={post.title}
        description={post.excerpt}
        type="article"
        image={post.image}
        schema={structuredData}
      />
      <BlogPostDetail
        post={post}
        onBack={() => navigate('/blog')}
        backLabel="Back to Folio"
      />
    </>
  );
}
