// src/features/events/EventsIndex.tsx
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getEvents } from "@/lib/content";
import { Box, Grid, Stack } from "@/layouts/Primitives";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchBox } from "@/components/ui/SearchBox";
import { SEO } from "@/components/SEO";
import { useSearchParam } from "@/hooks/useSearchParam";
import { safeSearch } from "@/lib/utils";
import { EventCard } from "./components/EventCard";

export default function EventsIndex() {
  const navigate = useNavigate();
  const [search, setSearch] = useSearchParam("search");

  const { data: events = [] } = useQuery({
    queryKey: ["events"],
    queryFn: async () => getEvents(),
    initialData: getEvents(),
  });

  const filtered = useMemo(
    () =>
      events.filter(
        (e) =>
          safeSearch(e.title, search) ||
          safeSearch(e.city, search) ||
          safeSearch(e.schedule, search),
      ),
    [events, search],
  );

  return (
    <Box as="section">
      <SEO
        title="Events"
        description="West Coast Swing event resource guides — themes, gear, reminders, and insider tips for every event on the circuit."
      />
      <Stack gap={12}>
        <PageHeader
          label="EVENT GUIDES"
          title="WSDC Event Resource Guides"
          description="Plan smarter for every event. Each guide includes the group theme, curated gear, key deadlines, and travel tips."
        />

        <SearchBox
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search events, cities…"
          maxWidth="lg"
        />

        <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={6}>
          {filtered.map((event) => (
            <EventCard
              key={event.slug}
              event={event}
              onClick={() => navigate(`/events/${event.slug}`)}
            />
          ))}
        </Grid>
      </Stack>
    </Box>
  );
}
