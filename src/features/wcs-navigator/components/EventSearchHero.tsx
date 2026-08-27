import React, { useState, useMemo } from 'react';
import { Search, Upload, MapPin, ArrowRight, X, ChevronRight } from 'lucide-react';
import { CALIFORNIA_2026_EVENTS, WCSCaliforniaEvent } from '../data/californiaEvents';
import { DropzoneUpload } from './DropzoneUpload';

export interface EventSearchHeroProps {
  onDiscoverPreset: (event: WCSCaliforniaEvent) => void;
  onDiscoverPdf: (file: File) => void;
  onDiscoverUrl: (url: string) => void;
}

export const EventSearchHero: React.FC<EventSearchHeroProps> = ({
  onDiscoverPreset,
  onDiscoverPdf,
  onDiscoverUrl,
}) => {
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
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto py-8 md:py-14">
      {/* Centered Hero Header */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto w-full mb-8 space-y-2">
        <h2 className="text-3xl sm:text-5xl font-black text-text-main tracking-tight leading-tight">
          What event are you attending?
        </h2>
        <p className="text-sm sm:text-base text-text-dim max-w-lg leading-relaxed">
          Search an upcoming 2026 convention or drop your schedule PDF to build a customized weekend timetable.
        </p>
      </div>

      {/* Main Action Form */}
      <div className="w-full flex flex-col items-center space-y-4">
        {/* Search Bar Container */}
        <div className="relative w-full">
          <div className="flex items-center w-full rounded-2xl bg-surface/90 border border-line hover:border-accent/60 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20 transition-all shadow-lg px-4 py-3.5 gap-3">
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
              <button
                type="button"
                aria-label="Clear search"
                onClick={handleClear}
                className="p-1 rounded-full text-text-dim hover:text-text-main hover:bg-muted/80 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Instant Dropdown Suggestions */}
          {isInputFocused && filteredEvents.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-surface/95 backdrop-blur-md border border-line rounded-2xl shadow-2xl overflow-hidden text-left animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="py-2 divide-y divide-line/40 max-h-64 overflow-y-auto">
                {filteredEvents.map((event) => (
                  <button
                    key={event.id}
                    type="button"
                    onMouseDown={() => handleSelect(event)}
                    className="w-full px-4 py-3 hover:bg-muted/60 flex items-center justify-between transition-colors text-left group cursor-pointer"
                  >
                    <div className="flex flex-col space-y-0.5">
                      <span className="text-sm font-bold text-text-main group-hover:text-accent transition-colors">
                        {event.name}
                      </span>
                      <span className="text-xs text-text-dim">
                        📍 {event.location} • 📅 {event.dates}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-text-dim group-hover:text-accent transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Subtle Upload Secondary Action Link */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-text-dim">
          <span>Have a custom timetable?</span>
          <button
            type="button"
            onClick={() => setShowUploadModal(!showUploadModal)}
            className="text-brand-cyan hover:underline font-semibold flex items-center gap-1 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{showUploadModal ? 'Back to event search' : 'Or drop a schedule PDF'}</span>
          </button>
        </div>

        {/* Upload Dropzone Container (revealed conditionally when clicked) */}
        {showUploadModal ? (
          <div className="w-full bg-surface border border-line rounded-2xl p-6 shadow-xl animate-in fade-in slide-in-from-top-2">
            <DropzoneUpload
              onIngestPdf={(file) => onDiscoverPdf(file)}
              onIngestUrl={(url) => onDiscoverUrl(url)}
            />
          </div>
        ) : (
          <>
            {/* State 1: Clean Quiet Row of Popular Events */}
            <div className="flex items-center gap-2 w-full overflow-x-auto pt-1 pb-1 no-scrollbar text-xs">
              <span className="text-[11px] font-bold text-text-dim shrink-0 pl-1">
                Popular:
              </span>
              <div className="flex items-center gap-2 shrink-0">
                {CALIFORNIA_2026_EVENTS.map((event) => {
                  const isSelected = selectedEvent?.id === event.id;
                  return (
                    <button
                      key={event.id}
                      type="button"
                      onClick={() => handleSelect(event)}
                      className={`min-h-[38px] px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border flex items-center justify-center cursor-pointer whitespace-nowrap ${
                        isSelected
                          ? 'bg-brand-cyan/20 border-brand-cyan text-brand-cyan font-bold shadow-sm'
                          : 'bg-surface/70 border-line/60 text-text-dim hover:text-white hover:border-line'
                      }`}
                    >
                      {event.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* State 2: Active Selection -> Fade in the card right under search bar */}
            {selectedEvent && (
              <div className="w-full mt-2 p-5 rounded-2xl bg-surface/90 border border-line/80 shadow-xl text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] animate-in fade-in slide-in-from-top-2">
                <div className="flex flex-col space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs font-mono font-medium text-accent">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{selectedEvent.location} • {selectedEvent.dates}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-text-main leading-snug">
                    {selectedEvent.name}
                  </h3>
                  <p className="text-xs text-text-dim leading-relaxed">
                    {selectedEvent.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onDiscoverPreset(selectedEvent)}
                  className="min-h-[44px] px-5 rounded-xl bg-brand-cyan hover:opacity-95 text-black font-bold text-sm shadow-lg shadow-brand-cyan/15 flex items-center justify-center gap-2 shrink-0 self-stretch sm:self-auto cursor-pointer transition-all"
                >
                  <span>Plan My Weekend</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};


