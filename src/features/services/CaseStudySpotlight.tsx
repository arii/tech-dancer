import { ArrowUpRight, CheckCircle2, Lock, Sparkles, Calendar, ShieldCheck, Zap } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { ASSET_PREFIX } from '@/config/constants';
import { Box, Stack, Text, Button, Grid } from '@/layouts/Primitives';

export const CaseStudySpotlight = () => {
  const gifSrc = `${ASSET_PREFIX}/images/creators/hair-by-april-booking.gif`;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    if (!target.dataset.triedFallback) {
      target.dataset.triedFallback = 'true';
      target.src = '/images/creators/hair-by-april-booking.gif';
    }
  };

  return (
    <Box
      id="case-study"
      border
      radius="2xl"
      surface="default"
      overflow="hidden"
      padding={{ base: 6, sm: 8, md: 10 }}
      className="border-line/60 bg-gradient-to-br from-surface to-surface-alt/40 shadow-xl relative"
    >
      <Stack gap={8}>
        {/* Section Header */}
        <Stack gap={3}>
          <Box display="flex" align="center" gap={2}>
            <Box
              paddingX={3}
              paddingY={1}
              radius="full"
              border
              className="border-accent/40 bg-accent/10 text-accent font-mono text-xs font-bold flex items-center gap-1.5"
            >
              <Sparkles size={13} />
              <span>LIVE CLIENT PRODUCTION SPOTLIGHT</span>
            </Box>
          </Box>
          <Text as="h2" variant="headline" size="3xl" weight="font-bold">
            Case Study: Hair by April
          </Text>
          <Text variant="body" size="md" color="dim" maxWidth="3xl">
            How a top San Francisco hair specialist transitioned from manual Instagram DM inquiries to an automated, hands-off booking and intake workflow.
          </Text>
        </Stack>

        {/* Main Content Grid: Workflow comparison on left, Live Recording Preview on right */}
        <Grid cols={{ base: 1, lg: 12 }} gap={8} align="center">
          {/* Left Column: Problem & True Solution Built */}
          <Box className="lg:col-span-6">
            <Stack gap={6}>
              {/* Before & After comparison card */}
              <Grid cols={{ base: 1, sm: 2 }} gap={4}>
                <Stack surface="sunken" radius="lg" border padding={4} gap={2} className="border-line/40 bg-surface-alt/40">
                  <Text variant="mono" size="xs" weight="font-bold" color="error" uppercase>
                    The Friction Before
                  </Text>
                  <Text variant="body" size="xs" color="dim">
                    Manual messaging across DMs, coordinating open time slots over text messages, and chasing down consultation details.
                  </Text>
                </Stack>
                <Stack surface="sunken" radius="lg" border padding={4} gap={2} className="border-accent/30 bg-accent/5">
                  <Text variant="mono" size="xs" weight="font-bold" color="accent" uppercase>
                    The Solution Built
                  </Text>
                  <Text variant="body" size="xs" color="main">
                    Custom mobile-first portfolio, automated 24/7 calendar booking, clear service pricing, and zero back-and-forth friction.
                  </Text>
                </Stack>
              </Grid>

              {/* Verified Technical Capabilities */}
              <Stack gap={3}>
                <Text variant="mono" size="xs" weight="font-bold" color="dim" uppercase>
                  Production Features Implemented
                </Text>
                <Stack gap={2.5}>
                  <Box display="flex" align="start" gap={3}>
                    <Calendar size={16} className="text-accent shrink-0 mt-0.5" />
                    <Text variant="body" size="sm" color="main">
                      <strong className="text-accent">Direct Client Self-Booking:</strong> Clients browse service menus and lock open calendar slots instantly.
                    </Text>
                  </Box>
                  <Box display="flex" align="start" gap={3}>
                    <Zap size={16} className="text-success shrink-0 mt-0.5" />
                    <Text variant="body" size="sm" color="main">
                      <strong className="text-success">Live Calendar Synchronization:</strong> Real-time slot locking prevents double bookings and sends automated calendar invites.
                    </Text>
                  </Box>
                  <Box display="flex" align="start" gap={3}>
                    <ShieldCheck size={16} className="text-accent-sky shrink-0 mt-0.5" />
                    <Text variant="body" size="sm" color="main">
                      <strong className="text-accent-sky">Structured Intake & Event Routing:</strong> Dedicated consultation forms capture specific requirements, party sizes, and hair goals.
                    </Text>
                  </Box>
                </Stack>
              </Stack>

              {/* Action link */}
              <Box display="flex" align="center" gap={4} className="pt-2">
                <Button
                  as="a"
                  href="https://hairbyapril.pages.dev"
                  target="_blank"
                  rel="noopener"
                  variant="primary"
                  className="shadow-md"
                >
                  Visit Live Client Site <ArrowUpRight size={15} className="ml-1" />
                </Button>
              </Box>
            </Stack>
          </Box>

          {/* Right Column: Live Interactive GIF in Polished Browser Frame */}
          <Box className="lg:col-span-6">
            <Box
              border
              radius="2xl"
              overflow="hidden"
              surface="sunken"
              className="border-line/60 shadow-2xl relative group bg-surface"
            >
              {/* Browser Chrome Bar */}
              <Box
                paddingX={4}
                paddingY={2.5}
                border="b"
                surface="default"
                display="flex"
                align="center"
                justify="between"
                className="border-line/40 bg-surface/90"
              >
                <Box display="flex" align="center" gap={1.5}>
                  <Box width={2.5} height={2.5} radius="full" className="bg-error/60" />
                  <Box width={2.5} height={2.5} radius="full" className="bg-brand-amber/60" />
                  <Box width={2.5} height={2.5} radius="full" className="bg-success/60" />
                </Box>
                <Box
                  paddingX={3}
                  paddingY={1}
                  radius="md"
                  surface="sunken"
                  display="flex"
                  align="center"
                  gap={1.5}
                  className="text-[11px] font-mono text-dim border border-line/20 max-w-[220px] truncate"
                >
                  <Lock size={10} className="text-accent shrink-0" />
                  <span className="truncate">hairbyapril.pages.dev</span>
                </Box>
                <Box width={4} />
              </Box>

              {/* GIF Preview Canvas */}
              <Box className="relative w-full aspect-[16/10] bg-surface-alt">
                <img
                  src={gifSrc}
                  alt="Hair by April Live Booking Flow"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  onError={handleImageError}
                />
                <Box
                  position="absolute"
                  bottom={3}
                  right={3}
                  paddingX={2.5}
                  paddingY={1}
                  radius="md"
                  className="bg-bg/90 backdrop-blur-md text-[11px] font-mono font-bold text-accent border border-line/30 flex items-center gap-1.5 shadow-sm"
                >
                  <CheckCircle2 size={12} className="text-accent" />
                  <span>Live Production Workflow</span>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Studio Credibility Footnote */}
        <Box border radius="lg" padding={4} surface="sunken" className="border-line/30 bg-surface-alt/30 text-center">
          <Text variant="body" size="xs" color="dim">
            ✨ We run our own studio's web presence, merchandise catalog, and automated Google Shopping feeds on the exact same modern infrastructure. Learn more on our{' '}
            <NavLink to="/about" className="text-accent hover:underline font-medium">
              About & Operations page →
            </NavLink>
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};
