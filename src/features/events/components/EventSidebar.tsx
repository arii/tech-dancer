import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { Event } from '@/lib/content';

interface EventSidebarProps {
  event: Event;
}

export function EventSidebar({ event }: EventSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box as="aside">
      <Stack gap={8} className="lg:sticky lg:top-24">
        <Box border radius="lg" padding={6} surface="surface-alt">
          <Stack gap={6}>
            <Box
              display="flex"
              align="center"
              justify="between"
              as="button"
              onClick={() => setIsOpen(!isOpen)}
              width="full"
              aria-expanded={isOpen}
              aria-controls="sidebar-intelligence-content"
              className="lg:cursor-default"
            >
              <Text variant="mono" size="micro" color="accent" weight="font-bold" uppercase tracking="widest">
                Quick Intelligence
              </Text>
              <Box display={{ base: "block", lg: "none" }} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                <ChevronDown size={16} className="text-dim" />
              </Box>
            </Box>

            <AnimatePresence initial={false}>
              {(isOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024)) && (
                <Box
                  id="sidebar-intelligence-content"
                  display={{ base: "block", lg: "block" }}
                  as={motion.div}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                  }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden lg:!h-auto lg:!opacity-100"
                >
                  <Stack gap={4}>
                    <Box>
                      <Text variant="mono" size="micro" color="dim" uppercase>Category</Text>
                      <Text variant="body" size="sm">{event.category}</Text>
                    </Box>
                    <Box>
                      <Text variant="mono" size="micro" color="dim" uppercase>Registry Status</Text>
                      <Text variant="body" size="sm">WSDC Verified</Text>
                    </Box>
                  </Stack>
                </Box>
              )}
            </AnimatePresence>

            {/* Desktop Fallback (if JS is disabled or during hydration) */}
            <noscript>
              <Stack gap={4}>
                <Box>
                  <Text variant="mono" size="micro" color="dim" uppercase>Category</Text>
                  <Text variant="body" size="sm">{event.category}</Text>
                </Box>
                <Box>
                  <Text variant="mono" size="micro" color="dim" uppercase>Registry Status</Text>
                  <Text variant="body" size="sm">WSDC Verified</Text>
                </Box>
              </Stack>
            </noscript>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
