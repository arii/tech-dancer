import { Text, Box } from '@/layouts/Primitives';
import { ShoppingBag } from 'lucide-react';

export function MerchStoreNotice() {
  return (
    <Box
      padding={4}
      radius="md"
      border
      className="bg-surface-alt/5 border-line/20 flex items-start gap-3"
    >
      <ShoppingBag className="w-5 h-5 text-accent shrink-0 mt-0.5" />
      <Text variant="body" size="sm" color="dim" leading="relaxed">
        BoomTick merch links go to our Printful storefront. These are BoomTick-created products, not affiliate recommendations.
      </Text>
    </Box>
  );
}
