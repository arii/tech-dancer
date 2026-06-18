// impeccable-ignore-file
import { motion, HTMLMotionProps } from 'motion/react';
import { Box, Stack, Text, BaseProps } from '@/layouts/Primitives';
import { BaseCard } from './BaseCard';
import { cn, pickRest } from '@/lib/utils';
import { CONTENT_METADATA_KEYS } from '@/lib/constants';

type CategoryKey = 'travel' | 'gear' | 'guide' | 'event' | 'lifestyle' | 'dance' | 'tech';

interface ContentCardProps extends BaseProps, Partial<HTMLMotionProps<"a">> {
  slug: string;
  title: string;
  category: string;
  excerpt?: string;
  basePath: string;
  date?: string;
  readingTime?: string;
  image?: string;
  imageAlt?: string;
  /** Optional additional class names for the container */
  className?: string;
  [key: string]: unknown;
}

const MotionArticle = motion.article;

/**
 * Standardized content card for blog posts and research items.
 *
 * WHY:
 * Ensures visual consistency across all content grids while
 * providing clear category differentiation and meta-information.
 */
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
    imageAlt,
    className
  } = props;

  const motionProps = pickRest(props, [
    ...CONTENT_METADATA_KEYS,
    'readingTime',
    'basePath',
    'className'
  ] as (keyof ContentCardProps)[]);

  const categoryMap: Record<CategoryKey, string> = {
    travel: 'bg-brand-purple/20 text-brand-purple border-brand-purple/30',
    gear: 'bg-brand-amber/20 text-brand-amber border-brand-amber/30',
    guide: 'bg-brand-green/20 text-brand-green border-brand-green/30',
    event: 'bg-brand-cyan/20 text-brand-cyan border-brand-cyan/30',
    lifestyle: 'bg-brand-magenta/20 text-brand-magenta border-brand-magenta/30',
    dance: 'bg-brand-purple/20 text-brand-purple border-brand-purple/30',
    tech: 'bg-accent/20 text-accent border-accent/30',
  };

  const getTagColorClass = (cat: string) => {
    const c = cat.toLowerCase();
    for (const key of Object.keys(categoryMap) as CategoryKey[]) {
      if (c.includes(key)) return categoryMap[key];
    }
    return 'bg-accent/20 text-accent border-accent/30';
  };

  return (
    <BaseCard
      as={MotionArticle}
      direction="col"
      height="full"
      to={`${basePath}/${slug}`}
      ariaLabel={`Read ${category} article: ${title}`}
      className={cn(
        "overflow-hidden group transition-all duration-300",
        "hover:shadow-glow hover:-translate-y-1 hover:border-accent/40",
        className
      )}
      {...motionProps}
    >
      <Box width="full" aspect="video" surface="muted" border="b" borderColor="line" overflow="hidden" position="relative">
        {image ? (
          <img
            src={image}
            alt={imageAlt || title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/placeholder-16-9.webp';
            }}
          />
        ) : (
          <Box width="full" height="full" display="flex" align="center" justify="center">
            <Text variant="mono" size="xs" color="dim">NO IMAGE</Text>
          </Box>
        )}
        <Box
          position="absolute"
          top={3}
          left={3}
          paddingX={2}
          paddingY={0.5}
          radius="sm"
          border
          className={cn("backdrop-blur-md uppercase tracking-widest font-black text-[10px]", getTagColorClass(category))}
        >
          {category}
        </Box>
      </Box>

      <Stack gap={4} padding={5} height="full">
        <Stack gap={2}>
          <Text
            as="h3"
            variant="display"
            size="xl"
            weight="font-black"
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

        <Box display="flex" align="center" justify="between" marginTop="auto" paddingTop={4} border="t" borderColor="line/10">
          <Stack gap={1}>
            <Text variant="mono" size="micro" color="dim" uppercase tracking="tighter">
              {category}
            </Text>
            <Text variant="mono" size="micro" color="dim" opacityVariant="muted" data-testid="content-date">
              {[date, readingTime].filter(Boolean).join(' • ')}
            </Text>
          </Stack>
          <Box className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Text variant="mono" size="micro" weight="font-bold" color="accent" tracking="widest" uppercase>
              View →
            </Text>
          </Box>
        </Box>
      </Stack>
    </BaseCard>
  );
}
