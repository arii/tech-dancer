import { Share2 } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { ReactNode } from 'react';
import { journalVariants } from '@/lib/variants';
import { AuthorAvatar } from './AuthorAvatar';
import { escapeHtml } from '@/utils/string';

interface EditorialHeaderProps {
  category: string;
  date: string;
  readTime: string;
  title: string;
  dek?: string;
  author: string;
  authorAvatarSrc?: string;
  tags?: string[];
  onShare?: () => void;
  isShared?: boolean;
  hero?: ReactNode;
}

export function EditorialHeader({
  category,
  date,
  readTime,
  title,
  dek,
  author,
  authorAvatarSrc,
  tags,
  onShare,
  isShared,
  hero,
}: EditorialHeaderProps) {
  return (
    <Stack gap={12}>
      <Stack gap={6}>
        <Text variant="mono" size="xs" color="dim" weight="font-black" uppercase tracking="widest">
          <Text as="span" color="accent">{category}</Text> <Text as="span" marginX={2} color="line" opacityVariant="subtle">•</Text> {date} <Text as="span" marginX={2} color="line" opacityVariant="subtle">•</Text> {readTime}
        </Text>

        <Text as="h1" variant="h1" size={{ base: "4xl", md: "6xl" }} weight="font-black" leading="none" tracking="tighter" className="text-pretty break-words">
          {title}
        </Text>

        {dek && (
          <Text variant="body" size={{ base: "xl", md: "2xl" }} color="dim" leading="relaxed" opacityVariant="solid" className="text-pretty font-medium">
            {dek}
          </Text>
        )}
      </Stack>

      {hero && (
        <Box width="full">
          {hero}
        </Box>
      )}

      <Stack direction={{ base: "column", sm: "row" }} justify="between" align={{ base: "start", sm: "center" }} gap={6} border="y" borderColor="line" paddingY={8} className="border-opacity-medium">
        <Stack direction="row" align="center" gap={4} flex={1}>
           <AuthorAvatar src={authorAvatarSrc} name={author} />
           <Stack gap={1}>
             <Text variant="mono" size="xs" weight="font-black" tracking="wide"  >BY {author.toUpperCase()}</Text>
             {onShare && (
               <Stack as="button" direction="row" align="center" gap={1.5} onClick={onShare} className={journalVariants.shareAction()}>
                 <Share2 className="w-3.5 h-3.5" />
                 <Text variant="mono" size="micro" weight="font-black" color={isShared ? "accent" : "inherit"}>
                   {isShared ? "COPIED!" : "SHARE"}
                 </Text>
               </Stack>
             )}
           </Stack>
        </Stack>

        {tags && tags.length > 0 && (
          <Stack direction="row" align="center" gap={2} wrap>
            <Text variant="mono" size="micro" color="dim" weight="font-medium">TAGS:</Text>
            {tags.map((tag, index) => (
              <Text
                key={`${tag}-${index}`}
                variant="mono"
                size="micro"
                color="dim"
                className={journalVariants.tagSeparator()}
              >
                {escapeHtml(tag.toUpperCase())}
              </Text>
            ))}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
