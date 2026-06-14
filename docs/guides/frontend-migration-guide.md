# BoomTick.blog — Frontend Migration Guide

## Event Resource Guide Landing Pages

> **Prerequisites:** Complete the data format update described in `docs/guides/event-resource-guide-format.md` before starting this migration. This guide assumes your event `.md` files already contain the new frontmatter fields.

---

## Migration Overview

The current site has no event detail pages. Events appear only as `EventCard` widgets on the home dashboard. The migration adds a full event landing page at `/events/:slug` that renders the 6-section Resource Guide layout from the storyboard.

**What is being added:**

```
src/
├── pages/
│   ├── Events.tsx           (NEW — events index listing)
│   └── EventDetail.tsx      (NEW — single event resource guide)
├── features/
│   └── events/
│       ├── EventDetailPage.tsx        (NEW — orchestrates all sections)
│       ├── components/
│       │   ├── EventHero.tsx          (NEW — section 2)
│       │   ├── ThemeSpotlight.tsx     (NEW — section 3)
│       │   ├── CuratedGear.tsx        (NEW — section 4)
│       │   ├── ReminderSignups.tsx    (NEW — section 5, wraps existing tool)
│       │   └── RelatedEvents.tsx      (NEW — section 6)
│       └── useEventDetail.ts          (NEW — data hook)
└── components/ui/
    └── EventCard.tsx        (MODIFIED — add link to detail page)
```

**What is being modified:**

- `src/lib/content.ts` — extend `Event` interface + parse new fields
- `src/config/routes.ts` — add `/events` and `/events/:slug`
- `src/components/ui/EventCard.tsx` — make cards link to detail pages
- `src/features/dashboard/Dashboard.tsx` — update "Upcoming Events" section header link

---

## Step 1 — Extend the Event Interface in `content.ts`

Open `src/lib/content.ts`. Find the `Event` interface and replace it with the version below. Nothing else in this file needs to change — the existing `parseFrontmatter` function handles all flat string/number/array fields automatically. The nested `theme` and `gear` objects require a post-processing step added to `transform()`.

### 1a. Updated `Event` interface

```ts
// src/lib/content.ts

export interface EventTheme {
  name: string;
  label?: string;
  outfitIds?: string[];
  accessoryIds?: string[];
}

export interface EventGear {
  outfitIds?: string[];
  accessoryIds?: string[];
  shoeIds?: string[];
  essentialIds?: string[];
  travelIds?: string[];
}

export interface Event {
  type: "event";
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  excerpt: string;
  location: string;
  city: string;
  schedule: string;
  description: string;
  link?: string;
  content: string;
  url?: string;
  heroImage?: string;
  whyAttending?: string;
  // Reminder tool anchors
  startDate?: string;
  earlyBirdDate?: string;
  registrationDeadline?: string;
  hotelCutoffDate?: string;
  packingReminderDate?: string;
  // Gear and theme (resolved from affiliate IDs at render time)
  theme?: EventTheme;
  gear?: EventGear;
  // Flat alternatives for YAML parsers that don't handle nesting
  themeOutfitIds?: string[];
  themeAccessoryIds?: string[];
  gearOutfitIds?: string[];
  gearAccessoryIds?: string[];
  gearShoeIds?: string[];
  gearEssentialIds?: string[];
  gearTravelIds?: string[];
  relatedEvents?: string[];
}
```

### 1b. Flat-field normalizer (add inside `transform()`)

The existing `parseFrontmatter` function parses arrays like `themeOutfitIds: [...]` correctly. Add this normalizer immediately after the `...data` spread so flat fields are promoted into the structured shape the components expect:

