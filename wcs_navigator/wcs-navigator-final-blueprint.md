# WCS Navigator: Final Consolidated MVP Specification & Developer Blueprint
## Track 1: Taskmaster (Bring Your Own Friction) — Hackathon Production Blueprint

This document represents the final, consolidated production specification for **WCS Navigator & Packing Orchestrator** [6]. It merges the lightweight dynamic calendar streaming outlines, the two-pass intelligent questionnaire specification, and the test-driven development blueprint into a single, cohesive, deployable architecture.

---

## 1. Required Tools, Infrastructure & Authentication

This architecture is designed for the absolute fastest time-to-delivery while strictly conforming to the **All Things Agentic Hackathon** regulations [5, 6]. It uses an in-memory, stateless model that eliminates complex user authentication (OAuth) and persistent cloud storage dependencies [6].

```
+------------------------------------+             +------------------------------------+
|       boomtick.blog Frontend       |             |        Google Cloud Run API        |
|  - Embeds Static React Components  | <=========> |  - FastAPI Stateless Web Server   |
|  - Renders UI Questionnaire        |             |  - Bundles Local Event PDF Assets  |
|  - Visualizes Decision Trace       |             |  - Generates RFC 5545 ICS Stream   |
+------------------------------------+             +------------------------------------+
                                                             |
                                                             | (Google GenAI SDK)
                                                             v
                                                   +------------------------------------+
                                                   |         Gemini 3.5 Flash           |
                                                   |  - Discovery Pass (PDF Schema)     |
                                                   |  - Generation Pass (ICS Compile)   |
+------------------------------------+             +------------------------------------+
|       Google AI Studio Console     |
|  - Generates GEMINI_API_KEY        |
+------------------------------------+
```

### Core Technology Stack
*   **Hosting:** **Google Cloud Run** (A fully-managed Google Cloud Infrastructure Service, satisfying the mandatory GCP usage rule) [5, 6].
*   **Model Reasoning:** **Gemini 3.5 Flash** (via the modern Google GenAI SDK `google-genai`), utilized for high-context multimodal extraction of visual schedules [5, 6].
*   **API Web Framework:** **FastAPI & Uvicorn** running on Python 3.11+.
*   **Frontend Integration:** Static React form component embedded directly into **`boomtick.blog`** (reusing the deployment workflows of the existing `tech-dancer` repository) [9, 13].

### Authentication Boundaries (Zero OAuth, Pure Server-to-Server)
*   **GCP Deployment Authentication:** Deployed state-lessly using the `gcloud CLI` on your local machine using developer credentials. The container requires no runtime GCP service account keys or OAuth configurations.
*   **Gemini API Key:** A secure, server-side **Gemini API Key** is generated inside Google AI Studio and injected into the Cloud Run service environment as `GEMINI_API_KEY` [6]. No client-side exposure of API keys occurs.
*   **Zero Persistent Storage:** Completely bypasses Google Cloud Storage (GCS) and Cloud Firestore [6]. All files are uploaded as in-memory streams, processed, and returned directly over HTTP, eliminating authentication and database security risks [6].

---

## 2. Product Definition & Core Service Architecture

**WCS Navigator** solves the administrative friction that dancers experience when planning for weekend dance conventions [6]. Rather than forcing a user to manually cross-reference 10-page visual schedule PDFs, guess flight landing targets, parse competitive levels, and build themed packing lists, the agent automates this entire planning loop in a fast, explainable, and interactive format [6, 15].

```
+------------------------------------+
|  1. Drag & Drop PDF / Paste URL   |
+------------------------------------+
                  │
                  ▼
+------------------------------------+
|  2. POST /generate-calendar/discover
+------------------------------------+
                  │
                  ▼ (Pre-scans PDF layout and discovers scheduling structures)
+------------------------------------+
|  3. Render Dynamic Questionnaire   | [e.g., Level choices, overlaps, social themes]
+------------------------------------+
                  │
                  ▼
+------------------------------------+
|  4. POST /generate-calendar/generate
+------------------------------------+
                  │
                  ▼ (Fuses PDF with answers, runs buffer math, compiles ICS data)
+------------------------------------+
|  5. Visual "Decision Trace" Render | [Shows buffer equations & item rationale]
+------------------------------------+
                  │
                  ▼
+------------------------------------+
|  6. Dynamic In-Memory ICS Stream   | [Browser saves directly to native calendar]
+------------------------------------+
```

