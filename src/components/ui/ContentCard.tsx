import { motion, HTMLMotionProps } from 'motion/react';
import { Box, Stack, Text, BaseProps } from '@/layouts/Primitives';
import { BaseCard } from './BaseCard';
import { pickRest } from '@/lib/utils';
import { CONTENT_METADATA_KEYS } from '@/lib/constants';

export interface ContentCardProps extends BaseProps, Partial<HTMLMotionProps<"a">> {
  slug: string;
  title: string;
  category: string;
  excerpt?: string;
  basePath: string;
  date?: string;
  readingTime?: string;
  image?: string;
  imageAlt?: string;
  compact?: boolean;
  [key: string]: unknown;
}

const MotionArticle = motion.article;

export const ContentCard = (props: ContentCardProps) => {
  const {
    slug,
    title,
    category,
    excerpt,
    basePath,
    date,
    readingTime,
    image,
    imageAlt,
    compact = false,
  } = props;

  const motionProps = pickRest(props, [
    ...CONTENT_METADATA_KEYS,
    'readingTime',
    'basePath'
  ] as (keyof ContentCardProps)[]);

  const getTagColorClass = (cat: string) => {
    const c = cat.toLowerCase();
    if (c.includes('travel')) return 'text-accent-purple';
    if (c.includes('tech')) return 'text-accent';
    if (c.includes('data') || c.includes('research')) return 'text-accent-magenta';
    return 'text-accent';
  };

  return (
    <BaseCard
      as={MotionArticle}
      direction="col"
      height="full"
      to={`${basePath}/${slug}`}
      aria-label={`Read article: ${title}`}
      overflow="hidden"
      {...motionProps}
    >
      {!compact && image && (
        <Box width="full" aspect="video" surface="alt" border="b" overflow="hidden">
          <Box
            as="img"
            width="full"
            height="full"
            src={image}
            alt={imageAlt || title}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Box>
      )}

      <Stack gap={compact ? 2 : 4} padding={compact ? 4 : 6} height="full">
        <Box
          paddingX={2}
          paddingY={compact ? 0.5 : 1}
          radius="full"
          border
          className="border-line w-fit"
        >
          <Text
            variant="mono"
            size={compact ? "micro" : "xs"}
            weight="font-black"
            tracking="wide"
            className={getTagColorClass(category)}
          >
            {category}
          </Text>
        </Box>

        <Stack gap={compact ? 1 : 2}>
          <Text
            as="h2"
            variant="body"
            size={compact ? "base" : "lg"}
            weight="font-bold"
            color="main"
            leading="tight"
            className="group-hover:text-accent transition-colors line-clamp-2"
          >
            {title}
          </Text>

          <Text variant="body" size="sm" color="dim" leading="relaxed" className={compact ? "line-clamp-2" : "line-clamp-3"} maxWidth="prose">
            {excerpt}
          </Text>
        </Stack>

        <Box display="flex" align="center" justify="between" marginTop="auto" paddingTop={compact ? 1 : 0}>
          <Text variant="mono" size="xs" color="dim" data-testid="content-date">
            {[date, readingTime].filter(Boolean).join(' • ') || category}
          </Text>
          <Text variant="mono" size={compact ? "xs" : "sm"} weight="font-bold" color="accent" tracking="wide">
            {compact ? "Read" : "Read article"}
          </Text>
        </Box>
      </Stack>
    </BaseCard>
  );
};