```ts
// Inside the transform() .map() callback, after spreading data:

// Promote flat gear/theme fields into structured objects
// so components only need to read event.theme and event.gear
const flatTheme: EventTheme | undefined =
  data.themeOutfitIds || data.themeAccessoryIds
    ? {
        name: String(data.themeName || ""),
        label: data.themeLabel ? String(data.themeLabel) : undefined,
        outfitIds: Array.isArray(data.themeOutfitIds)
          ? data.themeOutfitIds
          : [],
        accessoryIds: Array.isArray(data.themeAccessoryIds)
          ? data.themeAccessoryIds
          : [],
      }
    : undefined;

const flatGear: EventGear | undefined =
  data.gearOutfitIds ||
  data.gearShoeIds ||
  data.gearEssentialIds ||
  data.gearTravelIds
    ? {
        outfitIds: Array.isArray(data.gearOutfitIds) ? data.gearOutfitIds : [],
        accessoryIds: Array.isArray(data.gearAccessoryIds)
          ? data.gearAccessoryIds
          : [],
        shoeIds: Array.isArray(data.gearShoeIds) ? data.gearShoeIds : [],
        essentialIds: Array.isArray(data.gearEssentialIds)
          ? data.gearEssentialIds
          : [],
        travelIds: Array.isArray(data.gearTravelIds) ? data.gearTravelIds : [],
      }
    : undefined;

return {
  ...data,
  title: String(data.title || "Untitled"),
  // ... all existing fields ...
  theme: (data.theme as EventTheme | undefined) ?? flatTheme,
  gear: (data.gear as EventGear | undefined) ?? flatGear,
  relatedEvents: Array.isArray(data.relatedEvents) ? data.relatedEvents : [],
} as unknown as T;
```

### 1c. Add `getEventBySlug` export

At the bottom of `content.ts`, alongside the existing exports, add:

```ts
export const getEventBySlug = (slug: string) => maps.events.get(slug);
```

---

## Step 2 — Add Routes

Open `src/config/routes.ts`. Add two new entries inside the `routes` array. Place them after the existing `/research` routes and before `/about`:

```ts
// src/config/routes.ts
import { Home, BookOpen, ShoppingBag, Database, User, Send, CalendarDays } from 'lucide-react';

// Inside the routes array:
{
  path: '/events',
  lazy: () => import('@/pages/Events').then(m => ({ Component: m.default })),
  label: 'Events',
  icon: CalendarDays,
  skeleton: 'grid'
},
{
  path: '/events/:slug',
  lazy: () => import('@/pages/EventDetail').then(m => ({ Component: m.default })),
  skeleton: 'post'
},
```

Then add `/events` to the `MOBILE_NAV_ROUTES` filter if you want it in the bottom tab bar (optional — only 4 tabs fit cleanly):

```ts
// Update the MOBILE_NAV_ROUTES filter condition:
["/", "/blog", "/gear", "/events"].includes(r.path);
```

---

## Step 3 — Create the Two Page Entry Points

These are thin wrappers that follow the existing pattern (e.g. `src/pages/Blog.tsx`).

### `src/pages/Events.tsx`

```tsx
import EventsIndex from "@/features/events/EventsIndex";
export default EventsIndex;
```

### `src/pages/EventDetail.tsx`

```tsx
import EventDetail from "@/features/events/EventDetailPage";
export default EventDetail;
```

---

## Step 4 — Build the Events Index Page

This replaces the bare event cards on the home page with a searchable, filterable listing. Create the file at `src/features/events/EventsIndex.tsx`:

```tsx
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
```

---

## Step 5 — Build the Data Hook

Create `src/features/events/useEventDetail.ts`. This resolves all affiliate IDs into full link objects so the child components receive ready-to-render data:

```ts
// src/features/events/useEventDetail.ts
import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getEventBySlug, getEvents, Event } from "@/lib/content";
import { affiliateManager } from "@/lib/affiliateManager";
import { AffiliateLink } from "@/types";

export interface ResolvedGearSection {
  label: string;
  items: AffiliateLink[];
}

export function useEventDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { data: event } = useQuery({
    queryKey: ["event", slug],
    queryFn: () => (slug ? getEventBySlug(slug) : undefined),
    enabled: !!slug,
  });

  const { data: allEvents = [] } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
    initialData: getEvents,
  });

  // Resolve theme gear from affiliate IDs
  const themeOutfits = useMemo(
    () =>
      (event?.theme?.outfitIds ?? [])
        .map((id) => affiliateManager.getLink(id))
        .filter((l): l is AffiliateLink => !!l),
    [event],
  );

  const themeAccessories = useMemo(
    () =>
      (event?.theme?.accessoryIds ?? [])
        .map((id) => affiliateManager.getLink(id))
        .filter((l): l is AffiliateLink => !!l),
    [event],
  );

  // Resolve gear sections
  const gearSections = useMemo((): ResolvedGearSection[] => {
    if (!event?.gear) return [];
    const g = event.gear;

    const resolve = (ids: string[] = []) =>
      ids
        .map((id) => affiliateManager.getLink(id))
        .filter((l): l is AffiliateLink => !!l);

    return [
      { label: "Outfits", items: resolve(g.outfitIds) },
      { label: "Accessories", items: resolve(g.accessoryIds) },
      {
        label: "Shoes & Essentials",
        items: resolve([...(g.shoeIds ?? []), ...(g.essentialIds ?? [])]),
      },
      { label: "Travel Extras", items: resolve(g.travelIds) },
    ].filter((s) => s.items.length > 0);
  }, [event]);

  // Resolve related events
  const relatedEvents = useMemo(
    (): Event[] =>
      (event?.relatedEvents ?? [])
        .map((slug) => allEvents.find((e) => e.slug === slug))
        .filter((e): e is Event => !!e),
    [event, allEvents],
  );

  return {
    event,
    themeOutfits,
    themeAccessories,
    gearSections,
    relatedEvents,
    navigate,
  };
}
```

