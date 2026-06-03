

import { Box, Stack, Text } from '@/layouts/Primitives';
import { ReactNode } from 'react';

interface ArticleHeroProps {
  category?: string;
  date?: string;
  readingTime?: string;
  title: string;
  dek?: string;
  meta?: ReactNode;
  visual?: ReactNode;
  tags?: string[];
}

export function ArticleHero({
  category,
  date,
  readingTime,
  title,
  dek,
  meta,
  visual,
  tags
}: ArticleHeroProps) {
  return (
    <Box display="grid" lgGridCols={visual ? "1.05fr 0.95fr" : "1fr"} gap={8} lgGap={14} paddingY={10} lgPaddingY={16} align="center">
      {/* Content Column */}
      <Stack gap={{ base: 4, lg: 8 }}>
        <Stack gap={{ base: 3, lg: 4 }}>
          {(category || date || readingTime) && (
            <Stack direction="row" gap={3} align="center" color="dim">
              {category && (
                <Text variant="mono" size="xs" weight="font-bold" className="text-accent uppercase tracking-widest">
                  {category}
                </Text>
              )}
              {category && (date || readingTime) && <Box className="w-1 h-1 rounded-full bg-line" />}
              {date && (
                <Text variant="mono" size="xs">
                  {date}
                </Text>
              )}
              {date && readingTime && <Box className="w-1 h-1 rounded-full bg-line" />}
              {readingTime && (
                <Text variant="mono" size="xs">
                  {readingTime}
                </Text>
              )}
            </Stack>
          )}

          <Text as="h1" variant="display" size={{ base: "2xl", sm: "3xl", lg: "4xl" }} weight="font-bold" className="text-text-main leading-tight lg:leading-none">
            {title}
          </Text>

          {dek && (
            <Text size={{ base: "md", lg: "lg" }} className="text-text-dim lg:text-text-dim leading-relaxed max-w-xl">
              {dek}
            </Text>
          )}
        </Stack>

        {/* Mobile Visual (appears after title/dek on mobile) */}
        {visual && (
        <Box className="block lg:hidden h-56 sm:h-72 hero-visual">
          {visual}
        </Box>
        )}

        {meta && (
          <Box border="t" className="border-line/80" paddingTop={{ base: 4, lg: 6 }}>
            {meta}
          </Box>
        )}

        {tags && tags.length > 0 && (
          <Stack direction="row" gap={2} wrap paddingBottom={2} display={{ base: "none", lg: "flex" }}>
            {tags.map((tag) => (
              <Box
                key={tag}
                paddingX={3} paddingY={1} radius="full" border surface="surface" className="bg-surface/50 text-text-dim text-xs font-bold uppercase tracking-wider whitespace-nowrap"
              >
                {tag}
              </Box>
            ))}
          </Stack>
        )}
      </Stack>

      {/* Desktop Visual Column */}
      {visual && (
        <Box className="hidden lg:block hero-visual">
          {visual}
        </Box>
      )}
    </Box>
  );
}
