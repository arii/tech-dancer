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
}

export function ContentCard({ 
  slug, 
  title, 
  category, 
  excerpt, 
  basePath, 
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
      as={motion.create(NavLink)}
      to={`${basePath}/${slug}`}
      direction="col"
      gap={4}
      height="full"
      padding={6}
      radius="lg"
      border
      className="group bg-surface hover:border-accent/40 transition-all duration-300 hover:-translate-y-0.5"
      {...cleanMotionProps}
    >
      <Box
        paddingX={2}
        paddingY={1}
        radius="full"
        border
        className="border-line w-fit"
      >
        <Text
          variant="mono"
          size="tiny"
          weight="font-black"
          tracking="widest"
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

        <Text variant="body" size="sm" color="dim" className="line-clamp-3 leading-relaxed">
           {excerpt}
        </Text>
      </Stack>

      <Box display="flex" align="center" marginTop="auto">
        <Text variant="mono" size="tiny" weight="font-bold" color="accent" tracking="widest">
          Read Article
        </Text>
      </Box>
    </Stack>
  );
}
