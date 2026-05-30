
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
                <Text variant="mono" size="xs" weight="font-extrabold" color="accent" uppercase tracking="utility">
                  {category}
                </Text>
              )}
              {category && (date || readTime) && (
                <Box width={1} height={1} radius="full" className="bg-line/60" />
              )}
              {date && (
                <Text variant="mono" size="xs" color="dim" weight="font-bold" uppercase tracking="utility">
                  {date}
                </Text>
              )}
              {date && readTime && (
                <Box width={1} height={1} radius="full" className="bg-line/60" />
              )}
              {readTime && (
                <Text variant="mono" size="xs" color="dim" weight="font-bold" uppercase tracking="utility">
                  {readTime}
                </Text>
              )}
            </Stack>
          )}

          <Text
            as="h1"
            variant="display"
            size={{ base: "3xl", sm: "4xl", lg: "5xl" }}
            weight="font-bold"
            color="main"
            leading="tight"
            tracking="tight"
            className="leading-none break-words"
          >
            {title}
          </Text>

          {dek && (
            <Text
              size={{ base: "md", lg: "xl" }}
              color="dim"
              leading="relaxed"
              weight="font-medium"
              className="max-w-2xl opacity-90"
            >
              {dek}
            </Text>
          )}
        </Stack>

        {/* Hero Visual - Editorial placement (full width after dek) */}
        {visual && (
          <Box width="full" overflow="hidden" radius="2xl" border className="border-line/40 shadow-2xl">
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
            <Box
              width={10}
              height={10}
              radius="full"
              border
              surface="surface"
              overflow="hidden"
              flex="0 0 auto"
              className="border-line/60"
            >
              {authorAvatar ? (
                <img src={authorAvatar} alt={author} className="w-full h-full object-cover" />
              ) : (
                <Box width="full" height="full" display="flex" align="center" justify="center" color="dim">
                  <Text variant="mono" size="xs">{(author || 'A').charAt(0)}</Text>
                </Box>
              )}
            </Box>
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
                  paddingX={3}
                  paddingY={1}
                  radius="full"
                  border
                  surface="surface-alt"
                  className="border-line/60 whitespace-nowrap"
                >
                  <Text variant="mono" size="micro" color="dim" uppercase tracking="utility">{tag}</Text>
                </Box>
              ))}
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
