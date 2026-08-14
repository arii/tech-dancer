import { Box, Text } from '@/layouts/Primitives';

interface AffiliateDisclosureProps {
  compact?: boolean;
}

export const DISCLOSURE_TEXT = 'As an Amazon Associate, I earn from qualifying purchases.';

const COMPACT_TEXT = 'As an Amazon Associate, I earn from qualifying purchases.';

export function AffiliateDisclosure({ compact = false }: AffiliateDisclosureProps) {
  const text = compact ? COMPACT_TEXT : DISCLOSURE_TEXT;

  return (
    <Box
      paddingX={4}
      paddingY={3}
      surface="muted"
      radius="md"
      border
      className="border-line/40 inline-block bg-surface-alt/30"
    >
      <Text
        variant="body"
        size="sm"
        color="dim"
        weight="font-semibold"
        className="not-italic leading-relaxed text-text-dim/90"
      >
        {text}
      </Text>
    </Box>
  );
}
