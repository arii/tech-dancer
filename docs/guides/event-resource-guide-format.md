# BoomTick.blog — Event Resource Guide Format Update Guide

> **Goal:** Transform a basic event stub into a full Event Resource Guide page — the 6-section layout shown in the storyboard: Event Hero → Theme Spotlight → Curated Gear → Reminder Signups → More Events.

---

## 1. What Changed

The original event format was a minimal stub:

```md
---
type: event
title: "Jack & Jill O'Rama"
date: "2026-06-04"
location: "Hyatt Regency Orange County"
city: "Garden Grove, CA"
schedule: "June 4 - 7, 2026"
description: "One sentence description."
---
```

The new format adds **five new frontmatter sections** and a richer markdown body:

| Section         | New Fields                                                                        |
| --------------- | --------------------------------------------------------------------------------- |
| Event Hero      | `whyAttending`, `heroImage`                                                       |
| Theme Spotlight | `theme.name`, `theme.outfits[]`, `theme.accessories[]`                            |
| Curated Gear    | `gear.outfits[]`, `gear.accessories[]`, `gear.shoes[]`, `gear.travel[]`           |
| Reminders       | `earlyBirdDate`, `registrationDeadline`, `hotelCutoffDate`, `packingReminderDate` |
| Discovery       | `relatedEvents[]`, `url`                                                          |

---

## 2. Complete Frontmatter Reference

```yaml
---
type: event
title: "Jack & Jill O'Rama"
date: "2026-06-04" # Sort/display date (event start)
startDate: "2026-06-04" # Required for reminder timeline engine
author: "Ariel Anders, PhD"

category: "WSDC Registry Event"
excerpt: "The ultimate WCS party in Southern California."

# ── Logistics ──────────────────────────────────────────
location: "Hyatt Regency Orange County"
city: "Garden Grove, CA"
schedule: "June 4 - 7, 2026"
url: "https://jackandjillorama.com"
heroImage: "/assets/events/jjor-hero.jpg" # Optional; falls back to particle canvas

# ── Event Hero copy ────────────────────────────────────
whyAttending: >
  Jack n Jill O'Rama brings together an incredible community of dancers
  who value connection, creativity, and fun. It's a weekend to grow,
  share the floor, and make memories with friends — old and new.

# ── Theme Spotlight ────────────────────────────────────
theme:
  name: "Rainbow"
  label: "NorCal Dancers Theme" # e.g. "NorCal Dancers Theme"
  colors: ["#FF0000", "#FF7F00", "#FFFF00"]
  outfitIds:
    - "rainbow-fringe-dress"
    - "sequin-bomber-jacket"
    - "ombre-dance-dress"
  accessoryIds:
    - "rainbow-earrings"
    - "pride-sunglasses"
    - "rainbow-fan"

# ── Curated Gear ───────────────────────────────────────
gear:
  outfitIds:
    - "rainbow-fringe-dress"
    - "sequin-bomber-jacket"
  accessoryIds:
    - "rainbow-earrings"
    - "pride-sunglasses"
  shoeIds:
    - "bloch-grecian"
    - "suede-sheets" # DIY shoe conversion
  essentialIds:
    - "loop-experience" # Earplugs
    - "foam-roller" # Recovery
  travelIds:
    - "compression-cubes"
    - "travel-bottles"
    - "hanging-toiletry-bag"

# ── Reminder Deadlines ─────────────────────────────────
earlyBirdDate: "2026-04-15"
registrationDeadline: "2026-05-10"
hotelCutoffDate: "2026-05-12"
packingReminderDate: "2026-05-25"

# ── Related Events (sidebar / "More Events" section) ───
relatedEvents:
  - "wild-wild-westie"
  - "swingtacular-the-galactic-open"
  - "boogie-by-the-bay"
---
```

---

## 3. Markdown Body

The body below the frontmatter renders in the **Notes** tab of the event hero nav. Keep it short — one to three paragraphs of practical insider tips.

```md
# Jack & Jill O'Rama

One of the most popular events on the circuit. Book the hotel block
immediately — the Hyatt fills within days of opening.

## Pro Tips

- The **early-bird window** is typically only 2 weeks. Set a calendar alert now.
- Parking at the Hyatt is validated for registered attendees.
- The pool party runs Sunday afternoon — pack a swimsuit.
```

---

## 4. Connecting Gear to the Affiliate Database

Theme outfits and gear sections reference IDs from `src/data/affiliates.json`. To add a new item:

**Step 1 — Add to `affiliates.json`:**

```json
"rainbow-fringe-dress": {
  "id": "rainbow-fringe-dress",
  "name": "Rainbow Fringe Dance Dress",
  "url": "https://amazon.com/dp/EXAMPLE",
  "category": "gear",
  "description": "Vibrant fringe dress perfect for the Rainbow theme."
}
```

**Step 2 — Reference the ID in the event frontmatter** under `theme.outfitIds` or `gear.outfitIds`.

The `affiliateManager.getLink(id)` utility resolves IDs to full link objects at render time — no other wiring needed.

---

## 5. Reminder Dates — How the Timeline Engine Uses Them

The `WSDCReminders` component (`src/features/lab/wsdc-reminders/`) reads four anchor dates from the event frontmatter and auto-calculates the full logistics timeline:

