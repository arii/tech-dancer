import { useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { getResourceBySlug } from '@/lib/content';
import { SEO } from '@/components/SEO';
import { BASE_URL } from '@/config/constants';
import { GearPostDetail } from './components/GearPostDetail';
import type { SchemaProduct } from '@/utils/schema';
import { MERCH_PRODUCTS } from '@/data/merch';
import {
  DEFAULT_BRAND,
  DEFAULT_PRINTFUL_SHIPPING_DETAILS,
  DEFAULT_PRINTFUL_RETURN_POLICY,
  AUTHOR_ARIEL_ANDERS,
  formatIsoDate,
  parsePrice,
  generateBreadcrumbSchema,
} from '@/utils/schema';

export default function GearPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: resource } = useQuery({
    queryKey: ['resources', slug],
    queryFn: () => slug ? getResourceBySlug(slug) : undefined,
    enabled: !!slug,
    initialData: () => slug ? getResourceBySlug(slug) : undefined,
  });

  const isMerch = useMemo(() => {
    if (!resource) return false;
    const fromState = (location.state as { from?: string } | null)?.from;
    if (fromState === 'merch' || fromState === '/merch') return true;
    return (
      resource.provider === 'printful' ||
      !!resource.shopUrl ||
      resource.tags?.includes('merch') ||
      resource.category?.toLowerCase() === 'fashion' ||
      resource.category?.toLowerCase() === 'apparel' ||
      resource.category?.toLowerCase() === 'accessories'
    );
  }, [resource, location.state]);

  const structuredData = useMemo(() => {
    if (!resource) return null;

    const sku = resource.internalSku || resource.slug;
    const matchedMerch = MERCH_PRODUCTS.find(
      (p) => (resource.slug && (p.gearSlug === resource.slug || p.id === resource.slug)) || (resource.shopUrl && p.printfulUrl === resource.shopUrl)
    );
    const rawPrice = matchedMerch?.price || (resource as unknown as { price?: string | number }).price;
    const price = parsePrice(rawPrice, "25.00");
    const productImageUrl = resource.image
      ? (resource.image.startsWith('http') ? resource.image : `${BASE_URL}${resource.image}`)
      : `${BASE_URL}/assets/comp_analysis_hero.webp`;

    const breadcrumbSchema = generateBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: isMerch ? "Merch" : "Gear & Tools", path: isMerch ? "/merch" : "/gear" },
      { name: resource.title, path: `/gear/${resource.slug}` }
    ]);

    if (isMerch) {
      const productSchema: SchemaProduct = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": resource.title,
        "description": resource.excerpt,
        "image": productImageUrl,
        "sku": sku,
        "mpn": sku,
        "brand": DEFAULT_BRAND,
        "offers": {
          "@type": "Offer",
          "price": price,
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition",
          "url": `${BASE_URL}/gear/${resource.slug}`,
          "shippingDetails": DEFAULT_PRINTFUL_SHIPPING_DETAILS,
          "hasMerchantReturnPolicy": DEFAULT_PRINTFUL_RETURN_POLICY,
        }
      };
      return [productSchema, breadcrumbSchema];
    }

    // For third-party affiliate items, emit standard Article & Breadcrumbs (no Product schema to prevent merchant listing misclassification)
    const authorName = resource.author || "Ariel Anders";
    const isAriel = !resource.author || resource.author === 'Ariel Anders' || resource.author.includes('Ariel');
    const authorSchema = isAriel
      ? AUTHOR_ARIEL_ANDERS
      : {
          "@type": "Person" as const,
          "name": resource.author,
          "url": `${BASE_URL}/about`
        };

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "name": resource.title,
      "headline": resource.title,
      "description": resource.excerpt,
      "image": [
        productImageUrl,
        {
          "@type": "ImageObject",
          "name": resource.title,
          "url": productImageUrl,
          "caption": resource.title,
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
      "datePublished": formatIsoDate(resource.date),
      "dateModified": formatIsoDate(resource.date),
      "author": authorSchema,
      "publisher": {
        "@type": "Organization",
        "name": "BoomTick.blog",
        "url": BASE_URL,
        "logo": {
          "@type": "ImageObject",
          "name": "BoomTick.blog Logo",
          "url": `${BASE_URL}/favicon.ico`
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "name": resource.title,
        "@id": `${BASE_URL}/gear/${resource.slug}`
      }
    };

    return [articleSchema, breadcrumbSchema];
  }, [resource, isMerch]);

  const backTarget = isMerch ? '/merch' : '/gear';
  const backLabel = isMerch ? 'Back to Merch' : 'Back to Toolbox';

  if (!resource) {
    return (
      <Box padding="panel" textAlign="center">
        <Stack gap={8} align="center">
          <Text variant="display" size="2xl">Review Not Found</Text>
          <Box as="button" onClick={() => navigate(backTarget)} className="hover:text-accent transition-colors">
            <Text variant="mono" size="xs">{backLabel}</Text>
          </Box>
        </Stack>
      </Box>
    );
  }

  return (
    <>
      <SEO
        title={resource.seoTitle || resource.title}
        description={resource.seoDescription || resource.excerpt}
        type="article"
        image={resource.image}
        schema={structuredData}
      />
      <GearPostDetail
        post={resource}
        onBack={() => navigate(backTarget)}
        backLabel={backLabel}
      />
    </>
  );
}
