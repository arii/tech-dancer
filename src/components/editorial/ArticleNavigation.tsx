import { Box, Grid } from '@/layouts/Primitives';
import { ContentCard } from '@/components/ui/ContentCard';

import { Stack, Text } from '@/layouts/Primitives';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Icon } from '@/components/ui/Icon';

export interface ArticleNavItem {
  title: string;
  href: string;
  category?: string;
  excerpt?: string;
  slug: string;
  basePath: string;
  date?: string;
  readingTime?: string;
  image?: string;
  imageAlt?: string;
}

interface ArticleNavigationProps {
  previous?: ArticleNavItem;
  next?: ArticleNavItem;
}

export function ArticleNavigation({ previous, next }: ArticleNavigationProps) {
  if (!previous && !next) return null;

  const hasBoth = Boolean(previous && next);

  return (
    <Box paddingY={12} border="t" borderColor="line" className="border-opacity-medium">
      <Grid cols={{ base: 1, md: hasBoth ? 2 : 1 }} gap={6}>
        <Box height="full">
          {previous && (
            <Stack gap={2} height="full">
              <Stack direction="row" align="center" gap={2} minHeight={11}>
                <Icon
                  icon={ArrowLeft}
                  size="sm"
                  className="transition-transform group-hover:-translate-x-1"
                />
                <Text variant="mono" size="xs" color="dim" weight="font-bold" uppercase tracking="widest">
                  Previous Article
                </Text>
              </Stack>
              <ContentCard
                flex={true}
                excerptClamp={2}
                title={previous.title}
                slug={previous.slug}
                basePath={previous.basePath}
                category={previous.category || ''}
                excerpt={previous.excerpt}
                date={previous.date}
                readingTime={previous.readingTime}
                image={previous.image}
                imageAlt={previous.imageAlt}
              />
            </Stack>
          )}
        </Box>
        <Box height="full">
          {next && (
            <Stack gap={2} align="end" height="full">
              <Stack direction="row" align="center" gap={2} minHeight={11}>
                <Text variant="mono" size="xs" color="dim" weight="font-bold" uppercase tracking="widest">
                  Next Article
                </Text>
                <Icon
                  icon={ArrowRight}
                  size="sm"
                  className="transition-transform group-hover:translate-x-1"
                />
              </Stack>
              <ContentCard
                flex={true}
                excerptClamp={2}
                title={next.title}
                slug={next.slug}
                basePath={next.basePath}
                category={next.category || ''}
                excerpt={next.excerpt}
                date={next.date}
                readingTime={next.readingTime}
                image={next.image}
                imageAlt={next.imageAlt}
              />
            </Stack>
          )}
        </Box>
      </Grid>
    </Box>
  );
}
