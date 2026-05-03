import { useMemo } from "react";

import { Box, Grid, Stack } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { useToolbox } from './useToolbox';
import { PageHeader } from '@/components/ui/PageHeader';
import { GearCard } from '@/components/ui/GearCard';
import { ViewToggle } from '@/components/ui/ViewToggle';
import { ListRow } from '@/components/ui/ListRow';
import { SearchBox } from '@/components/ui/SearchBox';
import { EmptyState } from '@/components/ui/EmptyState';
import { Search } from 'lucide-react';
import type { Resource } from '@/lib/content';

export default function Toolbox(): React.ReactElement {
  const { filteredCategories, searchTerm, setSearchTerm, view, setView } = useToolbox();

  const allFilteredItems = useMemo(() =>
    filteredCategories.flatMap((cat: (typeof filteredCategories)[number]) => cat.items),
  [filteredCategories]);

  return (
    <Box as="section" paddingY={4}>
      <SEO
        title="Toolbox"
        description="Rigorous gear reviews for West Coast Swing dancers, with honest notes on shoes, accessories, and practice essentials."
      />
      <Box as="header" marginBottom={8}>
        <PageHeader
          label="THE TOOLBOX"
          title="Gear Reviews"
          description="Rigorous gear reviews for West Coast Swing dancers, with honest notes on shoes, accessories, and practice essentials."
        />

        {/* Modern Search Bar & Toggle */}
        <Box display="flex" align="center" justify="between" gap={4} marginTop={8} wrap>
          <SearchBox
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search gear (e.g. earplugs, shoes)..."
          />
          <ViewToggle view={view} onChange={setView} />
        </Box>
      </Box>

      {/* Grid: Mobile-first stacking */}
      {view === 'card' ? (
        <Grid cols={{ base: 1, md: 2, lg: 3, "2xl": 4 }} gap={{ base: 4, md: 6 }}>
          {allFilteredItems.map((item: Resource) => (
            <GearCard
              key={item.slug}
              {...item}
              basePath="/gear"
            />
          ))}
        </Grid>
      ) : (
        <Stack gap={0} border="t" className="border-line">
          {allFilteredItems.map((item: Resource) => (
            <ListRow key={item.slug} {...item} basePath="/gear" />
          ))}
        </Stack>
      )}

      {allFilteredItems.length === 0 && (
        <EmptyState
          icon={<Search className="w-12 h-12" />}
          title="No gear found"
          description={`No gear found matching "${searchTerm}".`}
        />
      )}
    </Box>
  );
}
