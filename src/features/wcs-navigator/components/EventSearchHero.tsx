import { useState, useMemo } from 'react';
import { Search, Upload, MapPin, ArrowRight, X, ChevronRight } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { CALIFORNIA_2026_EVENTS, WCSCaliforniaEvent } from '../data/californiaEvents';
import { DropzoneUpload } from './DropzoneUpload';

export interface EventSearchHeroProps {
  onDiscoverPreset: (event: WCSCaliforniaEvent) => void;
  onDiscoverPdf: (file: File) => void;
  onDiscoverUrl: (url: string) => void;
}

export const EventSearchHero = ({
  onDiscoverPreset,
  onDiscoverPdf,
  onDiscoverUrl,
}: EventSearchHeroProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<WCSCaliforniaEvent | null>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [activeTab, setActiveTab] = useState<'search' | 'upload'>('search');

  const filteredEvents = useMemo(() => {
    if (!searchQuery.trim()) return CALIFORNIA_2026_EVENTS;
    const q = searchQuery.toLowerCase();
    return CALIFORNIA_2026_EVENTS.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q) ||
        e.dates.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleSelect = (event: WCSCaliforniaEvent) => {
    setSelectedEvent(event);
    setSearchQuery(event.name);
    setIsInputFocused(false);
  };

  const handleClear = () => {
    setSearchQuery('');
    setSelectedEvent(null);
  };

  return (
    <Stack gap={6} align="center" justify="center" maxWidth="2xl" marginX="auto" paddingY={{ default: 6, md: 10 }} width="full">
      {/* Centered Hero Header */}
      <Stack gap={2} align="center" textAlign="center" maxWidth="2xl" width="full">
        <Text weight="font-black" size="3xl" color="main" tracking="tight" leading="tight" className="sm:text-4xl">
          What event are you attending?
        </Text>
        <Text size="sm" color="dim" maxWidth="lg" leading="relaxed" className="sm:text-base">
          Search an upcoming convention or upload your schedule PDF to build a customized weekend timetable.
        </Text>
      </Stack>

      {/* Mode Switch Tabs: Search Event vs Upload PDF */}
      <Box display="flex" align="center" gap={2} padding={1} radius="lg" surface="muted" border className="border-line/60">
        <Box
          as="button"
          type="button"
          onClick={() => setActiveTab('search')}
          paddingX={4}
          paddingY={1.5}
          radius="md"
          cursor="pointer"
          className={`text-xs font-semibold transition-all ${
            activeTab === 'search'
              ? 'bg-brand-cyan text-black font-bold shadow-sm'
              : 'text-text-dim hover:text-text-main'
          }`}
        >
          Select Event
        </Box>
        <Box
          as="button"
          type="button"
          onClick={() => setActiveTab('upload')}
          paddingX={4}
          paddingY={1.5}
          radius="md"
          cursor="pointer"
          className={`text-xs font-semibold transition-all flex items-center gap-1.5 ${
            activeTab === 'upload'
              ? 'bg-brand-cyan text-black font-bold shadow-sm'
              : 'text-text-dim hover:text-text-main'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload PDF</span>
        </Box>
      </Box>

      {/* Main Action Area */}
      <Stack gap={4} align="center" width="full">
        {activeTab === 'upload' ? (
          <Box surface="surface" border radius="2xl" padding={6} shadow="xl" width="full" className="animate-in fade-in slide-in-from-top-2">
            <DropzoneUpload
              onIngestPdf={(file) => onDiscoverPdf(file)}
              onIngestUrl={(url) => onDiscoverUrl(url)}
            />
          </Box>
        ) : (
          <>
            {/* Search Bar Container */}
            <Box width="full" className="relative">
              <Box
                display="flex"
                align="center"
                gap={3}
                width="full"
                paddingX={4}
                paddingY={3}
                radius="xl"
                surface="card"
                border
                shadow="md"
                className="border-line hover:border-accent/60 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20 transition-all"
              >
                <Search className="w-5 h-5 text-accent shrink-0" />
                <input
                  type="text"
                  role="combobox"
                  aria-expanded={isInputFocused && filteredEvents.length > 0}
                  aria-label="Search convention or city"
                  placeholder="Search convention (e.g. Boogie by the Bay, The Open)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setTimeout(() => setIsInputFocused(false), 200)}
                  className="w-full bg-transparent text-sm sm:text-base text-text-main placeholder:text-text-dim focus:outline-none"
                />
                {searchQuery && (
                  <Box
                    as="button"
                    type="button"
                    aria-label="Clear search"
                    onClick={handleClear}
                    padding={1}
                    radius="full"
                    cursor="pointer"
                    className="text-text-dim hover:text-text-main hover:bg-surface transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </Box>
                )}
              </Box>

              {/* Dropdown Suggestions */}
              {isInputFocused && filteredEvents.length > 0 && (
                <Box
                  surface="card"
                  border
                  radius="xl"
                  shadow="2xl"
                  marginTop={2}
                  className="absolute top-full left-0 right-0 z-50 backdrop-blur-md overflow-hidden text-left animate-in fade-in slide-in-from-top-2 duration-200"
                >
                  <Box paddingY={2} className="divide-y divide-line/40 max-h-64 overflow-y-auto">
                    {filteredEvents.map((event) => (
                      <Box
                        key={event.id}
                        as="button"
                        type="button"
                        onMouseDown={() => handleSelect(event)}
                        display="flex"
                        align="center"
                        justify="between"
                        paddingX={4}
                        paddingY={3}
                        cursor="pointer"
                        className="w-full hover:bg-surface transition-colors text-left group"
                      >
                        <Stack gap={0.5} className="min-w-0 pr-2">
                          <Text weight="font-bold" size="sm" color="main" className="group-hover:text-accent transition-colors break-words">
                            {event.name}
                          </Text>
                          <Text size="xs" color="dim">
                            📍 {event.location} • 📅 {event.dates}
                          </Text>
                        </Stack>
                        <ChevronRight className="w-4 h-4 text-text-dim group-hover:text-accent transition-colors shrink-0" />
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>

            {/* Quick Selection Filter Pills */}
            {!searchQuery && (
              <Box display="flex" align="center" gap={1.5} width="full" wrap="wrap" className="text-xs pt-1">
                <Text variant="mono" size="micro" color="dim" className="shrink-0">Quick picks:</Text>
                {CALIFORNIA_2026_EVENTS.slice(0, 4).map((event) => (
                  <Box
                    key={event.id}
                    as="button"
                    type="button"
                    onClick={() => handleSelect(event)}
                    onMouseDown={() => handleSelect(event)}
                    paddingX={2.5}
                    paddingY={1}
                    radius="md"
                    border
                    className="border-line/50 bg-surface/40 text-xs font-mono text-text-dim hover:text-text-main hover:border-line cursor-pointer transition-colors"
                  >
                    {event.name}
                  </Box>
                ))}
              </Box>
            )}

            {/* Selected Event Card */}
            {selectedEvent && (
              <Box
                width="full"
                marginTop={1}
                padding={5}
                radius="lg"
                border
                className="text-left bg-surface/40 border-line/60 transition-all duration-300 animate-in fade-in slide-in-from-top-2"
              >
                <Stack direction={{ default: 'col', sm: 'row' }} align={{ default: 'start', sm: 'center' }} justify="between" gap={4}>
                  <Stack gap={1.5} flex={1} className="min-w-0">
                    <Box display="flex" align="center" gap={2}>
                      <MapPin className="w-3.5 h-3.5 shrink-0 text-text-dim" />
                      <Text variant="mono" size="xs" color="dim">
                        {selectedEvent.location} • {selectedEvent.dates}
                      </Text>
                    </Box>
                    <Text weight="font-bold" size="lg" color="main" leading="snug" className="break-words [overflow-wrap:break-word]">
                      {selectedEvent.name}
                    </Text>
                    <Text size="xs" color="dim" leading="relaxed">
                      {selectedEvent.description}
                    </Text>
                  </Stack>

                  <button
                    type="button"
                    onClick={() => onDiscoverPreset(selectedEvent)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-text-main text-black font-semibold text-xs whitespace-nowrap hover:opacity-90 transition-opacity shadow-sm cursor-pointer shrink-0 self-stretch sm:self-auto"
                  >
                    <span>Plan My Weekend</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Stack>
              </Box>
            )}
          </>
        )}
      </Stack>
    </Stack>
  );
};


