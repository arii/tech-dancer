# WCS Navigator API: Technical Specification & Reference Manual

**Document Version:** 2.4.0  
**Service:** WCS Navigator (West Coast Swing Intelligent Scheduling & Travel Optimizer)  
**Protocol:** REST / JSON / Multipart-Form / RFC-5545 iCalendar  
**Target Environment:** FastAPI (Google Cloud Run / Node.js Vercel Edge Serverless)  

---

## 1. System Overview & Architecture

WCS Navigator is a specialized scheduling and travel optimization engine designed for West Coast Swing dance conventions. The system solves complex multi-track scheduling conflicts, hotel/flight transit planning, and personalized workshop filtering via a high-performance **Two-Pass Agentic Pipeline**:

```
[Convention Timetable / PDF / URL]
                │
                ▼
   ┌───────────────────────────┐
   │ Stage 1: Discovery Scan   │ ──► Extracts Instructors, Tracks, Auditions,
   │   POST /api/v1/discover   │     and generates tailored form questions.
   └───────────────────────────┘
                │
                ▼
   ┌───────────────────────────┐
   │ Contextual Questionnaire  │ ──► User selects division, tracks,
   │    (Auto-Advancing UI)    │     arrival time, and intensive masterclasses.
   └───────────────────────────┘
                │
                ▼
   ┌───────────────────────────┐
   │ Stage 2: Synthesis Engine │ ──► Solves scheduling constraints, transit buffers,
   │   POST /api/v1/generate   │     dress code themes, and RFC-5545 .ics calendar.
   └───────────────────────────┘
```

### High Availability & Offline Gracefulness
The API client (`src/features/wcs-navigator/services/wcsApiClient.ts`) implements automatic zero-latency failover. If the live FastAPI backend is unreachable or offline, the client seamlessly invokes the local heuristic extraction and rule engines (`liveScheduleExtractor.ts` and `scheduleRuleEngine.ts`), ensuring 100% uptime for end users.

---

## 2. Environment & Configuration

The API client reads the backend URL from the environment variable:

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `VITE_WCS_API_URL` | `http://localhost:8000` | Base URL for the FastAPI backend gateway |

---

## 3. Core Endpoint Specifications

### 3.1 Stage 1: Schedule & Taxonomy Discovery (`POST /api/v1/discover`)

Analyzes a raw convention timetable (PDF upload or URL) to identify event taxonomy, featured champions, workshop streams, and competition divisions.

- **URL:** `/api/v1/discover`
- **Method:** `POST`
- **Content-Type:** `multipart/form-data` OR `application/json`

#### Request Body (JSON Mode)
```json
{
  "url": "https://california-swing-classic.com/schedule"
}
```

#### Request Body (Multipart Mode)
| Field | Type | Description |
| :--- | :--- | :--- |
| `file` | `File` (Binary) | Timetable PDF or image document |

#### Response Schema (`DiscoveryResponse`)
```json
{
  "preset_id": "norcal-dance-classic-2026",
  "preset_name": "NorCal Dance Classic 2026",
  "suggested_form_questions": [
    {
      "id": "intensive",
      "type": "select",
      "title": "Are you registered for pre-convention intensives?",
      "context": "Configures travel arrival buffers and pre-convention sessions.",
      "defaultValue": "no_intensives",
      "required": true,
      "options": [
        {
          "label": "No — Standard arrival",
          "subtitle": "Standard arrival for regular workshops",
          "value": "no_intensives",
          "badge": "None"
        },
        {
          "label": "Yes — Masterclass with Benji Schwimmer",
          "subtitle": "Requires arrival by 12:00 PM Friday",
          "value": "intensive",
          "badge": "Intensive"
        }
      ]
    },
    {
      "id": "division",
      "type": "select",
      "title": "Which competitive divisions are you entering?",
      "options": [
        { "label": "Novice Competitor", "value": "novice", "badge": "Novice" },
        { "label": "Intermediate / Advanced", "value": "intermediate", "badge": "Int/Adv" },
        { "label": "Social Dancer Only", "value": "social_only", "badge": "Social" }
      ]
    }
  ]
}
```

---

### 3.2 Stage 2: Schedule & Calendar Synthesis (`POST /api/v1/generate`)

Synthesizes user questionnaire responses with convention timetable constraints to generate a personalized chronological itinerary, airport/hotel transit timeline, wardrobe themes, and exportable `.ics` calendar.

- **URL:** `/api/v1/generate`
- **Method:** `POST`
- **Content-Type:** `multipart/form-data` OR `application/json`

