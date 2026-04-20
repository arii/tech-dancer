import { Box, Stack, Text } from '@/layouts/Primitives';
import { EmailForm } from './EmailForm';
import { Mail } from 'lucide-react';
import { motionTokens } from '@/styles/motion';
import { motion } from 'motion/react';

export function EmailCaptureBar() {
  return (
    <Box 
      as={motion.div}
      initial={motionTokens.overlay.initial}
      animate={motionTokens.overlay.animate}
      exit={motionTokens.overlay.exit}
      transition={motionTokens.overlay.transition}
      surface="default"
      border="t"
      shadow="topOverlay"
      padding="emailBar"
      position="fixed"
      inset="bottom"
      zIndex="top"
    >
      <Stack 
        direction={{ base: 'col', md: 'row' }} 
        align="center" 
        justify="between" 
        gap={{ base: 4, md: 8 }}
      >
        <Stack direction="row" align="center" gap={4}>
          <Box padding="compact" surface="accent" opacity={5} display={{ base: 'none', sm: 'block' }}>
            <Mail className="w-5 h-5 text-accent-brand" />
          </Box>
          <Stack gap={0}>
            <Text variant="display" size="base" uppercase tracking="tight">
              Weekly Insights
            </Text>
            <Text variant="mono" size="micro" color="dim" uppercase tracking="widest">
              Dance Analytics // Gear Reviews // Community Updates
            </Text>
          </Stack>
        </Stack>
        
        <EmailForm />
      </Stack>
    </Box>
  );
}
