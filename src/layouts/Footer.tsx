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
    const buildTime = import.meta.env.VITE_BUILD_TIME;
    if (buildTime) {
      setLastUpdated(formatRelativeTime(new Date(buildTime)));
    }
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
      <Box paddingY={16} paddingX={6} surface="bg" border="t" className="border-line/30">

      <Stack direction={{ base: 'col', lg: 'row' }} justify="between" align={{ base: 'start', lg: 'center' }} gap={8}>
        <Stack direction="col" align="start" gap={4}>
          <Text size="sm" weight="font-bold" className="tracking-tight shrink-0" data-testid="footer-copyright">
            © 2026 BOOMTICK
          </Text>

          <Stack direction="row" align="center" gap={3} wrap>
          <Text size="xs" color="dim" display="flex" align="center" gap={2} className="whitespace-nowrap">
              <span className="opacity-50">
                {isDev ? 'Development' : `Version ${appVersion}`}
              </span>
            <Box width={1} height={1} radius="full" surface="line" />
              <Box
                as="a"
                href={`https://github.com/arii/tech-dancer/commit/${commitSha}`}
                target="_blank"
                rel="noopener noreferrer"
                display="inline-block"
                className="hover:text-accent transition-colors underline decoration-white/10 underline-offset-4 font-mono opacity-50 hover:opacity-100"
              >
                {commitSha.substring(0, 7)}
              </Box>
              {lastUpdated && (
                <>
                  <Box className="w-1 h-1 rounded-full bg-line" />
                  <span className="opacity-50">Built {lastUpdated}</span>
                </>
              )}
            </Text>
          </Stack>
        </Stack>

        <Box maxWidth="xl" className="lg:text-center">
          <Text variant="sans" size="tiny" color="dim" className="leading-relaxed opacity-40">
            {DISCLOSURE_TEXT}
          </Text>
        </Box>

        <Stack direction="row" gap={1} align="center" marginX={-3}>
          {legalLinks.map((link) => (
            <ActionButton
              key={link.label}
              as={NavLink}
              to={link.to}
              variant="ghost"
              paddingX={3}
              paddingY={2}
              className="active:scale-95 text-xs font-semibold text-text-dim hover:text-accent transition-colors"
            >
              {link.label}
            </ActionButton>
          ))}
        </Stack>
      </Stack>
      </Box>
    </Box>
  );
}
