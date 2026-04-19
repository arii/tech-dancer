import { Box, Stack, Text } from '@/components/layout/Primitives';

export function Footer() {
  const legalLinks = [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <Box as="footer" border="t" paddingY={12} paddingX={4} surface="bg" className="opacity-80 border-line" marginTop={32}>
      <Stack direction={{ base: 'col', sm: 'row' }} justify="between" align="center" gap={4}>
        <Text variant="mono" size="micro" color="dim" uppercase tracking="widest">
          © 2026 TECH-DANCER
        </Text>
        <Stack direction="row" gap={8} align="center">
          {legalLinks.map((link) => (
            <Text 
              key={link.label}
              as="a" 
              href={link.href}
              variant="mono" 
              size="micro" 
              color="dim"
              uppercase 
              tracking="widest"
              className="hover:text-accent transition-colors"
            >
              {link.label}
            </Text>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
