import { Box, Stack, Text } from '@/layouts/Primitives';
import { ActionButton } from '@/components/ui/ActionButton';
import { NavLink } from 'react-router-dom';
import { DISCLOSURE_TEXT } from '@/components/ui/AffiliateDisclosure';
import { SITE_METADATA } from '@/config/content';

export function Footer() {
  const policyLinks = [
    { label: 'Home', to: '/' },
    { label: 'Shipping', to: '/shipping' },
    { label: 'Returns', to: '/return-policy' },
    { label: 'Privacy', to: '/privacy' },
    { label: 'Terms', to: '/terms' },
    { label: 'Contact', to: '/about#contact' },
  ];


  return (
    <Box as="footer" marginTop="auto" width="full">
      <Box paddingTop={{ base: 8, md: 12 }} paddingBottom={{ base: 8, md: 16 }} surface="bg" border="t" opacityVariant="heavy">
        <Stack gap={6}>
          {/* Contact & Business Info */}
          <Stack direction={{ base: 'col', md: 'row' }} justify="between" align={{ base: 'start', md: 'center' }} gap={4} id="footer-contact" scrollMarginTop={24}>
            <Stack gap={1}>
              <Text as="p" size="2xl" color="main" weight="font-bold" className="font-serif">
                BoomTick
              </Text>
              <Text variant="body" size="sm" color="dim" display={{ base: 'none', md: 'block' }} className="italic">
                {SITE_METADATA.description}
              </Text>
              <Text variant="body" size="xs" color="dim">
                San Francisco, CA, USA · Official Support:{' '}
                <Box
                  as="a"
                  href="mailto:ari@boomtick.blog"
                  className="text-brand-cyan hover:underline font-semibold"
                >
                  ari@boomtick.blog
                </Box>
              </Text>
            </Stack>

            {/* Mandated Standalone Footer Policy Pages */}
            <Stack direction="row" gap={{ base: 1, md: 2 }} align="center" wrap>
              {policyLinks.map((link) => (
                <ActionButton
                  key={link.label}
                  as={NavLink}
                  to={link.to}
                  variant="ghost"
                  paddingX={{ base: 2, md: 3 }}
                  paddingY={2}
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

          <Stack direction={{ base: 'col', sm: 'row' }} justify="between" align="center" gap={4}>
            <Stack direction="row" align="center" gap={3} wrap>
              <Text variant="mono" size="tiny" color="dim" weight="font-semibold" tracking="widest" shrink={0} data-testid="footer-copyright">
                © 2026 BOOMTICK.BLOG
              </Text>
            </Stack>

            <Box
              paddingX={4}
              paddingY={2}
              radius="md"
              border
              className="border-line/20 bg-surface-alt/10"
            >
              <Stack gap={2}>
                <Text variant="body" size="xs" color="dim" weight="font-semibold" opacityVariant="solid" italic={false}>
                  {DISCLOSURE_TEXT}
                </Text>
                <Text variant="body" size="xs" color="dim" weight="font-semibold" opacityVariant="solid" italic={false}>
                  BoomTick Merch and Ariel Anders Consulting are independently operated by Ariel Anders.
                </Text>
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
