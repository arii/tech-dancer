import { Globe, Calendar, ShoppingBag, Sparkles, ShieldCheck, Zap, Search, Star } from 'lucide-react';
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
            <Box display="flex" align="center" gap={1} className="text-[10px] font-mono text-accent mb-1 font-semibold">
              <Search size={12} /> Google Search Verified
            </Box>
            <Text variant="headline" size="xs" weight="font-bold" color="accent-sky" className="truncate text-xs">
              Your Studio · San Francisco, CA
            </Text>
            <Box display="flex" align="center" gap={1} className="text-brand-amber mt-0.5 mb-1">
              <Star size={10} fill="currentColor" />
              <Star size={10} fill="currentColor" />
              <Star size={10} fill="currentColor" />
              <Star size={10} fill="currentColor" />
              <Star size={10} fill="currentColor" />
              <span className="text-dim text-[9px] font-mono ml-1">5.0 Verified Local Listing</span>
            </Box>
            <Text variant="body" size="xs" color="dim" className="text-xs line-clamp-1">
              Custom responsive website, verified map listing, and client intake.
            </Text>
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
        {/* Browser Mockup Chrome */}
        <Box
          paddingX={3}
          paddingY={2}
          border="b"
          surface="default"
          display="flex"
          align="center"
          justify="between"
          className="border-line/30 bg-surface/90"
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
            yourstudio.com/book
          </Box>
          <Calendar size={12} className="text-dim" />
        </Box>

        {/* Interactive Booking Funnel Mockup */}
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
              <Text variant="mono" size="xs" weight="font-bold" color="main" className="text-xs">
                OCTOBER 2026
              </Text>
              <Box display="flex" align="center" gap={1} className="text-[10px] font-mono text-dim">
                <Zap size={11} className="text-accent" /> Real-Time Sync
              </Box>
            </Box>

            <Box display="grid" className="grid-cols-4 gap-1.5">
              <Box paddingY={1} radius="xs" className="bg-surface-alt text-center border border-line/20 text-[10px] font-mono text-main">
                9:00 AM
              </Box>
              <Box paddingY={1} radius="xs" className="bg-surface-alt text-center border border-line/40 text-[10px] font-mono text-main font-bold">
                11:30 AM
              </Box>
              <Box paddingY={1} radius="xs" className="bg-surface-alt text-center border border-line/30 text-[10px] font-mono text-main line-through">
                1:00 PM
              </Box>
              <Box paddingY={1} radius="xs" className="bg-surface-alt text-center border border-line/20 text-[10px] font-mono text-main">
                3:30 PM
              </Box>
            </Box>
          </Box>

          {/* Automated Notification Badge */}
          <Box
            radius="sm"
            paddingX={2.5}
            paddingY={1.5}
            display="flex"
            align="center"
            justify="between"
            className="bg-surface-alt/60 border border-line/30 text-[10px] font-mono text-dim"
          >
            <Box display="flex" align="center" gap={1.5}>
              <ShieldCheck size={12} className="text-success" />
              <span>Auto-SMS & Calendar Sync</span>
            </Box>
            <span className="font-bold text-main">Active</span>
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
            className="border-line/30 bg-surface/80 text-center"
          >
            <Box width="full" height={8} radius="xs" className="bg-accent-purple/20 border border-accent-purple/30 mb-1 flex items-center justify-center">
              <Sparkles size={14} className="text-accent-purple" />
            </Box>
            <Text variant="mono" size="xs" weight="font-bold" color="main" className="text-[10px]">Merch & Digital</Text>
          </Box>

          <Box
            surface="default"
            radius="md"
            padding={2}
            border
            className="border-line/30 bg-surface/80 text-center"
          >
            <Box width="full" height={8} radius="xs" className="bg-accent-sky/20 border border-accent-sky/30 mb-1 flex items-center justify-center">
              <ShoppingBag size={14} className="text-accent-sky" />
            </Box>
            <Text variant="mono" size="xs" weight="font-bold" color="main" className="text-[10px]">Google Feed</Text>
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
          <Text variant="mono" size="xs" color="dim" className="text-[10px]">Direct Deposit Active</Text>
          <Box paddingX={1.5} paddingY={0.5} radius="xs" className="bg-success/20 border border-success/30 flex items-center justify-center text-[9px] font-mono text-success font-bold">
            STRIPE CONNECT
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};
