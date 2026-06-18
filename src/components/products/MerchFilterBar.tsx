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
    <Stack
      gap={3}
      position="sticky"
      top={0}
      zIndex={20}
      surface="surface"
      paddingY={4}
      paddingX={{ base: 4, sm: 0 }}
      marginX={{ base: -4, sm: 0 }}
      className="backdrop-blur-md bg-bg/80"
    >
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
