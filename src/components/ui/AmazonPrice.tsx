import { Box, Stack, Text } from '@/layouts/Primitives';
import { useAmazonPrice } from '@/hooks/useAmazonPrice';

interface AmazonPriceProps {
  asin: string;
}

export function AmazonPrice({ asin }: AmazonPriceProps) {
  const { price, loading, error } = useAmazonPrice(asin);

  if (loading) {
    return (
      <Box paddingY={1}>
        <Text variant="mono" size="micro" color="dim" className="animate-pulse">
          Loading live price...
        </Text>
      </Box>
    );
  }

  if (error || !price) {
    return null; // Fallback handled by parent link text usually, or we can show "Check price"
  }

  return (
    <Stack gap={1} marginTop={1}>
      <Text variant="mono" size="micro" color="dim" uppercase className="tracking-tighter opacity-70">
        [Paid Link / Ad]
      </Text>
      <Box display="flex" align="baseline" gap={1}>
        <Text variant="body" size="lg" weight="font-bold" color="accent">
          {price}
        </Text>
        <Text variant="mono" size="micro" color="dim" className="opacity-50">
          (Live)
        </Text>
      </Box>
    </Stack>
  );
}
