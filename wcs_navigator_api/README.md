# WCS Navigator API

Backend service for WCS Navigator, built with FastAPI. It handles parsing event URLs, communicating with the Gemini API to discover schedule data, and generating an 'Explainability First' flight buffer timeline and personalized `.ics` schedule.

## Features

- **Stage 1: Discover (`/api/v1/wcs/discover`)**: Pre-scans a given event URL to determine available tracks and generate a dynamic context-aware questionnaire.
- **Stage 2: Generate (`/api/v1/wcs/generate`)**: Processes the event URL and user's questionnaire responses to extract schedule data, compute flight buffer timelines, audit sessions, and output a personalized `.ics` file along with an agent decision trace.
- **Explainability First**: The agent decision trace details why every session was included or filtered, and breaks down flight buffer mathematical formulas step-by-step.

## Development

```bash
# Install dependencies
pip install -r requirements.txt
pip install -r requirements-dev.txt # Optional, for testing

# Run the API
uvicorn wcs_navigator_api.main:app --reload
```

Ensure `GEMINI_API_KEY` is set in your `.env` file or environment.

## Testing

```bash
PYTHONPATH=. pytest wcs_navigator_api/tests
```

## Contract Consistency

The API strictly adheres to type parity with the frontend TypeScript contracts in `src/features/wcs-navigator/types.ts`.
