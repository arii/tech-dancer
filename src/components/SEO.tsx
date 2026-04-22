import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  type?: 'website' | 'article' | 'profile';
  image?: string;
  canonical?: string;
}

export function SEO({
  title,
  description,
  type = 'website',
  image,
  canonical
}: SEOProps) {
  const { pathname } = useLocation();

  // Base URL logic - adjust to match your deployment
  const baseUrl = 'https://tech-dancer.github.io/tech-dancer'; // Replace with actual domain if different
  const url = canonical || `${baseUrl}${pathname}`;
  const displayTitle = `${title} | TechDancer`;

  const defaultImage = `${baseUrl}/assets/comp_analysis_hero.webp`;
  const seoImage = image || defaultImage;

  return (
    <Helmet>
      {/* Standard metadata */}
      <title>{displayTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={displayTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={seoImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={displayTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={seoImage} />
    </Helmet>
  );
}
