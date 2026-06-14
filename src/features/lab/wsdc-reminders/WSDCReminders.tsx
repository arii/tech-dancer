// impeccable-ignore-file
import { useState, useMemo } from 'react';
import { Download, Globe, AlertCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { ActionButton } from '@/components/ui/ActionButton';
import { getEvents } from '@/lib/content';
import { calculateTimeline } from './lib/timeline-utils';
import { generateICS, downloadICS } from './lib/ics-generator';
import { EventAnchors, TimelineItem } from './types';
import { TimelineRow } from './TimelineRow';
import { EventSelector } from './EventSelector';
import { CustomEventForm } from './CustomEventForm';

export default function WSDCReminders() {
  const { data: events = [] } = useQuery({
    queryKey: ['events', 'reminders'],
    queryFn: () => getEvents().filter(e => e.startDate && e.earlyBirdDate && e.hotelCutoffDate),
    initialData: () => getEvents().filter(e => e.startDate && e.earlyBirdDate && e.hotelCutoffDate),
  });

  const [selectedEventId, setSelectedEventId] = useState<string>('custom');
  const [customEvent, setCustomEvent] = useState<EventAnchors>({
    title: '',
    startDate: '',
    earlyBirdDate: '',
    hotelCutoffDate: '',
    url: ''
  });

  // Sync initial selection when events load
  const [hasInitialized, setHasInitialized] = useState(false);
  useEffect(() => {
    if (!hasInitialized && events.length > 0 && selectedEventId === 'custom' && !customEvent.title) {
      setSelectedEventId(events[0].slug);
      setHasInitialized(true);
    }
  }, [hasInitialized, events, selectedEventId, customEvent.title]);

  const activeEvent = useMemo(() => {
    if (selectedEventId === 'custom') return customEvent;
    const found = events.find(e => e.slug === selectedEventId);
    if (!found) return customEvent;
    return {
      title: found.title,
      startDate: found.startDate!,
      earlyBirdDate: found.earlyBirdDate!,
      hotelCutoffDate: found.hotelCutoffDate!,
      url: found.url
    };
  }, [selectedEventId, events, customEvent]);

  const timeline = useMemo(() => {
    if (!activeEvent.startDate || !activeEvent.earlyBirdDate || !activeEvent.hotelCutoffDate) return [];
    return calculateTimeline(activeEvent).map(item => ({
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
    <Stack gap={{ base: 6, md: 10 }} width="full">
      <Box border radius="xl" padding={{ base: 4, md: 6 }} surface="surface">
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
          <Box display="flex" direction={{ base: 'col', sm: 'row' }} justify="between" align={{ base: 'start', sm: 'center' }} gap={4} border="b" paddingBottom={4}>
            <Stack gap={1}>
              <Text variant="display" size="2xl" weight="font-black" uppercase>Action Timeline</Text>
              <Text size="sm" color="dim">{activeEvent.title} Logistics Plan</Text>
            </Stack>
            <ActionButton onClick={handleBulkSync} variant="primary" paddingX={4} paddingY={2} width={{ base: 'full', sm: 'auto' }}>
              <Box display="flex" align="center" gap={2} className="text-bg" justify="center">
                <Download className="w-4 h-4" />
                <Text as="span" color="bg" weight="font-bold">Sync Entire Plan</Text>
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
            <AlertCircle className="w-12 h-12 text-dim opacity-low" />
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
        <Box border radius="lg" padding={{ base: 4, md: 6 }} surface="accent" className="bg-accent/5 border-accent/20">
          <Box display="flex" direction={{ base: 'col', sm: 'row' }} align={{ base: 'start', sm: 'center' }} gap={4}>
            <Box display="flex" align="center" gap={4} width="full">
              <Globe className="w-6 h-6 text-accent shrink-0" />
              <Stack gap={1} flex={1} minWidth={0}>
                <Text weight="font-bold" size="sm">Official Event Link</Text>
                <Text size="xs" color="dim" className="truncate">{activeEvent.url}</Text>
              </Stack>
            </Box>
            <ActionButton as="a" href={activeEvent.url} target="_blank" rel="noopener noreferrer" variant="primary" paddingX={4} paddingY={2} width={{ base: 'full', sm: 'auto' }}>
              <Text weight="font-bold" color="bg" textAlign="center" width="full">Go to Event Website</Text>
            </ActionButton>
          </Box>
        </Box>
      )}
    </Stack>
  );
}