| Frontmatter field      | Timeline milestone                                                |
| ---------------------- | ----------------------------------------------------------------- |
| `startDate`            | Day 0 — also triggers the 90-day flight alert                     |
| `earlyBirdDate`        | Early Bird Deadline (shown 2 days early as buffer)                |
| `hotelCutoffDate`      | Hotel Block Cutoff                                                |
| `packingReminderDate`  | Packing Reminder (new — displayed in Reminders tab)               |
| `registrationDeadline` | Competition Signup window (14 days before `startDate` if omitted) |

If `startDate`, `earlyBirdDate`, and `hotelCutoffDate` are all present, the event automatically appears in the WSDC Reminders tool's event picker.

---

## 6. Content Type in `src/lib/content.ts`

The `Event` interface needs three optional fields added:

```ts
// In src/lib/content.ts — Event interface
export interface Event {
  // ... existing fields ...
  whyAttending?: string;
  heroImage?: string;
  theme?: {
    name: string;
    label?: string;
    outfitIds?: string[];
    accessoryIds?: string[];
  };
  gear?: {
    outfitIds?: string[];
    accessoryIds?: string[];
    shoeIds?: string[];
    essentialIds?: string[];
    travelIds?: string[];
  };
  registrationDeadline?: string;
  packingReminderDate?: string;
  relatedEvents?: string[];
}
```

The YAML parser in `parseFrontmatter()` already handles nested objects via the `colonIdx` branch — no parser changes needed for flat keys. For nested keys (`theme`, `gear`), add a post-processing step or handle them as JSON strings, e.g.:

```yaml
# Flat alternative if nested YAML parsing isn't added:
themeOutfitIds: ["rainbow-fringe-dress", "sequin-bomber-jacket"]
themeAccessoryIds: ["rainbow-earrings", "pride-sunglasses"]
gearShoeIds: ["bloch-grecian"]
```

---

## 7. Page Section Mapping

| Storyboard Section      | Data Source                                                                       | Component (to build)  |
| ----------------------- | --------------------------------------------------------------------------------- | --------------------- |
| **1. Event Hero**       | `title`, `location`, `date`, `whyAttending`, tabs                                 | `EventHero.tsx`       |
| **2. Theme Spotlight**  | `theme.*`, resolved via `affiliateManager`                                        | `ThemeSpotlight.tsx`  |
| **3. Curated Gear**     | `gear.*`, resolved via `affiliateManager`                                         | `CuratedGear.tsx`     |
| **4. Reminder Signups** | `earlyBirdDate`, `registrationDeadline`, `hotelCutoffDate`, `packingReminderDate` | Reuse `WSDCReminders` |
| **5. More Events**      | `relatedEvents[]` → `getEvents()` lookup                                          | `RelatedEvents.tsx`   |

The tab navigation in the hero (`Theme`, `Gear`, `Reminders`, `Travel`, `Notes`) maps directly to these sections scrolled into view — implement with `id` anchors and `scrollIntoView`.

---

## 8. Checklist for Each New Event Guide

```
[ ] Add all frontmatter fields (section 2)
[ ] Write whyAttending blurb (2–4 sentences, first person from BoomTick)
[ ] Set startDate, earlyBirdDate, hotelCutoffDate (required for reminder tool)
[ ] Add affiliate IDs for theme outfits + accessories (at least 3 each)
[ ] Add affiliate IDs for gear: shoes, essentials, travel (2–3 each)
[ ] Add 2–3 relatedEvents slugs (other WSDC events in the system)
[ ] Write insider tips in the markdown body
[ ] Confirm the event slug matches an existing entry in getEvents()
```

---

## 9. Quick Example — Minimal Valid Guide

This is the smallest set of fields that populates all 5 storyboard sections:

```yaml
---
type: event
title: "SOswing"
date: "2026-05-14"
startDate: "2026-05-14"
earlyBirdDate: "2026-03-15"
hotelCutoffDate: "2026-04-18"
author: "Ariel Anders, PhD"
category: "WSDC Registry Event"
excerpt: "A charming WCS experience in beautiful Ashland, OR."
location: "Ashland Hills Hotel & Suites"
city: "Ashland, OR"
schedule: "May 14 - 17, 2026"
url: "https://soswing.com"

whyAttending: >
  SOswing has the most welcoming, community-first atmosphere on the
  Pacific Northwest circuit. It's a perfect event to focus on dancing
  without the pressure of a huge comp field.

theme:
  name: "Pacific Wildflower"
  label: "SOswing Theme"
  outfitIds: ["rave-fan", "neck-fan"]
  accessoryIds: ["rave-fan"]

gear:
  shoeIds: ["bloch-grecian", "dance-socks"]
  essentialIds: ["loop-experience", "foam-roller"]
  travelIds: ["compression-cubes"]

relatedEvents:
  - "jack-and-jill-orama"
  - "swingtacular-the-galactic-open"
---
# SOswing

Ashland is a theatre town — beautiful, small, and surprisingly walkable
from the hotel. Book early; the room block is limited.
```

---

_Plan smarter. Pack lighter. Dance more. — BoomTick.blog_
