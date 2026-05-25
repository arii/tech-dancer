import { NavLink } from 'react-router-dom';
import { motion } from 'motion/react';
import { Box, Stack, Text, BaseProps } from '@/layouts/Primitives';
import { pickRest } from '@/lib/utils';
import { CONTENT_METADATA_KEYS } from '@/lib/constants';
import { BaseCard } from './BaseCard';

interface ContentCardProps extends BaseProps {
  slug: string;
  title: string;
  category: string;
  excerpt?: string;
  basePath: string;
  date?: string;
  readingTime?: string;
  [key: string]: unknown;
}

export function ContentCard(props: ContentCardProps) {
  const {
    slug,
    title,
    category,
    excerpt,
    basePath,
    date,
    readingTime,
  } = props;

  const rest = pickRest(props, [
    ...CONTENT_METADATA_KEYS,
    'readingTime',
    'basePath',
    'slug',
    'title',
    'category',
    'excerpt',
    'date'
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
      as={motion.create("article")}
      direction="col"
      gap={4}
      hoverable
      {...rest}
    >
      <NavLink
        to={`${basePath}/${slug}`}
        className="absolute inset-0 z-10"
        aria-label={`Read article: ${title}`}
      />
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
          Read article
        </Text>
      </Box>
    </BaseCard>
  );
}