---

## Step 6 — Build the Section Components

Create a directory at `src/features/events/components/`. Each file below is a single section from the storyboard.

### 6a. `EventHero.tsx` — Section 2

This renders the event title, location, date, the personal "Why I'm attending" blurb, and the tab bar (`Theme`, `Gear`, `Reminders`, `Travel`, `Notes`).

```tsx
// src/features/events/components/EventHero.tsx
import { MapPin, Calendar } from "lucide-react";
import { Box, Stack, Text } from "@/layouts/Primitives";
import { Event } from "@/lib/content";

export type EventTab = "theme" | "gear" | "reminders" | "travel" | "notes";

const TABS: { id: EventTab; label: string }[] = [
  { id: "theme", label: "Theme" },
  { id: "gear", label: "Gear" },
  { id: "reminders", label: "Reminders" },
  { id: "travel", label: "Travel" },
  { id: "notes", label: "Notes" },
];

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
                color="main"
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
                    className="block mb-1 not-italic"
                  >
                    WHY I'M ATTENDING
                  </Text>
                  {event.whyAttending}
                </Text>
                <Text size="xs" color="dim" className="mt-2 not-italic">
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
            shrink={0}
            radius="xl"
            border
            overflow="hidden"
            surface="surface"
            display="flex"
            align="center"
            justify="center"
            className="border-line/40 bg-gradient-to-br from-surface to-surface-alt"
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
          className="no-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0"
          marginTop={4}
        >
          {TABS.map((tab) => (
            <Box
              key={tab.id}
              as="button"
              onClick={() => onTabChange(tab.id)}
              paddingX={5}
              paddingY={3}
              cursor="pointer"
              border="b"
              className={`whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "border-accent text-accent"
                  : "border-transparent text-text-dim hover:text-text-main"
              }`}
              style={{
                borderBottomWidth: activeTab === tab.id ? "2px" : "2px",
              }}
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
```

### 6b. `ThemeSpotlight.tsx` — Section 3

