import { NavLink } from 'react-router-dom';
import { Box, Stack, Text, BoxProps } from '@/layouts/Primitives';

import { Star, ArrowRight } from 'lucide-react';
import { CategoryPlaceholder } from './CategoryPlaceholder';

interface GearCardProps extends BoxProps {
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
  // Filter out resource-specific data props to prevent them from bleeding into the DOM.
  // We use a dedicated object to collect valid motion and layout props.
  const cleanProps = { ...rest } as Record<string, unknown>;

  const slop = [
    'type', 'date', 'author', 'content', 'tags', 'affiliateIds',
    'priceCategory', 'updatedDate', 'durability', 'value', 'specs', 'readingTime'
  ];

  slop.forEach(prop => delete cleanProps[prop]);

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
