import { Box, Stack, Text } from '@/layouts/Primitives';
import { Info } from 'lucide-react';

export function AffiliateDisclosure() {
  return (
    <Box padding={4} radius="md" surface="card" border className="border-line/50">
      <Stack direction="row" gap={3} align="start">
        <Box marginTop={0.5} className="text-accent opacity-80">
          <Info className="w-4 h-4" />
        </Box>
        <Text variant="body" size="sm" color="dim" leading="relaxed">
          Some gear links may be affiliate links. BoomTick may earn a commission if you purchase through those links, at no extra cost to you.
        </Text>
      </Stack>
    </Box>
  );
}
