import { useMemo } from "react";

import { Box, Stack } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { useToolbox } from './useToolbox';
import { PageHeader } from '@/components/ui/PageHeader';
import { GearCard } from '@/components/ui/GearCard';
import { ViewToggle } from '@/components/ui/ViewToggle';
import { ListRow } from '@/components/ui/ListRow';
import { SearchBox } from '@/components/ui/SearchBox';
import { EmptyState } from '@/components/ui/EmptyState';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GEAR_PILLS } from "./config";
import { FilterButton } from '@/components/ui/FilterButton';

export default function Toolbox() {
  const { filteredCategories, searchTerm, setSearchTerm, view, setView, selectedPill, setSelectedPill } = useToolbox();

  const allFilteredItems = useMemo(() =>
    filteredCategories.flatMap(cat => cat.items),
  [filteredCategories]);

  return (
    <Box as="section" paddingY={4}>
      <SEO
        title="Toolbox"
        description="Rigorous testing and honest takes on the gear that keeps you moving. Gear reviews for West Coast Swing dancers."
      />
      <Box as="header" marginBottom={8}>
        <PageHeader
          label="THE TOOLBOX"
          title="Gear Reviews"
          description="Rigorous testing and honest takes on the gear that keeps you moving."
        />

        {/* Modern Search Bar & Toggle */}
        <Box display="flex" align="center" justify="between" gap={4} marginTop={8} wrap>
          <SearchBox
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search gear..."
          />
          <ViewToggle view={view} onChange={setView} />
        </Box>

        <Box marginBottom={8} display="flex" flexWrap="nowrap" overflowX="auto" gap={3} padding={4} marginTop={8} border radius="2xl" shadow="sm" className="border-line/80 bg-surface/60 no-scrollbar">
          <FilterButton
            label="All Gear"
            onClick={() => setSelectedPill('all')}
            isActive={selectedPill === 'all'}
            className="text-text-dim border-line/50 bg-bg hover:bg-surface transition-colors shrink-0"
          />
          {GEAR_PILLS.map((pill) => (
            <FilterButton
              key={pill.label}
              label={pill.label}
              onClick={() => setSelectedPill(pill.value)}
              isActive={selectedPill === pill.value}
              className={cn(pill.color, "hover:opacity-90 transition-opacity shrink-0")}
            />
          ))}
        </Box>
      </Box>

      {/* Grid: Mobile-first stacking */}
      {view === 'card' ? (
        <Box
          display="grid"
          className="grid-cols-[repeat(auto-fit,minmax(280px,1fr))]" // impeccable-ignore
          gap={6}
        >
          {allFilteredItems.map((item) => (
            <GearCard
              key={item.slug}
              {...item}
              basePath="/gear"
            />
          ))}
        </Box>
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
