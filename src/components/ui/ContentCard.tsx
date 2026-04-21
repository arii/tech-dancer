import { NavLink } from 'react-router-dom';
import { motion } from 'motion/react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { readingTime } from '@/lib/content';

interface ContentCardProps {
  slug: string;
  title: string;
  category: string;
  excerpt?: string;
  date?: string;
  image?: string;
  basePath: string;
  aspect?: "square" | "video";
  content?: string;
}

export function ContentCardSkeleton() {
  return (
    <Box className="flex flex-col h-full bg-surface border border-line shadow-sm rounded-lg overflow-hidden animate-pulse">
      <Box className="relative aspect-video bg-line/50" />
      <Stack gap={5} className="p-6 lg:p-8" flex={1} justify="between">
        <Stack gap={4}>
          <Box className="h-4 w-24 bg-line/50 rounded" />
          <Box className="h-8 w-3/4 bg-line/50 rounded" />
          <Stack gap={2}>
            <Box className="h-4 w-full bg-line/50 rounded" />
            <Box className="h-4 w-5/6 bg-line/50 rounded" />
          </Stack>
        </Stack>
        <Box className="h-4 w-20 bg-line/50 rounded mt-auto" />
      </Stack>
    </Box>
  );
}

const categoryGradients: Record<string, string> = {
  'Data & Dev Lab': 'from-[#1A2B3C] to-[#185FA5]',
  'All about WCS':  'from-[#1A2B3C] to-[#3B6D11]',
  'Travel/Lifestyle': 'from-[#993C1D] to-[#BA7517]',
  'Gear Reviews':   'from-[#534AB7] to-[#1D9E75]',
  'General': 'from-[#1A2B3C] to-[#185FA5]',
};

export function ContentCard({ slug, title, category, excerpt, date, image, basePath, content, aspect = "video" }: ContentCardProps) {
  const gradient = categoryGradients[category] || 'from-slate-800 to-slate-900';
  const rt = content ? readingTime(content) : Math.max(1, Math.round((excerpt?.split(' ').length ?? 0) / 3));

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
          <Box className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${gradient}`}>
             <Text variant="display" size="4xl" className="text-white/20">
               {category.slice(0, 2).toUpperCase()}
             </Text>
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
          <Box display="flex" align="center" gap={3}>
            <Text variant="mono" size="xs" color="dim" uppercase className="tracking-[0.15em]">
              {date}
            </Text>
            <Box className="w-1 h-1 rounded-full bg-line" />
            <Text variant="mono" size="xs" color="dim" uppercase className="tracking-[0.15em] flex items-center gap-1">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-50"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              {rt} min read
            </Text>
          </Box>
          <Text 
            variant="display" 
            size="xl" 
            weight="font-black" 
            className="text-accent-navy leading-snug group-hover:text-accent transition-colors"
          >
            {title}
          </Text>
          <Text variant="body" size="base" color="dim" className="line-clamp-2 leading-relaxed">
             {excerpt || `Discover the technical intersections of robotics and dance in this deep dive into ${category.toLowerCase()} methodology and engineering principles.`}
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
