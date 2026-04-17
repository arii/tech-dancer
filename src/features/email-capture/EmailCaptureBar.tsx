import { Box, Stack, Text, Motion, Icon, Inline } from '@/components/layout/Primitives';
import { EmailForm } from './EmailForm';
import { Mail } from 'lucide-react';
import { motionTokens } from '@/styles/motion';

export function EmailCaptureBar() {
  return (
    <Motion 
      initial={motionTokens.overlay.initial}
      animate={motionTokens.overlay.animate}
      exit={motionTokens.overlay.exit}
      transition={motionTokens.overlay.transition}
      surface="default"
      border="t"
      shadow="lg"
      padding="xl"
      position="fixed"
      inset="bottom"
      zIndex="top"
    >
      <Stack 
        direction={{ base: 'col', md: 'row' }} 
        align="center" 
        justify="between" 
        gap={{ base: "md", md: "xl" }}
      >
        <Inline gap="md">
          <Box padding="sm" surface="subsoil" border display={{ base: 'none', sm: 'block' }}>
            <Icon icon={Mail} size="md" color="brand" />
          </Box>
          <Stack gap={0}>
            <Text variant="display" size="base" uppercase tracking="tight">
              Optimize Your Itinerary
            </Text>
            <Text variant="micro" size="micro" color="dim" uppercase tracking="widest">
              SYSTEM: WEEKLY_SYNC // TRAVEL_HACKS // DATA_REPORTS
            </Text>
          </Stack>
        </Inline>
        
        <EmailForm />
      </Stack>
    </Motion>
  );
}
