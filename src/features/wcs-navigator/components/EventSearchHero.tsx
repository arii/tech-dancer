import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, Upload, X, ChevronRight } from 'lucide-react';
import { Box, Stack } from '@/layouts/Primitives';
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

  const isUrlQuery = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return /^(https?:\/\/|www\.)/i.test(q) || q.endsWith('.pdf');
  }, [searchQuery]);

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const query = searchQuery.trim();
      if (/^(https?:\/\/|www\.)/i.test(query) || query.endsWith('.pdf')) {
        const fullUrl = query.startsWith('www.') ? `https://${query}` : query;
        setIsInputFocused(false);
        onDiscoverUrl(fullUrl);
      }
    }
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
          paddingX={5}
          paddingY={4}
          radius="2xl"
          surface="card"
          border
          shadow="2xl"
          className="border-line/80 hover:border-brand-cyan/70 focus-within:border-brand-cyan focus-within:ring-2 focus-within:ring-brand-cyan/20 transition-all bg-surface-alt/90 backdrop-blur-xl"
        >
          <Search className="w-5 h-5 text-brand-cyan shrink-0" />
          <input
            type="text"
            role="combobox"
            aria-expanded={isInputFocused && filteredEvents.length > 0}
            aria-label="Search convention or paste PDF URL"
            placeholder="Search WCS event name or paste PDF URL..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsInputFocused(true)}
            className="w-full bg-transparent text-base sm:text-lg text-text-main placeholder:text-text-dim/60 focus:outline-none"
          />

          {searchQuery && (
            <Box
              as="button"
              type="button"
              aria-label="Clear search"
              onClick={handleClear}
              padding={1}
              className="text-text-dim hover:text-text-main transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </Box>
          )}
        </Box>

        {/* Autocomplete Dropdown with Custom Dark Scrollbar */}
        {isInputFocused && (filteredEvents.length > 0 || isUrlQuery) && (
          <Box
            surface="card"
            border
            radius="xl"
            shadow="2xl"
            marginTop={2}
            className="absolute top-full left-0 right-0 z-50 backdrop-blur-xl bg-surface-alt/95 border-line/80 overflow-hidden text-left animate-in fade-in slide-in-from-top-2 duration-150"
          >
            <Box className="divide-y divide-line/40 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-surface-alt scrollbar-track-surface/40">
              {isUrlQuery && (
                <Stack
                  as="button"
                  direction="row"
                  align="center"
                  justify="between"
                  width="full"
                  paddingX={4}
                  paddingY={3.5}
                  type="button"
                  onMouseDown={() => {
                    const fullUrl = searchQuery.trim().startsWith('www.') ? `https://${searchQuery.trim()}` : searchQuery.trim();
                    setIsInputFocused(false);
                    onDiscoverUrl(fullUrl);
                  }}
                  className="bg-brand-cyan/10 hover:bg-brand-cyan/20 border-b border-line/40 transition-colors text-left group cursor-pointer"
                >
                  <Stack direction="row" align="center" gap={2} minWidth={0}>
                    <Upload className="w-4 h-4 text-brand-cyan shrink-0" />
                    <span className="font-bold text-sm text-brand-cyan truncate">
                      Fetch &amp; Ingest PDF URL: <span className="text-white font-mono underline">{searchQuery.trim()}</span>
                    </span>
                  </Stack>
                  <ChevronRight className="w-4 h-4 text-brand-cyan shrink-0" />
                </Stack>
              )}

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
                    <span className="font-bold text-sm text-text-main group-hover:text-brand-cyan transition-colors">
                      {event.name}
                    </span>
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
          gap={1.5}
          paddingY={1}
          type="button"
          onClick={() => setIsUploadDrawerOpen(!isUploadDrawerOpen)}
          className="text-xs text-text-dim hover:text-white transition-colors cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>{isUploadDrawerOpen ? 'Hide custom schedule upload ▲' : 'Or upload custom schedule PDF ▼'}</span>
        </Stack>

        {isUploadDrawerOpen && (
          <Box width="full" marginTop={4} className="animate-in fade-in slide-in-from-top-3 duration-200">
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




