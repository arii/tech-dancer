import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { getResourceBySlug } from '@/lib/content';
import { SEO } from '@/components/SEO';
import { BASE_URL } from '@/config/constants';
import { MerchPostDetail } from './components/MerchPostDetail';

export default function ShopPost() {
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
      "offers": {
        "@type": "Offer",
        "url": resource.shopUrl,
        "availability": "https://schema.org/InStock",
        "priceCurrency": "USD"
      }
    };
  }, [resource]);

  if (!resource) {
    return (
      <Box padding="panel" textAlign="center">
        <Stack gap={8} align="center">
          <Text variant="display" size="2xl">Product Not Found</Text>
          <Box as="button" onClick={() => navigate('/merch')} className="hover:text-accent transition-colors">
            <Text variant="mono" size="xs">Back to Shop</Text>
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
      <MerchPostDetail
        post={resource}
        onBack={() => navigate('/merch')}
        backLabel="Back to Shop"
      />
    </>
  );
}