### In-Memory Dynamic Calendar Streaming
1.  **Frontend Interface:** A drag-and-drop file upload and URL paste form on `boomtick.blog` [9].
2.  **Stateless Endpoint Calls:** Sends inputs as in-memory data streams to the Cloud Run server.
3.  **Unified API Response:** The server processes the schedule and responds with a single JSON payload containing the formatted iCalendar (`.ics`) string and an explainable decision trace.
4.  **Automatic Save:** The frontend parses the `ics_content` response field, sets the mime-type to `text/calendar`, and triggers an instant browser download of the `.ics` file, allowing 1-click addition to Apple, Google, or Outlook calendars with zero backend file writing.

---

## 3. The P0 Workflow: Two-Pass Intelligent Loop

To maintain maximum flexibility for any event schedule, the system completely avoids static query forms or hardcoded event fields [15]. Instead, it uses a **Two-Pass Intelligent Loop** where Gemini 3.5 Flash evaluates the schedule layout first to determine what filter parameters make sense for that specific event, then generates the calendar on the second pass [15].

---

### Pass 1: The Pre-Scan (Discovery Pass)

*   **Endpoint:** `POST /generate-calendar/discover`
*   **Input:** Multi-track PDF file upload (`multipart/form-data`) OR JSON payload with direct PDF URL.
*   **Logic:** Gemini 3.5 Flash evaluates the PDF's visual columns, text blocks, and headers to identify overlapping dance genres, workshop leveling systems, and themed nights [15].

#### Discovery System Prompt
```markdown
You are the Discovery Agent for WCS Navigator. Your job is to pre-scan an uploaded dance convention schedule PDF to detect its structural tracks, competitions, leveled systems, and social themes, then suggest a dynamic questionnaire to help tailor their experience.

Analyze the layout of the uploaded document and return ONLY a valid JSON payload matching the target schema. Do not include any markdown styling, conversational text, or backticks.

Target JSON Schema:
{
  "event_name": "Official Name of the Event",
  "tracks_detected": ["List of distinct tracks, e.g., 'West Coast Swing', 'Country Swing', 'Line Dance', 'Hustle'"],
  "leveled_workshops_detected": {
    "has_leveled_workshops": true,
    "detected_levels": ["e.g., 'Level 1', 'Level 2', 'Novice', 'Intermediate', 'Advanced'"],
    "recommendation": "Short explanation of how the workshops are structured"
  },
  "social_themes_detected": [
    {
      "night": "e.g., Friday Night",
      "theme": "e.g., Glow/Neon theme"
    }
  ],
  "suggested_form_questions": [
    {
      "id": "unique_question_id_string",
      "type": "select" | "multiselect" | "boolean",
      "label": "The human-readable question to ask the dancer",
      "options": ["Option A", "Option B"],
      "context": "Context for why this question is being asked based on the schedule"
    }
  ]
}

Rule Checklist for Question Generation:
1. Multi-Style Detection: If you detect multiple dance styles (e.g. Country Swing AND West Coast Swing, or Hustle and WCS), generate a multiselect question asking which styles they want on their schedule.
2. Workshop Levels: If workshops are divided by level (L1-L5, Novice-Champion, Intermediate/Advanced), generate a select question asking for their level so you can filter out classes they aren't eligible for.
3. Competitions: Generate a multiselect question based on WSDC divisions found (e.g. Novice, Intermediate, Advanced, Masters, Sophisticated) to see which Jack & Jill contests they are entering.
```

---

### Pass 2: Personalized Calendar & Decision Generation

*   **Endpoint:** `POST /generate-calendar/generate`
*   **Input:** Original PDF bytes (or URL) + Completed Questionnaire JSON payload.
*   **Logic:** Gemini 3.5 Flash filters the raw schedule using the answers, evaluates competitive call times, executes flight arrival deadline calculations, and generates the final iCalendar stream along with a step-by-step reasoning trace [15].

