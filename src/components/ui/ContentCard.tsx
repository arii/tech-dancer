import { NavLink } from 'react-router-dom';
import { motion, HTMLMotionProps } from 'motion/react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { readingTime } from '@/lib/content';
import { CardImagePlaceholder } from '@/components/ui/CardImagePlaceholder';
import { CategoryPlaceholder } from '@/components/ui/CategoryPlaceholder';

interface ContentCardProps extends Partial<HTMLMotionProps<"a">> {
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


export function ContentCard({ slug, title, category, excerpt, date, image, basePath, content, ...motionProps }: ContentCardProps) {
  const rt = readingTime(content, excerpt);

  return (
    <Stack
      as={motion(NavLink)}
      to={`${basePath}/${slug}`}
      radius="xl"
      shadow="standard"
      direction="col"
      gap={0}
      height="full"
      surface="default"
      border
      className="group hover:border-accent hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
      {...motionProps}
    >
      {/* Visual Thumbnail */}
      <Box aspect="video" maxHeight="cardImage" className="relative overflow-hidden border-b border-line bg-bg">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <Stack width="full" height="full" direction="col" gap={0}>
            <Box height={4} width="full" surface={
              (category || '').toLowerCase().includes('tech') ? 'brand' :
              (category || '').toLowerCase().includes('travel') || (category || '').toLowerCase().includes('wcs') ? 'accent' :
              (category || '').toLowerCase().includes('gear') ? 'warning' :
              (category || '').toLowerCase().includes('lifestyle') ? 'danger' : 'muted'
            } />
            <Box flex={1} display="flex" align="center" justify="center" className="bg-muted/10">
              <CategoryPlaceholder category={category} size="md" />
            </Box>
          </Stack>
        )}
        <Box className="absolute top-4 left-4">
          <Box className="px-3 py-1 bg-surface/90 backdrop-blur-sm border border-line rounded-sm">
            <Text variant="mono" size="micro" weight="font-bold" uppercase tracking="wider" className="text-accent-navy">
              {category}
            </Text>
          </Box>
        </Box>
      </Box>
      <CardImagePlaceholder
        image={image}
        category={category}
        date={date}
        title={title}
      />

      {/* Content Area */}
      <Stack gap={4} padding={5} flex={1} justify="between">
        <Stack gap={3}>
          {/* Only show meta row if we have an image (since no-image uses compact header) */}
          {image && (
            <Box display="flex" align="center" gap={3}>
              <Text variant="mono" size="xs" color="dim" uppercase tracking="widest">
                {date}
              </Text>
              <Box className="w-1 h-1 rounded-full bg-line" />
              <Text variant="mono" size="xs" color="dim" uppercase tracking="widest" className="flex items-center gap-1">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-50"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                {rt} min
              </Text>
            </Box>
          )}

          {/* If no image, we still want to show reading time somewhere if possible,
              but let's keep it clean as requested. The audit says "compact header strip"
              and "footer row" for card structure. */}

          {!image && (
             <Box display="flex" align="center" gap={3}>
                <Text variant="mono" size="xs" color="dim" uppercase tracking="widest" className="flex items-center gap-1">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-30"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                  {rt} min
                </Text>
             </Box>
          )}

          <Text 
            variant="body"
            size="lg"
            weight="font-bold"
            className="text-accent-navy leading-tight group-hover:text-accent transition-colors line-clamp-2"
          >
            {title}
          </Text>
          <Text variant="body" size="sm" color="dim" className="line-clamp-2 leading-relaxed opacity-80">
             {excerpt || `Discover technical insights in ${category.toLowerCase()} methodology.`}
          </Text>
        </Stack>

        <Box display="flex" align="center" gap={2} paddingTop={4} className="border-t border-line/50 mt-auto">
          <Text variant="mono" size="xs" weight="font-bold" tracking="wider" className="text-accent">
            Read Article
          </Text>
          <Box className="w-0 h-px bg-accent group-hover:w-6 transition-all duration-500" />
          <Text variant="mono" size="xs" className="text-accent ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
            →
          </Text>
        </Box>
      </Stack>
    </Stack>
  );
}
