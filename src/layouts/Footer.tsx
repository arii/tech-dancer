import { Box, Stack, Text } from '@/layouts/Primitives';
import { NewsletterBanner } from '@/features/email-capture/NewsletterBanner';
import { ActionButton } from '@/components/ui/ActionButton';

export function Footer() {
  const legalLinks = [
    { label: 'Contact', href: import.meta.env.BASE_URL + 'contact' },
    { label: 'Privacy', href: import.meta.env.BASE_URL + 'about#privacy' },
    { label: 'Terms', href: import.meta.env.BASE_URL + 'about#terms' },
  ];

  return (
    <Box as="footer" marginTop="auto" width="full">
      <NewsletterBanner />
      <Box paddingY={12} paddingX={4} surface="bg" border="t" opacity={80}>

      <Stack direction={{ base: 'col', sm: 'row' }} justify="between" align="center" gap={4}>
        <Stack direction="row" align="center" gap={4}>
          <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase className="tracking-widest" data-testid="footer-copyright">
            © 2026 BOOMTICK.BLOG
          </Text>
          <Box className="hidden md:block w-px h-3 bg-white/10" />
        </Stack>
        <Stack direction="row" gap={2} align="center">
          {legalLinks.map((link) => (
            <ActionButton
              key={link.label}
              as="a"
              href={link.href}
              variant="ghost"
              paddingX={3}
              paddingY={1.5}
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
