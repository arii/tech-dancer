import { Box, Stack, Text, Button } from '@/layouts/Primitives';
import { getAdSenseClient } from '@/lib/ads/adSenseConfig';
import { setAdConsent } from '@/lib/ads/adConsentStore';
import { useAdConsent } from '@/hooks/useAdConsent';

/**
 * Minimal ad-personalization consent banner.
 * Both choices resolve the ad gate: accept enables personalized ads,
 * decline keeps ads non-personalized. No preference means no ad script.
 */
export function ConsentBanner() {
  const consent = useAdConsent();

  if (getAdSenseClient() === undefined || consent !== null) return null;

  return (
    <Box
      as="aside"
      aria-label="Ads personalization consent"
      position="fixed"
      bottom={4}
      left={4}
      right={4}
      zIndex="toast"
      width="auto"
      maxWidth="lg"
      marginX="auto"
      padding={6}
      surface="card"
      border
      radius="md"
      shadow="standard"
    >
      <Stack gap={4}>
        <Text variant="body" size="sm" color="dim">
          We use Google AdSense to keep BoomTick free. Ads are non-personalized by
          default; allow personalized ads to help support the site.
        </Text>
        <Stack direction="row" gap={3} justify="end">
          <Button size="sm" variant="outline" onClick={() => setAdConsent('denied')}>
            Decline
          </Button>
          <Button size="sm" onClick={() => setAdConsent('granted')}>
            Accept
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
