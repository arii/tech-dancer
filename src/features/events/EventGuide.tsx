import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Box, Stack, Text } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';

import { EventHero, EventTab } from './components/EventHero';
import { ThemeSpotlight } from './components/ThemeSpotlight';
import { CuratedGear } from './components/CuratedGear';
import { RelatedEvents } from './components/RelatedEvents';
import { ReminderSignups } from './components/ReminderSignups';
import { useEventDetail } from './useEventDetail';

// Divider between sections
function SectionDivider() {
  return <Box border="t" className="border-line/30" />;
}

export default function EventGuide() {
  const {
    event,
    isLoading,
    isError,
    error,
    themeOutfits,
    themeAccessories,
    gearSections,
    relatedEvents,
    navigate,
  } = useEventDetail();

  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab") as EventTab | null;
  const [activeTab, setActiveTab] = useState<EventTab>(tabParam ?? "notes");

  // Sync tab from URL
  useEffect(() => {
    if (tabParam && tabParam !== activeTab) setActiveTab(tabParam);
  }, [tabParam, activeTab]);

  const handleTabChange = (tab: EventTab) => {
    setActiveTab(tab);
    setSearchParams({ tab }, { replace: true });
    // Scroll to the section
    const element = document.getElementById(`section-${tab}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (isLoading) {
    return (
      <Box padding="panel" textAlign="center">
        <Text variant="mono" size="xs">Loading Intelligence...</Text>
      </Box>
    );
  }

  if (isError || !event) {
    return (
      <Box padding="panel" textAlign="center">
        <Stack gap={8} align="center">
          <Text variant="display" size="2xl">
            {isError ? "Error Loading Event" : "Event Not Found"}
          </Text>
          {isError && error && (
            <Text variant="body" color="dim" size="sm">
              {error instanceof Error ? error.message : "An unexpected error occurred."}
            </Text>
          )}
          <Box as="button" onClick={() => navigate('/events')} className="hover:text-accent transition-colors cursor-pointer">
            <Text variant="mono" size="xs">Back to Events</Text>
          </Box>
        </Stack>
      </Box>
    );
  }

  return (
    <Box as="article" paddingX={{ base: 6, md: 12, lg: 24 }} paddingY={12}>
      <SEO
        title={`${event.title} | Event Guide`}
        description={event.excerpt || event.description}
      />

      <Stack gap={12} maxWidth="5xl" marginX="auto" width="full">
        {/* Back nav */}
        <Box
          as="button"
          onClick={() => navigate("/events")}
          display="flex"
          align="center"
          gap={2}
          className="hover:text-accent transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-accent transition-transform group-hover:-translate-x-1" />
          <Text
            variant="mono"
            size="xs"
            weight="font-bold"
            uppercase
            tracking="widest"
          >
            All Event Guides
          </Text>
        </Box>

        {/* Section 1 — Notes / body content */}
        {event.content?.trim() && (
          <Box
            id="section-notes"
            scrollPaddingTop={80}
            surface="surface"
            border
            radius="lg"
            padding={8}
          >
            <Box className="prose prose-invert max-w-none">
              <MarkdownRenderer content={event.content} />
            </Box>
          </Box>
        )}

        {/* Section 2 — Event Hero (Always visible, serves as 'Travel' tab target) */}
        <Box id="section-travel" scrollPaddingTop={80}>
          <EventHero
            event={event}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </Box>

        {/* Section 3 — Theme Spotlight */}
        {event.theme && (themeOutfits.length > 0 || themeAccessories.length > 0) && (
          <>
            <SectionDivider />
            <Box id="section-theme" scrollPaddingTop={80}>
              <ThemeSpotlight
                theme={event.theme}
                outfits={themeOutfits}
                accessories={themeAccessories}
              />
            </Box>
          </>
        )}

        {/* Section 4 — Curated Gear */}
        {gearSections.length > 0 && (
          <>
            <SectionDivider />
            <Box id="section-gear" scrollPaddingTop={80}>
              <CuratedGear
                eventTitle={event.title}
                sections={gearSections}
              />
            </Box>
          </>
        )}

        {/* Section 5 — Reminder Signups */}
        {(event.earlyBirdDate || event.hotelCutoffDate) && (
          <>
            <SectionDivider />
            <Box id="section-reminders" scrollPaddingTop={80}>
              <ReminderSignups event={event} />
            </Box>
          </>
        )}

        {/* Section 6 — Related Events */}
        {relatedEvents.length > 0 && (
          <>
            <SectionDivider />
            <Box id="section-related">
              <RelatedEvents
                events={relatedEvents}
              />
            </Box>
          </>
        )}
      </Stack>
    </Box>
  );
}
