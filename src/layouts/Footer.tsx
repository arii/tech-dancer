import { Box, Stack, Text, Button } from '@/layouts/Primitives';

export function Footer() {
  const legalLinks = [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <Box as="footer" paddingY={12} paddingX={4} surface="bg" className="opacity-80 border-t border-slate-200" marginTop={32}>
      <Stack direction={{ base: 'col', sm: 'row' }} justify="between" align="center" gap={4}>
        <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase className="tracking-[0.15em]">
          © 2026 TECH-DANCER
        </Text>
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
                className="tracking-[0.15em]"
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
