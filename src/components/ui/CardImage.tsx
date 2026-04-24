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
      position="relative"
      overflow="hidden"
      border="b"
      surface="bg"
      className="border-line group"
      aspect="video"
      maxHeight="160px"
    >
      {image ? (
        <Box width="full" height="full" className="object-cover group-hover:scale-105 transition-transform duration-700">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </Box>
      ) : (
        <CategoryPlaceholder category={category} />
      )}

      {/* Category Badge - Standard for all cards */}
      <Box position="absolute" className="top-4 left-4">
        <Box paddingX={3} paddingY={1} surface="default" opacity={90} border={true} radius="none" className="backdrop-blur-sm">
          <Text variant="mono" size="micro" weight="font-bold" color="brand" uppercase tracking="wider">
            {category}
          </Text>
        </Box>
      </Box>

      {children}
    </Box>
  );
}
