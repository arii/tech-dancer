import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { Resource } from '@/lib/content';
import { CardImage } from '@/components/ui/CardImage';

interface GearCardProps extends Resource {
  basePath: string;
}

export function GearCard({
  slug,
  title,
  category,
  excerpt,
  image,
  basePath,
  rating,
  verdict,
  priceCategory,
  updatedDate
}: GearCardProps) {
  return (
    <Stack
      as={NavLink}
      direction="col"
      to={`${basePath}/${slug}`}
      display="flex"
      surface="default"
      border={true}
      className="group transition-all duration-300 overflow-hidden"
    >
      {/* Image Wrapper */}
      <CardImage image={image} title={title} category={category}>
        {verdict && (
          <Box position="absolute" className="top-4 right-4">
            <Box paddingX={2} paddingY={1} radius="none" className="bg-accent">
              <Text variant="mono" size="micro" weight="font-bold" color="white" uppercase>
                {verdict}
              </Text>
            </Box>
          </Box>
        )}
      </CardImage>

      {/* Content Area */}
      <Stack gap={4} padding={6} flex={1}>
        <Stack gap={2}>
          {rating && (
            <Box display="flex" align="center" gap={1} marginBottom={1}>
              <span className="text-yellow-400 drop-shadow-sm">
                {'★'.repeat(Math.floor(rating))}
                {rating % 1 !== 0 ? '½' : ''}
              </span>
              <Text variant="mono" size="micro" color="dim" emphasis="low">
                ({rating}/5)
              </Text>
            </Box>
          )}

          <Text as="h3" variant="headline" size="xl" color="brand" className="group-hover:text-accent transition-colors">
            {title}
          </Text>

          <Text variant="body" size="sm" color="dim" className="line-clamp-2">
             {excerpt}
          </Text>

          {(priceCategory || updatedDate) && (
            <Box display="flex" wrap="wrap" align="center" gap={3} marginTop={2}>
               {priceCategory && (
                 <Box border={true} paddingX={2} paddingY={0.5} className="bg-accent/10 border-accent/20">
                   <Text variant="mono" size="tiny" weight="font-bold" color="brand">{priceCategory}</Text>
                 </Box>
               )}
               {updatedDate && (
                 <Text variant="mono" size="tiny" color="dim">Updated {updatedDate}</Text>
               )}
            </Box>
          )}
        </Stack>

        <Stack gap={3} marginTop="auto">
          <Text variant="mono" size="xs" color="dim" className="leading-tight" marginBottom={2}>
            * This post contains affiliate links. I may earn a commission at no extra cost to you.
          </Text>
          <Box display="flex" align="center" justify="between" paddingTop={4} border="t" className="border-line/50">
            <Text variant="mono" size="xs" color="brand" weight="font-bold">
              Read {title} Review
            </Text>
            <Box className="group-hover:translate-x-1 transition-transform duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-accent"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </Box>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
}
