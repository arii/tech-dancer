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
  else if (norm.includes('lifestyle') || norm.includes('white')) surfaceVariant = 'danger';

  return (
    <Box
      shrink={false}
      aspect="video"
      maxHeight="cardImage"
      width="full"
      className="relative overflow-hidden border-b border-line bg-[#05050d]"
    >
      {image ? (
        <img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      ) : (
        <Stack
          height="full"
          width="full"
          gap={0}
          className="bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,.06),transparent_42%),linear-gradient(180deg,rgba(255,255,255,.03),rgba(255,255,255,0))]"
        >
          <Box height={2} width="full" surface={surfaceVariant} className="opacity-90" />
          <Box flex={1} display="flex" align="center" justify="center" className="bg-transparent">
            <CategoryPlaceholder category={category} size="lg" className="opacity-90 scale-105" />
          </Box>
        </Stack>
      )}
      <Box className="absolute top-4 left-4">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#090914]/92 backdrop-blur-md border border-line/80 rounded-full shadow-[0_0_16px_rgba(0,229,255,.12)]">
          {(() => {
            const icon = getCategoryIcon(category);
            return React.createElement(icon, { className: "w-3.5 h-3.5 text-accent", strokeWidth: 2.5 });
          })()}
          <Text variant="mono" size="micro" weight="font-bold" uppercase tracking="wider" className="text-white">
            {category}
          </Text>
        </div>
      </Box>
    </Box>
  );
}
