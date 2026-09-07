import { Box, Stack, Grid, Text } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { generateBreadcrumbSchema } from '@/utils/schema';
import { Truck, Clock, Calculator, HelpCircle } from 'lucide-react';
import { useMemo } from 'react';

export default function ShippingPolicy() {
  const breadcrumbs = useMemo(() => generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Shipping Policy", path: "/shipping" }
  ]), []);

  return (
    <Box paddingX={{ base: 4, md: 8 }} display="flex" justify="center" data-testid="shipping-policy-page">
      <SEO
        title="Shipping & Fulfillment Policy"
        description="Learn about BoomTick shipping times, Printful made-to-order production timelines, variable rate calculation at checkout, and delivery estimates."
        schema={breadcrumbs}
      />

      <Stack gap={12} width="full" maxWidth="screen-xl">
        <PageHeader
          label="STORE POLICIES"
          title="Shipping & Fulfillment Policy"
          description="BoomTick merchandise is produced on-demand using Printful. Clear delivery expectations, fulfillment timelines, and shipping calculation details are provided below."
        />

        <Grid cols={{ base: 1, md: 2 }} gap={6} width="full">
          {/* Made to Order Model */}
          <Box padding={{ base: 6, md: 8 }} radius="md" border surface="card">
            <Stack gap={4}>
              <Stack direction="row" align="center" gap={3}>
                <Box padding={2} radius="md" className="bg-accent/10 text-accent">
                  <Truck className="w-5 h-5" />
                </Box>
                <Text variant="headline" size="lg" weight="font-bold" tracking="tight">
                  Made-to-Order Fulfillment Model
                </Text>
              </Stack>
              <Text variant="body" size="base" color="dim" leading="relaxed" className="text-pretty">
                Every merchandise order is printed and assembled on-demand specifically for you by our fulfillment partner, Printful. Made-to-order production minimizes inventory waste and guarantees fresh quality for every apparel item.
              </Text>
            </Stack>
          </Box>

          {/* Timeline & Processing */}
          <Box padding={{ base: 6, md: 8 }} radius="md" border surface="card">
            <Stack gap={4}>
              <Stack direction="row" align="center" gap={3}>
                <Box padding={2} radius="md" className="bg-accent/10 text-accent">
                  <Clock className="w-5 h-5" />
                </Box>
                <Text variant="headline" size="lg" weight="font-bold" tracking="tight">
                  Fulfillment & Transit Timeline
                </Text>
              </Stack>
              <Stack gap={3}>
                <Text variant="body" size="base" color="dim" leading="relaxed" className="text-pretty">
                  <Text as="span" weight="font-semibold" color="main">Fulfillment / Processing Time:</Text> 2–7 business days for custom printing, quality control inspection, and packaging prior to dispatch.
                </Text>
                <Text variant="body" size="base" color="dim" leading="relaxed" className="text-pretty">
                  <Text as="span" weight="font-semibold" color="main">Domestic Shipping Transit Time:</Text> 4–8 business days for standard ground delivery within the United States.
                </Text>
                <Text variant="body" size="base" color="dim" leading="relaxed" className="text-pretty">
                  <Text as="span" weight="font-semibold" color="main">Total Estimated Delivery Window:</Text> 6–15 business days from order placement to final delivery.
                </Text>
              </Stack>
            </Stack>
          </Box>

          {/* Dynamic Rate Calculation */}
          <Box padding={{ base: 6, md: 8 }} radius="md" border surface="card">
            <Stack gap={4}>
              <Stack direction="row" align="center" gap={3}>
                <Box padding={2} radius="md" className="bg-accent/10 text-accent">
                  <Calculator className="w-5 h-5" />
                </Box>
                <Text variant="headline" size="lg" weight="font-bold" tracking="tight">
                  Shipping Fee Calculation
                </Text>
              </Stack>
              <Text variant="body" size="base" color="dim" leading="relaxed" className="text-pretty">
                Shipping fees are variable and calculated dynamically at checkout by Printful based on item category (e.g. t-shirts, crop hoodies, totes, mugs), package weight, and shipping destination. Estimated base rates and available carrier options are displayed clearly prior to order confirmation.
              </Text>
            </Stack>
          </Box>

          {/* Contact & Inquiries */}
          <Box padding={{ base: 6, md: 8 }} radius="md" border surface="card">
            <Stack gap={4}>
              <Stack direction="row" align="center" gap={3}>
                <Box padding={2} radius="md" className="bg-accent/10 text-accent">
                  <HelpCircle className="w-5 h-5" />
                </Box>
                <Text variant="headline" size="lg" weight="font-bold" tracking="tight">
                  Inquiries & Order Support
                </Text>
              </Stack>
              <Text variant="body" size="base" color="dim" leading="relaxed" className="text-pretty">
                If you have questions about your order dispatch or tracking status, please email official support at{' '}
                <Box
                  as="a"
                  href="mailto:ari@boomtick.blog"
                  className="text-brand-cyan hover:underline font-semibold"
                >
                  ari@boomtick.blog
                </Box>
                . Include your order ID and full name for swift tracking assistance.
              </Text>
            </Stack>
          </Box>
        </Grid>
      </Stack>
    </Box>
  );
}
