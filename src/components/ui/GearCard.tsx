import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';

import { Star, ArrowRight } from 'lucide-react';
import { CategoryPlaceholder } from './CategoryPlaceholder';

interface GearCardProps {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  basePath: string;
  rating?: number;
  verdict?: string;
  image?: string;
}


export function GearCard({
  slug,
  title,
  category,
  excerpt,
  basePath,
  rating,
  verdict,
  image,
  ...rest
}: GearCardProps) {
  // Destructure and ignore known data props that shouldn't bleed to the DOM
  // even if they are passed via {...item} in parent components.
  const {
    // @ts-expect-error - ignoring unused data props
    type: _type, date: _date, author: _author, content: _content,
    tags: _tags, affiliateIds: _affiliateIds,
    priceCategory: _priceCategory, updatedDate: _updatedDate,
    durability: _durability, value: _value, specs: _specs,
    readingTime: _readingTime,
    ...cleanProps
  } = rest as Record<string, unknown>;

  return (
    <Stack
      as={NavLink}
      to={`${basePath}/${slug}`}
      {...cleanProps}
      direction="col"
      gap={3}
      height="full"
      padding={6}
      radius="lg"
      border
      className="group bg-surface transition-all duration-300 hover:bg-surface/80 hover:border-accent/30 hover:-translate-y-0.5"
    >
      {verdict && (
        <Box display="flex" justify="end">
          <Text variant="mono" size="tiny" color="dim">
            {verdict}
          </Text>
        </Box>
      )}

      {/* Image zone */}
      <Box
        position="relative"
        height={48}
        minHeight={48}
        overflow="hidden"
        radius="md"
        className="bg-surface-alt/20"
      >
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <CategoryPlaceholder category={category} />
        )}
        {/* Dark overlay */}
        <Box
          position="absolute"
          inset
          className="bg-black/15 pointer-events-none"
          aria-hidden="true"
        />
        {/* Category badge */}
        <Box
          position="absolute"
          top={3}
          right={3}
          paddingX={2}
          paddingY={1}
          radius="full"
          className="bg-accent/80 text-white backdrop-blur-md shadow-sm"
        >
          <Text variant="mono" size="micro" weight="font-bold" className="uppercase tracking-widest">
            {category}
          </Text>
        </Box>
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

      <Box display="flex" align="center" justify="between" marginTop="auto" paddingTop={3} className="border-t border-line/30">
        {rating !== undefined && (
          <Box display="flex" align="center" gap={1}>
            <Star size={16} className="text-accent fill-accent" />
            <Text variant="mono" size="xs" weight="font-bold">
              {rating.toFixed(1)}/5
            </Text>
          </Box>
        )}
        <Box display="flex" align="center" gap={1}>
          <Text variant="mono" size="tiny" weight="font-bold" color="accent" tracking="widest">
            Read Review
          </Text>
          <ArrowRight className="w-3 h-3 text-accent" />
        </Box>
      </Box>
    </Stack>
  );
}
