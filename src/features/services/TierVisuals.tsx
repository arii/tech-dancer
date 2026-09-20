import { Globe, Calendar, ShoppingBag, Sparkles, ArrowRight, ShieldCheck, Zap, Search, Star } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';

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
        {/* Browser Mockup Chrome */}
        <Box
          paddingX={3}
          paddingY={2}
          border="b"
          surface="default"
          display="flex"
          align="center"
          justify="between"
          className="border-line/30 bg-surface/80"
        >
          <Box display="flex" align="center" gap={1.5}>
            <Box width={2} height={2} radius="full" className="bg-error/60" />
            <Box width={2} height={2} radius="full" className="bg-brand-amber/60" />
            <Box width={2} height={2} radius="full" className="bg-success/60" />
          </Box>
          <Box
            paddingX={2}
            paddingY={0.5}
            radius="sm"
            surface="sunken"
            className="text-[10px] font-mono text-dim truncate max-w-[140px] border border-line/20"
          >
            yourstudio.com
          </Box>
          <Globe size={12} className="text-dim/60" />
        </Box>

        {/* Mockup Canvas: Google Search & Web Presence */}
        <Stack padding={3} gap={2}>
          {/* Google Search Result Snippet */}
          <Box
            radius="md"
            padding={2.5}
            surface="default"
            border
            className="border-line/20 bg-surface/90"
          >
            <Box display="flex" align="center" gap={1} className="text-[9px] font-mono text-accent mb-1">
              <Search size={10} /> Google Search Verified
            </Box>
            <Text variant="headline" size="xs" weight="font-bold" color="accent-sky" className="truncate text-[11px]">
              Your Studio · San Francisco, CA
            </Text>
            <Box display="flex" align="center" gap={1} className="text-[9px] text-brand-amber mt-0.5 mb-1">
              <Star size={9} fill="currentColor" />
              <Star size={9} fill="currentColor" />
              <Star size={9} fill="currentColor" />
              <Star size={9} fill="currentColor" />
              <Star size={9} fill="currentColor" />
              <span className="text-dim text-[8px] font-mono">5.0 Local Pack</span>
            </Box>
            <Text variant="body" size="xs" color="dim" className="text-[10px] line-clamp-1">
              Custom responsive website, verified map listing, and client intake.
            </Text>
          </Box>

          {/* Quick Stats Grid */}
          <Box display="grid" className="grid-cols-2 gap-1.5">
            <Box surface="default" radius="sm" padding={1.5} border className="border-line/20 text-center">
              <Text variant="mono" size="xs" color="accent" className="text-[10px] font-bold">100% Mobile</Text>
              <Text variant="body" size="xs" color="dim" className="text-[8px]">Responsive Layout</Text>
            </Box>
            <Box surface="default" radius="sm" padding={1.5} border className="border-line/20 text-center">
              <Text variant="mono" size="xs" color="success" className="text-[10px] font-bold">SSL / DNS</Text>
              <Text variant="body" size="xs" color="dim" className="text-[8px]">Full Security</Text>
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
        className="border-accent/40 bg-surface-alt/40 shadow-inner select-none ring-1 ring-accent/20"
      >
        {/* Browser Mockup Chrome */}
        <Box
          paddingX={3}
          paddingY={2}
          border="b"
          surface="default"
          display="flex"
          align="center"
          justify="between"
          className="border-accent/30 bg-surface/90"
        >
          <Box display="flex" align="center" gap={1.5}>
            <Box width={2} height={2} radius="full" className="bg-error/60" />
            <Box width={2} height={2} radius="full" className="bg-brand-amber/60" />
            <Box width={2} height={2} radius="full" className="bg-success/60" />
          </Box>
          <Box
            paddingX={2}
            paddingY={0.5}
            radius="sm"
            surface="sunken"
            className="text-[10px] font-mono text-accent truncate max-w-[140px] border border-accent/20"
          >
            yourstudio.com/book
          </Box>
          <Calendar size={12} className="text-accent" />
        </Box>

        {/* Interactive Booking Funnel Mockup */}
        <Stack padding={3} gap={2}>
          {/* Step Indicator */}
          <Box display="flex" align="center" justify="between" paddingX={1}>
            <Box display="flex" align="center" gap={1}>
              <Box width={3.5} height={3.5} radius="full" className="bg-accent text-bg text-[8px] font-mono font-bold flex items-center justify-center">1</Box>
              <Text variant="mono" size="xs" color="accent" className="text-[10px]">Service</Text>
            </Box>
            <ArrowRight size={10} className="text-dim" />
            <Box display="flex" align="center" gap={1}>
              <Box width={3.5} height={3.5} radius="full" className="bg-accent text-bg text-[8px] font-mono font-bold flex items-center justify-center">2</Box>
              <Text variant="mono" size="xs" color="accent" className="text-[10px]">Date</Text>
            </Box>
            <ArrowRight size={10} className="text-dim" />
            <Box display="flex" align="center" gap={1}>
              <Box width={3.5} height={3.5} radius="full" className="bg-surface-alt border border-line/40 text-dim text-[8px] font-mono flex items-center justify-center">3</Box>
              <Text variant="mono" size="xs" color="dim" className="text-[10px]">Confirm</Text>
            </Box>
          </Box>

          {/* Calendar Slot Mockup */}
          <Box
            surface="default"
            radius="md"
            padding={2.5}
            border
            className="border-line/30 bg-surface/70"
          >
            <Box display="flex" justify="between" align="center" marginBottom={2}>
              <Text variant="mono" size="xs" weight="font-bold" color="main" className="text-[10px]">
                OCTOBER 2026
              </Text>
              <Box display="flex" align="center" gap={1} className="text-[9px] font-mono text-accent">
                <Zap size={10} /> Live Sync
              </Box>
            </Box>

            <Box display="grid" className="grid-cols-4 gap-1.5">
              <Box paddingY={1} radius="xs" className="bg-surface-alt text-center border border-line/20 text-[9px] font-mono text-dim">
                9:00 AM
              </Box>
              <Box paddingY={1} radius="xs" className="bg-accent/20 text-center border border-accent text-[9px] font-mono text-accent font-bold">
                11:30 AM
              </Box>
              <Box paddingY={1} radius="xs" className="bg-surface-alt text-center border border-line/20 text-[9px] font-mono text-dim opacity-40 line-through">
                1:00 PM
              </Box>
              <Box paddingY={1} radius="xs" className="bg-surface-alt text-center border border-line/20 text-[9px] font-mono text-dim">
                3:30 PM
              </Box>
            </Box>
          </Box>

          {/* Automated Notification Badge */}
          <Box
            radius="sm"
            paddingX={2}
            paddingY={1}
            display="flex"
            align="center"
            justify="between"
            className="bg-accent/10 border border-accent/30 text-[9px] font-mono text-accent"
          >
            <Box display="flex" align="center" gap={1.5}>
              <ShieldCheck size={11} className="text-accent" />
              <span>Auto-SMS & Calendar Sync Enabled</span>
            </Box>
            <span className="font-bold">Active</span>
          </Box>
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
      {/* Browser Mockup Chrome */}
      <Box
        paddingX={3}
        paddingY={2}
        border="b"
        surface="default"
        display="flex"
        align="center"
        justify="between"
        className="border-line/30 bg-surface/80"
      >
        <Box display="flex" align="center" gap={1.5}>
          <Box width={2} height={2} radius="full" className="bg-error/60" />
          <Box width={2} height={2} radius="full" className="bg-brand-amber/60" />
          <Box width={2} height={2} radius="full" className="bg-success/60" />
        </Box>
        <Box
          paddingX={2}
          paddingY={0.5}
          radius="sm"
          surface="sunken"
          className="text-[10px] font-mono text-dim truncate max-w-[140px] border border-line/20"
        >
          yourstudio.com/store
        </Box>
        <ShoppingBag size={12} className="text-accent-sky" />
      </Box>

      {/* Multi-tier Store & Google Shopping Feed Mockup */}
      <Stack padding={3} gap={2}>
        {/* Store Grid Preview */}
        <Box display="grid" className="grid-cols-2 gap-2">
          <Box
            surface="default"
            radius="md"
            padding={2}
            border
            className="border-line/30 bg-surface/80"
          >
            <Box width="full" height={10} radius="xs" className="bg-accent-purple/20 border border-accent-purple/30 mb-1.5 flex items-center justify-center">
              <Sparkles size={12} className="text-accent-purple" />
            </Box>
            <Box width="80%" height={2} radius="xs" className="bg-main/60 mb-1" />
            <Box display="flex" justify="between" align="center">
              <span className="text-[9px] font-mono font-bold text-accent-sky">$45.00</span>
              <span className="text-[8px] font-mono text-dim uppercase">Merch</span>
            </Box>
          </Box>

          <Box
            surface="default"
            radius="md"
            padding={2}
            border
            className="border-line/30 bg-surface/80"
          >
            <Box width="full" height={10} radius="xs" className="bg-accent-sky/20 border border-accent-sky/30 mb-1.5 flex items-center justify-center">
              <ShoppingBag size={12} className="text-accent-sky" />
            </Box>
            <Box width="70%" height={2} radius="xs" className="bg-main/60 mb-1" />
            <Box display="flex" justify="between" align="center">
              <span className="text-[9px] font-mono font-bold text-accent-sky">Google Feed</span>
              <span className="text-[8px] font-mono text-success uppercase">Active</span>
            </Box>
          </Box>
        </Box>

        {/* Revenue Analytics Mockup */}
        <Box
          radius="sm"
          padding={2}
          surface="default"
          border
          className="border-line/30 flex items-center justify-between"
        >
          <Stack gap={0.5}>
            <Text variant="mono" size="xs" color="dim" className="text-[8px] uppercase">Automated Payouts</Text>
            <Text variant="mono" size="sm" weight="font-bold" color="success" className="text-[11px]">Direct Deposit Active</Text>
          </Stack>
          <Box width={16} height={4} radius="xs" className="bg-success/20 border border-success/30 flex items-center justify-center text-[8px] font-mono text-success font-bold">
            STRIPE CONNECT
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};
