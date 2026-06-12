import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';

interface ContentPostRouteProps<T> {
  queryKeyPrefix: string;
  fetchFn: (slug: string) => T | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schemaBuilder: (data: T) => any;
  backPath: string;
  backLabel: string;
  notFoundTitle: string;
  seoType?: string;
  titleKey: keyof T;
  descriptionKey: keyof T;
  imageKey?: keyof T;
  seoTitleKey?: keyof T;
  seoDescriptionKey?: keyof T;
  DetailComponent: React.ComponentType<{ post: T; onBack: () => void; backLabel: string }>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ContentPostRoute<T extends Record<string, any>>({
  queryKeyPrefix,
  fetchFn,
  schemaBuilder,
  backPath,
  backLabel,
  notFoundTitle,
  seoType = "article",
  titleKey,
  descriptionKey,
  imageKey,
  seoTitleKey,
  seoDescriptionKey,
  DetailComponent
}: ContentPostRouteProps<T>) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: [queryKeyPrefix, slug],
    queryFn: () => slug ? fetchFn(slug) : undefined,
    enabled: !!slug,
    initialData: () => slug ? fetchFn(slug) : undefined,
  });

  const structuredData = useMemo(() => {
    if (!data) return null;
    return schemaBuilder(data);
  }, [data, schemaBuilder]);

  if (!data) {
    return (
      <Box padding="panel" textAlign="center">
        <Stack gap={8} align="center">
          <Text variant="display" size="2xl">{notFoundTitle}</Text>
          <Box as="button" onClick={() => navigate(backPath)} className="hover:text-accent transition-colors">
            <Text variant="mono" size="xs">{backLabel}</Text>
          </Box>
        </Stack>
      </Box>
    );
  }

  const seoTitle = seoTitleKey && data[seoTitleKey] ? data[seoTitleKey] : data[titleKey];
  const seoDescription = seoDescriptionKey && data[seoDescriptionKey] ? data[seoDescriptionKey] : data[descriptionKey];
  const image = imageKey ? data[imageKey] : undefined;

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        type={seoType}
        image={image}
        schema={structuredData}
      />
      <DetailComponent
        post={data}
        onBack={() => navigate(backPath)}
        backLabel={backLabel}
      />
    </>
  );
}
