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
    <Stack gap={8}>
      <Stack gap={4}>
        <Text
          as="h1"
          variant="h1"
          weight="font-black"
          leading="none"
          tracking="tighter"
          className="break-words"
          style={
            {
              fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
              textWrap: "balance"
            } as React.CSSProperties
          }
        >
          {title}
        </Text>

        {dek && (
          <Text variant="body" size={{ base: "xl", md: "2xl" }} color="dim" leading="relaxed" opacityVariant="solid" className="text-pretty font-medium">
            {dek}
          </Text>
        )}
      </Stack>

      <Stack direction={{ base: "column", sm: "row" }} justify="between" align={{ base: "start", sm: "center" }} gap={6} border="y" borderColor="line" paddingY={8} className="border-opacity-medium">
        <Stack direction="row" align="center" gap={4} flex={1}>
           <AuthorAvatar src={authorAvatarSrc} name={author} />
           <Stack gap={1}>
             <Text variant="mono" size="xs" weight="font-black" tracking="wide"  >BY {author.toUpperCase()}</Text>
             <Text variant="mono" size="micro" color="dim" weight="font-bold">
               <Text as="span" color="accent">{category}</Text> <Text as="span" marginX={1.5} color="line" opacityVariant="subtle">•</Text> {date} <Text as="span" marginX={1.5} color="line" opacityVariant="subtle">•</Text> {readTime}
             </Text>
             {onShare && (
               <Stack as="button" direction="row" align="center" gap={1.5} minHeight={11} onClick={onShare} className={journalVariants.shareAction()}>
                 <Share2 className="w-3.5 h-3.5" />
                 <Text variant="mono" size="micro" weight="font-black" color={isShared ? "accent" : "inherit"}>
                   {isShared ? "COPIED!" : "SHARE"}
                 </Text>
               </Stack>
             )}
           </Stack>
        </Stack>

        {tags && tags.length > 0 && (
          <Stack direction="row" align="center" gap={3} wrap>
            <Text variant="mono" size="micro" color="dim" weight="font-bold" marginRight={1}>TAGS:</Text>
            {tags.map((tag) => (
              <Box
                key={tag}
                paddingX={2.5}
                paddingY={1}
                minHeight={11}
                minWidth={11}
                display="flex"
                align="center"
                justify="center"
                radius="sm"
                surface="muted"
                border
                className="border-line/30 hover:border-accent transition-colors cursor-default"
              >
                <Text
                  variant="mono"
                  size="micro"
                  color="dim"
                  weight="font-semibold"
                >
                  {tag.toUpperCase()}
                </Text>
              </Box>
            ))}
          </Stack>
        )}
      </Stack>

      {hero && (
        <Box width="full">
          {hero}
        </Box>
      )}
    </Stack>
  );
}
