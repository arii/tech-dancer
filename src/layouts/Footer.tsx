import { Box, Stack, Text } from '@/layouts/Primitives';
import { ActionButton } from '@/components/ui/ActionButton';
import { NavLink } from 'react-router-dom';
import { DISCLOSURE_TEXT } from '@/components/ui/AffiliateDisclosure';
import { formatRelativeTime } from '@/lib/utils';
import { useEffect, useState } from 'react';

export function Footer() {
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    // Only set on client to avoid hydration mismatch
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLastUpdated(formatRelativeTime(import.meta.env.VITE_BUILD_TIME));
  }, []);

  const legalLinks = [
    { label: 'Contact', to: '/contact' },
    { label: 'Privacy', to: '/about#privacy' },
    { label: 'Terms', to: '/about#terms' },
  ];

  const appVersion = import.meta.env.VITE_APP_VERSION || '0.0.0';
  const commitSha = import.meta.env.VITE_COMMIT_SHA || 'dev';
  const isDev = import.meta.env.DEV;

  return (
    <Box as="footer" marginTop="auto" width="full">
      <Box paddingY={12} paddingX={4} surface="bg" border="t" opacity={80}>

      <Stack direction={{ base: 'col', sm: 'row' }} justify="between" align="center" gap={4}>
        <Stack direction="row" align="center" gap={3} wrap>
          <Text variant="mono" size="tiny" color="dim" weight="font-semibold" className="tracking-widest shrink-0" data-testid="footer-copyright">
            © 2026 BOOMTICK.BLOG
          </Text>
          <Box className="hidden md:block w-px h-3 bg-white/10" />
          <Text size="micro" color="dim" className="opacity-80 hover:opacity-100 transition-opacity whitespace-nowrap">
            <span className="font-mono tracking-wider uppercase">
              {isDev ? 'dev' : `v${appVersion}`} (
              <a
                href={`https://github.com/arii/tech-dancer/commit/${commitSha}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors underline decoration-white/20 underline-offset-2"
              >
                {commitSha.substring(0, 7)}
              </a>
              )
            </span>
            {lastUpdated && ` · Last updated ${lastUpdated}`}
          </Text>
        </Stack>

        <Box>
          <Text variant="body" size="xs" color="dim" weight="font-medium" className="not-italic opacity-80">
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
              paddingX={3}
              paddingY={{ base: 4, md: 1.5 }}
              className="active:scale-95"
            >
              <Text
                variant="mono"
                size="xs"
                uppercase
                weight="font-bold"
                className="tracking-widest"
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
