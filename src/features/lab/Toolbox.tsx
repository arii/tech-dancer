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
import { cn } from '@/lib/utils';
import { GEAR_PILLS } from "./config";

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  variant?: string;
}

function FilterButton({ label, isActive, onClick, variant }: FilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-full border px-4 py-3 text-xs font-semibold uppercase tracking-emphasized cursor-pointer min-h-11 whitespace-nowrap transition-all duration-200",
        variant || "text-text-dim border-line/50 bg-bg hover:bg-surface",
        isActive && "ring-2 ring-offset-2 ring-offset-bg ring-current",
        !isActive && variant && "hover:opacity-90"
      )}
    >
      {label}
    </button>
  );
}

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

        <Box
          marginBottom={8}
          marginTop={8}
          border
          radius="2xl"
          shadow="sm"
          overflowX="auto"
          className="border-line/80 bg-surface/60 no-scrollbar"
        >
          <Stack direction="row" gap={2} padding={3} className="min-w-max">
            <FilterButton
              label="All Gear"
              isActive={selectedPill === 'all'}
              onClick={() => setSelectedPill('all')}
            />
            {GEAR_PILLS.map((pill) => (
              <FilterButton
                key={pill.label}
                label={pill.label}
                isActive={selectedPill === pill.value}
                onClick={() => setSelectedPill(pill.value)}
                variant={pill.color}
              />
            ))}
          </Stack>
        </Box>
      </Box>

      {/* Grid: Mobile-first stacking */}
      {view === 'card' ? (
        <Grid cols={{ base: 1, md: 2, lg: 3, "2xl": 4 }} gap={{ base: 4, md: 6 }}>
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
