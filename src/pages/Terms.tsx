import { Box, Stack, Grid, Text } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { generateBreadcrumbSchema } from '@/utils/schema';
import { FileText, Briefcase, UserCheck, ShieldCheck, AlertCircle, Mail } from 'lucide-react';
import { useMemo } from 'react';

export default function Terms() {
  const breadcrumbs = useMemo(() => generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Terms of Service", path: "/terms" }
  ]), []);

  return (
    <Box paddingX={{ base: 4, md: 8 }} display="flex" justify="center" data-testid="terms-of-service-page">
      <SEO
        title="Terms of Service"
        description="BoomTick Terms of Service detailing acceptance of terms, service descriptions, user conduct, intellectual property, limitation of liability, and contact details."
        schema={breadcrumbs}
      />

      <Stack gap={12} width="full" maxWidth="screen-xl">
        <PageHeader
          label="COMPLIANCE & LEGAL"
          title="Terms of Service"
          description="Welcome to BoomTick (boomtick.blog). Please read these Terms of Service carefully before accessing our application, digital products, or consulting services."
        />

        <Grid cols={{ base: 1, md: 2 }} gap={6} width="full">
          {/* Acceptance of Terms */}
          <Box padding={{ base: 6, md: 8 }} radius="md" border surface="card">
            <Stack gap={4}>
              <Stack direction="row" align="center" gap={3}>
                <Box padding={2} radius="md" className="bg-accent/10 text-accent">
                  <FileText className="w-5 h-5" />
                </Box>
                <Text variant="headline" size="lg" weight="font-bold" tracking="tight">
                  Acceptance of Terms
                </Text>
              </Stack>
              <Text variant="body" size="base" color="dim" leading="relaxed" className="text-pretty">
                By accessing, browsing, authenticating, or using boomtick.blog, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.
              </Text>
            </Stack>
          </Box>

          {/* Description of Service */}
          <Box padding={{ base: 6, md: 8 }} radius="md" border surface="card">
            <Stack gap={4}>
              <Stack direction="row" align="center" gap={3}>
                <Box padding={2} radius="md" className="bg-accent/10 text-accent">
                  <Briefcase className="w-5 h-5" />
                </Box>
                <Text variant="headline" size="lg" weight="font-bold" tracking="tight">
                  Description of Service
                </Text>
              </Stack>
              <Text variant="body" size="base" color="dim" leading="relaxed" className="text-pretty">
                BoomTick provides web design, business automation, custom dance merchandise, and digital operations consulting services for independent creatives and studios.
              </Text>
            </Stack>
          </Box>

          {/* User Responsibilities */}
          <Box padding={{ base: 6, md: 8 }} radius="md" border surface="card">
            <Stack gap={4}>
              <Stack direction="row" align="center" gap={3}>
                <Box padding={2} radius="md" className="bg-accent/10 text-accent">
                  <UserCheck className="w-5 h-5" />
                </Box>
                <Text variant="headline" size="lg" weight="font-bold" tracking="tight">
                  User Responsibilities
                </Text>
              </Stack>
              <Text variant="body" size="base" color="dim" leading="relaxed" className="text-pretty">
                Users agree to utilize the platform for lawful purposes only and refrain from any unauthorized automated access, tampering with authentication procedures, or engaging in conduct that impairs system stability or security.
              </Text>
            </Stack>
          </Box>

          {/* Intellectual Property */}
          <Box padding={{ base: 6, md: 8 }} radius="md" border surface="card">
            <Stack gap={4}>
              <Stack direction="row" align="center" gap={3}>
                <Box padding={2} radius="md" className="bg-accent/10 text-accent">
                  <ShieldCheck className="w-5 h-5" />
                </Box>
                <Text variant="headline" size="lg" weight="font-bold" tracking="tight">
                  Intellectual Property
                </Text>
              </Stack>
              <Text variant="body" size="base" color="dim" leading="relaxed" className="text-pretty">
                All software code, branding, logos, graphics, design assets, and written content hosted on boomtick.blog are the exclusive property of BoomTick and Ariel Anders, protected under applicable copyright and trademark laws.
              </Text>
            </Stack>
          </Box>
        </Grid>

        {/* Limitation of Liability */}
        <Box padding={{ base: 6, md: 8 }} radius="md" border surface="card" width="full">
          <Stack gap={4}>
            <Stack direction="row" align="center" gap={3}>
              <Box padding={2} radius="md" className="bg-accent/10 text-accent">
                <AlertCircle className="w-5 h-5" />
              </Box>
              <Text variant="headline" size="lg" weight="font-bold" tracking="tight">
                Limitation of Liability
              </Text>
            </Stack>
            <Text variant="body" size="base" color="dim" leading="relaxed" className="text-pretty">
              BoomTick and its operators shall not be liable for any direct, indirect, incidental, or consequential damages resulting from service interruptions, temporary unavailability, or third-party service provider outages. Services are provided on an &quot;as is&quot; and &quot;as available&quot; basis.
            </Text>
          </Stack>
        </Box>

        {/* Developer Contact */}
        <Box padding={{ base: 6, md: 8 }} radius="md" border surface="card" width="full">
          <Stack gap={4}>
            <Stack direction="row" align="center" gap={3}>
              <Box padding={2} radius="md" className="bg-accent/10 text-accent">
                <Mail className="w-5 h-5" />
              </Box>
              <Text variant="headline" size="lg" weight="font-bold" tracking="tight">
                Contact &amp; Legal Inquiries
              </Text>
            </Stack>
            <Text variant="body" size="base" color="dim" leading="relaxed" className="text-pretty">
              For any questions regarding these Terms of Service, please reach out to developer support at{' '}
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
