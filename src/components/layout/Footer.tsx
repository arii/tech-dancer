import { Box, Stack, Text, Grid } from '@/components/layout/Primitives';
import { Github, Linkedin, Database } from 'lucide-react';

export function Footer() {
  const socialLinks = [
    { icon: Github, label: 'CORE_REPO', href: '#' },
    { icon: Linkedin, label: 'NET_PROTOCOL', href: '#' },
    { icon: Database, label: 'WSDC_DATA', href: '#' },
  ];

  const legalLinks = [
    { label: 'PRIVACY_POLICY', href: '#' },
    { label: 'SYSTEM_TERMS', href: '#' },
    { label: 'PROTOCOL_V1', href: '#' },
  ];

  return (
    <Box as="footer" border="t" paddingTop={12} paddingX={8} surface="default" opacity={80} marginTop={24}>
      <Stack gap={12}>
        <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={12}>
          <Stack gap={4}>
            <Text variant="display" size="sm" weight="font-black" uppercase tracking="widest">
              Ariel Anders
            </Text>
            <Text variant="body" size="base" color="dim">
              Interdisciplinary research at the intersection of robotics, data science, and West Coast Swing. Improving the social dance experience through systems optimization.
            </Text>
          </Stack>

          <Stack gap={6}>
            <Text variant="system" size="micro" color="brand" uppercase tracking="widest">CON_CHANNELS</Text>
            <Stack gap={3}>
              {socialLinks.map((link) => (
                <Box 
                  key={link.label}
                  as="a"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-text-dim hover:text-accent-brand transition-colors group"
                >
                  <link.icon className="w-4 h-4" />
                  <Text variant="mono" size="xs" weight="font-bold" uppercase tracking="wider">
                    {link.label}
                  </Text>
                </Box>
              ))}
            </Stack>
          </Stack>

          <Stack gap={6}>
            <Text variant="system" size="micro" color="brand" uppercase tracking="widest">SYSTEM_INFO</Text>
            <Stack gap={3}>
              <Text variant="mono" size="xs" color="dim">LOCATION: SF // CA</Text>
              <Text variant="mono" size="xs" color="dim">STATUS: OPTIMIZED</Text>
              <Text variant="mono" size="xs" color="dim">LAST_UPDATE: 2026.04.17</Text>
            </Stack>
          </Stack>
        </Grid>

        <Box border="t" paddingTop={8}>
          <Stack direction={{ base: 'col', sm: 'row' }} justify="between" align="center" gap={4}>
            <Text variant="micro" color="dim" uppercase tracking="widest">
              © 2026 ARIEL_ANDERS // ALL_SYSTEMS_OPERATIONAL
            </Text>
            <Stack direction="row" gap={6}>
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
                  className="hover:text-accent transition-colors border-b border-transparent hover:border-accent"
                >
                  {link.label}
                </Text>
              ))}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