#### Generation System Prompt
```markdown
You are the Logistics Orchestrator Agent for WCS Navigator. Your job is to parse the uploaded dance convention schedule PDF and cross-reference it with the user's questionnaire answers to output a highly personalized calendar and an explicit reasoning trace of your actions.

Input Data:
1. Multi-track Schedule PDF (Attached)
2. User's Persona and Preferences:
{user_questionnaire_responses}

You must process the schedule and output ONLY a valid JSON payload matching the target schema below. Do not wrap the output in markdown code blocks or add any conversational text.

Target JSON Schema:
{
  "ics_content": "BEGIN:VCALENDAR\\nVERSION:2.0\\nPRODID:-//WCS Navigator//EN\\n...",
  "decision_trace": {
    "evaluation_summary": "High-level summary of the user's persona and what schedules were retained/ignored.",
    "earliest_call_time": {
      "event_name": "Name of the earliest competition or workshop session the user must attend",
      "scheduled_time_iso": "YYYY-MM-DDTHH:MM:SS",
      "source_reference": "Grid/row/page where this call time was located in the document"
    },
    "calculated_buffers": {
      "earliest_call_time": "YYYY-MM-DDTHH:MM:SS",
      "required_buffer_explanation": "Subtract 3 hours (30m airport transit, 90m hotel check-in/settle, 60m warm-up & check-in window)",
      "latest_flight_arrival_deadline_iso": "YYYY-MM-DDTHH:MM:SS"
    },
    "custom_packing_manifest": [
      {
        "item": "Item Name",
        "rationale": "Clear logical link explaining why this item is recommended based on the schedule events (e.g., themed nights, footwear requirements)."
      }
    ],
    "sessions_included": [
      {
        "title": "Session Title",
        "time": "Day, Date, Start-End Time",
        "location": "Ballroom / Room name",\n        "reason_included": "Why this specific session was selected for their profile"
      }
    ]
  }
}

Strict Formatting and Logic Constraints:
1. iCalendar Content (ics_content):
   - Must be valid RFC 5545 format.
   - Escape double quotes and format newlines as '\\n' in the JSON string.
   - Include individual events for:
     - The "✈️ Target Flight Landing Deadline" (based on the calculated latest_flight_arrival_deadline_iso).
     - Each filtered competition or workshop.
     - Detected social theme nights matching their preferences.
   - Set accurate start and end DTSTART/DTEND values using the dates found on the PDF.
2. Filtering Integrity:
   - If the user selected 'Novice', you MUST filter out Intermediate, Advanced, All-Star, and Champion workshops and contests. Do not pollute their calendar with sessions they cannot attend.
   - Include all-level workshops and general social dance sessions.
3. Explainability:
   - Make sure your reasoning inside the "decision_trace" is entirely traceable back to specific entries in the schedule PDF.
```

---

## 4. Visualizing Decisions: P0 Frontend UI/UX

Understanding the agent’s logic is a P0 requirement. In place of a silent loading spinner, the `boomtick.blog` frontend uses the returned JSON payload to render an interactive, step-by-step **"Agent Logic Trace" UI** before initiating the `.ics` calendar download.

```
+-------------------------------------------------------------------------------------------------+
|                                     WCS NAVIGATOR INTERACTIVE TRACE                             |
+-------------------------------------------------------------------------------------------------+
|                                                                                                 |
|   [Step 1: Evaluated Profile]                                                                   |
|   "Identified user as Novice Competitor. Filtered out 24 ineligible workshops & events."        |
|                                                                                                 |
|   [Step 2: Earliest Competition Milestone Located]                                              |
|   "Novice Strictly Swing Prelims detected on Friday at 5:30 PM (Staging Call: 5:15 PM)."        |
|   Source: Page 2, Friday Afternoon Tabular Grid.                                                |
|                                                                                                 |
|   [Step 3: Travel Logistics Subtraction Calculation]                                            |
|   Target Landing: Friday at 14:25 PM                                                            |
|   Formula: 17:15 (Call) - 30m (Transit) - 90m (Hotel Settle) - 60m (Warmup Buffer)               |
|   ==========================[ 3.0 Hour Flight Buffer Block ]==========================          |
|                                                                                                 |
|   [Step 4: Smart Packing Recommendations]                                                       |
|   - Adhesive Suede Shoe Sheets: "For temporary tile ballroom flooring used at Hyatt Regency SFO"|
|   - Neon Glow Wear: "For the 'Glow Night' Friday social theme listed in schedule"               |
|                                                                                                 |
+-------------------------------------------------------------------------------------------------+
|                             [ DOWNLOAD PERSONALIZED CALENDAR (.ics) ]                           |
+-------------------------------------------------------------------------------------------------+
```

