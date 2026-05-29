
/* impeccable-ignore-file */
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
    <Box className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-14 py-10 lg:py-16 items-center">
      {/* Content Column */}
      <Stack gap={{ base: 4, lg: 8 }}>
        <Stack gap={{ base: 3, lg: 4 }}>
          {(category || date || readingTime) && (
            <Stack direction="row" gap={3} align="center" className="text-slate-400">
              {category && (
                <Text variant="mono" size="xs" weight="font-bold" className="text-cyan-400 uppercase tracking-widest">
                  {category}
                </Text>
              )}
              {category && (date || readingTime) && <Box className="w-1 h-1 rounded-full bg-slate-700" />}
              {date && (
                <Text variant="mono" size="xs">
                  {date}
                </Text>
              )}
              {date && readingTime && <Box className="w-1 h-1 rounded-full bg-slate-700" />}
              {readingTime && (
                <Text variant="mono" size="xs">
                  {readingTime}
                </Text>
              )}
            </Stack>
          )}

          <Text as="h1" variant="display" size={{ base: "2xl", sm: "3xl", lg: "4xl" }} weight="font-bold" className="text-slate-100 leading-[1.15] lg:leading-[1.1]">
            {title}
          </Text>

          {dek && (
            <Text size={{ base: "md", lg: "lg" }} className="text-slate-300 lg:text-slate-400 leading-relaxed max-w-xl">
              {dek}
            </Text>
          )}
        </Stack>

        {/* Mobile Visual (appears after title/dek on mobile) */}
        <Box className="block lg:hidden h-56 sm:h-72 overflow-hidden rounded-xl">
          {visual}
        </Box>

        {meta && (
          <Box border="t" className="border-slate-800/80 pt-4 lg:pt-6">
            {meta}
          </Box>
        )}

        {tags && tags.length > 0 && (
          <Stack direction="row" gap={2} wrap className="pb-2 hidden lg:flex">
            {tags.map((tag) => (
              <Box
                key={tag}
                className="px-3 py-1 rounded-full border border-slate-800 bg-slate-900/50 text-slate-400 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap"
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
