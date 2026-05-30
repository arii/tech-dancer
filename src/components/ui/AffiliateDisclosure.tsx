import { Box, Text } from '@/layouts/Primitives';

interface AffiliateDisclosureProps {
  compact?: boolean;
  provider?: 'amazon' | 'generic';
}

export const DISCLOSURE_TEXT = 'Disclosure: This post may include affiliate links. BoomTick may earn a commission if you purchase through them.';
export const AMAZON_DISCLOSURE = 'Disclosure: As an Amazon Associate, BoomTick may earn from qualifying purchases.';

const COMPACT_TEXT = 'Affiliate Disclosure';

export function AffiliateDisclosure({ compact = false, provider = 'amazon' }: AffiliateDisclosureProps) {
  const text = compact ? COMPACT_TEXT : (provider === 'amazon' ? AMAZON_DISCLOSURE : DISCLOSURE_TEXT);

  return (
    <Box
      paddingX={5}
      paddingY={4}
      marginY={8}
      surface="surface"
      radius="lg"
      border
      className="border-line/40 bg-surface/20"
    >
      <Text
        size="sm"
        color="dim"
        weight="font-medium"
        className="leading-relaxed opacity-80"
      >
        {text}
      </Text>
    </Box>
  );
}
