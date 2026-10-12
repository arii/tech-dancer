import { Box, Stack, Grid, Text } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { generateBreadcrumbSchema } from '@/utils/schema';
import { ShieldCheck, Database, Share2, Lock, Mail } from 'lucide-react';
import { useMemo } from 'react';

export default function Privacy() {
  const breadcrumbs = useMemo(() => generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Privacy Policy", path: "/privacy" }
  ]), []);

  return (
    <Box paddingX={{ base: 4, md: 8 }} display="flex" justify="center" data-testid="privacy-policy-page">
      <SEO
        title="Privacy Policy"
        description="BoomTick Privacy Policy detailing data collection, authentication usage, non-sharing guarantees, security measures, and developer contact information."
        schema={breadcrumbs}
      />

      <Stack gap={12} width="full" maxWidth="screen-xl">
        <PageHeader
          label="COMPLIANCE & PRIVACY"
          title="Privacy Policy"
          description="At BoomTick (boomtick.blog), we are committed to respecting your privacy and protecting your personal data. Below is a comprehensive explanation of how we handle authentication details, data security, and communication."
        />

        <Grid cols={{ base: 1, md: 2 }} gap={6} width="full">
          {/* Information We Collect */}
          <Box padding={{ base: 6, md: 8 }} radius="md" border surface="card">
            <Stack gap={4}>
              <Stack direction="row" align="center" gap={3}>
                <Box padding={2} radius="md" className="bg-accent/10 text-accent">
                  <Database className="w-5 h-5" />
                </Box>
                <Text variant="headline" size="lg" weight="font-bold" tracking="tight">
                  Information We Collect
                </Text>
              </Stack>
              <Text variant="body" size="base" color="dim" leading="relaxed" className="text-pretty">
                When you interact with BoomTick or authenticate using Google OAuth, we collect limited personal information necessary to identify you and manage your session. This includes your full name, email address, and profile picture retrieved during the authentication process.
              </Text>
            </Stack>
          </Box>

          {/* How We Use Your Data */}
          <Box padding={{ base: 6, md: 8 }} radius="md" border surface="card">
            <Stack gap={4}>
              <Stack direction="row" align="center" gap={3}>
                <Box padding={2} radius="md" className="bg-accent/10 text-accent">
                  <ShieldCheck className="w-5 h-5" />
                </Box>
                <Text variant="headline" size="lg" weight="font-bold" tracking="tight">
                  How We Use Your Data
                </Text>
              </Stack>
              <Text variant="body" size="base" color="dim" leading="relaxed" className="text-pretty">
                Data retrieved during authentication is used solely for account authentication, verifying user identity, providing account access, and delivering digital operations, web design, and consultation booking services.
              </Text>
            </Stack>
          </Box>

          {/* Data Sharing & Transfer */}
          <Box padding={{ base: 6, md: 8 }} radius="md" border surface="card">
            <Stack gap={4}>
              <Stack direction="row" align="center" gap={3}>
                <Box padding={2} radius="md" className="bg-accent/10 text-accent">
                  <Share2 className="w-5 h-5" />
                </Box>
                <Text variant="headline" size="lg" weight="font-bold" tracking="tight">
                  Data Sharing & Non-Disclosure
                </Text>
              </Stack>
              <Text variant="body" size="base" color="dim" leading="relaxed" className="text-pretty">
                We strictly do not sell, trade, rent, or transfer your authentication data or personal details to outside third parties. Information is used strictly within the BoomTick ecosystem to facilitate your requested interactions.
              </Text>
            </Stack>
          </Box>

          {/* Security Measures */}
          <Box padding={{ base: 6, md: 8 }} radius="md" border surface="card">
            <Stack gap={4}>
              <Stack direction="row" align="center" gap={3}>
                <Box padding={2} radius="md" className="bg-accent/10 text-accent">
                  <Lock className="w-5 h-5" />
                </Box>
                <Text variant="headline" size="lg" weight="font-bold" tracking="tight">
                  Security Measures
                </Text>
              </Stack>
              <Text variant="body" size="base" color="dim" leading="relaxed" className="text-pretty">
                We implement industry-standard security practices, including encrypted connections (HTTPS), secure session tokens, and strict access controls to safeguard your personal information against unauthorized access, alteration, or disclosure.
              </Text>
            </Stack>
          </Box>
        </Grid>

        {/* Developer Contact */}
        <Box padding={{ base: 6, md: 8 }} radius="md" border surface="card" width="full">
          <Stack gap={4}>
            <Stack direction="row" align="center" gap={3}>
              <Box padding={2} radius="md" className="bg-accent/10 text-accent">
                <Mail className="w-5 h-5" />
              </Box>
              <Text variant="headline" size="lg" weight="font-bold" tracking="tight">
                Developer &amp; Privacy Contact
              </Text>
            </Stack>
            <Text variant="body" size="base" color="dim" leading="relaxed" className="text-pretty">
              If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact developer support directly at{' '}
              <Box
                as="a"
                href="mailto:anders.ariel@gmail.com"
                className="text-brand-cyan hover:underline font-semibold"
              >
                anders.ariel@gmail.com
              </Box>{' '}
              or official site support at{' '}
              <Box
                as="a"
                href="mailto:ari@boomtick.blog"
                className="text-brand-cyan hover:underline font-semibold"
              >
                ari@boomtick.blog
              </Box>
              .
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
