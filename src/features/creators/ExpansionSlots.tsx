import { Box, Stack, Text, Button } from '@/layouts/Primitives';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, UserRound, GraduationCap, LucideIcon } from 'lucide-react';

interface ExpansionSlotCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

function ExpansionSlotCard({ title, description, icon: Icon }: ExpansionSlotCardProps) {
  return (
    <Box border radius="lg" overflow="hidden" surface="default" height="full" display="flex" flexDirection="column" className="creator-card group border-dashed opacity-80 hover:opacity-100 transition-opacity">
      <Box className="creator-media" position="relative" height={48} width="full" bg="surface-alt" display="flex" alignItems="center" justify="center">
        <Icon size={48} className="text-dim/50" />
        <Box position="absolute" top={4} right={4} paddingX={3} paddingY={1} radius="full" className="bg-bg/90 backdrop-blur-sm text-xs font-bold uppercase text-accent">
          Concept — Open Slot
        </Box>
      </Box>
      <Stack className="creator-body" padding={6} gap={4} flex={1}>
        <Stack gap={1}>
          <Text as="h2" variant="headline" size="xl" weight="font-bold">Option B Concept Previews</Text>
          <Text as="p" className="creator-location" variant="mono" size="xs" color="dim">{title}</Text>
        </Stack>
        <Text as="p" className="creator-description" variant="body" size="sm" color="main" flex={1}>
          {description}
        </Text>
        <Box className="creator-actions" marginTop={4}>
          <Button as={NavLink} to="/services#intake-form" variant="outline" width="full">
            Inquire About Slot ↗
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

const EXPANSION_SLOTS = [
  {
    title: "Dance Instructor / Studio",
    description: "Private lesson scheduling, workshop registrations, and digital payment pipelines.",
    icon: Users
  },
  {
    title: "Personal Fitness Trainer",
    description: "Client onboarding questionnaires, automated check-ins, and recurring subscriptions.",
    icon: LayoutDashboard
  },
  {
    title: "Therapist / Counselor",
    description: "HIPAA-conscious inquiry workflows, calendar reservation locks, and consultation intake.",
    icon: UserRound
  },
  {
    title: "Private Tutor / Academic Coach",
    description: "Curriculum overviews, parent intake forms, and automated lesson reminders.",
    icon: GraduationCap
  }
];

export function ExpansionSlots() {
  return (
    <>
      {EXPANSION_SLOTS.map((slot) => (
        <ExpansionSlotCard
          key={slot.title}
          title={slot.title}
          description={slot.description}
          icon={slot.icon}
        />
      ))}
    </>
  );
}
