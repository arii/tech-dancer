import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, Upload, X, ChevronRight } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { CALIFORNIA_2026_EVENTS, WCSCaliforniaEvent } from '../data/californiaEvents';
import { DropzoneUpload } from './DropzoneUpload';

export interface UserPreferences {
  division: 'novice' | 'intermediate' | 'advanced' | 'allstar' | 'social_only';
  role: 'lead' | 'follow' | 'switch';
  lateNight: boolean;
  focusTrack: string;
}

export interface EventSearchHeroProps {
  onDiscoverPreset: (event: WCSCaliforniaEvent, preferences?: Partial<UserPreferences>) => void;
  onDiscoverPdf: (file: File) => void;
  onDiscoverUrl: (url: string) => void;
  initialPreferences?: UserPreferences;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  lateNight: true,
};

export const EventSearchHero: React.FC<EventSearchHeroProps> = ({
  onDiscoverPreset,
  onDiscoverPdf,
  onDiscoverUrl,
  initialPreferences = DEFAULT_PREFERENCES,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isUploadDrawerOpen, setIsUploadDrawerOpen] = useState(false);
  const [preferences, setPreferences] = useState<UserPreferences>(initialPreferences);

  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsInputFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Intent parsing: extract division or role when typing into search query
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    const q = value.toLowerCase();
    setPreferences((prev) => {
      let updatedDivision = prev.division;
      let updatedRole = prev.role;

      if (q.includes('intermediate')) {
        updatedDivision = 'intermediate';
      } else if (q.includes('advanced')) {
        updatedDivision = 'advanced';
      } else if (q.includes('novice')) {
        updatedDivision = 'novice';
      } else if (q.includes('social only') || q.includes('social')) {
        updatedDivision = 'social_only';
      }

      if (q.includes('follow')) {
        updatedRole = 'follow';
      } else if (q.includes('lead')) {
        updatedRole = 'lead';
      } else if (q.includes('switch')) {
        updatedRole = 'switch';
      }

      if (updatedDivision !== prev.division || updatedRole !== prev.role) {
        return { ...prev, division: updatedDivision, role: updatedRole };
      }
      return prev;
    });
  };

  const filteredEvents = useMemo(() => {
    if (!searchQuery.trim()) return CALIFORNIA_2026_EVENTS;
    const q = searchQuery.toLowerCase();
    return CALIFORNIA_2026_EVENTS.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q) ||
        e.dates.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleSelectEvent = (event: WCSCaliforniaEvent) => {
    setIsInputFocused(false);
    onDiscoverPreset(event, preferences);
  };

  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <Stack
      ref={containerRef}
      gap={8}
      align="center"
      justify="center"
      maxWidth="2xl"
      marginX="auto"
      paddingY={{ default: 12, md: 20 }}
      width="full"
      minHeight="40"
      className="relative"
    >
      {/* Clean, Standalone Google-Style Search Omnibox */}
      <Box width="full" className="relative">
        <Box
          display="flex"
          align="center"
          gap={3}
          width="full"
          paddingX={{ default: 3.5, sm: 5 }}
          paddingY={3.5}
          radius="2xl"
          surface="card"
          border
          shadow="2xl"
          className="min-h-11 border-line/80 hover:border-brand-cyan/70 focus-within:border-brand-cyan focus-within:ring-2 focus-within:ring-brand-cyan/20 transition-all bg-surface-alt/90 backdrop-blur-xl"
        >
          <Search className="w-5 h-5 text-brand-cyan shrink-0" />
          <input
            type="text"
            role="combobox"
            aria-expanded={isInputFocused && filteredEvents.length > 0}
            aria-label="Search convention or city"
            placeholder="Search California 2026 convention..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            className="w-full bg-transparent text-sm sm:text-lg text-text-main placeholder:text-text-dim/60 focus:outline-none min-w-0"
          />

          {searchQuery && (
            <Stack
              as="button"
              type="button"
              aria-label="Clear search"
              onClick={handleClear}
              align="center"
              justify="center"
              paddingX={2}
              minHeight={11}
              className="text-text-dim hover:text-text-main transition-colors cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </Stack>
          )}
        </Box>

        {/* Autocomplete Dropdown with Custom Dark Scrollbar */}
        {isInputFocused && filteredEvents.length > 0 && (
          <Box
            surface="card"
            border
            radius="xl"
            shadow="2xl"
            marginTop={2}
            className="absolute top-full left-0 right-0 z-50 backdrop-blur-xl bg-surface-alt/95 border-line/80 overflow-hidden text-left animate-in fade-in slide-in-from-top-2 duration-150"
          >
            <Box className="divide-y divide-line/40 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-surface-alt scrollbar-track-surface/40">
              {filteredEvents.map((event) => (
                <Stack
                  as="button"
                  direction="row"
                  align="center"
                  justify="between"
                  width="full"
                  paddingX={4}
                  paddingY={3}
                  key={event.id}
                  type="button"
                  onMouseDown={() => handleSelectEvent(event)}
                  className="hover:bg-white/5 transition-colors text-left group cursor-pointer"
                >
                  <Stack gap={0.5} minWidth={0} paddingRight={2}>
                    <Box display="flex" align="center" gap={2}>
                      <span className="font-bold text-sm text-text-main group-hover:text-brand-cyan transition-colors">
                        {event.name}
                      </span>
                      <Text as="span" variant="mono" size="xs" color="main" paddingX={2} paddingY={0.5} className="font-semibold rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan">
                        Configure Plan
                      </Text>
                    </Box>
                    <span className="text-xs text-text-dim">
                      📍 {event.location} • 📅 {event.dates}
                    </span>
                  </Stack>
                  <ChevronRight className="w-4 h-4 text-text-dim group-hover:text-brand-cyan transition-colors shrink-0" />
                </Stack>
              ))}
            </Box>
          </Box>
        )}
      </Box>

      {/* Progressive Disclosure: Custom PDF / URL Ingestion Drawer Toggle */}
      <Stack align="center" width="full">
        <Stack
          as="button"
          direction="row"
          align="center"
          justify="center"
          gap={1.5}
          paddingY={1}
          paddingX={3}
          minHeight={11}
          type="button"
          onClick={() => setIsUploadDrawerOpen(!isUploadDrawerOpen)}
          className="text-xs font-mono text-text-dim/80 hover:text-brand-cyan transition-colors cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5 shrink-0" />
          <span className="break-words">{isUploadDrawerOpen ? 'Hide custom schedule upload ▲' : 'Or upload custom schedule PDF / URL ▼'}</span>
        </Stack>

        {isUploadDrawerOpen && (
          <Box width="full" marginTop={4} className="animate-in fade-in slide-in-from-top-3 duration-200 min-w-0">
            <DropzoneUpload
              onIngestPdf={(file) => {
                setIsUploadDrawerOpen(false);
                if (onDiscoverPdf) onDiscoverPdf(file);
              }}
              onIngestUrl={(url) => {
                setIsUploadDrawerOpen(false);
                if (onDiscoverUrl) onDiscoverUrl(url);
              }}
            />
          </Box>
        )}
      </Stack>
    </Stack>
  );
};

export default EventSearchHero;




