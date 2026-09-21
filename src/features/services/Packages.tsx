import { Check } from 'lucide-react';
import { Box, Stack, Text, Button, Grid } from '@/layouts/Primitives';
import { TierVisual } from './TierVisuals';

export interface PackageCardProps {
  tier: 'presence' | 'booked' | 'growth';
  title: string;
  price: string;
  popular?: boolean;
  clientProofBadge?: string;
  bestFor: string;
  features: string[];
}

const PackageCard = ({ tier, title, price, popular, clientProofBadge, bestFor, features }: PackageCardProps) => {
  return (
    <Stack
      border
      radius="2xl"
      padding={8}
      surface="default"
      className="border-line/40 bg-surface/50 shadow-sm"
    >
      <Stack gap={6} flex={1}>
        <Stack gap={2}>
          {clientProofBadge ? (
            <Box
              paddingX={2.5}
              paddingY={0.5}
              radius="full"
              border
              className="bg-surface-alt/60 border-line/30 text-dim font-mono text-[11px] w-fit"
            >
              <span>{clientProofBadge}</span>
            </Box>
          ) : null}
          <Text as="h3" variant="headline" size="2xl" weight="font-bold">{title}</Text>
          <Text variant="mono" size="sm" color="dim">{price}</Text>
        </Stack>

        {/* Visual Preview per Tier - Hidden on mobile to avoid cognitive overload */}
        <Box width="full" marginY={1} className="hidden sm:block">
          <TierVisual tier={tier} />
        </Box>

        <Box paddingBottom={4} className="border-b border-line/30">
          <Text variant="body" size="sm" weight="font-medium" color="main" className="italic">
            Best for: {bestFor}
          </Text>
        </Box>

        <Stack as="ul" gap={3} flex={1}>
          {features.slice(0, 3).map((feature, i) => (
            <Box as="li" key={i} display="flex" gap={3} align="start">
              <Box shrink={false} marginTop={1}>
                <Check className="w-4 h-4 text-dim" />
              </Box>
              <Text variant="body" size="sm" color="main">{feature}</Text>
            </Box>
          ))}

          {features.length > 3 && (
            <>
              {/* Desktop view: always show remaining features */}
              {features.slice(3).map((feature, i) => (
                <Box as="li" key={`sec-desktop-${i}`} display="flex" gap={3} align="start" className="hidden md:flex">
                  <Box shrink={false} marginTop={1}>
                    <Check className="w-4 h-4 text-dim" />
                  </Box>
                  <Text variant="body" size="sm" color="main">{feature}</Text>
                </Box>
              ))}

              {/* Mobile view: progressive disclosure toggle */}
              <Box as="li" className="md:hidden list-none pt-1">
                <details className="group/details">
                  <summary className="cursor-pointer text-xs font-mono text-dim hover:text-main focus:outline-none focus:ring-1 focus:ring-accent rounded flex items-center gap-1.5 py-1 select-none">
                    <span className="group-open/details:hidden">+ Show {features.length - 3} more features</span>
                    <span className="hidden group-open/details:inline">− Show fewer features</span>
                  </summary>
                  <Stack gap={3} marginTop={2} className="pt-2 border-t border-line/20">
                    {features.slice(3).map((feature, i) => (
                      <Box key={`sec-mobile-${i}`} display="flex" gap={3} align="start">
                        <Box shrink={false} marginTop={1}>
                          <Check className="w-4 h-4 text-dim" />
                        </Box>
                        <Text variant="body" size="sm" color="main">{feature}</Text>
                      </Box>
                    ))}
                  </Stack>
                </details>
              </Box>
            </>
          )}
        </Stack>

        <Button as="a" href="#intake-form" variant={popular ? "primary" : "outline"} width="full" marginTop={4} className="shadow-sm">
          Request a Consultation
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
          clientProofBadge="Hair by April runs on Booked"
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
    <Box border radius="2xl" padding={8} surface="default" className="border-line/40 bg-surface/50 shadow-sm">
      <Stack gap={6}>
        <Text as="h3" variant="headline" size="xl" weight="font-bold" className="text-center">
          What we handle vs. what we don't
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
