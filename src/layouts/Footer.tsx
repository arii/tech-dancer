import { Box, Stack, Text, Button } from '@/layouts/Primitives';

export function Footer() {
  const legalLinks = [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Contact', href: import.meta.env.BASE_URL + 'contact' },
  ];

  return (
    <Box as="footer" paddingY={12} paddingX={4} surface="bg" className="opacity-80 border-t border-line mt-auto">
      <Stack direction={{ base: 'col', sm: 'row' }} justify="between" align="center" gap={4}>
        <Box className="flex items-center gap-3">
          <img src="/favicon.ico" alt="Boom Tick" className="h-4 w-4 rounded-sm object-contain" />
          <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase className="tracking-widest">
            © 2026 Boom Tick
          </Text>
        </Box>
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
