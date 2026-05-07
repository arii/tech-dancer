import { Box, Stack, Text } from '@/layouts/Primitives';
import { EmailForm } from './EmailForm';
import { Mail, X } from 'lucide-react';
import { useEmailStore } from './emailStore';
import { Button } from '@/layouts/Primitives';

export function NewsletterBanner() {
  const { showEmailBar, hideBar } = useEmailStore();

  if (!showEmailBar) return null;

  return (
    <Box 
      position="relative"
      surface="alt"
      border="y"
      className="border-accent/40 shadow-glow"
      paddingX={{ base: 6, md: 12 }}
      paddingY={{ base: 12, lg: 16 }}
      radius="none"
      width="full"
    >
      {/* Decorative Brand Accent - No arbitrary width, use standard spacing if possible or raw line */}
      <Box 
        position="absolute" 
        top={0} 
        left={0} 
        width="1px" 
        height="full" 
        className="bg-accent shadow-glow"
      />

      {/* Persistent Dismissal */}
      <Box position="absolute" className="top-4 right-4" zIndex="docked">
        <Button
          variant="ghost"
          onClick={hideBar}
          aria-label="Dismiss newsletter signup"
          padding={2}
          className="group/close"
        >
          <Stack direction="row" align="center" gap={3}>
            <Text 
              variant="mono" 
              size="micro" 
              className="opacity-0 group-hover/close:opacity-100 transition-opacity"
            >
              DISMISS
            </Text>
            <X className="w-5 h-5 text-text-dim group-hover/close:text-accent transition-colors" />
          </Stack>
        </Button>
      </Box>

      <Stack 
        direction={{ base: 'col', lg: 'row' }} 
        align={{ base: 'start', lg: 'center' }} 
        justify="between" 
        gap={8}
        maxWidth="7xl"
        marginX="auto"
        width="full"
      >
        <Stack direction={{ base: 'col', sm: 'row' }} align={{ base: 'start', sm: 'center' }} gap={8} flex={1}>
          <Box padding={4} surface="accent" opacity={0.1} display={{ base: 'none', md: 'block' }} radius="none">
            <Mail className="w-6 h-6 text-accent" />
          </Box>
          <Stack gap={4}>
            <Text 
              variant="headline" 
              size="2xl" 
              weight="font-black" 
              color="accent" 
              className="uppercase tracking-tighter"
            >
              Get the latest dance insights.
            </Text>
            {/* Pill badges for topics - Sharp edges as requested */}
            <Box display="flex" gap={2} wrap>
              {['Dance Analytics', 'Gear Reviews', 'Community Updates'].map(tag => (
                <Box
                  key={tag}
                  paddingX={3}
                  paddingY={1}
                  radius="none"
                  border
                  className="bg-accent/5 border-accent/20"
                >
                  <Text variant="mono" size="micro" weight="font-bold" color="main">
                    {tag}
                  </Text>
                </Box>
              ))}
            </Box>
          </Stack>
        </Stack>
        <Stack gap={4} width={{ base: 'full', lg: 'auto' }}>
          <EmailForm />
          <Text variant="sans" size="xs" color="main" className="opacity-60">
            No spam. Unsubscribe anytime.
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
}
