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
      paddingY={2}
      marginY={6}
      surface="muted"
      radius="sm"
      border
      className="border-line/30 inline-block"
    >
      <Text
        variant="body"
        size="sm"
        color="dim"
        weight="font-medium"
        className="italic"
      >
        {text}
      </Text>
    </Box>
  );
}
