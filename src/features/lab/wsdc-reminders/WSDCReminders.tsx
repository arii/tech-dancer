import React, { useState, useMemo } from 'react';
import { Calendar, Download, Plus, Search, Globe, AlertCircle, CheckCircle2, Plane, Hotel, Trophy, ShieldCheck } from 'lucide-react';
import { Box, Stack, Text, Grid, Button } from '@/layouts/Primitives';
import { getEvents } from '@/lib/content';
import { calculateTimeline } from './lib/timeline-engine';
import { generateICS, downloadICS } from './lib/ics-generator';
import { EventAnchors, TimelineItem } from './types';

const ICON_MAP: Record<string, React.ReactNode> = {
  'flight-track': <Plane className="w-5 h-5" />,
  'early-bird': <Trophy className="w-5 h-5" />,
  'hotel-block': <Hotel className="w-5 h-5" />,
  'comp-window': <CheckCircle2 className="w-5 h-5" />,
  'cancel-safety': <ShieldCheck className="w-5 h-5" />,
};

interface TimelineRowProps {
  item: TimelineItem;
  onSync: (item: TimelineItem) => void;
}

function TimelineRow({ item, onSync }: TimelineRowProps) {
  return (
    <Box position="relative" display="flex" gap={{ base: 4, sm: 10 }} className="group">
      {/* Dot / Icon */}
      <Box
        display="flex"
        align="center"
        justify="center"
        width={10}
        height={10}
        radius="full"
        border
        surface="surface"
        color="accent"
        zIndex={10}
        className="shrink-0 group-hover:border-accent transition-colors shadow-sm"
      >
        {ICON_MAP[item.id] || <Calendar className="w-5 h-5" />}
      </Box>

      <Box flex={1} border radius="lg" padding={6} surface="surface" className="hover:border-accent/40 transition-all">
        <Grid cols={{ base: 1, md: 4 }} gap={4} align="center">
          <Box className="md:col-span-1">
            <Text variant="mono" size="xs" color="accent" weight="font-bold">
              {item.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </Text>
          </Box>
          <Box className="md:col-span-2">
            <Stack gap={1}>
              <Text variant="headline" size="md" weight="font-black" className="uppercase tracking-tight">{item.label}</Text>
              <Text size="sm" color="dim" className="leading-relaxed">{item.description}</Text>
            </Stack>
          </Box>
          <Box display="flex" justify={{ base: 'start', md: 'end' }}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSync(item)}
              className="h-10"
            >
              <Box display="flex" align="center" gap={2} paddingX={4}>
                <Calendar className="w-3 h-3" />
                <Text as="span" size="xs" weight="font-bold" uppercase className="tracking-widest">Sync</Text>
              </Box>
            </Button>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}

export default function WSDCReminders() {
  const events = useMemo(() => getEvents().filter(e => e.startDate && e.earlyBirdDate && e.hotelCutoffDate), []);
  const [selectedEventId, setSelectedEventId] = useState<string>(events[0]?.slug || 'custom');
  const [customEvent, setCustomEvent] = useState<EventAnchors>({
    title: '',
    startDate: '',
    earlyBirdDate: '',
    hotelCutoffDate: '',
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
      url: found.url
    };
  }, [selectedEventId, events, customEvent]);

  const timeline = useMemo(() => {
    if (!activeEvent.startDate || !activeEvent.earlyBirdDate || !activeEvent.hotelCutoffDate) return [];
    return calculateTimeline(activeEvent);
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
      <Box border radius="xl" padding={6} surface="surface" className="border-line/60">
        <Stack gap={6}>
          <Box display="flex" align="center" gap={3}>
            <Search className="w-5 h-5 text-accent" />
            <Text variant="headline" size="lg" weight="font-bold">Select WCS Event</Text>
          </Box>

          <Box display="flex" gap={2} wrap>
            {events.map(event => (
              <Button
                key={event.slug}
                variant={selectedEventId === event.slug ? 'primary' : 'outline'}
                onClick={() => setSelectedEventId(event.slug)}
                size="sm"
                className="rounded-full"
              >
                {event.title}
              </Button>
            ))}
            <Button
              variant={selectedEventId === 'custom' ? 'primary' : 'outline'}
              onClick={() => setSelectedEventId('custom')}
              size="sm"
              className="rounded-full"
            >
              <Box as="span" marginRight={1}>
                <Plus className="w-3 h-3" />
              </Box>
              Add My Own
            </Button>
          </Box>

          {selectedEventId === 'custom' && (
            <Box border radius="lg" padding={6} surface="default" className="bg-bg/50">
              <Grid cols={{ base: 1, md: 2 }} gap={4}>
                <Stack gap={2}>
                  <Text size="xs" weight="font-bold" color="dim" uppercase tracking="widest">Event Title</Text>
                  <Box as="input"
                    name="title"
                    value={customEvent.title}
                    onChange={handleCustomChange}
                    placeholder="e.g. My Local Workshop"
                    paddingX={4}
                    className="w-full h-11 rounded-md border border-line bg-surface text-sm focus:border-accent outline-none"
                  />
                </Stack>
                <Stack gap={2}>
                  <Text size="xs" weight="font-bold" color="dim" uppercase tracking="widest">Event Website (Optional)</Text>
                  <Box as="input"
                    name="url"
                    value={customEvent.url}
                    onChange={handleCustomChange}
                    placeholder="https://..."
                    paddingX={4}
                    className="w-full h-11 rounded-md border border-line bg-surface text-sm focus:border-accent outline-none"
                  />
                </Stack>
                <Stack gap={2}>
                  <Text size="xs" weight="font-bold" color="dim" uppercase tracking="widest">Start Date</Text>
                  <Box as="input"
                    type="date"
                    name="startDate"
                    value={customEvent.startDate}
                    onChange={handleCustomChange}
                    paddingX={4}
                    className="w-full h-11 rounded-md border border-line bg-surface text-sm focus:border-accent outline-none"
                  />
                </Stack>
                <Stack gap={2}>
                  <Text size="xs" weight="font-bold" color="dim" uppercase tracking="widest">Early Bird Deadline</Text>
                  <Box as="input"
                    type="date"
                    name="earlyBirdDate"
                    value={customEvent.earlyBirdDate}
                    onChange={handleCustomChange}
                    paddingX={4}
                    className="w-full h-11 rounded-md border border-line bg-surface text-sm focus:border-accent outline-none"
                  />
                </Stack>
                <Stack gap={2}>
                  <Text size="xs" weight="font-bold" color="dim" uppercase tracking="widest">Hotel Cutoff Date</Text>
                  <Box as="input"
                    type="date"
                    name="hotelCutoffDate"
                    value={customEvent.hotelCutoffDate}
                    onChange={handleCustomChange}
                    paddingX={4}
                    className="w-full h-11 rounded-md border border-line bg-surface text-sm focus:border-accent outline-none"
                  />
                </Stack>
              </Grid>
            </Box>
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
            <Button onClick={handleBulkSync} variant="primary">
              <Box display="flex" align="center" gap={2}>
                <Download className="w-4 h-4" />
                <Text as="span">Sync Entire Plan</Text>
              </Box>
            </Button>
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
                <TimelineRow key={item.id} item={item} onSync={handleSingleSync} />
              ))}
            </Stack>
          </Box>
        </Stack>
      ) : (
        <Box border radius="xl" padding={12} className="border-dashed border-line/60 bg-surface/30">
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
            <Button as="a" href={activeEvent.url} target="_blank" rel="noopener noreferrer" variant="primary" size="sm">
              Visit Website
            </Button>
          </Box>
        </Box>
      )}
    </Stack>
  );
}
