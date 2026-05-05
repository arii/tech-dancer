import { Box, Stack, Text, Button } from '@/layouts/Primitives';
import { BrandIcon } from '@/components/ui/BrandIcon';

export function Footer() {
  const legalLinks = [
    { label: 'Privacy', href: '#privacy' },
    { label: 'Terms', href: '#terms' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <Box as="footer" paddingY={12} paddingX={4} surface="bg" className="opacity-80 border-t border-line mt-auto">
      <Stack direction={{ base: 'col', sm: 'row' }} justify="between" align="center" gap={4}>
        <Stack direction="row" align="center" gap={2}>
          <BrandIcon className="w-4 h-4 opacity-50" />
          <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase className="tracking-widest">
            © 2026 BOOMTICK.BLOG
          </Text>
        </Stack>
        <Stack direction="row" gap={2} align="center">
          {legalLinks.map((link) => (
            <Button
              key={link.label}
              as="a"
              href={link.href}
              variant="ghost"
              size="sm"
              className="text-text-dim hover:text-accent"
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
  );
}
