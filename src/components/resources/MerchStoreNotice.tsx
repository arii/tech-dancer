import { Box, Stack, Text } from '@/layouts/Primitives';
import { ShoppingBag } from 'lucide-react';

export function MerchStoreNotice() {
  return (
    <Box padding={4} radius="md" surface="card" border className="border-line/50">
      <Stack direction="row" gap={3} align="start">
        <Box className="mt-0.5 text-accent opacity-80">
          <ShoppingBag className="w-4 h-4" />
        </Box>
        <Text variant="body" size="sm" color="dim" leading="relaxed">
          BoomTick merch links go to our Printful storefront. These are BoomTick-created products, not affiliate recommendations.
        </Text>
      </Stack>
    </Box>
  );
}
