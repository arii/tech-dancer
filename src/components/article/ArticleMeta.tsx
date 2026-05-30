
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
    <Stack direction="row" align="center" gap={4}>
      {/* Author Avatar/Icon */}
      <Box width={10} height={10} radius="full" border surface="surface" overflow="hidden" flex="0 0 auto">
        {authorAvatar ? (
          <img src={authorAvatar} alt={author} className="w-full h-full object-cover" />
        ) : (
          <Box width="full" height="full" display="flex" align="center" justify="center" color="dim">
            <Text variant="mono" size="xs">{author.charAt(0)}</Text>
          </Box>
        )}
      </Box>

      {/* Meta Text */}
      <Stack gap={0.5} marginTop={-0.5}>
        <Text weight="font-bold" color="body" size="sm" leading="none">{author}</Text>
        <Stack direction="row" gap={2} align="center">
          {status ? (
            <Box paddingX={1.5} paddingY={0.5} radius="sm" className="bg-brand-green-bg border border-brand-green-border">
              <Text variant="mono" size="micro" color="main" weight="font-bold" uppercase leading="none" className="text-brand-green-status">{status}</Text>
            </Box>
          ) : (
            date && <Text variant="mono" size="micro" color="dim" uppercase leading="none">{date}</Text>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
