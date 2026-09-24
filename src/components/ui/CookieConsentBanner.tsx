import { Box, Stack, Text } from '@/layouts/Primitives';
import { ActionButton } from '@/components/ui/ActionButton';
import { usePrivacyConsent } from '@/lib/hooks/usePrivacyConsent';
import { ShieldCheck, Lock, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export function CookieConsentBanner() {
  const {
    isBannerOpen,
    hasOptOutSignal,
    gpcActive,
    dntActive,
    grantConsent,
    denyConsent,
    closeBanner,
  } = usePrivacyConsent();

  if (!isBannerOpen) return null;

  return (
    <Box
      as="aside"
      position="fixed"
      bottom={0}
      left={0}
      width="full"
      padding={4}
      aria-label="Cookie and Privacy Consent Banner"
      className="z-50 pointer-events-none"
    >
      <Box
        marginX="auto"
        maxWidth="screen-lg"
        padding={{ base: 4, sm: 5 }}
        radius="lg"
        border
        surface="card"
        className="pointer-events-auto border-accent/30 shadow-2xl bg-surface/95 backdrop-blur-md"
      >
        <Stack gap={4}>
          <Stack direction="row" align="start" justify="between" gap={3}>
            <Stack direction="row" align="center" gap={2.5}>
              <Box padding={1.5} radius="md" className="bg-accent/15 text-accent shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </Box>
              <Text variant="mono" size="xs" weight="font-bold" uppercase tracking="wider" color="main">
                Privacy & Cookie Consent
              </Text>
            </Stack>

            <Box
              as="button"
              type="button"
              onClick={closeBanner}
              padding={1}
              radius="md"
              aria-label="Close consent banner"
              className="text-text-dim hover:text-text-main hover:bg-line/20 transition-colors"
            >
              <X className="w-4 h-4" />
            </Box>
          </Stack>

          {hasOptOutSignal ? (
            <Stack gap={3}>
              <Stack direction="row" align="center" gap={2}>
                <Lock className="w-4 h-4 text-accent shrink-0" />
                <Text variant="body" size="xs" color="main" weight="font-semibold">
                  Privacy Signal Detected: {gpcActive ? 'Global Privacy Control (GPC)' : ''} {gpcActive && dntActive ? 'and' : ''} {dntActive ? 'Do Not Track (DNT)' : ''}
                </Text>
              </Stack>
              <Text variant="body" size="xs" color="dim" leading="relaxed">
                Your browser privacy signal is active. BoomTick has automatically disabled non-essential analytics tracking in compliance with your browser settings.
              </Text>
            </Stack>
          ) : (
            <Text variant="body" size="xs" color="dim" leading="relaxed">
              We use minimal, privacy-respecting analytics to understand site usage and improve our services. We do not sell your personal information. Read our{' '}
              <Box
                as={NavLink}
                to="/privacy"
                className="text-accent underline font-medium hover:text-accent-sky"
              >
                Privacy Policy
              </Box>{' '}
              for details.
            </Text>
          )}

          <Stack direction={{ base: 'col', sm: 'row' }} justify="end" align="center" gap={3} paddingTop={1} className="border-t border-line/20">
            <Box
              as={NavLink}
              to="/privacy"
              className="text-xs text-text-dim hover:text-text-main underline font-mono uppercase tracking-wider"
            >
              Privacy Policy & Rights
            </Box>

            <Stack direction="row" gap={2} width={{ base: 'full', sm: 'auto' }}>
              <ActionButton
                type="button"
                variant="secondary"
                paddingX={4}
                paddingY={2}
                radius="md"
                flex={{ base: 1, sm: 'none' }}
                className="min-h-9"
                onClick={denyConsent}
              >
                Opt-Out / Decline
              </ActionButton>
              <ActionButton
                type="button"
                variant="primary"
                paddingX={4}
                paddingY={2}
                radius="md"
                flex={{ base: 1, sm: 'none' }}
                className="min-h-9"
                onClick={grantConsent}
              >
                Accept All
              </ActionButton>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