### Visual Components of the Frontend:
1.  **The Filtration Summary Card:** Displays how many total calendar items were evaluated and filtered out based on the chosen persona rules, validating structural filtering integrity.
2.  **The Interactive Travel Timeline:** A visual progression bar illustrating the flight arrival buffer math. It starts at the earliest competition staging call time and backs up step-by-step to the calculated target landing deadline.
3.  **Logical Packing Cards:** Each recommended item is displayed as a mini-card featuring an explainable tooltip derived from schedule observations (e.g., showing a garment steamer recommendation because of formal dress rules, or electrolytes due to late-night social schedules stretching past 4:00 AM) [15, 21].

---

## 5. Data Ingestion & Test-Driven Design (TDD)

To guarantee consistent output parsing and model behavior without maintaining flaky scrapers, our validation environment utilizes real California 2026 event documents to drive the test assertions [21].

### Target Ingestion Candidates (California 2026 WCS Events) [13, 21]
1.  **Boogie by the Bay 2026 (SFO Hyatt Regency, Burlingame, CA) — Oct 8–11, 2026:**
    *   *Characteristics:* Complex, dense multi-track PDF schedule spans 5 rooms. Feature-rich environment for competition registration cutoffs and late-night socials [15, 21].
2.  **Halloween Swing Thing 2026 (Hilton Orange County/Costa Mesa, CA) — Late October 2026:**
    *   *Characteristics:* Highly thematic event emphasizing costume parties and creative socials. Great for validating packing recommendation triggers [13].

---

### Golden Target TDD Test Scenarios (Grounded Verification)

The backend test suite verifies model accuracy by testing against these target fixtures:

#### Fixture A Validation: Boogie by the Bay 2026 — Novice Competitor & Social Focused [21]
*   **Inputs:** `wsdc_division="Novice"`, `primary_intents=["competitor", "social_only"]`, `hotel_transit_mins=20`.
*   **Target Calculation Logic:**
    1.  The earliest competitive milestone is the **Novice Strictly Swing Prelims at 5:30 PM Friday (Staging/Call Time: 5:15 PM)** [15, 21].
    2.  The Flight Buffer Engine executes:
        $$\text{Target Arrival} = \text{Staging Time (17:15)} - (\text{Transit (20m)} + \text{Hotel Settle (90m)} + \text{Warmup/Reg Buffer (60m)}) = \text{Friday 14:25}$$ [15].
*   **Golden JSON Assertion Target:**
```json
{
  "event_name": "Boogie by the Bay 2026",
  "dancer_profile": {
    "wsdc_division": "Novice",
    "primary_intents": ["competitor", "social_only"],
    "latest_flight_arrival": "2026-10-09T14:25:00-07:00"
  },
  "custom_itinerary": [
    {
      "title": "Novice Strictly Swing - Prelims",
      "category": "competition",\n      "start_time_local": "2026-10-09T17:30:00-07:00",
      "staging_time_local": "2026-10-09T17:15:00-07:00",
      "location": "Grand Peninsula Ballroom"
    },
    {
      "title": "Novice Jack & Jill - Prelims",
      "category": "competition",\n      "start_time_local": "2026-10-10T12:30:00-07:00",
      "staging_time_local": "2026-10-10T12:15:00-07:00",
      "location": "Grand Peninsula Ballroom"
    }
  ],
  "packing_manifest": [
    "Suede wire brush for dusty ballroom floor",
    "2x DIY replacement suede adhesive sheets",
    "High-fidelity filter earplugs for loud late-night ballroom",
    "Travel garment steamer for slacks and vest"
  ]
}
```

#### Fixture B Validation: Halloween Swing Thing 2026 — Pure Social Dancer [13]
*   **Inputs:** `wsdc_division="Novice"`, `primary_intents=["social_only", "spectator_shows"]`, `hotel_transit_mins=15`.
*   **Target Calculation Logic:**
    1.  Zero competitive events are retained (all Jack & Jill and Strictly categories are dropped).
    2.  Filters and schedules social workshops, showcase events, and theme nights.
*   **Golden JSON Assertion Target:**
```json
{
  "event_name": "Halloween Swing Thing 2026",
  "dancer_profile": {
    "wsdc_division": "Novice",
    "primary_intents": ["social_only", "spectator_shows"],
    "latest_flight_arrival": "2026-10-29T18:00:00-07:00"
  },
  "custom_itinerary": [
    {
      "title": "Halloween Carnival & Social Dancing",
      "category": "social",
      "start_time_local": "2026-10-30T21:00:00-07:00",
      "location": "Grand Ballroom"
    },
    {
      "title": "Showcase & Professional Routines",
      "category": "show",\n      "start_time_local": "2026-10-31T20:00:00-07:00",
      "location": "Grand Ballroom"
    }
  ],
  "packing_manifest": [
    "Low-effort breathable dance-safe Halloween costumes",
    "Fuegos / flat backup dance sneakers for late-night social shift",\n    "High-fidelity filtered earplugs",
    "Hydration powder packets / Liquid I.V."
  ]
}
```

