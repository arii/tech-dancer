import { Box, Text } from '@/layouts/Primitives';

interface AffiliateDisclosureProps {
  type?: 'gear' | 'event' | 'blog';
  compact?: boolean;
}

const DISCLOSURE_TEXT = {
  gear: 'As an Amazon Associate, I earn a small commission from qualifying purchases made through the links below at no extra cost to you. This helps support my blog!',
  event: 'As an Amazon Associate, I earn a small commission from qualifying purchases made through the links below at no extra cost to you. This helps support my event guides!',
  blog: 'As an Amazon Associate, I earn a small commission from qualifying purchases made through the links below at no extra cost to you. This helps support my content!',
};

const COMPACT_TEXT = '[Paid Links]';

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
