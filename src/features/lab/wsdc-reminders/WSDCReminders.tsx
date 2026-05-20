// impeccable-ignore-file
import { useState, useMemo, useEffect } from 'react';
import { Download, Globe, AlertCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { ActionButton } from '@/components/ui/ActionButton';
import { getEvents } from '@/lib/content';
import { calculateTimeline } from './lib/timeline-engine';
import { generateICS, downloadICS } from './lib/ics-generator';
import { EventAnchors, TimelineItem } from './types';
import { TimelineRow } from './TimelineRow';
import { EventSelector } from './EventSelector';
import { CustomEventForm } from './CustomEventForm';

interface WSDCRemindersProps {
  initialEventId?: string;
}

export default function WSDCReminders({ initialEventId }: WSDCRemindersProps) {
  const { data: events = [] } = useQuery({
    queryKey: ['events', 'reminders'],
    queryFn: () => getEvents().filter(e => e.startDate && e.earlyBirdDate && e.hotelCutoffDate),
    initialData: () => getEvents().filter(e => e.startDate && e.earlyBirdDate && e.hotelCutoffDate),
  });

  const [selectedEventId, setSelectedEventId] = useState<string>(initialEventId || 'custom');

  // Sync state if initialEventId prop changes (e.g. navigation between events)
  useEffect(() => {
    if (initialEventId) {
      setSelectedEventId(initialEventId);
    }
  }, [initialEventId]);

  // Handle default selection if no initialEventId is provided and we have events
  useEffect(() => {
    if (!initialEventId && selectedEventId === 'custom' && events.length > 0 && !customEvent.title) {
      setSelectedEventId(events[0].slug);
    }
  }, [initialEventId, events, selectedEventId, customEvent.title]);

  const [customEvent, setCustomEvent] = useState<EventAnchors>({
    title: '',
    startDate: '',
    earlyBirdDate: '',
    hotelCutoffDate: '',
    registrationDeadline: '',
    url: ''
  });

  const activeEvent = useMemo(() => {
    if (selectedEventId === 'custom') return customEvent;
    const found = events.find(e => e.slug === selectedEventId);
    if (!found) return customEvent;
    return {
      title: found.title,
      startDate: found.startDate!,
      earlyBirdDate: found.earlyBirdDate!,
      hotelCutoffDate: found.hotelCutoffDate!,
      registrationDeadline: found.registrationDeadline,
      url: found.url
    };
  }, [selectedEventId, events, customEvent]);

  const timeline = useMemo(() => {
    if (!activeEvent.startDate || !activeEvent.earlyBirdDate || !activeEvent.hotelCutoffDate) return [];

    // Gracefully handle invalid date strings
    const isValidDate = (d?: string) => d && !isNaN(Date.parse(d));
    if (!isValidDate(activeEvent.startDate) || !isValidDate(activeEvent.earlyBirdDate) || !isValidDate(activeEvent.hotelCutoffDate)) {
      return [];
    }

    const sanitizedEvent = {
      ...activeEvent,
      registrationDeadline: isValidDate(activeEvent.registrationDeadline) ? activeEvent.registrationDeadline : undefined
    };

    return calculateTimeline(sanitizedEvent).map(item => ({
      ...item,
      formattedDate: item.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }));
  }, [activeEvent]);

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomEvent(prev => ({ ...prev, [name]: value }));
  };

  const handleBulkSync = () => {
    if (!timeline.length) return;
    const icsContent = generateICS(activeEvent.title || 'WCS Event', timeline, activeEvent.url);
    downloadICS(`${(activeEvent.title || 'Event').replace(/\s+/g, '_')}_Full_Plan.ics`, icsContent);
  };

  const handleSingleSync = (item: TimelineItem) => {
    const icsContent = generateICS(activeEvent.title || 'WCS Event', [item], activeEvent.url);
    downloadICS(`${item.label.replace(/\s+/g, '_')}.ics`, icsContent);
  };

  const isFormValid = activeEvent.title && activeEvent.startDate && activeEvent.earlyBirdDate && activeEvent.hotelCutoffDate;

  return (
    <Stack gap={10} width="full">
      <Box border radius="xl" padding={6} surface="surface">
        <Stack gap={6}>
          <EventSelector
            events={events}
            selectedEventId={selectedEventId}
            onSelect={setSelectedEventId}
          />

          {selectedEventId === 'custom' && (
            <CustomEventForm
              customEvent={customEvent}
              onChange={handleCustomChange}
            />
          )}
        </Stack>
      </Box>

      {isFormValid ? (
        <Stack gap={8}>
          <Box display="flex" justify="between" align="center" border="b" paddingBottom={4}>
            <Stack gap={1}>
              <Text variant="display" size="2xl" weight="font-black" uppercase>Action Timeline</Text>
              <Text size="sm" color="dim">{activeEvent.title} Logistics Plan</Text>
            </Stack>
            <ActionButton onClick={handleBulkSync} variant="primary" paddingX={4} paddingY={2}>
              <Box display="flex" align="center" gap={2}>
                <Download className="w-4 h-4" />
                <Text as="span">Sync Entire Plan</Text>
              </Box>
            </ActionButton>
          </Box>

          <Box position="relative">
            {/* Timeline Vertical Line */}
            <Box
              position="absolute"
              left={5}
              top={0}
              bottom={0}
              width="2px"
              className="bg-line/40 hidden sm:block"
            />

            <Stack gap={6}>
              {timeline.map((item) => (
                <TimelineRow
                  key={item.id}
                  item={item}
                  formattedDate={item.formattedDate!}
                  onSync={handleSingleSync}
                />
              ))}
            </Stack>
          </Box>
        </Stack>
      ) : (
        <Box border radius="xl" padding={12} className="border-dashed" surface="muted">
          <Stack align="center" gap={4} textAlign="center">
            <AlertCircle className="w-12 h-12 text-dim opacity-20" />
            <Stack gap={2}>
              <Text variant="display" size="xl">Ready to Calculate</Text>
              <Text color="dim" maxWidth="md">
                Select a verified event or enter your own anchor dates to generate your strategic WCS travel action plan.
              </Text>
            </Stack>
          </Stack>
        </Box>
      )}

      {activeEvent.url && (
        <Box border radius="lg" padding={6} surface="accent" className="bg-accent/5 border-accent/20">
          <Box display="flex" align="center" gap={4}>
            <Globe className="w-6 h-6 text-accent" />
            <Stack gap={1} flex={1}>
              <Text weight="font-bold" size="sm">Official Event Link</Text>
              <Text size="xs" color="dim" className="truncate">{activeEvent.url}</Text>
            </Stack>
            <ActionButton as="a" href={activeEvent.url} target="_blank" rel="noopener noreferrer" variant="primary" paddingX={4} paddingY={2}>
              Visit Website
            </ActionButton>
          </Box>
        </Box>
      )}
    </Stack>
  );
}
