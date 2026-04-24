import { Box, Text } from '@/layouts/Primitives';
import { CategoryPlaceholder } from '@/components/ui/CategoryPlaceholder';

interface CardImageProps {
  image?: string;
  title: string;
  category: string;
  aspect?: "square" | "video";
  children?: React.ReactNode;
}

export function CardImage({ image, title, category, aspect = "video", children }: CardImageProps) {
  return (
    <Box
      position="relative"
      overflow="hidden"
      border="b"
      surface="bg"
      className="border-line group"
      aspect={aspect}
    >
      {image ? (
        <Box
          as="img"
          src={image}
          alt={title}
          width="full"
          height="full"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
      ) : (
        <CategoryPlaceholder category={category} />
      )}

      {/* Category Badge - Standard for all cards */}
      <Box position="absolute" className="top-4 left-4">
        <Box paddingX={3} paddingY={1} surface="default" opacity={90} border={true} radius="none" className="backdrop-blur-sm">
          <Text variant="mono" size="micro" weight="font-bold" color="brand" tracking="wider">
            {category}
          </Text>
        </Box>
      </Box>

      {children}
    </Box>
  );
}
