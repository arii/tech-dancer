import { NavLink } from 'react-router-dom';
import { motion, HTMLMotionProps } from 'motion/react';
import { Box, Stack, Text, BaseProps } from '@/layouts/Primitives';
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
  ctaText?: string;
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
    ctaText = "Read article",
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
    <Stack
      as={motion.create("article")}
      direction="col"
      gap={{ base: 3, md: 4 }}
      height="full"
      padding={{ base: 4, md: 6 }}
      radius="lg"
      border
      className="group relative bg-surface hover:border-accent/40 transition-all duration-300 hover:-translate-y-0.5"
      {...motionProps}
    >
      <Box
        paddingX={2}
        paddingY={1}
        radius="full"
        border
        className="border-line w-fit relative z-20"
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
          size={{ base: "md", md: "lg" }}
          weight="font-bold"
          color="main"
          leading="tight"
          className="group-hover:text-accent transition-colors line-clamp-2"
        >
          <NavLink
            to={`${basePath}/${slug}`}
            className="focus:outline-none after:absolute after:inset-0 after:z-10"
          >
            {title}
          </NavLink>
        </Text>

        <Text
          variant="body"
          size="sm"
          color="dim"
          leading="relaxed"
          className="line-clamp-3 max-w-[65ch]"
        >
           {excerpt}
        </Text>
      </Stack>

      <Box display="flex" align="center" justify="between" marginTop="auto" gap={2}>
        <Text variant="mono" size="micro" color="dim" data-testid="content-date" className="uppercase tracking-wider">
          {[date, readingTime].filter(Boolean).join(' • ') || category}
        </Text>
        <Text
          variant="mono"
          size="sm"
          weight="font-bold"
          color="accent"
          tracking="wide"
          className="relative z-20 pointer-events-none"
        >
          {ctaText}
        </Text>
      </Box>
    </Stack>
  );
}
