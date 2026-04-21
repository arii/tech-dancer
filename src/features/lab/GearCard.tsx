import React from 'react';
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
  const [imgError, setImgError] = React.useState(false);

  return (
    <Box
      as={NavLink}
      to={`${basePath}/${slug}`}
      className="group flex flex-col bg-surface rounded-xl border border-line shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      {/* Image Wrapper */}
      <Box className="aspect-square md:aspect-video relative overflow-hidden bg-bg">
        {image && !imgError ? (
          <img
            src={image}
            alt={title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <Box className="w-full h-full flex items-center justify-center opacity-10 bg-accent-navy text-accent-navy">
             <span className="font-display font-bold uppercase tracking-tight leading-none text-3xl">TD</span>
          </Box>
        )}
        <Box position="absolute" className="top-4 left-4">
          <Box paddingX={3} paddingY={1} radius="full" border className="bg-surface/90 backdrop-blur">
            <Text variant="mono" size="micro" weight="font-bold" className="text-accent-navy uppercase">
              {category}
            </Text>
          </Box>
        </Box>
      </Box>

      {/* Content Area */}
      <Stack gap={4} padding={6} flex={1}>
        <Stack gap={2}>
          {rating && (
            <Box display="flex" align="center" gap={1} marginBottom={1}>
              <span className="text-yellow-400">
                {'★'.repeat(Math.floor(rating))}
                {rating % 1 !== 0 ? '½' : ''}
              </span>
              <span className="text-[8px] text-text-dim font-medium">
                ({rating}/5)
              </span>
            </Box>
          )}

          <Text variant="display" weight="font-bold" size="xl" className="text-accent-navy group-hover:text-accent transition-colors leading-tight">
            {title}
          </Text>

          <Text variant="body" size="sm" className="line-clamp-2">
             {excerpt}
          </Text>

          {(verdict || priceCategory || updatedDate) && (
            <Box display="flex" wrap align="center" gap={3} marginTop={2}>
               {verdict && (
                 <Box radius="md" paddingX={2} paddingY={0.5} className="bg-accent/10">
                   <span className="text-[8px] font-mono uppercase text-accent font-bold">{verdict}</span>
                 </Box>
               )}
               {priceCategory && (
                 <span className="text-[8px] font-mono uppercase text-text-dim font-bold">{priceCategory}</span>
               )}
               {updatedDate && (
                 <span className="text-[8px] font-mono uppercase text-text-dim">Updated {updatedDate}</span>
               )}
            </Box>
          )}
        </Stack>

        <Box display="flex" align="center" justify="between" paddingTop={4} border="t" className="border-line/50 mt-auto">
          <Text variant="mono" size="xs" weight="font-bold" className="text-accent">
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
