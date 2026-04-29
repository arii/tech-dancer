import { Box, Text } from '@/layouts/Primitives';
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
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      ) : (
        <Box className="w-full h-full flex flex-col">
          <Box className="h-4 w-full" surface={surfaceVariant} />
          <Box className="flex-1 flex items-center justify-center bg-muted/10">
            <CategoryPlaceholder category={category} size="md" />
          </Box>
        </Box>
      )}
      <Box className="absolute top-4 left-4">
        <Box className="px-3 py-1 bg-surface/90 backdrop-blur-sm border border-line rounded-sm">
          <Text variant="mono" size="micro" weight="font-bold" uppercase tracking="wider" className="text-accent-navy">
            {category}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
