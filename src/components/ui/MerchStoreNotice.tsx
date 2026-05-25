import { Text, Box } from '@/layouts/Primitives';
import { ShoppingBag } from 'lucide-react';

export function MerchStoreNotice() {
  return (
    <Box
      padding={4}
      radius="md"
      border
      display="flex"
      align="start"
      gap={3}
      className="bg-surface-alt/5 border-line/20"
    >
      <Box shrink={false} marginTop={0.5}>
        <ShoppingBag className="w-5 h-5 text-accent" />
      </Box>
      <Text variant="body" size="sm" color="dim" leading="relaxed">
        BoomTick merch links go to our Printful storefront. These are BoomTick-created products, not affiliate recommendations.
      </Text>
    </Box>
  );
}
