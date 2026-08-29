# WCS Navigator: Epic & Issue Tracking Specification (Agile Roadmap)

This document tracks the deliverables, implementation epics, and quality gates for the **WCS Navigator** intelligent convention assistant.

---

## 🏆 Epic Overview & Delivery Status

| Epic Key | Epic Name | Scope & Deliverables | GitHub Issue | Status |
| :--- | :--- | :--- | :--- | :--- |
| **EPIC-1** | Search-First Omnibox Landing | Standalone centered search hero, California 2026 event autocomplete, header controls, collapsible upload drawer, sub-footer context. | #4398 | **COMPLETED** ✅ |
| **EPIC-2** | Pre-Flight Event Footprint Analyzer | Dynamic timetable taxonomy detection: audition bands, parallel track streams, headlining champion staff, and venue proximity. | #4393 | **COMPLETED** ✅ |
| **EPIC-3** | Fluid Auto-Advancing Card Questionnaire | Large selection cards (`max-w-xl mx-auto`), clear emoji icons, one-click auto-advancing interaction, and smooth back navigation. | #4398 | **COMPLETED** ✅ |
| **EPIC-4** | Event-Based Local Transit & Logistics | Verified host venue logistics cards: direct airport distance, hotel shuttles, early bell desk luggage drops, and ballroom foyer access. | #4393 | **COMPLETED** ✅ |
| **EPIC-5** | Minimalist Chronological Schedule & ICS | Decluttered session cards (Title, Time, Location), profile context badge, single-click `.ics` Apple/Google export and `.md` schedule download. | #4395 | **COMPLETED** ✅ |
| **EPIC-6** | Uploaded Schedules & Live Gateway Pipeline | PDF / URL ingestion pipeline, Live Gateway API calls with automatic client-side fallback, "All Workshops" track option, universal social dancing and lunch/dinner breaks. | #4393 | **IN PROGRESS** 🔄 |
| **EPIC-7** | Full Schedule Browser & Local Storage | Interactive full schedule modal/drawer, one-click Add (`+`) / Remove (`✕`) session customization, real-time `.ics` dynamic recalculation, and `localStorage` persistence. | #4395, #4397 | **IN PROGRESS** 🔄 |
| **EPIC-8** | Diagram Fullscreen Portal Fix | React Portal mount (`createPortal`) for ResponsiveDiagram fullscreen modal to prevent CSS transform containment issues in article layouts. | #4406 | **IN PROGRESS** 🔄 |

---

## 🎯 Detailed Milestone Issues

### 🏷️ WCS-101: Search-First Omnibox UI (`EventSearchHero.tsx`)
- **Deliverable:** Clean Google-style centered search bar with instant autocomplete.
- **Rules Met:** Eliminated duplicate main headers, heavy subtitles, and static pre-rendered pills.

### 🏷️ WCS-102: Pre-Flight Event Footprint Analysis (`questionGenerator.ts`)
- **Deliverable:** Analyzes the timetable payload to extract event-specific questions:
  - Audition placement & target division.
  - Parallel workshop track streams + **All Workshops** comprehensive option.
  - Featured champion instructors lineup query.
  - Venue-specific Friday arrival timing.

### 🏷️ WCS-103: Dynamic Questionnaire Component (`DynamicQuestionnaire.tsx`)
- **Deliverable:** Modern single-column card layout with tactile 180ms auto-advance on selection and top-left `← Back` button.

### 🏷️ WCS-104: Local Transit & Venue Insight Card (`FlightBufferTimeline.tsx`)
- **Deliverable:** Replaced generic arithmetic countdowns with actionable venue and airport logistics for SFO, SJC, SNA, and BUR host hotels.

### 🏷️ WCS-105: Minimalist Schedule & Streaming Calendar (`AgentMindTrace.tsx`)
- **Deliverable:** Clean session cards (Title, Time, MapPin), stripped of AI rationale boxes, authenticity tags, and category subtitles.

### 🏷️ WCS-106: Uploaded Schedule & Live Gateway Pipeline (`WCSNavigatorPage.tsx`, `liveScheduleExtractor.ts`)
- **Deliverable:** PDF upload and URL ingestion with Live Gateway (`/api/v1/discover`, `/api/v1/generate`) and resilient client-side heuristic extraction fallback.

### 🏷️ WCS-107: Interactive Full Schedule Browser & LocalStorage (`AgentMindTrace.tsx`, `useNavigatorStorage.ts`)
- **Deliverable:** "View All Schedule" browser modal, Add/Remove session toggles, dynamic `.ics` rebuild, and `localStorage` persistence.

### 🏷️ WCS-108: Diagram Fullscreen Portal Modal (`ResponsiveDiagram.tsx`)
- **Deliverable:** React Portal mount directly to `document.body` with viewport centering and responsive zoom controls.
