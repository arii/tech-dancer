import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPostBySlug, readingTime } from '@/lib/content';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { BASE_URL, SITE_NAME } from '@/config/constants';
import {
  AUTHOR_ARIEL_ANDERS,
  formatIsoDate,
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

    const postImageUrl = post.image || `${BASE_URL}/assets/comp_analysis_hero.webp`;
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
      "image": [
        postImageUrl.startsWith('http') ? postImageUrl : `${BASE_URL}${postImageUrl}`,
        {
          "@type": "ImageObject",
          "name": post.imageAlt || post.title,
          "url": postImageUrl.startsWith('http') ? postImageUrl : `${BASE_URL}${postImageUrl}`,
          "caption": post.imageAlt || post.title,
          "creditText": authorName,
          "creator": {
            "@type": "Person",
            "name": authorName
          },
          "copyrightHolder": {
            "@type": "Person",
            "name": authorName
          },
          "copyrightNotice": `© ${new Date().getFullYear()} ${authorName}. All rights reserved.`,
          "license": `${BASE_URL}/about#terms`,
          "acquireLicensePage": `${BASE_URL}/about`
        }
      ],
      "publisher": {
        "@type": "Organization",
        "name": SITE_NAME,
        "url": BASE_URL,
        "logo": {
          "@type": "ImageObject",
          "name": `${SITE_NAME} Logo`,
          "url": `${BASE_URL}/favicon.ico`
        }
      },
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
