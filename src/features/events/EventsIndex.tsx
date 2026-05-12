// src/features/events/EventsIndex.tsx
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getEvents } from "@/lib/content";
import { Box, Grid, Stack, Text } from "@/layouts/Primitives";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchBox } from "@/components/ui/SearchBox";
import { SEO } from "@/components/SEO";
import { useSearchParam } from "@/hooks/useSearchParam";
import { safeSearch } from "@/lib/utils";
import { MapPin, ArrowRight } from "lucide-react";

export default function EventsIndex() {
  const navigate = useNavigate();
  const [search, setSearch] = useSearchParam("search");

  const { data: events = [] } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
    initialData: getEvents,
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
            <Box
              key={event.slug}
              as="button"
              onClick={() => navigate(`/events/${event.slug}`)}
              border
              radius="lg"
              padding={6}
              surface="surface"
              cursor="pointer"
              className="group text-left hover:border-accent/40 transition-all hover:-translate-y-0.5"
            >
              <Stack gap={4}>
                <Box display="flex" align="center" gap={2}>
                  <MapPin className="w-4 h-4 text-accent" />
                  <Text
                    variant="mono"
                    size="micro"
                    color="accent"
                    weight="font-bold"
                    uppercase
                    tracking="widest"
                  >
                    {event.schedule}
                  </Text>
                </Box>
                <Stack gap={1}>
                  <Text
                    variant="body"
                    size="lg"
                    weight="font-bold"
                    className="group-hover:text-accent transition-colors leading-tight"
                  >
                    {event.title}
                  </Text>
                  <Text size="sm" color="dim">
                    {event.location}
                  </Text>
                  <Text size="sm" color="dim">
                    {event.city}
                  </Text>
                </Stack>
                {event.theme && (
                  <Box
                    border
                    paddingX={3}
                    paddingY={1}
                    radius="full"
                    className="border-accent/30 bg-accent/5 w-fit"
                  >
                    <Text variant="mono" size="micro" color="accent">
                      Theme: {event.theme.name}
                    </Text>
                  </Box>
                )}
                <Box
                  display="flex"
                  align="center"
                  gap={2}
                  marginTop="auto"
                  color="accent"
                >
                  <Text variant="mono" size="xs" weight="font-bold">
                    View Guide
                  </Text>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Box>
              </Stack>
            </Box>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
}
