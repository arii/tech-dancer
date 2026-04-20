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
      width="full"
    >
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
          <Stack gap={1}>
            <Text variant="utility" size="xs">
              Mailing_List
            </Text>
            <Text variant="display" size="sm" weight="font-bold" className="uppercase tracking-wide">
              Get the WCS_PACKING_LIST + Weekly Intel.
            </Text>
          </Stack>
        </Stack>
        
        <EmailForm />
      </Stack>
    </Box>
  );
}
