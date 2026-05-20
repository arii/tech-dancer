import { NavLink } from 'react-router-dom';
import { motion, HTMLMotionProps } from 'motion/react';
import { Box, Stack, Text, BaseProps } from '@/layouts/Primitives';
import { getContentCardCtaText } from '@/components/ui/contentCardText';

function getTagColorClass(category: string): string {
  const normalizedCategory = category.toLowerCase();
  if (normalizedCategory.includes('travel')) return 'text-accent-purple';
  if (normalizedCategory.includes('tech')) return 'text-accent';
  if (normalizedCategory.includes('data') || normalizedCategory.includes('research')) return 'text-accent-magenta';
  return 'text-accent';
}

interface ContentCardProps extends BaseProps, Partial<HTMLMotionProps<"a">> {
  slug: string;
  title: string;
  category: string;
  excerpt?: string;
  basePath: string;
  date?: string;
  readingTime?: string;
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
  location?: unknown;
  city?: unknown;
  schedule?: unknown;
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
  location: _location,
  city: _city,
  schedule: _schedule,
  description: _description,
  link: _link,
  ...motionProps 
}: ContentCardProps) {
  const ctaText = getContentCardCtaText(basePath);
  const cardMeta = [date, readingTime].filter(Boolean).join(' • ') || category;

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
      <NavLink
        to={`${basePath}/${slug}`}
        aria-label={`${ctaText}: ${title}`}
        className="focus-visible:outline-none"
      >
        <Stack direction="col" gap={4} height="full">
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

          <Stack gap={3}>
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
              {cardMeta}
            </Text>
            <Text variant="mono" size="sm" weight="font-bold" color="accent" tracking="wide">
              {ctaText}
            </Text>
          </Box>
        </Stack>
      </NavLink>
    </Stack>
  );
}
