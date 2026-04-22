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
      className="bg-white/80 backdrop-blur-xl border border-line/50 rounded-none"
      marginX="auto"
      padding="emailBar"
      position="fixed"
      style={{ bottom: 0, left: '1rem', right: '1rem', width: 'calc(100% - 2rem)' }}
      zIndex="toast"
    >
      <Box position="absolute" className="top-2 right-2" zIndex="docked">
        <Button
          variant="ghost"
          size="sm"
          onClick={hideBar}
          aria-label="Dismiss"
          padding={1}
          minHeight={0}
          minWidth={0}
        >
          <X className="w-4 h-4 text-text-dim hover:text-accent transition-colors" />
        </Button>
      </Box>

      <Stack 
        direction={{ base: 'col', md: 'row' }} 
        align="center" 
        justify="between" 
        gap={{ base: 4, md: 8 }}
        width="full"
      >
        <Stack direction="row" align="center" gap={4} width={{ base: "full", md: "auto" }}>
          <Box padding="compact" surface="accent" opacity={5} display={{ base: 'none', sm: 'block' }}>
            <Mail className="w-5 h-5 text-accent" />
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
