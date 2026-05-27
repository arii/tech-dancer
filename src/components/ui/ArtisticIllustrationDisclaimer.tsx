import { Box, Stack, Text } from '@/layouts/Primitives';

interface ArtisticIllustrationDisclaimerProps {
  compact?: boolean;
}

/**
 * Disclaimer for custom sketch/artistic illustrations used in place of
 * official product photos. Ensures transparency with FTC and affiliate networks.
 * 
 * Place immediately below sketch images in gear pages.
 */
export function ArtisticIllustrationDisclaimer({ compact = false }: ArtisticIllustrationDisclaimerProps) {
  if (compact) {
    return (
      <Stack marginTop={2}>
        <Text variant="body" size="xs" color="dim" className="italic">
          Product image shown is an artistic illustration. Actual product appearance may vary slightly.
        </Text>
      </Stack>
    );
  }

  return (
    <Box paddingX={4} paddingY={2} marginY={4} className="bg-surface-alt/40 border-l-2 border-accent/40">
      <Text
        variant="body"
        size="xs"
        color="dim"
        className="italic"
      >
        ℹ️ Product image shown is an artistic illustration. Actual product appearance may vary slightly. See official photos in the "Where to Buy" section below.
      </Text>
    </Box>
  );
}
