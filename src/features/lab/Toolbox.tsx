import { useMemo, type ChangeEvent } from 'react';
import { Box, Grid, Text, Stack } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { useToolbox } from './useToolbox';
import { GearCard } from './GearCard';
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
      {/* Header section with modern design */}
      <Box as="header" marginBottom={12} paddingBottom={12} className="border-b border-line/50">
        <Box marginBottom={4}>
          <Box as="span" radius="full" paddingX={3} paddingY={1} className="inline-block bg-accent/10">
            <Text variant="mono" size="tiny" color="brand" weight="font-bold">THE TOOLBOX</Text>
          </Box>
        </Box>
        <Text as="h1" variant="display" size="4xl" weight="font-black" marginBottom={4} display="block" className="text-accent-navy">
          Gear Reviews
        </Text>
        <Text as="p" variant="sans" size="lg" color="dim" maxWidth="2xl" marginBottom={8} weight="font-medium" display="block">
          Rigorous testing and honest takes on the gear that keeps you moving.
        </Text>

        {/* Modern Search Bar & Toggle */}
        <Box display="flex" align="center" justify="between" gap={4} flexWrap="wrap">
          <Box position="relative" maxWidth="md" flex={true}>
            <Box
              as="input"
              type="text"
              placeholder="Search gear (e.g. earplugs, shoes)..."
              width="full"
              paddingLeft={10}
              paddingRight={4}
              paddingY={3}
              className="bg-surface border border-line rounded-none focus:ring-4 focus:ring-accent/10 outline-none transition-all text-base md:text-sm"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <svg
              className="absolute left-3 top-3.5 h-5 w-5 text-text-dim"
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
