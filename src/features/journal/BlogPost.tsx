import { getPostBySlug } from '@/lib/content';
import { BASE_URL, SITE_NAME } from '@/config/constants';
import { BlogPostDetail } from './components/BlogPostDetail';
import { ContentPostRouteShell } from '@/components/layout/ContentPostRouteShell';

export default function BlogPost() {
  return (
    <ContentPostRouteShell
      queryKeyPrefix="posts"
      queryFn={getPostBySlug}
      notFoundTitle="Post Not Found"
      notFoundLabel="Back to Journal"
      notFoundPath="/blog"
      getSeoMetadata={(post) => ({
        title: post.title,
        description: post.excerpt,
        image: post.image,
      })}
      buildSchema={(post) => ({
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
      })}
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
