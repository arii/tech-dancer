import { useCallback } from 'react';
import { getPostBySlug, Post } from '@/lib/content';
import { BASE_URL, SITE_NAME } from '@/config/constants';
import { BlogPostDetail } from './components/BlogPostDetail';
import { ContentPostRoute } from '@/components/editorial/ContentPostRoute';

export default function BlogPost() {
  const schemaBuilder = useCallback((post: Post) => {
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
  }, []);

  return (
    <ContentPostRoute<Post>
      queryKeyPrefix="posts"
      fetchFn={getPostBySlug}
      schemaBuilder={schemaBuilder}
      backPath="/blog"
      backLabel="Back to Folio"
      notFoundTitle="Post Not Found"
      titleKey="title"
      descriptionKey="excerpt"
      imageKey="image"
      DetailComponent={BlogPostDetail}
    />
  );
}
