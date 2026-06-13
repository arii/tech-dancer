import { motion, HTMLMotionProps } from 'motion/react';
import { Box, Stack, Text, BaseProps } from '@/layouts/Primitives';
import { BaseCard } from './BaseCard';
import { pickRest } from '@/lib/utils';
import { CONTENT_METADATA_KEYS } from '@/lib/constants';

interface ContentCardProps extends BaseProps, Partial<HTMLMotionProps<"a">> {
  slug: string;
  title: string;
  category: string;
  excerpt?: string;
  basePath: string;
  date?: string;
  readingTime?: string;
  [key: string]: unknown;
}

const MotionArticle = motion.article;

export function ContentCard(props: ContentCardProps) {
  const {
    slug,
    title,
    category,
    excerpt,
    basePath,
    date,
    readingTime,
    image,
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
    if (c.includes('data') || c.includes('research')) return 'text-accent-teal';
    return 'text-accent';
  };

  return (
    <BaseCard
      as={MotionArticle}
      direction="col"
      gap={0}
      height="full"
      padding={0}
      to={`${basePath}/${slug}`}
      ariaLabel={`Read article: ${title}`}
      {...motionProps}
    >
      {image ? (
        <Box
          aspect="video"
          width="full"
          overflow="hidden"
          className="bg-surface-alt"
        >
          <Box
            as="img"
            src={image}
            alt=""
            width="full"
            height="full"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Box>
      ) : (
        <Box aspect="video" width="full" className="bg-gradient-to-br from-surface-alt to-bg" />
      )}

      <Stack gap={4} padding={6} flex={1}>
      <Box
        paddingX={2}
        paddingY={1}
        radius="full"
        border
        className="border-line w-fit"
      >
        <Text
          variant="mono"
          size="xs"
          weight="font-black"
          tracking="wide"
          className={getTagColorClass(category)}
        >
          {category}
        </Text>
      </Box>

      <Stack gap={2}>
        <Text
          as="h3"
          variant="body"
          size="lg"
          weight="font-bold"
            color="main"
            leading="tight"
            className="group-hover:text-accent transition-colors line-clamp-2"
        >
          {title}
        </Text>

        <Text variant="body" size="sm" color="dim" leading="relaxed" className="line-clamp-3" maxWidth="prose">
           {excerpt}
        </Text>
      </Stack>

      <Box display="flex" align="center" justify="between" marginTop="auto">
        <Text variant="mono" size="xs" color="dim" data-testid="content-date">
          {[date, readingTime].filter(Boolean).join(' • ') || category}
        </Text>
        <Text variant="mono" size="sm" weight="font-bold" color="accent" tracking="wide">
          Read →
        </Text>
      </Box>
      </Stack>
    </BaseCard>
  );
}
