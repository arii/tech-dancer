// impeccable-ignore-file
import { NavLink } from 'react-router-dom';
import { Box, Stack, Text, BaseProps } from '@/layouts/Primitives';

import { Star, ArrowRight } from 'lucide-react';
import { CategoryPlaceholder } from './CategoryPlaceholder';

interface GearCardProps extends BaseProps {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  basePath: string;
  rating?: number;
  image?: string;
  // Resource metadata properties that should not be spread to the DOM
  type?: unknown;
  date?: unknown;
  author?: unknown;
  content?: unknown;
  tags?: unknown;
  affiliateIds?: unknown;
  priceCategory?: unknown;
  updatedDate?: unknown;
  durability?: unknown;
  value?: unknown;
  specs?: unknown;
  readingTime?: unknown;
  authorAvatar?: unknown;
  location?: unknown;
  city?: unknown;
  schedule?: unknown;
  description?: unknown;
  link?: unknown;
}

export function GearCard({
  slug,
  title,
  category,
  excerpt,
  basePath,
  rating,
  image,
  // Content metadata props to be ignored
  type: _type,
  date: _date,
  author: _author,
  authorAvatar: _authorAvatar,
  content: _content,
  tags: _tags,
  affiliateIds: _affiliateIds,
  priceCategory: _priceCategory,
  updatedDate: _updatedDate,
  durability: _durability,
  value: _value,
  specs: _specs,
  readingTime: _readingTime,
  location: _location,
  city: _city,
  schedule: _schedule,
  description: _description,
  link: _link,
  variant = "default",
  ...rest
}: GearCardProps & { variant?: "default" | "compact" }) {
  const isCompact = variant === "compact";

  return (
    <Stack
      as="article"
      {...rest}
      direction={isCompact ? "row" : "col"}
      gap={isCompact ? 4 : 3}
      height="full"
      padding={isCompact ? 4 : 6}
      radius={isCompact ? "md" : "lg"}
      border
      className="group relative bg-surface transition-all duration-300 hover:bg-surface/80 hover:border-accent/30 hover:-translate-y-0.5"
    >
      <Box
        as={NavLink}
        to={`${basePath}/${slug}`}
        aria-label={`Read gear review: ${title}`}
        className="absolute inset-0 z-10"
      />

      {/* Image zone */}
      <Box
        position="relative"
        width={isCompact ? 24 : "full"}
        aspect={isCompact ? "square" : "video"}
        shrink={0}
        overflow="hidden"
        radius="md"
        className="bg-surface-alt/20"
      >
        {image ? (
          <img src={image} alt={title} width={isCompact ? 100 : 800} height={isCompact ? 100 : 800} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <CategoryPlaceholder category={category} />
        )}

        {!isCompact && (
          <Box
            position="absolute"
            top={3}
            right={3}
            paddingX={2}
            paddingY={1}
            radius="full"
            opacity={80}
            className="bg-accent text-white backdrop-blur-md shadow-sm"
          >
            <Text variant="mono" size="micro" weight="font-bold" className="uppercase tracking-wide">
              {category}
            </Text>
          </Box>
        )}
      </Box>

      <Stack gap={2} flex={1}>
        {isCompact && (
           <Text variant="mono" size="tiny" color="accent" weight="font-bold" uppercase tracking="widest">
            {category}
          </Text>
        )}
        <Text
          as="h3"
          variant="body"
          size={isCompact ? "sm" : "lg"}
          weight="font-bold"
            color="main"
            leading="tight"
            className="group-hover:text-accent transition-colors line-clamp-2"
        >
          {title}
        </Text>

        {!isCompact && (
          <Text variant="body" size="sm" color="dim" leading="relaxed" className="line-clamp-3">
             {excerpt}
          </Text>
        )}

        {isCompact && (
          <Box display="flex" align="center" gap={1} marginTop="auto">
            <Text variant="mono" size="tiny" weight="font-bold" color="dim" tracking="wide">
              Intelligence
            </Text>
            <ArrowRight className="w-2.5 h-2.5 text-dim" />
          </Box>
        )}
      </Stack>

      {!isCompact && (
        <Box display="flex" align="center" justify="between" marginTop="auto" paddingTop={3} border="t" className="border-line/30">
          {rating !== undefined && (
            <Box display="flex" align="center" gap={1}>
              <Star size={16} className="text-accent fill-accent" />
              <Text variant="mono" size="xs" weight="font-bold">
                {rating.toFixed(1)}/5
              </Text>
            </Box>
          )}
          <Box display="flex" align="center" gap={1}>
            <Text variant="mono" size="sm" weight="font-bold" color="accent" tracking="wide">
              Read review
            </Text>
            <ArrowRight className="w-3 h-3 text-accent" />
          </Box>
        </Box>
      )}
    </Stack>
  );
}