```tsx
// src/features/events/components/ThemeSpotlight.tsx
import { ExternalLink } from "lucide-react";
import { Box, Stack, Text, Grid } from "@/layouts/Primitives";
import { EventTheme } from "@/lib/content";
import { AffiliateLink } from "@/types";

interface ThemeSpotlightProps {
  theme: EventTheme;
  outfits: AffiliateLink[];
  accessories: AffiliateLink[];
}

function GearItemCard({ item }: { item: AffiliateLink }) {
  return (
    <Box
      as="a"
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      border
      radius="lg"
      padding={4}
      surface="surface"
      display="flex"
      direction="col"
      gap={2}
      className="group hover:border-accent/40 transition-all"
    >
      {/* Placeholder image zone */}
      <Box
        height={32}
        radius="md"
        overflow="hidden"
        className="bg-surface-alt flex items-center justify-center"
      >
        <Text size="xs" color="dim" className="opacity-40">
          IMG
        </Text>
      </Box>
      <Stack gap={1}>
        <Text
          size="xs"
          weight="font-bold"
          className="group-hover:text-accent transition-colors line-clamp-2"
        >
          {item.name}
        </Text>
        <Text size="xs" color="dim" className="line-clamp-2 leading-relaxed">
          {item.description}
        </Text>
      </Stack>
      <Box
        display="flex"
        align="center"
        gap={1}
        color="accent"
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Text variant="mono" size="micro">
          Shop
        </Text>
        <ExternalLink className="w-3 h-3" />
      </Box>
    </Box>
  );
}

export function ThemeSpotlight({
  theme,
  outfits,
  accessories,
}: ThemeSpotlightProps) {
  return (
    <Stack gap={8}>
      {/* Theme header */}
      <Stack gap={2}>
        <Text
          variant="mono"
          size="micro"
          color="accent"
          weight="font-bold"
          uppercase
          tracking="widest"
        >
          ✦ THEME SPOTLIGHT
        </Text>
        <Stack gap={1}>
          {theme.label && (
            <Text size="sm" color="dim">
              {theme.label}:
            </Text>
          )}
          <Text
            variant="headline"
            size="4xl"
            weight="font-black"
            color="accent"
          >
            {theme.name}
          </Text>
        </Stack>
        {/* Color swatches — purely decorative, swap hex values per theme */}
        <Box display="flex" gap={2} marginTop={2}>
          {[
            "#ef4444",
            "#f97316",
            "#eab308",
            "#22c55e",
            "#3b82f6",
            "#8b5cf6",
          ].map((c) => (
            <Box
              key={c}
              width={5}
              height={5}
              radius="full"
              style={{ backgroundColor: c }}
            />
          ))}
        </Box>
      </Stack>

      {/* Outfit inspiration */}
      {outfits.length > 0 && (
        <Stack gap={4}>
          <Text
            variant="mono"
            size="xs"
            weight="font-bold"
            color="dim"
            uppercase
            tracking="widest"
          >
            Outfit Inspiration
          </Text>
          <Grid cols={{ base: 2, md: 3, lg: 4 }} gap={4}>
            {outfits.map((item) => (
              <GearItemCard key={item.id} item={item} />
            ))}
          </Grid>
        </Stack>
      )}

      {/* Accessory ideas */}
      {accessories.length > 0 && (
        <Stack gap={4}>
          <Text
            variant="mono"
            size="xs"
            weight="font-bold"
            color="dim"
            uppercase
            tracking="widest"
          >
            Accessory Ideas
          </Text>
          <Grid cols={{ base: 2, md: 3, lg: 4 }} gap={4}>
            {accessories.map((item) => (
              <GearItemCard key={item.id} item={item} />
            ))}
          </Grid>
        </Stack>
      )}
    </Stack>
  );
}
```

### 6c. `CuratedGear.tsx` — Section 4

```tsx
// src/features/events/components/CuratedGear.tsx
import { ExternalLink } from "lucide-react";
import { Box, Stack, Text, Grid } from "@/layouts/Primitives";
import { ResolvedGearSection } from "../useEventDetail";

interface CuratedGearProps {
  eventTitle: string;
  sections: ResolvedGearSection[];
}

export function CuratedGear({ eventTitle, sections }: CuratedGearProps) {
  if (sections.length === 0) return null;

  return (
    <Stack gap={8}>
      <Stack gap={2}>
        <Text
          variant="mono"
          size="micro"
          color="accent"
          weight="font-bold"
          uppercase
          tracking="widest"
        >
          🌈 CURATED GEAR
        </Text>
        <Text variant="headline" size="2xl" weight="font-black">
          Shop the {eventTitle.split(" ")[0]}
        </Text>
        <Text size="sm" color="dim" className="max-w-prose">
          Handpicked picks to help you shine on the dance floor.
        </Text>
      </Stack>

      {sections.map((section) => (
        <Stack key={section.label} gap={4}>
          <Box display="flex" align="center" justify="between">
            <Text
              variant="mono"
              size="xs"
              weight="font-bold"
              color="dim"
              uppercase
              tracking="widest"
            >
              {section.label}
            </Text>
            {section.items.length > 4 && (
              <Text
                variant="mono"
                size="micro"
                color="accent"
                className="cursor-pointer hover:underline"
              >
                View all →
              </Text>
            )}
          </Box>
          <Grid cols={{ base: 2, md: 4, lg: 5 }} gap={4}>
            {section.items.slice(0, 5).map((item) => (
              <Box
                key={item.id}
                as="a"
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                border
                radius="lg"
                padding={3}
                surface="surface"
                className="group hover:border-accent/40 transition-all"
              >
                <Stack gap={2}>
                  {/* Image placeholder */}
                  <Box
                    height={24}
                    radius="md"
                    className="bg-surface-alt flex items-center justify-center"
                  >
                    <Text size="micro" color="dim" className="opacity-30">
                      IMG
                    </Text>
                  </Box>
                  <Text
                    size="xs"
                    weight="font-bold"
                    className="group-hover:text-accent transition-colors line-clamp-2 leading-snug"
                  >
                    {item.name}
                  </Text>
                  <Box display="flex" align="center" gap={1} color="accent">
                    <Text variant="mono" size="micro">
                      Shop
                    </Text>
                    <ExternalLink className="w-3 h-3" />
                  </Box>
                </Stack>
              </Box>
            ))}
          </Grid>
        </Stack>
      ))}
    </Stack>
  );
}
```

