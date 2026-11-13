import { useEffect, useRef } from 'react';
import { Box, Text } from '@/layouts/Primitives';
import { getAdSenseClient, type AdPlacement } from '@/lib/ads/adSenseConfig';
import { useAdConsent } from '@/hooks/useAdConsent';

interface AdSlotProps {
  placement: AdPlacement;
}

/**
 * Reserved heights per placement keep the layout stable while the async
 * loader fetches a creative.
 */
const SLOT_HEIGHT: Record<AdPlacement, string> = {
  'in-article': 'min-h-40 md:min-h-52',
  sidebar: 'min-h-64',
  listing: 'min-h-32',
};

/**
 * Renders an AdSense ad unit for the given placement.
 * Renders nothing (no script, no markup, no reserved space) while
 * VITE_ADSENSE_CLIENT is unset or consent has not resolved.
 */
export function AdSlot({ placement }: AdSlotProps) {
  const client = getAdSenseClient();
  const consent = useAdConsent();
  const pushedRef = useRef(false);

  useEffect(() => {
    if (!client || consent === null || pushedRef.current) return;
    pushedRef.current = true;
    const queue = (window.adsbygoogle = window.adsbygoogle || []);
    queue.push({});
  }, [client, consent]);

  if (!client || consent === null) return null;

  return (
    <Box
      as="aside"
      aria-label="Advertisement"
      width="full"
      padding={3}
      surface="card"
      border
      radius="sm"
      className="overflow-hidden"
    >
      <Text variant="mono" size="tiny" weight="font-bold" color="dim" tracking="widest" marginBottom={2} display="block">
        ADVERTISEMENT
      </Text>
      <ins
        className={`adsbygoogle block w-full ${SLOT_HEIGHT[placement]}`}
        data-ad-client={client}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </Box>
  );
}
