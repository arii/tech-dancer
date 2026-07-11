// impeccable-ignore-file
import { NavLink } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { readingTime } from '@/lib/content';
import { CategoryPlaceholder } from '@/components/ui/CategoryPlaceholder';
import { pickRest } from '@/lib/utils';
import { CONTENT_METADATA_KEYS } from '@/lib/constants';
import { affiliateManager } from '@/lib/affiliateManager';

interface ListRowProps {
  slug: string;
  title: string;
  category: string;
  excerpt?: string;
  date?: string;
  basePath: string;
  content?: string;
  image?: string;
  affiliateIds?: string[];
  [key: string]: unknown;
}

export function ListRow(props: ListRowProps) {
  const {
    slug,
    title,
    category,
    excerpt,
    date,
    basePath,
    content,
    image: propsImage,
    affiliateIds,
  } = props;

  const rest = pickRest(props, [
    ...CONTENT_METADATA_KEYS,
    'basePath'
  ] as (keyof ListRowProps)[]);
  const rt = readingTime(content, excerpt);

  const affiliate = affiliateManager.getLink(affiliateIds?.[0]);
  const rawImage = propsImage || affiliate?.image;
  const image = rawImage && rawImage.startsWith('/') && !rawImage.startsWith(import.meta.env.BASE_URL)
    ? `${import.meta.env.BASE_URL.replace(/\/$/, '')}${rawImage}`
    : rawImage;

  return (
    <Box as={NavLink} to={`${basePath}/${slug}`}
      {...rest}
      display="flex" align="center" border="b"
      className="group hover:bg-surface/50 transition-colors"
    >
      <Box width={1} shrink={0} self="stretch" opacityVariant="none" className="bg-accent group-hover:opacity-full transition-opacity" />
      <Box
        width={16}
        height={16}
        margin={4}
        shrink={0}
        radius="sm"
        overflow="hidden"
        display="flex"
        align="center"
        justify="center"
        border
        className="bg-white border-line/30"
      >
        {image ? (
          <img
            src={image}
            alt=""
            loading="lazy"
            className="h-full w-full object-contain p-1"
          />
        ) : (
          <CategoryPlaceholder category={category} size="md" />
        )}
      </Box>
      <Stack gap={1} flex paddingY={3} className="min-w-0">
        <Box display="flex" align="center" gap={3}>
          <Text variant="mono" size="micro" color="brand" className="uppercase shrink-0">{category}</Text>
          <Text variant="mono" size="micro" color="dim">{date}</Text>
        </Box>
        <Text variant="display" size="sm" weight="font-bold" className="line-clamp-1">{title}</Text>
        <Text variant="body" size="xs" color="dim" className="truncate">{excerpt}</Text>
      </Stack>
      <Box display="flex" align="center" gap={3} padding={4} shrink={0}>
        <Text variant="mono" size="micro" color="dim">{rt} min</Text>
        <ChevronRight className="w-3.5 h-3.5 opacity-medium group-hover:opacity-full transition-opacity text-text-dim" />
      </Box>
    </Box>
  );
}
