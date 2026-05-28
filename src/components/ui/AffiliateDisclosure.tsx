import { Box, Text } from '@/layouts/Primitives';

interface AffiliateDisclosureProps {
  type?: 'gear' | 'event' | 'blog';
  compact?: boolean;
}

const DISCLOSURE_TEXT = {
  gear: 'Disclosure: Some gear links are Amazon affiliate links. As an Amazon Associate, I earn from qualifying purchases at no extra cost to you.',
  event: 'Disclosure: Some event guide product links are Amazon affiliate links. As an Amazon Associate, I earn from qualifying purchases at no extra cost to you.',
  blog: 'Disclosure: Some links may be Amazon affiliate links. As an Amazon Associate, I earn from qualifying purchases at no extra cost to you.',
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
