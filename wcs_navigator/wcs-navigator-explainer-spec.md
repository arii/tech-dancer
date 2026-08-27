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
  "event_name": "Boogie by the Bay 2026",
  "metadata": {
    "detected_tracks": ["West Coast Swing", "Country Swing"],
    "has_leveled_workshops": true,
    "has_competitions": true
  },
  "suggested_form_questions": [
    {
      "id": "selected_tracks",
      "type": "multiselect",
      "label": "Select Dance Styles You Plan to Join",
      "options": ["West Coast Swing", "Country Swing"],
      "default_selection": ["West Coast Swing"]
    },
    {
      "id": "wsdc_division",
      "type": "select",
      "label": "Your Competitive Division",
      "options": ["Newcomer", "Novice", "Intermediate", "Advanced", "All-Star", "Champions"],
      "default_selection": "Novice"
    },
    {
      "id": "primary_goals",
      "type": "multiselect",
      "label": "Primary Goals for the Weekend",
      "options": ["Competitions", "Workshops", "Social Dancing Only"],
      "default_selection": ["Competitions", "Social Dancing Only"]
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
    "evaluation_rules_applied": {
      "retained_tracks": ["West Coast Swing"],
      "excluded_tracks": ["Country Swing"],
      "division_bound": "Novice"
    },
    "logistics_math": {
      "earliest_critical_event": "Novice Jack & Jill Staging",
      "scheduled_time_iso": "2026-10-10T12:15:00-07:00",
      "transit_duration_mins": 30,
      "hotel_buffer_hours": 1.5,
      "warmup_buffer_hours": 1.0,
      "latest_flight_arrival_iso": "2026-10-10T09:15:00-07:00",
      "math_breakdown_formula": "Landing = Staging (12:15) - (30m transit + 90m hotel settle + 60m warmup buffer)"
    },
    "sessions_included_count": 14,
    "sessions_excluded_count": 32,
    "sessions_details": [
      {
        "title": "Novice Jack & Jill - Prelims",
        "start_time": "2026-10-10T12:30:00-07:00",
        "location": "Grand Peninsula Ballroom",
        "decision": "INCLUDED",
        "reason": "Explicit match for selected Novice division"
      },
      {
        "title": "Advanced WCS Workshop with PJ & Torri",
        "start_time": "2026-10-10T14:30:00-07:00",
        "location": "Regency Ballroom",
        "decision": "EXCLUDED",
        "reason": "Filtered: User profile division (Novice) is ineligible for Advanced level workshops"
      }
    ],
    "packing_list_rationales": [
      {
        "item": "Suede shoe sole sticker kit",
        "reason": "PDF schedule designates 'Sandpebble Room' with portable vinyl tiles which can cause ankle drag on regular rubber soles."
      },
      {
        "item": "Travel garment steamer",
        "reason": "Includes a competitive division registration. Standard competition attire requires formal pressing."
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
