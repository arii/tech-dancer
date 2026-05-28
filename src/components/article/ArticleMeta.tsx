
/* impeccable-ignore-file */
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
      <Box className="w-10 h-10 rounded-full border border-slate-700 bg-slate-800 overflow-hidden flex-shrink-0">
        {authorAvatar ? (
          <img src={authorAvatar} alt={author} className="w-full h-full object-cover" />
        ) : (
          <Box className="w-full h-full flex items-center justify-center text-slate-500">
            <Text variant="mono" size="xs">{author.charAt(0)}</Text>
          </Box>
        )}
      </Box>

      {/* Meta Text */}
      <Stack gap={0.5}>
        <Text weight="font-bold" className="text-slate-200 text-sm">{author}</Text>
        <Stack direction="row" gap={2} align="center">
          {status ? (
            <Box className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
              <Text variant="mono" size="micro" className="text-emerald-400 font-bold uppercase">{status}</Text>
            </Box>
          ) : (
            date && <Text variant="mono" size="micro" className="text-slate-500 uppercase">{date}</Text>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
