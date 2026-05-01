import { NavLink } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { readingTime } from '@/lib/content';
import { CategoryPlaceholder } from '@/components/ui/CategoryPlaceholder';
import { Box, Stack } from "@/layouts/Primitives";
import { Text } from "@/layouts/Text";

interface ListRowProps {
  slug: string;
  title: string;
  category: string;
  excerpt?: string;
  date?: string;
  basePath: string;
  content?: string;
}

export function ListRow({ slug, title, category, excerpt, date, basePath, content }: ListRowProps) {
  const rt = readingTime(content, excerpt);

  return (
    <Box as={NavLink} to={`${basePath}/${slug}`}
      display="flex" align="center" border="b"
      className="group hover:bg-surface/50 transition-colors"
    >
      <Box className="w-1 self-stretch bg-accent shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
      <Box width={12} height={12} margin={3} shrink={0} radius="none" overflow="hidden" display="flex" align="center" justify="center">
        <CategoryPlaceholder category={category} size="md" />
      </Box>
      <Stack gap={1} flex paddingY={3} className="min-w-0">
        <Box display="flex" align="center" gap={3}>
          <Text variant="mono" size="micro" color="brand" className="uppercase shrink-0">{category}</Text>
          <Text variant="mono" size="micro" color="dim">{date}</Text>
        </Box>
        <Text variant="display" size="sm" weight="font-bold" className="line-clamp-1">{title}</Text>
        <Text variant="body" size="xs" color="dim" className="truncate">{excerpt}</Text>
      </Stack>
      <Box display="flex" align="center" gap={3} padding={4} className="shrink-0 text-text-dim">
        <Text variant="mono" size="micro">{rt} min</Text>
        <ChevronRight className="w-3.5 h-3.5 opacity-30 group-hover:opacity-100 transition-opacity" />
      </Box>
    </Box>
  );
}