---

## 6. GCP Cloud Run Deployment & Docker Setup

We leverage the existing containerization workflows and structure defined within the `tech-dancer` repository for rapid, repeatable deployments [9].

### Multi-Stage Dockerfile (`Dockerfile`)
```dockerfile
# Stage 1: Dependency builder
FROM python:3.11-slim as builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

# Stage 2: Clean runtime container
FROM python:3.11-slim as runner
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .

ENV PATH=/root/.local/bin:$PATH
ENV PORT=8080

EXPOSE 8080
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
```

### Local Setup & Verification Loop
1.  **Environment Variables:** Create a `.env` file in your root workspace:
    ```bash
    GEMINI_API_KEY="AIzaSyYourStudioKeyHere..."
    ```
2.  **Container Execution:**
    ```bash
    docker build -t wcs-navigator-api .
    docker run -p 8080:8080 --env-file .env wcs-navigator-api
    ```
3.  **Local API Verification:** Point your browser or cURL to `http://localhost:8080/docs` to view and interact with the FastAPI Swagger UI.

### Google Cloud Run Deployment Command
Run this command from your terminal to build and host your service live on Google Cloud [6]:
```bash
gcloud run deploy wcs-navigator-api \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY=AIzaSyYourStudioKeyHere
```

---

## 7. Universal Scalability Horizon (Tech Conferences)

The structural pattern established by WCS Navigator—**Two-Pass Intelligent Parametric Discovery, Buffer Math Calculation, and Stateless Calendar Streaming**—is widely applicable beyond WCS to any large-scale conference or multi-track corporate event [15].

```
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
|                              UNIVERSAL EXTENSION: TECH CONFERENCES                             |
├────────────────────────────────────────────────────────────────────────────────────────────────┤
|  Dance Concept                        ===>  Technical Conference Concept                      |
|  -----------------------------------------  -------------------------------------------------  |
|  WSDC Competitive Division            ===>  Professional Persona / Career Track Alignment      |
|  (Novice, Intermediate, All-Star)           (e.g., Student, DevOps Engineer, PhD Researcher)   |
|                                                                                                |
|  Style Overlap Detection              ===>  Thematic Tech Core Overlaps                        |
|  (WCS vs. Country Swing vs. Hustle)         (e.g., Cloud Serverless vs. Local Model Inference) |
|                                                                                                |
|  Leveled Workshops                    ===>  Session Technical Depth                            |
|  (L1 - L5 Track Rules)                      (e.g., 100-Level Overview vs. 400-Level Deep Dive) |
|                                                                                                |
|  Flight Arrival Subtraction Buffer    ===>  Satellite Keynote Shuttle Buffer                   |
|  (Hotel Transit + Bib Registration)         (e.g., Transit + Badge Pickup + Keynote Queue Entry) |
|                                                                                                |
|  Themed Social Night Packing          ===>  Networking Dinner Gear Prep                        |
|  (Neon Apparel, Suede Shoe Brush)           (e.g., Digital Resumes, Power Banks, Rain Shells)   |
└────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Case Validation: Grace Hopper Celebration (GHC) / Google Cloud Next
*   **The Friction:** 15,000+ attendees, 300+ parallel sessions, high physical campus spread (e.g., Las Vegas Mandalay Bay or Orlando OCCC), recruiting expo halls, and evening networking socials.
*   **How the Universal Agent Solves It:**
    1.  **Discovery Pass (Pass 1):** Scans the large-scale conference guide, extracting detected tracks (e.g., cloud security, AI research), workshop depths (introductory vs advanced), and evening mixers. It generates a customized GHC Questionnaire.
    2.  **Generation Pass (Pass 2):** Takes the user's focus answers, removes sessions that are irrelevant, and runs physical transit mathematics (e.g., adding a 45-minute hotel shuttle bus and security line buffer) to generate precise calendar notifications before keynote events [15].
    3.  **In-Memory Stream:** Generates a complete, conflict-free, multi-day `.ics` calendar featuring key learning sessions, interview slots, and custom gear suggestions (like power banks and digital resumes) delivered instantly as a single downloaded layer.
