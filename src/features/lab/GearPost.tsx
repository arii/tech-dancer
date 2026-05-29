import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { getResourceBySlug } from '@/lib/content';
import { SEO } from '@/components/SEO';
import { BASE_URL } from '@/config/constants';
import { GearPostDetail } from './components/GearPostDetail';
import type { SchemaProduct } from '@/utils/schema';
import {
  AMAZON_AFFILIATE_DISCLOSURE,
  POD_SHIPPING_POLICY,
  POD_RETURN_POLICY,
  DEFAULT_AGGREGATE_RATING,
  DEFAULT_REVIEW
} from '@/utils/schema';

export default function GearPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: resource } = useQuery({
    queryKey: ['resources', slug],
    queryFn: () => slug ? getResourceBySlug(slug) : undefined,
    enabled: !!slug,
    initialData: () => slug ? getResourceBySlug(slug) : undefined,
  });

  const structuredData = useMemo(() => {
    if (!resource) return null;

    const isMerch = !!resource.shopUrl;
    const isAmazon = resource.affiliateProvider === 'amazon' || (resource.affiliateIds && resource.affiliateIds.length > 0);

    const schema: SchemaProduct = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": resource.title,
      "description": isAmazon
        ? `${resource.excerpt} ${AMAZON_AFFILIATE_DISCLOSURE}`
        : resource.excerpt,
      "image": resource.image
        ? (resource.image.startsWith('http') ? resource.image : `${BASE_URL}${resource.image}`)
        : `${BASE_URL}/assets/comp_analysis_hero.webp`,
      "brand": {
        "@type": "Brand",
        "name": "BoomTick"
      },
      "sku": resource.internalSku || resource.slug,
      "offers": {
        "@type": "Offer",
        "url": resource.shopUrl || `${BASE_URL}/gear/${resource.slug}`,
        "price": "0.00",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        ...(isMerch ? {
          "shippingDetails": POD_SHIPPING_POLICY,
          "hasMerchantReturnPolicy": POD_RETURN_POLICY
        } : {})
      },
      "aggregateRating": DEFAULT_AGGREGATE_RATING,
      "review": DEFAULT_REVIEW
    };

    return schema;
  }, [resource]);

  if (!resource) {
    return (
      <Box padding="panel" textAlign="center">
        <Stack gap={8} align="center">
          <Text variant="display" size="2xl">Review Not Found</Text>
          <Box as="button" onClick={() => navigate('/gear')} className="hover:text-accent transition-colors">
            <Text variant="mono" size="xs">Back to Toolbox</Text>
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
        onBack={() => navigate('/gear')}
        backLabel="Back to Toolbox"
      />
    </>
  );
}
