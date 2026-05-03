import { ReactNode } from 'react';
import { useSearchParam } from '@/hooks/useSearchParam';
import { ContentCard } from '@/components/ui/ContentCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { Box, Grid, Stack } from '@/layouts/Primitives';
import { safeSearch } from '@/lib/utils';
import { SearchBox } from '@/components/ui/SearchBox';
import { ContentItem } from '@/lib/content';
import { EmptyState } from './EmptyState';
import { Search } from 'lucide-react';

interface FolioGridProps {
  items: ContentItem[];
  categoryTitle: string;
  basePath: string;
  label?: string;
  description?: string;
  children?: ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

export default function FolioGrid({
  items,
  categoryTitle,
  basePath,
  label,
  description,
  children,
  as
}: FolioGridProps) {
  const [search, setSearch] = useSearchParam('search');

  const filteredItems = items.filter(item => {
    const tags = 'tags' in item ? item.tags : [];
    return (
      safeSearch(item.title, search) ||
      tags?.some((t: string) => safeSearch(t, search)) ||
      safeSearch(item.category, search) ||
      safeSearch(item.excerpt, search)
    );
  });

  return (
    <Box as="section" height="full">
      <Box as="header" marginBottom={8}>
        <PageHeader
          label={label || "FOLIO"}
          title={categoryTitle}
          description={description}
          as={as}
        />
        {children}
        <Box marginTop={8}>
          <SearchBox
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>
      </Box>

      <Box marginTop={8}>
        {filteredItems.length === 0 ? (
          <EmptyState
            icon={<Search className="w-12 h-12" />}
            title="No results found"
            description={search ? `No matches for "${search}" in ${categoryTitle}.` : `No items found in ${categoryTitle}.`}
          />
        ) : (
          <Grid cols={{ base: 1, sm: 2, xl: 3 }} gap={4}>
            {filteredItems.map((item) => (
              <ContentCard
                key={item.slug}
                {...item}
                basePath={basePath}
              />
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}
