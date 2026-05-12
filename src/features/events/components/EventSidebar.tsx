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
          <Stack gap={{ base: 0, lg: 6 }}>
            {/* Mobile Header (Collapsible) */}
            <Box
              display={{ base: "flex", lg: "none" }}
              justify="between"
              align="center"
              width="full"
              as="button"
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer"
              data-testid="sidebar-title"
            >
              <Text variant="mono" size="micro" color="accent" weight="font-bold" uppercase tracking="widest">
                Quick Intelligence
              </Text>
              <Box as={motion.div} animate={{ rotate: isOpen ? 180 : 0 }}>
                <ChevronDown className="w-4 h-4 text-accent" />
              </Box>
            </Box>

            {/* Desktop Header (Static) */}
            <Box display={{ base: "none", lg: "block" }}>
              <Text variant="mono" size="micro" color="accent" weight="font-bold" uppercase tracking="widest">
                Quick Intelligence
              </Text>
            </Box>

            {/* Content (Collapsible on Mobile, Static on Desktop) */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <Box
                  display={{ base: "block", lg: "none" }}
                  as={motion.div}
                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                  animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  overflow="hidden"
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

            {/* Always visible Desktop Content */}
            <Box display={{ base: "none", lg: "block" }}>
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
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
