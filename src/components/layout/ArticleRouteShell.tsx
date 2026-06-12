import { ReactNode } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';

interface ArticleRouteShellProps<T> {
  queryKey: string;
  queryFn: (slug: string) => T | undefined;
  notFoundTitle: string;
  notFoundLabel: string;
  backPath: string;
  getSEO: (data: T) => {
    title: string;
    description: string;
    image?: string;
    schema?: Record<string, unknown> | Record<string, unknown>[];
    type?: 'website' | 'article' | 'profile';
  };
  renderDetail: (data: T, onBack: () => void) => ReactNode;
}

export function ArticleRouteShell<T>({
  queryKey,
  queryFn,
  notFoundTitle,
  notFoundLabel,
  backPath,
  getSEO,
  renderDetail
}: ArticleRouteShellProps<T>) {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: [queryKey, slug],
    queryFn: () => slug ? queryFn(slug) : undefined,
    enabled: !!slug,
    initialData: () => slug ? queryFn(slug) : undefined,
  });

  const onBack = () => navigate(backPath);

  if (!data) {
    return (
      <Box padding="panel" textAlign="center">
        <Stack gap={8} align="center">
          <Text variant="display" size="2xl">{notFoundTitle}</Text>
          <Box as="button" onClick={onBack} className="hover:text-accent transition-colors">
            <Text variant="mono" size="xs">{notFoundLabel}</Text>
          </Box>
        </Stack>
      </Box>
    );
  }

  const seoProps = getSEO(data);

  return (
    <>
      <SEO
        title={seoProps.title}
        description={seoProps.description}
        type={seoProps.type || "article"}
        image={seoProps.image}
        schema={seoProps.schema}
      />
      {renderDetail(data, onBack)}
    </>
  );
}
