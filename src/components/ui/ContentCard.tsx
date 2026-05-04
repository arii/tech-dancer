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
        "group transition-all duration-300",
        compact 
          ? "hover:bg-accent/5 border-line border-l-4 hover:border-l-accent" 
          : "hover:border-accent hover:shadow-xl hover:-translate-y-1"
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
      <Stack gap={compact ? 1 : 4} padding={compact ? 4 : 5} flex={1} justify="between">
        <Stack gap={compact ? 0.5 : 3}>
          <Box display="flex" align="center" gap={3} wrap>
            <Text variant="mono" size="micro" weight="font-black" color="brand" uppercase tracking="widest">
              {category}
            </Text>
            {date && (
              <Text variant="mono" size="micro" color="dim" uppercase tracking="widest">
                {date}
              </Text>
            )}
            {!compact && (
              <Text variant="mono" size="micro" color="dim" uppercase tracking="widest">
                {readingTime(content, excerpt)} MIN
              </Text>
            )}
          </Box>

          <Text 
            variant="body"
            size={compact ? "base" : "lg"}
            weight="font-bold"
            color="brand"
            leading="tight"
            className="group-hover:text-accent transition-colors line-clamp-2"
          >
            {title}
          </Text>
          
          <Text variant="body" size="sm" color="dim" className="line-clamp-1 leading-relaxed opacity-70">
             {excerpt}
          </Text>
        </Stack>

        {!compact && (
          <Box display="flex" align="center" gap={2} paddingTop={4} border="t" className="border-line/50 mt-auto">
            <Text variant="mono" size="xs" weight="font-bold" tracking="wider" color="accent">
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
