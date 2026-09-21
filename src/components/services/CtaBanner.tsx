// src/components/services/CtaBanner.tsx
import { Rocket, ArrowRight } from 'lucide-react';
import { Stack, Box } from '@/layouts/Primitives';

export const CtaBanner = () => {
  return (
    <Stack direction={{ base: "col", md: "row" }} align="center" justify="between" gap={6} padding={{ base: 6, sm: 8 }} radius="2xl" border className="bg-surface/50 border-line">
      <Stack align="center" gap={4} className="text-center md:text-left">
        <Box width={12} height={12} radius="full" display="flex" align="center" justify="center" shrink={0} border className="bg-surface-alt border-line">
          <Rocket className="w-5 h-5 text-accent" />
        </Box>
        <Stack gap={1}>
          <Box as="h3" className="text-lg font-bold">Ready to build your digital business?</Box>
          <Box as="p" className="text-text-dim text-sm">Let's talk about your goals and create a custom plan for your creative business.</Box>
        </Stack>
      </Stack>

      <Box as="button" paddingY={3} paddingX={6} radius="lg" display="flex" align="center" gap={2} shrink={0} className="bg-accent text-bg font-semibold transition-colors whitespace-nowrap hover:bg-accent/80">
        Start a Conversation <ArrowRight className="w-4 h-4" />
      </Box>
    </Stack>
  );
};
