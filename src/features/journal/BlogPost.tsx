import { getPostBySlug, Post } from '@/lib/content';
import { BASE_URL, SITE_NAME } from '@/config/constants';
import { BlogPostDetail } from './components/BlogPostDetail';
import { ArticleRouteShell } from '@/components/layout/ArticleRouteShell';

export default function BlogPost() {
  return (
    <ArticleRouteShell<Post>
      queryKey="posts"
      queryFn={getPostBySlug}
      notFoundTitle="Post Not Found"
      notFoundLabel="Back to Journal"
      backPath="/blog"
      getSEO={(post) => {
        const structuredData = {
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

        return {
          title: post.title,
          description: post.excerpt,
          type: "article",
          image: post.image,
          schema: structuredData
        };
      }}
      renderDetail={(post, onBack) => (
        <BlogPostDetail
          post={post}
          onBack={onBack}
          backLabel="Back to Folio"
        />
      )}
    />
  );
}
