import { useState, useMemo } from 'react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { Search, Upload, MapPin, ArrowRight, X, ChevronRight } from 'lucide-react';
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
  const [showUploadModal, setShowUploadModal] = useState(false);

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
    <Stack gap={8} align="center" justify="center" maxWidth="2xl" marginX="auto" paddingY={{ default: 8, md: 14 }} width="full">
      {/* Centered Hero Header */}
      <Stack gap={2} align="center" textAlign="center" maxWidth="2xl" width="full">
        <Text weight="font-black" size="3xl" color="main" tracking="tight" leading="tight" className="sm:text-5xl">
          What event are you attending?
        </Text>
        <Text size="sm" color="dim" maxWidth="lg" leading="relaxed" className="sm:text-base">
          Search an upcoming 2026 convention or drop your schedule PDF to build a customized weekend timetable.
        </Text>
      </Stack>

      {/* Main Action Form */}
      <Stack gap={4} align="center" width="full">
        {/* Search Bar Container */}
        <Box width="full" className="relative">
          <Box
            display="flex"
            align="center"
            gap={3}
            width="full"
            paddingX={4}
            paddingY={3.5}
            radius="2xl"
            surface="card"
            border
            shadow="lg"
            className="border-line hover:border-accent/60 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20 transition-all"
          >
            <Search className="w-5 h-5 text-accent shrink-0" />
            <input
              type="text"
              role="combobox"
              aria-expanded={isInputFocused && filteredEvents.length > 0}
              aria-label="Search convention or city"
              placeholder="Search event or city (e.g. South Bay, Boogie by the Bay)..."
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

          {/* Instant Dropdown Suggestions */}
          {isInputFocused && filteredEvents.length > 0 && (
            <Box
              surface="card"
              border
              radius="2xl"
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
                    <Stack gap={0.5}>
                      <Text weight="font-bold" size="sm" color="main" className="group-hover:text-accent transition-colors">
                        {event.name}
                      </Text>
                      <Text size="xs" color="dim">
                        📍 {event.location} • 📅 {event.dates}
                      </Text>
                    </Stack>
                    <ChevronRight className="w-4 h-4 text-text-dim group-hover:text-accent transition-colors" />
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Box>

        {/* Subtle Upload Secondary Action Link */}
        <Box display="flex" align="center" justify="center" gap={1.5}>
          <Text size="xs" color="dim">Have a custom timetable?</Text>
          <Box
            as="button"
            type="button"
            onClick={() => setShowUploadModal(!showUploadModal)}
            display="flex"
            align="center"
            gap={1}
            cursor="pointer"
            className="text-brand-cyan hover:underline font-semibold text-xs"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{showUploadModal ? 'Back to event search' : 'Or drop a schedule PDF'}</span>
          </Box>
        </Box>

        {/* Upload Dropzone Container (revealed conditionally when clicked) */}
        {showUploadModal ? (
          <Box surface="surface" border radius="2xl" padding={6} shadow="xl" width="full" className="animate-in fade-in slide-in-from-top-2">
            <DropzoneUpload
              onIngestPdf={(file) => onDiscoverPdf(file)}
              onIngestUrl={(url) => onDiscoverUrl(url)}
            />
          </Box>
        ) : (
          <>
            {/* State 1: Clean Quiet Row of Popular Events */}
            <Box display="flex" align="center" gap={2} width="full" paddingTop={1} paddingBottom={1} className="overflow-x-auto no-scrollbar text-xs">
              <Text variant="mono" size="micro" weight="font-bold" color="dim" paddingLeft={1} className="shrink-0">
                Popular:
              </Text>
              <Box display="flex" align="center" gap={2} className="shrink-0">
                {CALIFORNIA_2026_EVENTS.map((event) => {
                  const isSelected = selectedEvent?.id === event.id;
                  return (
                    <Box
                      key={event.id}
                      as="button"
                      type="button"
                      onClick={() => handleSelect(event)}
                      minHeight={9}
                      paddingX={3.5}
                      paddingY={1.5}
                      radius="full"
                      border
                      display="flex"
                      align="center"
                      justify="center"
                      cursor="pointer"
                      className={`text-xs font-semibold transition-all whitespace-nowrap ${
                        isSelected
                          ? 'bg-brand-cyan/20 border-brand-cyan text-brand-cyan font-bold shadow-sm'
                          : 'bg-surface/70 border-line/60 text-text-dim hover:text-white hover:border-line'
                      }`}
                    >
                      {event.name}
                    </Box>
                  );
                })}
              </Box>
            </Box>

            {/* State 2: Active Selection -> Fade in the card right under search bar */}
            {selectedEvent && (
              <Box
                width="full"
                marginTop={2}
                padding={5}
                radius="2xl"
                surface="card"
                border
                shadow="xl"
                display="flex"
                direction={{ default: 'col', sm: 'row' }}
                align={{ default: 'start', sm: 'center' }}
                justify="between"
                gap={4}
                className="text-left border-line/80 transition-all duration-400 animate-in fade-in slide-in-from-top-2"
              >
                <Stack gap={1.5} flex={1} className="min-w-0">
                  <Box display="flex" align="center" gap={2}>
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-accent" />
                    <Text variant="mono" size="xs" weight="font-medium" color="accent">
                      {selectedEvent.location} • {selectedEvent.dates}
                    </Text>
                  </Box>
                  <Text weight="font-bold" size="base" color="main" leading="snug" className="sm:text-lg">
                    {selectedEvent.name}
                  </Text>
                  <Text size="xs" color="dim" leading="relaxed">
                    {selectedEvent.description}
                  </Text>
                </Stack>

                <Box
                  as="button"
                  type="button"
                  onClick={() => onDiscoverPreset(selectedEvent)}
                  minHeight={11}
                  paddingX={5}
                  radius="xl"
                  display="flex"
                  align="center"
                  justify="center"
                  gap={2}
                  cursor="pointer"
                  className="bg-brand-cyan hover:opacity-95 text-black font-bold text-sm shadow-lg shadow-brand-cyan/15 shrink-0 self-stretch sm:self-auto transition-all"
                >
                  <span>Plan My Weekend</span>
                  <ArrowRight className="w-4 h-4" />
                </Box>
              </Box>
            )}
          </>
        )}
      </Stack>
    </Stack>
  );
};


