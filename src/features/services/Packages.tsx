import { Check } from 'lucide-react';
import { Box, Stack, Text, Button, Grid } from '@/layouts/Primitives';
import { TierVisual } from './TierVisuals';

export interface PackageCardProps {
  tier: 'presence' | 'booked' | 'growth';
  title: string;
  price: string;
  popular?: boolean;
  bestFor: string;
  features: string[];
}

const PackageCard = ({ tier, title, price, popular, bestFor, features }: PackageCardProps) => {
  return (
    <Stack
      border
      radius="2xl"
      padding={8}
      surface={popular ? "accent" : "default"}
      className={popular ? "border-accent ring-2 ring-accent/20 scale-100 lg:scale-105 z-10 shadow-xl" : "border-line/50 shadow-md"}
    >
      <Stack gap={6} flex={1}>
        <Stack gap={2}>
          {popular && (
            <Box paddingX={3} paddingY={1} className="bg-bg w-fit rounded-full border border-accent/30 shadow-sm">
              <Text variant="mono" size="xs" weight="font-bold" color="accent" uppercase>
                Most Popular
              </Text>
            </Box>
          )}
          <Text as="h3" variant="headline" size="2xl" weight="font-bold">{title}</Text>
          <Text variant="mono" size="sm" color="dim">{price}</Text>
        </Stack>

        {/* Visual Preview per Tier */}
        <Box width="full" marginY={1}>
          <TierVisual tier={tier} />
        </Box>

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

        <Button as="a" href="#intake-form" variant={popular ? "primary" : "outline"} width="full" marginTop={4} className="shadow-md">
          Inquire Now
        </Button>
      </Stack>
    </Stack>
  );
};

export const PackagesGrid = () => {
  return (
    <Stack gap={8} width="full">
      <Grid cols={{ base: 1, lg: 3 }} gap={8}>
        <PackageCard
          tier="presence"
          title="Presence"
          price="Starting at $1,500 setup"
          bestFor="Emerging creatives and solo practitioners needing a fast, verified home base."
          features={[
            "Fast, mobile-first website build with custom domain & SSL security.",
            "Google Business Profile setup & Google Maps local search indexing.",
            "Rich Schema.org structured data for accurate search engine listings.",
            "Integrated newsletter & mailing list signup to build an owned client list.",
            "Care Plan includes cloud hosting maintenance and security monitoring."
          ]}
        />
        <PackageCard
          tier="booked"
          title="Booked"
          price="Custom Quote · Tailored to Your Schedule"
          popular
          bestFor="Independent service professionals losing hours to manual scheduling and DMs."
          features={[
            "Everything in Presence, plus:",
            "24/7 online client appointment booking synced directly with your calendar.",
            "Automated calendar invites and reminder alerts for you and your clients.",
            "Custom booking & intake routing (consultations, event quotes, party sizes).",
            "San Francisco & Local SEO optimization to capture nearby customer searches.",
            "Quarterly check-ins to review booking flows and site performance."
          ]}
        />
        <PackageCard
          tier="growth"
          title="Studio Growth"
          price="Custom Quote · Multi-Channel Retainer"
          bestFor="Established practitioners ready to sell merchandise, classes, or digital assets."
          features={[
            "Everything in Booked, plus:",
            "E-commerce setup (print-on-demand merch, physical goods, or digital downloads).",
            "Automated Google Shopping & Google Merchant Center XML feed integration.",
            "Stripe Connect direct deposit and multi-tier deposit collection.",
            "Monthly analytics reports covering traffic, booking conversion, and search impressions."
          ]}
        />
      </Grid>
    </Stack>
  );
};

export const ScopeBoundaries = () => {
  return (
    <Box border radius="2xl" padding={8} surface="default" className="border-line/50 bg-surface/50 shadow-md">
      <Stack gap={6}>
        <Text as="h3" variant="headline" size="xl" weight="font-bold" className="text-center">
          Scope Boundaries & Responsibilities
        </Text>
        <Grid cols={{ base: 1, md: 2 }} gap={8}>
          <Stack gap={4}>
            <Text variant="mono" size="sm" weight="font-bold" color="success" uppercase>We Handle</Text>
            <Text variant="body" size="sm" color="dim">
              Modern website engineering, Google Business Profile & search setup, Google Shopping merchant feeds, 24/7 calendar booking systems, mailing list capture, and ongoing infrastructure maintenance.
            </Text>
          </Stack>
          <Stack gap={4}>
            <Text variant="mono" size="sm" weight="font-bold" color="error" uppercase>We Do Not Handle</Text>
            <Text variant="body" size="sm" color="dim">
              Tax advisory, legal counsel, bookkeeping/accounting, payroll processing, manual physical shipping/warehousing, or on-site event coordination.
            </Text>
          </Stack>
        </Grid>
      </Stack>
    </Box>
  );
};