### 6d. `ReminderSignups.tsx` — Section 5

This wraps the existing `WSDCReminders` component with event data pre-populated so the user doesn't have to select the event manually.

```tsx
// src/features/events/components/ReminderSignups.tsx
import { useState } from "react";
import { Bell, Check } from "lucide-react";
import { Box, Stack, Text, Grid } from "@/layouts/Primitives";
import { Event } from "@/lib/content";

interface Deadline {
  id: string;
  label: string;
  date: string;
  type: "Discount" | "Deadline" | "Reminder";
  color: string;
}

interface ReminderSignupsProps {
  event: Event;
}

const NOTIFICATION_CHANNELS = [
  { id: "email", label: "Email" },
  { id: "browser", label: "Browser Push" },
  { id: "sms", label: "Text (SMS)" },
  { id: "ical", label: "Calendar (iCal)" },
];

export function ReminderSignups({ event }: ReminderSignupsProps) {
  const [channels, setChannels] = useState<Set<string>>(
    new Set(["email", "ical"]),
  );
  const [signed, setSigned] = useState(false);

  const deadlines: Deadline[] = [
    event.earlyBirdDate && {
      id: "early-bird",
      label: "Early-bird discount ends",
      date: event.earlyBirdDate,
      type: "Discount" as const,
      color: "text-red-400 border-red-400/30 bg-red-400/10",
    },
    event.registrationDeadline && {
      id: "registration",
      label: "Registration deadline",
      date: event.registrationDeadline,
      type: "Deadline" as const,
      color: "text-orange-400 border-orange-400/30 bg-orange-400/10",
    },
    event.hotelCutoffDate && {
      id: "hotel",
      label: "Hotel deadline",
      date: event.hotelCutoffDate,
      type: "Deadline" as const,
      color: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
    },
    event.packingReminderDate && {
      id: "packing",
      label: "Packing reminder",
      date: event.packingReminderDate,
      type: "Reminder" as const,
      color: "text-blue-400 border-blue-400/30 bg-blue-400/10",
    },
  ].filter(Boolean) as Deadline[];

  const toggleChannel = (id: string) =>
    setChannels((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  if (deadlines.length === 0) return null;

  return (
    <Stack gap={8}>
      <Stack gap={2}>
        <Box display="flex" align="center" gap={3}>
          <Bell className="w-5 h-5 text-accent" />
          <Text variant="headline" size="2xl" weight="font-black">
            Stay on Top of What Matters
          </Text>
        </Box>
        <Text size="sm" color="dim">
          We'll send friendly reminders so you never miss a deadline.
        </Text>
      </Stack>

      <Grid cols={{ base: 1, md: 2 }} gap={8}>
        {/* Deadlines list */}
        <Stack gap={3}>
          {deadlines.map((d) => (
            <Box
              key={d.id}
              border
              radius="lg"
              paddingX={5}
              paddingY={4}
              display="flex"
              align="center"
              justify="between"
              surface="surface"
            >
              <Stack gap={0.5}>
                <Text size="sm" weight="font-bold">
                  {d.label}
                </Text>
                <Text variant="mono" size="xs" color="dim">
                  {new Date(d.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </Text>
              </Stack>
              <Box
                border
                paddingX={2}
                paddingY={0.5}
                radius="full"
                className={d.color}
              >
                <Text variant="mono" size="micro" weight="font-bold">
                  {d.type}
                </Text>
              </Box>
            </Box>
          ))}
        </Stack>

        {/* Channel picker + CTA */}
        <Stack gap={6}>
          <Stack gap={3}>
            <Text
              variant="mono"
              size="xs"
              weight="font-bold"
              color="dim"
              uppercase
              tracking="widest"
            >
              How you'll be notified
            </Text>
            <Grid cols={2} gap={3}>
              {NOTIFICATION_CHANNELS.map((ch) => (
                <Box
                  key={ch.id}
                  as="button"
                  onClick={() => toggleChannel(ch.id)}
                  border
                  radius="md"
                  paddingX={3}
                  paddingY={2}
                  display="flex"
                  align="center"
                  gap={2}
                  cursor="pointer"
                  className={`transition-all ${
                    channels.has(ch.id)
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-line text-text-dim hover:border-accent/40"
                  }`}
                >
                  <Box
                    width={4}
                    height={4}
                    border
                    radius="sm"
                    display="flex"
                    align="center"
                    justify="center"
                    className={
                      channels.has(ch.id)
                        ? "border-accent bg-accent"
                        : "border-line"
                    }
                  >
                    {channels.has(ch.id) && (
                      <Check className="w-3 h-3 text-bg" />
                    )}
                  </Box>
                  <Text size="xs" weight="font-bold">
                    {ch.label}
                  </Text>
                </Box>
              ))}
            </Grid>
          </Stack>

          {signed ? (
            <Box
              border
              radius="lg"
              padding={4}
              surface="accent"
              className="border-accent/30 bg-accent/10 text-center"
            >
              <Box display="flex" align="center" justify="center" gap={2}>
                <Check className="w-5 h-5 text-accent" />
                <Text weight="font-bold" color="accent">
                  You're signed up!
                </Text>
              </Box>
              <Text size="xs" color="dim" className="mt-1">
                You can update preferences anytime.
              </Text>
            </Box>
          ) : (
            <Box
              as="button"
              onClick={() => setSigned(true)}
              border
              radius="lg"
              padding={4}
              cursor="pointer"
              className="bg-accent text-bg hover:bg-accent/90 transition-colors font-bold text-sm tracking-widest uppercase"
            >
              Sign me up!
            </Box>
          )}

          <Text size="xs" color="dim" className="text-center">
            You can update preferences anytime.
          </Text>
        </Stack>
      </Grid>
    </Stack>
  );
}
```

