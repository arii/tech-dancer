// impeccable-ignore-file
import { useState, useEffect } from 'react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { EmailForm } from './EmailForm';
import { Mail, X } from 'lucide-react';
import { useEmailStore } from './emailStore';
import { ActionButton } from '@/components/ui/ActionButton';

export function NewsletterBanner() {
  const { showEmailBar, hideBar } = useEmailStore();
  const [hasWaited, setHasWaited] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    if (!showEmailBar) return;

    const timer = setTimeout(() => {
      setHasWaited(true);
    }, 30000); // 30 seconds

    return () => clearTimeout(timer);
  }, [showEmailBar]);

  useEffect(() => {
    if (!showEmailBar || hasScrolled) return;

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check in case page is already scrolled
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [showEmailBar, hasScrolled]);

  if (!showEmailBar || !hasWaited || !hasScrolled) return null;

  return (
    <Box 
      as="aside"
      id="newsletter-banner"
      position="fixed"
      bottom={0}
      left={0}
      width="full"
      zIndex={50}
      surface="alt"
      border="t"
      className="border-accent/40"
      paddingX={{ base: 6, md: 12 }}
      paddingY={{ base: 6, lg: 16 }}
      radius="none"
    >
      {/* Decorative Brand Accent - No arbitrary width, use standard spacing if possible or raw line */}
      <Box 
        position="absolute" 
        top={0} 
        left={0} 
        width="1px" 
        height="full" 
        className="bg-accent"
      />

      {/* Persistent Dismissal */}
      <Box position="absolute" className="top-4 right-4" zIndex="docked">
        <ActionButton
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
        </ActionButton>
      </Box>

      <Stack 
        direction={{ base: 'col', lg: 'row' }} 
        align={{ base: 'start', lg: 'center' }} 
        justify="between" 
        gap={{ base: 4, lg: 8 }}
        maxWidth="7xl"
        marginX="auto"
        width="full"
        paddingRight={{ base: 12, lg: 0 }}
      >
        <Stack direction={{ base: 'col', sm: 'row' }} align={{ base: 'start', sm: 'center' }} gap={8} flex={1}>
          <Box padding={4} surface="accent" opacity={0.1} display={{ base: 'none', md: 'block' }} radius="none">
            <Mail className="w-6 h-6 text-accent" />
          </Box>
          <Stack gap={4}>
            <Text 
              as="h2"
              variant="headline" 
              size={{ base: 'xl', md: '2xl' }}
              weight="font-black" 
              color="main"
              className="uppercase tracking-tighter"
            >
              Get the latest dance insights.
            </Text>
            {/* Pill badges for topics - Sharp edges as requested */}
            <Box display="flex" gap={2} wrap role="list" aria-label="Newsletter topics">
              {['Dance Research', 'Gear Reviews', 'Community Updates'].map(tag => (
                <Box
                  key={tag}
                  as="span"
                  role="listitem"
                  paddingX={3}
                  paddingY={1.5}
                  radius="none"
                  border
                  className="bg-accent/10 border-accent/30 text-text-main"
                >
                  <Text variant="mono" size="micro" weight="font-bold" tracking="widest" uppercase>
                    {tag}
                  </Text>
                </Box>
              ))}
            </Box>
          </Stack>
        </Stack>
        <Stack gap={4} width={{ base: 'full', lg: 'auto' }} paddingBottom={{ base: 6, lg: 0 }}>
          <EmailForm />
          <Text variant="sans" size="xs" color="main" className="opacity-100">
            No spam. Unsubscribe anytime.
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
}
