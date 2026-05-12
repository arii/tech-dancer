import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { Event } from '@/lib/content';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface EventSidebarProps {
  event: Event;
}

export function EventSidebar({ event }: EventSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return (
    <Box as="aside">
      <Stack gap={8} className="lg:sticky lg:top-24">
        <Box border radius="lg" padding={6} surface="surface-alt">
          <Stack gap={{ base: 0, lg: 6 }}>
            <Box
              display="flex"
              justify="between"
              align="center"
              width="full"
              as={isDesktop ? 'div' : 'button'}
              onClick={isDesktop ? undefined : () => setIsOpen(!isOpen)}
              className={isDesktop ? '' : 'cursor-pointer'}
            >
              <Text variant="mono" size="micro" color="accent" weight="font-bold" uppercase tracking="widest">
                Quick Intelligence
              </Text>
              <Box display={{ base: "block", lg: "none" }} as={motion.div} animate={{ rotate: isOpen ? 180 : 0 }}>
                <ChevronDown className="w-4 h-4 text-accent" />
              </Box>
            </Box>

            <AnimatePresence initial={false}>
              {(isOpen || isDesktop) && (
                <Box
                  as={motion.div}
                  initial={isDesktop ? false : { height: 0, opacity: 0, marginTop: 0 }}
                  animate={{ height: "auto", opacity: 1, marginTop: isDesktop ? 24 : 16 }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  overflow="hidden"
                  className="lg:!mt-6"
                >
                  <Stack gap={4}>
                    <Box display="flex" align="center" justify="between" width="full">
                      <Text variant="mono" size="micro" color="dim" uppercase>Category</Text>
                      <Text variant="body" size="sm">{event.category}</Text>
                    </Box>
                    <Box display="flex" align="center" justify="between" width="full">
                      <Text variant="mono" size="micro" color="dim" uppercase>Registry Status</Text>
                      <Text variant="body" size="sm">WSDC Verified</Text>
                    </Box>
                  </Stack>
                </Box>
              )}
            </AnimatePresence>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
