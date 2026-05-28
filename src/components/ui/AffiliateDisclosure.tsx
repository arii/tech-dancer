import { Box, Text } from '@/layouts/Primitives';

interface AffiliateDisclosureProps {
  type?: 'gear' | 'event' | 'blog';
  compact?: boolean;
}

const DISCLOSURE_TEXT = {
  gear: 'As an Amazon Associate I earn from qualifying purchases.',
  event: 'As an Amazon Associate I earn from qualifying purchases.',
  blog: 'As an Amazon Associate I earn from qualifying purchases.',
};

const COMPACT_TEXT = 'Amazon affiliate link';

export function AffiliateDisclosure({ type = 'gear', compact = false }: AffiliateDisclosureProps) {
  const text = compact ? COMPACT_TEXT : DISCLOSURE_TEXT[type];

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
