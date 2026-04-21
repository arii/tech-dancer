import { NavLink } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';

interface ContentCardProps {
  slug: string;
  title: string;
  category: string;
  excerpt?: string;
  date?: string;
  image?: string;
  basePath: string;
  aspect?: "square" | "video";
}

export function ContentCardSkeleton() {
  return (
    <Box className="flex flex-col h-full bg-transparent overflow-hidden animate-pulse">
      <Box className="relative aspect-video bg-line/30 mb-6" />
      <Stack gap={4} flex={1}>
        <Box className="h-3 w-24 bg-line/30 rounded-none" />
        <Box className="h-10 w-full bg-line/30 rounded-none" />
        <Stack gap={2}>
          <Box className="h-4 w-full bg-line/30 rounded-none" />
          <Box className="h-4 w-4/5 bg-line/30 rounded-none" />
        </Stack>
        <Box className="h-4 w-24 bg-line/30 rounded-none mt-4" />
      </Stack>
    </Box>
  );
}

export function ContentCard({ slug, title, category, excerpt, date, image, basePath, aspect = "video" }: ContentCardProps) {
  return (
    <Box 
      as={NavLink}
      to={`${basePath}/${slug}`}
      className="group cursor-pointer flex flex-col h-full bg-transparent transition-all duration-500"
    >
      {/* Visual Thumbnail */}
      <Box className="relative aspect-video overflow-hidden bg-surface mb-6">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
          />
        ) : (
          <Box className="w-full h-full flex items-center justify-center opacity-20 bg-accent-navy">
             <Text variant="display" size="4xl">TD</Text>
          </Box>
        )}
        <Box className="absolute bottom-0 left-0">
          <Box className="px-3 py-1 bg-accent-navy text-white">
            <Text variant="mono" size="micro" weight="font-bold" className="uppercase tracking-wider">
              {category}
            </Text>
          </Box>
        </Box>
      </Box>

      {/* Content Area */}
      <Stack gap={3} flex={1}>
        <Text variant="mono" size="micro" color="dim" uppercase className="tracking-[0.2em]">
          {date}
        </Text>
        <Text
          variant="display"
          size="2xl"
          weight="font-black"
          className="text-accent-navy leading-[1.1] group-hover:text-accent transition-colors"
        >
          {title}
        </Text>
        <Text variant="body" size="sm" color="dim" className="line-clamp-3 leading-relaxed mt-2">
           {excerpt || `Discover the technical intersections of robotics and dance in this deep dive into ${category.toLowerCase()} methodology and engineering principles.`}
        </Text>

        <Box display="flex" align="center" gap={3} marginTop={4}>
          <Text variant="mono" size="micro" weight="font-bold" className="text-accent uppercase tracking-[0.2em]">
            Full Report
          </Text>
          <Box className="h-[1px] flex-1 bg-line group-hover:bg-accent transition-colors" />
          <ArrowRight className="w-3 h-3 text-accent transform group-hover:translate-x-1 transition-transform" />
        </Box>
      </Stack>
    </Box>
  );
}
