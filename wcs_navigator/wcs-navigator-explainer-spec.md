# WCS Navigator: Decision Explainer & Frontend Visualization Specification

This document defines the **Decision Explainer** subsystem of the WCS Event Navigator. Making the agent's workflow transparent is a **P0 requirement** for the All Things Agentic Hackathon [5]. This specification details the interactive frontend UX/UI designs, state transitions, and the exact JSON data structures used to render the agent's "thinking process" live on `boomtick.blog` [9].

---

## 1. UX Design: The "Agent Mind" Visualization Flow

Rather than operating as a silent black box that simply drops a file download, the frontend on `boomtick.blog` uses a **two-phase interactive visualizer** to walk the user through the agent's logic [9, 15].

### Stage 1: The Pre-Scan Dynamic Form (Pass 1)
When the user uploads a schedule PDF or inputs a URL, the interface transitions from a simple file dropzone into a **customized, pre-validated questionnaire** generated dynamically on-the-fly by the Discovery Agent [15].

```
+-------------------------------------------------------------+
|               [1] DISCOVERED EVENT PARAMETERS               |
+-------------------------------------------------------------+
| Detected Event: Boogie by the Bay 2026                      |
|                                                             |
| Please customize your profile to filter the schedule:       |
|                                                             |
| 1. Which track(s) do you dance?                             |
|    [x] West Coast Swing   [ ] Country Swing (Not attending) |
|                                                             |
| 2. What is your competitive division?                       |
|    ( ) Newcomer  (x) Novice  ( ) Intermediate  ( ) Advanced |
|                                                             |
| 3. What is your primary weekend goal?                       |
|    [x] Compete in Jack & Jill  [x] Attend Workshops         |
|                                                             |
|                          [ GENERATE MY CALENDAR ]           |
+-------------------------------------------------------------+
```

### Stage 2: The Live Progress Logger (Execution State)
While the Generation Pass (`/generate`) executes, the UI shows a live progress timeline rendering exactly what sub-task the background agent is tackling:
1. `[ 🟢 COMPLETED ]` Extracted raw text from visual schedule PDF (3 pages) [15].
2. `[ 🟢 COMPLETED ]` Filtered out 24 ineligible workshops (Intermediate/Advanced/Champion levels) [15].
3. `[ 🟡 PROCESSING ]` Resolving travel buffer window math... [15]
4. `[ ⚪ PENDING ]` Packaging calendar elements into in-memory RFC 5545 `.ics` file.

---

## 2. Dynamic Frontend UI Components (React + Tailwind)

Once the backend responds, the React engine in `tech-dancer` renders three specific, interactive visual blocks explaining the agent's decisions [9].

### A. The Flight Buffer Timeline Component
This component visually explains the calculation behind the travel deadline, proving the "buffer math" logic directly to the user [15].

```
✈️ TRAVEL TIMELINE BUFFER ANALYSIS
========================================================================
Call-time: Sat 10:30 AM  [ Novice Jack & Jill Registration Cutoff ]
           │
           ├── [ -1.0 Hour ] ──> Reg & Physical Warm-up Window
           │
           ├── [ -1.5 Hours ] ──> Hotel Check-In, Wardrobe & Change
           │
           └── [ -0.5 Hour ] ──> Airport-to-Venue Transit (SFO -> Hyatt) [15]
           │
Target Landing: Sat 7:30 AM  [ LATEST FLIGHT ARRIVAL DEADLINE ] [15]
========================================================================
```

### B. The Filtering Audit Matrix
Users can toggle between **"Included Sessions"** and **"Filtered Out Sessions"** to see exactly why items were selected or bypassed [15].

*   **Included Tab:**
    *   `Novice Strictly Swing - Prelims` (Friday 5:30 PM) ──> *Matched Division: Novice* [15].
    *   `All-Levels Social Warm-Up Class` (Friday 3:00 PM) ──> *Matched Division: All Levels* [15].
