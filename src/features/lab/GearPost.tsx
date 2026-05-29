import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { getResourceBySlug } from '@/lib/content';
import { SEO } from '@/components/SEO';
import { BASE_URL } from '@/config/constants';
import { GearPostDetail } from './components/GearPostDetail';
import type { SchemaProduct } from '@/utils/schema';
import { AMAZON_AFFILIATE_DISCLOSURE } from '@/utils/schema';

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
          "shippingDetails": {
            "@type": "OfferShippingDetails",
            "description": "Made to order. Production and shipping times vary by product and destination. Final delivery estimates are shown at checkout.",
            "shippingDestination": {
              "@type": "DefinedRegion",
              "addressCountry": "US"
              },
              "deliveryTime": {
                "@type": "ShippingDeliveryTime",
                "handlingTime": {
                  "@type": "QuantitativeValue",
                  "minValue": 2,
                  "maxValue": 5,
                  "unitCode": "DAY"
                },
                "transitTime": {
                  "@type": "QuantitativeValue",
                  "minValue": 3,
                  "maxValue": 10,
                  "unitCode": "DAY"
                }
              },
              "shippingRate": {
                "@type": "MonetaryAmount",
                "value": "6.50",
                "currency": "USD"
            }
          },
          "hasMerchantReturnPolicy": {
            "@type": "MerchantReturnPolicy",
            "applicableCountry": "US",
            "returnPolicyCategory": "https://schema.org/UnsupportedReturnPolicy",
              "description": "Each item is made to order. We cannot accept returns or exchanges for size, color, or change of mind. If your item arrives misprinted, damaged, defective, or incorrect, contact us promptly so we can help resolve it.",
              "merchantReturnDays": 0,
              "returnMethod": "https://schema.org/ReturnByMail",
              "returnFees": "https://schema.org/ReturnFeesCustomerResponsibility"
          }
        } : {})
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5",
          "reviewCount": "1"
        },
        "review": {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Ariel Anders, PhD"
          }
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
