import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { Event } from '@/lib/content';

export function EventHeaderExtras({ author }: { author: string }) {
  return (
    <Stack gap={6} marginTop={6}>
      <Stack direction="row" align="center" gap={2} color="dim">
        <Box width={8} height={8} radius="full" surface="muted" />
        <Text variant="mono" size="xs">{author}</Text>
      </Stack>
    </Stack>
  );
}

export function EventBodyExtras() {
  return null;
}

interface EventSidebarProps {
  event?: Event;
}

export function EventSidebar({ event }: EventSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box as="aside">
      <Stack gap={8} className="sticky top-24">
        {event && (
          <Box border radius="lg" padding={6} surface="surface-alt">
            <Stack gap={6}>
              <Box
                display="flex"
                align="center"
                justify="between"
                as="button"
                onClick={() => setIsOpen(!isOpen)}
                width="full"
                className="lg:pointer-events-none"
                aria-expanded={isOpen}
                aria-controls="event-insights-content"
              >
                <Text variant="mono" size="micro" color="accent" weight="font-bold" uppercase tracking="widest">
                  Event Insights
                </Text>
                <Box display={{ base: 'block', lg: 'none' }}>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-accent" /> : <ChevronDown className="w-4 h-4 text-accent" />}
                </Box>
              </Box>

              <Box
                id="event-insights-content"
                display={{ base: isOpen ? "block" : "none", lg: "block" }}
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
            </Stack>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
