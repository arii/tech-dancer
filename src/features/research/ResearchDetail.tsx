import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { getResourceBySlug } from '@/lib/content';
import { SEO } from '@/components/SEO';
import { BASE_URL, SITE_NAME } from '@/config/constants';
import { SITE_METADATA } from '@/config/content';

export default function ResearchDetail() {
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
      "@type": "Article",
      "headline": resource.title,
      "description": resource.excerpt,
      "author": {
        "@type": "Person",
        "name": resource.author || SITE_METADATA.author,
        "url": `${BASE_URL}/about`
      },
      "datePublished": resource.date,
      "publisher": {
        "@type": "Organization",
        "name": SITE_NAME
      }
    };
  }, [resource]);

  if (!resource) {
    return (
      <Box padding="panel" textAlign="center">
        <Stack gap={8} align="center">
          <Text variant="display" size="2xl">Lab Resource Not Found</Text>
          <Box as="button" onClick={() => navigate('/research')} className="hover:text-accent transition-colors">
            <Text variant="mono" size="xs">Back to Research</Text>
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
        schema={structuredData}
      />
      <Box as="article" paddingY={12}>
        <PageHeader
          label={resource.category.toUpperCase()}
          title={resource.title}
          description={resource.excerpt}
        />
        <Stack gap={8} marginTop={12}>
           {/* Component implementation details... */}
        </Stack>
      </Box>
    </>
  );
}

function PageHeader({ label, title, description }: { label: string; title: string; description: string }) {
  return (
    <Stack gap={4}>
      <Text variant="mono" size="xs" color="brand" weight="font-bold">{label}</Text>
      <Text variant="display" size="5xl" weight="font-black" className="uppercase tracking-tight">{title}</Text>
      <Text variant="body" size="lg" color="body" maxWidth="prose">{description}</Text>
    </Stack>
  );
}
