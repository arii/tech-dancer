import { Box, Grid } from '@/layouts/Primitives';
import { ContentCard } from '@/components/ui/ContentCard';

import { Stack, Text } from '@/layouts/Primitives';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Icon } from '@/components/ui/Icon';
import { variants } from '@/lib/variants';

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

  return (
    <Box paddingY={12} border="t" className={variants.border.muted}>
      <Grid cols={{ base: 1, md: 2 }} gap={4}>
        <Box>
          {previous && (
            <Stack gap={2} height="full">
              <Stack direction="row" align="center" gap={2}>
                <Icon
                  icon={ArrowLeft}
                  size="sm"
                  className="motion-safe:transition-transform motion-safe:group-hover:-translate-x-1"
                />
                <Text variant="mono" size="xs" color="dim" weight="font-bold" uppercase tracking="widest">
                  Previous Article
                </Text>
              </Stack>
              <ContentCard
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
        <Box>
          {next && (
            <Stack gap={2} align="end" height="full">
              <Stack direction="row" align="center" gap={2}>
                <Text variant="mono" size="xs" color="dim" weight="font-bold" uppercase tracking="widest">
                  Next Article
                </Text>
                <Icon
                  icon={ArrowRight}
                  size="sm"
                  className="motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
                />
              </Stack>
              <ContentCard
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
