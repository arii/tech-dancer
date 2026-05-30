
import { Box, Stack, Text } from '@/layouts/Primitives';
import { ReactNode } from 'react';

interface PostHeaderProps {
  category?: string;
  date?: string;
  readTime?: string;
  title: string;
  dek?: string;
  author?: string;
  authorAvatar?: string;
  shareAction?: ReactNode;
  visual?: ReactNode;
  tags?: string[];
}

export function PostHeader({
  category,
  date,
  readTime,
  title,
  dek,
  author,
  authorAvatar,
  shareAction,
  visual,
  tags
}: PostHeaderProps) {
  return (
    <Stack gap={{ base: 8, lg: 12 }}>
      <Stack gap={{ base: 6, lg: 8 }} maxWidth="4xl">
        <Stack gap={{ base: 3, lg: 4 }}>
          {(category || date || readTime) && (
            <Stack direction="row" gap={3} align="center">
              {category && (
                <Text variant="mono" size="xs" weight="font-extrabold" className="text-accent uppercase tracking-[0.18em]">
                  {category}
                </Text>
              )}
              {category && (date || readTime) && <Box className="w-1 h-1 rounded-full bg-line/60" />}
              {date && (
                <Text variant="mono" size="xs" color="dim" weight="font-bold">
                  {date}
                </Text>
              )}
              {date && readTime && <Box className="w-1 h-1 rounded-full bg-line/60" />}
              {readTime && (
                <Text variant="mono" size="xs" color="dim" weight="font-bold">
                  {readTime}
                </Text>
              )}
            </Stack>
          )}

          <Text as="h1" variant="display" size={{ base: "3xl", sm: "4xl", lg: "5xl" }} weight="font-bold" className="text-text-main leading-[1.05] tracking-tight">
            {title}
          </Text>

          {dek && (
            <Text size={{ base: "md", lg: "xl" }} className="text-text-dim/90 leading-relaxed max-w-2xl font-medium">
              {dek}
            </Text>
          )}
        </Stack>

        {/* Hero Visual - Editorial placement (full width after dek) */}
        {visual && (
          <Box className="w-full overflow-hidden rounded-2xl border border-line/40 shadow-2xl">
            {visual}
          </Box>
        )}

        {/* Author / Share / Tags Row */}
        <Stack
          direction={{ base: 'column', md: 'row' }}
          justify="between"
          align={{ base: 'start', md: 'center' }}
          gap={6}
          paddingY={6}
          border="y"
          className="border-line/40"
        >
          <Stack direction="row" align="center" gap={4}>
            {authorAvatar && (
              <Box as="img" src={authorAvatar} alt={author} className="w-10 h-10 rounded-full border border-line/60" />
            )}
            <Stack gap={0.5}>
              <Text size="sm" weight="font-bold" color="main">
                {author || 'Ariel Anders, PhD'}
              </Text>
              {shareAction}
            </Stack>
          </Stack>

          {tags && tags.length > 0 && (
            <Stack direction="row" gap={2} wrap>
              {tags.map((tag) => (
                <Box
                  key={tag}
                  className="px-3 py-1 rounded-full border border-line/60 bg-surface/30 text-text-dim text-[10px] font-extrabold uppercase tracking-widest whitespace-nowrap"
                >
                  {tag}
                </Box>
              ))}
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
