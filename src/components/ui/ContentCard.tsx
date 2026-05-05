import { NavLink } from 'react-router-dom';
import { motion, HTMLMotionProps } from 'motion/react';
import { Box, Stack, Text } from '@/layouts/Primitives';

interface ContentCardProps extends Partial<HTMLMotionProps<"a">> {
  slug: string;
  title: string;
  category: string;
  excerpt?: string;
  basePath: string;
  // Accept and ignore data props that might be spread into the component
  type?: string;
  date?: string;
  author?: string;
  authorAvatar?: string;
  content?: string;
  image?: string;
  tags?: string[];
  affiliateIds?: string[];
}

export function ContentCard({ 
  slug, 
  title, 
  category, 
  excerpt, 
  basePath, 
  // Ignore data props to keep them out of the DOM
  type: _type,
  date: _date,
  author: _author,
  authorAvatar: _authorAvatar,
  content: _content,
  image: _image,
  tags: _tags,
  affiliateIds: _affiliateIds,
  ...cleanMotionProps
}: ContentCardProps) {

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
      className="group"
      {...cleanMotionProps}
    >
      <Text
        variant="mono"
        size="tiny"
        weight="font-black"
        uppercase
        tracking="widest"
        className={getTagColorClass(category)}
      >
        {category}
      </Text>

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
        <Text variant="mono" size="tiny" weight="font-bold" color="accent" tracking="widest" uppercase>
          Read Article
        </Text>
      </Box>
    </Stack>
  );
}
