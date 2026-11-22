import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPostBySlug, readingTime } from '@/lib/content';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { BASE_URL } from '@/config/constants';
import {
  AUTHOR_ARIEL_ANDERS,
  formatIsoDate,
  generateArticleMediaSchema,
  generateBreadcrumbSchema,
  extractHowToFromMarkdown,
  extractFaqFromMarkdown,
} from '@/utils/schema';
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

    const postImageUrl = post.image || `${BASE_URL}/assets/home/wcs-travel-pack.webp`;
    const authorName = post.author || "Ariel Anders";

    const isAriel = !post.author || post.author === 'Ariel Anders' || post.author.includes('Ariel');
    const authorSchema = isAriel
      ? AUTHOR_ARIEL_ANDERS
      : {
          "@type": "Person" as const,
          "name": post.author,
          "url": `${BASE_URL}/about`
        };

    const words = post.content ? post.content.trim().split(/\s+/).length : 0;
    const estMinutes = readingTime(post.content || '');

    const blogPostingSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "name": post.title,
      "headline": post.title,
      "description": post.excerpt,
      "inLanguage": "en-US",
      "wordCount": words,
      "timeRequired": `PT${estMinutes}M`,
      ...(post.tags && post.tags.length > 0 ? { "keywords": post.tags.join(', ') } : {}),
      "author": authorSchema,
      "datePublished": formatIsoDate(post.date),
      "dateModified": formatIsoDate(post.updated || post.date),
      ...generateArticleMediaSchema({ imageUrl: postImageUrl, imageName: post.imageAlt || post.title, authorName }),
      "mainEntityOfPage": {
        "@type": "WebPage",
        "name": post.title,
        "@id": `${BASE_URL}/blog/${post.slug}`
      }
    };

    const breadcrumbSchema = generateBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path: `/blog/${post.slug}` }
    ]);

    const schemas: Array<Record<string, unknown>> = [blogPostingSchema, breadcrumbSchema as unknown as Record<string, unknown>];

    const howToSchema = extractHowToFromMarkdown(post);
    if (howToSchema) {
      schemas.push(howToSchema as unknown as Record<string, unknown>);
    }

    const faqSchema = extractFaqFromMarkdown(post.content);
    if (faqSchema) {
      schemas.push(faqSchema as unknown as Record<string, unknown>);
    }

    return schemas;
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
