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
  DEFAULT_BRAND,
  DEFAULT_PRINTFUL_SHIPPING_DETAILS,
  DEFAULT_PRINTFUL_RETURN_POLICY,
  parsePrice,
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

    const isAmazon = resource.affiliateProvider === 'amazon' || (resource.affiliateIds && resource.affiliateIds.length > 0);
    const sku = resource.internalSku || resource.slug;
    const rawPrice = (resource as unknown as { price?: string | number }).price;
    const price = parsePrice(rawPrice, "25.00");

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
      "brand": DEFAULT_BRAND,
      "sku": sku,
      "mpn": sku,
      "offers": {
        "@type": "Offer",
        "price": price,
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition",
        "url": resource.shopUrl || `${BASE_URL}/gear/${resource.slug}`,
        "shippingDetails": DEFAULT_PRINTFUL_SHIPPING_DETAILS,
        "hasMerchantReturnPolicy": DEFAULT_PRINTFUL_RETURN_POLICY,
      }
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
