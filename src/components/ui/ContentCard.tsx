import { NavLink } from 'react-router-dom';
import { motion, HTMLMotionProps } from 'motion/react';
import { MapPin } from 'lucide-react';
import { Box, Stack, Text, BaseProps } from '@/layouts/Primitives';

interface ContentCardProps extends BaseProps, Partial<HTMLMotionProps<"a">> {
  slug?: string;
  title: string;
  category?: string;
  excerpt?: string;
  basePath?: string;
  date?: string;
  readingTime?: string;
  variant?: 'default' | 'event';
  location?: string;
  schedule?: string;
  onClick?: () => void;
  // Resource metadata properties that should not be spread to the DOM
  type?: unknown;
  author?: unknown;
  authorAvatar?: unknown;
  content?: unknown;
  image?: unknown;
  tags?: unknown;
  affiliateIds?: unknown;
  rating?: unknown;
  verdict?: unknown;
  priceCategory?: unknown;
  updatedDate?: unknown;
  durability?: unknown;
  value?: unknown;
  specs?: unknown;
  city?: unknown;
  description?: unknown;
  link?: unknown;
}

export function ContentCard({ 
  slug, 
  title, 
  category, 
  excerpt, 
  basePath, 
  date,
  readingTime,
  variant = 'default',
  location,
  schedule,
  onClick,
  // Metadata props to be ignored
  type: _type,
  author: _author,
  authorAvatar: _authorAvatar,
  content: _content,
  image: _image,
  tags: _tags,
  affiliateIds: _affiliateIds,
  rating: _rating,
  verdict: _verdict,
  priceCategory: _priceCategory,
  updatedDate: _updatedDate,
  durability: _durability,
  value: _value,
  specs: _specs,
  city: _city,
  description: _description,
  link: _link,
  ...motionProps 
}: ContentCardProps) {

  const getTagColorClass = (cat?: string) => {
    if (!cat) return 'text-accent';
    const c = cat.toLowerCase();
    if (c.includes('travel')) return 'text-accent-purple';
    if (c.includes('tech')) return 'text-accent';
    if (c.includes('data') || c.includes('research')) return 'text-accent-magenta';
    return 'text-accent';
  };

  if (variant === 'event') {
    return (
      <Stack
        as={onClick ? "button" : motion.create("article")}
        type={onClick ? "button" : undefined}
        onClick={onClick}
        direction="col"
        gap={4}
        height="full"
        padding={8}
        radius="md"
        border
        textAlign="left"
        cursor={onClick ? "pointer" : "default"}
        className="group relative bg-surface hover:border-accent/40 transition-all duration-300 hover:-translate-y-0.5"
        {...(motionProps as any)}
      >
        {!onClick && slug && basePath && (
          <Box
            as={NavLink}
            to={`${basePath}/${slug}`}
            aria-label={`View event: ${title}`}
            className="absolute inset-0 z-10"
          />
        )}

        <Box display="flex" align="center" gap={2}>
          <MapPin className="w-4 h-4 text-accent" />
          <Text variant="mono" size="micro" weight="font-bold" color="accent" uppercase tracking="widest">
            {schedule}
          </Text>
        </Box>

        <Stack gap={1}>
          <Text
            variant="body"
            size="lg"
            weight="font-bold"
            color="main"
            leading="tight"
            className="group-hover:text-accent transition-colors"
          >
            {title}
          </Text>
          <Text size="sm" color="dim">
            {location}
          </Text>
        </Stack>
      </Stack>
    );
  }

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
      {...motionProps}
    >
      {slug && basePath && (
        <Box
          as={NavLink}
          to={`${basePath}/${slug}`}
          aria-label={`Read article: ${title}`}
          className="absolute inset-0 z-10"
        />
      )}

      {category && (
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
      )}

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

        <Text variant="body" size="sm" color="dim" leading="relaxed" className="line-clamp-3">
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
    </Stack>
  );
}