### 6e. `RelatedEvents.tsx` — Section 6

```tsx
// src/features/events/components/RelatedEvents.tsx
import { useNavigate } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { Box, Stack, Text, Grid } from "@/layouts/Primitives";
import { Event } from "@/lib/content";

interface RelatedEventsProps {
  events: Event[];
}

export function RelatedEvents({ events }: RelatedEventsProps) {
  const navigate = useNavigate();
  if (events.length === 0) return null;

  return (
    <Stack gap={6}>
      <Stack gap={1}>
        <Text
          variant="mono"
          size="micro"
          color="accent"
          weight="font-bold"
          uppercase
          tracking="widest"
        >
          WSDC Pacific Northwest Event Guides
        </Text>
        <Text variant="headline" size="2xl" weight="font-black">
          More Events
        </Text>
        <Text size="sm" color="dim">
          Your go-to resource hub for events across the region.
        </Text>
      </Stack>

      <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={4}>
        {events.map((event) => (
          <Box
            key={event.slug}
            border
            radius="xl"
            overflow="hidden"
            surface="surface"
            className="group hover:border-accent/40 transition-all"
          >
            {/* Badge / image */}
            <Box
              height={32}
              className="bg-gradient-to-br from-surface-alt to-surface flex items-center justify-center"
              border="b"
            >
              {event.heroImage ? (
                <img
                  src={event.heroImage}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Text
                  variant="display"
                  size="3xl"
                  weight="font-black"
                  color="accent"
                >
                  {event.title
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 3)}
                </Text>
              )}
            </Box>

            {/* Info + actions */}
            <Stack gap={3} padding={4}>
              <Stack gap={1}>
                <Text
                  size="sm"
                  weight="font-bold"
                  className="group-hover:text-accent transition-colors leading-tight"
                >
                  {event.title}
                </Text>
                <Box display="flex" align="center" gap={1}>
                  <MapPin className="w-3 h-3 text-accent" />
                  <Text size="xs" color="dim">
                    {event.city}
                  </Text>
                </Box>
              </Stack>

              <Stack gap={2}>
                {[
                  {
                    label: "Event guide",
                    action: () => navigate(`/events/${event.slug}`),
                  },
                  {
                    label: "Theme gear",
                    action: () => navigate(`/events/${event.slug}?tab=gear`),
                  },
                  {
                    label: "Reminder alerts",
                    action: () =>
                      navigate(`/events/${event.slug}?tab=reminders`),
                  },
                ].map((item) => (
                  <Box
                    key={item.label}
                    as="button"
                    onClick={item.action}
                    border
                    radius="md"
                    paddingX={3}
                    paddingY={2}
                    display="flex"
                    align="center"
                    gap={2}
                    cursor="pointer"
                    className="hover:border-accent/40 hover:bg-accent/5 transition-all text-left"
                  >
                    <Box
                      width={3}
                      height={3}
                      radius="full"
                      className="bg-accent/40 shrink-0"
                    />
                    <Text size="xs" weight="font-bold">
                      {item.label}
                    </Text>
                    <ArrowRight className="w-3 h-3 ml-auto opacity-30 group-hover:opacity-100" />
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Box>
        ))}
      </Grid>
    </Stack>
  );
}
```

