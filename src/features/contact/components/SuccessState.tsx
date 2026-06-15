import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';

interface SuccessStateProps {
  onReset: () => void;
}

export function SuccessState({ onReset }: SuccessStateProps) {
  return (
    <Box as="section" padding="panel" display="flex" direction="col" align="center" justify="center" textAlign="center">
      <Stack gap={12} align="center">
        <Box width={24} height={24} border surface="dim" display="flex" align="center" justify="center" color="accent" radius="lg">
          <Sparkles className="w-12 h-12 stroke-1" />
        </Box>
        <Stack gap={4}>
          <Text variant="headline" size="6xl">Message Received.</Text>
          <Text variant="body" maxWidth="md" marginX="auto">
            Thank you for reaching out. I've received your message and will get back to you as soon as possible.
          </Text>
        </Stack>
        <Box
          as={motion.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          variant="mono"
          weight="font-bold"
          uppercase
          size="micro"
          border
          paddingX={8}
          paddingY={4}
          color="accent"
          cursor="pointer"
          className="hover:border-accent  transition-colors"
        >
          Send Another Message
        </Box>
      </Stack>
    </Box>
  );
}
