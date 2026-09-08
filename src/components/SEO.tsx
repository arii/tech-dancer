import { useMemo, useLayoutEffect } from "react";
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

  // Clean up static pre-rendered head tags upon client-side mount / navigation
  // to avoid duplication with client-side Helmet tags.
  useLayoutEffect(() => {
    const prerendered = document.querySelectorAll('head [data-prerendered="true"]');
    prerendered.forEach(el => el.remove());
  }, [pathname]);

  return (
    <Helmet>
      {/* Standard metadata */}
      {googleVerification && <meta data-rh="true" name="google-site-verification" content={googleVerification} />}
      {noindex && <meta data-rh="true" name="robots" content="noindex, nofollow" />}
      <title data-rh="true">{displayTitle}</title>
      <meta data-rh="true" name="description" content={description} />
      {keywords && <meta data-rh="true" name="keywords" content={keywords} />}
      <link data-rh="true" rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta data-rh="true" property="og:site_name" content={SITE_NAME} />
      <meta data-rh="true" property="og:type" content={type} />
      <meta data-rh="true" property="og:url" content={url} />
      <meta data-rh="true" property="og:title" content={displayTitle} />
      <meta data-rh="true" property="og:description" content={description} />
      <meta data-rh="true" property="og:image" content={seoImage} />

      {/* Twitter */}
      <meta data-rh="true" name="twitter:card" content="summary_large_image" />
      <meta data-rh="true" name="twitter:url" content={url} />
      <meta data-rh="true" name="twitter:title" content={displayTitle} />
      <meta data-rh="true" name="twitter:description" content={description} />
      <meta data-rh="true" name="twitter:image" content={seoImage} />

      {/* Structured Data */}
      {combinedSchema && (
        <script data-rh="true" type="application/ld+json">
          {combinedSchema}
        </script>
      )}
    </Helmet>
  );
}
