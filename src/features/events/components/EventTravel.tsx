import { Plane } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';

interface EventTravelProps {
  id?: string;
  notes?: string;
}

export function EventTravel({ id, notes }: EventTravelProps) {
  if (!notes) return null;

  return (
    <Box id={id} as="section" data-testid="travel" scrollMarginTop={32}>
      <Stack gap={8}>
        <Stack gap={2}>
          <Text variant="mono" size="xs" color="accent" weight="font-bold" uppercase tracking="widest">
            Logistics
          </Text>
          <Box display="flex" align="center" gap={3}>
            <Plane className="w-8 h-8 text-white" />
            <Text variant="headline" size="3xl" weight="font-black">
              Travel & Venue Notes
            </Text>
          </Box>
        </Stack>

        <Box border radius="lg" padding={8} surface="surface">
          <Text variant="body" size="lg" className="leading-relaxed whitespace-pre-wrap">
            {notes}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
}
