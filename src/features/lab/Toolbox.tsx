import { useMemo, ChangeEvent } from "react";

import { Box, Grid, Text, Stack } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { useToolbox } from './useToolbox';
import { PageHeader } from '@/components/ui/PageHeader';
import { GearCard } from '@/components/ui/GearCard';
import { ViewToggle } from '@/components/ui/ViewToggle';
import { ListRow } from '@/components/ui/ListRow';

export default function Toolbox() {
  const { filteredCategories, searchTerm, setSearchTerm, view, setView } = useToolbox();

  const allFilteredItems = useMemo(() =>
    filteredCategories.flatMap(cat => cat.items),
  [filteredCategories]);

  return (
    <Box as="section" paddingY={8}>
      <SEO
        title="Toolbox"
        description="Rigorous testing and honest takes on the gear that keeps you moving. Gear reviews for West Coast Swing dancers."
      />
      <Box as="header" marginBottom={12}>
        <PageHeader
          label="THE TOOLBOX"
          title="Gear Reviews"
          description="Rigorous testing and honest takes on the gear that keeps you moving."
        />

        {/* Modern Search Bar & Toggle */}
        <Box display="flex" align="center" justify="between" gap={4} marginTop={8} flexWrap="wrap">
          <Box position="relative" maxWidth="2xl" flex={1}>
            <Box
              as="input"
              type="text"
              placeholder="Search gear (e.g. earplugs, shoes)..."
              width="full"
              surface="default"
              border
              paddingLeft={14}
              paddingRight={6}
              paddingY={4}
              variant="mono"
              size="sm"
              className="focus:border-accent outline-none focus:ring-0"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-dim"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </Box>
          <ViewToggle view={view} onChange={setView} />
        </Box>
      </Box>

      {/* Grid: Mobile-first stacking */}
      {view === 'card' ? (
        <Grid cols={{ base: 1, md: 2, xl: 3, "2xl": 4 }} gap={{ base: 6, md: 8 }}>
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
        <Box paddingY={20} className="text-center">
          <Text color="dim">No gear found matching your search.</Text>
        </Box>
      )}
    </Box>
  );
}
