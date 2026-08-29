# WCS Navigator: Final Consolidated MVP Specification & Developer Blueprint
## Track 1: Taskmaster (Bring Your Own Friction) — Hackathon Production Blueprint

This document defines the consolidated production specification for **WCS Navigator & Schedule Optimizer**. It merges the search-first landing architecture, pre-flight event footprint analysis, fluid auto-advancing card questionnaire, event-based local logistics cards, and minimalist chronological schedule into a single cohesive blueprint.

---

## 1. System Architecture & Infrastructure

This architecture is designed for fast, frictionless execution conforming to the **All Things Agentic Hackathon** standards. It utilizes an in-memory, stateless model that eliminates complex user authentication and persistent cloud storage dependencies.

```
+------------------------------------+             +------------------------------------+
|       boomtick.blog Frontend       |             |        Google Cloud Run API        |
|  - Search-First Omnibox Hero       | <=========> |  - FastAPI Stateless Web Server   |
|  - Auto-Advancing Card Flow        |             |  - Bundles Local Event PDF Assets  |
|  - Local Transit Insight Card      |             |  - Generates RFC 5545 ICS Stream   |
|  - Minimal Chronological Schedule  |             |  - Pre-Flight Footprint Extraction |
+------------------------------------+             +------------------------------------+
                                                             |
                                                             | (Google GenAI SDK)
                                                             v
                                                   +------------------------------------+
                                                   |         Gemini 3.5 Flash           |
                                                   |  - Pass 1: Footprint Discovery     |
                                                   |  - Pass 2: Schedule & ICS Synthesis|
                                                   +------------------------------------+
```

### Core Technology Stack
*   **Frontend Client:** React 19 + TypeScript + Tailwind CSS (Vite SPA embedded in `boomtick.blog`).
*   **Hosting:** Google Cloud Run (Containerized FastAPI backend) and static client CDN.
*   **Reasoning Engine:** Gemini 3.5 Flash (via Google GenAI SDK `google-genai`).
*   **Calendar Standard:** RFC 5545 compliant `.ics` streaming payloads with native Apple/Google Calendar alarm metadata.

---

## 2. End-to-End User Experience & Flow

```
+-----------------------------------------------------------------------------------+
| 1. SEARCH-FIRST OMNIBOX LANDING                                                   |
| - Clean, Google-style Omnibox with Autocomplete & Presets                         |
| - Header Controls (Logo, How It Works Modal, Preset Jump)                        |
| - Collapsible Custom Schedule Upload Drawer (Drag-and-Drop / URL Ingestion)       |
+-----------------------------------------------------------------------------------+
                                         │
                                         ▼ (Event Selected or File Uploaded)
+-----------------------------------------------------------------------------------+
| 2. PRE-FLIGHT FOOTPRINT ANALYSIS & SCANNING TRANSITION                            |
| - Scans timetable rooms, track taxonomy, audition bands, and featured champions   |
| - Analyzes host venue transit conditions and airport proximity                    |
+-----------------------------------------------------------------------------------+
                                         │
                                         ▼ (Payload Extracted)
+-----------------------------------------------------------------------------------+
| 3. DYNAMIC CONTEXTUAL QUESTIONNAIRE                                               |
| - Step 1: Audition Placement / Targeted Division (Novice, Int, Adv, Social)       |
| - Step 2: Event-Specific Parallel Track Streams (Footwork, Musicality, Flow)      |
| - Step 3: Featured Champion Instructor Lineup (Headlining staff for the weekend)  |
| - Step 4: Venue-Specific Friday Arrival Logistics (Target landing deadline)       |
| - Interaction: Large single-column cards with instant auto-advancing on click     |
+-----------------------------------------------------------------------------------+
                                         │
                                         ▼ (Auto-advances through final step)
+-----------------------------------------------------------------------------------+
| 4. TAILORED SCHEDULE & USABILITY DASHBOARD                                        |
| - Event-Based Local Transit & Venue Insight Card                                  |
| - Ultra-Clean Chronological Schedule: Friday Prelims -> Saturday Workshops -> Sun|
| - Session Cards: Title, Time (Clock), Ballroom Location (MapPin)                  |
| - Single-Click Tools: .ics Apple/Google Calendar Export & .md Itinerary Download  |
+-----------------------------------------------------------------------------------+
```

---

## 3. Pre-Flight Footprint Analysis & Dynamic Question Generation

Rather than forcing static or hardcoded question schemas, `analyzeEventFootprint` evaluates the selected event's timetable payload dynamically before initializing the questionnaire.

### Structural Taxonomy Evaluation Rules:
1. **Audition Tiers & Persona**:
   - IF Event gates classes by audition bands (e.g. *Boogie by the Bay Level 4/5* vs *US Open Championship Divisions*) ➔ Step 1 queries target division eligibility.
2. **Parallel Workshop Streams**:
   - IF Classes are organized into distinct themes (e.g. *South Bay's 3 themes* vs *Boogie's Phrasing & Connection streams*) ➔ Step 2 isolates those specific categories.
3. **Featured Champion Instructors**:
   - IF Schedule features headlining champions ➔ Step 3 dynamically queries staff (e.g. *Benji Schwimmer & Nicole Ramirez* at Boogie vs *Kyle Redd, PJ Turner & Victoria Henk* at South Bay).
4. **Venue-Specific Friday Arrival**:
   - Step 4 queries flight touchdown deadlines tailored to host hotel transit (e.g. *SFO 5-min Hyatt shuttle* vs *SJC 7-min transfer*).

---

## 4. UI Design Rules & Quality Standards

### A. Clean, Frictionless Questionnaire
- **Large Selection Cards**: Single-column centered layout (`max-w-xl mx-auto`) with distinct emoji badges, bold titles, and concise descriptions.
- **Auto-Advance on Click**: Clicking any card immediately highlights the selection with a cyan glow and advances to the next question automatically after 180ms.
- **Tactile Back Navigation**: `← Back` button allows dancers to re-evaluate prior choices.

### B. Event-Based Local Transit Logistics Card
- **Venue Proximity**: Direct airport distance and transfer time.
- **Shuttle & Rideshare Tips**: Verified hotel shuttle details, luggage holding at bell desk prior to 3:00 PM check-in, and ballroom foyer access.
- **Dancer Amenities**: 24/7 lobby market, water stations, and late-night food.

### C. Ultra-Clean Minimalist Chronological Schedule
- **No Robot Rationale Text**: Removed explanatory AI justification blocks from session cards.
- **No Redundant Badges**: Removed `★ Selected for Plan` and uppercase category subtitles (`FRIDAY SESSIONS & STAGING CALLS`).
- **Sleek Session Cards**: Focused solely on Title, Time (`Clock`), and Ballroom Location (`MapPin`).
- **High-Visibility Usability Tools**: Single-click `.ics` Apple/Google Calendar export and `.md` Markdown schedule download.

---

## 5. Verification & Testing Protocol

- **Linter Gate:** `pnpm run lint` must pass with 0 errors and 0 warnings (10.00/10).
- **Build Gate:** `pnpm run build` must compile cleanly with exit code 0.
- **Visual E2E Verification:** Playwright script captures Desktop (1280x800) and Mobile (375x812) screenshots across all 4 stages: Search Landing, Discovery Scan, Card Questionnaire, and Tailored Dashboard.
