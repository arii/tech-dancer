"""Render the WCS Navigator Mermaid Architecture Diagrams to a styled PDF."""

import subprocess

HTML_CONTENT = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>WCS Navigator Architecture Diagrams</title>
<script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
<script>
  mermaid.initialize({
    startOnLoad: true,
    theme: 'default',
    themeVariables: {
      primaryColor: '#e0f2fe',
      primaryTextColor: '#0f172a',
      primaryBorderColor: '#0284c7',
      lineColor: '#0284c7',
      secondaryColor: '#f1f5f9',
      tertiaryColor: '#f8fafc',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    sequence: {
      actorMargin: 50,
      mirrorActors: false,
      bottomMarginAdj: 10,
      useMaxWidth: true
    }
  });
</script>
<style>
  @page {
    size: letter landscape;
    margin: 15mm 12mm 15mm 12mm;
    @bottom-right {
      content: counter(page);
    }
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #1e293b;
    line-height: 1.5;
    padding: 0 10px;
    background-color: #ffffff;
  }
  .header {
    border-bottom: 2px solid #0284c7;
    padding-bottom: 8px;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  h1 {
    color: #0f172a;
    font-size: 16pt;
    margin: 0;
  }
  .subtitle {
    color: #64748b;
    font-size: 9.5pt;
    margin-top: 4px;
  }
  .meta-tag {
    font-size: 8.5pt;
    background: #e0f2fe;
    color: #0369a1;
    padding: 3px 8px;
    border-radius: 4px;
    font-weight: 600;
  }
  .diagram-container {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 24px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    page-break-inside: avoid;
  }
  h2 {
    color: #0369a1;
    font-size: 12pt;
    margin-top: 0;
    margin-bottom: 12px;
    border-bottom: 1px solid #f1f5f9;
    padding-bottom: 4px;
  }
  .mermaid {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 220px;
  }
  .page-break {
    page-break-after: always;
  }
  .legend {
    display: flex;
    gap: 16px;
    font-size: 8.5pt;
    color: #64748b;
    margin-top: 10px;
    padding-top: 8px;
    border-top: 1px dashed #e2e8f0;
  }
  .legend-item {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .legend-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
</style>
</head>
<body>

  <!-- Page 1: Sequence Diagram -->
  <div class="header">
    <div>
      <h1>WCS Navigator: Two-Pass Dual Gateway Architecture</h1>
      <div class="subtitle">Stage 1 Discovery & Stage 2 Constraint Optimization Sequence Flow</div>
    </div>
    <div class="meta-tag">FastAPI &bull; Gemini-3.5-Flash &bull; Zero-Latency Fallback</div>
  </div>

  <div class="diagram-container">
    <h2>1. Live Gateway Execution vs. Client-Side Offline Fallback</h2>
    <div class="mermaid">
sequenceDiagram
    autonumber
    actor Dancer as Dancer (User)
    participant SPA as React 19 Frontend (SPA)
    participant GW as Dual Gateway Dispatcher
    participant API as FastAPI Cloud Run (Gemini-3.5-Flash)
    participant Heuristic as Client Heuristic Engine (Local)

    Note over Dancer,SPA: Pass 1: Schedule & Taxonomy Discovery
    Dancer->>SPA: Select Preset or Drop Schedule PDF
    SPA->>GW: POST /api/v1/discover (PDF payload / Event URL)
    alt Live Gateway Connected
        GW->>API: Ingest & Parse via Gemini-3.5-Flash / PyPDF
        API-->>SPA: DiscoveryResponse (Auditions, Tracks, Champions)
    else Gateway Offline / Ballroom No-Wifi
        GW->>Heuristic: Trigger liveScheduleExtractor.ts
        Heuristic-->>SPA: Fallback Discovery & Suggested Questions
        Note over SPA: GatewayFallbackBanner Notifies User
    end

    Note over Dancer,SPA: Pass 2: Interactive Tactile Questionnaire (180ms Auto-Advance)
    SPA->>Dancer: Render Dynamic Questionnaire (Divisions, Tracks, Arrival)
    Dancer->>SPA: Select Preferences & Intensives

    Note over Dancer,API: Pass 3: Constraint Optimization & Calendar Streaming
    SPA->>GW: POST /api/v1/generate (Questionnaire Answers)
    alt Live Backend Optimization
        GW->>API: Constraint Optimization & Travel Buffer Math
        API-->>SPA: GenerateResponse (Decision Trace & RFC 5545 .ics)
    else Offline Rule Engine
        GW->>Heuristic: Execute scheduleRuleEngine.ts
        Heuristic-->>SPA: Adapted Decision Trace & Local .ics Stream
    end
    SPA->>Dancer: Display Itinerary, Transit Logistics & 1-Click Calendar Export
    </div>
    <div class="legend">
      <div class="legend-item"><span class="legend-dot" style="background:#0284c7;"></span> <strong>Primary Path:</strong> Live Google Cloud Run + Gemini-3.5-Flash</div>
      <div class="legend-item"><span class="legend-dot" style="background:#f59e0b;"></span> <strong>Fallback Path:</strong> Zero-dependency TypeScript Client Heuristics</div>
      <div class="legend-item"><span class="legend-dot" style="background:#10b981;"></span> <strong>Output:</strong> RFC 5545 .ics Calendar + Taskmaker Debug Telemetry</div>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- Page 2: Three-Stage System Flowchart -->
  <div class="header">
    <div>
      <h1>WCS Navigator: Three-Stage End-to-End System Pipeline</h1>
      <div class="subtitle">Footprint Analysis, Tactile Form Synthesis, and Itinerary Generation</div>
    </div>
    <div class="meta-tag">Stage 1 &rarr; Stage 2 &rarr; Stage 3</div>
  </div>

  <div class="diagram-container">
    <h2>2. Functional Pipeline & Modular State Transitions</h2>
    <div class="mermaid">
graph LR
    subgraph S1["Stage 1: Search-First Omnibox & Discovery Scan"]
        SearchInput["Clean Omnibox / Autocomplete / PDF Upload"]
        PreFlight["Pre-Flight Footprint Analyzer"]
        DiscResponse["Event Taxonomy:<br/>&bull; Audition Bands (Level 4/5)<br/>&bull; Parallel Workshop Streams<br/>&bull; Champions Lineup<br/>&bull; Host Airport & Venue Transit"]
        SearchInput --> PreFlight
        PreFlight --> DiscResponse
    end

    subgraph S2["Stage 2: Contextual Questionnaire"]
        DynForm["Auto-Advancing Large Card Flow<br/>(180ms Tactile Advance)"]
        UserChoices["User Selections:<br/>&bull; Competitive Division<br/>&bull; Workshop Track Priority<br/>&bull; Pre-Convention Intensives<br/>&bull; Arrival Window Target"]
        DiscResponse --> DynForm
        DynForm --> UserChoices
    end

    subgraph S3["Stage 3: Generation & Usability Dashboard"]
        GenEngine["Schedule Synthesis & Rule Engine"]
        TransitCard["Host Hotel Transit & Baggage Insight"]
        MinimalSched["Chronological Schedule<br/>(Title, Time, Location)"]
        DebugInspector["4-Tab Taskmaker Debug Inspector"]
        ICSStream["1-Click .ics Apple/Google Calendar & .md Export"]
        UserChoices --> GenEngine
        GenEngine --> TransitCard
        GenEngine --> MinimalSched
        GenEngine --> DebugInspector
        GenEngine --> ICSStream
    end

    classDef stage1 fill:#e0f2fe,stroke:#0284c7,stroke-width:1.5px,color:#0f172a;
    classDef stage2 fill:#fef3c7,stroke:#d97706,stroke-width:1.5px,color:#0f172a;
    classDef stage3 fill:#dcfce7,stroke:#16a34a,stroke-width:1.5px,color:#0f172a;
    class SearchInput,PreFlight,DiscResponse stage1;
    class DynForm,UserChoices stage2;
    class GenEngine,TransitCard,MinimalSched,DebugInspector,ICSStream stage3;
    </div>
    <div class="legend">
      <div class="legend-item"><span class="legend-dot" style="background:#0284c7;"></span> <strong>Stage 1 Discovery:</strong> Footprint pre-scan isolating timetable structure</div>
      <div class="legend-item"><span class="legend-dot" style="background:#d97706;"></span> <strong>Stage 2 Questionnaire:</strong> Dynamic auto-advancing cards</div>
      <div class="legend-item"><span class="legend-dot" style="background:#16a34a;"></span> <strong>Stage 3 Synthesis:</strong> Constraint resolution, debug telemetry & calendar stream</div>
    </div>
  </div>

</body>
</html>
"""


def main() -> None:
    """Render HTML with Mermaid.js diagrams to PDF using headless Chrome."""
    with open("docs/wcs-navigator-architecture-diagram.html", "w", encoding="utf-8") as f_out:
        f_out.write(HTML_CONTENT)

    chrome_cmd = [
        "google-chrome",
        "--headless",
        "--disable-gpu",
        "--no-sandbox",
        "--virtual-time-budget=6000",
        "--run-all-compositor-stages-before-draw",
        "--print-to-pdf=pdf_docs/wcs_navigator_architecture_diagram.pdf",
        "docs/wcs-navigator-architecture-diagram.html",
    ]
    subprocess.run(chrome_cmd, check=True)
    print("Successfully generated pdf_docs/wcs_navigator_architecture_diagram.pdf")


if __name__ == "__main__":
    main()
