import { useMemo } from "react";
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { BASE_URL, SITE_NAME, GOOGLE_SITE_VERIFICATION, ASSET_PREFIX } from '@/config/constants';

export type SchemaType = Record<string, unknown> | unknown;

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  type?: 'website' | 'article' | 'profile';
  image?: string;
  canonical?: string;
  noindex?: boolean;
  schema?: SchemaType | SchemaType[];
  jsonLd?: SchemaType | SchemaType[];
  googleVerification?: string;
}

export function SEO({
  title,
  description,
  keywords,
  type = 'website',
  image,
  canonical,
  noindex,
  schema,
  jsonLd,
  googleVerification = GOOGLE_SITE_VERIFICATION
}: SEOProps) {
  const { pathname } = useLocation();

  const url = canonical || `${BASE_URL}${pathname}`;
  const displayTitle = `${title} | ${SITE_NAME}`;

  const defaultImage = `${BASE_URL}${ASSET_PREFIX}/assets/comp_analysis_hero.webp`;

  // Use a dynamic OG image generator if no specific image is provided for articles
  // Removed Vercel logos to better align with TechDancer brand
  const seoImage = image || (type === 'article'
    ? `https://og-image.vercel.app/${encodeURIComponent(title)}.png?theme=light&md=1&fontSize=100px`
    : defaultImage);

  const combinedSchema = useMemo(() => {
    if (!schema && !jsonLd) return null;
    const schemas: unknown[] = [];

    if (schema) {
      if (Array.isArray(schema)) {
        schemas.push(...schema);
      } else {
        schemas.push(schema);
      }
    }
    if (jsonLd) {
      if (Array.isArray(jsonLd)) {
        schemas.push(...jsonLd);
      } else {
        schemas.push(jsonLd);
      }
    }

    return JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);
  }, [schema, jsonLd]);

  return (
    <Helmet>
      {/* Standard metadata */}
      {googleVerification && <meta name="google-site-verification" content={googleVerification} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <title>{displayTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:site_name" content={SITE_NAME} />
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

      {/* Structured Data */}
      {combinedSchema && (
        <script type="application/ld+json">
          {combinedSchema}
        </script>
      )}
    </Helmet>
  );
}
