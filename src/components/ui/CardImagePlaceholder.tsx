import { Box, Text, Stack } from '@/layouts/Primitives';
import { CategoryPlaceholder } from '@/components/ui/CategoryPlaceholder';

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
    <Box shrink={false} aspect="video" maxHeight="cardImage" width="full" className="relative overflow-hidden border-b border-line bg-bg">
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
          <Box flex={1} display="flex" align="center" justify="center" surface="muted" opacity={10}>
            <CategoryPlaceholder category={category} size="md" />
          </Box>
        </Stack>
      )}
      <Box className="absolute top-4 left-4">
        <Box paddingX={3} paddingY={1} className="bg-surface/90 backdrop-blur-sm border border-line rounded-sm">
          <Text variant="mono" size="micro" weight="font-bold" uppercase tracking="wider" className="text-accent-navy">
            {category}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
