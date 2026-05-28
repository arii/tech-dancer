import { Box, Text } from '@/layouts/Primitives';

interface AffiliateDisclosureProps {
  compact?: boolean;
}

export const DISCLOSURE_TEXT = 'As an Amazon Associate, this page contains affiliate links. We earn a commission if you make a purchase.';

const COMPACT_TEXT = 'Amazon affiliate link';

export function AffiliateDisclosure({ compact = false }: AffiliateDisclosureProps) {
  const text = compact ? COMPACT_TEXT : DISCLOSURE_TEXT;

  return (
    <Box
      paddingX={6}
      paddingY={3}
      marginY={6}
      surface="muted"
      radius="sm"
      border
      className="border-line/30"
    >
      <Text
        variant="body"
        size="sm"
        color="body"
        weight="font-medium"
        className="not-italic"
      >
        {text}
      </Text>
    </Box>
  );
}
