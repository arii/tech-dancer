import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { calculateTimeline } from '@/features/lab/wsdc-reminders/lib/timeline-logic';
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
  startDate?: string;
  earlyBirdDate?: string;
  hotelCutoffDate?: string;
}

export function EventSidebar({ event, startDate, earlyBirdDate, hotelCutoffDate }: EventSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const finalStartDate = event?.startDate || startDate;
  const finalEarlyBirdDate = event?.earlyBirdDate || earlyBirdDate;
  const finalHotelCutoffDate = event?.hotelCutoffDate || hotelCutoffDate;

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
                aria-controls="event-at-a-glance-content"
              >
                <Text variant="mono" size="micro" color="accent" weight="font-bold" uppercase tracking="widest">
                  At a Glance
                </Text>
                <Box display={{ base: 'block', lg: 'none' }}>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-accent" /> : <ChevronDown className="w-4 h-4 text-accent" />}
                </Box>
              </Box>

              <Box
                id="event-at-a-glance-content"
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

        {finalStartDate && (
          <Stack gap={4}>
            <Text variant="mono" size="tiny" weight="font-bold" color="dim" uppercase className="tracking-widest border-b border-line" paddingBottom={2}>
              Travel Reminders
            </Text>
            <Stack gap={4}>
              {calculateTimeline({
                title: event?.title || 'Event',
                startDate: finalStartDate,
                earlyBirdDate: finalEarlyBirdDate,
                hotelCutoffDate: finalHotelCutoffDate,
              }, {
                filterIds: ['flight-track', 'early-bird', 'hotel-block', 'comp-window', 'cancel-safety']
              }).map((reminder) => {
                const Icon = reminder.icon!;
                return (
                  <Box
                    key={reminder.id}
                    border
                    padding={4}
                    surface="muted"
                    className="hover:border-accent transition-colors"
                  >
                    <Stack gap={2}>
                      <Box display="flex" align="center" gap={2} color="brand">
                        <Icon className="w-4 h-4" />
                        <Text variant="mono" size="xs" weight="font-bold">{reminder.label.toUpperCase()}</Text>
                      </Box>
                      <Text variant="mono" size="tiny" color="dim">
                        Target: {reminder.date.toLocaleDateString()}
                      </Text>
                      <Text variant="body" size="xs" color="dim">
                        {reminder.description}
                      </Text>
                    </Stack>
                  </Box>
                );
              })}
            </Stack>
          </Stack>
        )}
      </Stack>
    </Box>
  );
}

