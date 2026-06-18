import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { ActionButton } from '@/components/ui/ActionButton';
import { NavLink, Link } from 'react-router-dom';
import { DISCLOSURE_TEXT } from '@/components/ui/AffiliateDisclosure';
import { Github, Instagram, Linkedin, Youtube, ExternalLink } from 'lucide-react';
import { Icon } from '@/components/ui/Icon';
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
    { label: 'Privacy', to: '/about#privacy' },
    { label: 'Terms', to: '/about#terms' },
  ];

  const appVersion = import.meta.env.VITE_APP_VERSION || '0.0.0';
  const commitSha = import.meta.env.VITE_COMMIT_SHA || 'dev';
  const isDev = import.meta.env.DEV;

  const footerLinks = {
    Explore: [
      { label: 'Blog', to: '/blog' },
      { label: 'Guides', to: '/blog?category=Guides' },
      { label: 'Events', to: '/blog?category=Events' },
      { label: 'Travel', to: '/blog?category=Travel' },
      { label: 'About', to: '/about' },
    ],
    Topics: [
      { label: 'Gear', to: '/blog?category=Gear' },
      { label: 'Dance', to: '/blog?category=Dance' },
      { label: 'Lifestyle', to: '/blog?category=Lifestyle' },
      { label: 'Resources', to: '/blog?category=Resources' },
    ],
    Social: [
      { label: 'GitHub', href: 'https://github.com/arii', icon: Github },
      { label: 'Instagram', href: 'https://instagram.com/arii', icon: Instagram },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/arii', icon: Linkedin },
      { label: 'YouTube', href: 'https://youtube.com/@arii', icon: Youtube },
    ]
  };

  return (
    <Box as="footer" marginTop="auto" width="full" border="t" borderColor="line/20">
      <Box paddingX={4} paddingY={16} maxWidth="7xl" marginX="auto" width="full">
        <Grid cols={{ base: 1, md: 2, lg: 4 }} gap={12}>
          <Stack gap={6}>
            <Text variant="mono" size="sm" weight="font-black" tracking="widest">
              BOOM<span className="text-accent">TICK</span>.BLOG
            </Text>
            <Text variant="body" size="sm" color="dim" leading="relaxed">
              Research and innovation in dance technology, gear reviews, and West Coast Swing community resources.
            </Text>
          </Stack>

          <Stack gap={6}>
            <Text variant="mono" size="xs" weight="font-black" color="main" uppercase tracking="widest">
              Explore
            </Text>
            <Stack gap={3}>
              {footerLinks.Explore.map(link => (
                <Link key={link.label} to={link.to} className="text-text-dim hover:text-accent transition-colors text-sm">
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Stack>

          <Stack gap={6}>
            <Text variant="mono" size="xs" weight="font-black" color="main" uppercase tracking="widest">
              Topics
            </Text>
            <Stack gap={3}>
              {footerLinks.Topics.map(link => (
                <Link key={link.label} to={link.to} className="text-text-dim hover:text-accent transition-colors text-sm">
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Stack>

          <Stack gap={6}>
            <Text variant="mono" size="xs" weight="font-black" color="main" uppercase tracking="widest">
              Connect
            </Text>
            <Stack gap={3}>
              {footerLinks.Social.map(link => (
                <Stack
                  key={link.label}
                  as="a"
                  direction="row"
                  align="center"
                  gap={2}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-dim hover:text-accent transition-colors text-sm"
                >
                  <Icon icon={link.icon} size="sm" />
                  {link.label}
                  <Box as={ExternalLink} width={3} height={3} className="opacity-30" />
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Grid>
      </Box>

      <Box paddingY={12} paddingX={4} surface="bg" border="t" borderColor="line/10" opacityVariant="heavy">

      <Stack direction={{ base: 'col', sm: 'row' }} justify="between" align="center" gap={8}>
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
