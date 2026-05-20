import { Plane } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Icon } from '@/components/ui/Icon';

interface EventTravelProps {
  id?: string;
  notes?: string;
}

export function EventTravel({ id, notes }: EventTravelProps) {
  if (!notes) return null;

  return (
    <Box id={id} as="section" data-testid="travel">
      <Stack gap={8}>
        <Box display="flex" align="center" gap={4}>
          <Icon icon={Plane} size="xl" color="accent" />
          <SectionHeader
            eyebrow="LOGISTICS"
            title="Travel & Venue Notes"
          />
        </Box>

        <Box border radius="xl" padding={8} surface="surface">
          <Text variant="body" size="lg" leading="relaxed" className="whitespace-pre-wrap">
            {notes}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
}
