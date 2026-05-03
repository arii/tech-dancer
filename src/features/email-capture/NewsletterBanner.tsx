import { Box, Stack, Text, Button } from '@/layouts/Primitives';
import { EmailForm } from './EmailForm';
import { Mail, X } from 'lucide-react';
import { motionTokens } from '@/styles/motion';
import { motion } from 'motion/react';
import { useEmailStore } from './emailStore';

export function NewsletterBanner() {
  const hideBar = useEmailStore((state) => state.hideBar);

  return (
    <Box
      as={motion.div}
      initial={motionTokens.overlay.initial}
      animate={motionTokens.overlay.animate}
      exit={motionTokens.overlay.exit}
      transition={motionTokens.overlay.transition}
      className="fixed inset-x-4 bottom-4 z-toast overflow-hidden border border-cyan-300/20 bg-[#090916]/96 px-4 py-4 shadow-[0_-14px_44px_rgba(0,0,0,0.45)] backdrop-blur-xl md:px-6 md:py-5"
      radius="lg"
    >
      <Box position="absolute" top={3} right={3} zIndex="docked">
        <Button
          variant="ghost"
          size="sm"
          onClick={hideBar}
          aria-label="Dismiss"
          padding={1}
          minHeight={0}
          minWidth={0}
          className="text-text-dim hover:text-white"
        >
          <X className="w-4 h-4" />
        </Button>
      </Box>

      <Stack
        direction={{ base: 'col', md: 'row' }}
        align={{ base: 'start', md: 'center' }}
        justify="between"
        gap={{ base: 3, md: 6 }}
        className="w-full pr-8"
      >
        <Stack direction="row" align="center" gap={3} className="w-full md:w-auto">
          <Box padding="compact" surface="accent" opacity={16} className="hidden sm:flex rounded-md shadow-[0_0_18px_rgba(0,229,255,.14)]" display="flex" align="center" justify="center">
            <Mail className="w-5 h-5 text-accent" />
          </Box>
          <Stack gap={0}>
            <Text variant="display" size="base" uppercase tracking="tight" className="text-white">
              Weekly Insights
            </Text>
            <Text variant="mono" size="micro" color="white" uppercase tracking="widest" className="opacity-70">
              Dance Analytics // Gear Reviews // Community Updates
            </Text>
          </Stack>
        </Stack>

        <Box className="w-full md:w-auto md:min-w-[320px] md:max-w-[440px]">
          <EmailForm />
        </Box>
      </Stack>
    </Box>
  );
}
