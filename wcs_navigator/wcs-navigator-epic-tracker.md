# WCS Navigator: Epic & Issue Tracking Specification (Agile Roadmap)

This document tracks the deliverables, implementation epics, and quality gates for the **WCS Navigator** intelligent convention assistant.

---

## 🏆 Epic Overview & Delivery Status

| Epic Key | Epic Name | Scope & Deliverables | Status |
| :--- | :--- | :--- | :--- |
| **EPIC-1** | Search-First Omnibox Landing | Standalone centered search hero, California 2026 event autocomplete, header controls, collapsible upload drawer, sub-footer context. | **COMPLETED** ✅ |
| **EPIC-2** | Pre-Flight Event Footprint Analyzer | Dynamic timetable taxonomy detection: audition bands, parallel track streams, headlining champion staff, and venue proximity. | **COMPLETED** ✅ |
| **EPIC-3** | Fluid Auto-Advancing Card Questionnaire | Large selection cards (`max-w-xl mx-auto`), clear emoji icons, one-click auto-advancing interaction, and smooth back navigation. | **COMPLETED** ✅ |
| **EPIC-4** | Event-Based Local Transit & Logistics | Verified host venue logistics cards: direct airport distance, hotel shuttles, early bell desk luggage drops, and ballroom foyer access. | **COMPLETED** ✅ |
| **EPIC-5** | Minimalist Chronological Schedule & ICS | Decluttered session cards (Title, Time, Location), profile context badge, single-click `.ics` Apple/Google export and `.md` schedule download. | **COMPLETED** ✅ |

---

## 🎯 Detailed Milestone Issues

### 🏷️ WCS-101: Search-First Omnibox UI (`EventSearchHero.tsx`)
- **Deliverable:** Clean Google-style centered search bar with instant autocomplete.
- **Rules Met:** Eliminated duplicate main headers, heavy subtitles, and static pre-rendered pills.

### 🏷️ WCS-102: Pre-Flight Event Footprint Analysis (`questionGenerator.ts`)
- **Deliverable:** Analyzes the timetable payload to extract event-specific questions:
  - Audition placement & target division.
  - Parallel workshop track streams.
  - Featured champion instructors lineup query.
  - Venue-specific Friday arrival timing.

### 🏷️ WCS-103: Dynamic Questionnaire Component (`DynamicQuestionnaire.tsx`)
- **Deliverable:** Modern single-column card layout with tactile 180ms auto-advance on selection and top-left `← Back` button.

### 🏷️ WCS-104: Local Transit & Venue Insight Card (`FlightBufferTimeline.tsx`)
- **Deliverable:** Replaced generic arithmetic countdowns with actionable venue and airport logistics for SFO, SJC, SNA, and BUR host hotels.

### 🏷️ WCS-105: Minimalist Schedule & Streaming Calendar (`AgentMindTrace.tsx`)
- **Deliverable:** Clean session cards (Title, Time, MapPin), stripped of AI rationale boxes, authenticity tags, and category subtitles.
