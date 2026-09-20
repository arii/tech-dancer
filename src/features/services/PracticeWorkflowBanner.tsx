<<<<<<< HEAD
import { MessageSquare, CalendarCheck, ShieldCheck, BellRing, ArrowRight, Zap } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Box, Stack, Text, Button } from '@/layouts/Primitives';
=======
import { Box, Stack, Text, Button } from '@/layouts/Primitives';
import { NavLink } from 'react-router-dom';
import { MessageSquare, CalendarCheck, ShieldCheck, BellRing, ArrowRight, Zap } from 'lucide-react';
>>>>>>> 64ba8793e6 (update)

const WORKFLOW_STEPS = [
  {
    step: '01',
    icon: MessageSquare,
    title: 'Inquiry',
<<<<<<< HEAD
    desc: 'Custom smart intake routing & lead capture',
=======
    desc: 'Custom smart intake',
>>>>>>> 64ba8793e6 (update)
  },
  {
    step: '02',
    icon: CalendarCheck,
    title: 'Booking',
<<<<<<< HEAD
    desc: 'Real-time calendar lock & time slot selection',
=======
    desc: 'Real-time calendar lock',
>>>>>>> 64ba8793e6 (update)
  },
  {
    step: '03',
    icon: ShieldCheck,
    title: 'Confirmation',
<<<<<<< HEAD
    desc: 'Instant calendar sync & deposit collection',
=======
    desc: 'Instant deposit & sync',
>>>>>>> 64ba8793e6 (update)
  },
  {
    step: '04',
    icon: BellRing,
    title: 'Reminder',
<<<<<<< HEAD
    desc: 'Automated email / SMS appointment alerts',
=======
    desc: 'Automated SMS / email',
>>>>>>> 64ba8793e6 (update)
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
<<<<<<< HEAD
      className="text-center border-accent/40 shadow-2xl relative bg-gradient-to-b from-surface to-surface-alt/60"
    >
      {/* Subtle Radial Pattern */}
      <Box
        position="absolute"
        inset
        className="pointer-events-none opacity-10 bg-[radial-gradient(#22d3ee_1px,transparent_1px)] [background-size:16px_16px]"
=======
      className="text-center border-accent/40 shadow-2xl relative"
    >
      {/* Subtle Edge Grid Background Texture */}
      <Box
        position="absolute"
        inset
        className="pointer-events-none opacity-15 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:16px_16px]"
>>>>>>> 64ba8793e6 (update)
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
<<<<<<< HEAD
            <span>AUTOMATED CLIENT WORKFLOWS</span>
          </Box>

          <Text as="h2" variant="headline" size="3xl" weight="font-bold">
            Systematized Operations for Independent Practices
          </Text>
          <Text as="p" variant="body" size="lg" color="dim" maxWidth="2xl">
            Streamline your bookings with structured client intake, zero-latency calendar scheduling, and automated reminders.
=======
            <span>EDGE-HOSTED AUTOMATION WORKFLOWS</span>
          </Box>

          <Text as="h2" variant="headline" size="3xl" weight="font-bold">
            Running an independent practice?
          </Text>
          <Text as="p" variant="body" size="lg" color="dim" maxWidth="2xl">
            Streamline your bookings and operations with automated client intake, zero-latency scheduling, and lightning-fast web performance.
>>>>>>> 64ba8793e6 (update)
          </Text>
        </Stack>

        {/* Workflow Diagram: Inquiry -> Booking -> Confirmation -> Reminder */}
        <Box width="full" maxWidth="4xl" marginY={2}>
          <Box
            display="grid"
<<<<<<< HEAD
            className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative"
=======
            gridTemplateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
            gap={4}
            position="relative"
>>>>>>> 64ba8793e6 (update)
          >
            {WORKFLOW_STEPS.map((item, index) => {
              const Icon = item.icon;
              return (
<<<<<<< HEAD
                <Stack
=======
                <Box
>>>>>>> 64ba8793e6 (update)
                  key={item.step}
                  surface="default"
                  radius="xl"
                  border
                  padding={5}
<<<<<<< HEAD
                  align="center"
=======
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
>>>>>>> 64ba8793e6 (update)
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
<<<<<<< HEAD
                    align="center"
                    justify="center"
=======
                    alignItems="center"
                    justifyContent="center"
>>>>>>> 64ba8793e6 (update)
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
<<<<<<< HEAD
                </Stack>
=======
                </Box>
>>>>>>> 64ba8793e6 (update)
              );
            })}
          </Box>
        </Box>

        {/* CTA Actions */}
        <Button as={NavLink} to="/services#intake-form" variant="primary" size="lg" marginTop={2} className="shadow-lg hover:shadow-accent/20">
<<<<<<< HEAD
          Request Studio Consultation →
=======
          View Services & Request Consultation →
>>>>>>> 64ba8793e6 (update)
        </Button>
      </Stack>
    </Box>
  );
};
