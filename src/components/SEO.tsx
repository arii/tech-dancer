import { useMemo } from "react";
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { BASE_URL, SITE_NAME, GOOGLE_SITE_VERIFICATION } from '@/config/constants';

interface SEOProps {
  title: string;
  description: string;
  type?: 'website' | 'article' | 'profile';
  image?: string;
  canonical?: string;
  schema?: Record<string, unknown> | Record<string, unknown>[];
  googleVerification?: string;
}

export function SEO({
  title,
  description,
  type = 'website',
  image,
  canonical,
  schema,
  googleVerification = GOOGLE_SITE_VERIFICATION
}: SEOProps): React.ReactElement {
  const { pathname } = useLocation();

  const url = canonical || `${BASE_URL}${pathname}`;
  const displayTitle = `${title} | ${SITE_NAME}`;

  const defaultImage = `${BASE_URL}/assets/comp_analysis_hero.webp`;
  const descriptionText = description.trim();
  const pageTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  // Use a dynamic OG image generator if no specific image is provided for articles
  // Removed generic logos to better align with the Boom Tick brand
  const seoImage = image || (type === 'article'
    ? `https://og-image.vercel.app/${encodeURIComponent(title)}.png?theme=light&md=1&fontSize=100px`
    : defaultImage);

  const serializedSchema = useMemo(() => {
    if (!schema) return null;
    try {
      return JSON.stringify(schema);
    } catch (e) {
      console.error('Failed to serialize Schema.org markup:', e);
      return null;
    }
  }, [schema]);

  return (
    <Helmet>
      {/* Standard metadata */}
      {googleVerification && <meta name="google-site-verification" content={googleVerification} />}
      <title>{pageTitle}</title>
      <meta name="description" content={descriptionText} />
      <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
      <link rel="canonical" href={url} />
      <meta name="application-name" content={SITE_NAME} />
      <meta name="theme-color" content="#050816" />
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={descriptionText} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={descriptionText} />
      <meta name="twitter:image" content={seoImage} />

      {/* Structured Data */}
      {serializedSchema && (
        <script type="application/ld+json">
          {serializedSchema}
        </script>
      )}
    </Helmet>
  );
}
