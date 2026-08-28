# WCS Navigator: Reference Architecture & Engineering Guide

This document defines the comprehensive reference architecture, API contracts, frontend component hierarchy, and runtime execution pipelines for **WCS Navigator** — an intelligent schedule optimizer and calendar streaming agent for West Coast Swing dance conventions.

---

## 1. End-to-End User Flow & Runtime Stages

```
+-----------------------------------------------------------------------------------+
| 1. SEARCH-FIRST LANDING STATE (EventSearchHero.tsx)                               |
| - Clean, Google-style Omnibox with Autocomplete & Presets                         |
| - Header Controls (Logo, How It Works Modal, Preset Jump)                        |
| - Collapsible Custom Schedule Upload Drawer (Drag-and-Drop / URL Ingestion)       |
+-----------------------------------------------------------------------------------+
                                         │
                                         ▼ (Event Selected or File Uploaded)
+-----------------------------------------------------------------------------------+
| 2. PRE-FLIGHT FOOTPRINT ANALYSIS & DISCOVERY SCAN (AgentDiscoveryTransition.tsx)  |
| - Scans timetable rooms, track taxonomy, audition bands, and featured champions   |
| - Analyzes host venue transit conditions and airport proximity                    |
+-----------------------------------------------------------------------------------+
                                         │
                                         ▼ (Payload Extracted)
+-----------------------------------------------------------------------------------+
| 3. DYNAMIC CONTEXTUAL QUESTIONNAIRE (DynamicQuestionnaire.tsx)                    |
| - Step 1: Audition Placement / Targeted Division (Novice, Int, Adv, Social)       |
| - Step 2: Event-Specific Parallel Track Streams (Footwork, Musicality, Flow)      |
| - Step 3: Featured Champion Instructor Lineup (Headlining staff for the weekend)  |
| - Step 4: Venue-Specific Friday Arrival Logistics (Target landing deadline)       |
| - Interaction: Large single-column cards with instant auto-advancing on click     |
+-----------------------------------------------------------------------------------+
                                         │
                                         ▼ (Auto-advances through final step)
+-----------------------------------------------------------------------------------+
| 4. TAILORED SCHEDULE & USABILITY DASHBOARD (AgentMindTrace.tsx)                   |
| - Event-Based Local Transit & Venue Insight Card (FlightBufferTimeline.tsx)       |
| - Ultra-Clean Chronological Schedule: Friday Prelims -> Saturday Workshops -> Sun|
| - Session Cards: Title, Time (Clock), Ballroom Location (MapPin)                  |
| - Single-Click Tools: .ics Apple/Google Calendar Export & .md Itinerary Download  |
+-----------------------------------------------------------------------------------+
```

---

## 2. Frontend Component Hierarchy & Responsibilities

