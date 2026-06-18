import { Box, Stack, Text } from '@/layouts/Primitives';
import { FilterButton } from '@/components/ui/FilterButton';
import { COLLECTIONS } from '@/data/merch';
import { Filter } from 'lucide-react';

interface MerchFilterBarProps {
  activeCollection: string;
  onCollectionChange: (id: string) => void;
}

export function MerchFilterBar({ activeCollection, onCollectionChange }: MerchFilterBarProps) {
  return (
    <Stack gap={3} className="sticky top-0 z-20 bg-background/80 backdrop-blur-md py-4 -mx-4 px-4 sm:mx-0 sm:px-0">
      <Stack direction="row" align="center" gap={2}>
        <Filter className="w-4 h-4 text-dim" />
        <Text variant="headline" size="sm" weight="font-bold" uppercase tracking="wider" color="dim">
          Shop by Style
        </Text>
      </Stack>
      <Box border="b" paddingBottom={2} overflowX="auto" noScrollbar>
        <Stack direction="row" gap={2} padding={1} minWidth="max">
          {COLLECTIONS.map((collection) => (
            <FilterButton
              key={collection.id}
              label={collection.label}
              isActive={activeCollection === collection.id}
              onClick={() => onCollectionChange(collection.id)}
            />
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}
