import { useMemo } from "react";
import { Box, Grid, Stack, Text } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { useToolbox } from './useToolbox';
import { PageHeader } from '@/components/ui/PageHeader';
import { GearCard } from '@/components/ui/GearCard';
import { SearchBox } from '@/components/ui/SearchBox';
import { EmptyState } from '@/components/ui/EmptyState';
import { Search } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function Toolbox() {
  const { filteredCategories, searchTerm, setSearchTerm } = useToolbox();

  const allFilteredItems = useMemo(() =>
    filteredCategories.flatMap(cat => cat.items),
  [filteredCategories]);

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

        <Box className="mb-8 flex flex-wrap gap-2 rounded-2xl border border-line/80 bg-surface/60 p-3 shadow-sm">
          {[
            { label: "Best for travel", color: "text-primary border-primary/30 bg-primary/10" },
            { label: "Highly recommended", color: "text-secondary border-secondary/30 bg-secondary/10" },
            { label: "Competition ready", color: "text-accent-vivid border-accent-vivid/30 bg-accent-vivid/10" }
          ].map((badge) => (
            <span key={badge.label} className={cn("inline-flex items-center rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em]", badge.color)}>
              {badge.label}
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