*   **Filtered Out Tab (With Grayed-Out UI):**
    *   `Advanced/All-Star WCS Intensive` ──> ❌ *Filtered: User selected Novice (Advanced+ sessions excluded)* [15].
    *   `Country Swing Line Dance Bootcamp` ──> ❌ *Filtered: User deselected Country Swing track* [15].

### C. The Packing Manifest Cards
Rather than a static bulleted list, the packing manifest renders as styled cards containing the agent's **explicit rationale** [15, 18]:

```
+--------------------------+  +--------------------------+  +--------------------------+
|  🎫 Competition Bib Pins |  |  👟 Adhesive Suede Sheets|  |  💨 Travel Fabric Steamer|
+--------------------------+  +--------------------------+  +--------------------------+
| Rationale:               |  | Rationale:               |  | Rationale:               |
| Detected active contest  |  | PDF schedule specifies   |  | Competition slacks and   |
| registration for Jack &  |  | portable ballrooms with  |  | vests require formal     |
| Jill. Safety pins are    |  | temporary vinyl tiling.  |  | pressing for spotlights. |
| required for bib numbers.|  | Suede is joint-safe.     |  |                          |
+--------------------------+  +--------------------------+  +--------------------------+
```

---

## 3. The Explainer Data Structures (JSON Schemas)

To drive this dynamic interface, the API contracts enforce highly descriptive trace payloads.

### Pass 1: Discovery Payload Schema (`/discover`)
This output determines what form elements are shown to the user on `boomtick.blog` [9].

```json
{
  "preset_id": "boogie-by-the-bay-2026",
  "preset_name": "Boogie by the Bay 2026",
  "event_name": "Boogie by the Bay 2026",
  "tracks_detected": ["West Coast Swing", "Country Swing", "Hustle"],
  "suggested_form_questions": [
    {
      "id": "dance_styles",
      "title": "Which dance genres do you want on your schedule?",
      "type": "multiselect",
      "context": "Boogie is a multi-genre event; filter out non-WCS tracks if focusing purely on WCS.",
      "required": false,
      "defaultValue": ["wcs"],
      "options": [
        { "label": "West Coast Swing", "value": "wcs" },
        { "label": "Country Swing", "value": "country" },
        { "label": "Hustle", "value": "hustle" }
      ]
    },
    {
      "id": "wsdc_level",
      "title": "What is your dancer persona & competition division?",
      "type": "select",
      "context": "Enforces workshop level gatekeeping and flags your division check-in time.",
      "required": true,
      "defaultValue": "novice",
      "options": [
        { "label": "Novice Competitor", "value": "novice", "subtitle": "WSDC Novice prelims, early staging call, foundational tracks", "badge": "Novice" },
        { "label": "Intermediate Competitor", "value": "intermediate", "subtitle": "WSDC Intermediate prelims, intensive classes, late night socials", "badge": "Intermediate" },
        { "label": "Social Dancer Only", "value": "social_only", "subtitle": "All-levels workshops, peak party energy, no prelim staging calls", "badge": "Social" },
        { "label": "Workshop Enthusiast", "value": "workshop_enthusiast", "subtitle": "Max daytime classes, masterclasses & technique intensives", "badge": "Workshops" }
      ]
    }
  ]
}
```

### Pass 2: Generation Payload Schema (`/generate`)
This unified payload contains both the formatted `.ics` bytes and the granular metadata backing the Explainer UX [15].

