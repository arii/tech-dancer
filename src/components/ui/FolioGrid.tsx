import { ReactNode } from 'react';
import { useSearchParam } from '@/hooks/useSearchParam';
import { ContentCard } from '@/components/ui/ContentCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { Box, Grid, Stack } from '@/layouts/Primitives';
import { safeSearch } from '@/lib/utils';
import { ViewToggle, ViewMode } from '@/components/ui/ViewToggle';
import { SearchBox } from '@/components/ui/SearchBox';
import { ListRow } from '@/components/ui/ListRow';
import { EmptyState } from './EmptyState';
import { Search } from 'lucide-react';
import { FilterBar, CategoryOption } from './FilterBar';

interface FolioItem {
  id?: string;
  slug?: string;
  title?: string;
  name?: string;
  category?: string;
  region?: string;
  collection?: string;
  tags?: string[];
  excerpt?: string;
  description?: string;
  [key: string]: unknown;
}

interface FolioGridProps {
  items: FolioItem[];
  categoryTitle: string;
  basePath: string;
  label?: string;
  description?: string;
  children?: ReactNode;
  categories?: (string | CategoryOption)[];
  categoryParam?: string;
  as?: keyof JSX.IntrinsicElements;
  renderItem?: (item: FolioItem) => ReactNode;
  searchPlaceholder?: string;
}

export default function FolioGrid({
  items,
  categoryTitle,
  basePath,
  label,
  description,
  children,
  categories,
  categoryParam = 'category',
  as,
  renderItem,
  searchPlaceholder: propsSearchPlaceholder
}: FolioGridProps) {
  const [search, setSearch] = useSearchParam('search');
  const [activeCategory] = useSearchParam(categoryParam, 'All');
  const [view, setView] = useSearchParam('view', 'card');

  const searchPlaceholder = propsSearchPlaceholder || (basePath.includes('gear') ? 'Search gear...' : 'Search posts…');

  const filteredItems = items.filter(item => {
    // Category filter
    const itemCat = item.category || item.region || item.collection || '';
    const isAll = activeCategory.toLowerCase() === 'all';
    const categoryMatch = isAll ||
                         itemCat === activeCategory ||
                         (Array.isArray(item.tags) && item.tags.includes(activeCategory));

    if (!categoryMatch) return false;

    // Search filter
    const title = item.title || item.name || '';
    const tags = item.tags || [];
    const excerpt = item.excerpt || item.description || '';

    return (
      safeSearch(title, search) ||
      tags?.some((t: string) => safeSearch(t, search)) ||
      safeSearch(itemCat, search) ||
      safeSearch(excerpt, search)
    );
  });

  const currentView = (view as ViewMode) || 'card';

  return (
    <Box as="section" height="full">
      <Box as="header" marginBottom={12}>
        <PageHeader
          label={label || "FOLIO"}
          title={categoryTitle}
          description={description}
          as={as}
        />

        {categories && (
           <Box marginTop={8}>
             <FilterBar categories={categories} paramName={categoryParam} />
           </Box>
        )}

        {children}

        <Box display="flex" align="center" justify="between" gap={4} marginTop={8} flexWrap="wrap">
          <SearchBox
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={searchPlaceholder}
          />
          <ViewToggle view={currentView} onChange={(v) => setView(v)} />
        </Box>
      </Box>

      <Box marginTop={8}>
        {filteredItems.length === 0 ? (
          <EmptyState
            icon={<Search className="w-12 h-12" />}
            title="No results found"
            description={search ? `No matches for "${search}" in ${categoryTitle}.` : `No items found in ${categoryTitle}.`}
          />
        ) : currentView === 'card' ? (
          <Grid cols={{ base: 1, md: 2, xl: 3, "2xl": 4 }} gap={{ base: 6, md: 8 }} marginTop={{ base: 8, md: 12 }}>
            {filteredItems.map((item) => (
              <Box
                key={item.slug || item.id}
                height="full"
                className="bg-transparent"
              >
                {renderItem ? (
                  renderItem(item)
                ) : (
                  <ContentCard
                    slug={item.slug || ''}
                    title={item.title || ''}
                    category={item.category || ''}
                    excerpt={item.excerpt || ''}
                    basePath={basePath}
                    {...item}
                  />
                )}
              </Box>
            ))}
          </Grid>
        ) : (
          <Stack gap={0} border="t" className="border-line">
            {filteredItems.map((item) => (
              <ListRow
                key={item.slug || item.id}
                slug={item.slug || ''}
                title={item.title || ''}
                category={item.category || ''}
                excerpt={item.excerpt || ''}
                basePath={basePath}
                {...item}
              />
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
}