---

## Step 7 — Assemble the Event Detail Page

Create `src/features/events/EventDetailPage.tsx`. This is the orchestrator — it runs the data hook, manages tab state, and renders sections in the correct order.

```tsx
// src/features/events/EventDetailPage.tsx
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Box, Stack, Text } from "@/layouts/Primitives";
import { SEO } from "@/components/SEO";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";
import { useEventDetail } from "./useEventDetail";
import { EventHero, EventTab } from "./components/EventHero";
import { ThemeSpotlight } from "./components/ThemeSpotlight";
import { CuratedGear } from "./components/CuratedGear";
import { ReminderSignups } from "./components/ReminderSignups";
import { RelatedEvents } from "./components/RelatedEvents";

// Divider between sections
function SectionDivider() {
  return <Box border="t" className="border-line/30" />;
}

export default function EventDetailPage() {
  const {
    event,
    themeOutfits,
    themeAccessories,
    gearSections,
    relatedEvents,
    navigate,
  } = useEventDetail();

  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab") as EventTab | null;
  const [activeTab, setActiveTab] = useState<EventTab>(tabParam ?? "theme");

  // Sync tab from URL (e.g. links from RelatedEvents component)
  useEffect(() => {
    if (tabParam && tabParam !== activeTab) setActiveTab(tabParam);
  }, [tabParam]);

  const handleTabChange = (tab: EventTab) => {
    setActiveTab(tab);
    setSearchParams({ tab }, { replace: true });
    // Scroll to the section
    document
      .getElementById(`section-${tab}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!event) {
    return (
      <Box padding="panel" textAlign="center">
        <Stack gap={8} align="center">
          <Text variant="display" size="2xl">
            Event Guide Not Found
          </Text>
          <Box
            as="button"
            onClick={() => navigate("/events")}
            className="hover:text-accent transition-colors cursor-pointer"
          >
            <Text variant="mono" size="xs">
              Back to Events
            </Text>
          </Box>
        </Stack>
      </Box>
    );
  }

  return (
    <Box as="article">
      <SEO
        title={event.title}
        description={event.excerpt || event.description}
        type="article"
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

        {/* Section 2 — Event Hero (always visible) */}
        <EventHero
          event={event}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        {/* Section 3 — Theme Spotlight */}
        {event.theme &&
          (themeOutfits.length > 0 || themeAccessories.length > 0) && (
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
              <CuratedGear eventTitle={event.title} sections={gearSections} />
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

        {/* Section — Notes / body content */}
        {event.content?.trim() && (
          <>
            <SectionDivider />
            <Box
              id="section-notes"
              scrollPaddingTop={80}
              className="prose prose-slate prose-headings:font-display prose-p:font-sans prose-p:text-text-dim prose-strong:text-text-main max-w-none"
            >
              <MarkdownRenderer content={event.content} />
            </Box>
          </>
        )}

        {/* Section 6 — Related Events */}
        {relatedEvents.length > 0 && (
          <>
            <SectionDivider />
            <RelatedEvents events={relatedEvents} />
          </>
        )}
      </Stack>
    </Box>
  );
}
```

---

## Step 8 — Update `EventCard` to Link to Detail Pages

Open `src/components/ui/EventCard.tsx`. The current component accepts `name`, `location`, `schedule` but has no link. Replace it with the version below — backward compatible, but adds an optional `slug` prop:

```tsx
// src/components/ui/EventCard.tsx
import { MapPin, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Text } from "@/layouts/Primitives";

interface EventCardProps {
  name: string;
  location: string;
  schedule: string;
  slug?: string; // NEW — links to /events/:slug when provided
}

export function EventCard({ name, location, schedule, slug }: EventCardProps) {
  const navigate = useNavigate();
  const isClickable = !!slug;

  return (
    <Stack
      as={isClickable ? "button" : "div"}
      onClick={isClickable ? () => navigate(`/events/${slug}`) : undefined}
      padding={8}
      radius="md"
      border
      gap={4}
      height="full"
      cursor={isClickable ? "pointer" : undefined}
      className={`bg-surface transition-all duration-300 hover:-translate-y-0.5 text-left group ${
        isClickable ? "hover:border-accent/40" : ""
      }`}
    >
      <Box display="flex" align="center" gap={2}>
        <MapPin className="w-4 h-4 text-accent" />
        <Text
          variant="mono"
          size="micro"
          weight="font-bold"
          color="accent"
          uppercase
          tracking="widest"
        >
          {schedule}
        </Text>
      </Box>

      <Stack gap={1} flex={1}>
        <Text
          as="h4"
          variant="body"
          size="lg"
          weight="font-bold"
          className="text-text-main leading-tight group-hover:text-accent transition-colors"
        >
          {name}
        </Text>
        <Text size="sm" color="dim">
          {location}
        </Text>
      </Stack>

      {isClickable && (
        <Box display="flex" align="center" gap={1} color="accent">
          <Text variant="mono" size="xs" weight="font-bold">
            View Guide
          </Text>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </Box>
      )}
    </Stack>
  );
}
```

### Update the home page to pass `slug`

Open `src/features/dashboard/useHome.ts`. The `upcomingEvents` map currently drops the slug. Update it:

```ts
// src/features/dashboard/useHome.ts

upcomingEvents: upcomingEvents.map(event => ({
  name: event.title,
  location: event.location,
  schedule: event.schedule,
  slug: event.slug,  // ADD THIS
})),
```

Also update the "Upcoming Events" section header in `Dashboard.tsx` to link to `/events`:

```tsx
// In Dashboard.tsx — replace the SectionHeader usage:
<SectionHeader
  label="COMPETE"
  title="Upcoming Events"
  link={{ text: "All guides", to: "/events" }} // ADD link prop
/>
```

---

## Step 9 — SEO: Add Structured Data for Events

In `EventDetailPage.tsx`, replace the `<SEO>` component with one that includes `Event` schema markup. Add this helper just above the `return`:

```tsx
// Inside EventDetailPage.tsx, before the return statement:

const structuredData = useMemo(
  () => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description || event.excerpt,
    startDate: event.startDate || event.date,
    location: {
      "@type": "Place",
      name: event.location,
      address: { "@type": "PostalAddress", addressLocality: event.city },
    },
    url: event.url,
    organizer: { "@type": "Organization", name: "BoomTick.blog" },
  }),
  [event],
);
```

Then add `import { useMemo } from 'react'` and pass `schema={structuredData}` to `<SEO>`.

---

## Step 10 — Verify the Integration Checklist

Run through this after completing all steps:

```
[ ] npm run type-check passes with no new errors
[ ] /events route renders the index listing
[ ] /events/jack-and-jill-orama renders the detail page
[ ] EventHero tab bar scrolls to the correct section
[ ] ThemeSpotlight shows only if event.theme is defined
[ ] CuratedGear shows only if event.gear has at least one resolved item
[ ] ReminderSignups shows only if earlyBirdDate or hotelCutoffDate is set
[ ] RelatedEvents shows only if relatedEvents[] has valid slugs
[ ] EventCard on Home links to /events/:slug
[ ] "All guides" link on Home → /events works
[ ] Back button on detail page returns to /events
[ ] ?tab=reminders URL param opens the correct section
[ ] npm run build produces no bundle errors
```

---

## Common Pitfalls

**Affiliate IDs returning `undefined`**
If a gear section is empty in the UI, the ID in frontmatter doesn't match a key in `affiliates.json`. Check exact spelling — IDs are case-sensitive.

**Nested YAML not parsing**
The existing `parseFrontmatter` in `content.ts` doesn't recurse into nested objects. Use the flat field alternatives (`themeOutfitIds`, `gearShoeIds`, etc.) until a proper YAML parser is added, or switch to the `js-yaml` package:

```bash
npm install js-yaml
npm install --save-dev @types/js-yaml
```

Then replace the `parseFrontmatter` call in `transform()` with `yaml.load(match[1])`.

**`getEventBySlug` returning undefined on first render**
This is a React Query timing issue. The `EventDetailPage` already handles it with the `if (!event)` guard. The page will flash the "not found" state briefly on hard refresh — fix by adding `initialData` to the query:

```ts
initialData: () => slug ? getEventBySlug(slug) : undefined,
```

**Tab scroll offset behind mobile header**
The `scrollPaddingTop={80}` on each section `Box` accounts for the 64px mobile header. If sections are still hidden, increase this value to match `h-16` (64px) + any padding.

**`useNavigate` inside `EventCard` causing issues in tests**
Wrap the card in a `MemoryRouter` in your test setup, or check that the slug is always defined before rendering the clickable version.

---

_Plan smarter. Pack lighter. Dance more. — BoomTick.blog_
