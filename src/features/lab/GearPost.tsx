import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getResourceBySlug } from '@/lib/content';
import { SEO } from '@/components/SEO';
import { BASE_URL } from '@/config/constants';
import { GearPostDetail } from './components/GearPostDetail';
import { Box, Stack } from "@/layouts/Primitives";
import { Text } from "@/layouts/Text";

export default function GearPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: resource } = useQuery({
    queryKey: ['resources', slug],
    queryFn: () => slug ? getResourceBySlug(slug) : undefined,
    enabled: !!slug
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
        "name": resource.category
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