#### Request Body (JSON Mode)
```json
{
  "url": "https://california-swing-classic.com/schedule",
  "questionnaire_responses": {
    "division": "novice",
    "track": "musicality",
    "arrival": "early",
    "intensive": "no_intensives"
  }
}
```

#### Response Schema (`GenerateResponse`)
```json
{
  "decisionTrace": {
    "subTasks": [
      { "id": "1", "label": "Parsed timetable", "status": "completed", "detail": "Extracted 12 sessions" },
      { "id": "2", "label": "Evaluated transit buffer", "status": "completed", "detail": "Target landing: 2:15 PM Friday" }
    ],
    "bufferTimeline": {
      "earliestStagingTime": "5:15 PM (Friday)",
      "warmupMinutes": 60,
      "hotelSettleMinutes": 90,
      "transitMinutes": 30,
      "latestFlightArrivalDeadline": "2:15 PM (Friday)",
      "formulaSummary": "Target Arrival (2:15 PM) + 30m Transit + 90m Settle + 60m Warmup = First Event (5:15 PM)",
      "steps": [
        { "label": "Recommended Airport Landing", "time": "02:15 PM", "duration": "Target", "type": "flight" },
        { "label": "Airport to Hotel Transit", "time": "02:45 PM", "duration": "30 min", "type": "transit" },
        { "label": "Hotel Check-in & Wardrobe", "time": "03:45 PM", "duration": "60 min", "type": "hotel" },
        { "label": "Physical Warmup & Bib Pickup", "time": "04:45 PM", "duration": "30 min", "type": "warmup" },
        { "label": "First Competition Staging Call", "time": "05:15 PM", "duration": "Staging", "type": "staging" }
      ]
    },
    "sessions": [
      {
        "id": "sat_ws1",
        "title": "All-Levels Phrasing & Musicality Masterclass with Benji Schwimmer",
        "time": "Saturday 10:00 AM - 11:15 AM",
        "location": "Grand Ballroom",
        "status": "included",
        "decisionBadge": "Workshop Match",
        "justification": "Matches selected Musicality focus track"
      }
    ],
    "themeDressCodes": [
      {
        "id": "th1",
        "day": "Friday Night",
        "themeTitle": "Convention Kickoff Glow Social",
        "category": "social_theme",
        "description": "Friday kickoff party with late-night social dancing until 5:00 AM.",
        "recommendedAttire": ["Neon & UV bright colors", "White accents", "Glow jewelry"],
        "vibe": "High Energy & Electric"
      }
    ],
    "icsContent": "BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//WCS Navigator//EN\r\n...\r\nEND:VCALENDAR"
  }
}
```

---

## 4. Edge & Serverless Utility Endpoints

The repository also provides lightweight serverless edge endpoints under `/api`:

| Endpoint | Method | Purpose |
| :--- | :--- | :--- |
| `/api/health` | `GET` | Service liveness probe returning status `ok` and uptime timestamp |
| `/api/latest-version` | `GET` | Retrieves current application version metadata |
| `/api/compare-version` | `POST` | Compares semantic versions and schema diffs |
| `/api/batch-compare` | `POST` | Executes batch version difference analyses |
| `/api/telemetry` | `POST` | Ingests client performance metrics, endpoint latencies, and fallback events |

---

## 5. Client Integration SDK

### 5.1 Executing Schedule Discovery
```typescript
import { discoverSchedule } from '@/features/wcs-navigator/services/wcsApiClient';

const result = await discoverSchedule('norcal-dance-classic-2026');
console.log('Discovery questions:', result.discovery.suggested_form_questions);
console.log('Source:', result.source); // 'live_api' | 'client_heuristic'
```

### 5.2 Generating Optimized Schedule & Calendar
```typescript
import { generateSchedule } from '@/features/wcs-navigator/services/wcsApiClient';

const responses = {
  division: 'novice',
  track: 'musicality',
  arrival: 'early'
};

const output = await generateSchedule('norcal-dance-classic-2026', responses, 'NorCal Classic');
console.log('ICS Calendar stream:', output.icsContent);
console.log('Sessions count:', output.decisionTrace.sessions.length);
```

---

## 6. Telemetry & Error Handling Protocol

Every API invocation produces a `ServiceTelemetry` record attached to the response:

```typescript
export interface ServiceTelemetry {
  endpoint: string;
  method: string;
  timestamp: string;
  durationMs: number;
  engine: string;
  httpStatus?: number;
  requestPayload?: unknown;
  responsePayload?: unknown;
  errorReason?: string;
}
```

When network faults or server timeouts occur:
1. The error reason is captured in `errorReason`.
2. The client silently falls back to `client_heuristic` extraction.
3. Telemetry is dispatched to `/api/telemetry` for system health auditing.
