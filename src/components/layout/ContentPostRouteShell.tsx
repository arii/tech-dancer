import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';

interface ContentPostRouteShellProps<T> {
  queryKeyPrefix: string;
  queryFn: (slug: string) => Promise<T | undefined> | T | undefined;
  buildSchema: (data: T) => Record<string, unknown>;
  notFoundTitle: string;
  notFoundLabel: string;
  notFoundPath: string;
  getSeoMetadata: (data: T) => { title: string; description: string; image?: string };
  renderDetail: (data: T, onBack: () => void) => React.ReactNode;
}

export function ContentPostRouteShell<T>({
  queryKeyPrefix,
  queryFn,
  buildSchema,
  notFoundTitle,
  notFoundLabel,
  notFoundPath,
  getSeoMetadata,
  renderDetail,
}: ContentPostRouteShellProps<T>) {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: [queryKeyPrefix, slug],
    queryFn: () => slug ? queryFn(slug) : undefined,
    enabled: !!slug,
    initialData: () => slug ? queryFn(slug) as T : undefined,
  });

  const structuredData = useMemo(() => {
    if (!data) return null;
    return buildSchema(data);
  }, [data, buildSchema]);

  if (!data) {
    return (
      <Box padding="panel" textAlign="center">
        <Stack gap={8} align="center">
          <Text variant="display" size="2xl">{notFoundTitle}</Text>
          <Box as="button" onClick={() => navigate(notFoundPath)} className="hover:text-accent transition-colors">
            <Text variant="mono" size="xs">{notFoundLabel}</Text>
          </Box>
        </Stack>
      </Box>
    );
  }

  const { title, description, image } = getSeoMetadata(data);

  return (
    <>
      <SEO
        title={title}
        description={description}
        type="article"
        image={image}
        schema={structuredData}
      />
      {renderDetail(data, () => navigate(notFoundPath))}
    </>
  );
}
