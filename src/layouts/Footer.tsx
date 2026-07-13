import { Box, Stack, Text } from './Primitives';
import { ActionButton } from '../components/ui/ActionButton';
import { NavLink } from 'react-router-dom';
import { DISCLOSURE_TEXT } from '../components/ui/AffiliateDisclosure';
import { formatRelativeTime } from '../lib/utils';
import { useEffect, useState } from 'react';

export function Footer() {
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    // Only set on client to avoid hydration mismatch
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLastUpdated(formatRelativeTime(import.meta.env.VITE_BUILD_TIME));
  }, []);

  const legalLinks = [
    { label: 'Privacy', to: '/about#privacy' },
    { label: 'Terms', to: '/about#terms' },
  ];

  const appVersion = import.meta.env.VITE_APP_VERSION || '0.0.0';
  const commitSha = import.meta.env.VITE_COMMIT_SHA || 'dev';
  const isDev = import.meta.env.DEV;

  return (
    <Box as="footer" marginTop="auto" width="full">
      <Box paddingTop={12} paddingBottom={16} paddingX={4} surface="bg" border="t" opacityVariant="heavy">

      <Stack direction={{ base: 'col', sm: 'row' }} justify="between" align="center" gap={4}>
        <Stack direction="row" align="center" gap={3} wrap>
          <Text variant="mono" size="tiny" color="dim" weight="font-semibold" tracking="widest" shrink={0} data-testid="footer-copyright">
            © 2026 BOOMTICK.BLOG
          </Text>
          <Box display={{ base: 'none', md: 'block' }} width="px" height={3} className="bg-white/10" />
          <Text size="micro" color="dim" opacityVariant="heavy" className="hover:opacity-100 transition-opacity whitespace-nowrap" data-testid="footer-version-info">
            <Text variant="mono" tracking="wider" uppercase>
              {isDev ? 'dev' : `v${appVersion}`} (
              <Box
                as="a"
                href={`https://github.com/arii/tech-dancer/commit/${commitSha}`}
                target="_blank"
                rel="noopener noreferrer"
                display="inline-block"
                paddingY={{ base: 4, sm: 0 }}
                className="hover:text-accent transition-colors underline decoration-line/40"
              >
                {commitSha.substring(0, 7)}
              </Box>
              )
            </Text>
            {lastUpdated && ` · Last updated ${lastUpdated}`}
          </Text>
        </Stack>

        <Box>
          <Text variant="body" size="xs" color="dim" weight="font-medium" opacityVariant="heavy" italic={false}>
            {DISCLOSURE_TEXT}
          </Text>
        </Box>

        <Stack direction="row" gap={2} align="center">
          {legalLinks.map((link) => (
            <ActionButton
              key={link.label}
              as={NavLink}
              to={link.to}
              variant="ghost"
              paddingX={{ base: 4, md: 3 }}
              paddingY={{ base: 5, md: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Text
                variant="mono"
                size="xs"
                uppercase
                weight="font-bold"
                tracking="widest"
              >
                {link.label}
              </Text>
            </ActionButton>
          ))}
        </Stack>
      </Stack>
      </Box>
    </Box>
  );
}
