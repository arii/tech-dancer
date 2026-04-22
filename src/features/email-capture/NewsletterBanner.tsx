import { Box, Stack, Text } from '@/layouts/Primitives';
import { EmailForm } from './EmailForm';
import { Mail, X } from 'lucide-react';
import { motionTokens } from '@/styles/motion';
import { motion } from 'motion/react';
import { useEmailCaptureContext } from './EmailCaptureContext';
import { Button } from '@/layouts/Primitives';

export function NewsletterBanner() {
  const { hideBar } = useEmailCaptureContext();

  return (
    <Box 
      as={motion.div}
      initial={motionTokens.overlay.initial}
      animate={motionTokens.overlay.animate}
      exit={motionTokens.overlay.exit}
      transition={motionTokens.overlay.transition}
      className="bg-white/80 backdrop-blur-xl border-t border-line/50 mx-auto"
      padding="emailBar"
      position="fixed"
      inset="bottom"
      marginX={4}
      marginBottom={4}
      radius="2xl"
      shadow="topOverlay"
      zIndex="toast"
    >
      <Box position="absolute" inset="right" padding={2} zIndex="docked">
        <Button
          variant="ghost"
          size="sm"
          onClick={hideBar}
          aria-label="Dismiss"
          className="p-1 min-h-0 min-w-0"
        >
          <X className="w-4 h-4 text-text-dim hover:text-accent transition-colors" />
        </Button>
      </Box>

      <Stack 
        direction={{ base: 'col', md: 'row' }} 
        align="center" 
        justify="between" 
        gap={{ base: 4, md: 8 }}
        className="w-full"
      >
        <Stack direction="row" align="center" gap={4} className="w-full md:w-auto">
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
