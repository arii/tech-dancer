import { NavLink } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { readingTime } from '@/lib/content';
import { getCategoryAbbreviation, getCategoryColorClass } from '@/lib/categoryUtils';

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
      <Box className="w-12 h-12 m-3 shrink-0 rounded-none overflow-hidden flex items-center justify-center" surface="muted">
        <Text variant="mono" size="micro" color="dim" className="opacity-40 text-center leading-none">{getCategoryAbbreviation(category, 4)}</Text>
      </Box>
      <Stack gap={1} flex className="py-3 min-w-0">
        <Box display="flex" align="center" gap={3}>
          <Text variant="mono" size="micro" color="brand" className="uppercase shrink-0">{category}</Text>
          <Text variant="mono" size="micro" color="dim">{date}</Text>
        </Box>
        <Text variant="display" size="sm" weight="font-bold" className="truncate">{title}</Text>
        <Text variant="body" size="xs" color="dim" className="truncate">{excerpt}</Text>
      </Stack>
      <Box display="flex" align="center" gap={3} padding={4} className="shrink-0 text-text-dim">
        <Text variant="mono" size="micro">{rt} min</Text>
        <ChevronRight className="w-3.5 h-3.5 opacity-30 group-hover:opacity-100 transition-opacity" />
      </Box>
    </Box>
  );
}
