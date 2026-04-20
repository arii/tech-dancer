import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { Resource } from '@/lib/content';

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
      className="group flex flex-col bg-surface rounded-2xl border border-line shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      {/* Image Wrapper */}
      <Box className="aspect-square md:aspect-video relative overflow-hidden bg-bg">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <Box className="w-full h-full flex items-center justify-center opacity-10 bg-accent-navy">
             <Text variant="display" size="3xl">TD</Text>
          </Box>
        )}
        <Box className="absolute top-4 left-4">
          <Box className="bg-surface/90 backdrop-blur px-3 py-1 rounded-full border border-line">
            <Text variant="mono" size="micro" weight="font-bold" className="text-accent-navy uppercase">
              {category}
            </Text>
          </Box>
        </Box>
      </Box>

      {/* Content Area */}
      <Stack gap={4} className="p-6" flex={1} justify="between">
        <Stack gap={2}>
          {rating && (
            <Box display="flex" align="center" gap={1} marginBottom={1}>
              <Text className="text-yellow-400">
                {'★'.repeat(Math.floor(rating))}
                {rating % 1 !== 0 ? '½' : ''}
              </Text>
              <Text size="micro" color="dim" weight="font-medium">
                ({rating}/5)
              </Text>
            </Box>
          )}

          <Text
            variant="display"
            size="xl"
            weight="font-black"
            className="text-accent-navy leading-tight group-hover:text-accent transition-colors"
          >
            {title}
          </Text>

          <Text variant="body" size="sm" color="dim" className="line-clamp-2">
             {excerpt}
          </Text>

          {(verdict || priceCategory || updatedDate) && (
            <Box display="flex" wrap align="center" gap={3} marginTop={2}>
               {verdict && (
                 <Box className="bg-accent/10 px-2 py-0.5 rounded-md">
                   <Text size="micro" className="text-accent font-bold uppercase">{verdict}</Text>
                 </Box>
               )}
               {priceCategory && (
                 <Text size="micro" color="dim" weight="font-bold">{priceCategory}</Text>
               )}
               {updatedDate && (
                 <Text size="micro" color="dim">Updated {updatedDate}</Text>
               )}
            </Box>
          )}
        </Stack>

        <Box display="flex" align="center" justify="between" paddingTop={4} className="border-t border-line/50 mt-auto">
          <Text variant="mono" size="xs" className="text-accent font-bold uppercase tracking-wider">
            Read Review
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
    </Box>
  );
}
