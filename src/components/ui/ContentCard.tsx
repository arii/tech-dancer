import { NavLink } from 'react-router-dom';
import { motion, HTMLMotionProps } from 'motion/react';
import { Box, Stack, Text } from '@/layouts/Primitives';

interface ContentCardProps extends Partial<HTMLMotionProps<"a">> {
  slug: string;
  title: string;
  category: string;
  excerpt?: string;
  date?: string;
  image?: string;
  basePath: string;
  content?: string;
  compact?: boolean;
}

export function ContentCard({ 
  slug, 
  title, 
  category, 
  excerpt, 
  date, 
  image: _image, 
  basePath, 
  content: _content, 
  compact = false,
  ...motionProps 
}: ContentCardProps) {
  if (compact) {
    return (
      <Box
        as={motion.create(NavLink)}
        to={`${basePath}/${slug}`}
        className="group flex flex-col gap-3 rounded-lg px-3 py-5 transition-colors hover:bg-muted/20 sm:-mx-2 sm:flex-row sm:items-start sm:gap-4 sm:px-5 sm:py-6"
        {...motionProps}
      >
        <Box className="flex shrink-0 flex-wrap items-center gap-2 pt-0.5 sm:w-44 sm:gap-3">
          <span className="rounded border border-line px-2 py-0.5 text-xs font-bold text-text-dim/70">
            {category}
          </span>
          <Text variant="mono" size="xs" className="whitespace-nowrap text-text-dim/70">{date}</Text>
        </Box>
        <Box>
          <Text as="h3" size="base" weight="font-bold" className="mb-1 transition-colors group-hover:text-primary leading-snug">
            {title}
          </Text>
          <Text size="sm" className="leading-7 text-text-body/72 line-clamp-2">
            {excerpt}
          </Text>
        </Box>
      </Box>
    );
  }

  return (
    <Stack
      as={motion.create(NavLink)}
      to={`${basePath}/${slug}`}
      direction="col"
      gap={4}
      height="full"
      padding={5}
      radius="2xl"
      border
      className="border-line/80 bg-surface/90 shadow-sm transition-colors hover:border-primary/30 group"
      {...motionProps}
    >
      <Box display="flex" align="center" justify="between" gap={3}>
        <span className="inline-flex rounded-full border border-line px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-text-dim/70">
          {category}
        </span>
        <Text variant="mono" size="micro" className="text-text-dim/70">{date}</Text>
      </Box>
      
      <Text as="h2" size="lg" weight="font-black" className="leading-snug group-hover:text-primary transition-colors line-clamp-2">
        {title}
      </Text>
      
      <Text size="sm" className="leading-7 text-text-body/72 line-clamp-3">
        {excerpt}
      </Text>

      <Box display="flex" align="center" gap={2} marginTop="auto">
        <Text weight="font-bold" size="xs" className="uppercase tracking-[0.25em] text-secondary">
          Read Article
        </Text>
        <Text size="micro" className="text-secondary ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
          →
        </Text>
      </Box>
    </Stack>
  );
}
