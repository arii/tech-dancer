import { ArrowUpRight, CheckCircle2, Lock, Sparkles, MessageSquare, CalendarCheck, ShieldCheck, BellRing, ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { ASSET_PREFIX } from '@/config/constants';
import { Box, Stack, Text, Button, Grid } from '@/layouts/Primitives';

const WORKFLOW_STEPS = [
  {
    step: '01',
    icon: MessageSquare,
    title: 'Smart Intake',
    desc: 'Structured consultation forms capture curl history, goals, and event details.',
  },
  {
    step: '02',
    icon: CalendarCheck,
    title: 'Live Calendar Lock',
    desc: 'Clients self-book open slots directly without back-and-forth DM messaging.',
  },
  {
    step: '03',
    icon: ShieldCheck,
    title: 'Instant Confirmation',
    desc: 'Automatic calendar invites and slot locking prevent double-booking.',
  },
  {
    step: '04',
    icon: BellRing,
    title: 'Automated Reminders',
    desc: 'Email and calendar alerts keep clients on schedule with zero manual texting.',
  },
];

export const CaseStudySpotlight = () => {
  const gifSrc = `${ASSET_PREFIX}/images/services/hair-by-april-booking.gif`;

  return (
    <Box
      id="case-study"
      border
      radius="2xl"
      surface="default"
      overflow="hidden"
      padding={{ base: 6, sm: 8, md: 10 }}
      className="border-accent/40 bg-gradient-to-br from-surface via-surface-alt/50 to-surface shadow-2xl relative"
    >
      <Stack gap={10}>
        {/* Section Header */}
        <Stack gap={3}>
          <Box display="flex" align="center" gap={2}>
            <Box
              paddingX={3}
              paddingY={1}
              radius="full"
              border
              className="border-accent/40 bg-accent/10 text-accent font-mono text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Sparkles size={13} />
              <span>LIVE CLIENT PROOF</span>
            </Box>
          </Box>
          <Text as="h2" variant="headline" size="3xl" weight="font-bold">
            Case Study: Hair by April
          </Text>
          <Text variant="body" size="lg" color="dim" maxWidth="3xl">
            How a top San Francisco curly hair specialist transitioned from manual Instagram DM inquiries to an automated, hands-off booking and intake workflow.
          </Text>
        </Stack>

        {/* Main Content Grid: Story & Contrast on left, Live Recording Preview on right */}
        <Grid cols={{ base: 1, lg: 12 }} gap={8} align="center">
          {/* Left Column: Problem & True Solution Built */}
          <Box className="lg:col-span-5">
            <Stack gap={6}>
              {/* Before & After comparison card */}
              <Grid cols={{ base: 1, sm: 2 }} gap={4}>
                <Stack surface="sunken" radius="xl" border padding={4} gap={2} className="border-line/40 bg-surface-alt/40">
                  <Text variant="mono" size="xs" weight="font-bold" color="error" uppercase>
                    The Friction Before
                  </Text>
                  <Text variant="body" size="xs" color="dim">
                    Manual messaging across DMs, coordinating open time slots over text messages, and chasing down consultation details.
                  </Text>
                </Stack>
                <Stack surface="sunken" radius="xl" border padding={4} gap={2} className="border-accent/40 bg-accent/5">
                  <Text variant="mono" size="xs" weight="font-bold" color="accent" uppercase>
                    The Solution Built
                  </Text>
                  <Text variant="body" size="xs" color="main">
                    Custom mobile-first portfolio, automated 24/7 calendar booking, clear service pricing, and zero back-and-forth friction.
                  </Text>
                </Stack>
              </Grid>

              {/* Action link */}
              <Box display="flex" align="center" gap={4} className="pt-2">
                <Button
                  as="a"
                  href="https://hairbyapril.pages.dev"
                  target="_blank"
                  rel="noopener"
                  variant="primary"
                  size="lg"
                  className="shadow-md"
                >
                  Visit Live Client Site <ArrowUpRight size={15} className="ml-1" />
                </Button>
              </Box>
            </Stack>
          </Box>

          {/* Right Column: Live Interactive GIF in Polished Browser Frame */}
          <Box className="lg:col-span-7">
            <Box
              border
              radius="2xl"
              overflow="hidden"
              surface="sunken"
              className="border-line/60 shadow-2xl relative group bg-surface ring-1 ring-accent/20"
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

        {/* Integrated Production Workflow: The System Hair by April Runs On */}
        <Stack gap={4}>
          <Text variant="mono" size="xs" weight="font-bold" color="accent" uppercase tracking="wider">
            The Production System Hair by April Runs On
          </Text>
          <Box
            display="grid"
            className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative"
          >
            {WORKFLOW_STEPS.map((item, index) => {
              const Icon = item.icon;
              return (
                <Stack
                  key={item.step}
                  surface="default"
                  radius="xl"
                  border
                  padding={5}
                  className="border-line/40 bg-surface/80 relative group hover:border-accent/40 transition-colors shadow-sm"
                >
                  <Box display="flex" align="center" justify="between" marginBottom={2}>
                    <Box
                      width={9}
                      height={9}
                      radius="lg"
                      border
                      display="flex"
                      align="center"
                      justify="center"
                      className="border-accent/30 bg-accent/10 text-accent"
                    >
                      <Icon size={16} />
                    </Box>
                    <span className="font-mono text-[10px] font-bold text-dim/60">{item.step}</span>
                  </Box>

                  <Text variant="headline" size="sm" weight="font-bold" color="main" className="mb-1">
                    {item.title}
                  </Text>
                  <Text variant="body" size="xs" color="dim">
                    {item.desc}
                  </Text>

                  {/* Desktop forward connector arrow */}
                  {index < WORKFLOW_STEPS.length - 1 && (
                    <Box
                      className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-5 h-5 rounded-full bg-surface border border-accent/40 items-center justify-center text-accent shadow-sm"
                    >
                      <ArrowRight size={10} />
                    </Box>
                  )}
                </Stack>
              );
            })}
          </Box>
        </Stack>

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
