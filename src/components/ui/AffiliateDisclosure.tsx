import { Text, Box } from '@/layouts/Primitives';
import { Info } from 'lucide-react';

export function AffiliateDisclosure() {
  return (
    <Box
      padding={4}
      radius="md"
      border
      display="flex"
      align="start"
      gap={3}
      className="bg-accent/5 border-accent/20"
    >
      <Box shrink={false} marginTop={0.5}>
        <Info className="w-5 h-5 text-accent" />
      </Box>
      <Text variant="body" size="sm" color="dim" leading="relaxed">
        Some gear links may be affiliate links. BoomTick may earn a commission if you purchase through those links, at no extra cost to you.
      </Text>
    </Box>
  );
}
