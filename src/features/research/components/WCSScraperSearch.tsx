import { useCallback, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';
import { useWCSData } from '../hooks/useWCSData';
import { FilterButton } from '@/components/ui/FilterButton';

export function WCSScraperSearch() {
  const { searchTerm, setSearchTerm, filterPromoted, setFilterPromoted } = useWCSData();

  useEffect(() => {
    if (!searchTerm) return;
    const timer = setTimeout(() => {
      window.gtag?.('event', 'search', { search_term: searchTerm, tool: 'wcs_scraper' });
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleFilterChange = useCallback((filter: 'all' | 'promoted' | 'not-promoted') => {
    setFilterPromoted(filter);
    window.gtag?.('event', 'filter_change', { filter_type: 'promotion', value: filter, tool: 'wcs_scraper' });
  }, [setFilterPromoted]);

  return (
    <Box border surface="muted" padding="card">
      <Stack gap={6}>
        <Box display="flex" align="center" gap={3}>
          <Search className="w-5 h-5 text-dim" />
          <Text variant="mono" size="xs" weight="font-bold" uppercase color="dim">
            Search
          </Text>
        </Box>

        <Grid cols={{ base: 1, md: 2 }} gap={4}>
          <Box surface="default" border paddingX="compact" paddingY={3} display="flex" align="center" gap={2}>
            <Search className="w-4 h-4 text-dim" />
            <input
              type="text"
              placeholder="Search by name, ID, or event..."
              className="bg-transparent border-none outline-none text-sm w-full font-mono"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Box>

          <Stack direction="row" gap={2} width="full">
            {(['all', 'promoted', 'not-promoted'] as const).map((filter) => (
              <Box key={filter} flex={1}>
                <FilterButton
                  variant="compact"
                  label={filter.replace('-', ' ')}
                  onClick={() => handleFilterChange(filter)}
                  isActive={filterPromoted === filter}
                  className={cn(
                    "w-full justify-center",
                    filterPromoted === filter ? "bg-accent text-bg border-accent" : "bg-surface-alt text-text-dim border-line/50"
                  )}
                />
              </Box>
            ))}
          </Stack>
        </Grid>
      </Stack>
    </Box>
  );
}
