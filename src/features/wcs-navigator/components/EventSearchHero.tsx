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
  division: 'novice',
  role: 'lead',
  lateNight: true,
  focusTrack: 'technique',
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
      className="relative min-h-[40vh] flex flex-col justify-center"
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
          className="border-line/80 hover:border-brand-cyan/70 focus-within:border-brand-cyan focus-within:ring-2 focus-within:ring-brand-cyan/20 transition-all bg-slate-900/90 backdrop-blur-xl"
        >
          <Search className="w-5 h-5 text-brand-cyan shrink-0" />
          <input
            type="text"
            role="combobox"
            aria-expanded={isInputFocused && filteredEvents.length > 0}
            aria-label="Search convention or city"
            placeholder="Search California 2026 convention (e.g. South Bay, Boogie, Capital Swing)..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            className="w-full bg-transparent text-base sm:text-lg text-text-main placeholder:text-text-dim/60 focus:outline-none"
          />

          {searchQuery && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={handleClear}
              className="text-text-dim hover:text-text-main p-1 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
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
            className="absolute top-full left-0 right-0 z-50 backdrop-blur-xl bg-slate-900/98 border-line/80 overflow-hidden text-left animate-in fade-in slide-in-from-top-2 duration-150"
          >
            <Box className="divide-y divide-line/40 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900/40">
              {filteredEvents.map((event) => (
                <button
                  key={event.id}
                  type="button"
                  onMouseDown={() => handleSelectEvent(event)}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors text-left group cursor-pointer"
                >
                  <Stack gap={0.5} className="min-w-0 pr-2">
                    <Box display="flex" align="center" gap={2}>
                      <span className="font-bold text-sm text-text-main group-hover:text-brand-cyan transition-colors">
                        {event.name}
                      </span>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan">
                        Configure Plan
                      </span>
                    </Box>
                    <span className="text-xs text-text-dim">
                      📍 {event.location} • 📅 {event.dates}
                    </span>
                  </Stack>
                  <ChevronRight className="w-4 h-4 text-text-dim group-hover:text-brand-cyan transition-colors shrink-0" />
                </button>
              ))}
            </Box>
          </Box>
        )}
      </Box>

      {/* Progressive Disclosure: Custom PDF / URL Ingestion Drawer Toggle */}
      <Box width="full" className="flex flex-col items-center">
        <button
          type="button"
          onClick={() => setIsUploadDrawerOpen(!isUploadDrawerOpen)}
          className="text-xs font-mono text-text-dim/80 hover:text-brand-cyan flex items-center gap-1.5 transition-colors cursor-pointer py-1"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>{isUploadDrawerOpen ? 'Hide custom schedule upload ▲' : 'Or upload custom schedule PDF / URL ▼'}</span>
        </button>

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
      </Box>
    </Stack>
  );
};

export default EventSearchHero;




