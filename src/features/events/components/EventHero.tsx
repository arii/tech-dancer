import { MapPin, Calendar } from "lucide-react";
import { Box, Stack, Text } from "@/layouts/Primitives";
import { Event } from "@/lib/content";
import { EVENT_TABS } from "../constants";

export type EventTab = "theme" | "gear" | "reminders" | "travel" | "notes";

interface EventHeroProps {
  event: Event;
  activeTab: EventTab;
  onTabChange: (tab: EventTab) => void;
}

export function EventHero({ event, activeTab, onTabChange }: EventHeroProps) {
  return (
    <Box border="b" paddingBottom={0}>
      <Stack gap={6} paddingBottom={0}>
        {/* Breadcrumb */}
        <Text
          variant="mono"
          size="micro"
          color="dim"
          uppercase
          tracking="widest"
        >
          Event Guides › {event.title}
        </Text>

        <Stack direction={{ base: "col", md: "row" }} gap={8} align="start">
          {/* Left: event copy */}
          <Stack gap={4} flex={1}>
            <Stack gap={2}>
              <Text
                variant="headline"
                size="fluid-5"
                weight="font-black"
                color="white"
                leading="tight"
              >
                {event.title}
              </Text>
              <Box display="flex" align="center" gap={4} wrap>
                <Box display="flex" align="center" gap={1}>
                  <MapPin className="w-4 h-4 text-accent shrink-0" />
                  <Text size="sm" color="dim">
                    {event.city}
                  </Text>
                </Box>
                <Box display="flex" align="center" gap={1}>
                  <Calendar className="w-4 h-4 text-accent shrink-0" />
                  <Text size="sm" color="dim">
                    {event.schedule}
                  </Text>
                </Box>
              </Box>
            </Stack>

            {event.whyAttending && (
              <Box
                border="l"
                paddingLeft={5}
                className="border-accent/40 max-w-prose"
              >
                <Text
                  variant="body"
                  size="sm"
                  color="dim"
                  className="italic leading-relaxed"
                >
                  <Text
                    as="span"
                    size="xs"
                    weight="font-bold"
                    color="accent"
                    marginBottom={1}
                    className="block not-italic"
                  >
                    WHY I'M ATTENDING
                  </Text>
                  {event.whyAttending}
                </Text>
                <Text size="xs" color="dim" marginTop={2} className="not-italic">
                  — BoomTick
                </Text>
              </Box>
            )}

            {event.url && (
              <Box
                as="a"
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                display="inline-flex"
                align="center"
                gap={2}
                border
                paddingX={4}
                paddingY={2}
                radius="full"
                className="border-accent/30 hover:border-accent bg-accent/5 hover:bg-accent/10 transition-all w-fit text-accent"
              >
                <Text variant="mono" size="xs" weight="font-bold">
                  Official Event Site ↗
                </Text>
              </Box>
            )}
          </Stack>

          {/* Right: event badge / image */}
          <Box
            width={48}
            height={48}
            shrink={false}
            radius="xl"
            border
            overflow="hidden"
            surface="surface"
            display="flex"
            align="center"
            justify="center"
            className="border-line/40"
          >
            {event.heroImage ? (
              <img
                src={event.heroImage}
                alt={`${event.title} event badge`}
                className="w-full h-full object-cover"
              />
            ) : (
              <Stack
                align="center"
                gap={1}
                paddingX={4}
                className="text-center"
              >
                <Text
                  variant="display"
                  size="4xl"
                  weight="font-black"
                  color="accent"
                >
                  {event.title
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 3)}
                </Text>
                <Text variant="mono" size="micro" color="dim">
                  {event.city}
                </Text>
              </Stack>
            )}
          </Box>
        </Stack>

        {/* Tab bar */}
        <Box
          display="flex"
          gap={0}
          overflowX="auto"
          className="no-scrollbar"
          marginX={{ base: -4, lg: 0 }}
          paddingX={{ base: 4, lg: 0 }}
          marginTop={4}
        >
          {EVENT_TABS.map((tab) => (
            <Box
              key={tab.id}
              as="button"
              onClick={() => onTabChange(tab.id as EventTab)}
              paddingX={5}
              paddingY={3}
              cursor="pointer"
              border="b"
              className={`whitespace-nowrap transition-colors border-b-2 ${
                activeTab === tab.id
                  ? "border-accent text-accent"
                  : "border-transparent text-text-dim hover:text-text-main"
              }`}
            >
              <Text
                variant="mono"
                size="xs"
                weight="font-bold"
                uppercase
                tracking="widest"
              >
                {tab.label}
              </Text>
            </Box>
          ))}
        </Box>
      </Stack>
    </Box>
  );
}
