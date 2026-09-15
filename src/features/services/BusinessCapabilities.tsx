import { Search, ShoppingBag, Calendar, Mail, MapPin, CheckCircle2, ArrowUpRight, Zap, Star } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';

export const BusinessCapabilities = () => {
  return (
    <Stack gap={8} width="full">
      {/* Header */}
      <Stack gap={3} align="center" className="text-center">
        <Box
          paddingX={3}
          paddingY={1}
          radius="full"
          border
          className="border-accent/40 bg-accent/10 text-accent font-mono text-xs font-bold flex items-center gap-1.5 shadow-sm"
        >
          <Zap size={13} className="text-accent" />
          <span>IMPROVE YOUR BUSINESS OPERATIONS</span>
        </Box>
        <Text as="h2" variant="headline" size="3xl" weight="font-bold">
          High-Performance Growth & Booking Systems
        </Text>
        <Text variant="body" size="lg" color="dim" maxWidth="2xl">
          Everything independent practitioners, studios, and creators need to capture clients, automate bookings, and scale merchandise.
        </Text>
      </Stack>

      {/* 4 Graphic Cards Grid */}
      <Grid cols={{ base: 1, md: 2 }} gap={6}>
        {/* Card 1: Google Business Profile & Local Search */}
        <Box
          border
          radius="2xl"
          surface="default"
          padding={6}
          className="border-line/50 bg-gradient-to-b from-surface to-surface-alt/30 hover:border-accent/40 transition-colors shadow-lg group"
        >
          <Stack gap={5}>
            <Box display="flex" align="center" justify="between">
              <Box
                width={10}
                height={10}
                radius="lg"
                border
                display="flex"
                align="center"
                justify="center"
                className="border-accent/30 bg-accent/10 text-accent"
              >
                <Search size={20} />
              </Box>
              <Box
                paddingX={2.5}
                paddingY={1}
                radius="full"
                border
                className="border-success/30 bg-success/10 text-success font-mono text-[11px] font-bold flex items-center gap-1"
              >
                <CheckCircle2 size={12} />
                <span>Verified Local Pack</span>
              </Box>
            </Box>

            <Stack gap={2}>
              <Text as="h3" variant="headline" size="xl" weight="font-bold">
                Google Business Profile & Search SEO
              </Text>
              <Text variant="body" size="sm" color="dim">
                Establish high visibility on Google Maps and local search results. We inject rich Schema.org structured data so search engines index your services, location, and booking links.
              </Text>
            </Stack>

            {/* UI Mockup Graphic */}
            <Box
              surface="sunken"
              radius="xl"
              border
              padding={4}
              className="border-line/40 bg-surface-alt/60 select-none"
            >
              <Stack gap={2.5}>
                <Box display="flex" align="center" justify="between">
                  <Box display="flex" align="center" gap={1.5}>
                    <MapPin size={13} className="text-accent" />
                    <Text variant="mono" size="xs" weight="font-bold" color="main">
                      Google Maps & Local Search
                    </Text>
                  </Box>
                  <Box display="flex" align="center" gap={0.5} className="text-brand-amber">
                    <Star size={11} fill="currentColor" />
                    <Star size={11} fill="currentColor" />
                    <Star size={11} fill="currentColor" />
                    <Star size={11} fill="currentColor" />
                    <Star size={11} fill="currentColor" />
                  </Box>
                </Box>
                <Box padding={2.5} radius="md" surface="default" border className="border-line/30 bg-surface/90">
                  <Text variant="body" size="xs" weight="font-bold" color="accent" className="truncate">
                    Your Studio Name · San Francisco, CA
                  </Text>
                  <Text variant="body" size="xs" color="dim" className="text-[11px] mt-0.5">
                    Open · Appointments available online · Verified Schema
                  </Text>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Box>

        {/* Card 2: Google Shopping & Merch Feeds */}
        <Box
          border
          radius="2xl"
          surface="default"
          padding={6}
          className="border-line/50 bg-gradient-to-b from-surface to-surface-alt/30 hover:border-accent-sky/40 transition-colors shadow-lg group"
        >
          <Stack gap={5}>
            <Box display="flex" align="center" justify="between">
              <Box
                width={10}
                height={10}
                radius="lg"
                border
                display="flex"
                align="center"
                justify="center"
                className="border-accent-sky/30 bg-accent-sky/10 text-accent-sky"
              >
                <ShoppingBag size={20} />
              </Box>
              <Box
                paddingX={2.5}
                paddingY={1}
                radius="full"
                border
                className="border-accent-sky/30 bg-accent-sky/10 text-accent-sky font-mono text-[11px] font-bold flex items-center gap-1"
              >
                <Zap size={12} />
                <span>Google Merchant Feed</span>
              </Box>
            </Box>

            <Stack gap={2}>
              <Text as="h3" variant="headline" size="xl" weight="font-bold">
                Google Shopping & E-Commerce Merch
              </Text>
              <Text variant="body" size="sm" color="dim">
                Sell physical merchandise, print-on-demand apparel, or digital downloads with automated XML product feeds that sync directly into Google Shopping and Merchant Center.
              </Text>
            </Stack>

            {/* UI Mockup Graphic */}
            <Box
              surface="sunken"
              radius="xl"
              border
              padding={4}
              className="border-line/40 bg-surface-alt/60 select-none"
            >
              <Stack gap={2.5}>
                <Box display="flex" align="center" justify="between">
                  <Text variant="mono" size="xs" weight="font-bold" color="main">
                    Google Shopping Surfaces
                  </Text>
                  <Text variant="mono" size="xs" color="success" weight="font-bold">
                    In Stock · Automated Feed
                  </Text>
                </Box>
                <Box padding={2.5} radius="md" surface="default" border display="flex" align="center" justify="between" className="border-line/30 bg-surface/90">
                  <Box display="flex" align="center" gap={2}>
                    <Box width={7} height={7} radius="sm" className="bg-accent-sky/20 border border-accent-sky/40 flex items-center justify-center text-accent-sky font-mono text-xs font-bold">
                      🛍️
                    </Box>
                    <Stack gap={0}>
                      <Text variant="body" size="xs" weight="font-bold" color="main">
                        Studio Apparel & Goods
                      </Text>
                      <Text variant="mono" size="xs" color="dim" className="text-[10px]">
                        Sync: Printful / Shopify / Custom
                      </Text>
                    </Stack>
                  </Box>
                  <Text variant="mono" size="xs" weight="font-bold" color="accent-sky">
                    $38.00
                  </Text>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Box>

        {/* Card 3: 24/7 Online Booking & Scheduling */}
        <Box
          border
          radius="2xl"
          surface="default"
          padding={6}
          className="border-line/50 bg-gradient-to-b from-surface to-surface-alt/30 hover:border-accent/40 transition-colors shadow-lg group"
        >
          <Stack gap={5}>
            <Box display="flex" align="center" justify="between">
              <Box
                width={10}
                height={10}
                radius="lg"
                border
                display="flex"
                align="center"
                justify="center"
                className="border-accent/30 bg-accent/10 text-accent"
              >
                <Calendar size={20} />
              </Box>
              <Box
                paddingX={2.5}
                paddingY={1}
                radius="full"
                border
                className="border-accent/30 bg-accent/10 text-accent font-mono text-[11px] font-bold flex items-center gap-1"
              >
                <CheckCircle2 size={12} />
                <span>Real-Time Calendar Sync</span>
              </Box>
            </Box>

            <Stack gap={2}>
              <Text as="h3" variant="headline" size="xl" weight="font-bold">
                Frictionless Online Scheduling
              </Text>
              <Text variant="body" size="sm" color="dim">
                Let clients book appointments directly into your calendar 24/7. Eliminates back-and-forth messaging, prevents double-booking, and handles automated confirmation alerts.
              </Text>
            </Stack>

            {/* UI Mockup Graphic */}
            <Box
              surface="sunken"
              radius="xl"
              border
              padding={4}
              className="border-line/40 bg-surface-alt/60 select-none"
            >
              <Stack gap={2}>
                <Box display="flex" align="center" justify="between">
                  <Text variant="mono" size="xs" weight="font-bold" color="main">
                    Live Booking Slots
                  </Text>
                  <Text variant="mono" size="xs" color="accent" className="text-[10px]">
                    Pacific Time (PT)
                  </Text>
                </Box>
                <Box display="grid" className="grid-cols-3 gap-1.5">
                  <Box paddingY={1.5} radius="md" border className="border-line/30 bg-surface/90 text-center text-[10px] font-mono text-dim">
                    10:00 AM
                  </Box>
                  <Box paddingY={1.5} radius="md" border className="border-accent bg-accent/20 text-center text-[10px] font-mono text-accent font-bold">
                    1:30 PM ✓
                  </Box>
                  <Box paddingY={1.5} radius="md" border className="border-line/30 bg-surface/90 text-center text-[10px] font-mono text-dim">
                    4:00 PM
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Box>

        {/* Card 4: Mailing List & Smart Inquiry Forms */}
        <Box
          border
          radius="2xl"
          surface="default"
          padding={6}
          className="border-line/50 bg-gradient-to-b from-surface to-surface-alt/30 hover:border-accent-purple/40 transition-colors shadow-lg group"
        >
          <Stack gap={5}>
            <Box display="flex" align="center" justify="between">
              <Box
                width={10}
                height={10}
                radius="lg"
                border
                display="flex"
                align="center"
                justify="center"
                className="border-accent-purple/30 bg-accent-purple/10 text-accent-purple"
              >
                <Mail size={20} />
              </Box>
              <Box
                paddingX={2.5}
                paddingY={1}
                radius="full"
                border
                className="border-accent-purple/30 bg-accent-purple/10 text-accent-purple font-mono text-[11px] font-bold flex items-center gap-1"
              >
                <ArrowUpRight size={12} />
                <span>Audience & Leads</span>
              </Box>
            </Box>

            <Stack gap={2}>
              <Text as="h3" variant="headline" size="xl" weight="font-bold">
                Mailing Lists & Smart Inquiry Forms
              </Text>
              <Text variant="body" size="sm" color="dim">
                Build an owned audience outside social algorithms. Custom multi-step intake forms collect event specs, party sizes, and consultation requests routed straight to your inbox.
              </Text>
            </Stack>

            {/* UI Mockup Graphic */}
            <Box
              surface="sunken"
              radius="xl"
              border
              padding={4}
              className="border-line/40 bg-surface-alt/60 select-none"
            >
              <Stack gap={2}>
                <Box display="flex" align="center" justify="between">
                  <Text variant="mono" size="xs" weight="font-bold" color="main">
                    Automated Intake Dispatch
                  </Text>
                  <Text variant="mono" size="xs" color="accent-purple" className="text-[10px]">
                    Instant Routing
                  </Text>
                </Box>
                <Box padding={2} radius="md" surface="default" border display="flex" align="center" justify="between" className="border-line/30 bg-surface/90">
                  <Text variant="mono" size="xs" color="dim" className="text-[11px]">
                    client@domain.com
                  </Text>
                  <Box paddingX={2} paddingY={0.5} radius="sm" className="bg-accent-purple/20 border border-accent-purple/40 text-accent-purple font-mono text-[10px] font-bold">
                    SUBSCRIBED
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Grid>
    </Stack>
  );
};
