import { Box, Stack, Text } from '@/layouts/Primitives';
import { EmailForm } from './EmailForm';
import { Mail, X } from 'lucide-react';
import { useEmailStore } from './emailStore';

export function NewsletterBanner() {
  const hideBar = useEmailStore((state) => state.hideBar);

  return (
    <Box 
      as="section"
      className="bg-surface-alt/30 border-y border-line/10 relative"
      padding="emailBar"
      width="full"
    >
      <Box position="absolute" className="top-4 right-4" zIndex="docked">
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
        className="w-full"
      >
        <Stack direction="row" align="center" gap={4} className="w-full md:w-auto">
          <Box
            width={10}
            height={10}
            display={{ base: 'none', sm: 'flex' }}
            align="center"
            justify="center"
            className="bg-accent/10"
            radius="md"
            shrink={0}
          >
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