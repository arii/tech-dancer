import { useMemo } from 'react';
import { Box, Grid, Text } from '@/layouts/Primitives';
import { useToolbox } from './useToolbox';
import { GearCard } from './GearCard';

export default function Toolbox() {
  const { filteredCategories, searchTerm, setSearchTerm } = useToolbox();

  const allFilteredItems = useMemo(() =>
    filteredCategories.flatMap(cat => cat.items),
  [filteredCategories]);

  return (
    <Box as="section" paddingY={8}>
      {/* Header section with modern design */}
      <Box as="header" marginBottom={12} border="b" paddingBottom={12}>
        <Box marginBottom={4}>
          <Box as="span" display="inline-block" paddingX={3} paddingY={1} radius="full" opacity={10} color="accent" className="bg-accent/10 text-[10px] font-bold uppercase tracking-widest">
            THE TOOLBOX
          </Box>
        </Box>
        <Text as="h1" variant="display" size="4xl" weight="font-black" marginBottom={4} display="block">
          Gear Reviews
        </Text>
        <Text as="p" variant="sans" size="lg" color="dim" maxWidth="2xl" marginBottom={8} weight="font-medium" display="block">
          Rigorous testing and honest takes on the gear that keeps you moving.
        </Text>

        {/* Modern Search Bar */}
        <Box position="relative" maxWidth="md">
          <Box
            as="input"
            type="text"
            placeholder="Search gear (e.g. earplugs, shoes)..."
            width="full"
            paddingLeft={10}
            paddingRight={4}
            paddingY={3}
            surface="default"
            border
            className="rounded-xl focus:ring-4 focus:ring-accent/10 outline-none transition-all text-base md:text-sm"
            onChange={(e: any) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <Box
            as="svg"
            position="absolute"
            className="left-3 top-3.5 h-5 w-5 text-text-dim"
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
        </div>
      </header>

      {/* Grid: Mobile-first stacking */}
      <Grid cols={{ base: 1, md: 2, xl: 3 }} gap={{ base: 6, md: 8 }}>
        {allFilteredItems.map((item) => (
          <GearCard
            key={item.slug}
            {...item}
            basePath="/gear"
          />
        ))}
      </Grid>

      {allFilteredItems.length === 0 && (
        <Box paddingY={20} className="text-center">
          <Text color="dim">No gear found matching your search.</Text>
        </Box>
      )}
    </Box>
  );
}
