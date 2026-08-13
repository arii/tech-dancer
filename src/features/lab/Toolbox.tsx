import { useMemo } from "react";

import { Box, Grid, Stack } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { useToolbox } from './useToolbox';
import { PageHeader } from '@/components/ui/PageHeader';
import { AffiliateDisclosure } from '@/components/ui/AffiliateDisclosure';
import { GearCard } from '@/components/ui/GearCard';
import { ViewToggle } from '@/components/ui/ViewToggle';
import { ListRow } from '@/components/ui/ListRow';
import { SearchBox } from '@/components/ui/SearchBox';
import { EmptyState } from '@/components/ui/EmptyState';
import { Search } from 'lucide-react';

import { GEAR_PILLS, ALL_GEAR_FILTER } from "./config";
import { FilterButton } from '@/components/ui/FilterButton';
import { generateGearCatalogSchema } from '@/utils/schema';

export default function Toolbox() {
  const { filteredCategories, searchTerm, setSearchTerm, view, setView, selectedPill, setSelectedPill } = useToolbox();

  const allFilteredItems = useMemo(() =>
    filteredCategories.flatMap(cat => cat.items),
  [filteredCategories]);

  return (
    <Box as="section" paddingY={4}>
      <SEO
        title="Toolbox"
        description="Dance gear notes and product resources for West Coast Swing weekends, practice, travel, recovery, and social dance comfort."
        jsonLd={generateGearCatalogSchema(allFilteredItems)}
      />
      <Box as="header" marginBottom={8}>
        <PageHeader
          label="THE TOOLBOX"
          title="Gear Reviews"
          description="Rigorous testing and honest takes on the gear that keeps you moving."
        />

        <Stack gap={6}>
          <AffiliateDisclosure />

          {/* Modern Search Bar & Toggle */}
          <Box display="flex" align="center" justify="between" gap={4} marginTop={0} wrap data-testid="toolbox-search-bar">
            <SearchBox
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search gear..."
            />
            <ViewToggle view={view} onChange={setView} />
          </Box>
        </Stack>

        <Box display="flex" justify="center" marginTop={8} marginBottom={8} className="overflow-x-auto">
          <Box display="flex" gap="1" padding="1" radius="2xl" border className="border-line bg-surface-alt min-w-max" data-testid="toolbox-filters">
            <FilterButton
              label={ALL_GEAR_FILTER.label}
              onClick={() => setSelectedPill(ALL_GEAR_FILTER.value)}
              isActive={selectedPill === ALL_GEAR_FILTER.value}
              variant="quiet"
            />
            {GEAR_PILLS.map((pill) => (
              <FilterButton
                key={pill.label}
                label={pill.label}
                onClick={() => setSelectedPill(pill.value)}
                isActive={selectedPill === pill.value}
                variant="quiet"
              />
            ))}
          </Box>
        </Box>
      </Box>

      {/* Grid: Mobile-first stacking */}
      {view === 'card' ? (
        <Grid cols={{ base: 1, md: 2, lg: 3, "2xl": 4 }} gap={{ base: 3, md: 4 }}>
          {allFilteredItems.map((item) => (
            <GearCard
              key={item.slug}
              {...item}
              basePath="/gear"
            />
          ))}
        </Grid>
      ) : (
        <Stack gap={0} border="t" className="border-line">
          {allFilteredItems.map((item) => (
            <ListRow key={item.slug} {...item} basePath="/gear" />
          ))}
        </Stack>
      )}

      {allFilteredItems.length === 0 && (
        <EmptyState
          icon={<Search className="w-12 h-12" />}
          title="No gear found"
          description={`No gear found matching current filters.`}
        />
      )}
    </Box>
  );
}
