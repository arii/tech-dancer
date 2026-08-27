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

#### A. The Flight Buffer Timeline Component
This component visually explains the calculation behind the travel deadline with high-contrast summary metrics and a static, scannable chronological step flow:

```
🏆 EARLIEST EVENT CALL: 5:15 PM (Friday)
✈️ TARGET LANDING DEADLINE: 2:15 PM (Friday)
⏱️ TOTAL REQUIRED BUFFER: 3 Hours (180 mins)
========================================================================
[02:15 PM Touchdown]    ➔ Target Flight Landing Deadline (Deadline Target)
[02:15 PM → 02:45 PM]   ➔ Airport-to-Venue Transit (30 mins)
[02:45 PM → 04:15 PM]   ➔ Hotel Check-in & Wardrobe Settle (90 mins)
[04:15 PM → 05:15 PM]   ➔ Warmup & Floor Check (60 mins)
[05:15 PM Staging Call]  ➔ Competition Staging Call (Mandatory Call)
========================================================================
Caption: "Why 2:15 PM? We take your earliest mandatory time (5:15 PM) and
calculate backward through warmup (60m), hotel logistics (90m), and transit (30m)."
```

### B. The Filtering Audit Matrix
Users can toggle between **"Matched & Scheduled"**, **"Filtered Out"**, and **"All Sessions"** to see exactly why items were selected or bypassed:

*   **Matched & Scheduled Tab:**
    *   `Novice Strictly Swing - Prelims` (Friday 5:30 PM) ──> *Matched Division: Novice. On-time staging guaranteed.*
*   **Filtered Out Tab (With Contextual Warning Badges):**
    *   `All-Levels Connection Workshop` (Friday 3:00 PM) ──> ⚠️ *Arrival Time Conflict: Runs during transit & hotel check-in window (2:15 PM - 4:15 PM).*
    *   `Advanced/All-Star WCS Masterclass` (Saturday 11:00 AM) ──> ❌ *Filtered: Requires Advanced+ division eligibility.*

### C. Event Themes & Dress Codes
Rather than a generic packing manifest, the interface renders rich cards containing the event's **social themes and attire guidelines**:

```
+------------------------------------+  +------------------------------------+
|  🎉 Friday Night: Neon Glow Party  |  |  👔 Saturday: Champions Gala & Glam|
+------------------------------------+  +------------------------------------+
| Category: Social Theme Night       |  | Category: Showcase Gala            |
| Vibe: High Energy & Vibrant        |  | Vibe: Elegant & Sophisticated      |
| Recommended Attire:                |  | Recommended Attire:                |
| - Neon tops & shoes                |  | - Fitted dress shirts & vests      |
| - UV glow accessories              |  | - Cocktail attire & jumpsuits      |
| - White accents                    |  | - Clean dance shoes                |
+------------------------------------+  +------------------------------------+
```

---

## 3. The Explainer Data Structures (JSON Schemas)

To drive this dynamic interface, the API contracts enforce highly descriptive trace payloads.

### Pass 1: Discovery Payload Schema (`/discover`)
This output determines what form elements are shown to the user on `boomtick.blog`:

```json
{
  "preset_id": "boogie-by-the-bay-2026",
  "preset_name": "Boogie by the Bay 2026",
  "event_name": "Boogie by the Bay 2026",
  "tracks_detected": ["West Coast Swing", "Country Swing", "Hustle"],
  "suggested_form_questions": [
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
This unified payload contains both the formatted `.ics` bytes and the granular metadata backing the Explainer UX:

```json
{
  "ics_content": "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//WCS Navigator//EN\n...",
  "decision_trace": {
    "subTasks": [
      { "id": "1", "label": "Parsed event timetable & rooms", "status": "completed", "detail": "Identified ballroom streams across the weekend" },
      { "id": "2", "label": "Calculated airport transit & hotel buffer", "status": "completed", "detail": "30m transit + 90m settle + 60m warmup" },
      { "id": "3", "label": "Filtered workshops & resolved travel conflicts", "status": "completed", "detail": "Filtered advanced classes and Friday arrival overlaps" },
      { "id": "4", "label": "Generated calendar file (.ics)", "status": "completed", "detail": "Ready for Apple & Google Calendar" }
    ],
    "bufferTimeline": {
      "earliestStagingTime": "5:15 PM (Friday)",
      "warmupMinutes": 60,
      "hotelSettleMinutes": 90,
      "transitMinutes": 30,
      "latestFlightArrivalDeadline": "2:15 PM (Friday)",
      "formulaSummary": "Target Flight Landing (2:15 PM) + 30m Transit + 90m Hotel Settle + 60m Warmup = Earliest Staging (5:15 PM)",
      "steps": [
        { "label": "Target Flight Landing Deadline", "time": "02:15 PM Touchdown", "duration": "Deadline Target", "type": "flight", "description": "Recommended latest flight touchdown" },
        { "label": "Airport-to-Venue Transit", "time": "02:15 PM → 02:45 PM", "duration": "30 mins", "type": "transit", "description": "Dedicated airport transit buffer" },
        { "label": "Hotel Check-in & Wardrobe Settle", "time": "02:45 PM → 04:15 PM", "duration": "90 mins", "type": "hotel", "description": "Hotel check-in and dress change" },
        { "label": "Warmup & Floor Check", "time": "04:15 PM → 05:15 PM", "duration": "60 mins", "type": "warmup", "description": "Dynamic stretch & ballroom floor check" },
        { "label": "Competition Staging Call", "time": "05:15 PM Staging Call", "duration": "Mandatory Call", "type": "staging", "description": "Novice Strictly Swing Prelims Call" }
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
        "justification": "Division match for Novice. On-time arrival guaranteed."
      },
      {
        "id": "b2",
        "title": "All-Levels Connection Workshop",
        "time": "Friday 3:00 PM - 4:00 PM",
        "location": "Junior Ballroom",
        "status": "filtered",
        "decisionBadge": "Arrival Time Conflict",
        "justification": "Filtered Out: Workshop runs during your travel arrival & hotel settle window (2:15 PM - 4:15 PM)."
      }
    ],
    "themeDressCodes": [
      {
        "id": "tb1",
        "night": "Friday Night",
        "title": "Neon & Retro Glow Party",
        "category": "theme",
        "badge": "Social Theme",
        "description": "Friday kickoff late night social with blacklights and neon colors.",
        "recommendedOutfits": ["Neon & UV bright colors", "White accents", "Glow jewelry"],
        "atmosphere": "High Energy & Electric"
      },
      {
        "id": "tb2",
        "night": "Saturday Evening",
        "title": "Champions Showcase Gala & Cocktail Chic",
        "category": "gala",
        "badge": "Gala & Showcase",
        "description": "Strictly Swing & Pro Classic Showcases in the Grand Ballroom.",
        "recommendedOutfits": ["Dress shirts & vests", "Cocktail dresses", "Polished suede dance shoes"],
        "atmosphere": "Glamorous & Prestigious"
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
