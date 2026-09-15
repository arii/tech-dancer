import { Box, Stack, Text } from '@/layouts/Primitives';

interface ExpansionSlotCardProps {
  title: string;
  description: string;
}

function ExpansionSlotCard({ title, description }: ExpansionSlotCardProps) {
  return (
    <Box border radius="lg" padding={6} surface="alt" display="flex" flexDirection="column" justify="center" minHeight={48} className="border-dashed border-line/50 opacity-80 hover:opacity-100 transition-opacity">
      <Stack gap={2}>
        <Text variant="mono" size="sm" weight="font-bold" color="dim">{title}</Text>
        <Text variant="body" size="sm" color="dim">{description}</Text>
      </Stack>
    </Box>
  );
}

const EXPANSION_SLOTS = [
  {
    title: "Dance Instructor / Studio",
    description: "Private lesson scheduling, workshop registrations, and digital payment pipelines."
  },
  {
    title: "Personal Fitness Trainer",
    description: "Client onboarding questionnaires, automated check-ins, and recurring subscriptions."
  },
  {
    title: "Therapist / Counselor",
    description: "HIPAA-conscious inquiry workflows, calendar reservation locks, and consultation intake."
  },
  {
    title: "Private Tutor / Academic Coach",
    description: "Curriculum overviews, parent intake forms, and automated lesson reminders."
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
        />
      ))}
    </>
  );
}
