import { NavLink } from 'react-router-dom';
import { motion } from 'motion/react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { readingTime } from '@/lib/content';
import { CardImage } from '@/components/ui/CardImage';
import { Skeleton } from '@/components/ui/Skeleton';


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
    <Box className="flex flex-col h-full bg-surface border border-line rounded-none overflow-hidden animate-pulse">
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

export function ContentCard({ slug, title, category, excerpt, date, image, basePath, content, aspect = "video" }: ContentCardProps) {
  const rt = readingTime(content, excerpt);

  return (
    <Box 
      as={NavLink}
      to={`${basePath}/${slug}`}
      className="group cursor-pointer flex flex-col h-full bg-surface border border-line hover:border-accent transition-all duration-300 rounded-none overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1"
    >
      {/* Visual Thumbnail */}
      <CardImage image={image} title={title} category={category} />


      {/* Content Area */}
      <Stack gap={5} padding={6} flex={1} justify="between">
        <Stack gap={4}>
          <Box display="flex" align="center" gap={3}>
            <Text variant="mono" size="xs" color="dim" uppercase className="tracking-widest">
              {date}
            </Text>
            <Box className="w-1 h-1 rounded-full bg-line" />
            <Text variant="mono" size="xs" color="dim" uppercase className="tracking-widest flex items-center gap-1">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-50"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              {rt} min read
            </Text>
          </Box>
          <Text 
            variant="body"
            size="xl"
            weight="font-bold"
            className="text-accent-navy leading-snug group-hover:text-accent transition-colors"
          >
            {title}
          </Text>
          <Text variant="body" size="base" color="dim" className="line-clamp-2 leading-relaxed">
             {excerpt || `Discover the technical intersections of robotics and dance in this deep dive into ${category.toLowerCase()} methodology and engineering principles.`}
          </Text>
        </Stack>

        <Box display="flex" align="center" gap={2} paddingTop={6} className="border-t border-line mt-auto">
          <Text variant="mono" size="xs" uppercase className="text-accent font-semibold  tracking-[0.15em]">
            Read {title}
          </Text>
          <Box className="w-0 h-[1.5px] bg-accent group-hover:w-8 transition-all duration-500" />
        </Box>
      </Stack>
    </Box>
  );
}
