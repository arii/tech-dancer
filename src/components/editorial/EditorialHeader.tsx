import { Share2 } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { ReactNode } from 'react';
import { journalVariants } from '@/lib/variants';
import { AuthorAvatar } from './AuthorAvatar';

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
    <Stack gap={4}>
      <Stack gap={3}>
        <Text
          as="h1"
          variant="h1"
          weight="font-black"
          leading="none"
          tracking="tighter"
          className="break-words font-fluid-h1"
        >
          {title}
        </Text>

        {dek && (
          <Text variant="body" size={{ base: "xl", md: "2xl" }} color="dim" leading="relaxed" opacityVariant="solid" className="text-pretty font-medium">
            {dek}
          </Text>
        )}
      </Stack>

      <Box border="y" borderColor="line" paddingY={3} className="border-opacity-medium">
        <Stack direction={{ base: "column", md: "row" }} justify="between" align={{ base: "start", md: "center" }} gap={3} wrap="wrap">
          <Stack direction="row" align="center" gap={3} flex={1} minWidth="min-content">
             <AuthorAvatar src={authorAvatarSrc} name={author} />
             <Stack gap={0.5}>
               <Text variant="mono" size="xs" weight="font-black" tracking="wide">BY {author.toUpperCase()}</Text>
               <Text variant="mono" size="micro" color="dim" weight="font-bold">
                 <Text as="span" color="accent">{category}</Text> <Text as="span" marginX={1.5} color="line" opacityVariant="subtle">•</Text> {date} <Text as="span" marginX={1.5} color="line" opacityVariant="subtle">•</Text> {readTime}
               </Text>
               {onShare && (
                 <Stack as="button" direction="row" align="center" gap={1.5} minHeight={8} onClick={onShare} className={journalVariants.shareAction()}>
                   <Share2 className="w-3.5 h-3.5" />
                   <Text variant="mono" size="micro" weight="font-black" color={isShared ? "accent" : "inherit"}>
                     {isShared ? "COPIED!" : "SHARE"}
                   </Text>
                 </Stack>
               )}
             </Stack>
          </Stack>

          {tags && tags.length > 0 && (
            <Stack direction="row" align="center" gap={1.5} wrap="wrap" className="max-w-full">
              <Text variant="mono" size="micro" color="dim" weight="font-bold" marginRight={1}>TAGS:</Text>
              {tags.map((tag) => (
                <Box
                  key={tag}
                  paddingX={2}
                  paddingY={0.5}
                  display="inline-flex"
                  align="center"
                  justify="center"
                  radius="full"
                  surface="alt"
                  border
                  className="border-line/20 hover:border-accent/40 transition-colors cursor-default"
                >
                  <Text
                    variant="mono"
                    size="micro"
                    color="dim"
                    weight="font-medium"
                    className="whitespace-nowrap"
                  >
                    {tag.toUpperCase()}
                  </Text>
                </Box>
              ))}
            </Stack>
          )}
        </Stack>
      </Box>

      {hero && (
        <Box width="full">
          {hero}
        </Box>
      )}
    </Stack>
  );
}
