import { Box, Stack, Text } from '@/layouts/Primitives';
import { Megaphone } from 'lucide-react';

/**
 * Advertising disclosure card for the Privacy page: what AdSense collects,
 * the non-personalized default, and how the visitor changes their choice.
 */
export function AdvertisingDisclosure() {
  return (
    <Box padding={{ base: 6, md: 8 }} radius="md" border surface="card">
      <Stack gap={4}>
        <Stack direction="row" align="center" gap={3}>
          <Box padding={2} radius="md" className="bg-accent/10 text-accent">
            <Megaphone className="w-5 h-5" />
          </Box>
          <Text variant="headline" size="lg" weight="font-bold" tracking="tight">
            Advertising
          </Text>
        </Stack>
        <Stack gap={3}>
          <Text variant="body" size="base" color="dim" leading="relaxed" className="text-pretty">
            BoomTick displays ads through Google AdSense. When advertising is active, Google and its
            partners may use cookies to serve ads based on your prior visits to this or other websites.
          </Text>
          <Text variant="body" size="base" color="dim" leading="relaxed" className="text-pretty">
            Ads on BoomTick are non-personalized by default. Personalized ads are served only after you
            accept them in the on-site consent banner; declining keeps ads non-personalized. You can
            change your choice at any time by clearing the site&apos;s local storage in your browser, and
            you can opt out of personalized advertising entirely via Google&apos;s Ads Settings.
          </Text>
          <Text variant="body" size="base" color="dim" leading="relaxed" className="text-pretty">
            Third-party vendors, including Google, also use cookies to serve ads based on your visits.
            See Google&apos;s Advertising &amp; Privacy policy for details on how that data is used.
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
}
