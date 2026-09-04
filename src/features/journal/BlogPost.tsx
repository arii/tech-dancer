import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPostBySlug } from '@/lib/content';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { BASE_URL, SITE_NAME } from '@/config/constants';
import { AUTHOR_ARIEL_ANDERS } from '@/utils/schema';
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

    const postImageUrl = post.image || `${BASE_URL}/assets/comp_analysis_hero.webp`;

    const isAriel = !post.author || post.author === 'Ariel Anders' || post.author.includes('Ariel');
    const authorSchema = isAriel
      ? AUTHOR_ARIEL_ANDERS
      : {
          "@type": "Person" as const,
          "name": post.author,
          "url": `${BASE_URL}/about`
        };

    const blogPostingSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "author": authorSchema,
      "datePublished": post.date,
      "dateModified": post.updated || post.date,
      "image": [
        postImageUrl.startsWith('http') ? postImageUrl : `${BASE_URL}${postImageUrl}`,
        {
          "@type": "ImageObject",
          "url": postImageUrl.startsWith('http') ? postImageUrl : `${BASE_URL}${postImageUrl}`,
          "caption": post.imageAlt || post.title,
          "creditText": post.author || "Ariel Anders",
          "creator": {
            "@type": "Person",
            "name": post.author || "Ariel Anders"
          }
        }
      ],
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

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": `${BASE_URL}`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Journal",
          "item": `${BASE_URL}/blog`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": post.title,
          "item": `${BASE_URL}/blog/${post.slug}`
        }
      ]
    };

    return [blogPostingSchema, breadcrumbSchema];
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
        backLabel="Back to Blog Posts"
      />
    </>
  );
}
