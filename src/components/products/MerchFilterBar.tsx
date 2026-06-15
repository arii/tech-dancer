import { Box, Stack, Text } from '@/layouts/Primitives';
import { FilterButton } from '@/components/ui/FilterButton';
import { COLLECTIONS } from '@/data/merch';

interface MerchFilterBarProps {
  activeCollection: string;
  setActiveCollection: (collection: string) => void;
}

export function MerchFilterBar({ activeCollection, setActiveCollection }: MerchFilterBarProps) {
  return (
    <Box
      position="sticky"
      zIndex={10}
      top="var(--header-height)"
      border="b"
      className="bg-bg/95 backdrop-blur-xl"
      paddingTop={3}
      paddingBottom={2}
    >
      <Stack gap={3}>
        <Text variant="headline" size="sm" weight="font-bold" uppercase tracking="wider" color="dim" paddingX={1}>
          Shop by Style
        </Text>
        <Box overflowX="auto" className="no-scrollbar">
          <Stack direction="row" gap={2} padding={1} minWidth="max">
            {COLLECTIONS.map((collection) => (
              <FilterButton
                key={collection.id}
                label={collection.label}
                isActive={activeCollection === collection.id}
                onClick={() => setActiveCollection(collection.id)}
              />
            ))}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
