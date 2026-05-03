import { useMemo } from "react";
import { Box, Grid } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { useToolbox } from './useToolbox';
import { PageHeader } from '@/components/ui/PageHeader';
import { GearCard } from '@/components/ui/GearCard';
import { SearchBox } from '@/components/ui/SearchBox';
import { EmptyState } from '@/components/ui/EmptyState';
import { Search } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function Toolbox() {
  const { filteredCategories, searchTerm, setSearchTerm, selectedPill, setSelectedPill } = useToolbox();

  const allFilteredItems = useMemo(() =>
    filteredCategories.flatMap(cat => cat.items),
  [filteredCategories]);

  const pills = [
    { label: "Best for travel", value: "Best for travel", color: "text-primary border-primary/30 bg-primary/10" },
    { label: "Highly recommended", value: "Highly recommended", color: "text-secondary border-secondary/30 bg-secondary/10" },
    { label: "Competition ready", value: "Competition ready", color: "text-accent-vivid border-accent-vivid/30 bg-accent-vivid/10" }
  ];

  return (
    <Box as="section">
      <SEO
        title="Toolbox"
        description="West Coast Swing gear reviews, travel essentials, and practical picks for dancers."
      />
      <Box as="header" marginBottom={8}>
        <PageHeader
          label="THE TOOLBOX"
          title="Gear Reviews"
          description="Honest reviews of the gear, travel essentials, and accessories that keep WCS dancers moving."
        />

        <Box marginBottom={8} display="flex" wrap gap={2} padding={3} className="rounded-2xl border border-line/80 bg-surface/60 shadow-sm">
          {pills.map((pill) => (
            <span 
              key={pill.label} 
              onClick={() => setSelectedPill(pill.value)}
              className={cn(
                "inline-flex items-center rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-emphasized cursor-pointer", 
                pill.color,
                selectedPill === pill.value && "ring-2 ring-offset-2 ring-offset-bg ring-current"
              )}
            >
              {pill.label}
            </span>
          ))}
        </Box>

        <Box marginTop={8}>
          <SearchBox
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search gear (e.g. earplugs, shoes)..."
          />
        </Box>
      </Box>

      {allFilteredItems.length === 0 ? (
        <EmptyState
          icon={<Search className="w-12 h-12" />}
          title="No gear found"
          description={`No gear found matching "${searchTerm}".`}
        />
      ) : (
        <Grid cols={{ base: 1, sm: 2, xl: 3 }} gap={4}>
          {allFilteredItems.map((item) => (
            <GearCard
              key={item.slug}
              {...item}
              basePath="/gear"
            />
          ))}
        </Grid>
      )}
    </Box>
  );
}
