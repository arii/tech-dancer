import { Box, Text } from '@/layouts/Primitives';
import { CategoryPlaceholder } from '@/components/ui/CategoryPlaceholder';

interface CardImageProps {
  image?: string;
  title: string;
  category: string;
  children?: React.ReactNode;
}

export function CardImage({ image, title, category, children }: CardImageProps) {
  return (
    <Box
      className="relative overflow-hidden border-b border-line bg-bg"
      style={{ aspectRatio: '16/9', maxHeight: '160px' }}
    >
      {image ? (
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      ) : (
        <CategoryPlaceholder category={category} />
      )}

      {/* Category Badge - Standard for all cards */}
      <Box className="absolute top-4 left-4">
        <Box className="px-3 py-1 bg-surface/90 backdrop-blur-sm border border-line rounded-none">
          <Text variant="mono" size="micro" weight="font-bold" className="text-accent-navy uppercase tracking-wider">
            {category}
          </Text>
        </Box>
      </Box>

      {children}
    </Box>
  );
}
