import { NavLink } from 'react-router-dom';
import { motion } from 'motion/react';
import { Box, Stack, Text } from '../layout/Primitives';

interface ContentCardProps {
  slug: string;
  title: string;
  category: string;
  date?: string;
  image?: string;
  basePath: string;
  aspect?: "square" | "video";
}

export function ContentCard({ slug, title, category, date, image, basePath, aspect = "video" }: ContentCardProps) {
  return (
    <Box 
      as={NavLink}
      to={`${basePath}/${slug}`}
      className="group cursor-pointer flex flex-col h-full bg-surface border border-line hover:border-accent transition-all duration-300 rounded-none overflow-hidden"
    >
      {/* Visual Thumbnail */}
      <Box className="relative aspect-video overflow-hidden bg-bg">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <Box className="w-full h-full flex items-center justify-center opacity-10 bg-accent-navy">
             <Text variant="display" size="3xl">TD</Text>
          </Box>
        )}
        <Box className="absolute top-4 left-4">
          <Box className="px-3 py-1 bg-surface/90 backdrop-blur-sm border border-line rounded-[2px]">
            <Text variant="mono" size="micro" weight="font-bold" className="text-accent-navy uppercase tracking-wider">
              {category}
            </Text>
          </Box>
        </Box>
      </Box>

      {/* Content Area */}
      <Stack gap={5} className="p-6 lg:p-8" flex={1} justify="between">
        <Stack gap={4}>
          <Text variant="mono" size="xs" color="dim" uppercase className="tracking-[0.15em]">
            {date}
          </Text>
          <Text 
            variant="display" 
            size="xl" 
            weight="font-black" 
            className="text-accent-navy leading-snug group-hover:text-accent transition-colors"
          >
            {title}
          </Text>
          <Text variant="body" size="base" color="dim" className="line-clamp-2 leading-relaxed">
             Discover the technical intersections of robotics and dance in this deep dive into {category.toLowerCase()} methodology and engineering principles.
          </Text>
        </Stack>

        <Box display="flex" align="center" gap={2} paddingTop={6} className="border-t border-slate-100 mt-auto">
          <Text variant="mono" size="xs" className="text-accent font-semibold uppercase tracking-[0.15em]">
            Read More
          </Text>
          <Box className="w-0 h-[1.5px] bg-accent group-hover:w-8 transition-all duration-500" />
        </Box>
      </Stack>
    </Box>
  );
}
