import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { Resource } from '@/lib/content';
import { CardImagePlaceholder } from '@/components/ui/CardImagePlaceholder';

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
    <Box
      as={NavLink}
      to={`${basePath}/${slug}`}
      display="flex" direction="col" height="full" surface="default" border={true} radius="none" overflow="hidden" className="group hover:border-accent transition-all duration-300"
    >
      <CardImagePlaceholder
        image={image}
        category={category}
        date={updatedDate}
        title={title}
      />

      {/* Content Area */}
      <Stack gap={4} padding={5} flex={1} justify="between">
        <Stack gap={3}>
          <Box display="flex" align="center" justify="between" wrap>
            {rating && (
              <Box display="flex" align="center" gap={1}>
                <span color="warning" className="text-xs">
                  {'★'.repeat(Math.floor(rating))}
                  {rating % 1 !== 0 ? '½' : ''}
                </span>
                <Text variant="mono" size="micro" color="dim">
                  ({rating}/5)
                </Text>
              </Box>
            )}

            {verdict && (
              <Box surface="brand" paddingX={1.5} paddingY={0.5} radius="none" border={true} className="border-line/10">
                <Text variant="mono" size="micro" weight="font-bold" className="uppercase">
                  {verdict}
                </Text>
              </Box>
            )}
          </Box>

          <Text
            variant="body"
            size="lg"
            weight="font-bold"
            className="text-accent-navy leading-tight group-hover:text-accent transition-colors line-clamp-2"
          >
            {title}
          </Text>

          <Text variant="body" size="sm" color="dim" className="line-clamp-2 leading-relaxed opacity-80">
             {excerpt}
          </Text>

          {priceCategory && (
             <Box border surface="warning" paddingX={2} paddingY={0.5} className="border-warning/50 w-fit">
               <Text variant="mono" size="micro" weight="font-bold" color="warning">{priceCategory}</Text>
             </Box>
          )}
        </Stack>

        <Stack gap={3} marginTop="auto">
          <Text variant="mono" size="micro" color="dim" className="leading-tight opacity-70 italic">
            * Affiliate links — commission earned at no cost to you.
          </Text>

          <Box display="flex" align="center" gap={2} paddingTop={4} className="border-t border-line/50">
            <Text variant="mono" size="xs" weight="font-bold" className="text-accent tracking-wider">
              Read Review
            </Text>
            <Box height="px" className="w-0 bg-accent group-hover:w-6 transition-all duration-500" />
            <Box marginLeft="auto" className="group-hover:translate-x-1 transition-transform duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
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
    </Box>
  );
}
