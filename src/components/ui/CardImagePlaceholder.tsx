import { Box, Text } from '@/layouts/Primitives';
import { CategoryPlaceholder } from '@/components/ui/CategoryPlaceholder';
import { layout } from '@/styles/design-tokens';

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
    <Box aspect="video" maxHeight={layout.cardImage.maxHeight} overflow="hidden" border="b" className="relative w-full bg-bg">
      {image ? (
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      ) : (
        <Box className="w-full h-full flex flex-col">
          <Box height={4} width="full" surface={surfaceVariant} />
          <Box flex={1} display="flex" align="center" justify="center" className="bg-muted/10">
            <CategoryPlaceholder category={category} size="md" />
          </Box>
        </Box>
      )}

      <Box className="absolute top-3 left-3">
        <Box surface={surfaceVariant} paddingX={2} paddingY={0.5} border radius="none" className="border-line/20 backdrop-blur-sm bg-opacity-90">
          <Text variant="mono" size="micro" weight="font-bold" uppercase tracking="wider">
            {category}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
