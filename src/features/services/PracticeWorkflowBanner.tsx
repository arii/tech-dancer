import { MessageSquare, CalendarCheck, ShieldCheck, BellRing, ArrowRight, Zap } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Box, Stack, Text, Button } from '@/layouts/Primitives';

const WORKFLOW_STEPS = [
  {
    step: '01',
    icon: MessageSquare,
    title: 'Inquiry',
    desc: 'Custom smart intake routing & lead capture',
  },
  {
    step: '02',
    icon: CalendarCheck,
    title: 'Booking',
    desc: 'Real-time calendar lock & time slot selection',
  },
  {
    step: '03',
    icon: ShieldCheck,
    title: 'Confirmation',
    desc: 'Instant calendar sync & deposit collection',
  },
  {
    step: '04',
    icon: BellRing,
    title: 'Reminder',
    desc: 'Automated email / SMS appointment alerts',
  },
];

export const PracticeWorkflowBanner = () => {
  return (
    <Box
      border
      radius="2xl"
      surface="accent"
      overflow="hidden"
      position="relative"
      padding={{ base: 6, sm: 8, md: 12 }}
      className="text-center border-accent/40 shadow-2xl relative bg-gradient-to-b from-surface to-surface-alt/60"
    >
      {/* Subtle Radial Pattern */}
      <Box
        position="absolute"
        inset
        className="pointer-events-none opacity-10 bg-[radial-gradient(#22d3ee_1px,transparent_1px)] [background-size:16px_16px]"
      />

      <Stack gap={8} align="center" className="relative z-10">
        {/* Header Badge & Title */}
        <Stack gap={4} align="center" maxWidth="3xl">
          <Box
            paddingX={3}
            paddingY={1}
            radius="full"
            border
            className="border-accent/40 bg-bg/80 text-accent font-mono text-xs font-bold flex items-center gap-1.5 shadow-sm"
          >
            <Zap size={13} className="text-accent" />
            <span>AUTOMATED CLIENT WORKFLOWS</span>
          </Box>

          <Text as="h2" variant="headline" size="3xl" weight="font-bold">
            Systematized Operations for Independent Practices
          </Text>
          <Text as="p" variant="body" size="lg" color="dim" maxWidth="2xl">
            Streamline your bookings with structured client intake, zero-latency calendar scheduling, and automated reminders.
          </Text>
        </Stack>

        {/* Workflow Diagram: Inquiry -> Booking -> Confirmation -> Reminder */}
        <Box width="full" maxWidth="4xl" marginY={2}>
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
                  align="center"
                  className="border-line/40 bg-surface/80 backdrop-blur-sm relative group hover:border-accent/50 transition-colors shadow-sm"
                >
                  <Box
                    position="absolute"
                    top={3}
                    right={3}
                    className="font-mono text-[10px] font-bold text-dim/60"
                  >
                    {item.step}
                  </Box>

                  <Box
                    width={10}
                    height={10}
                    radius="lg"
                    border
                    display="flex"
                    align="center"
                    justify="center"
                    marginBottom={3}
                    className="border-accent/30 bg-accent/10 text-accent"
                  >
                    <Icon size={18} />
                  </Box>

                  <Text variant="headline" size="md" weight="font-bold" color="main" className="mb-1">
                    {item.title}
                  </Text>
                  <Text variant="body" size="xs" color="dim" className="text-center">
                    {item.desc}
                  </Text>

                  {/* Desktop forward connector arrow */}
                  {index < WORKFLOW_STEPS.length - 1 && (
                    <Box
                      className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-surface border border-accent/40 items-center justify-center text-accent shadow-sm"
                    >
                      <ArrowRight size={12} />
                    </Box>
                  )}
                </Stack>
              );
            })}
          </Box>
        </Box>

        {/* CTA Actions */}
        <Button as={NavLink} to="/services#intake-form" variant="primary" size="lg" marginTop={2} className="shadow-lg hover:shadow-accent/20">
          Request Studio Consultation →
        </Button>
      </Stack>
    </Box>
  );
};
