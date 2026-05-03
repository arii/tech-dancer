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
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      zIndex="toast"
      className="pointer-events-none"
    >
      <Box 
        marginLeft={{ base: 0, md: 64 }} 
        className="pointer-events-auto"
      >
        <Box
          className="bg-surface/95 backdrop-blur-2xl border-t border-line/50"
          shadow="topOverlay"
          paddingX={{ base: 4, md: 8 }}
          paddingY={4}
          width="full"
        >
          <Box maxWidth="6xl" marginX="auto" position="relative">
            <Box position="absolute" className="-top-2 -right-2 md:right-0" zIndex="docked">
              <Button
                variant="ghost"
                size="sm"
                onClick={hideBar}
                aria-label="Dismiss"
                className="text-text-dim/50 hover:text-primary transition-colors min-w-0"
                padding={1}
              >
                <X className="w-4 h-4" />
              </Button>
            </Box>

            <Stack 
              direction={{ base: 'col', sm: 'row' }} 
              align="center" 
              justify="between" 
              gap={{ base: 4, sm: 8 }}
              className="w-full"
            >
              <Stack direction="row" align="center" gap={4} className="w-full sm:w-auto">
                <Box 
                  display={{ base: 'none', lg: 'flex' }}
                  align="center"
                  justify="center"
                  width={10} 
                  height={10} 
                  radius="full" 
                  className="bg-primary/10 border border-primary/20"
                >
                  <Mail className="w-5 h-5 text-primary" />
                </Box>
                <Stack gap={0}>
                  <Text variant="display" size="sm" uppercase tracking="tight" className="text-white">
                    Weekly Insights
                  </Text>
                  <Text variant="mono" size="micro" weight="font-bold" uppercase tracking="emphasized" className="text-primary">
                    Dance Analytics // Gear Reviews // Community Updates
                  </Text>
                </Stack>
              </Stack>
              
              <Box width={{ base: 'full', sm: 'auto' }} maxWidth={{ base: 'full', sm: 'md' }}>
                <EmailForm />
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
