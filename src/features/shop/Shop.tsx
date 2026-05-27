import { useMemo } from "react";
import { Box, Grid, Stack } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { MerchCard } from '@/components/ui/MerchCard';
import { ViewToggle } from '@/components/ui/ViewToggle';
import { ListRow } from '@/components/ui/ListRow';
import { SearchBox } from '@/components/ui/SearchBox';
import { EmptyState } from '@/components/ui/EmptyState';
import { useSearchParam } from '@/hooks/useSearchParam';
import { getResources } from '@/lib/content';
import { useQuery } from '@tanstack/react-query';
import { safeSearch } from '@/lib/utils';
import { ViewMode } from '@/components/ui/ViewToggle';
import { Package } from 'lucide-react';

export default function Shop() {
  const { data: resources = [] } = useQuery({
    queryKey: ['resources'],
    queryFn: getResources,
    initialData: getResources,
  });

  const [searchTerm, setSearchTerm] = useSearchParam('search');
  const [viewParam, setViewParam] = useSearchParam('view', 'card');
  const view = viewParam as ViewMode;
  const setView = (v: ViewMode) => setViewParam(v);

  // Filter to only merch items (those with shopUrl)
  const merchItems = useMemo(() => {
    const items = resources.filter(r => r.shopUrl);

    if (!searchTerm) return items;

    return items.filter(item =>
      safeSearch(item.title, searchTerm) ||
      safeSearch(item.category, searchTerm) ||
      safeSearch(item.excerpt, searchTerm) ||
      safeSearch(item.tags, searchTerm)
    );
  }, [resources, searchTerm]);

  return (
    <Box as="section" paddingY={4}>
      <SEO
        title="West Coast Swing Dance Merch"
        description="BoomTick Printful merch — hoodies, tees, and apparel for swing dancers."
      />

      <Box as="header" marginBottom={8}>
        <PageHeader
          label="STOREFRONT"
          title="West Coast Swing Dance Merch"
          description="Exclusive BoomTick apparel for swing dancers."
        />

        {/* Search Bar & Toggle */}
        <Box display="flex" align="center" justify="between" gap={4} marginTop={8} wrap>
          <SearchBox
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search merch..."
          />
          <ViewToggle view={view} onChange={setView} />
        </Box>
      </Box>

      {/* Grid: Mobile-first stacking */}
      {view === 'card' ? (
        <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={{ base: 3, md: 4 }}>
          {merchItems.map((item) => (
            <MerchCard
              key={item.slug}
              {...item}
              title={item.title}
              category={item.category}
              excerpt={item.excerpt || item.description}
              shopUrl={item.shopUrl || ''}
            />
          ))}
        </Grid>
      ) : (
        <Stack gap={0} border="t" className="border-line">
          {merchItems.map((item) => (
            <ListRow
              key={item.slug}
              {...item}
              basePath="/shop"
            />
          ))}
        </Stack>
      )}

      {merchItems.length === 0 && (
        <EmptyState
          icon={<Package className="w-12 h-12" />}
          title="No merch found"
          description="No merch items matching your search."
        />
      )}
    </Box>
  );
}
