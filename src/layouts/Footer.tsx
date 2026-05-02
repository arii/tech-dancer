import { Box, Stack, Text } from '@/layouts/Primitives';
import { NavLink } from 'react-router-dom';

export function Footer() {
  const contentLinks = [
    { label: 'Home', href: '/' },
    { label: 'Blog Posts', href: '/blog' },
    { label: 'Gear Reviews', href: '/gear' },
    { label: 'Research', href: '/research' },
  ];

  const legalLinks = [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
  ];

  const connectLinks = [
    { label: 'Contact', href: '/contact' },
    { label: 'Twitter', href: 'https://twitter.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
  ];

  return (
    <Box as="footer" paddingY={{ base: 12, md: 16 }} paddingX={{ base: 4, md: 8 }} surface="surface" className="border-t-2 border-line mt-auto shadow-md">
      <Stack direction={{ base: 'col', md: 'row' }} justify="between" gap={12}>
        <Stack gap={4} maxWidth="sm">
          <Text variant="mono" size="lg" weight="font-bold" className="text-accent-navy tracking-wider uppercase">
            TECH-DANCER
          </Text>
          <Text variant="body" size="sm" color="dim">
            The Roboticist's Guide to the West Coast Swing. Bridging engineering precision with dance floor expression.
          </Text>
          <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase className="tracking-widest mt-4">
            © 2026 TECH-DANCER
          </Text>
        </Stack>

        <Stack direction={{ base: 'col', sm: 'row' }} gap={10} className="sm:gap-16">
          <Stack gap={4}>
            <Text variant="mono" size="xs" weight="font-bold" color="brand" tracking="widest" uppercase>Content</Text>
            <Stack gap={2}>
              {contentLinks.map((link) => (
                <Box as={link.href.startsWith('/') ? NavLink : 'a'} to={link.href} href={link.href} key={link.label} className="text-text-dim hover:text-accent transition-colors">
                  <Text variant="sans" size="sm">{link.label}</Text>
                </Box>
              ))}
            </Stack>
          </Stack>

          <Stack gap={4}>
            <Text variant="mono" size="xs" weight="font-bold" color="brand" tracking="widest" uppercase>Connect</Text>
            <Stack gap={2}>
              {connectLinks.map((link) => (
                <Box as={link.href.startsWith('/') ? NavLink : 'a'} to={link.href} href={link.href} key={link.label} className="text-text-dim hover:text-accent transition-colors">
                  <Text variant="sans" size="sm">{link.label}</Text>
                </Box>
              ))}
            </Stack>
          </Stack>

          <Stack gap={4}>
            <Text variant="mono" size="xs" weight="font-bold" color="brand" tracking="widest" uppercase>Legal</Text>
            <Stack gap={2}>
              {legalLinks.map((link) => (
                <Box as="a" href={link.href} key={link.label} className="text-text-dim hover:text-accent transition-colors">
                  <Text variant="sans" size="sm">{link.label}</Text>
                </Box>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
