import { ReactNode } from 'react';
import { useSearchParam } from '@/hooks/useSearchParam';
import { ContentCard } from '@/components/ui/ContentCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { Box, Grid, Stack } from '@/layouts/Primitives';
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
  searchPlaceholder?: string;
  compact?: boolean;
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
  renderItem,
  searchPlaceholder: propsSearchPlaceholder,
  compact = false
}: FolioGridProps) {
  const [search, setSearch] = useSearchParam('search');

  const searchPlaceholder = propsSearchPlaceholder || (basePath.includes('gear') ? 'Search gear...' : 'Search posts…');

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
      <Box as="header" marginBottom={12}>
        <PageHeader
          label={label || "FOLIO"}
          title={categoryTitle}
          description={description}
          as={as}
        />
        {children}
        <Box display="flex" align="center" justify="between" gap={4} marginTop={8} flexWrap="wrap">
          <SearchBox
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={searchPlaceholder}
          />
          {onViewChange && (
            <ViewToggle view={view} onChange={onViewChange} />
          )}
        </Box>
      </Box>

      <Box marginTop={8}>
        {filteredItems.length === 0 ? (
          <EmptyState
            icon={<Search className="w-12 h-12" />}
            title="No results found"
            description={search ? `No matches for "${search}" in ${categoryTitle}.` : `No items found in ${categoryTitle}.`}
          />
        ) : view === 'card' ? (
          <Grid cols={compact ? { base: 1, md: 2, lg: 3, xl: 4, "2xl": 5 } : { base: 1, md: 2, xl: 3, "2xl": 4 }} gap={4}>
            {filteredItems.map((item) => (
              <Box
                key={item.slug}
                padding={4}
                height="full"
              >
                {renderItem ? (
                  renderItem(item)
                ) : (
                  <ContentCard
                    slug={item.slug}
                    title={item.title}
                    category={item.category}
                    excerpt={'excerpt' in item ? item.excerpt : undefined}
                    image={'image' in item ? item.image : undefined}
                    imageAlt={'imageAlt' in item ? item.imageAlt : undefined}
                    date={'date' in item ? item.date : undefined}
                    readingTime={'readingTime' in item ? String(item.readingTime) : undefined}
                    featured={Boolean('featured' in item ? item.featured : false)}
                    basePath={basePath}
                    compact={compact}
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
