# WCS Navigator: Two-Pass Intelligent Loop Specification

This specification defines the **Intelligent Two-Pass Architecture** powering WCS Navigator. By separating the execution loop into a **Pre-Flight Footprint Discovery Pass (Pass 1)** and a **Contextual Schedule & Calendar Synthesis Pass (Pass 2)**, the agent dynamically configures its own questionnaire and venue logistics based on the event's actual timetable footprint before assembling the customized calendar.

```
+---------------------------------------------------------------------------------------------------------+
|                                         STAGE 1: DISCOVERY PASS (PASS 1)                                |
+---------------------------------------------------------------------------------------------------------+
  1. User selects event or drops timetable PDF =======> POST /generate-calendar/discover
                                                              │
                                                              ▼ (Gemini 3.5 / Footprint Engine Pre-scans)
  2. Frontend receives Event Taxonomy Schema:
     - Audition bands / WSDC levels detected
     - Parallel workshop streams & ballrooms identified
     - Headlining champion instructor lineup extracted
     - Venue proximity and airport transit conditions mapped
                                                              │
                                                              ▼
+---------------------------------------------------------------------------------------------------------+
|                                         STAGE 2: GENERATION PASS (PASS 2)                               |
+---------------------------------------------------------------------------------------------------------+
  3. User auto-advances through Large Card Flow ======> POST /generate-calendar/generate
                                                              │
                                                              ▼ (Gemini 3.5 / Decision Trace Engine)
  4. Frontend displays:
     - Verified Local Transit & Venue Logistics Card
     - Ultra-Clean Chronological Schedule (Title, Time, Location)
     - Dynamic RFC 5545 .ics Calendar Stream & Markdown Schedule Download
```

---

## 1. Stage 1: Pre-Flight Footprint Discovery (Pass 1)

This pass accepts the timetable payload (or preset event key) and analyzes the structural taxonomy of the event.

### Pre-Flight Taxonomy Analysis Rules:
1. **Audition Tiers & Persona**:
   - IF Event gates classes by audition bands (e.g. *Boogie by the Bay Level 4/5* vs *US Open Championship Divisions*) ➔ Step 1 queries target division eligibility.
2. **Parallel Workshop Streams**:
   - IF Classes are organized into distinct themes (e.g. *South Bay's 3 themes* vs *Boogie's Phrasing & Connection streams*) ➔ Step 2 isolates those specific categories.
3. **Featured Champion Instructors**:
   - IF Schedule features headlining champions ➔ Step 3 dynamically queries staff (e.g. *Benji Schwimmer & Nicole Ramirez* at Boogie vs *Kyle Redd, PJ Turner & Victoria Henk* at South Bay).
4. **Venue-Specific Friday Arrival**:
   - Step 4 queries flight touchdown deadlines tailored to host hotel transit (e.g. *SFO 5-min Hyatt shuttle* vs *SJC 7-min transfer*).

---

## 2. Stage 2: Contextual Generation & Calendar Streaming (Pass 2)

### API Endpoint
*   **Route:** `POST /generate-calendar/generate`
*   **Input Schema:**
```json
{
  "preset_id": "south-bay-dance-fling-2026",
  "answers": {
    "division": "novice",
    "role": "lead",
    "track": "technique",
    "instructor": "kyle_sarah",
    "arrival": "early"
  }
}
```

### Output Deliverables:
1. **Local Transit & Venue Logistics Card (`FlightBufferTimeline.tsx`)**:
   - Primary airport proximity, complimentary shuttle details, bell desk luggage drops, and ballroom access.
2. **Minimalist Chronological Schedule (`AgentMindTrace.tsx`)**:
   - Clean session cards with Session Title, Time (`Clock`), and Ballroom Location (`MapPin`).
   - No robot rationale text or redundant authenticity badges.
3. **RFC 5545 Calendar Stream**:
   - Formatted `.ics` file downloaded instantly in-memory for Apple Calendar, Google Calendar, and Outlook.
