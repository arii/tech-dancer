import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { getResourceBySlug } from '@/lib/content';
import { SEO } from '@/components/SEO';
import { GearPostDetail } from './components/GearPostDetail';

export default function GearPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const resource = useMemo(() => slug ? getResourceBySlug(slug) : undefined, [slug]);

  const structuredData = useMemo(() => {
    if (!resource) return null;
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": resource.title,
      "description": resource.excerpt,
      "image": resource.image,
      "review": {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": resource.rating || 5,
          "bestRating": "5"
        },
        "author": { "@type": "Person", "name": "Ariel" }
      }
    };
  }, [resource]);

  if (!resource) {
    return (
      <Box padding="panel" textAlign="center">
        <Stack gap={8} align="center">
          <Text variant="displayLower" size="2xl">Review Not Found</Text>
          <Box as="button" onClick={() => navigate('/gear')} cursor="pointer" className="hover:text-accent transition-colors">
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
      />
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      <GearPostDetail
        post={resource}
        onBack={() => navigate('/gear')}
        backLabel="Back to Toolbox"
      />
    </>
  );
}
