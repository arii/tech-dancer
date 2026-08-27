import React, { useState } from 'react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';
import { Search, Sparkles, Upload, Calendar, ArrowRight } from 'lucide-react';
import { CALIFORNIA_2026_EVENTS, WCSCaliforniaEvent } from '../data/californiaEvents';
import { DropzoneUpload } from './DropzoneUpload';

interface EventSearchHeroProps {
  onDiscoverPreset: (event: WCSCaliforniaEvent) => void;
  onDiscoverPdf: (file: File) => void;
  onDiscoverUrl: (url: string) => void;
}

export const EventSearchHero: React.FC<EventSearchHeroProps> = ({
  onDiscoverPreset,
  onDiscoverPdf,
  onDiscoverUrl
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<WCSCaliforniaEvent>(CALIFORNIA_2026_EVENTS[0]);
  const [activeTab, setActiveTab] = useState<'preset' | 'custom'>('preset');

  const filteredEvents = CALIFORNIA_2026_EVENTS.filter(e =>
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box display="flex" flex="col" align="center" width="full" paddingY={{ base: 8, md: 12 }}>
      {/* Hero Badge & Headline */}
      <Stack gap={3} align="center" textAlign="center" maxWidth="3xl" marginX="auto" width="full">
        <Box
          display="flex"
          align="center"
          gap={2}
          paddingX={3}
          paddingY={1}
          radius="full"
          className="bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan"
        >
          <Icon icon={Sparkles} size="xs" />
          <Text variant="mono" size="micro" weight="font-bold" uppercase tracking="widest">
            Two-Pass AI Convention Optimizer
          </Text>
        </Box>

        <Text variant="headline" size="3xl" weight="font-black" color="main" className="tracking-tight sm:text-4xl">
          What event are you attending?
        </Text>

        <Text size="sm" color="dim" maxWidth="xl" className="leading-relaxed">
          Select a 2026 fixture or drop an event schedule PDF. The vision agent will pre-scan the timetable and build a customized question schema.
        </Text>
      </Stack>

      {/* Ingestion Mode Tabs */}
      <Box
        display="flex"
        align="center"
        surface="muted"
        padding={1}
        radius="full"
        border
        marginTop={6}
        marginBottom={6}
        className="border-line/60"
      >
        <button
          type="button"
          onClick={() => setActiveTab('preset')}
          className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all ${
            activeTab === 'preset'
              ? 'bg-brand-cyan text-black shadow-md'
              : 'text-dim hover:text-white'
          }`}
        >
          <Icon icon={Calendar} size="xs" />
          <span>California 2026 Presets</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('custom')}
          className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all ${
            activeTab === 'custom'
              ? 'bg-brand-cyan text-black shadow-md'
              : 'text-dim hover:text-white'
          }`}
        >
          <Icon icon={Upload} size="xs" />
          <span>Custom PDF / Schedule URL</span>
        </button>
      </Box>

      {/* Main Search & Ingestion Box */}
      {activeTab === 'preset' ? (
        <Stack gap={5} width="full" maxWidth="3xl">
          {/* Google-Style Search Input Container */}
          <Box
            surface="surface"
            radius="2xl"
            border
            padding={3}
            className="border-line/80 shadow-2xl focus-within:border-brand-cyan focus-within:ring-2 focus-within:ring-brand-cyan/20 transition-all"
          >
            <Box display="flex" align="center" gap={3} paddingX={3} paddingY={2}>
              <Icon icon={Search} size="md" color="accent" />
              <input
                type="text"
                placeholder="Search event by name or city (e.g. Boogie by the Bay, San Jose)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-white placeholder:text-dim focus:outline-none font-medium"
              />
            </Box>

            {/* Filtered Results Dropdown or Active Preset Bar */}
            {searchQuery && (
              <Box border="t" paddingTop={3} marginTop={2} display="flex" flex="col" gap={1} className="border-line/40">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map(event => (
                    <Box
                      as="button"
                      key={event.id}
                      type="button"
                      onClick={() => {
                        setSelectedEvent(event);
                        setSearchQuery('');
                      }}
                      paddingX={3}
                      paddingY={2.5}
                      radius="lg"
                      display="flex"
                      align="center"
                      justify="between"
                      surface="muted"
                      className="text-left hover:opacity-90 transition-colors"
                    >
                      <Stack gap={0.5}>
                        <Text size="sm" weight="font-bold" color="main">{event.name}</Text>
                        <Text size="micro" color="dim">{event.location} • {event.dates}</Text>
                      </Stack>
                      <Text size="micro" color="accent" weight="font-bold">Select</Text>
                    </Box>
                  ))
                ) : (
                  <Box padding={4} textAlign="center">
                    <Text size="xs" color="dim">No matching preset found. Try searching another city or switch to Custom PDF.</Text>
                  </Box>
                )}
              </Box>
            )}
          </Box>

          {/* Quick Select Preset Pills */}
          <Box display="flex" flex="col" gap={2}>
            <Text size="micro" color="dim" weight="font-bold" uppercase tracking="widest" textAlign="center">
              Popular 2026 Weekend Fixtures
            </Text>
            <Box display="flex" wrap="wrap" justify="center" gap={2}>
              {CALIFORNIA_2026_EVENTS.map(event => {
                const isSelected = selectedEvent.id === event.id;
                return (
                  <button
                    key={event.id}
                    type="button"
                    onClick={() => setSelectedEvent(event)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                      isSelected
                        ? 'bg-brand-cyan/20 border-brand-cyan text-brand-cyan font-bold shadow-sm'
                        : 'bg-surface/60 border-line/50 text-dim hover:text-white hover:border-line'
                    }`}
                  >
                    {event.name}
                  </button>
                );
              })}
            </Box>
          </Box>

          {/* Active Preset Preview Card & Primary CTA */}
          <Box
            surface="surface"
            padding={5}
            radius="xl"
            border
            className="border-line/60 bg-gradient-to-r from-surface to-muted/40"
          >
            <Box display="flex" justify="between" align="center" wrap="wrap" gap={4}>
              <Stack gap={1}>
                <Box display="flex" align="center" gap={2}>
                  <Text size="micro" radius="sm" paddingX={2} paddingY={0.5} className="bg-brand-cyan/20 text-brand-cyan font-bold">
                    SELECTED FIXTURE
                  </Text>
                  <Text size="micro" color="dim">{selectedEvent.dates}</Text>
                </Box>
                <Text variant="headline" size="lg" weight="font-bold" color="main">
                  {selectedEvent.name}
                </Text>
                <Text size="xs" color="dim">
                  {selectedEvent.location} — {selectedEvent.description}
                </Text>
              </Stack>

              <Box
                as="button"
                type="button"
                onClick={() => onDiscoverPreset(selectedEvent)}
                display="flex"
                align="center"
                gap={2}
                paddingX={6}
                paddingY={3}
                radius="xl"
                className="bg-brand-cyan hover:opacity-95 text-black font-bold text-sm shadow-lg shadow-brand-cyan/10 transition-all shrink-0"
              >
                <span>Scan & Discover Schedule</span>
                <Icon icon={ArrowRight} size="sm" />
              </Box>
            </Box>
          </Box>
        </Stack>
      ) : (
        /* Custom Upload / URL Ingestion Tab */
        <Box width="full" maxWidth="3xl" surface="surface" padding={6} radius="2xl" border className="border-line/80">
          <DropzoneUpload
            onIngestPdf={(file) => onDiscoverPdf(file)}
            onIngestUrl={(url) => onDiscoverUrl(url)}
          />
        </Box>
      )}
    </Box>
  );
};
