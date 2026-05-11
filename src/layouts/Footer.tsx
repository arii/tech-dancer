import { Box, Stack, Text, Button } from '@/layouts/Primitives';
import { BrandIcon } from '@/components/ui/BrandIcon';
import { NewsletterBanner } from '@/features/email-capture/NewsletterBanner';
import { Link } from 'react-router-dom';

export function Footer() {
  const legalLinks = [
    { label: 'Contact', to: '/contact' },
    { label: 'Privacy', to: '/about#privacy' },
    { label: 'Terms', to: '/about#terms' },
  ];

  return (
    <Box as="footer" marginTop="auto" width="full">
      <NewsletterBanner />
      <Box paddingY={12} paddingX={4} surface="bg" border="t" opacity={80}>

      <Stack direction={{ base: 'col', sm: 'row' }} justify="between" align="center" gap={4}>
        <Stack direction="row" align="center" gap={2}>
          <BrandIcon className="w-4 h-4 opacity-50" />
          <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase className="tracking-widest" data-testid="footer-copyright">
            © 2026 BOOMTICK.BLOG
          </Text>
        </Stack>
        <Stack direction="row" gap={2} align="center">
          {legalLinks.map((link) => (
            <Button
              key={link.label}
              as={Link}
              to={link.to}
              variant="ghost"
              size="sm"
              className="text-text-dim hover:text-accent hover:bg-accent/5 border border-transparent hover:border-accent/20 transition-all active:scale-95"
            >
              <Text
                variant="mono"
                size="xs"
                uppercase
                weight="font-semibold"
                className="tracking-widest"
              >
                {link.label}
              </Text>
            </Button>
          ))}
        </Stack>
      </Stack>
      </Box>
    </Box>
  );
}
