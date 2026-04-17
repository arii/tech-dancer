import { Box, Stack, Text, Grid, Inline, Icon } from '@/components/layout/Primitives';
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
    <Box as="footer" border="t" paddingTop="2xl" paddingX="xl" surface="default" opacity="80" marginTop="3xl">
      <Stack gap="2xl">
        <Grid cols={{ base: 1, md: 2, lg: 3 }} gap="xl">
          <Stack gap="md">
            <Text variant="display" size="sm" weight="font-black" uppercase tracking="widest">
              Ariel Anders
            </Text>
            <Text variant="body" size="base" color="dim">
              Interdisciplinary research at the intersection of robotics, data science, and West Coast Swing. Improving the social dance experience through systems optimization.
            </Text>
          </Stack>

          <Stack gap="lg">
            <Text variant="system" size="micro" color="brand" uppercase tracking="widest">CON_CHANNELS</Text>
            <Stack gap="sm">
              {socialLinks.map((link) => (
                <Inline 
                  key={link.label}
                  as="a"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  gap="md"
                  align="center"
                  className="group"
                >
                  <Icon icon={link.icon} size="sm" color="dim" className="group-hover:text-accent-brand transition-colors" />
                  <Text variant="mono" size="xs" weight="font-bold" color="dim" uppercase tracking="wider" className="group-hover:text-accent-brand transition-colors">
                    {link.label}
                  </Text>
                </Inline>
              ))}
            </Stack>
          </Stack>

          <Stack gap="lg">
            <Text variant="system" size="micro" color="brand" uppercase tracking="widest">SYSTEM_INFO</Text>
            <Stack gap="sm">
              <Text variant="mono" size="xs" color="dim">LOCATION: SF // CA</Text>
              <Text variant="mono" size="xs" color="dim">STATUS: OPTIMIZED</Text>
              <Text variant="mono" size="xs" color="dim">LAST_UPDATE: 2026.04.17</Text>
            </Stack>
          </Stack>
        </Grid>

        <Box border="t" paddingTop="lg">
          <Box display="flex" flexDirection={{ base: "column", sm: "row" }} justifyContent="between" alignItems="center" gap="lg">
            <Text variant="micro" color="dim" uppercase tracking="widest">
              © 2026 ARIEL_ANDERS // ALL_SYSTEMS_OPERATIONAL
            </Text>
            <Inline gap="xl">
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
            </Inline>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
