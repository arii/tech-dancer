import { NavLink } from 'react-router-dom';
import { motion, HTMLMotionProps } from 'motion/react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { readingTime } from '@/lib/content';
import { CardImagePlaceholder } from '@/components/ui/CardImagePlaceholder';
import { cn } from '@/lib/utils';

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
  compact?: boolean;
}

export function ContentCard({ 
  slug, 
  title, 
  category, 
  excerpt, 
  date, 
  image, 
  basePath, 
  content, 
  compact = false,
  ...motionProps 
}: ContentCardProps) {
  return (
    <Stack
      as={motion.create(NavLink)}
      to={`${basePath}/${slug}`}
      direction="col"
      gap={0}
      height="full"
      surface
      border
      radius={compact ? "none" : "xl"}
      shadow={compact ? "none" : "standard"}
      overflow="hidden"
      className={cn(
        "group transition-all duration-300 h-full",
        compact
          ? "hover:bg-accent/5 border-line border-l-4 hover:border-l-accent bg-surface"
          : "hover:border-accent hover:shadow-md hover:-translate-y-0.5 bg-surface"
      )}
      {...motionProps}
    >
      {!compact && (
        <CardImagePlaceholder
          image={image}
          category={category}
          title={title}
        />
      )}

      {/* Content Area */}
      <Stack
        gap={compact ? 1 : 2}
        padding={compact ? 4 : 3}
        flex={1}
        className={cn(compact ? "min-h-[120px]" : "min-h-[128px]", "justify-between")}
      >
        <Stack gap={compact ? 0.5 : 1.5}>
          <Box display="flex" align="center" gap={3} wrap className="leading-none">
            <Text
              variant="mono"
              size="micro"
              weight="font-black"
              color={category.toLowerCase().includes('gear') || category.toLowerCase().includes('white') ? 'white' : 'accent'}
              uppercase
              tracking="widest"
              className="whitespace-nowrap"
            >
              {category}
            </Text>
            {date && (
              <Text variant="mono" size="micro" color="dim" uppercase tracking="widest" className="whitespace-nowrap">
                {date}
              </Text>
            )}
            {!compact && (
              <Text variant="mono" size="micro" color="dim" uppercase tracking="widest" className="whitespace-nowrap">
                {readingTime(content, excerpt)} MIN
              </Text>
            )}
          </Box>

          <Text 
            variant="body"
            size={compact ? "base" : "sm"}
            weight="font-bold"
            className="text-white leading-tight group-hover:text-accent transition-colors line-clamp-2"
          >
            {title}
          </Text>
          
          <Text variant="body" size="xs" color="dim" className="line-clamp-2 leading-relaxed opacity-72">
             {excerpt}
          </Text>
        </Stack>

        {!compact && (
          <Box display="flex" align="center" gap={2} paddingTop={4} border="t" className="border-line/50 mt-auto pt-4">
            <Text variant="mono" size="xs" weight="font-bold" tracking="wider" color="accent" className="whitespace-nowrap">
              Read Article
            </Text>
            <Box width={0} height="px" className="bg-accent group-hover:w-6 transition-all duration-500" />
            <Text variant="mono" size="xs" color="accent" className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
              →
            </Text>
          </Box>
        )}
      </Stack>
    </Stack>
  );
}