```json
{
  "ics_content": "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//WCS Navigator//EN\n...",
  "decision_trace": {
    "subTasks": [
      { "id": "1", "label": "Parsed event timetable & rooms", "status": "completed", "detail": "Identified ballroom streams across the weekend" },
      { "id": "2", "label": "Calculated airport transit & hotel buffer", "status": "completed", "detail": "20m shuttle + 90m check-in + 60m warmup" },
      { "id": "3", "label": "Filtered workshops by division", "status": "completed", "detail": "Filtered advanced intensives" },
      { "id": "4", "label": "Generated calendar file (.ics)", "status: "completed", "detail": "Ready for Apple & Google Calendar" }
    ],
    "bufferTimeline": {
      "earliestStagingTime": "5:15 PM (Friday)",
      "warmupMinutes": 60,
      "hotelSettleMinutes": 90,
      "transitMinutes": 20,
      "latestFlightArrivalDeadline": "2:25 PM (Friday)",
      "formulaSummary": "17:15 (Staging) - (20m SFO Transit + 90m Settle + 60m Warmup) = 14:25 Target Landing",
      "steps": [
        { "label": "Novice Strictly Swing Staging Call", "time": "5:15 PM", "duration": "Staging", "type": "staging", "description": "Grand Peninsula Ballroom Staging" },
        { "label": "Warmup & Floor Check", "time": "4:15 PM", "duration": "60 min", "type": "warmup", "description": "Test floor speed & stretch" },
        { "label": "Hyatt Regency Check-in", "time": "2:45 PM", "duration": "90 min", "type": "hotel", "description": "Hotel check-in and dress change" },
        { "label": "SFO Airport to Hyatt Shuttle Transit", "time": "2:25 PM", "duration": "20 min", "type": "transit", "description": "Direct 5-minute shuttle + buffer" },
        { "label": "Target Flight Landing Deadline", "time": "2:25 PM", "duration": "Deadline", "type": "flight", "description": "Recommended latest flight touchdown" }
      ]
    },
    "sessions": [
      {
        "id": "b1",
        "title": "Novice Strictly Swing Prelims",
        "time": "Friday 5:30 PM - 6:45 PM",
        "location": "Grand Peninsula Ballroom",
        "status": "included",
        "decisionBadge": "Division Match",
        "justification": "Division match for Novice"
      },
      {
        "id": "b2",
        "title": "Level 4/5 Champion Masterclass with Benji Schwimmer",
        "time": "Saturday 1:00 PM - 2:15 PM",
        "location": "Regency Ballroom",
        "status": "filtered",
        "decisionBadge": "Level Ineligible",
        "justification": "Filtered: Requires Level 4/5 audition band"
      }
    ],
    "themeDressCodes": [
      {
        "id": "tb1",
        "day": "Friday Night",
        "themeTitle": "Bay Area Glow Social Party",
        "category": "social_theme",
        "description": "Friday kickoff late night social with blacklights and neon colors.",
        "recommendedAttire": ["Neon & UV bright colors", "White accents", "Glow jewelry"],
        "vibe": "High Energy & Electric"
      },
      {
        "id": "tb2",
        "day": "Saturday Evening",
        "themeTitle": "Classic Champions Showcase & Cocktail Chic",
        "category": "showcase_formal",
        "description": "Strictly Swing & Pro Classic Showcases in the Grand Peninsula Ballroom.",
        "recommendedAttire": ["Dress shirts & ties/vests", "Cocktail dresses", "Polished suede dance shoes"],
        "vibe": "Glamorous & Prestigious"
      }
    ],
    "packingManifest": [
      {
        "id": "p1",
        "name": "Suede wire brush for dusty ballroom floor",
        "category": "footwear",
        "rationale": "For maintaining traction on heavily used hotel ballroom floors",
        "quantity": 1
      }
    ]
  }
}
```

---

## 4. Frontend Integration Blueprint (`tech-dancer`)

The `tech-dancer` repo utilizes React + Vite [9]. You can easily house this component under a new route `/apps/calendar-navigator` [9, 13]:

1.  **State Management:**
    *   `step`: Tracks active UI screen (`0: Upload PDF/Paste URL`, `1: Dynamic Questionnaire Form`, `2: Processing`, `3: Interactive Decision Visualizer`).
    *   `discoveryData`: Stores Pass 1 output.
    *   `finalData`: Stores Pass 2 output (including the `decision_trace` and `ics_content`).
2.  **Downloading the In-Memory `.ics` File:**
    Instead of hosting physical files on the server, the frontend streams the `.ics` string directly via a Blob download link:
    ```javascript
    const downloadICS = (icsString, filename) => {
      const blob = new Blob([icsString], { type: "text/calendar;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    ```
