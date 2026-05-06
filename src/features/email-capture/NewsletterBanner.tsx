import { Box, Stack, Text } from '@/layouts/Primitives';
import { EmailForm } from './EmailForm';
import { Mail, X } from 'lucide-react';
import { motionTokens } from '@/styles/motion';
import { motion } from 'motion/react';
import { useEmailStore } from './emailStore';
import { Button } from '@/layouts/Primitives';

export function NewsletterBanner() {
  const hideBar = useEmailStore((state) => state.hideBar);

  return (
    <Box 
      as={motion.div}
      initial={motionTokens.overlay.initial}
      animate={motionTokens.overlay.animate}
      exit={motionTokens.overlay.exit}
      transition={motionTokens.overlay.transition}
      surface="default"
      opacity={0.95}
      className="backdrop-blur-2xl border-t border-accent/20"
      shadow="topOverlay"
      padding="emailBar"
      radius="none"
      marginX="auto"
      position="fixed"
      bottom={0}
      left={4}
      right={4}
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
          className="min-w-0"
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
          <Box padding="compact" surface="accent" opacity={0.5} display={{ base: 'none', sm: 'block' }} width={12} height={12} minWidth={12} minHeight={12} flex="none">
            <Mail className="w-5 h-5 text-accent" />
          </Box>
          <Stack gap={0}>
            <Text variant="display" size="base" uppercase tracking="tight">
              Weekly Insights
            </Text>
            <Text variant="mono" size="micro" weight="font-bold" color="dim" uppercase tracking="emphasized">
              Dance Analytics // Gear Reviews // Community Updates
            </Text>
          </Stack>
        </Stack>
        
        <EmailForm />
      </Stack>
    </Box>
  );
}
