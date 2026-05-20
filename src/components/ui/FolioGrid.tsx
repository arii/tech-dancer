import { ReactNode } from 'react';
import { useSearchParam } from '@/hooks/useSearchParam';
import { ContentCard } from '@/components/ui/ContentCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { Box, Grid, Stack, Text } from '@/layouts/Primitives';
import { safeSearch } from '@/lib/utils';
import { ViewToggle, ViewMode } from '@/components/ui/ViewToggle';
import { SearchBox } from '@/components/ui/SearchBox';
import { ListRow } from '@/components/ui/ListRow';
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
  view?: ViewMode;
  onViewChange?: (v: ViewMode) => void;
  as?: keyof JSX.IntrinsicElements;
  renderItem?: (item: ContentItem) => ReactNode;
}

export default function FolioGrid({
  items,
  categoryTitle,
  basePath,
  label,
  description,
  children,
  view = 'card',
  onViewChange,
  as,
  renderItem
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

  const searchPlaceholder = basePath.includes('gear') ? 'Search gear…' : 'Search posts…';
  const resultLabel = `${filteredItems.length} ${filteredItems.length === 1 ? 'item' : 'items'}`;
  const filterSummary = search ? `Filtered by “${search}”` : 'All items';

  return (
    <Box as="section" height="full">
      <Box as="header" marginBottom={12}>
        <PageHeader
          label={label || "FOLIO"}
          title={categoryTitle}
          description={description}
          as={as}
        />
        {children}
        <Stack gap={3} marginTop={8}>
          <SearchBox
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={searchPlaceholder}
          />
          <Box display="flex" align="center" justify="between" gap={3} flexWrap="wrap">
            <Text variant="mono" size="xs" color="dim">{resultLabel} • {filterSummary}</Text>
            {onViewChange && (
              <ViewToggle view={view} onChange={onViewChange} />
            )}
          </Box>
        </Stack>
      </Box>

      <Box marginTop={8}>
        {filteredItems.length === 0 ? (
          <EmptyState
            icon={<Search className="w-12 h-12" />}
            title="No results found"
            description={search ? `No matches for "${search}" in ${categoryTitle}.` : `No items found in ${categoryTitle}.`}
          />
        ) : view === 'card' ? (
          <Grid cols={{ base: 1, md: 2, xl: 3, "2xl": 4 }} gap={4}>
            {filteredItems.map((item) => (
              <Box
                key={item.slug}
                padding={4}
                height="full"
                className="bg-transparent"
              >
                {renderItem ? (
                  renderItem(item)
                ) : (
                  <ContentCard
                    {...item}
                    basePath={basePath}
                  />
                )}
              </Box>
            ))}
          </Grid>
        ) : (
          <Stack gap={0} border="t" className="border-line">
            {filteredItems.map((item) => (
              <ListRow key={item.slug} {...item} basePath={basePath} />
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
}
