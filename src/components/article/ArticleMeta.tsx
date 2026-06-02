

import { Box, Stack, Text } from '@/layouts/Primitives';

interface ArticleMetaProps {
  author: string;
  authorAvatar?: string;
  date?: string;
  status?: string;
}

export function ArticleMeta({
  author,
  authorAvatar,
  date,
  status
}: ArticleMetaProps) {
  return (
        <>
      {author && (
        <Stack direction="row" align="center" gap={4}>
      {/* Author Avatar/Icon */}
      <Box width={10} height={10} radius="full" border surface="surface" overflow="hidden" shrink={false}>
        {authorAvatar ? (
          <img src={authorAvatar} alt={author} className="w-full h-full object-cover" />
        ) : (
          <Box width="full" height="full" display="flex" align="center" justify="center" className="text-text-dim">
            <Text variant="mono" size="xs">{author.charAt(0)}</Text>
          </Box>
        )}
      </Box>

      {/* Meta Text */}
      <Stack gap={0.5} marginTop={-0.5}>
        <Text weight="font-bold" className="text-text-body text-sm leading-none">{author}</Text>
        <Stack direction="row" gap={2} align="center">
          {status ? (
            <Box paddingX={1.5} paddingY={0.5} radius="md" border className="bg-accent/10 border-accent/20">
              <Text variant="mono" size="micro" weight="font-bold" uppercase color="accent" className="leading-none">{status}</Text>
            </Box>
          ) : (
            date && <Text variant="mono" size="micro" className="text-text-dim uppercase leading-none">{date}</Text>
          )}
        </Stack>
      </Stack>
        </Stack>
      )}
    </>
  );
}
