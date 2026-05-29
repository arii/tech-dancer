

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
    <Box display="grid" lgGridCols="1.05fr 0.95fr" gap={8} lgGap={14} paddingY={10} lgPaddingY={16} align="center"> {/* impeccable-ignore */}
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
        <Box className="block lg:hidden h-56 sm:h-72 overflow-hidden rounded-xl">
          {visual}
        </Box>

        {meta && (
          <Box border="t" className="border-line/80 pt-4 lg:pt-6">
            {meta}
          </Box>
        )}

        {tags && tags.length > 0 && (
          <Stack direction="row" gap={2} wrap className="pb-2 hidden lg:flex"> {/* impeccable-ignore */}
            {tags.map((tag) => (
              <Box
                key={tag}
                className="px-3 py-1 rounded-full border border-line bg-surface/50 text-text-dim text-[11px] font-bold uppercase tracking-wider whitespace-nowrap" // impeccable-ignore
              >
                {tag}
              </Box>
            ))}
          </Stack>
        )}
      </Stack>

      {/* Desktop Visual Column */}
      <Box className="hidden lg:block">
        {visual}
      </Box>
    </Box>
  );
}
