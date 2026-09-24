import { Box, Stack, Grid, Text } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { generateBreadcrumbSchema } from '@/utils/schema';
import { ShieldCheck, Eye, Share2, Lock, FileText, HelpCircle } from 'lucide-react';
import { useMemo } from 'react';

export default function PrivacyPolicy() {
  const breadcrumbs = useMemo(() => generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Privacy Policy", path: "/privacy" }
  ]), []);

  return (
    <Box paddingX={{ base: 4, md: 8 }} display="flex" justify="center" data-testid="privacy-policy-page">
      <SEO
        title="Privacy Policy | CalOPPA & CCPA Compliance"
        description="BoomTick Privacy Policy detailing personal information collection, California CalOPPA/CCPA rights, Global Privacy Control (GPC) support, and cookie preferences."
        schema={breadcrumbs}
      />

      <Stack gap={12} width="full" maxWidth="screen-xl">
        <PageHeader
          label="LEGAL & COMPLIANCE"
          title="Privacy Policy"
          description="BoomTick is committed to protecting your privacy. This policy explains how we collect, use, disclose, and safeguard your personal information in compliance with California (CalOPPA, CCPA/CPRA), federal (FTC Act), and international privacy regulations."
        />

        <Grid cols={{ base: 1, md: 2 }} gap={6} width="full">
          {/* PII Collected */}
          <Box padding={{ base: 6, md: 8 }} radius="md" border surface="card">
            <Stack gap={4}>
              <Stack direction="row" align="center" gap={3}>
                <Box padding={2} radius="md" className="bg-accent/10 text-accent">
                  <Eye className="w-5 h-5" />
                </Box>
                <Text variant="headline" size="lg" weight="font-bold" tracking="tight">
                  Information We Collect
                </Text>
              </Stack>
              <Stack gap={3}>
                <Text variant="body" size="base" color="dim" leading="relaxed" className="text-pretty">
                  <Text as="span" weight="font-semibold" color="main">Contact & Intake Data:</Text> When you submit a consultation request on our Services page, we collect your name, email address, and inquiry message via Google Apps Script endpoints.
                </Text>
                <Text variant="body" size="base" color="dim" leading="relaxed" className="text-pretty">
                  <Text as="span" weight="font-semibold" color="main">Fulfillment Data:</Text> For merchandise purchases, Printful collects shipping names, delivery addresses, and payment details to fulfill custom print-on-demand orders.
                </Text>
                <Text variant="body" size="base" color="dim" leading="relaxed" className="text-pretty">
                  <Text as="span" weight="font-semibold" color="main">Usage & Technical Telemetry:</Text> IP addresses, browser specifications, and page interaction metrics collected via Google Analytics 4 and Vercel Analytics/Speed Insights.
                </Text>
              </Stack>
            </Stack>
          </Box>

          {/* How Information is Collected */}
          <Box padding={{ base: 6, md: 8 }} radius="md" border surface="card">
            <Stack gap={4}>
              <Stack direction="row" align="center" gap={3}>
                <Box padding={2} radius="md" className="bg-accent/10 text-accent">
                  <FileText className="w-5 h-5" />
                </Box>
                <Text variant="headline" size="lg" weight="font-bold" tracking="tight">
                  Collection Methods & Purpose
                </Text>
              </Stack>
              <Stack gap={3}>
                <Text variant="body" size="base" color="dim" leading="relaxed" className="text-pretty">
                  <Text as="span" weight="font-semibold" color="main">Service Consultation Forms:</Text> Direct user input provided through intake forms to facilitate technical consulting and software engineering engagements.
                </Text>
                <Text variant="body" size="base" color="dim" leading="relaxed" className="text-pretty">
                  <Text as="span" weight="font-semibold" color="main">Interactive Tools & E-Commerce:</Text> Interactions with research calculators (/research/wcs-navigator), gear post recommendations, and merchandise ordering triggers.
                </Text>
                <Text variant="body" size="base" color="dim" leading="relaxed" className="text-pretty">
                  <Text as="span" weight="font-semibold" color="main">Affiliate Links:</Text> Outbound referral clicks on Amazon Associates links.
                </Text>
              </Stack>
            </Stack>
          </Box>

          {/* Third-Party Service Disclosures */}
          <Box padding={{ base: 6, md: 8 }} radius="md" border surface="card">
            <Stack gap={4}>
              <Stack direction="row" align="center" gap={3}>
                <Box padding={2} radius="md" className="bg-accent/10 text-accent">
                  <Share2 className="w-5 h-5" />
                </Box>
                <Text variant="headline" size="lg" weight="font-bold" tracking="tight">
                  Third-Party Service Disclosures
                </Text>
              </Stack>
              <Text variant="body" size="base" color="dim" leading="relaxed" className="text-pretty">
                We do not sell your personal information. We share personal data solely with trusted third-party service providers acting on our behalf to operate our platform:
              </Text>
              <Stack gap={2}>
                <Text variant="body" size="sm" color="dim">
                  • <Text as="span" weight="font-semibold" color="main">Google Apps Script:</Text> Processing form submissions securely.
                </Text>
                <Text variant="body" size="sm" color="dim">
                  • <Text as="span" weight="font-semibold" color="main">Google Analytics 4:</Text> Privacy-respecting website usage analysis.
                </Text>
                <Text variant="body" size="sm" color="dim">
                  • <Text as="span" weight="font-semibold" color="main">Vercel Analytics & Speed Insights:</Text> Hosting and site performance optimization.
                </Text>
                <Text variant="body" size="sm" color="dim">
                  • <Text as="span" weight="font-semibold" color="main">Printful:</Text> On-demand merchandise order printing and shipping fulfillment.
                </Text>
                <Text variant="body" size="sm" color="dim">
                  • <Text as="span" weight="font-semibold" color="main">Amazon Associates:</Text> Affiliate referral tracking.
                </Text>
              </Stack>
            </Stack>
          </Box>

          {/* GPC & Do Not Track (DNT) Handling */}
          <Box padding={{ base: 6, md: 8 }} radius="md" border surface="card">
            <Stack gap={4}>
              <Stack direction="row" align="center" gap={3}>
                <Box padding={2} radius="md" className="bg-accent/10 text-accent">
                  <Lock className="w-5 h-5" />
                </Box>
                <Text variant="headline" size="lg" weight="font-bold" tracking="tight">
                  Global Privacy Control (GPC) & DNT
                </Text>
              </Stack>
              <Text variant="body" size="base" color="dim" leading="relaxed" className="text-pretty">
                BoomTick respects browser-level privacy signals. When our platform detects an active <Text as="span" weight="font-semibold" color="main">Global Privacy Control (GPC)</Text> signal (<Text as="span" variant="mono" size="xs">navigator.globalPrivacyControl</Text>) or <Text as="span" weight="font-semibold" color="main">Do Not Track (DNT)</Text> setting (<Text as="span" variant="mono" size="xs">navigator.doNotTrack === &apos;1&apos;</Text>), non-essential analytics tracking (including Google Analytics 4) is automatically suppressed.
              </Text>
              <Text variant="body" size="base" color="dim" leading="relaxed" className="text-pretty">
                You may also manually adjust your tracking preferences at any time using the &quot;Do Not Sell or Share My Personal Information&quot; link located in the site footer.
              </Text>
            </Stack>
          </Box>

          {/* Consumer Rights under CalOPPA & CCPA/CPRA */}
          <Box padding={{ base: 6, md: 8 }} radius="md" border surface="card">
            <Stack gap={4}>
              <Stack direction="row" align="center" gap={3}>
                <Box padding={2} radius="md" className="bg-accent/10 text-accent">
                  <ShieldCheck className="w-5 h-5" />
                </Box>
                <Text variant="headline" size="lg" weight="font-bold" tracking="tight">
                  Your California Privacy Rights (CCPA / CPRA)
                </Text>
              </Stack>
              <Text variant="body" size="base" color="dim" leading="relaxed" className="text-pretty">
                California residents have specific privacy rights regarding their personal information:
              </Text>
              <Stack gap={2}>
                <Text variant="body" size="sm" color="dim">
                  • <Text as="span" weight="font-semibold" color="main">Right to Know:</Text> Request details on categories and specific pieces of personal information collected.
                </Text>
                <Text variant="body" size="sm" color="dim">
                  • <Text as="span" weight="font-semibold" color="main">Right to Delete:</Text> Request erasure of personal data provided through our intake forms.
                </Text>
                <Text variant="body" size="sm" color="dim">
                  • <Text as="span" weight="font-semibold" color="main">Right to Opt-Out:</Text> Opt out of the sale or sharing of personal information for cross-context behavioral advertising.
                </Text>
                <Text variant="body" size="sm" color="dim">
                  • <Text as="span" weight="font-semibold" color="main">Non-Discrimination:</Text> We will not discriminate against you for exercising your legal privacy rights.
                </Text>
              </Stack>
            </Stack>
          </Box>

          {/* Policy Updates & Contact Information */}
          <Box padding={{ base: 6, md: 8 }} radius="md" border surface="card">
            <Stack gap={4}>
              <Stack direction="row" align="center" gap={3}>
                <Box padding={2} radius="md" className="bg-accent/10 text-accent">
                  <HelpCircle className="w-5 h-5" />
                </Box>
                <Text variant="headline" size="lg" weight="font-bold" tracking="tight">
                  Policy Changes & Contact Information
                </Text>
              </Stack>
              <Text variant="body" size="base" color="dim" leading="relaxed" className="text-pretty">
                <Text as="span" weight="font-semibold" color="main">Effective Date:</Text> March 1, 2026. Material updates to this policy will be posted on this page with an updated effective date.
              </Text>
              <Text variant="body" size="base" color="dim" leading="relaxed" className="text-pretty">
                To exercise your CCPA rights or inquire about privacy practices, contact official support at{' '}
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
        </Grid>
      </Stack>
    </Box>
  );
}
