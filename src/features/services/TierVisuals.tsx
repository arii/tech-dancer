import { Globe, Calendar, ShoppingBag, Sparkles, ShieldCheck, Zap, Search } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';

export interface TierVisualProps {
  tier: 'presence' | 'booked' | 'growth';
}

export const TierVisual = ({ tier }: TierVisualProps) => {
  if (tier === 'presence') {
    return (
      <Box
        border
        radius="xl"
        surface="sunken"
        overflow="hidden"
        width="full"
        className="border-line/50 bg-surface-alt/40 shadow-inner select-none"
      >
        {/* Tier Header Bar */}
        <Box
          paddingX={3}
          paddingY={2}
          border="b"
          surface="default"
          display="flex"
          align="center"
          justify="between"
          className="border-line/30 bg-surface/80 font-mono text-dim"
        >
          <Text as="span" size="tiny" weight="font-semibold" color="main">yourstudio.com</Text>
          <Globe size={13} className="text-dim/70" />
        </Box>

        {/* Visual Canvas: Google Search & Web Presence */}
        <Stack padding={3} gap={2}>
          {/* Google Search Result Snippet */}
          <Box
            radius="md"
            padding={2.5}
            surface="default"
            border
            className="border-line/20 bg-surface/90"
          >
            <Box display="flex" align="center" gap={1} marginBottom={1} weight="font-semibold" className="font-mono text-accent">
              <Search size={12} /> <Text as="span" size="micro">Google Search Verified</Text>
            </Box>
            <Text variant="headline" size="xs" weight="font-bold" color="accent-sky" truncate>
              Your Studio · San Francisco, CA
            </Text>
            <Text variant="body" size="xs" color="dim" clamp={1} marginTop={1}>
              Custom responsive website, verified map listing, and client intake.
            </Text>
            <Box marginTop={1} className="font-mono text-dim/80">
              <Text as="span" size="micro">Illustrative local search setup</Text>
            </Box>
          </Box>
        </Stack>
      </Box>
    );
  }

  if (tier === 'booked') {
    return (
      <Box
        border
        radius="xl"
        surface="sunken"
        overflow="hidden"
        width="full"
        className="border-line/40 bg-surface-alt/40 shadow-inner select-none"
      >
        {/* Tier Header Bar */}
        <Box
          paddingX={3}
          paddingY={2}
          border="b"
          surface="default"
          display="flex"
          align="center"
          justify="between"
          className="border-line/30 bg-surface/90 font-mono text-dim"
        >
          <Text as="span" size="tiny" weight="font-semibold" color="main">yourstudio.com/book</Text>
          <Calendar size={13} className="text-dim" />
        </Box>

        {/* Interactive Booking Funnel Visual */}
        <Stack padding={3} gap={2}>
          {/* Calendar Slot Mockup */}
          <Box
            surface="default"
            radius="md"
            padding={2.5}
            border
            className="border-line/30 bg-surface/70"
          >
            <Box display="flex" justify="between" align="center" marginBottom={2}>
              <Text variant="mono" size="xs" weight="font-bold" color="main">
                OCTOBER 2026
              </Text>
              <Box display="flex" align="center" gap={1} className="font-mono text-dim">
                <Zap size={11} className="text-accent" /> <Text as="span" size="micro">Real-Time Sync</Text>
              </Box>
            </Box>

            <Grid cols={4} gap={1.5}>
              <Box paddingY={1} radius="xs" className="bg-surface-alt text-center border border-line/20 font-mono text-main">
                <Text as="span" size="micro">9:00 AM</Text>
              </Box>
              <Box paddingY={1} radius="xs" className="bg-surface-alt text-center border border-line/40 font-mono text-main font-bold">
                <Text as="span" size="micro">11:30 AM</Text>
              </Box>
              <Box paddingY={1} radius="xs" className="bg-surface-alt text-center border border-line/30 font-mono text-main line-through">
                <Text as="span" size="micro">1:00 PM</Text>
              </Box>
              <Box paddingY={1} radius="xs" className="bg-surface-alt text-center border border-line/20 font-mono text-main">
                <Text as="span" size="micro">3:30 PM</Text>
              </Box>
            </Grid>
          </Box>

          {/* Automated Notification Badge */}
          <Stack
            direction="row"
            align="center"
            justify="between"
            radius="sm"
            paddingX={2.5}
            paddingY={1.5}
            className="bg-surface-alt/60 border border-line/30 font-mono text-dim"
          >
            <Box display="flex" align="center" gap={1.5}>
              <ShieldCheck size={12} className="text-success" />
              <Text as="span" size="micro">Auto-SMS & Calendar Sync</Text>
            </Box>
            <Text as="span" size="micro" weight="font-bold" color="main">Active</Text>
          </Stack>
        </Stack>
      </Box>
    );
  }

  return (
    <Box
      border
      radius="xl"
      surface="sunken"
      overflow="hidden"
      width="full"
      className="border-line/50 bg-surface-alt/40 shadow-inner select-none"
    >
      {/* Tier Header Bar */}
      <Box
        paddingX={3}
        paddingY={2}
        border="b"
        surface="default"
        display="flex"
        align="center"
        justify="between"
        className="border-line/30 bg-surface/80 font-mono text-dim"
      >
        <Text as="span" size="tiny" weight="font-semibold" color="main">yourstudio.com/store</Text>
        <ShoppingBag size={13} className="text-accent-sky" />
      </Box>

      {/* Multi-tier Store & Google Shopping Feed Visual */}
      <Stack padding={3} gap={2}>
        {/* Store Grid Preview */}
        <Grid cols={2} gap={2}>
          <Box
            surface="default"
            radius="md"
            padding={2}
            border
            className="border-line/30 bg-surface/80 text-center"
          >
            <Stack align="center" justify="center" width="full" height={8} radius="xs" marginBottom={1} className="bg-accent-purple/20 border border-accent-purple/30">
              <Sparkles size={14} className="text-accent-purple" />
            </Stack>
            <Text variant="mono" size="micro" weight="font-bold" color="main">Merch & Digital</Text>
          </Box>

          <Box
            surface="default"
            radius="md"
            padding={2}
            border
            className="border-line/30 bg-surface/80 text-center"
          >
            <Stack align="center" justify="center" width="full" height={8} radius="xs" marginBottom={1} className="bg-accent-sky/20 border border-accent-sky/30">
              <ShoppingBag size={14} className="text-accent-sky" />
            </Stack>
            <Text variant="mono" size="micro" weight="font-bold" color="main">Google Feed</Text>
          </Box>
        </Grid>

        {/* Revenue Analytics Status */}
        <Stack
          direction="row"
          align="center"
          justify="between"
          radius="sm"
          padding={2}
          surface="default"
          border
          className="border-line/30"
        >
          <Text variant="mono" size="micro" color="dim">Direct Deposit Active</Text>
          <Stack align="center" justify="center" paddingX={1.5} paddingY={0.5} radius="xs" className="bg-success/20 border border-success/30 font-mono text-success font-bold">
            <Text as="span" size="micro">STRIPE CONNECT</Text>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
