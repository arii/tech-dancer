import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { getResourceBySlug } from '@/lib/content';
import { SEO } from '@/components/SEO';
import { BASE_URL } from '@/config/constants';
import { DEFAULT_RETURN_POLICY } from '@/utils/schema';
import { GearPostDetail } from './components/GearPostDetail';

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
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": resource.title,
      "description": resource.excerpt,
      "image": resource.image || `${BASE_URL}/assets/comp_analysis_hero.webp`,
      "brand": {
        "@type": "Brand",
        "name": "BoomTick"
      },
      "sku": resource.sku || resource.slug,
      "offers": {
        "@type": "Offer",
        "price": resource.priceCategory === 'premium' ? '45.00' : '25.00',
        "priceCurrency": "USD",
        "url": resource.shopUrl || `${BASE_URL}/gear/${resource.slug}`,
        "availability": "https://schema.org/InStock",
        "shippingDetails": {
          "@type": "OfferShippingDetails",
          "shippingRate": {
            "@type": "MonetaryAmount",
            "value": "5.80",
            "currency": "USD"
          },
          "shippingDestination": {
            "@type": "DefinedRegion",
            "addressCountry": "US"
          },
          "deliveryTime": {
            "@type": "ShippingDeliveryTime",
            "handlingTime": {
              "@type": "QuantitativeValue",
              "minValue": 1,
              "maxValue": 3,
              "unitCode": "DAY"
            },
            "transitTime": {
              "@type": "QuantitativeValue",
              "minValue": 2,
              "maxValue": 5,
              "unitCode": "DAY"
            }
          }
        },
        "hasMerchantReturnPolicy": DEFAULT_RETURN_POLICY
      },
      "review": {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": resource.rating || 5,
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Ariel Anders",
          "url": `${BASE_URL}/about`
        },
        "datePublished": resource.date
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": resource.rating || 5,
        "reviewCount": "1"
      }
    };
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
        title={resource.title}
        description={resource.excerpt}
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