| Component Path | Role & Key Responsibilities |
| :--- | :--- |
| [`src/features/wcs-navigator/WCSNavigatorPage.tsx`](file:///home/ari/tech-dancer/src/features/wcs-navigator/WCSNavigatorPage.tsx) | **Master Orchestrator**: Manages progressive step machine (`landing` → `discovering` → `questionnaire` → `results`), active event state, and questionnaire synthesis. |
| [`src/features/wcs-navigator/components/EventSearchHero.tsx`](file:///home/ari/tech-dancer/src/features/wcs-navigator/components/EventSearchHero.tsx) | **Search-First Omnibox**: Renders the standalone search hero, California 2026 event autocomplete, and collapsible PDF/timetable uploader. |
| [`src/features/wcs-navigator/components/DynamicQuestionnaire.tsx`](file:///home/ari/tech-dancer/src/features/wcs-navigator/components/DynamicQuestionnaire.tsx) | **Fluid Card Questionnaire**: Centered single-column layout with auto-advancing large cards, tactile hover transitions, and progress indicator. |
| [`src/features/wcs-navigator/utils/questionGenerator.ts`](file:///home/ari/tech-dancer/src/features/wcs-navigator/utils/questionGenerator.ts) | **Footprint Taxonomy Analyzer**: Analyzes event payload to dynamically assemble questions for audition tiers, parallel tracks, headliners, and venue arrival. |
| [`src/features/wcs-navigator/components/FlightBufferTimeline.tsx`](file:///home/ari/tech-dancer/src/features/wcs-navigator/components/FlightBufferTimeline.tsx) | **Local Transit & Logistics Card**: Provides verified host venue tips (airport shuttles, bag drops, ballroom access, and late-night amenities). |
| [`src/features/wcs-navigator/components/AgentMindTrace.tsx`](file:///home/ari/tech-dancer/src/features/wcs-navigator/components/AgentMindTrace.tsx) | **Tailored Itinerary Viewer**: Displays decluttered session cards grouped by day, profile context badge, and calendar streaming export buttons. |

---

## 3. Backend API Contract & Data Schemas

### Endpoint 1: Pre-Flight Footprint Discovery
- **Route:** `POST /api/generate-calendar/discover`
- **Request Body:** Form data with `schedule_pdf` (file) or `preset_id` / `url` (string).
- **Response Schema:**
```json
{
  "preset_id": "boogie-by-the-bay-2026",
  "preset_name": "Boogie by the Bay 2026",
  "has_auditions": true,
  "available_tracks": [
    "Musicality & Phrasing Stream",
    "Connection & Slot Mechanics",
    "Styling, Dips & Flow Accents"
  ],
  "featured_instructors": [
    "Benji Schwimmer",
    "Jordan Frisbee & Tatiana Mollmann",
    "Thibault Ramirez & Nicole Ramirez",
    "Glenn Ball & Emily Huang"
  ],
  "venue_logistics": {
    "hotel_name": "Hyatt Regency San Francisco Airport",
    "primary_airport": "SFO",
    "transit_mode": "Complimentary 24/7 Shuttle (5 mins)",
    "earliest_staging_time": "5:15 PM Friday"
  }
}
```

### Endpoint 2: Contextual Generation & Calendar Streaming
- **Route:** `POST /api/generate-calendar/generate`
- **Request Body:**
```json
{
  "preset_id": "boogie-by-the-bay-2026",
  "answers": {
    "division": "novice",
    "role": "lead",
    "track": "technique",
    "instructor": "benji",
    "arrival": "early"
  }
}
```
- **Response Headers:** `Content-Type: text/calendar; charset=utf-8`, `Content-Disposition: attachment; filename="boogie-by-the-bay-schedule.ics"`
- **Response Body:** RFC 5545 valid VCALENDAR payload with formatted VEVENT sessions, room alarms, and travel buffers.

---

## 4. Key Reference Links & Hackathon Resources

| Category | Resource Name | Link |
| :--- | :--- | :--- |
| **Hackathon Portal** | All Things Agentic Hackathon on Devpost | [allthingsagentichackathon.devpost.com](https://allthingsagentichackathon.devpost.com/resources) |
| **GCP Credits** | Google Cloud Credits Request Form | [forms.gle/riGhgDSHkHeMx8Ca6](https://forms.gle/riGhgDSHkHeMx8Ca6) |
| **Source Repository** | tech-dancer GitHub Repository | [github.com/arii/tech-dancer](https://github.com/arii/tech-dancer) |
| **Live Deployment** | BoomTick.blog Live Site | [boomtick.blog/research/wcs-navigator](https://boomtick.blog/research/wcs-navigator) |
| **Footwear Science** | Adhesive Suede DIY Dance Shoes | [boomtick.blog/blog/2026-04-18-make-shoe-dance](https://boomtick.blog/blog/2026-04-18-make-shoe-dance) |
| **Packing Essentials** | WCS Convention Gear Checklist | [boomtick.blog/blog/2026-06-01-wcs-essentials](https://boomtick.blog/blog/2026-06-01-wcs-essentials) |
