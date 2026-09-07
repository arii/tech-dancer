import { Box, Stack, Grid, Text } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { generateBreadcrumbSchema } from '@/utils/schema';
import { RotateCcw, AlertTriangle, Mail, ShieldAlert } from 'lucide-react';
import { useMemo } from 'react';

export default function ReturnPolicy() {
  const breadcrumbs = useMemo(() => generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Return & Refund Policy", path: "/return-policy" }
  ]), []);

  return (
    <Box paddingX={{ base: 4, md: 8 }} display="flex" justify="center" data-testid="return-policy-page">
      <SEO
        title="Return & Refund Policy"
        description="Review BoomTick return policy, replacement guidelines for damaged or misprinted orders, 30-day claim instructions, and custom apparel size guidance."
        schema={breadcrumbs}
      />

      <Stack gap={12} width="full" maxWidth="screen-xl">
        <PageHeader
          label="STORE POLICIES"
          title="Return & Refund Policy"
          description="Because BoomTick items are custom made to order via Printful, specific policies apply for damaged items, size exchanges, and quality claims."
        />

        <Grid cols={{ base: 1, md: 2 }} gap={6} width="full">
          {/* Damaged or Defective Items */}
          <Box padding={{ base: 6, md: 8 }} radius="md" border surface="card">
            <Stack gap={4}>
              <Stack direction="row" align="center" gap={3}>
                <Box padding={2} radius="md" className="bg-accent/10 text-accent">
                  <AlertTriangle className="w-5 h-5" />
                </Box>
                <Text variant="headline" size="lg" weight="font-bold" tracking="tight">
                  Damaged, Defective, or Misprinted Items
                </Text>
              </Stack>
              <Text variant="body" size="base" color="dim" leading="relaxed" className="text-pretty">
                We offer free replacements or full refunds for any merchandise items that arrive damaged, defective, or misprinted. Claims must be submitted within <Text as="span" weight="font-semibold" color="main">30 days of product delivery</Text>.
              </Text>
            </Stack>
          </Box>

          {/* How to Submit a Claim */}
          <Box padding={{ base: 6, md: 8 }} radius="md" border surface="card">
            <Stack gap={4}>
              <Stack direction="row" align="center" gap={3}>
                <Box padding={2} radius="md" className="bg-accent/10 text-accent">
                  <Mail className="w-5 h-5" />
                </Box>
                <Text variant="headline" size="lg" weight="font-bold" tracking="tight">
                  How to Submit a Return or Replacement Claim
                </Text>
              </Stack>
              <Text variant="body" size="base" color="dim" leading="relaxed" className="text-pretty">
                To start a claim, send an email to{' '}
                <Box
                  as="a"
                  href="mailto:ari@boomtick.blog"
                  className="text-brand-cyan hover:underline font-semibold"
                >
                  ari@boomtick.blog
                </Box>{' '}
                with your order confirmation details, a brief description of the issue, and clear photographic proof of the defect or damage. We will review and process a replacement immediately.
              </Text>
            </Stack>
          </Box>

          {/* Custom Print / Change of Mind */}
          <Box padding={{ base: 6, md: 8 }} radius="md" border surface="card">
            <Stack gap={4}>
              <Stack direction="row" align="center" gap={3}>
                <Box padding={2} radius="md" className="bg-accent/10 text-accent">
                  <ShieldAlert className="w-5 h-5" />
                </Box>
                <Text variant="headline" size="lg" weight="font-bold" tracking="tight">
                  Made-to-Order Custom Policy
                </Text>
              </Stack>
              <Text variant="body" size="base" color="dim" leading="relaxed" className="text-pretty">
                Each product is produced on-demand specifically when ordered. Consequently, we cannot offer buyer&apos;s remorse refunds or returns for general change of mind after production has commenced.
              </Text>
            </Stack>
          </Box>

          {/* Size and Color Exchanges */}
          <Box padding={{ base: 6, md: 8 }} radius="md" border surface="card">
            <Stack gap={4}>
              <Stack direction="row" align="center" gap={3}>
                <Box padding={2} radius="md" className="bg-accent/10 text-accent">
                  <RotateCcw className="w-5 h-5" />
                </Box>
                <Text variant="headline" size="lg" weight="font-bold" tracking="tight">
                  Size &amp; Color Exchanges
                </Text>
              </Stack>
              <Text variant="body" size="base" color="dim" leading="relaxed" className="text-pretty">
                Because items are custom printed, size or color exchanges require placing a new order. Please consult the product sizing descriptions carefully before ordering. If you are unsure of fit, reach out to support at <Box as="a" href="mailto:ari@boomtick.blog" className="text-brand-cyan hover:underline font-semibold">ari@boomtick.blog</Box> prior to purchasing.
              </Text>
            </Stack>
          </Box>
        </Grid>
      </Stack>
    </Box>
  );
}
