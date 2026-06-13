import { ReactNode } from 'react';
import { Box, Grid, Text, Stack } from '@/layouts/Primitives';
import { SearchBox } from '@/components/ui/SearchBox';
import { ViewToggle } from '@/components/ui/ViewToggle';
import { EmptyState } from '@/components/ui/EmptyState';
import { Search } from 'lucide-react';

interface ContentFeedSectionProps<T> {
  title: string;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  view: 'grid' | 'list';
  setView: (view: 'grid' | 'list') => void;
  placeholder: string;
  items: T[];
  renderItem: (item: T) => ReactNode;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  id?: string;
}

export function ContentFeedSection<T>({
  title,
  searchTerm,
  setSearchTerm,
  view,
  setView,
  placeholder,
  items,
  renderItem,
  emptyStateTitle = "No results found",
  emptyStateDescription,
  id
}: ContentFeedSectionProps<T>) {
  return (
    <Box id={id} as="section" marginTop={{ base: 16, lg: 32 }}>
      <Stack
        direction={{ base: 'col', sm: 'row' }}
        align={{ base: 'start', sm: 'center' }}
        justify="between"
        gap={6}
        marginBottom={8}
      >
        <Text variant="mono" size="xs" color="brand" weight="font-black" uppercase tracking="widest">
          {title}
        </Text>

        <Box display="flex" align="center" gap={4} wrap className="w-full sm:w-auto">
          <SearchBox
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={placeholder}
          />
          <ViewToggle view={view} onChange={setView} />
        </Box>
      </Stack>

      {items.length === 0 ? (
        <EmptyState
          icon={<Search className="w-12 h-12" />}
          title={emptyStateTitle}
          description={emptyStateDescription || (searchTerm ? `No matches for "${searchTerm}".` : `No items found.`)}
        />
      ) : (
        <Grid
          cols={view === 'grid' ? { base: 1, md: 2, xl: 3, "2xl": 4 } : 1}
          gap={4}
        >
          {items.map((item) => renderItem(item))}
        </Grid>
      )}
    </Box>
  );
}
