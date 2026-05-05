import React from 'react';
import { Box, Text, Stack } from '@/layouts/Primitives';
import { CategoryPlaceholder, getCategoryIcon } from '@/components/ui/CategoryPlaceholder';

interface CardImagePlaceholderProps {
  image?: string;
  category: string;
  date?: string;
  title: string;
}

export function CardImagePlaceholder({ image, category, title }: CardImagePlaceholderProps) {
  const norm = (category || '').toLowerCase();

  let surfaceVariant: "brand" | "accent" | "warning" | "danger" | "muted" = 'muted';
  if (norm.includes('tech')) surfaceVariant = 'brand';
  else if (norm.includes('travel') || norm.includes('wcs')) surfaceVariant = 'accent';
  else if (norm.includes('gear')) surfaceVariant = 'warning';
  else if (norm.includes('lifestyle')) surfaceVariant = 'danger';

  return (
    <Box shrink={false} aspect="video" maxHeight="cardImage" width="full" border="b" position="relative" overflow="hidden" className="bg-bg">
      {image ? (
        <img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      ) : (
        <Stack height="full" width="full" gap={0}>
          <Box height={4} width="full" surface={surfaceVariant} />
          <Box flex={1} display="flex" align="center" justify="center" className="bg-muted/5">
            <CategoryPlaceholder category={category} size="lg" />
          </Box>
        </Stack>
      )}
      <Box position="absolute" className="top-4 left-4">
        <Box border display="flex" align="center" gap={2} paddingX={3} paddingY={1} radius="sm" shadow="sm" className="bg-surface/95 backdrop-blur-md">
          {(() => {
            const icon = getCategoryIcon(category);
            return React.createElement(icon, { className: "w-3.5 h-3.5 text-accent", strokeWidth: 2.5 });
          })()}
          <Text variant="mono" size="micro" weight="font-bold" uppercase tracking="wider" color="brand">
            {category}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
