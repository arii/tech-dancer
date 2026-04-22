import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { readingTime } from '@/lib/content';
import { CardImagePlaceholder } from '@/components/ui/CardImagePlaceholder';
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
    <Box className="flex flex-col h-full bg-surface border border-line rounded-none overflow-hidden">
      <Skeleton className="w-full aspect-video max-h-[160px] rounded-none" />
      <Stack gap={4} className="p-5" flex={1} justify="between">
        <Stack gap={3}>
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-6 w-3/4" />
          <Stack gap={2}>
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
          </Stack>
        </Stack>
        <Skeleton className="h-3 w-20 mt-auto" />
      </Stack>
    </Box>
  );
}

export function ContentCard({ slug, title, category, excerpt, date, image, basePath, content }: ContentCardProps) {
  const rt = readingTime(content, excerpt);

  return (
    <Box 
      as={NavLink}
      to={`${basePath}/${slug}`}
      className="group flex flex-col h-full bg-surface border border-line hover:border-accent transition-all duration-300 rounded-none overflow-hidden"
    >
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
              <Text variant="mono" size="xs" color="dim" uppercase className="tracking-widest">
                {date}
              </Text>
              <Box className="w-1 h-1 rounded-full bg-line" />
              <Text variant="mono" size="xs" color="dim" uppercase className="tracking-widest flex items-center gap-1">
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
                <Text variant="mono" size="xs" color="dim" uppercase className="tracking-widest flex items-center gap-1">
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
          <Text variant="mono" size="xs" weight="font-bold" className="text-accent tracking-wider">
            Read Article
          </Text>
          <Box className="w-0 h-[1px] bg-accent group-hover:w-6 transition-all duration-500" />
          <Text variant="mono" size="xs" className="text-accent ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
            →
          </Text>
        </Box>
      </Stack>
    </Box>
  );
}
