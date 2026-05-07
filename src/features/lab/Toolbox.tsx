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

export default function Toolbox() {
  const { filteredCategories, searchTerm, setSearchTerm, view, setView, selectedPill, setSelectedPill } = useToolbox();

  const allFilteredItems = useMemo(() =>
    filteredCategories.flatMap(cat => cat.items),
  [filteredCategories]);

  const pills = [
    { label: "Best for travel", value: "Best for travel", color: "text-accent border-accent/30 bg-accent/10" },
    { label: "Highly recommended", value: "Highly recommended", color: "text-accent-navy border-accent-navy/30 bg-accent-navy/10" },
    { label: "Competition ready", value: "Competition ready", color: "text-error border-error/30 bg-error/10" }
  ];

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

        <Box marginBottom={8} display="flex" wrap gap={2} padding={3} marginTop={8} border radius="2xl" shadow="sm" className="border-line/80 bg-surface/60">
          <button
            type="button"
            onClick={() => setSelectedPill('all')}
            className={cn(
              "inline-flex items-center rounded-full border px-4 py-3 text-xs font-semibold uppercase tracking-emphasized cursor-pointer min-h-[44px]",
              "text-text-dim border-line/50 bg-bg hover:bg-surface transition-colors",
              selectedPill === 'all' && "ring-2 ring-offset-2 ring-offset-bg ring-current"
            )}
          >
            All Gear
          </button>
          {pills.map((pill) => (
            <button
              type="button"
              key={pill.label}
              onClick={() => setSelectedPill(pill.value)}
              className={cn(
                "inline-flex items-center rounded-full border px-4 py-3 text-xs font-semibold uppercase tracking-emphasized cursor-pointer min-h-[44px]",
                pill.color,
                "hover:opacity-90 transition-opacity",
                selectedPill === pill.value && "ring-2 ring-offset-2 ring-offset-bg ring-current"
              )}
            >
              {pill.label}
            </button>
          ))}
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
