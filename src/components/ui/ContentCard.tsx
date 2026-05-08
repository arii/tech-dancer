import { NavLink } from 'react-router-dom';
import { motion, HTMLMotionProps } from 'motion/react';
import { Box, Stack, Text, BaseProps } from '@/layouts/Primitives';
import { filterDataProps } from '@/lib/utils';

interface ContentCardProps extends BaseProps, Partial<HTMLMotionProps<"a">> {
  slug: string;
  title: string;
  category: string;
  excerpt?: string;
  basePath: string;
  date?: string;
  readingTime?: string;
}

export function ContentCard({ 
  slug, 
  title, 
  category, 
  excerpt, 
  basePath, 
  date,
  readingTime,
  ...motionProps 
}: ContentCardProps) {
  const cleanMotionProps = filterDataProps(motionProps as Record<string, unknown>);

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
      gap={4}
      height="full"
      padding={6}
      radius="lg"
      border
      className="group relative bg-surface hover:border-accent/40 transition-all duration-300 hover:-translate-y-0.5"
      {...cleanMotionProps}
    >
      <Box
        as={NavLink}
        to={`${basePath}/${slug}`}
        aria-label={`Read article: ${title}`}
        className="absolute inset-0 z-10"
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
          className="text-text-main leading-tight group-hover:text-accent transition-colors line-clamp-2"
        >
          {title}
        </Text>

        <Text variant="body" size="sm" color="dim" className="line-clamp-3 leading-relaxed text-text-body">
           {excerpt}
        </Text>
      </Stack>

      <Box display="flex" align="center" justify="between" marginTop="auto">
        <Text variant="mono" size="xs" color="dim">
          {[date, readingTime].filter(Boolean).join(' • ') || category}
        </Text>
        <Text variant="mono" size="sm" weight="font-bold" color="accent" tracking="wide">
          Read article
        </Text>
      </Box>
    </Stack>
  );
}
