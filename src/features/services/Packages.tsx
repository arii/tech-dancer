import { Box, Stack, Text, Button, Grid } from '@/layouts/Primitives';
import { Check } from 'lucide-react';

interface PackageCardProps {
  title: string;
  price: string;
  popular?: boolean;
  bestFor: string;
  features: string[];
}

function PackageCard({ title, price, popular, bestFor, features }: PackageCardProps) {
  return (
    <Box
      border
      radius="xl"
      padding={8}
      surface={popular ? "accent" : "default"}
      display="flex"
      flexDirection="column"
      className={popular ? "border-accent ring-2 ring-accent/20 scale-100 lg:scale-105 z-10 shadow-lg" : "border-line/50"}
    >
      <Stack gap={6} flex={1}>
        <Stack gap={2}>
          {popular && (
            <Box paddingX={3} paddingY={1} className="bg-bg w-fit rounded-full border border-accent/20">
              <Text variant="mono" size="xs" weight="font-bold" color="accent" uppercase>
                Most Popular
              </Text>
            </Box>
          )}
          <Text as="h3" variant="headline" size="2xl" weight="font-bold">{title}</Text>
          <Text variant="mono" size="sm" color="dim">{price}</Text>
        </Stack>

        <Box paddingBottom={4} className="border-b border-line/30">
          <Text variant="body" size="sm" weight="font-medium" color="main" className="italic">
            Best for: {bestFor}
          </Text>
        </Box>

        <Stack as="ul" gap={4} flex={1}>
          {features.map((feature, i) => (
            <Box as="li" key={i} display="flex" gap={3} align="start">
              <Box shrink={false} marginTop={1}>
                <Check className={`w-4 h-4 ${popular ? 'text-accent' : 'text-accent-sky'}`} />
              </Box>
              <Text variant="body" size="sm" color="main">{feature}</Text>
            </Box>
          ))}
        </Stack>

        <Button as="a" href="#intake-form" variant={popular ? "primary" : "outline"} width="full" marginTop={4}>
          Inquire Now
        </Button>
      </Stack>
    </Box>
  );
}

export function PackagesGrid() {
  return (
    <Stack gap={8} width="full">
      <Grid cols={{ base: 1, lg: 3 }} gap={8}>
        <PackageCard
          title="Presence"
          price="$1,500+ setup / $99-149/mo"
          bestFor="Emerging creatives needing a sharp, modern home base."
          features={[
            "3–5 page high-performance mobile-first website.",
            "Domain, DNS, and fast edge deployment (Cloudflare Pages).",
            "Foundational on-page SEO and Google Search Console registration.",
            "Care Plan includes hosting maintenance, security monitoring, and minor content updates."
          ]}
        />
        <PackageCard
          title="Booked"
          price="$2,500+ setup / $199-349/mo"
          popular
          bestFor="Service providers losing billable hours to scheduling friction."
          features={[
            "Everything in Presence, plus:",
            "End-to-end appointment scheduling integration and calendar synchronization.",
            "Custom booking and intake forms (e.g., event quotes, bridal parties, lesson inquiries).",
            "Automated pipeline notifications (Spreadsheet/CRM/Email triggers).",
            "San Francisco Local SEO Program (Google Business Profile optimization, local citation architecture).",
            "Monthly system checks, booking validation, and content passes."
          ]}
        />
        <PackageCard
          title="Studio Growth"
          price="$4,000+ setup / $399-799+/mo"
          bestFor="Established pros scaling classes, digital downloads, or merchandise."
          features={[
            "Everything in Booked, plus:",
            "E-commerce setup (print-on-demand, digital assets, or physical merchandise).",
            "Custom deposit routing and multi-tier booking flows.",
            "Monthly SEO, content execution, and conversion optimization reporting."
          ]}
        />
      </Grid>
    </Stack>
  );
}

export function ScopeBoundaries() {
  return (
    <Box border radius="lg" padding={8} surface="default" className="border-line/50 bg-surface/50">
      <Stack gap={6}>
        <Text as="h3" variant="headline" size="xl" weight="font-bold" className="text-center">
          Scope Boundaries
        </Text>
        <Grid cols={{ base: 1, md: 2 }} gap={8}>
          <Stack gap={4}>
            <Text variant="mono" size="sm" weight="font-bold" color="success" uppercase>We Handle</Text>
            <Text variant="body" size="sm" color="dim">
              Web engineering, edge hosting, booking engines, form automations, Google Business optimization, e-commerce integrations, and ongoing tech support.
            </Text>
          </Stack>
          <Stack gap={4}>
            <Text variant="mono" size="sm" weight="font-bold" color="error" uppercase>We Do Not Handle</Text>
            <Text variant="body" size="sm" color="dim">
              Tax advisory, legal services, bookkeeping/accounting, payroll, physical inventory shipping, or on-site event management.
            </Text>
          </Stack>
        </Grid>
      </Stack>
    </Box>
  );
}
